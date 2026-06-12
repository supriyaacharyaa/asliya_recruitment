import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Building2,
  Globe,
  Users,
  Megaphone,
  Search,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  MapPin,
  Briefcase,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "7+", label: "Years in Operation", icon: Award },
  { value: "20K+", label: "Candidates Placed", icon: Users },
  { value: "28+", label: "Countries Covered", icon: MapPin },
  { value: "98%", label: "Client Retention", icon: TrendingUp },
];

// const services = [
//   {
//     id: "01",
//     icon: Building2,
//     title: "Domestic Recruitment",
//     tagline: "Local talent, global standards",
//     description:
//       "End-to-end hiring solutions for businesses seeking top local talent. We handle sourcing, psychometric screening, background verification, and final placement — all within your country.",
//     features: [
//       "Dedicated account manager",
//       "72-hour shortlist delivery",
//       "90-day replacement guarantee",
//     ],
//     accent: "#154895",
//     accentLight: "rgba(21,72,149,0.08)",
//     gradient: "from-[#154895] to-[#1e5bb8]",
//   },
//   {
//     id: "02",
//     icon: Globe,
//     title: "Overseas Recruitment",
//     tagline: "Bridging talent across borders",
//     description:
//       "Skilled international manpower deployment backed by full documentation, medical fitness testing, visa processing, and pre-departure orientation programs.",
//     features: [
//       "PDOS & visa assistance",
//       "Medical & documentation handling",
//       "Airport deployment support",
//     ],
//     accent: "#e62224",
//     accentLight: "rgba(230,34,36,0.08)",
//     gradient: "from-[#e62224] to-[#c01a1c]",
//   },
//   {
//     id: "03",
//     icon: Users,
//     title: "Local Staffing",
//     tagline: "Right people, right now",
//     description:
//       "Flexible workforce solutions for businesses that need reliable staff at short or long-term notice. We maintain a pre-vetted talent pool for rapid deployment across all major industries.",
//     features: [
//       "Pre-vetted talent pool",
//       "48-hour deployment capability",
//       "Flexible contract terms",
//     ],
//     accent: "#0a8a5c",
//     accentLight: "rgba(10,138,92,0.08)",
//     gradient: "from-emerald-500 to-emerald-700",
//   },
//   {
//     id: "04",
//     icon: Megaphone,
//     title: "Mass Recruitment",
//     tagline: "Scale fast, hire smart",
//     description:
//       "Large-scale hiring campaigns managed with military precision — from 50 to 5,000+ candidates. Our dedicated mass deployment teams run simultaneous multi-city drives.",
//     features: [
//       "Multi-city mobilization",
//       "Dedicated project team",
//       "Real-time recruitment dashboard",
//     ],
//     accent: "#7c3aed",
//     accentLight: "rgba(124,58,237,0.08)",
//     gradient: "from-violet-500 to-violet-700",
//   },
//   {
//     id: "05",
//     icon: Search,
//     title: "Executive Search",
//     tagline: "C-suite talent, confidentially sourced",
//     description:
//       "Senior-level and C-suite talent acquisition through our confidential, bespoke headhunting process. We engage passive candidates through deep network mapping and discreet outreach.",
//     features: [
//       "Passive candidate outreach",
//       "Psychometric assessments",
//       "100% confidentiality assured",
//     ],
//     accent: "#d97706",
//     accentLight: "rgba(217,119,6,0.08)",
//     gradient: "from-amber-500 to-amber-700",
//   },
//   {
//     id: "06",
//     icon: Clock,
//     title: "Temporary Staffing",
//     tagline: "On-demand workforce coverage",
//     description:
//       "On-demand temporary workers for seasonal peaks, project-based needs, or sudden workforce gaps. Fully compliant placements with payroll and HR administration handled end-to-end.",
//     features: [
//       "Payroll & HR administration",
//       "Seasonal surge coverage",
//       "Compliant labor contracts",
//     ],
//     accent: "#0891b2",
//     accentLight: "rgba(8,145,178,0.08)",
//     gradient: "from-cyan-500 to-cyan-700",
//   },
// ];

