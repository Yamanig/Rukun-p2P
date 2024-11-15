export interface User {
  id: string;
  username: string;
  email: string;
  role: 'buyer' | 'seller';
  rating?: number;
  successfulTransactions?: number;
  preferredPaymentMethods?: PaymentMethod[];
  createdAt: Date;
}

export interface Seller extends User {
  id: string;
  userId: string;
  availableAmount: number;
  pricePerUnit: number;
  currency: string;
  deliveryTime: string;
  totalVolume?: number;
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: PaymentMethod;
  createdAt: Date;
  completedAt?: Date;
}

export type PaymentMethod = 'EVC' | 'E-DAHAB'| 'ZAAD' | 'GOLIS';

export interface Review {
  id: string;
  transactionId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}