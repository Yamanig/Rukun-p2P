"use client";

import { Star, Clock, Wallet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SellerCardProps {
  seller: {
    id: string;
    username: string;
    availableAmount: string | number;
    pricePerUnit: string | number;
    currency: string;
    deliveryTime: string;
    preferredPaymentMethods?: string[];
    rating: string | number | null;
    successfulTransactions: string | number;
    isActive: boolean;
    isCheapest?: boolean;
  };
}

export function SellerCard({ seller }: SellerCardProps) {
  const rating = seller.rating ? Number(seller.rating) : 0;
  const transactions = Number(seller.successfulTransactions);
  const availableAmount = Number(seller.availableAmount);
  const pricePerUnit = Number(seller.pricePerUnit);

  // Determine verification status based on rating and transactions
  const isVerified = rating >= 4.5 && transactions >= 100;
  const isTopSeller = rating >= 4.8 && transactions >= 500;

  if (!seller.isActive) {
    return (
      <Card className="opacity-60">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{seller.username}</h3>
              <Badge variant="secondary" className="bg-gray-500/10 text-gray-500">
                Currently Inactive
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg",
      isTopSeller ? "border-blue-500/50" : "",
      isVerified ? "border-green-500/30" : ""
    )}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{seller.username}</h3>
              {isTopSeller && (
                <Badge className="bg-blue-500/10 text-blue-500 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Top Seller
                </Badge>
              )}
              {isVerified && !isTopSeller && (
                <Badge className="bg-green-500/10 text-green-500 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {seller.isCheapest && (
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Best Price
                </Badge>
              )}
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className={cn(
                  "h-4 w-4 mr-1",
                  rating >= 4.8 ? "text-yellow-400 fill-yellow-400" : 
                  rating >= 4.5 ? "text-yellow-500" : "text-gray-400"
                )} />
                <span>{rating.toFixed(1)}</span>
              </div>
              <span className="mx-2">•</span>
              <span className={cn(
                transactions >= 500 ? "text-blue-500" :
                transactions >= 100 ? "text-green-500" : ""
              )}>
                {transactions} trades
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">${pricePerUnit.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">per USDT</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Wallet className="h-4 w-4 mr-2" />
            <span className="text-green-500 font-medium">
              {availableAmount.toLocaleString()} {seller.currency} available
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>{seller.deliveryTime}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {seller.preferredPaymentMethods?.map((method) => (
              <Badge 
                key={method} 
                variant="secondary"
                className="transition-all duration-300 hover:bg-primary/10"
              >
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/exchange/${seller.id}`} className="w-full">
          <Button 
            className={cn(
              "w-full transition-all duration-300",
              isTopSeller ? "bg-blue-500 hover:bg-blue-600" :
              isVerified ? "bg-green-500 hover:bg-green-600" : ""
            )}
          >
            Trade Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}