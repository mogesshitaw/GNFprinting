import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { getGitRepositoryPath } from "@/lib/paths";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

const EXPECTED_REPO =
  "https://github.com/mogesshitaw/GNFprinting.git";

const EXPECTED_BRANCH = "master";

/* ==========================================
   HELPERS
========================================== */

function cleanGitOutput(value: string) {
  return value.replace(/\r/g, "").trim();
}

function getGitRepository() {
  return getGitRepositoryPath();
}


/*
  Find Git on Windows.

  This avoids:
    spawn git ENOENT
*/
function getGitExecutable() {
  if (process.platform !== "win32") {
    return "git";
  }

  const localAppData = process.env.LOCALAPPDATA || "";
  const programFiles = process.env.ProgramFiles || "C:\\Program Files";
  const programFilesX86 = process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)";
  const userProfile = process.env.USERPROFILE || "";

  const candidates = [
    path.join(programFiles, "Git", "cmd", "git.exe"),
    path.join(programFiles, "Git", "bin", "git.exe"),
    path.join(programFilesX86, "Git", "cmd", "git.exe"),
    path.join(programFilesX86, "Git", "bin", "git.exe"),
    path.join(localAppData, "Programs", "Git", "cmd", "git.exe"),
    path.join(localAppData, "Programs", "Git", "bin", "git.exe"),
    path.join(userProfile, "AppData", "Local", "Programs", "Git", "cmd", "git.exe"),
    path.join(userProfile, "AppData", "Local", "Programs", "Git", "bin", "git.exe"),
  ];

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(/*turbopackIgnore: true*/ candidate)) {
      return candidate;
    }
  }

  return "git";
}

async function runGit(args: string[]) {
  const cwd = getGitRepository();
  const git = getGitExecutable();

  console.log("=================================");
  console.log("Git executable:", git);
  console.log("Git exists:", fs.existsSync(/*turbopackIgnore: true*/ git));
  console.log("Git repository:", cwd);
  console.log("Repository exists:", fs.existsSync(/*turbopackIgnore: true*/ cwd));
  console.log(
    "Git folder exists:",
    fs.existsSync(
      /*turbopackIgnore: true*/ path.join(cwd, ".git")
    )
  );
  console.log("Git arguments:", args);
  console.log("=================================");

  if (git !== "git" && !fs.existsSync(/*turbopackIgnore: true*/ git)) {
    throw new Error(
      `Git for Windows is required to publish changes to GitHub.\n\nPlease install Git for Windows (https://git-scm.com/download/win) to enable publishing.`
    );
  }

  if (!fs.existsSync(/*turbopackIgnore: true*/ cwd)) {
    throw new Error(
      `Data directory was not found:\n${cwd}`
    );
  }

  if (
    !fs.existsSync(
      /*turbopackIgnore: true*/ path.join(cwd, ".git")
    )
  ) {
    throw new Error(
      `Publishing requires a Git repository.\n\nThis computer is currently running in local mode. Please install Git for Windows and clone the repository to enable publishing.`
    );
  }

  const { stdout, stderr } =
    await execFileAsync(
      git,
      args,
      {
        cwd,
        windowsHide: true,
        maxBuffer: 1024 * 1024 * 10,
        /*
         * Pass the full Windows environment so Git can:
         * - Resolve DNS (github.com)
         * - Use credential helpers (Windows Credential Manager)
         * - Find SSL certificates
         * - Respect any proxy settings
         */
        env: {
          ...process.env,
          GIT_TERMINAL_PROMPT: "0",
        },
      }
    );

  return {
    stdout: cleanGitOutput(stdout),
    stderr: cleanGitOutput(stderr),
  };
}

/* ==========================================
   POST /api/admin/publish
========================================== */

