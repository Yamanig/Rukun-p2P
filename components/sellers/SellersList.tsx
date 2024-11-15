"use client";

import { useState, useEffect } from "react";
import { SellerCard } from "./SellerCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

interface FilterValues {
  minAmount?: number;
  maxAmount?: number;
  minRating?: number;
  paymentMethod?: string;
  sortBy?: string;
}

interface SellersListProps {
  filters: FilterValues;
}

export function SellersList({ filters }: SellersListProps) {
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      try {
        const result = await getSellers({
          ...filters,
          page: currentPage,
          limit: itemsPerPage,
        });

        if (result.success) {
          // Find the lowest price
          const lowestPrice = Math.min(...result.sellers.map(s => Number(s.pricePerUnit)));
          
          // Add isCheapest flag to sellers
          const sellersWithBadge = result.sellers.map(seller => ({
            ...seller,
            isCheapest: Number(seller.pricePerUnit) === lowestPrice
          }));

          setSellers(sellersWithBadge);
          setTotalPages(result.pagination.totalPages);
          setTotalItems(result.pagination.totalItems);
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
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    );
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {totalItems} Sellers Available
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>

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
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </p>
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
    </div>
  );
}