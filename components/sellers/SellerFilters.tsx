"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterValues {
  minAmount?: number;
  maxAmount?: number;
  minRating?: number;
  paymentMethod?: string;
  sortBy?: string;
}

interface SellerFiltersProps {
  initialFilters: FilterValues;
}

export function SellerFilters({ initialFilters }: SellerFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (updates: Partial<FilterValues>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    // Reset to page 1 when filters change
    params.set("page", "1");
    
    router.push(`/sellers?${params.toString()}`);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label>Amount Range (USDT)</Label>
          <div className="flex items-center space-x-4 mt-2">
            <Input
              type="number"
              placeholder="Min"
              defaultValue={initialFilters.minAmount}
              onChange={(e) => updateFilters({ minAmount: e.target.value ? Number(e.target.value) : undefined })}
            />
            <span>to</span>
            <Input
              type="number"
              placeholder="Max"
              defaultValue={initialFilters.maxAmount}
              onChange={(e) => updateFilters({ maxAmount: e.target.value ? Number(e.target.value) : undefined })}
            />
          </div>
        </div>

        <div>
          <Label>Minimum Rating</Label>
          <Slider
            defaultValue={[initialFilters.minRating || 0]}
            max={5}
            step={0.1}
            className="mt-2"
            onValueChange={([value]) => updateFilters({ minRating: value })}
          />
        </div>

        <div>
          <Label>Payment Method</Label>
          <Select
            defaultValue={initialFilters.paymentMethod || "all"}
            onValueChange={(value) => updateFilters({ paymentMethod: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="EVC">EVC</SelectItem>
              <SelectItem value="E-DAHAB">E-DAHAB</SelectItem>
              <SelectItem value="ZAAD">ZAAD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Sort By</Label>
          <Select
            defaultValue={initialFilters.sortBy || "price_asc"}
            onValueChange={(value) => updateFilters({ sortBy: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating_desc">Highest Rating</SelectItem>
              <SelectItem value="trades_desc">Most Trades</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full"
          onClick={() => {
            router.push("/sellers");
          }}
        >
          Reset Filters
        </Button>
      </div>
    </Card>
  );
}