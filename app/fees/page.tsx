"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Percent, DollarSign, ArrowRightLeft } from "lucide-react";

const feeCategories = [
  {
    title: "Standard Trading Fees",
    description: "Basic fees for all transactions",
    items: [
      { type: "Buy USDT", fee: "0.1%", note: "Of transaction amount" },
      { type: "Sell USDT", fee: "0.1%", note: "Of transaction amount" },
      { type: "Conversion", fee: "0.05%", note: "For currency conversion" }
    ]
  },
  {
    title: "Payment Method Fees",
    description: "Additional fees based on payment method",
    items: [
      { type: "EVC Plus", fee: "Free", note: "No additional charges" },
      { type: "E-DAHAB", fee: "Free", note: "No additional charges" },
      { type: "Bank Transfer", fee: "0.1%", note: "Of transfer amount" }
    ]
  }
];

export default function FeesPage() {
  return (
    <div className="min-h-screen py-12 bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold mb-4"
          >
            Transparent Fee Structure
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in complete transparency. Our fee structure is designed to be fair and competitive.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-lg bg-primary/5"
          >
            <Percent className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Low Trading Fees</h3>
            <p className="text-muted-foreground">
              Enjoy competitive trading fees starting from just 0.1%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-lg bg-primary/5"
          >
            <DollarSign className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Hidden Charges</h3>
            <p className="text-muted-foreground">
              What you see is what you pay. No surprise fees or hidden costs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-lg bg-primary/5"
          >
            <ArrowRightLeft className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Free Transfers</h3>
            <p className="text-muted-foreground">
              Most payment methods have zero additional transfer fees
            </p>
          </motion.div>
        </div>

        {feeCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (index + 1) }}
            className="mb-8"
          >
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
              <p className="text-muted-foreground mb-6">{category.description}</p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.items.map((item) => (
                    <TableRow key={item.type}>
                      <TableCell className="font-medium">{item.type}</TableCell>
                      <TableCell>{item.fee}</TableCell>
                      <TableCell className="text-muted-foreground">{item.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-lg bg-muted text-center"
        >
          <p className="text-sm text-muted-foreground">
            * All fees are subject to change based on market conditions and platform policies.
            We will notify users of any changes in advance.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}