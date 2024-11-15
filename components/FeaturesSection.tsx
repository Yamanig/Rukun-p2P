"use client";

import { Shield, Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

const features = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Every transaction is protected with advanced security measures and escrow service.",
    link: "/security",
    stats: ["100% Secure", "Zero Fraud", "24/7 Support"],
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Quick transaction processing with most trades completed within minutes.",
    link: "/processing",
    stats: ["< 15min Average", "Real-time Updates", "Instant Matching"],
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join our growing community of verified traders with proven track records.",
    link: "/community",
    stats: ["10K+ Users", "4.9/5 Rating", "95% Success Rate"],
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">Why Choose Us</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Experience the most secure and efficient P2P USDT exchange platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="rounded-lg p-3 ring-1 ring-gray-900/10 dark:ring-gray-100/10 bg-background w-fit group-hover:ring-blue-500/50 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>

                <h3 className="mt-6 text-xl font-semibold group-hover:text-blue-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {feature.stats.map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 + statIndex * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-sm font-medium text-blue-500">{stat}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link href={feature.link}>
                    <Button
                      variant="ghost"
                      className="w-full group/btn hover:bg-blue-500/10"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}