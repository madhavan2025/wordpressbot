import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ChatSettings } from "@/types/chat";
import { WithId, Document } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const settings = await db
    .collection<ChatSettings>("ChatThemes")
    .findOne({ name: "default" });

  return NextResponse.json(settings);
}


export async function PUT(req: Request) {
  try {
    const body: Partial<ChatSettings> = await req.json();

    // Remove _id so MongoDB doesn't throw immutable field error
    const { _id, ...updateData } = body as any;

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection<ChatSettings>("ChatThemes")
      .findOneAndUpdate(
        { name: "default" },
        { $set: updateData },
        { returnDocument: "after", upsert: true }
      );

  

    return NextResponse.json(result);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}





