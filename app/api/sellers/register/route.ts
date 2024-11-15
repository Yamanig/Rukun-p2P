import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { users, sellers } from "@/src/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      username,
      email,
      phone,
      availableAmount,
      pricePerUnit,
      deliveryTime,
      paymentMethods,
      usdtAddress,
    } = body;

    // Create user first
    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        phone,
        role: "seller",
        preferredPaymentMethods: paymentMethods,
      })
      .returning();

    // Create seller profile
    const newSeller = await db
      .insert(sellers)
      .values({
        userId: newUser[0].id,
        availableAmount,
        pricePerUnit,
        deliveryTime,
        usdtAddress,
      })
      .returning();

    return NextResponse.json({
      user: newUser[0],
      seller: newSeller[0],
    });
  } catch (error) {
    console.error("Error registering seller:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}