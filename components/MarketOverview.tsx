"use client";

import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { time: "00:00", price: 1.015 },
  { time: "04:00", price: 1.018 },
  { time: "08:00", price: 1.012 },
  { time: "12:00", price: 1.020 },
  { time: "16:00", price: 1.017 },
  { time: "20:00", price: 1.019 },
  { time: "24:00", price: 1.021 },
];

export default function MarketOverview() {
  const currentPrice = 1.021;
  const previousPrice = 1.019;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercentage = (priceChange / previousPrice) * 100;

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h3 className="text-lg font-semibold mb-4">USDT/USD Price Chart</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <XAxis dataKey="time" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Price</h3>
            <div className="text-3xl font-bold">${currentPrice}</div>
            <div className="flex items-center gap-1 mt-1">
              {priceChange >= 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={priceChange >= 0 ? "text-green-500" : "text-red-500"}
              >
                {priceChange.toFixed(4)} ({priceChangePercentage.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">24h Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-medium">$1,234,567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h High</span>
                <span className="font-medium">$1.025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">24h Low</span>
                <span className="font-medium">$1.012</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}