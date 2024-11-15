"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Seller {
  id: string;
  username: string;
  rating: number;
  successfulTransactions: number;
  availableAmount: number;
  pricePerUnit: number;
  currency: string;
  deliveryTime: string;
  preferredPaymentMethods: string[];
  totalVolume: number;
}

interface SellersTableProps {
  sellers: Seller[];
}

export function SellersTable({ sellers = [] }: SellersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("5");

  const indexOfLastItem = currentPage * Number(itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - Number(itemsPerPage);
  const currentSellers = sellers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sellers.length / Number(itemsPerPage));

  // Find the seller with the lowest price
  const lowestPrice = sellers.length > 0 
    ? Math.min(...sellers.map(s => Number(s.pricePerUnit)))
    : 0;

  if (sellers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No sellers available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Available</TableHead>
              <TableHead className="hidden md:table-cell">Payment Methods</TableHead>
              <TableHead className="hidden lg:table-cell">Delivery Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSellers.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {seller.username}
                      {Number(seller.pricePerUnit) === lowestPrice && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                          Best Price
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                      <span>{Number(seller.rating).toFixed(1)}</span>
                      <span>•</span>
                      <span>{seller.successfulTransactions} trades</span>
                      <span>•</span>
                      <span>{Number(seller.totalVolume).toLocaleString()} USDT volume</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">${Number(seller.pricePerUnit).toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">per USDT</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-green-500 font-medium">
                    {Number(seller.availableAmount).toLocaleString()} USDT
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {seller.preferredPaymentMethods.map((method) => (
                      <Badge key={method} variant="secondary">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {seller.deliveryTime}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/exchange/${seller.id}`}>
                    <Button size="sm">
                      Trade
                      <ArrowUpRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Rows per page</p>
          <Select
            value={itemsPerPage}
            onValueChange={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}