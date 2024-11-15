import { getSellers } from "@/lib/actions/seller";
import { SellersTable } from "@/components/SellersTable";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";

export default async function Home() {
  const { sellers = [] } = await getSellers({ limit: 5, sortBy: "price_asc" });

  return (
    <main>
      <HeroSection />

      {/* Sellers Table Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Sellers</h2>
          </div>
          <SellersTable sellers={sellers} />
        </div>
      </section>

      <FeaturesSection />
    </main>
  );
}