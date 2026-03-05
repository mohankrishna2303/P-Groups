"use client"

import { motion } from "framer-motion"
import { Star, Quote, User } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner - Pradeep Pride Residency",
    text: "Pradeep Groups made our dream home a reality. The quality of construction, premium materials, and attention to every detail in our apartment at Beeramguda exceeded all expectations. Truly a luxury living experience.",
    rating: 5,
  },
  {
    name: "Sunitha Reddy",
    role: "Homeowner - Pradeep Pride",
    text: "As a family, finding the perfect villa in Kondapur was everything. Pradeep Groups delivered on every promise - from the teak wood finishes to the modern amenities. The whole process was transparent and professional.",
    rating: 5,
  },
  {
    name: "Venkat Rao",
    role: "Investor - Riveria Residency",
    text: "I have invested in multiple properties but Pradeep Groups stands apart. The earthquake-resistant construction, branded fittings, and the quality of Ashirwad CPVC piping show their commitment to excellence. Highly recommended.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Homeowner - Advika LakshmiHomes",
    text: "The smart home features at Advika LakshmiHomes are incredible. From solar integration to rainwater harvesting, this home is a perfect blend of technology and sustainability. Best decision we ever made.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
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
            Testimonials
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            What Our <span className="text-gradient-gold">Clients</span> Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Hear from families and investors who have found their perfect home through Pradeep Groups.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              style={{ perspective: "800px" }}
            >
              <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/10 transition-colors group-hover:text-primary/20" />

              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
