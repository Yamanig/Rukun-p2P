"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, AlertCircle } from "lucide-react";

export function PaymentInstructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Instructions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please follow these steps carefully to complete your transaction safely
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
              1
            </div>
            <p className="text-sm">
              After creating the order, you will receive the seller&apos;s payment
              details
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
              2
            </div>
            <p className="text-sm">
              Send the exact payment amount using your selected payment method
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
              3
            </div>
            <p className="text-sm">
              Click &quot;I have paid&quot; and provide your payment reference
              number
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium">
              4
            </div>
            <p className="text-sm">
              Once the seller confirms your payment, USDT will be released to your
              wallet
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-md bg-muted p-3 mt-4">
          <Clock className="h-4 w-4" />
          <p className="text-sm">
            Complete payment within <span className="font-medium">15 minutes</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}