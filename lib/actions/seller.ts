"use server";

import { db } from "@/src/db";
import { sellers, users } from "@/src/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { eq, and, gte, lte, desc, asc, sql } from "drizzle-orm";

interface FilterOptions {
  minAmount?: number;
  maxAmount?: number;
  minRating?: number;
  paymentMethod?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export async function getSellers(options: FilterOptions = {}) {
  try {
    const {
      minAmount,
      maxAmount,
      minRating,
      paymentMethod,
      sortBy = "price_asc",
      page = 1,
      limit = 10
    } = options;

    let conditions = [];

    if (minAmount) {
      conditions.push(gte(sellers.availableAmount, minAmount));
    }

    if (maxAmount) {
      conditions.push(lte(sellers.availableAmount, maxAmount));
    }

    if (minRating) {
      conditions.push(gte(users.rating, minRating));
    }

    if (paymentMethod && paymentMethod !== "all") {
      conditions.push(
        sql`${users.preferredPaymentMethods}::jsonb ?| array[${paymentMethod}]`
      );
    }

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(sellers)
      .innerJoin(users, eq(sellers.userId, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const total = totalCountResult[0]?.count || 0;
    const offset = (page - 1) * limit;

    let query = db
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
        isActive: sellers.isActive,
      })
      .from(sellers)
      .innerJoin(users, eq(sellers.userId, users.id));

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    switch (sortBy) {
      case "price_asc":
        query = query.orderBy(asc(sellers.pricePerUnit));
        break;
      case "price_desc":
        query = query.orderBy(desc(sellers.pricePerUnit));
        break;
      case "rating_desc":
        query = query.orderBy(desc(users.rating));
        break;
      case "trades_desc":
        query = query.orderBy(desc(users.successfulTransactions));
        break;
      case "volume_desc":
        query = query.orderBy(desc(sellers.totalVolume));
        break;
      default:
        query = query.orderBy(asc(sellers.pricePerUnit));
    }

    const sellersList = await query.limit(limit).offset(offset);

    return {
      success: true,
      sellers: sellersList,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      }
    };
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch sellers",
      sellers: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
      }
    };
  }
}

export async function getSeller(id: string) {
  try {
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
        isActive: sellers.isActive,
      })
      .from(sellers)
      .innerJoin(users, eq(sellers.userId, users.id))
      .where(eq(sellers.id, id))
      .limit(1);

    return seller[0];
  } catch (error) {
    console.error("Error fetching seller:", error);
    throw new Error("Failed to fetch seller");
  }
}

export async function createSeller(formData: FormData) {
  try {
    const data = {
      userId: formData.get("userId") as string,
      availableAmount: parseFloat(formData.get("availableAmount") as string),
      pricePerUnit: parseFloat(formData.get("pricePerUnit") as string),
      deliveryTime: formData.get("deliveryTime") as string,
      usdtAddress: formData.get("usdtAddress") as string,
      paymentMethods: formData.getAll("paymentMethods"),
    };

    const result = await db.insert(sellers).values({
      userId: data.userId,
      availableAmount: data.availableAmount,
      pricePerUnit: data.pricePerUnit,
      deliveryTime: data.deliveryTime,
      usdtAddress: data.usdtAddress,
      isActive: true,
    });

    revalidatePath("/sellers");
    revalidatePath("/exchange");
    
    return { success: true };
  } catch (error) {
    console.error("Error creating seller:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create seller" 
    };
  }
}