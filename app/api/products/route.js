import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("floating");

    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (err) {
    console.error("Failed to fetch forms:", err);
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 });
  }
}
