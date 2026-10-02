import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

function cleanGitOutput(value: string) {
  return value.replace(/\r/g, "").trim();
}

async function runGit(args: string[]) {
  const { stdout, stderr } = await execFileAsync(
    "git",
    args,
    {
      cwd: process.cwd(),
      windowsHide: true,
      maxBuffer: 1024 * 1024 * 10,
    }
  );

  return {
    stdout: cleanGitOutput(stdout),
    stderr: cleanGitOutput(stderr),
  };
}

export async function POST() {
  try {
    // ============================================
    // 1. CHECK ADMIN LOGIN
    // ============================================

    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("gnf_admin");

    if (adminCookie?.value !== "authenticated") {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Please login as admin.",
        },
        { status: 401 }
      );
    }

    // ============================================
    // 2. CHECK GIT REPOSITORY
    // ============================================

    try {
      await runGit([
        "rev-parse",
        "--is-inside-work-tree",
      ]);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "This project is not connected to a Git repository.",
        },
        { status: 500 }
      );
    }

    // ============================================
    // 3. CHECK PUBLIC CHANGES
    // ============================================

    const statusBefore = await runGit([
      "status",
      "--short",
      "--",
      "data/prices.json",
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

    // ============================================
    // 4. STAGE ONLY PUBLIC FILES
    // ============================================

    await runGit([
      "add",
      "--",
      "data/prices.json",
      "public/images",
    ]);

    // ============================================
    // 5. CHECK WHAT IS STAGED
    // ============================================

    const staged = await runGit([
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

    const stagedFiles = staged.stdout
      .split("\n")
      .map((file) => file.trim())
      .filter(Boolean);

    // ============================================
    // 6. SECURITY CHECK
    //    NEVER PUBLISH QUOTATIONS
    // ============================================

    const privateFiles = stagedFiles.filter(
      (file) =>
        file === "data/quotations.json" ||
        file.startsWith("data/quotations/")
    );

    if (privateFiles.length > 0) {
      await runGit([
        "restore",
        "--staged",
        "--",
        ...privateFiles,
      ]);

      return NextResponse.json(
        {
          success: false,
          error:
            "Security check stopped publishing because a private quotation file was staged.",
        },
        { status: 500 }
      );
    }

    // ============================================
    // 7. COMMIT
    // ============================================

    const commit = await runGit([
      "commit",
      "-m",
      "Update public pricing and service images",
    ]);

    // ============================================
    // 8. PUSH TO GITHUB
    // ============================================

    const push = await runGit([
      "push",
      "origin",
      "master",
    ]);

    // ============================================
    // 9. SUCCESS
    // ============================================

    return NextResponse.json({
      success: true,
      published: true,
      message:
        "Changes published successfully. Vercel deployment should start automatically.",
      files: stagedFiles,
      commit: commit.stdout,
      push: push.stdout || push.stderr,
    });
  } catch (error) {
    console.error("Publish error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown Git error.";

    return NextResponse.json(
      {
        success: false,
        error: `Publishing failed.\n\n${message}`,
      },
      { status: 500 }
    );
  }
}