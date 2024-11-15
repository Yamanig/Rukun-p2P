"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { FlowBackground } from "./FlowBackground";
import { FlowEdges } from "./FlowEdges";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/90 to-black">
        <FlowBackground />
        <FlowEdges />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
              >
                <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  Trusted by 10,000+ users worldwide
                </span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl"
              >
                The Future of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  P2P USDT Exchange
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl text-gray-300 max-w-xl"
              >
                Experience lightning-fast USDT trades with trusted users. Multiple payment methods, 
                instant transfers, and secure transactions.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/exchange">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                  Start Trading
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sellers">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-500/20 text-white hover:bg-blue-500/10">
                  View Sellers
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
            >
              {[
                { label: "Active Users", value: "10K+" },
                { label: "Daily Volume", value: "$2M+" },
                { label: "Avg. Trade Time", value: "< 15min" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
            <div className="relative bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">Secure Escrow</div>
                      <div className="text-sm text-gray-400">Protected Transactions</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Clock, label: "Fast Processing", desc: "15 min average" },
                    { icon: Users, label: "Verified Sellers", desc: "100% secure" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{feature.label}</div>
                        <div className="text-xs text-gray-400">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}