import { Suspense } from "react";
import { SellersList } from "@/components/sellers/SellersList";
import { SellerFilters } from "@/components/sellers/SellerFilters";
import Loading from "./loading";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SellersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters = {
    minAmount: searchParams.minAmount ? Number(searchParams.minAmount) : undefined,
    maxAmount: searchParams.maxAmount ? Number(searchParams.maxAmount) : undefined,
    minRating: searchParams.minRating ? Number(searchParams.minRating) : undefined,
    paymentMethod: searchParams.paymentMethod as string | undefined,
    sortBy: searchParams.sortBy as string | undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: searchParams.limit ? Number(searchParams.limit) : 6,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">USDT Sellers</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SellerFilters initialFilters={filters} />
        </aside>
        <main className="lg:col-span-3">
          <Suspense fallback={<Loading />}>
            <SellersList filters={filters} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}