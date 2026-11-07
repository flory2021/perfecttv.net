import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

const COOKIE_NAME = "perfecttv_admin_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(COOKIE_NAME)?.value;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin/");

  // La connexion doit rester accessible sans session.
  if (isLoginApi) {
    return NextResponse.next();
  }

  const authenticated = token
    ? await verifyAdminToken(token)
    : false;

  // Si une session valide existe déjà, éviter de revenir au login.
  if (isLoginPage && authenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // La page de connexion reste publique.
  if (isLoginPage) {
    return NextResponse.next();
  }

  // Refuser les accès non authentifiés aux API administratives.
  if (isAdminApi && !authenticated) {
    const response = NextResponse.json(
      {
        success: false,
        message: "Accès administrateur non autorisé.",
      },
      { status: 401 }
    );

    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  // Protéger toutes les autres pages d'administration.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!authenticated) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );

      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
