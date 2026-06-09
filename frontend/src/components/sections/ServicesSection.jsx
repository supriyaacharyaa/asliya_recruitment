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

// ─── Data (Asliya Official Guide Updated) ───────────────────────────────────

const stats = [
  { value: "7+", label: "Years of Expertise", icon: Award },
  { value: "20K+", label: "Successful Deployments", icon: Users },
  { value: "28+", label: "Source Countries", icon: MapPin },
  { value: "300+", label: "Corporate Clients", icon: TrendingUp },
];

const services = [
  {
    id: "01",
    icon: Building2,
    title: "Local Recruitment",
    tagline: "Qatar's core commercial talent",
    description:
      "End-to-end hiring solutions engineered for Qatar's business ecosystem. We legally deploy pre-screened, compliant professionals optimized for your immediate commercial operations.",
    features: [
      "Dedicated account manager",
      "Ministry of Labor compliant",
      "Pre-vetted corporate database",
    ],
    accent: "text-[#154895]",
    accentBg: "bg-[#154895]/8",
    hoverBorder: "hover:border-[#154895]/30",
    hoverShadow: "hover:shadow-[0_32px_64px_-12px_rgba(21,72,149,0.14)]",
    gradient: "from-[#154895] to-[#1e5bb8]",
  },
  {
    id: "02",
    icon: Globe,
    title: "Overseas Recruitment",
    tagline: "Global sourcing, zero delays",
    description:
      "Skilled and semi-skilled workforce mobilization from 28+ approved source countries. We fully manage international testing, visa processing, and relocation documentation.",
    features: [
      "25–30 days average timeline",
      "Full visa & medical processing",
      "Pre-departure orientation (PDOS)",
    ],
    accent: "text-[#1a5ab8]",
    accentBg: "bg-[#1a5ab8]/8",
    hoverBorder: "hover:border-[#1a5ab8]/30",
    hoverShadow: "hover:shadow-[0_32px_64px_-12px_rgba(26,90,184,0.14)]",
    gradient: "from-[#1a5ab8] to-[#154895]",
  },
  {
    id: "03",
    icon: Users,
    title: "Bulk Hiring / Manpower Supply",
    tagline: "Massive scale, perfect quality",
    description:
      "Rapidly mobilize 100 to 4,000+ workers simultaneously for large-scale operations without cutting corners. Phased mobilization models designed for high-pressure timelines.",
    features: [
      "1,000+ candidates per campaign",
      "Simultaneous project management",
      "Supreme Committee approved standards",
    ],
    accent: "text-[#0d3270]",
    accentBg: "bg-[#0d3270]/8",
    hoverBorder: "hover:border-[#0d3270]/30",
    hoverShadow: "hover:shadow-[0_32px_64px_-12px_rgba(13,50,112,0.14)]",
    gradient: "from-[#0d3270] to-[#154895]",
  },
];

const industries = [
  "Construction & Engineering",
  "Oil & Gas / Energy",
  "Hospitality & Catering",
  "Retail & FMCG",
  "Logistics & Warehousing",
  "Facilities Management",
  "Security Services",
  "Corporate & Admin",
];