const services = [
  {
    id: "01",
    icon: Building2,
    title: "Domestic Recruitment",
    tagline: "Local talent, global standards",
    description:
      "End-to-end hiring solutions for businesses seeking top local talent. We handle sourcing, psychometric screening, background verification, and final placement — all within your country.",
    features: [
      "Dedicated account manager",
      "72-hour shortlist delivery",
      "90-day replacement guarantee",
    ],
    accent: "#154895",
    accentLight: "rgba(21,72,149,0.08)",
    gradient: "from-[#154895] to-[#1e5bb8]",
  },

  {
    id: "02",
    icon: Globe,
    title: "Overseas Recruitment",
    tagline: "Bridging talent across borders",
    description:
      "Skilled international manpower deployment backed by full documentation, medical fitness testing, visa processing, and pre-departure orientation programs.",
    features: [
      "PDOS & visa assistance",
      "Medical & documentation handling",
      "Airport deployment support",
    ],
    accent: "#e62224",
    accentLight: "rgba(230,34,36,0.08)",
    gradient: "from-[#e62224] to-[#c01a1c]",
  },

  {
    id: "03",
    icon: Users,
    title: "Local Staffing",
    tagline: "Right people, right now",
    description:
      "Flexible workforce solutions for businesses that need reliable staff at short or long-term notice. We maintain a pre-vetted talent pool for rapid deployment across all major industries.",
    features: [
      "Pre-vetted talent pool",
      "48-hour deployment capability",
      "Flexible contract terms",
    ],
    accent: "#2563eb",
    accentLight: "rgba(37,99,235,0.08)",
    gradient: "from-[#2563eb] to-[#154895]",
  },

  {
    id: "04",
    icon: Megaphone,
    title: "Mass Recruitment",
    tagline: "Scale fast, hire smart",
    description:
      "Large-scale hiring campaigns managed with military precision — from 50 to 5,000+ candidates. Our dedicated mass deployment teams run simultaneous multi-city drives.",
    features: [
      "Multi-city mobilization",
      "Dedicated project team",
      "Real-time recruitment dashboard",
    ],
    accent: "#dc2626",
    accentLight: "rgba(220,38,38,0.08)",
    gradient: "from-[#dc2626] to-[#b91c1c]",
  },

  {
    id: "05",
    icon: Search,
    title: "Executive Search",
    tagline: "C-suite talent, confidentially sourced",
    description:
      "Senior-level and C-suite talent acquisition through our confidential, bespoke headhunting process. We engage passive candidates through deep network mapping and discreet outreach.",
    features: [
      "Passive candidate outreach",
      "Psychometric assessments",
      "100% confidentiality assured",
    ],
    accent: "#3b82f6",
    accentLight: "rgba(59,130,246,0.08)",
    gradient: "from-[#3b82f6] to-[#2563eb]",
  },

  {
    id: "06",
    icon: Clock,
    title: "Temporary Staffing",
    tagline: "On-demand workforce coverage",
    description:
      "On-demand temporary workers for seasonal peaks, project-based needs, or sudden workforce gaps. Fully compliant placements with payroll and HR administration handled end-to-end.",
    features: [
      "Payroll & HR administration",
      "Seasonal surge coverage",
      "Compliant labor contracts",
    ],
    accent: "#b91c1c",
    accentLight: "rgba(185,28,28,0.08)",
    gradient: "from-[#b91c1c] to-[#991b1b]",
  },
];
const industries = [
  "Construction & Engineering",
  "Healthcare & Nursing",
  "Hospitality & Tourism",
  "Oil & Gas",
  "Manufacturing",
  "IT & Technology",
  "Retail & FMCG",
  "Finance & Banking",
];

