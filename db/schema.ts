import { 
  pgTable, 
  text, 
  timestamp, 
  uuid, 
  decimal, 
  integer,
  boolean 
} from 'drizzle-orm/pg-core';

export const sellers = pgTable('sellers', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  availableAmount: decimal('available_amount', { precision: 18, scale: 2 }).notNull(),
  pricePerUnit: decimal('price_per_unit', { precision: 10, scale: 2 }).notNull(),
  deliveryTime: integer('delivery_time').notNull(), // in minutes
  paymentMethods: text('payment_methods').array().notNull(),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  successfulTransactions: integer('successful_transactions').default(0),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  sellerId: uuid('seller_id').references(() => sellers.id),
  buyerId: uuid('buyer_id'), // References users table if you add one
  amount: decimal('amount', { precision: 18, scale: 2 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  status: text('status').notNull(), // pending, completed, cancelled
  paymentMethod: text('payment_method').notNull(),
  usdtAddress: text('usdt_address').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});