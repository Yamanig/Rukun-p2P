import { Skeleton } from "@/components/ui/skeleton";

export default function ExchangeDetailLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Seller Info Skeleton */}
          <Skeleton className="h-32" />
          
          {/* Stats Skeleton */}
          <Skeleton className="h-64" />
        </div>

        {/* Trade Form Skeleton */}
        <div className="lg:col-span-1">
          <Skeleton className="h-[600px]" />
        </div>
      </div>
    </main>
  );
}