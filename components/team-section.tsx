"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Phone, User } from "lucide-react"
import type { MouseEvent } from "react"

const team = [
  {
    name: "Pradeep Reddy",
    role: "Founder & Managing Director",
    phone: "+91-9133102480",
  },
  {
    name: "Jagan Mohan Reddy",
    role: "Partner",
    phone: "+91-8500457382",
  },
  {
    name: "Vinay Reddy",
    role: "Partner",
    phone: "+91-88886006444",
  },
  {
    name: "Narayana",
    role: "Partner",
    phone: "+91-9985777777",
  },
  {
    name:"Venkaiah",
    role : "Partner",
    phone : "+91-93980 84415"
  }
]

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-150, 150], [12, -12]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-150, 150], [-12, 12]), { stiffness: 300, damping: 30 })
  const brightness = useSpring(useTransform(x, [-150, 0, 150], [0.95, 1, 1.05]), { stiffness: 300, damping: 30 })

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const colors = ["from-primary/20 to-teal/10", "from-teal/20 to-primary/10", "from-primary/15 to-teal/15", "from-teal/15 to-primary/15"]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ rotateX, rotateY, filter: `brightness(${brightness})`, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="glass-card group cursor-default overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Gradient header */}
      <div className={`relative h-32 bg-gradient-to-br ${colors[index % colors.length]}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        {/* Decorative circles */}
        <div className="absolute top-4 right-4 h-16 w-16 rounded-full border border-foreground/5" />
        <div className="absolute top-8 right-8 h-10 w-10 rounded-full border border-foreground/5" />
      </div>

      {/* Avatar */}
      <div className="relative -mt-10 px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary ring-4 ring-card">
          <User className="h-10 w-10 text-primary" />
        </div>
      </div>

      {/* Info */}
      <div className="px-6 pt-4 pb-6">
        <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
        <p className="mb-4 text-sm text-primary font-medium">{member.role}</p>

        <a
          href={`tel:${member.phone.replace(/[^+\d]/g, "")}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <Phone className="h-4 w-4" />
          {member.phone}
        </a>
      </div>
    </motion.div>
  )
}

export function TeamSection() {
  return (
    <section id="team" className="relative py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Leadership Team
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Meet the <span className="text-gradient-gold">Visionaries</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Connect with our leadership for premium real estate solutions.
            The driving force behind Pradeep Groups&apos; success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1200px" }}>
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
