"use client";

import { Star, Shield, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SellerInfoProps {
  sellerId: string;
}

export function SellerInfo({ sellerId }: SellerInfoProps) {
  // Mock data - would come from API
  const seller = {
    username: "TrustedTrader",
    rating: 4.9,
    successfulTransactions: 324,
    averageDeliveryTime: "15-30 minutes",
    preferredPaymentMethods: ["EVC", "E-DAHAB"],
    verificationLevel: "Advanced",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seller Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">{seller.username}</h3>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm">{seller.rating}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm">
              {seller.successfulTransactions} successful trades
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              Average delivery: {seller.averageDeliveryTime}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Accepted Payment Methods</p>
          <div className="flex flex-wrap gap-2">
            {seller.preferredPaymentMethods.map((method) => (
              <Badge key={method} variant="secondary">
                {method}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm">
            <span className="font-medium">Verification Level:</span>{" "}
            {seller.verificationLevel}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}