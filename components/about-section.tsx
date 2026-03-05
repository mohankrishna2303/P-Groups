"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Shield, Award, Users, Clock, Sparkles, Target, HardHat, Ruler } from "lucide-react"
import Image from "next/image"
import type { MouseEvent } from "react"

const features = [
  {
    icon: HardHat,
    title: "Premium Construction",
    description: "M25 grade concrete and IS456 approved steel for earthquake-resistant structures that stand the test of time.",
  },
  {
    icon: Award,
    title: "Quality Materials",
    description: "Only the highest quality materials including teak wood doors, UPVC windows, and premium vitrified flooring.",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    description: "No hidden costs. Completely transparent pricing with detailed specifications for every element of your home.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We deliver on our promises. Every project completed within the committed timeline, no exceptions.",
  },
  {
    icon: Sparkles,
    title: "Modern Amenities",
    description: "Smart home features, modular kitchens, CCTV surveillance, generator backup, and premium branded fittings.",
  },
  {
    icon: Target,
    title: "Prime Locations",
    description: "Strategically located developments in Hyderabad's most sought-after neighborhoods for maximum value.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "100% customer satisfaction through personalized service, quality commitment, and long-term relationships.",
  },
  {
    icon: Ruler,
    title: "Expert Engineering",
    description: "RCC framed structures with reinforced cement concrete, designed by professional engineers for maximum durability.",
  },
]

function TiltCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 })

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="glass-card group cursor-default rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
        <feature.icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
    </motion.div>
  )
}

export function AboutSection() {
  return (
    <section id="why-choose" className="relative py-24 md:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-64 w-64 rounded-full bg-teal/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* About intro */}
        <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              About Pradeep Groups
            </span>
            <h2 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
              Modern Living, <span className="text-gradient-gold">Built Just</span> For You
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Pradeep Builders & Developers is a trusted name in premium residential construction,
              committed to delivering quality homes that blend luxury, durability, and modern living.
              With a strong foundation built on engineering excellence and customer trust.
            </p>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              We focus on constructing earthquake-resistant RCC framed structures using high-grade materials
              and industry-approved standards. From reinforced cement concrete structures to premium steel,
              teak wood doors, UPVC windows, and vitrified flooring - every detail is carefully planned.
            </p>

            {/* Vision & Mission */}
            <div className="flex flex-col gap-4">
              <div className="glass-card rounded-xl p-4">
                <h4 className="mb-1 text-sm font-bold text-primary">Our Vision</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To redefine urban living by delivering high-quality, sustainable, and
                  innovation-driven residential projects that stand as benchmarks of excellence.
                </p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <h4 className="mb-1 text-sm font-bold text-teal">Our Mission</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To build structurally strong, aesthetically pleasing homes using premium materials,
                  modern technologies, and transparent practices while maintaining long-term relationships.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-card overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/3]">
                <Image src="/images/PRADEEP-98X38-33.jpg.jpeg" alt="Pradeep Groups luxury property showcase" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass absolute -bottom-6 -left-6 rounded-2xl px-6 py-4"
            >
              <p className="text-3xl font-bold text-gradient-gold">100%</p>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass absolute -top-4 -right-4 rounded-2xl px-5 py-3"
            >
              <p className="text-2xl font-bold text-gradient-teal">5+</p>
              <p className="text-xs text-muted-foreground">Years Experience</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <blockquote className="glass-card mx-auto max-w-2xl rounded-2xl p-8">
            <p className="font-serif text-xl italic text-foreground leading-relaxed">
              &ldquo;A house is made of walls and beams; a home is built with love and dreams.&rdquo;
            </p>
            <cite className="mt-3 block text-sm font-semibold text-primary not-italic">- Pradeep Groups</cite>
          </blockquote>
        </motion.div>

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h3 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Why Choose <span className="text-gradient-teal">Pradeep Groups</span>?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Discover what makes us the preferred choice for luxury living in Hyderabad
          </p>
        </motion.div>

        <div id="services" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1000px" }}>
          {features.map((feature, index) => (
            <TiltCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
