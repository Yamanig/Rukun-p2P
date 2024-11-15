"use client";

import { Seller } from "@/lib/actions/seller";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";

interface SellerListProps {
  sellers: Seller[];
  totalPages: number;
  currentPage: number;
}

export function SellerList({ sellers, totalPages, currentPage }: SellerListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/exchange?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {sellers.map((seller) => (
          <Card key={seller.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{seller.username}</h3>
                <p className="text-sm text-muted-foreground">
                  Available: {seller.availableAmount} USDT
                </p>
                <p className="text-sm text-muted-foreground">
                  Price: ${seller.pricePerUnit}/USDT
                </p>
                <div className="mt-2 flex gap-2">
                  {seller.paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => router.push(`/exchange/${seller.id}`)}
                variant="outline"
              >
                Trade
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}