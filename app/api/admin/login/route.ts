import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const password = body.password;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD is not configured.");

      return NextResponse.json(
        { error: "Admin authentication is not configured." },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("gnf_admin", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return NextResponse.json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}