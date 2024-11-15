import { getSellers } from "@/lib/actions/seller";
import { SellersList } from "./SellersList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface SellersListWrapperProps {
  page: number;
  limit: number;
}

export async function SellersListWrapper({ page, limit }: SellersListWrapperProps) {
  try {
    const { sellers, pagination } = await getSellers(page, limit);

    if (!sellers || sellers.length === 0) {
      return (
        <Alert className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No sellers data available. Be the first to register as a seller!
          </AlertDescription>
        </Alert>
      );
    }

    return <SellersList initialSellers={sellers} pagination={pagination} />;
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          An error occurred while loading sellers. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
}