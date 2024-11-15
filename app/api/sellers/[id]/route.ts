import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { sellers, users, transactions, reviews } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sellerId = params.id;

    const seller = await db
      .select({
        id: sellers.id,
        username: users.username,
        rating: users.rating,
        successfulTransactions: users.successfulTransactions,
        availableAmount: sellers.availableAmount,
        pricePerUnit: sellers.pricePerUnit,
        currency: sellers.currency,
        deliveryTime: sellers.deliveryTime,
        preferredPaymentMethods: users.preferredPaymentMethods,
        totalVolume: sellers.totalVolume,
        createdAt: sellers.createdAt,
      })
      .from(sellers)
      .innerJoin(users, eq(sellers.userId, users.id))
      .where(eq(sellers.id, sellerId))
      .limit(1);

    if (!seller.length) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      );
    }

    const recentTransactions = await db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        status: transactions.status,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .where(eq(transactions.sellerId, sellerId))
      .orderBy(transactions.createdAt)
      .limit(5);

    const sellerReviews = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        comment: reviews.comment,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .innerJoin(
        transactions,
        eq(reviews.transactionId, transactions.id)
      )
      .where(eq(transactions.sellerId, sellerId))
      .orderBy(reviews.createdAt)
      .limit(5);

    return NextResponse.json({
      seller: seller[0],
      recentTransactions,
      reviews: sellerReviews,
    });
  } catch (error) {
    console.error("Error fetching seller:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}