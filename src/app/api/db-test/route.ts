
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      message: "Connexion MongoDB Atlas réussie",
    });
  } catch (error) {
    console.error("Erreur MongoDB :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Échec de connexion MongoDB",
      },
      { status: 500 }
    );
  }
}
