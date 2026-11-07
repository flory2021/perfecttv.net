import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  createAdminToken,
  ADMIN_SESSION_DURATION,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeCompare(a: string, b: string) {
  const first = Buffer.from(a, "utf8");
  const second = Buffer.from(b, "utf8");

  if (first.length !== second.length) {
    return false;
  }

  return timingSafeEqual(first, second);
}

export async function POST(request: Request) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { success: false, message: "Configuration administrateur absente." },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => null);

    if (
      !body ||
      typeof body.email !== "string" ||
      typeof body.password !== "string" ||
      body.email.length > 254 ||
      body.password.length > 1024
    ) {
      return NextResponse.json(
        { success: false, message: "Données invalides." },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();
    const password = body.password;

    const validEmail = safeCompare(email, adminEmail);
    const validPassword = safeCompare(password, adminPassword);

    if (!validEmail || !validPassword) {
      return NextResponse.json(
        { success: false, message: "Identifiants incorrects." },
        { status: 401 }
      );
    }

    const token = await createAdminToken();

    const response = NextResponse.json({
      success: true,
      message: "Connexion administrateur réussie.",
    });

    response.cookies.set("perfecttv_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_SESSION_DURATION,
    });

    return response;
  } catch (error) {
    console.error("Erreur connexion administrateur :", error);

    return NextResponse.json(
      { success: false, message: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
