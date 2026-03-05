"use client"

import { motion } from "framer-motion"
import { ArrowDown, Building, MapPin, Users, Trophy } from "lucide-react"
import { Scene3D } from "./scene-3d"

const stats = [
  { icon: Building, value: "5+", label: "Ongoing Projects" },
  { icon: MapPin, value: "Hyderabad", label: "Prime Locations" },
  { icon: Users, value: "100%", label: "Customer Satisfaction" },
  { icon: Trophy, value: "10+", label: "Years of Excellence" },
]

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-hero">
      <Scene3D />

      {/* Overlay gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Premium Real Estate
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl text-balance"
          >
            <span className="text-gradient-gold">Pradeep</span>{" "}
            Groups
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-2 font-serif text-xl text-primary md:text-2xl"
          >
            Building Dreams, Creating Homes
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Experience luxury living with our premium real estate solutions in Hyderabad. 
            We transform your vision into reality with exceptional craftsmanship and 
            unparalleled attention to detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            >
              Explore Projects
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-foreground transition-all hover:scale-105"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mt-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="glass-card flex items-center gap-3 rounded-2xl px-4 py-4 md:px-6 md:py-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 md:h-12 md:w-12">
                <stat.icon className="h-5 w-5 text-primary md:h-6 md:w-6" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground md:text-2xl">{stat.value}</div>
                <div className="text-xs text-muted-foreground md:text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-muted-foreground uppercase">Scroll Down</span>
          <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
