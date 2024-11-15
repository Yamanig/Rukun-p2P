"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Loader2 } from "lucide-react";
import { createTransaction } from "@/lib/actions/transaction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TradeFormProps {
  seller: {
    id: string;
    pricePerUnit: number;
    availableAmount: number;
    preferredPaymentMethods?: string[];
    isActive: boolean;
  };
}

export function TradeForm({ seller }: TradeFormProps) {
  const [amount, setAmount] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createTransaction({
        buyerId: "temp-buyer-id", // This would come from auth
        sellerId: seller.id,
        amount: Number(amount),
        price: Number(amount) * seller.pricePerUnit,
        paymentMethod,
        usdtAddress,
      });

      if (result.success) {
        toast.success("Trade initiated successfully!");
        router.push("/transactions");
      } else {
        toast.error(result.error || "Failed to create trade");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error("Failed to create trade. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidTronAddress = (address: string) => {
    return /^T[A-Za-z0-9]{33}$/.test(address);
  };

  const isValidEthAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const isValidAddress = (address: string) => {
    return isValidTronAddress(address) || isValidEthAddress(address);
  };

  if (!seller.isActive) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This seller is currently inactive and not accepting trades.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const paymentMethods = seller.preferredPaymentMethods || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Amount (USDT)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              max={seller.availableAmount}
            />
            <p className="text-sm text-muted-foreground">
              Available: {seller.availableAmount} USDT
            </p>
          </div>

          <div className="space-y-2">
            <Label>USDT Receiving Address</Label>
            <Input
              type="text"
              value={usdtAddress}
              onChange={(e) => setUsdtAddress(e.target.value)}
              placeholder="Enter your USDT address (TRC20 or ERC20)"
            />
            {usdtAddress && !isValidAddress(usdtAddress) && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please enter a valid USDT address (TRC20 or ERC20)
                </AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-muted-foreground">
              Supports both TRC20 (Tron) and ERC20 (Ethereum) networks
            </p>
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method.toLowerCase()}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Total Price</Label>
            <div className="text-2xl font-bold">
              ${amount ? (Number(amount) * seller.pricePerUnit).toFixed(2) : "0.00"}
            </div>
            <p className="text-sm text-muted-foreground">
              Rate: ${seller.pricePerUnit} per USDT
            </p>
          </div>

          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Make sure to double-check your USDT receiving address. Transactions cannot be reversed.
            </AlertDescription>
          </Alert>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!amount || !isValidAddress(usdtAddress) || !paymentMethod || isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Start Trade
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            By starting this trade, you agree to complete the payment within the specified timeframe
          </p>
        </form>
      </CardContent>
    </Card>
  );
}