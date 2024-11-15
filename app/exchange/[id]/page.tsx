import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSeller } from "@/lib/actions/seller";
import { SellerStats } from "@/components/exchange/SellerStats";
import { TradeForm } from "@/components/exchange/TradeForm";
import { PaymentInstructions } from "@/components/exchange/PaymentInstructions";
import Loading from "./loading";

export default async function SellerPage({ params }: { params: { id: string } }) {
  try {
    const seller = await getSeller(params.id);

    if (!seller) {
      notFound();
    }

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Suspense fallback={<Loading />}>
            <div className="lg:col-span-2 space-y-6">
              <SellerStats seller={seller} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <TradeForm seller={seller} />
              <PaymentInstructions />
            </div>
          </Suspense>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading seller:", error);
    notFound();
  }
}