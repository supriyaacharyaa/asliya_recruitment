import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  HardHat,
  Hotel,
  Stethoscope,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Home,
  Wrench,
  // Mass recruitment section icons
  ClipboardList,
  Mic2,
  Zap,
  Plane,
  HeartHandshake,
  Target,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "7+", label: "Years in Operation", icon: Award },
  { value: "20K+", label: "Candidates Placed", icon: Users },
  { value: "28+", label: "Countries Covered", icon: MapPin },
  { value: "98%", label: "Client Retention", icon: TrendingUp },
];

// ── Updated service cards with new content ────────────────────────
const services = [
  {
    id: "01",
    icon: MapPin,
    title: "Local Recruitment",
    tagline: "Qatar-ready talent, instantly",
    description:
      "Immediate placements from Qatar's local market for roles requiring instant onboarding. We maintain a pre-screened pool of candidates available for rapid deployment.",
    features: [
      "Instant onboarding capability",
      "Pre-screened local talent pool",
      "72-hour shortlist delivery",
    ],
    accent: "#154895",
    accentLight: "rgba(21,72,149,0.08)",
    gradient: "from-[#154895] to-[#1e5bb8]",
    href: "/services#local",
  },
  {
    id: "02",
    icon: Home,
    title: "Domestic Recruitment",
    tagline: "Trusted home & facility staff",
    description:
      "Vetted professionals for all domestic and home-based roles. Every candidate undergoes background verification and reference checks before placement.",
    features: [
      "Housemaids, Nannies & Babysitters",
      "House Drivers, Cooks & Chefs",
      "Elderly Caregivers & Gardeners",
    ],
    accent: "#e62224",
    accentLight: "rgba(230,34,36,0.08)",
    gradient: "from-[#e62224] to-[#c01a1c]",
    href: "/services#domestic",
  },
  {
    id: "03",
    icon: Globe,
    title: "Overseas Recruitment",
    tagline: "Bridging talent across borders",
    description:
      "Access to global talent pools across 28+ countries in Asia, Africa, Europe & the Middle East. Full documentation, medical fitness, and visa processing included.",
    features: [
      "28+ approved source countries",
      "PDOS & visa assistance",
      "Medical & documentation handling",
    ],
    accent: "#2563eb",
    accentLight: "rgba(37,99,235,0.08)",
    gradient: "from-[#2563eb] to-[#154895]",
    href: "/services#overseas",
  },
  {
    id: "04",
    icon: Megaphone,
    title: "Mass Recruitment Campaigns",
    tagline: "On-site interviews · Trade tests · Same-day offers",
    description:
      "Take your recruitment globally. We conduct face-to-face interviews, physical trade tests, professional exams, and on-site training in your country of choice.",
    features: [
      "On-site interviews & trade tests",
      "500–5,000+ candidates per campaign",
      "25–30 day deployment post-interview",
    ],
    accent: "#dc2626",
    accentLight: "rgba(220,38,38,0.08)",
    gradient: "from-[#dc2626] to-[#b91c1c]",
    href: "/services/mass",
    badge: "NEW",
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
    href: "/services#executive",
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
    href: "/services#temp",
  },
];

// ── Mass Recruitment section data ─────────────────────────────────
const MASS_STATS = [
  { value: "100+",  label: "Campaigns Executed",  color: "#154895" },
  { value: "50K+",  label: "Candidates Assessed",  color: "#dc2626" },
  { value: "98%+",  label: "Placement Success",    color: "#154895" },
  { value: "25–30", label: "Days to Deploy",        color: "#dc2626" },
];

