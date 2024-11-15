import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function HowItWorksHero() {
  return (
    <div className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Works
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our P2P USDT exchange platform makes trading simple, secure, and fast.
            Follow these steps to get started with buying or selling USDT.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/exchange">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Start Trading
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}