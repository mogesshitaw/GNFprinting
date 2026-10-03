import path from "path";
import fs from "fs";

export function getGitRepositoryPath(): string {
  if (process.env.GNF_GIT_REPO) {
    return process.env.GNF_GIT_REPO;
  }

  const cwd = process.cwd();
  // If running from inside .next/standalone, traverse up to root project repository
  const standaloneMarker = path.join(".next", "standalone");
  if (cwd.includes(standaloneMarker)) {
    const rootCandidate = path.resolve(cwd.split(standaloneMarker)[0]);
    if (
      fs.existsSync(path.join(rootCandidate, ".git")) ||
      fs.existsSync(path.join(rootCandidate, "package.json"))
    ) {
      return rootCandidate;
    }
  }

  return cwd;
}

export function getPublicDataPath(fileName: string): string {
  return path.join(
    getGitRepositoryPath(),
    "data",
    fileName
  );
}

export function getPublicImagesPath(): string {
  return path.join(
    getGitRepositoryPath(),
    "public",
    "images"
  );
}

export function getPrivateDataDirectory(): string {
  if (process.env.GNF_DATA_DIR) {
    return process.env.GNF_DATA_DIR;
  }

  return path.join(getGitRepositoryPath(), "data");
}

export function getPrivateDataPath(fileName: string): string {
  return path.join(
    getPrivateDataDirectory(),
    fileName
  );
}