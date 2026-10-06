import {
  app,
  BrowserWindow,
  dialog,
} from "electron";

import path from "path";
import fs from "fs";
import { spawn, execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

let mainWindow = null;
let nextServer = null;

const GITHUB_REPO =
  "https://github.com/mogesshitaw/GNFprinting.git";

const GITHUB_BRANCH = "master";

/* =========================================================
   PATHS
========================================================= */

function getDataDirectory() {
  if (app.isPackaged) {
    return path.join(
      app.getPath("userData"),
      "data"
    );
  }

  return path.join(
    process.cwd(),
    "data"
  );
}

function getGitRepositoryDirectory() {
  if (app.isPackaged) {
    return path.join(
      app.getPath("userData"),
      "repository"
    );
  }

  return process.cwd();
}

/* =========================================================
   ENSURE DIRECTORIES
========================================================= */

function ensureDirectory(directory) {
  fs.mkdirSync(directory, {
    recursive: true,
  });
}

function getGitExecutable() {
  if (process.platform !== "win32") {
    return "git";
  }

  const candidates = [
    "C:\\Program Files\\Git\\cmd\\git.exe",
    "C:\\Program Files\\Git\\bin\\git.exe",
    "C:\\Program Files (x86)\\Git\\cmd\\git.exe",
    "C:\\Program Files (x86)\\Git\\bin\\git.exe",
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return "git";
}

/* =========================================================
   RUN GIT
========================================================= */

async function runGit(args, cwd) {
  const gitExecutable = getGitExecutable();
  const isCloneOrVersion = args.includes("clone") || args.includes("--version");

  console.log("=================================");
  console.log("Git executable:", gitExecutable);
  console.log("Git repository:", cwd);
  console.log("Repository exists:", fs.existsSync(cwd));
  console.log(
    "Git folder exists:",
    fs.existsSync(path.join(cwd, ".git"))
  );
  console.log("Git arguments:", args);
  console.log("=================================");

  if (!fs.existsSync(cwd)) {
    throw new Error(
      `Git repository directory was not found:\n${cwd}`
    );
  }

  if (!isCloneOrVersion && !fs.existsSync(path.join(cwd, ".git"))) {
    throw new Error(
      `The Git repository does not contain a .git directory:\n${cwd}`
    );
  }

  const result = await execFileAsync(
    gitExecutable,
    args,
    {
      cwd,
      windowsHide: true,
      maxBuffer: 1024 * 1024 * 20,
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: "0",
      },
    }
  );

  return {
    stdout: String(result.stdout || "").trim(),
    stderr: String(result.stderr || "").trim(),
  };
}

/* =========================================================
   CHECK GIT
========================================================= */

async function checkGitInstalled() {
  try {
    const result = await execFileAsync(
      "git",
      ["--version"],
      {
        windowsHide: true,
      }
    );

    console.log(
      "Git:",
      String(result.stdout || "").trim()
    );

    return true;
  } catch (error) {
    console.error(
      "Git is not installed:",
      error
    );

    return false;
  }
}

/* =========================================================
   SETUP GIT REPOSITORY
========================================================= */

async function setupGitRepository() {
  const repositoryDirectory =
    getGitRepositoryDirectory();

  console.log(
    "Git repository:",
    repositoryDirectory
  );

  // Development mode
  if (!app.isPackaged) {
    ensureDirectory(repositoryDirectory);

    try {
      await runGit(
        ["rev-parse", "--is-inside-work-tree"],
        repositoryDirectory
      );

      console.log(
        "Development Git repository detected."
      );

      return repositoryDirectory;
    } catch {
      throw new Error(
        "Development folder is not a Git repository."
      );
    }
  }

  // Packaged application
  ensureDirectory(
    path.dirname(repositoryDirectory)
  );

  // Already cloned?
  if (
    fs.existsSync(
      path.join(repositoryDirectory, ".git")
    )
  ) {
    console.log(
      "Existing Git repository detected."
    );

    try {
      const remote = await runGit(
        [
          "remote",
          "get-url",
          "origin",
        ],
        repositoryDirectory
      );

      console.log(
        "Current origin:",
        remote.stdout
      );

      if (
        remote.stdout.trim() !==
        GITHUB_REPO
      ) {
        console.log(
          "Updating Git origin..."
        );

        await runGit(
          [
            "remote",
            "set-url",
            "origin",
            GITHUB_REPO,
          ],
          repositoryDirectory
        );
      }

      return repositoryDirectory;
    } catch (error) {
      console.error(
        "Existing repository check failed:",
        error
      );

      throw error;
    }
  }

  // First launch
  console.log(
    "Git repository does not exist."
  );

  if (fs.existsSync(repositoryDirectory)) {
    fs.rmSync(repositoryDirectory, { recursive: true, force: true });
  }

  console.log(
    "Cloning:",
    GITHUB_REPO
  );

  try {
    await runGit(
      [
        "clone",
        "--branch",
        GITHUB_BRANCH,
        GITHUB_REPO,
        repositoryDirectory,
      ],
      path.dirname(repositoryDirectory)
    );

    console.log(
      "Git repository cloned successfully."
    );

    return repositoryDirectory;
  } catch (error) {
    console.error(
      "Git clone failed:",
      error
    );

    throw new Error(
      "Unable to clone the GNF Printing GitHub repository.\n\n" +
      "Please make sure Git is installed and GitHub authentication is available."
    );
  }
}

/* =========================================================
   LOAD ENV FILE
========================================================= */

function loadEnvFile() {
  const envFile = app.isPackaged
    ? path.join(
        process.resourcesPath,
        ".env.local"
      )
    : path.join(
        process.cwd(),
        ".env.local"
      );

  if (!fs.existsSync(envFile)) {
    return {};
  }

  const content = fs.readFileSync(
    envFile,
    "utf8"
  );

  const result = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (
      !trimmed ||
      trimmed.startsWith("#")
    ) {
      continue;
    }

    const index = trimmed.indexOf("=");

    if (index === -1) {
      continue;
    }

    const key =
      trimmed.slice(0, index).trim();

    const value =
      trimmed.slice(index + 1).trim();

    result[key] = value;
  }

  return result;
}

