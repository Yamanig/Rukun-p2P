"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { getSellerTransactions } from "@/lib/actions/transaction";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Star, ShieldCheck, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  amount: number;
  price: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  completedAt: string | null;
}

interface SellerStatsProps {
  seller: {
    id: string;
    username: string;
    rating: number | string | null;
    successfulTransactions: number;
    totalVolume: number;
  };
}

export function SellerStats({ seller }: SellerStatsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const result = await getSellerTransactions(seller.id);
        if (result.success) {
          setTransactions(result.transactions);
        } else {
          setError(result.error || "Failed to fetch transactions");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [seller.id]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  // Convert rating to number and handle null/undefined cases
  const rating = seller.rating ? Number(seller.rating) : 0;
  const isVerified = rating >= 4.5 && seller.successfulTransactions >= 100;
  const isTopSeller = rating >= 4.8 && seller.successfulTransactions >= 500;

  if (loading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Seller Statistics</CardTitle>
            <div className="flex gap-2">
              {isTopSeller && (
                <Badge className="bg-blue-500/10 text-blue-500 flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Top Seller
                </Badge>
              )}
              {isVerified && !isTopSeller && (
                <Badge className="bg-green-500/10 text-green-500 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{rating.toFixed(1)}</p>
                <Star className={cn(
                  "h-5 w-5",
                  rating >= 4.8 ? "text-yellow-400 fill-yellow-400" : 
                  rating >= 4.5 ? "text-yellow-500" : "text-gray-400"
                )} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Trades</p>
              <p className={cn(
                "text-2xl font-bold",
                seller.successfulTransactions >= 500 ? "text-blue-500" :
                seller.successfulTransactions >= 100 ? "text-green-500" : ""
              )}>
                {seller.successfulTransactions}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Volume</p>
              <p className="text-2xl font-bold">{seller.totalVolume.toLocaleString()} USDT</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No recent trades found
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>
                      {formatDistanceToNow(new Date(trade.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell>{trade.amount} USDT</TableCell>
                    <TableCell>${trade.price}</TableCell>
                    <TableCell>{trade.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(trade.status)}>
                        {trade.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}