import { SignJWT, jwtVerify } from "jose";

const SESSION_DURATION = 8 * 60 * 60;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || new TextEncoder().encode(secret).length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET doit contenir au moins 32 octets."
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminToken() {
  return new SignJWT({
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("perfecttv")
    .setAudience("perfecttv-admin")
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: "perfecttv",
      audience: "perfecttv-admin",
      algorithms: ["HS256"],
    });

    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const ADMIN_SESSION_DURATION = SESSION_DURATION;
