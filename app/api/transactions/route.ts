import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { transactions } from "@/src/db/schema";
import { eq, or } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyerId, sellerId, amount, price, paymentMethod, usdtAddress } = body;

    const newTransaction = await db.insert(transactions).values({
      buyerId,
      sellerId,
      amount,
      price,
      currency: "USDT",
      paymentMethod,
      usdtAddress,
      status: "pending",
    }).returning();

    return NextResponse.json(newTransaction[0]);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const offset = (page - 1) * limit;

    let query = db.select().from(transactions);

    if (userId) {
      query = query.where(
        or(
          eq(transactions.buyerId, parseInt(userId)),
          eq(transactions.sellerId, parseInt(userId))
        )
      );
    }

    if (status) {
      query = query.where(eq(transactions.status, status));
    }

    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions);

    const total = totalCount[0]?.count || 0;
    const transactionsList = await query.limit(limit).offset(offset);

    return NextResponse.json({
      transactions: transactionsList,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}