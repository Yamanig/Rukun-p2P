import { Skeleton } from "@/components/ui/skeleton";

export default function FeesLoading() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Feature Cards Skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>

        {/* Fee Categories Skeleton */}
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-96 mb-8" />
        ))}

        <Skeleton className="h-24 mt-12" />
      </div>
    </div>
  );
}