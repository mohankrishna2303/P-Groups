"use client"

import { motion } from "framer-motion"
import { ArrowUp, Building2, Phone, MapPin, Mail } from "lucide-react"

const footerLinks = {
  Projects: [
    "Pradeep Pride Residency",
    "Pradeep Pride",
    "Riveria Residency",
    "Pradeep Residency",
  ],
  Company: ["About Us", "Why Choose Us", "Specifications", "Leadership Team", "Contact"],
  Locations: ["Beeramguda", "Kondapur", "Ameenpur", "Suchitra"],
}

const sectionLinks: Record<string, string> = {
  "About Us": "#why-choose",
  "Why Choose Us": "#why-choose",
  "Specifications": "#specifications",
  "Leadership Team": "#team",
  "Contact": "#contact",
}

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-16 pb-8">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#home" className="mb-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-foreground">
                  Pradeep<span className="text-gradient-gold"> Groups</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  Building Dreams
                </span>
              </div>
            </a>
            <p className="mt-3 mb-5 text-sm leading-relaxed text-muted-foreground">
              A trusted name in premium residential construction, committed to delivering
              quality homes that blend luxury, durability, and modern living in Hyderabad.
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-2.5">
              <a href="tel:+919133102480" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5 text-primary" />
                +91-9133102480
              </a>
              <a href="mailto:info@pradeepgroups.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5 text-primary" />
                info@pradeepgroups.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                Ameenpur, Hyderabad
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{category}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={sectionLinks[link] || "#projects"}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="text-sm text-muted-foreground">
              2026 Pradeep Groups. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Designed by{" "}
              <span className="font-semibold text-gradient-gold">Mohan Reddy , 6303377903</span>
            </p>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
