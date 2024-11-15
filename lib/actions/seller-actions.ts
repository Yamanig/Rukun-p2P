"use server";

import { db } from "@/src/db";
import { sellers, users } from "@/src/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const sellerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  availableAmount: z.number().positive("Amount must be positive"),
  pricePerUnit: z.number().positive("Price must be positive"),
  deliveryTime: z.string().min(1, "Delivery time is required"),
  paymentMethods: z.array(z.string()).min(1, "At least one payment method is required"),
  usdtAddress: z.string().regex(/^(T[A-Za-z0-9]{33}|0x[a-fA-F0-9]{40})$/, "Invalid USDT address"),
});

export type SellerFormData = z.infer<typeof sellerSchema>;

export async function createSeller(data: SellerFormData) {
  try {
    const validatedData = sellerSchema.parse(data);

    const result = await db.transaction(async (tx) => {
      // Check if user already exists
      const existingUser = await tx.query.users.findFirst({
        where: (users, { or, eq }) => or(
          eq(users.email, validatedData.email),
          eq(users.username, validatedData.username)
        )
      });

      if (existingUser) {
        throw new Error("User with this email or username already exists");
      }

      // Create user
      const [user] = await tx
        .insert(users)
        .values({
          username: validatedData.username,
          email: validatedData.email,
          phone: validatedData.phone,
          role: "seller",
          preferredPaymentMethods: validatedData.paymentMethods,
        })
        .returning();

      // Create seller profile
      const [seller] = await tx
        .insert(sellers)
        .values({
          userId: user.id,
          availableAmount: validatedData.availableAmount,
          pricePerUnit: validatedData.pricePerUnit,
          deliveryTime: validatedData.deliveryTime,
          usdtAddress: validatedData.usdtAddress,
          isActive: true,
          totalVolume: 0,
        })
        .returning();

      return { user, seller };
    });

    revalidatePath("/sellers");
    revalidatePath("/exchange");

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error("Seller registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to register seller"
    };
  }
}