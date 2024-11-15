"use server";

import { db } from "@/src/db";
import { transactions, sellers, users } from "@/src/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and, desc, sql } from "drizzle-orm";

interface GetTransactionsOptions {
  page?: number;
  status?: string;
  limit?: number;
}

export async function getTransactions(options: GetTransactionsOptions = {}) {
  try {
    const { page = 1, status, limit = 10 } = options;
    const offset = (page - 1) * limit;

    let query = db.select().from(transactions);
    let conditions = [];

    if (status) {
      conditions.push(eq(transactions.status, status));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(transactions)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const total = totalCountResult[0]?.count || 0;

    const transactionsList = await query
      .orderBy(desc(transactions.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      transactions: transactionsList,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      }
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return {
      transactions: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
      }
    };
  }
}

export async function getSellerTransactions(sellerId: string, limit = 5) {
  try {
    const recentTransactions = await db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        price: transactions.price,
        status: transactions.status,
        paymentMethod: transactions.paymentMethod,
        createdAt: transactions.createdAt,
        completedAt: transactions.completedAt,
      })
      .from(transactions)
      .where(eq(transactions.sellerId, sellerId))
      .orderBy(desc(transactions.createdAt))
      .limit(limit);

    return { success: true, transactions: recentTransactions };
  } catch (error) {
    console.error("Error fetching seller transactions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch transactions",
      transactions: [],
    };
  }
}

export async function createTransaction(data: {
  buyerId: string;
  sellerId: string;
  amount: number;
  price: number;
  paymentMethod: string;
  usdtAddress: string;
}) {
  try {
    const result = await db.transaction(async (tx) => {
      // Check seller's available amount
      const seller = await tx
        .select()
        .from(sellers)
        .where(eq(sellers.id, data.sellerId))
        .limit(1);

      if (!seller.length) {
        throw new Error("Seller not found");
      }

      if (!seller[0].isActive) {
        throw new Error("Seller is currently inactive");
      }

      if (Number(seller[0].availableAmount) < data.amount) {
        throw new Error("Insufficient seller balance");
      }

      // Create transaction
      const [newTransaction] = await tx
        .insert(transactions)
        .values({
          buyerId: data.buyerId,
          sellerId: data.sellerId,
          amount: data.amount,
          price: data.price,
          currency: "USDT",
          status: "pending",
          paymentMethod: data.paymentMethod,
          usdtAddress: data.usdtAddress,
        })
        .returning();

      // Update seller's available amount
      await tx
        .update(sellers)
        .set({
          availableAmount: Number(seller[0].availableAmount) - data.amount,
        })
        .where(eq(sellers.id, data.sellerId));

      return newTransaction;
    });

    revalidatePath("/transactions");
    revalidatePath(`/exchange/${data.sellerId}`);
    revalidatePath("/exchange");
    revalidatePath("/sellers");

    return { success: true, transaction: result };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create transaction",
    };
  }
}