function StatCard({ stat, index, total }) {
  const Icon = stat.icon;
  const isLast = index === total - 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-start gap-3 flex-1 min-w-0"
      style={{
        paddingLeft: index === 0 ? 0 : "1.5rem",
        paddingRight: isLast ? 0 : "1.5rem",
        borderRight: isLast ? "none" : "1px solid #e5e7eb",
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-[#154895]/10 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-[#154895]" />
      </div>
      <div className="min-w-0">
        <p className="text-4xl font-bold text-[#0f1929] font-serif leading-none mb-1">
          {stat.value}
        </p>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-medium leading-snug">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.09,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered
          ? `0 32px 64px -12px rgba(0,0,0,0.12), 0 0 0 1px ${service.accent}22`
          : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.5s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transitionProperty: "box-shadow, transform",
        transitionDuration: "0.5s",
      }}
    >
      <motion.div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient}`}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: service.accentLight }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 p-8">
        {/* Number + Icon row */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: service.accentLight }}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -5 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon size={24} style={{ color: service.accent }} />
          </motion.div>
          <span
            className="text-5xl font-bold font-serif leading-none"
            style={{ color: `${service.accent}14` }}
          >
            {service.id}
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-[11px] font-semibold uppercase tracking-widest mb-2"
          style={{ color: service.accent }}
        >
          {service.tagline}
        </p>

        <h3
          className="text-[21px] font-bold text-gray-900 mb-3 leading-snug font-serif transition-colors duration-300"
          style={{ color: hovered ? service.accent : undefined }}
        >
          {service.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="space-y-2 mb-6">
          {service.features.map((feat) => (
            <li
              key={feat}
              className="flex items-center gap-2.5 text-sm text-gray-600"
            >
              <CheckCircle2
                size={14}
                style={{ color: service.accent, flexShrink: 0 }}
              />
              {feat}
            </li>
          ))}
        </ul>

        <motion.div
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: service.accent }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          Learn More
          <ArrowUpRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#f8f7f4] overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(21,72,149,0.04) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(21,72,149,0.06)",
                  borderColor: "rgba(21,72,149,0.14)",
                  color: "#154895",
                }}
              >
                <span
                  className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                  style={{ background: "#e62224", animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                Our Services
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-[clamp(36px,4vw,56px)] font-bold text-[#0f1929] leading-[1.1] mb-5"
            >
              Comprehensive
              <br />
              <span className="text-[#154895] italic">Manpower Solutions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="text-base text-gray-500 leading-relaxed max-w-md font-light"
            >
              From executive headhunting to mass overseas deployment — we
              connect ambitious organizations with the right people, at the
              right time, anywhere in the world.
            </motion.p>
          </div>

          {/* ── Stats row — responsive fix ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {/* Mobile: 2×2 grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:hidden">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#154895]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#154895]" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-[#0f1929] font-serif leading-none mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-medium leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* sm+: single row with dividers, all equal width */}
            <div className="hidden sm:flex flex-row items-start">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} total={stats.length} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-gray-100 rounded-2xl px-8 py-7 mb-8"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <Briefcase size={16} className="text-[#154895]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Industries We Serve
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {industries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-100 hover:border-[#154895]/30 hover:bg-[#154895]/5 hover:text-[#154895] transition-all duration-200 cursor-default"
              >
                {industry}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-primary" />

          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full"
            style={{ background: "rgba(21,72,149,0.2)" }}
          />
          <div
            className="absolute -bottom-16 right-32 w-48 h-48 rounded-full"
            style={{ background: "rgba(230,34,36,0.15)" }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full -translate-y-1/2"
            style={{ background: "rgba(21,72,149,0.06)" }}
          />

          <div className="relative z-10 px-12 py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
                Start Today
              </p>

              <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
                Ready to build your
                <br />
                <span className="text-brand-secondary italic">ideal workforce?</span>
              </h3>

              <p className="text-sm text-white/75 leading-relaxed font-light">
                Our recruitment specialists are on hand to craft a tailored
                manpower strategy for your business — whether you need 1
                executive or 1,000 skilled workers, locally or overseas.
              </p>
            </div>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-white text-[#134a93] px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors duration-200"
              >
                Get a Free Consultation
                <ChevronRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-white/15 transition-colors duration-200"
              >
                Download Company Profile
                <ArrowUpRight size={15} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}