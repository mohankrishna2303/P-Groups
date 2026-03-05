"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Shield,
  Paintbrush,
  DoorOpen,
  Layers,
  Droplets,
  Zap,
  Wrench,
  Wifi,
  Waves,
  BatteryCharging,
  Camera,
  Fence,
  ChefHat,
  Bath,
  ChevronDown,
} from "lucide-react"

const specCategories = [
  {
    icon: Building2,
    title: "Structure",
    color: "primary",
    items: [
      "Reinforced Cement Concrete of M25 Grade (Cement: KCP / Bharathi with River sand)",
    ],
  },
  {
    icon: Shield,
    title: "Steel",
    color: "teal",
    items: [
      "IS456 approved (Fe 450, 500, 550) manufacturers of Jayaraj, Sree, Radha, Suguna, SSgold",
      "Earthquake resistant steel structures",
    ],
  },
  {
    icon: Layers,
    title: "Super Structure",
    color: "primary",
    items: [
      "Outer walls 9 inch width (except toilets & wash areas)",
      "Internal walls 4.5 inches wide",
      "Karimnagar Red bricks class-1",
      "Cement mortar & plastering with river sand",
    ],
  },
  {
    icon: Droplets,
    title: "Water Proofing",
    color: "teal",
    items: [
      "Double coat water proofing in all toilets and wash areas",
      "Treated with brick material and water proofing liquid",
    ],
  },
  {
    icon: DoorOpen,
    title: "Doors",
    color: "primary",
    items: [
      "Main Door: Teak wood frame and Teak Door",
      "Internal: Teak wood frames and flush door shutters with reputed hardware",
    ],
  },
  {
    icon: Fence,
    title: "Windows",
    color: "teal",
    items: [
      "UPVC shutters with 5mm transparent glass",
      "Steel mosquito mesh with M.S Safety grills",
    ],
  },
  {
    icon: Paintbrush,
    title: "Flooring",
    color: "primary",
    items: [
      "Living / Bedroom / Kitchen: Vitrified tiles 2' x 4' with 4\" skirting",
      "Bathrooms: Acid resistant anti-skid designer ceramic tiles",
      "Kitchen platform: Polished granite slab",
    ],
  },
  {
    icon: Paintbrush,
    title: "Painting",
    color: "teal",
    items: [
      "Internal: Asian paint roller finish (2 coats putty, 1 coat primer, 2 coats paint)",
      "External: Weather proof texture + damp proof + weather proof paint",
    ],
  },
  {
    icon: ChefHat,
    title: "Kitchen",
    color: "primary",
    items: [
      "Granite platform with stainless steel sink",
      "Dual tap for bore-well water & Manjeera drinking water",
      "Provision for R.O system, exhaust fan / chimney",
    ],
  },
  {
    icon: Bath,
    title: "Toilets",
    color: "teal",
    items: [
      "Western single piece commode in all toilets",
      "Hot and cold-water mixer with shower",
      "Two wash basins per flat",
    ],
  },
  {
    icon: Zap,
    title: "Electrical",
    color: "primary",
    items: [
      "Concealed PVC pipes with copper wiring (Havells, Polycab)",
      "Modular switches (Havells or Legrand)",
      "3 Phase power supply with individual meter boards",
      "AC provision, two-way switches in all bedrooms",
    ],
  },
  {
    icon: Wrench,
    title: "Plumbing",
    color: "teal",
    items: [
      "Ashirwad CPVC and PVC piping (Sudhakar/Prince)",
      "Executed by professional plumbers",
    ],
  },
  {
    icon: Wifi,
    title: "Cable TV & Internet",
    color: "primary",
    items: [
      "Cable TV provision in living / master bedroom",
      "Internet provision in living / master bedroom",
    ],
  },
  {
    icon: Waves,
    title: "Water Supply",
    color: "teal",
    items: [
      "Common overhead tank & underground sump with RCC walls",
      "Separate partitions for bore water and Manjeera water",
      "Electric motor pump for water lifting",
    ],
  },
  {
    icon: BatteryCharging,
    title: "Generator",
    color: "primary",
    items: [
      "Mahindra Powerol D.G Set backup",
      "Covers common area, bore pump, lift, lights and fan points",
    ],
  },
  {
    icon: Camera,
    title: "Security",
    color: "teal",
    items: [
      "CC Cameras at all site paths with one month backup",
      "Six passenger capacity branded lift",
      "SS railing for all steps",
    ],
  },
]

function SpecCard({ spec, index }: { spec: (typeof specCategories)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const isTeal = spec.color === "teal"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-card group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      style={{ perspective: "800px" }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 p-5 text-left"
        aria-expanded={expanded}
      >
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
          isTeal ? "bg-teal/10 group-hover:bg-teal/20" : "bg-primary/10 group-hover:bg-primary/20"
        }`}>
          <spec.icon className={`h-6 w-6 ${isTeal ? "text-teal" : "text-primary"}`} />
        </div>
        <h3 className="flex-1 text-base font-bold text-foreground">{spec.title}</h3>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <ul className="flex flex-col gap-2 border-t border-border pt-3">
                {spec.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isTeal ? "bg-teal" : "bg-primary"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function SpecificationsSection() {
  return (
    <section id="specifications" className="relative py-24 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-teal/3 blur-3xl" />
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
            Building Specifications
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Quality <span className="text-gradient-gold">Construction</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Premium materials and modern amenities in every detail.
            Click any specification to see the full details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specCategories.map((spec, index) => (
            <SpecCard key={spec.title} spec={spec} index={index} />
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          Note: Extra fittings are available at additional charges. All specifications are subject to availability.
        </motion.p>
      </div>
    </section>
  )
}
