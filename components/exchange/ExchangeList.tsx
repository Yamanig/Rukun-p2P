"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSellers } from "@/lib/actions/seller";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FilterValues {
  amount?: number;
  paymentMethod?: string;
  minRating?: string;
}

interface ExchangeListProps {
  filters: FilterValues;
}

export function ExchangeList({ filters }: ExchangeListProps) {
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      try {
        const result = await getSellers({
          minAmount: filters.amount,
          minRating: filters.minRating ? parseFloat(filters.minRating) : undefined,
          paymentMethod: filters.paymentMethod,
          page: currentPage,
          limit: itemsPerPage,
          sortBy: "price_asc", // Always sort by lowest price first
        });

        if (result.success) {
          setSellers(result.sellers);
          setTotalPages(result.pagination.totalPages);
          setError(null);
        } else {
          setError(result.error || "Failed to fetch sellers");
          setSellers([]);
        }
      } catch (err) {
        setError("An unexpected error occurred");
        setSellers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, [filters, currentPage, itemsPerPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (sellers.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>No sellers match your criteria</AlertDescription>
      </Alert>
    );
  }

  const lowestPrice = Math.min(...sellers.map(s => Number(s.pricePerUnit)));

  return (
    <div className="space-y-4">
      {sellers.map((seller) => {
        const isCheapest = Number(seller.pricePerUnit) === lowestPrice;
        return (
          <Card key={seller.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{seller.username}</h3>
                  {isCheapest && (
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                      Cheapest
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {seller.rating}
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    {seller.successfulTransactions} trades
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {seller.deliveryTime}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ${Number(seller.pricePerUnit).toFixed(2)}
                </div>
                <div className="text-sm text-green-500 font-medium">
                  {Number(seller.availableAmount).toLocaleString()} {seller.currency} available
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                {seller.preferredPaymentMethods?.map((method: string) => (
                  <Badge key={method} variant="secondary">
                    {method}
                  </Badge>
                ))}
              </div>
              <Link href={`/exchange/${seller.id}`}>
                <Button>Trade Now</Button>
              </Link>
            </div>
          </Card>
        );
      })}

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Sellers per page</p>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="12">12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}