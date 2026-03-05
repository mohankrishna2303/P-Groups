"use client"

import { motion } from "framer-motion"

const items = [
  "Pradeep Pride Residency",
  "Premium Construction",
  "Luxury Apartments",
  "Smart Homes",
  "Earthquake Resistant",
  "Pradeep Pride",
  "100% Satisfaction",
  "Riveria Residency",
  "M25 Grade Concrete",
  "Hyderabad Locations",
  "Advika LakshmiHomes",
  "Building Dreams",
]

export function MarqueeBanner() {
  return (
    <div className="overflow-hidden border-y border-border py-5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-8"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
