"use client";

import { Suspense } from "react";
import { ExchangeList } from "@/components/exchange/ExchangeList";
import { ExchangeFilters } from "@/components/exchange/ExchangeFilters";
import Loading from "./loading";
import { useState } from "react";

interface FilterValues {
  amount?: number;
  paymentMethod?: string;
  minRating?: string;
}

export default function ExchangePage() {
  const [filters, setFilters] = useState<FilterValues>({
    amount: undefined,
    paymentMethod: undefined,
    minRating: "4.0"
  });

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ExchangeFilters onFilterChange={handleFilterChange} initialFilters={filters} />
        </aside>
        <main className="lg:col-span-3">
          <Suspense fallback={<Loading />}>
            <ExchangeList filters={filters} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}