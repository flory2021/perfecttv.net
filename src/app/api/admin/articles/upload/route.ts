
import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Aucune image reçue." },
        { status: 400 }
      );
    }

    const extension = allowedTypes[file.type];

    if (!extension) {
      return NextResponse.json(
        {
          success: false,
          message: "Format non autorisé. Utilisez JPG, PNG, WEBP ou GIF.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "L'image ne doit pas dépasser 5 Mo.",
        },
        { status: 400 }
      );
    }

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "articles"
    );

    await mkdir(uploadDirectory, { recursive: true });

    const filename = `${randomUUID()}${extension}`;
    const filePath = path.join(uploadDirectory, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    return NextResponse.json({
      success: true,
      image: `/uploads/articles/${filename}`,
      message: "Image envoyée avec succès.",
    });
  } catch (error) {
    console.error("Erreur upload image :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Impossible d'envoyer l'image.",
      },
      { status: 500 }
    );
  }
}
