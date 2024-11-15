import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { sellers, users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!db) {
      throw new Error("Database connection not initialized");
    }

    const sellersList = await db
      .select({
        id: sellers.id,
        userId: sellers.userId,
        availableAmount: sellers.availableAmount,
        pricePerUnit: sellers.pricePerUnit,
        currency: sellers.currency,
        deliveryTime: sellers.deliveryTime,
        isActive: sellers.isActive,
        totalVolume: sellers.totalVolume,
        createdAt: sellers.createdAt,
        username: users.username,
        rating: users.rating,
        successfulTransactions: users.successfulTransactions,
        preferredPaymentMethods: users.preferredPaymentMethods,
      })
      .from(sellers)
      .innerJoin(users, eq(sellers.userId, users.id))
      .where(eq(sellers.isActive, true));

    return NextResponse.json({ sellers: sellersList });
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}