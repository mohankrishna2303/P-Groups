"use client"

import { motion } from "framer-motion"
import { MapPin, CheckCircle2, ArrowUpRight, Building2, Clock, Sparkles } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Pradeep Pride Residency",
    location: "Beeramguda, Hyderabad",
    status: "Ready to Move",
    type: "Luxury Apartments",
    progress: 100,
    image: "/images/PRADEEP-98X38-33.jpg.jpeg",
    tag: "Construction Completed",
    description:
      "Experience luxury and serenity with premium living and unparalleled comfort. Strategically located in the vibrant heart of the city with breathtaking panoramic views.",
    features: ["Infinity pool and fitness center", "Beautifully landscaped gardens", "24/7 security and surveillance"],
  },
  {
    id: 2,
    title: "Pradeep Pride",
    location: "Kondapur, Hyderabad",
    status: "Ready to Move",
    type: "Premium Flats",
    progress: 100,
  image: "/images/PRADEEP-033.jpg.jpeg",
    tag: "Ready to Move",
    description:
      "Exclusive living where luxury meets tranquility in one of Hyderabad's most sought-after locations. Premium villas with spacious living areas and modern architecture.",
    features: ["Private garden and terrace", "Modern kitchen with premium fittings", "24/7 security with CCTV surveillance"],
  },
  {
    id: 3,
    title: "Pradeep Pride Homes",
    location: "Ameenpur, Hyderabad",
    status: "Ready to Move",
    type: "Smart Homes",
    progress: 100,
   image: "/images/PRADEEP 67X60-6.jpg.jpeg",
    tag: "Smart Living",
    description:
      "An unmatched investment in lifestyle, comfort, and sustainability. Cutting-edge smart home technology with eco-conscious design and modern automation.",
    features: ["Smart home automation", "Green roofing and solar integration", "Rainwater harvesting systems"],
  },
  {
    id: 4,
    title: "Riveria Residency",
    location: "Ameenpur, Hyderabad",
    status: "Project Completed",
    type: "Premium Residences",
    progress: 100,
    image: "/images/PRADEEP REDDY-3.jpg.jpeg",
    tag: "Completed",
    description:
      "Where luxury meets convenience in the heart of the city. Spacious residences with modern designs, high-end finishes, and resort-style amenities.",
    features: ["Resort-style amenities", "State-of-the-art fitness center", "Serene spa facilities"],
  },
  {
    id: 5,
    title: "Pradeep Residency",
    location: "Suchitra, Hyderabad",
    status: "Completed",
    type: "Family Homes",
    progress: 100,
    image: "/images/PRADEEP_2579.jpg.jpeg",
    tag: "Family Living",
    description:
      "Luxury meets convenience with spacious residences featuring modern designs, high-end finishes, and family-friendly amenities.",
    features: ["Resort-style amenities", "State-of-the-art fitness center", "Serene spa facilities"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const isLarge = index === 0 || index === 3

  return (
    <motion.div
      variants={cardVariants}
      className={`group glass-card overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 ${
        isLarge ? "md:col-span-2" : ""
      }`}
    >
      <div className={`grid grid-cols-1 ${isLarge ? "md:grid-cols-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{project.tag}</span>
            <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-foreground">{project.type}</span>
          </div>
          {/* Progress bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-foreground">{project.progress}% Complete</span>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/30 backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-5 md:p-6">
          <div>
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
              <button
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                aria-label={`View ${project.title}`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              {project.location}
            </div>

            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Key Features</h4>
            <ul className="flex flex-col gap-1.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              {project.status}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 text-primary" />
              {project.type}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PropertiesSection() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      {/* Decorative blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 -left-40 h-80 w-80 rounded-full bg-teal/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Our Projects
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Premium <span className="text-gradient-gold">Developments</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Discover our premium residential developments that redefine luxury living in Hyderabad.
            Each project reflects our commitment to quality and customer satisfaction.
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">5</div>
              <div className="text-xs text-muted-foreground">Ongoing Projects</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/15">
              <Sparkles className="h-6 w-6 text-teal" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">100%</div>
              <div className="text-xs text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
