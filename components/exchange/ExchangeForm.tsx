"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExchangeFormProps {
  sellerId: string;
}

export function ExchangeForm({ sellerId }: ExchangeFormProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const rate = 1.02; // Mock rate, would come from API

  const totalCost = Number(amount) * rate;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Exchange Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USDT)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter USDT amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amount && (
            <p className="text-sm text-muted-foreground">
              Total cost: ${totalCost.toFixed(2)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="evc">EVC</SelectItem>
              <SelectItem value="edahab">E-DAHAB</SelectItem>
              <SelectItem value="zaad">ZAAD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" size="lg">
          Create Order
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          By creating this order, you agree to complete the payment within the
          specified timeframe
        </p>
      </CardContent>
    </Card>
  );
}