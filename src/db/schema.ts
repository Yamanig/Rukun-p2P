import { 
  pgTable, 
  text, 
  timestamp, 
  uuid, 
  decimal, 
  integer,
  boolean,
  json
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
  role: text('role').notNull().default('buyer'),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  successfulTransactions: integer('successful_transactions').default(0),
  preferredPaymentMethods: json('preferred_payment_methods'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sellers = pgTable('sellers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  availableAmount: decimal('available_amount', { precision: 10, scale: 2 }).notNull(),
  pricePerUnit: decimal('price_per_unit', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('USDT'),
  deliveryTime: text('delivery_time').notNull(),
  usdtAddress: text('usdt_address').notNull(),
  isActive: boolean('is_active').default(true),
  totalVolume: decimal('total_volume', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  buyerId: uuid('buyer_id').references(() => users.id),
  sellerId: uuid('seller_id').references(() => users.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull(),
  status: text('status').notNull().default('pending'),
  paymentMethod: text('payment_method').notNull(),
  usdtAddress: text('usdt_address').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  transactionId: uuid('transaction_id').references(() => transactions.id),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});