const MASS_OFFERINGS = [
  {
    icon: ClipboardList,
    title: "Complete Campaign Management",
    accent: "#154895",
    lightBg: "rgba(21,72,149,0.07)",
    items: [
      "Candidate sourcing & shortlisting in target country",
      "Organisation of interview venues",
      "Coordination of logistics & accommodation",
      "Professional interview facilitation",
    ],
  },
  {
    icon: Users,
    title: "On-Site Assessment",
    accent: "#dc2626",
    lightBg: "rgba(220,38,38,0.07)",
    items: [
      "Face-to-face interviews with your hiring team",
      "Physical competency & skill testing",
      "Professional qualification exams",
      "Trade-specific assessments & real-time evaluation",
    ],
  },
  {
    icon: Zap,
    title: "Immediate Training & Deployment",
    accent: "#2563eb",
    lightBg: "rgba(37,99,235,0.07)",
    items: [
      "Post-selection on-site training programs",
      "Pre-departure orientation",
      "Visa & documentation processing",
      "Rapid deployment to Qatar (25–30 days)",
    ],
  },
];

const MASS_WHY = [
  "See candidates in their working environment",
  "Assess practical skills firsthand",
  "Reduce hiring risk with direct evaluation",
  "Build cultural fit before deployment",
  "Faster decision-making with your team present",
  "Bulk hiring with quality assurance",
];

const MASS_STEPS = [
  { icon: HeartHandshake, label: "Consultation",       desc: "Define needs, countries & timeline" },
  { icon: Search,          label: "Sourcing",           desc: "500–5,000+ pre-qualified candidates" },
  { icon: Mic2,            label: "Interview Campaign", desc: "On-site interviews & trade tests" },
  { icon: Target,          label: "Selection",          desc: "Real-time decisions, immediate offers" },
  { icon: ClipboardList,   label: "Training",           desc: "On-site skill enhancement & orientation" },
  { icon: Plane,           label: "Deployment",         desc: "Fast-track docs & visa processing" },
  { icon: Globe,           label: "Support",            desc: "Ongoing HR support post-deployment" },
];