function StatCard({ stat, index }) {
  const Icon = stat.icon;
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
      className="flex flex-col items-center text-center sm:items-start sm:text-left gap-2 px-4 sm:px-6 py-2 w-full sm:w-auto"
    >
      <div className="w-10 h-10 rounded-xl bg-[#154895]/10 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-[#154895]" />
      </div>
      <div>
        <p className="text-3xl sm:text-4xl font-black text-[#0f1929] leading-none mb-1 font-sans">
          {stat.value}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold whitespace-nowrap">
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
      className={`group relative bg-white border border-[#154895]/10 rounded-2xl p-6 sm:p-8 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${service.hoverBorder} ${service.hoverShadow}`}
    >
      {/* Top Accent Line */}
      <span className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Hover Background Wash */}
      <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${service.accentBg}`} />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Number + Icon row */}
          <div className="flex items-start justify-between mb-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-rotate-6 ${service.accentBg}`}>
              <Icon size={24} className={service.accent} />
            </div>
            <span className={`text-4xl sm:text-5xl font-black opacity-[0.07] leading-none select-none ${service.accent}`}>
              {service.id}
            </span>
          </div>

          {/* Tagline */}
          <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${service.accent}`}>
            {service.tagline}
          </p>

          <h3 className="text-[20px] font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#154895] transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
            {service.description}
          </p>

          <ul className="space-y-2.5 mb-8">
            {service.features.map((feat) => (
              <li key={feat} className="flex items-center gap-2.5 text-[13px] text-gray-600 font-medium">
                <CheckCircle2 size={14} className={`${service.accent} flex-shrink-0`} />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <div className={`flex items-center gap-2 text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${service.accent}`}>
          Learn More
          <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 bg-[#f8f7f4] overflow-hidden">
      {/* Background Decorative Ambient Circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(21,72,149,0.04)_0%,transparent_70%)] translate-x-[30%] -translate-y-[30%]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(21,72,149,0.03)_0%,transparent_70%)] -translate-x-[30%] translate-y-[30%]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Top Header Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 sm:mb-20 items-end">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-[2px] bg-[#154895]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#154895]">
                Our Core Expertise
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[32px] sm:text-[42px] lg:text-[52px] font-bold text-[#0f1929] leading-[1.15] mb-5"
            >
              Regulated & Fast
              <br />
              <span className="text-[#154895] italic font-serif font-normal">Manpower Supply</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="text-[14px] sm:text-base text-gray-500 leading-relaxed max-w-md font-normal"
            >
              Licensed by the Ministry of Labor Qatar (#618). We mobilize high-caliber global talent with full legal compliance and speed that protects your bottom line.
            </motion.p>
          </div>

          {/* Stats Grid Fix for Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="lg:col-span-6 grid grid-cols-2 sm:flex sm:flex-wrap lg:justify-end gap-x-4 gap-y-6 sm:gap-8 border-t lg:border-t-0 border-gray-200/60 pt-6 lg:pt-0"
          >
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Industries List Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-[#154895]/10 rounded-2xl p-6 sm:p-8 mb-8 shadow-[0_2px_16px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-3 mb-5">
            <Briefcase size={16} className="text-[#154895]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Key Commercial Sectors
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-100 hover:border-[#154895]/30 hover:bg-[#154895]/5 hover:text-[#154895] transition-all duration-200 cursor-default"
              >
                {industry}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── CTA Banner (Fully Responsive Fix) ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden bg-[#0f1929] px-6 py-10 sm:p-12 lg:p-14 shadow-xl"
        >
          {/* Glowing circles overlay */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#154895]/20 pointer-events-none" />
          <div className="absolute -bottom-16 right-32 w-48 h-48 rounded-full bg-[#154895]/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a5ab8] mb-3">
                Zero Compliance Risk
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                Ready to scale your workforce
                <br />
                <span className="text-[#1a5ab8] italic font-serif font-normal">without the headaches?</span>
              </h3>
              <p className="text-[13px] sm:text-sm text-gray-400 leading-relaxed font-normal">
                Stop waiting while recruitment delays drain your resources. Whether you need immediate local staffing or bulk international deployment, Asliya guarantees seamless compliance and mobilization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-[#154895] text-white px-6 sm:px-8 py-4 rounded-xl text-sm font-bold tracking-wide hover:bg-[#1e5bb8] transition-colors duration-200 w-full sm:w-auto"
              >
                Get Started Now
                <ChevronRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-white/[0.05] text-white border border-white/[0.12] px-6 sm:px-8 py-4 rounded-xl text-sm font-bold tracking-wide hover:bg-white/[0.1] transition-colors duration-200 w-full sm:w-auto"
              >
                Download Service Guide
                <ArrowUpRight size={15} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}