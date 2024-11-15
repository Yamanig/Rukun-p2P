import { Steps } from "@/components/Steps";
import { HowItWorksHero } from "@/components/HowItWorksHero";

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <HowItWorksHero />
      <Steps />
    </main>
  );
}