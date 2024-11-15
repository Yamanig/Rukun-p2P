"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, Clock3Icon, WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Seller } from "@/types";

const mockSellers: Seller[] = [
  {
    id: "1",
    username: "TrustedTrader",
    email: "trader@example.com",
    role: "seller",
    rating: 4.9,
    successfulTransactions: 156,
    preferredPaymentMethods: ["EVC", "E-DAHAB"],
    availableAmount: 5000,
    pricePerUnit: 1.02,
    currency: "USDT",
    deliveryTime: "15 minutes",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    username: "CryptoMaster",
    email: "crypto@example.com",
    role: "seller",
    rating: 4.8,
    successfulTransactions: 98,
    preferredPaymentMethods: ["EVC"],
    availableAmount: 3000,
    pricePerUnit: 1.01,
    currency: "USDT",
    deliveryTime: "30 minutes",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "3",
    username: "FastExchange",
    email: "fast@example.com",
    role: "seller",
    rating: 4.7,
    successfulTransactions: 78,
    preferredPaymentMethods: ["E-DAHAB"],
    availableAmount: 2000,
    pricePerUnit: 1.03,
    currency: "USDT",
    deliveryTime: "20 minutes",
    createdAt: new Date("2024-03-01"),
  },
];

export default function FeaturedSellers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockSellers.map((seller) => (
        <Card key={seller.id} className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{seller.username}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <StarIcon className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                <span>{seller.rating}</span>
                <span className="mx-1">•</span>
                <span>{seller.successfulTransactions} trades</span>
              </div>
            </div>
            <Badge variant="secondary">Featured</Badge>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              <WalletIcon className="h-4 w-4 text-muted-foreground" />
              <span>
                {seller.availableAmount.toLocaleString()} {seller.currency} available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3Icon className="h-4 w-4 text-muted-foreground" />
              <span>{seller.deliveryTime} delivery</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {seller.preferredPaymentMethods.map((method) => (
              <Badge key={method} variant="outline">
                {method}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${seller.pricePerUnit}</p>
              <p className="text-sm text-muted-foreground">per USDT</p>
            </div>
            <Button>Trade Now</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}