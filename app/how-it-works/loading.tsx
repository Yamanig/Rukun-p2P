import { Skeleton } from "@/components/ui/skeleton";

export default function HowItWorksLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <Skeleton className="h-16 w-96 mb-6" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-32 mt-10" />
          </div>
        </div>
      </div>

      {/* Steps Skeleton */}
      <div className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}