/* =========================================================
   START NEXT SERVER
========================================================= */

async function startNextServer() {
  const dataDirectory =
    getDataDirectory();

  const gitRepository =
    getGitRepositoryDirectory();

  ensureDirectory(dataDirectory);

  const standalonePath = app.isPackaged
    ? path.join(
        process.resourcesPath,
        "app.asar.unpacked",
        ".next",
        "standalone",
        "server.js"
      )
    : path.join(
        app.getAppPath(),
        ".next",
        "standalone",
        "server.js"
      );

  if (!fs.existsSync(standalonePath)) {
    throw new Error(
      `Next.js standalone server was not found:\n${standalonePath}`
    );
  }

  const localEnv = loadEnvFile();

  console.log(
    "Starting Next.js server:"
  );

  console.log(
    standalonePath
  );

  console.log(
    "GNF_DATA_DIR:",
    dataDirectory
  );

  console.log(
    "GNF_GIT_REPO:",
    gitRepository
  );

  nextServer = spawn(
    process.execPath,
    [standalonePath],
    {
      cwd: path.dirname(
        standalonePath
      ),

      windowsHide: true,

      env: {
        ...process.env,
        ...localEnv,

        NODE_ENV:
          "production",

        PORT:
          "3000",

        HOSTNAME:
          "localhost",

        GNF_DATA_DIR:
          dataDirectory,

        GNF_GIT_REPO:
          gitRepository,

        GNF_GITHUB_REPO:
          GITHUB_REPO,

        GNF_GITHUB_BRANCH:
          GITHUB_BRANCH,

        ELECTRON_RUN_AS_NODE:
          "1",
      },

      stdio: [
        "ignore",
        "pipe",
        "pipe",
      ],
    }
  );

  nextServer.stdout.on(
    "data",
    (data) => {
      console.log(
        "[Next]",
        data.toString()
      );
    }
  );

  nextServer.stderr.on(
    "data",
    (data) => {
      console.error(
        "[Next ERROR]",
        data.toString()
      );
    }
  );

  nextServer.on(
    "close",
    (code) => {
      console.log(
        "Next.js server stopped:",
        code
      );
    }
  );
}

/* =========================================================
   WAIT FOR SERVER
========================================================= */

async function waitForServer(
  url,
  timeout = 30000
) {
  const start =
    Date.now();

  while (
    Date.now() - start <
    timeout
  ) {
    try {
      const response =
        await fetch(url);

      if (
        response.ok ||
        response.status === 404
      ) {
        return true;
      }
    } catch {
      // Server not ready yet
    }

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          500
        )
    );
  }

  throw new Error(
    "Next.js server did not start within the expected time."
  );
}

/* =========================================================
   CREATE WINDOW
========================================================= */

async function createWindow() {
  const iconPath = path.join(
    app.getAppPath(),
    "electron",
    "icon.ico"
  );

  console.log("Electron icon:", iconPath);
  console.log(
    "Icon exists:",
    fs.existsSync(iconPath)
  );

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,

    minWidth: 1100,
    minHeight: 700,

    icon: iconPath,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },

    show: false,
  });

  mainWindow.once(
    "ready-to-show",
    () => {
      mainWindow.show();
    }
  );

  await mainWindow.loadURL(
    "http://localhost:3000"
  );

  mainWindow.on(
    "closed",
    () => {
      mainWindow = null;
    }
  );
}
/* =========================================================
   SINGLE INSTANCE
========================================================= */

const gotLock =
  app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.on(
    "second-instance",
    () => {
      if (mainWindow) {
        if (
          mainWindow.isMinimized()
        ) {
          mainWindow.restore();
        }

        mainWindow.focus();
      }
    }
  );

  app.whenReady().then(
    async () => {
      try {
        console.log(
          "================================="
        );

        console.log(
          "GNF Printing starting..."
        );

        console.log(
          "================================="
        );

        // Check Git
        const gitInstalled =
          await checkGitInstalled();

        if (!gitInstalled) {
          await dialog.showMessageBox({
            type: "error",
            title: "Git Required",
            message:
              "Git is required for publishing.",
            detail:
              "Please install Git for Windows and restart GNF Printing.",
          });

          app.quit();

          return;
        }

        // Create data directory
        ensureDirectory(
          getDataDirectory()
        );

        // Setup repository
        await setupGitRepository();

        // Start Next
        await startNextServer();

        // Wait for Next
        await waitForServer(
          "http://localhost:3000"
        );

        // Open application
        await createWindow();

        console.log(
          "GNF Printing is ready."
        );
      } catch (error) {
        console.error(
          "Application startup failed:",
          error
        );

        await dialog.showMessageBox({
          type: "error",
          title:
            "GNF Printing Startup Error",
          message:
            "GNF Printing could not start.",
          detail:
            error instanceof Error
              ? error.message
              : String(error),
        });

        app.quit();
      }
    }
  );
}

/* =========================================================
   STOP SERVER
========================================================= */

app.on(
  "before-quit",
  () => {
    if (
      nextServer &&
      !nextServer.killed
    ) {
      nextServer.kill();
    }
  }
);

app.on(
  "window-all-closed",
  () => {
    if (
      process.platform !==
      "darwin"
    ) {
      app.quit();
    }
  }
);