export async function POST() {
  try {
    /* ==========================================
       1. ADMIN AUTHENTICATION
    ========================================== */

    const cookieStore = await cookies();

    const adminCookie =
      cookieStore.get("gnf_admin");

    if (
      adminCookie?.value !==
      "authenticated"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unauthorized. Please login as admin.",
        },
        {
          status: 401,
        }
      );
    }

    /* ==========================================
       2. GET GIT REPOSITORY
    ========================================== */

    const repository =
      getGitRepository();

    console.log(
      "================================="
    );

    console.log(
      "Publishing repository:",
      repository
    );

    console.log(
      "GNF_GIT_REPO:",
      process.env.GNF_GIT_REPO ||
        "(not set - using process.cwd())"
    );

    console.log(
      "Git executable:",
      getGitExecutable()
    );

    console.log(
      "================================="
    );

    /* ==========================================
       3. VERIFY GIT REPOSITORY
    ========================================== */

    await runGit([
      "rev-parse",
      "--is-inside-work-tree",
    ]);

    /* ==========================================
       4. VERIFY ORIGIN
    ========================================== */

    const remote =
      await runGit([
        "remote",
        "get-url",
        "origin",
      ]);

    if (
      remote.stdout !==
      EXPECTED_REPO
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            `Git origin is incorrect.\n\nExpected:\n${EXPECTED_REPO}\n\nActual:\n${remote.stdout}`,
        },
        {
          status: 500,
        }
      );
    }

    /* ==========================================
       5. CHECK BRANCH
    ========================================== */

    const branch =
      await runGit([
        "branch",
        "--show-current",
      ]);

    if (
      branch.stdout !==
      EXPECTED_BRANCH
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            `The Git repository is not on the ${EXPECTED_BRANCH} branch.\n\nCurrent branch: ${branch.stdout}`,
        },
        {
          status: 500,
        }
      );
    }

    /* ==========================================
       6. CHECK PUBLIC CHANGES
    ========================================== */

    const statusBefore =
      await runGit([
        "status",
        "--short",
        "--",
        "data/prices.json",
        "data/quotations.json",
        "public/images",
      ]);

    if (!statusBefore.stdout) {
      return NextResponse.json({
        success: true,
        published: false,
        message:
          "There are no public changes to publish.",
      });
    }

    /* ==========================================
       7. STAGE ONLY PUBLIC FILES
    ========================================== */

    // Automatically sanitize quotations to remove phone, email, and contact info before publishing to GitHub
    const quotationsFilePath = path.join(
      getGitRepository(),
      "data",
      "quotations.json"
    );

    if (fs.existsSync(quotationsFilePath)) {
      try {
        const raw = fs.readFileSync(quotationsFilePath, "utf-8");
        if (raw.trim()) {
          const list = JSON.parse(raw);
          if (Array.isArray(list)) {
            const sanitized = list.map((item: any) => ({
              ...item,
              phone: "",
              email: "",
              contactPerson: "",
            }));
            fs.writeFileSync(
              quotationsFilePath,
              JSON.stringify(sanitized, null, 2),
              "utf-8"
            );
          }
        }
      } catch (err) {
        console.error("Failed to sanitize quotations:", err);
      }
    }

    await runGit([
      "add",
      "--",
      "data/prices.json",
      "data/quotations.json",
      "public/images",
    ]);

    /* ==========================================
       8. CHECK STAGED FILES
    ========================================== */

    const staged =
      await runGit([
        "diff",
        "--cached",
        "--name-only",
      ]);

    if (!staged.stdout) {
      return NextResponse.json({
        success: true,
        published: false,
        message:
          "There are no public changes to publish.",
      });
    }

    const stagedFiles =
      staged.stdout
        .split("\n")
        .map((file) =>
          file.trim()
        )
        .filter(Boolean);

    /* ==========================================
       9. SECURITY CHECK
    ========================================== */

    const allowedFiles =
      stagedFiles.every(
        (file) =>
          file ===
            "data/prices.json" ||
          file ===
            "data/quotations.json" ||
          file.startsWith(
            "public/images/"
          )
      );

    if (!allowedFiles) {
      await runGit([
        "restore",
        "--staged",
        "--",
        ...stagedFiles,
      ]);

      return NextResponse.json(
        {
          success: false,
          error:
            "Security check stopped publishing because a non-public file was staged.",
        },
        {
          status: 500,
        }
      );
    }

    /* ==========================================
       10. COMMIT
    ========================================== */

    const commit =
      await runGit([
        "commit",
        "-m",
        "Update pricing, quotations, and service images",
      ]);

    /* ==========================================
       11. PULL REMOTE CHANGES (REBASE)
    ========================================== */

    try {
      await runGit([
        "pull",
        "--rebase",
        "--autostash",
        "origin",
        EXPECTED_BRANCH,
      ]);
    } catch (pullError) {
      console.warn("Pull rebase before push warning:", pullError);
    }

    /* ==========================================
       12. PUSH
    ========================================== */

    const push =
      await runGit([
        "push",
        "origin",
        EXPECTED_BRANCH,
      ]);

    /* ==========================================
       13. SUCCESS
    ========================================== */

    return NextResponse.json({
      success: true,
      published: true,

      message:
        "Changes published successfully. Vercel deployment should start automatically.",

      repository,

      branch:
        EXPECTED_BRANCH,

      files:
        stagedFiles,

      commit:
        commit.stdout,

      push:
        push.stdout ||
        push.stderr,
    });
  } catch (error) {
    console.error(
      "Publish error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unknown Git error.";

    return NextResponse.json(
      {
        success: false,
        error:
          `Publishing failed.\n\n${message}`,
      },
      {
        status: 500,
      }
    );
  }
}