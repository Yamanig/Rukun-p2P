import { Skeleton } from "@/components/ui/skeleton";

export default function BecomeSellerLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <Skeleton className="h-10 w-64 mx-auto mb-3" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <Skeleton className="h-[800px]" />
    </div>
  );
}