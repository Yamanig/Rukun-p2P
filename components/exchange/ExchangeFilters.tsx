"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterValues {
  amount?: number;
  paymentMethod?: string;
  minRating?: string;
}

interface ExchangeFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  initialFilters: FilterValues;
}

export function ExchangeFilters({ onFilterChange, initialFilters }: ExchangeFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (newFilters: Partial<FilterValues>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount (USDT)</Label>
          <Input 
            id="amount" 
            type="number" 
            placeholder="Enter amount" 
            value={filters.amount || ''}
            onChange={(e) => handleFilterChange({ amount: parseFloat(e.target.value) || undefined })}
          />
        </div>

        <div>
          <Label htmlFor="payment">Payment Method</Label>
          <Select 
            value={filters.paymentMethod}
            onValueChange={(value) => handleFilterChange({ paymentMethod: value })}
          >
            <SelectTrigger id="payment">
              <SelectValue placeholder="Select payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="evc">EVC</SelectItem>
              <SelectItem value="edahab">E-DAHAB</SelectItem>
              <SelectItem value="zaad">ZAAD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="rating">Minimum Rating</Label>
          <Select 
            value={filters.minRating}
            onValueChange={(value) => handleFilterChange({ minRating: value })}
          >
            <SelectTrigger id="rating">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Rating</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
              <SelectItem value="4.0">4.0+</SelectItem>
              <SelectItem value="3.5">3.5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}