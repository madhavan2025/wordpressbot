import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const themeName = searchParams.get("theme") || "default";

    const client = await clientPromise;
    const db = client.db("floating");

    const theme = await db
      .collection("ChatThemes")
      .findOne({ name: themeName });

    return NextResponse.json(theme);
  } catch (err) {
    console.error("Failed to fetch theme:", err);
    return NextResponse.json(
      { error: "Failed to fetch theme" },
      { status: 500 }
    );
  }
}