import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// GET CART PRODUCTS
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("floating");

    const cartItems = await db.collection("cart").find({}).toArray();

    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}


// ADD PRODUCT TO CART
export async function POST(req: Request) {
  try {
    const product = await req.json();

    const client = await clientPromise;
    const db = client.db("floating");

    // Check if already in cart
    const existing = await db.collection("cart").findOne({
      _id: product._id,
    });

    if (existing) {
      // Increase quantity if already exists
      await db.collection("cart").updateOne(
        { _id: product._id },
        { $inc: { quantity: 1 } }
      );
    } else {
      // Insert full product + quantity
      await db.collection("cart").insertOne({
        ...product,
        quantity: 1,
      });
    }

    return NextResponse.json({ message: "Added to cart" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

// REMOVE PRODUCT FROM CART (decrease or delete)
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id, clear, removeAll } = body;

    const client = await clientPromise;
    const db = client.db("floating");

    // ✅ Clear entire cart
    if (clear) {
      await db.collection("cart").deleteMany({});
      return NextResponse.json({ message: "Cart cleared" });
    }

    // ✅ Remove item completely (❌ button)
    if (removeAll) {
      await db.collection("cart").deleteOne({ _id: id });
      return NextResponse.json({ message: "Item removed completely" });
    }

    // ✅ Decrease quantity (- button)
    const item = await db.collection("cart").findOne({ _id: id });

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    if (item.quantity > 1) {
      await db.collection("cart").updateOne(
        { _id: id },
        { $inc: { quantity: -1 } }
      );
    } else {
      await db.collection("cart").deleteOne({ _id: id });
    }

    return NextResponse.json({ message: "Item decreased" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove item" },
      { status: 500 }
    );
  }
}