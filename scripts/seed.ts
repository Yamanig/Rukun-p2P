
import { users, sellers } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function main() {
   if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  console.log('🌱 Seeding database...');

  try {
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);
    // Create test users and sellers
    const testSellers = [
      {
        username: 'trusted_trader',
        email: 'trader1@example.com',
        phone: '+1234567890',
        rating: 4.8,
        successfulTransactions: 156,
        preferredPaymentMethods: ['EVC', 'E-DAHAB'],
        availableAmount: 5000,
        pricePerUnit: 1.02,
        deliveryTime: '15-30 minutes',
        usdtAddress: 'TXyz123...',
      },
      {
        username: 'crypto_master',
        email: 'trader2@example.com',
        phone: '+1234567891',
        rating: 4.9,
        successfulTransactions: 243,
        preferredPaymentMethods: ['EVC'],
        availableAmount: 10000,
        pricePerUnit: 1.01,
        deliveryTime: '15 minutes',
        usdtAddress: 'TXyz456...',
      },
      {
        username: 'quick_exchange',
        email: 'trader3@example.com',
        phone: '+1234567892',
        rating: 4.7,
        successfulTransactions: 89,
        preferredPaymentMethods: ['E-DAHAB', 'ZAAD'],
        availableAmount: 3000,
        pricePerUnit: 1.03,
        deliveryTime: '30 minutes',
        usdtAddress: 'TXyz789...',
      },
    ];

    for (const sellerData of testSellers) {
      // Check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.username, sellerData.username))
        .limit(1);

      if (existingUser.length === 0) {
        // Create user
        const [newUser] = await db
          .insert(users)
          .values({
            username: sellerData.username,
            email: sellerData.email,
            phone: sellerData.phone,
            role: 'seller',
            rating: sellerData.rating,
            successfulTransactions: sellerData.successfulTransactions,
            preferredPaymentMethods: sellerData.preferredPaymentMethods,
          })
          .returning();

        // Create seller profile
        await db.insert(sellers).values({
          userId: newUser.id,
          availableAmount: sellerData.availableAmount,
          pricePerUnit: sellerData.pricePerUnit,
          deliveryTime: sellerData.deliveryTime,
          usdtAddress: sellerData.usdtAddress,
          isActive: true,
          totalVolume: 0,
        });

        console.log(`✅ Created seller: ${sellerData.username}`);
      } else {
        console.log(`ℹ️ Seller ${sellerData.username} already exists`);
      }
    }

    console.log('✅ Seed completed successfully');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

main();