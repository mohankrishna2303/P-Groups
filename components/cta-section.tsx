"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"

export function CTASection() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-teal/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Get In Touch
            </span>
            <h2 className="mb-6 font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
              Ready to Build Your <span className="text-gradient-gold">Dream</span> Home?
            </h2>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Join our family of happy homeowners and experience the Pradeep Groups difference.
              Our expert team is ready to guide you through every step of finding your perfect home.
            </p>

            <div className="flex flex-col gap-5">
              <a href="tel:+919133102480" className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Founder Pradeep Reddy : Call Us</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">+91-9133102480</p>
                </div>
              </a>
              <a href="tel:+918500457382" className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/10 transition-colors group-hover:bg-teal/20">
                  <Phone className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground"> Partner  : K.Jagan mohan reddy </p>
                  <p className="font-semibold text-foreground group-hover:text-teal transition-colors">+91-8500457382</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Us</p>
                  <p className="font-semibold text-foreground">info@pradeepgroups.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visit Us</p>
                  <p className="font-semibold text-foreground">Sai Rajeswari Phase-II, Ameenpur, Hyderabad</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - form */}
         
        </div>
      </div>
    </section>
  )
}
