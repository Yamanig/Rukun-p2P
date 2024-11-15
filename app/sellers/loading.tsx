import { Skeleton } from "@/components/ui/skeleton";

export default function SellersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-10 w-48 mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Skeleton */}
        <aside className="lg:col-span-1">
          <Skeleton className="h-[500px] rounded-lg" />
        </aside>

        {/* Sellers Grid Skeleton */}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}