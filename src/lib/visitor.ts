
import {
  createHash,
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "crypto";
import type { NextRequest, NextResponse } from "next/server";

export const VISITOR_COOKIE = "fc_visitor";

export function getVisitor(request: NextRequest) {
  const secret = process.env.VIEW_COOKIE_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("VIEW_COOKIE_SECRET absent ou trop court");
  }

  const token = request.cookies.get(VISITOR_COOKIE)?.value;
  let id: string | null = null;

  if (token) {
    const [candidate, signature] = token.split(".");

    if (
      candidate &&
      signature &&
      /^[a-f0-9]{64}$/i.test(signature)
    ) {
      const expected = new Uint8Array(
        createHmac("sha256", secret)
          .update(candidate)
          .digest()
      );

      const received = new Uint8Array(Buffer.from(signature, "hex"));

      if (
        received.length === expected.length &&
        timingSafeEqual(received, expected)
      ) {
        id = candidate;
      }
    }
  }

  const isNew = !id;
  if (!id) id = randomUUID();

  return {
    id,
    isNew,
    visitorHash: createHash("sha256").update(id).digest("hex"),
    token: `${id}.${createHmac("sha256", secret)
      .update(id)
      .digest("hex")}`,
  };
}

export function setVisitorCookie(
  response: NextResponse,
  token: string
) {
  response.cookies.set(VISITOR_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
