"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarIcon, Clock3Icon, WalletIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PaymentMethod, Seller } from "@/types";

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
  // Add more mock sellers here...
];

export default function SellerListings() {
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | "all">("all");
  const [minRating, setMinRating] = useState<string>("0");

  return (
    <div>
      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Amount Range</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Payment Method</label>
            <Select
              value={selectedPaymentMethod}
              onValueChange={(value) => setSelectedPaymentMethod(value as PaymentMethod | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="EVC">EVC</SelectItem>
                <SelectItem value="E-DAHAB">E-DAHAB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger>
                <SelectValue placeholder="Select minimum rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any Rating</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.8">4.8+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </Card>

      {/* Listings */}
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
    </div>
  );
}