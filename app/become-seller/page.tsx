import { Suspense } from "react";
import { createSeller } from "@/lib/actions/seller";
import { SellerRegistrationForm } from "@/components/seller/SellerRegistrationForm";
import Loading from "./loading";

export default function BecomeSellerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">Become a Seller</h1>
        <p className="text-muted-foreground">
          Join our trusted community of USDT sellers and start trading today
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <SellerRegistrationForm createSeller={createSeller} />
      </Suspense>
    </div>
  );
}