const MASS_COUNTRIES = ["India", "Philippines", "Pakistan", "Nepal", "Bangladesh", "Ghana", "Kenya", "Nigeria"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ stat, index, total }) {
  const Icon = stat.icon;
  const isLast = index === total - 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
      transition={{ delay: index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered
          ? `0 32px 64px -12px rgba(0,0,0,0.12), 0 0 0 1px ${service.accent}22`
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transitionProperty: "box-shadow, transform",
        transitionDuration: "0.5s",
        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Animated top gradient stripe */}
      <motion.div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient}`}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hover background wash */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: service.accentLight }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          {/* Icon box */}
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: service.accentLight }}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -5 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon size={24} style={{ color: service.accent }} />
          </motion.div>

          {/* Ghost number OR "NEW" badge */}
          {service.badge ? (
            <span
              className="text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{
                background: `${service.accent}14`,
                color: service.accent,
                border: `1px solid ${service.accent}30`,
              }}
            >
              {service.badge}
            </span>
          ) : (
            <span
              className="text-5xl font-bold font-serif leading-none"
              style={{ color: `${service.accent}14` }}
            >
              {service.id}
            </span>
          )}
        </div>

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
            <li key={feat} className="flex items-center gap-2.5 text-sm text-gray-600">
              <CheckCircle2 size={14} style={{ color: service.accent, flexShrink: 0 }} />
              {feat}
            </li>
          ))}
        </ul>

        {/* "Learn More" — revealed on hover */}
        <motion.a
          href={service.href || "#"}
          className="flex items-center gap-2 text-sm font-semibold mt-auto"
          style={{ color: service.accent }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          Learn More
          <ArrowUpRight size={14} />
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── Mass Recruitment Detail Section ─────────────────────────────────────────

function MassRecruitmentSection() {
  return (
    <div id="mass-recruitment" className="mt-24 sm:mt-32">

      {/* ── Section header ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-5 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
          style={{ background: "rgba(220,38,38,0.06)", borderColor: "rgba(220,38,38,0.18)", color: "#dc2626" }}>
          <span className="w-[6px] h-[6px] rounded-full flex-shrink-0 bg-[#dc2626]"
            style={{ animation: "pulse-mass 2s ease-in-out infinite" }} />
          Mass Recruitment Campaigns
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <div>
            <h2 className="font-serif text-[clamp(26px,3.8vw,48px)] font-bold text-[#0f1929] leading-[1.1] mb-4">
              On-Site Recruitment Campaigns:{" "}
              <span className="text-[#154895] italic">Where Talent Meets Your Team</span>
            </h2>
            <p className="text-[14px] sm:text-base text-gray-500 leading-relaxed font-light max-w-lg">
              Over 100 successful mass recruitment campaigns across Asia & Africa.
              We bring interviews to you — or bring you directly to the talent.
            </p>
          </div>

          {/* Mini stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
            {MASS_STATS.map(({ value, label, color }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-[16px] p-4 flex flex-col gap-1 border"
                style={{ background: `${color}06`, borderColor: `${color}18` }}
              >
                <span className="font-bold leading-none text-[26px] sm:text-[30px] font-serif"
                  style={{ color }}>
                  {value}
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Dark hero band ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden mb-10"
        style={{ background: "linear-gradient(135deg, #0f1929 0%, #154895 60%, #1a3a7a 100%)" }}
      >
        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.045]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        {/* red glow */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #dc2626, transparent 70%)" }} />

        <div className="relative z-10 px-7 py-9 sm:p-10 grid sm:grid-cols-3 gap-6">
          {MASS_OFFERINGS.map(({ icon: Icon, title, accent, lightBg, items }) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Icon size={16} color="#fff" strokeWidth={1.8} />
                </div>
                <h4 className="text-[13px] font-bold text-white leading-snug">{title}</h4>
              </div>
              <ul className="flex flex-col gap-2">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[12.5px] leading-snug"
                    style={{ color: "rgba(255,255,255,0.7)" }}>
                    <CheckCircle size={12} color={accent} className="flex-shrink-0 mt-[2px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Two-column: Why on-site + Track record ────────────── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">

        {/* Why on-site */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-gray-100 rounded-2xl p-7 sm:p-8"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-serif text-[18px] font-bold text-[#0f1929] mb-5">
            Why On-Site Campaigns?
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {MASS_WHY.map(reason => (
              <li key={reason} className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-snug">
                <CheckCircle2 size={14} className="text-[#154895] flex-shrink-0 mt-[2px]" />
                {reason}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Track record */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-gray-100 rounded-2xl p-7 sm:p-8"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
        >
          <h3 className="font-serif text-[18px] font-bold text-[#0f1929] mb-5">
            Our Track Record
          </h3>

          {/* Country chips */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Active source countries
          </p>
          <div className="flex flex-wrap gap-[6px] mb-5">
            {MASS_COUNTRIES.map(c => (
              <span key={c}
                className="text-[10.5px] font-semibold px-2.5 py-[4px] rounded-full uppercase tracking-wide"
                style={{ background: "rgba(21,72,149,0.06)", color: "#154895", border: "1px solid rgba(21,72,149,0.14)" }}>
                {c}
              </span>
            ))}
            <span className="text-[10.5px] font-bold px-1 py-[4px]" style={{ color: "#dc2626" }}>+ more</span>
          </div>

          {/* Record bullets */}
          <ul className="flex flex-col gap-3">
            {[
              "100+ successful campaigns executed",
              "50,000+ candidates interviewed & assessed",
              "98%+ client placement success rate",
              "Construction, Hospitality, Healthcare, Retail & more",
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-snug">
                <CheckCircle2 size={14} className="text-[#dc2626] flex-shrink-0 mt-[2px]" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ── How It Works ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <ArrowRight size={15} className="text-[#154895]" />
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            How It Works — 7 Steps from Brief to Boots on Ground
          </span>
        </div>

        {/* 1-col mobile → 2-col sm → 7-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {MASS_STEPS.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white border border-gray-100 rounded-xl p-4 flex sm:flex-row lg:flex-col items-start lg:items-center gap-3 lg:text-center"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              {/* Step number */}
              <span className="absolute top-2.5 right-3 text-[10px] font-black font-serif"
                style={{ color: i % 2 === 0 ? "#154895" : "#dc2626" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
                style={{ background: i % 2 === 0 ? "rgba(21,72,149,0.08)" : "rgba(220,38,38,0.08)" }}>
                <Icon size={15} color={i % 2 === 0 ? "#154895" : "#dc2626"} strokeWidth={1.8} />
              </div>

              <div className="flex-1 lg:flex-none min-w-0">
                <p className="text-[12px] font-bold text-gray-800 mb-[2px] leading-tight pr-6 lg:pr-0">{label}</p>
                <p className="text-[10.5px] text-gray-400 leading-snug">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Mass Recruitment CTA strip ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5 px-7 py-6"
        style={{ background: "linear-gradient(90deg, rgba(21,72,149,0.06) 0%, rgba(220,38,38,0.04) 100%)", border: "1px solid rgba(21,72,149,0.1)" }}
      >
        <div>
          <p className="font-bold text-[#0f1929] text-[15px] mb-1">Ready to launch your campaign?</p>
          <p className="text-[13px] text-gray-500">Tell us your headcount, industry & timeline — we handle the rest.</p>
        </div>
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <a href="/services/mass"
            className="inline-flex items-center gap-2 text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all hover:-translate-y-[1px]"
            style={{ background: "#154895", color: "#fff", boxShadow: "0 2px 12px rgba(21,72,149,0.25)" }}>
            View Full Details <ArrowRight size={13} />
          </a>
          <a href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-bold px-5 py-2.5 rounded-xl border transition-all hover:bg-white"
            style={{ borderColor: "rgba(21,72,149,0.2)", color: "#154895" }}>
            Get in Touch
          </a>
        </div>
      </motion.div>

      {/* Keyframe for eyebrow pulse */}
      <style>{`
        @keyframes pulse-mass {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const navigate = useNavigate();

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 bg-[#f8f7f4] overflow-hidden">
      {/* Ambient background glows — unchanged */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(21,72,149,0.04) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">

        {/* ── Section header (unchanged) ──────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16 sm:mb-20 items-end">
          <div>
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
              <span className="w-[6px] h-[6px] rounded-full flex-shrink-0" style={{ background: "#e62224" }} />
              Our Services
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(32px,4vw,56px)] font-bold text-[#0f1929] leading-[1.1] mb-5"
            >
              Complete Recruitment Solutions
              <br />
              <span className="text-[#154895] italic">for Every Industry</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="text-[14px] sm:text-base text-gray-500 leading-relaxed max-w-md font-light"
            >
              From executive headhunting to mass overseas deployment — we
              connect ambitious organisations with the right people, at the
              right time, anywhere in the world.
            </motion.p>
          </div>

          {/* Stats (unchanged) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {/* Mobile 2-col grid */}
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
                      <p className="text-4xl font-bold text-[#0f1929] font-serif leading-none mb-1">{stat.value}</p>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-medium leading-snug">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop divider-separated row */}
            <div className="hidden sm:flex flex-row items-start">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} total={stats.length} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Services grid (updated cards, same layout) ──────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── Mass Recruitment detailed section ───────────────── */}
        {/* <MassRecruitmentSection /> */}

        {/* ── CTA Banner (unchanged) ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden bg-[#0f1929] mt-16 sm:mt-24"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "rgba(21,72,149,0.2)" }} />
          <div className="absolute -bottom-16 right-32 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "rgba(230,34,36,0.15)" }} />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full -translate-y-1/2 pointer-events-none"
            style={{ background: "rgba(21,72,149,0.06)" }} />

          <div className="relative z-10 px-6 py-10 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
                Start Today
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
                Ready to build your
                <br />
                <span className="text-[#1a5ab8] italic">ideal workforce?</span>
              </h3>
              <p className="text-[13px] sm:text-sm text-white/75 leading-relaxed font-light">
                Our recruitment specialists are on hand to craft a tailored
                manpower strategy for your business — whether you need one
                executive or a thousand skilled workers, locally or overseas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
             <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate("/contact")}
      className="flex items-center justify-center gap-2.5 bg-white text-[#134a93] px-6 sm:px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto"
    >
      Get a Free Consultation
      <ChevronRight size={16} />
    </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-white/10 text-white border border-white/20 px-6 sm:px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-white/15 transition-colors duration-200 w-full sm:w-auto"
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