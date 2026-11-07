
import { createHash } from "crypto";
import type { NextRequest } from "next/server";
import ApiRateLimit from "@/models/ApiRateLimit";

export async function checkRateLimit(
  request: NextRequest,
  scope: string,
  maxRequests = 20
) {
  // Configure Nginx pour transmettre X-Real-IP depuis la
  // connexion cliente réelle. Ne fais pas confiance à un
  // X-Forwarded-For librement fourni par le visiteur.
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
  request.headers.get("x-real-ip") ||
  (process.env.NODE_ENV !== "production"
    ? forwarded?.split(",")[0]?.trim() || "local-dev"
    : null);

if (!ip) return false;

  const key = createHash("sha256")
    .update(`${scope}:${ip}`)
    .digest("hex");

  const now = new Date();
  const windowStart = new Date(
    Math.floor(now.getTime() / 60000) * 60000
  );

  try {
    const record = (await ApiRateLimit.findOneAndUpdate(
      { key },
      [
        {
          $set: {
            key,
            windowStart,
            count: {
              $cond: [
                { $eq: ["$windowStart", windowStart] },
                { $add: [{ $ifNull: ["$count", 0] }, 1] },
                1,
              ],
            },
          },
        },
      ],
      { upsert: true, new: true }
    ).lean()) as { count?: number } | null;

    const count = record?.count ?? maxRequests + 1;
    return count <= maxRequests;
  } catch (error) {
    // En cas d'erreur du limiteur, refuser la requête :
    // ne pas désactiver silencieusement la protection.
    console.error("Erreur rate limit :", error);
    return false;
  }
}
