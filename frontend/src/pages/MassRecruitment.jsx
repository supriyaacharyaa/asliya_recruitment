import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe, Users, MapPin, ArrowRight, CheckCircle, CheckCircle2,
  ChevronDown, Plus, Minus, Phone, Mail, Shield, Star,
  ClipboardList, Search, Mic2, Plane, HeartHandshake,
  Zap, Building2, Target, Award, TrendingUp, Clock
} from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Container from "../components/ui/Container"

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.1 },
  }),
}

const STATS = [
  { value: "100+",  label: "Campaigns Executed",  color: "#154895" },
  { value: "50K+",  label: "Candidates Assessed",  color: "#e62224" },
  { value: "98%+",  label: "Placement Success",    color: "#154895" },
  { value: "25–30", label: "Days to Deploy",        color: "#e62224" },
]

const COUNTRIES = [
  "India","Philippines","Pakistan","Nepal","Bangladesh",
  "Ghana","Kenya","Nigeria",
]

const INDUSTRIES = [
  "Construction","Hospitality","Healthcare","Retail","Logistics","Facilities Management",
]

const OFFERINGS = [
  {
    icon: ClipboardList,
    title: "Complete Campaign Management",
    accent: "#154895",
    lightBg: "#eef4ff",
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
    accent: "#e62224",
    lightBg: "#fff0f0",
    items: [
      "Face-to-face interviews with your hiring team",
      "Physical competency & skill testing",
      "Professional qualification exams",
      "Trade-specific assessments",
      "Real-time performance evaluation",
    ],
  },
  {
    icon: Zap,
    title: "Immediate Training & Deployment",
    accent: "#0891b2",
    lightBg: "#e0f7fc",
    items: [
      "Post-selection on-site training programs",
      "Pre-departure orientation",
      "Visa & documentation processing",
      "Rapid deployment to Qatar (25–30 days post-interview)",
    ],
  },
]

const WHY = [
  "See candidates in their working environment",
  "Assess practical skills firsthand",
  "Reduce hiring risk with direct evaluation",
  "Build cultural fit before deployment",
  "Faster decision-making with your team present",
  "Bulk hiring with quality assurance",
]

const STEPS = [
  { icon: HeartHandshake, label: "Consultation",       desc: "Define your needs, target countries & timeline" },
  { icon: Search,          label: "Sourcing",           desc: "We identify 500–5,000+ pre-qualified candidates" },
  { icon: Mic2,            label: "Interview Campaign", desc: "Your team joins us on-site for interviews & tests" },
  { icon: Target,          label: "Selection",          desc: "Real-time decisions with immediate offers" },
  { icon: ClipboardList,   label: "Training",           desc: "On-site skill enhancement & orientation" },
  { icon: Plane,           label: "Deployment",         desc: "Fast-track documentation & visa processing" },
  { icon: Globe,           label: "Support",            desc: "Ongoing monitoring & HR support post-deployment" },
]

const FAQS = [
  {
    q: "How large a headcount can you handle in a single campaign?",
    a: "We routinely run campaigns for 50 to 4,000+ workers. Our largest single campaign sourced and deployed 2,800 construction workers across three source countries within 35 days.",
  },
  {
    q: "Do we need to travel to the source country?",
    a: "No — we can conduct the entire campaign on your behalf and present a shortlist for remote video interviews. However, clients who join us on-site consistently report higher satisfaction with final selections due to direct, practical assessment.",
  },
  {
    q: "What is the typical timeline from first contact to boots on ground?",
    a: "After an initial consultation, we mobilise a campaign within 7–10 days. Post-interview selection, documentation and visa processing takes 25–30 days, giving a total of roughly 5–6 weeks from brief to deployment.",
  },
  {
    q: "Which source countries do you operate in?",
    a: "We run active campaigns in India, Philippines, Pakistan, Nepal, Bangladesh, Ghana, Kenya, Nigeria, and more — 28+ countries in total across Asia, Africa, Europe, and the Middle East.",
  },
  {
    q: "Is there a minimum headcount for a mass recruitment campaign?",
    a: "We recommend campaigns for 20+ workers to make on-site logistics cost-effective. For smaller volumes, our standard overseas recruitment service is a better fit.",
  },
  {
    q: "How do you ensure quality when hiring at volume?",
    a: "Every candidate is pre-screened against your job profile before the campaign. On-site assessments include trade tests, qualification verification, and competency checks — giving you objective data before making any offer.",
  },
]

const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');

  @keyframes blob-drift-1 {
    0%,100%{ transform:scale(1) translate(0,0); opacity:.16; }
    40%    { transform:scale(1.18) translate(28px,-18px); opacity:.24; }
    70%    { transform:scale(.9)  translate(-16px,12px); opacity:.12; }
  }
  @keyframes blob-drift-2 {
    0%,100%{ transform:scale(1.1) translate(0,0); opacity:.10; }
    35%    { transform:scale(.88) translate(-22px,16px); opacity:.18; }
    65%    { transform:scale(1.22) translate(14px,-10px); opacity:.08; }
  }
  .blob-1 { animation: blob-drift-1 11s ease-in-out infinite; }
  .blob-2 { animation: blob-drift-2 14s ease-in-out infinite; }

  @keyframes spin-ring { to { transform: rotate(360deg); } }
  .ring-cw  { animation: spin-ring 24s linear infinite; }
  .ring-ccw { animation: spin-ring 30s linear infinite reverse; }

  @keyframes hero-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .shimmer-text {
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.35) 40%,#fff 60%,rgba(255,255,255,.35) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: hero-shimmer 4s linear infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.5); opacity: 0.6; }
  }

  .glass-card {
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow: 0 4px 24px rgba(21,72,149,0.08), 0 1px 4px rgba(21,72,149,0.04);
  }
  .glass-card-hover {
    transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s;
  }
  .glass-card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(21,72,149,0.13), 0 1px 4px rgba(21,72,149,0.06);
  }
`

export default function MassRecruitmentPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen font-sans" style={{ background: "#f4f8ff" }}>
      <style>{PAGE_CSS}</style>
  

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 sm:py-40"
        style={{ background: "linear-gradient(135deg, #154895 0%, #0d2f6b 55%, #0a1e4a 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob-1 absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl" style={{ background: "#2a5ccc" }} />
          <div className="blob-2 absolute -bottom-32 -right-32 w-[440px] h-[440px] rounded-full blur-3xl" style={{ background: "#e62224" }} />
          <div className="absolute inset-0 opacity-[0.045]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="ring-cw  absolute top-12 right-20 w-52 h-52 border-2 border-dashed border-white/10 rounded-full" />
          <div className="ring-ccw absolute bottom-10 left-14 w-36 h-36 border-2 border-dashed border-white/10 rounded-full" />
        </div>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/50 text-sm mb-8 font-medium">
            <a href="/" className="hover:text-white/80 transition-colors">Home</a>
            <span>/</span>
            <a href="/services" className="hover:text-white/80 transition-colors">Services</a>
            <span>/</span>
            <span className="text-white/80">Mass Recruitment</span>
          </motion.div>

          {/* Eyebrow badge */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#e62224]" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span className="text-white/90 text-sm font-semibold">100+ Campaigns · 28+ Countries · 50,000+ Assessed</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left copy */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.75, ease }}
                className="shimmer-text font-black leading-tight mb-5"
                style={{ fontSize: "clamp(28px, 4.5vw, 56px)", fontFamily: "'Playfair Display', serif" }}
              >
                On-Site Recruitment Campaigns: Where Talent Meets Your Team
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.65 }}
                className="text-white/65 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
                Over 100 successful mass recruitment campaigns across Asia & Africa.
                We bring interviews to you — or bring you directly to the talent.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.6 }}
                className="flex flex-wrap gap-3">
                <a href="#how-it-works"
                  className="inline-flex items-center gap-2 font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-200 hover:-translate-y-[2px]"
                  style={{ background: "#e62224", color: "#fff", boxShadow: "0 3px 16px rgba(230,34,36,0.45)" }}>
                  See How It Works <ArrowRight size={15} />
                </a>
                <a href="#track-record"
                  className="inline-flex items-center gap-2 font-bold px-6 py-3.5 rounded-2xl border text-sm transition-all duration-200 hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}>
                  Our Track Record
                </a>
              </motion.div>
            </div>

            {/* Right: stat tiles */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22, duration: 0.75, ease }}
              className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map(({ value, label, color }) => (
                <div key={label}
                  className="flex flex-col items-center justify-center rounded-[18px] py-7 px-4 text-center"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                  <span className="font-black leading-none mb-1"
                    style={{ fontSize: "clamp(26px, 4vw, 38px)", color, fontFamily: "'Playfair Display', serif" }}>
                    {value}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-center" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#f4f8ff" />
          </svg>
        </div>
      </section>

      {/* ── 2. TRUST BAR ────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-5">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield,      text: "Ministry of Labor Qatar — License #618" },
              { icon: Star,        text: "Supreme Committee Approved" },
              { icon: CheckCircle, text: "Qatar Labor Law Compliant" },
              { icon: Award,       text: "98%+ Placement Success Rate" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div key={text}
                initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Icon size={15} className="text-[#154895]" />
                {text}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. WHAT WE OFFER ────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: "#f4f8ff" }}>
        <Container>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-12 sm:mb-16">
            <p className="text-sm font-bold text-[#e62224] uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="font-black text-gray-900 leading-tight max-w-xl"
              style={{ fontSize: "clamp(22px, 3.2vw, 38px)", fontFamily: "'Playfair Display', serif" }}>
              Full-Service Campaign Management
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl text-[15px] leading-relaxed">
              Everything from candidate pipeline to boots on ground — managed end-to-end by our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
            {OFFERINGS.map(({ icon: Icon, title, accent, lightBg, items }, i) => (
              <motion.div key={title}
                custom={i * 0.08} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="glass-card glass-card-hover rounded-3xl p-7 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: lightBg }}>
                    <Icon size={20} color={accent} strokeWidth={1.7} />
                  </div>
                  <h3 className="text-[15px] font-bold leading-snug text-gray-900">{title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-gray-500">
                      <CheckCircle2 size={14} color={accent} className="flex-shrink-0 mt-[2px]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. TRACK RECORD ─────────────────────────────────────── */}
      <section id="track-record" className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm font-bold text-[#e62224] uppercase tracking-widest mb-3">Our Track Record</p>
              <h2 className="font-black text-gray-900 leading-tight mb-5"
                style={{ fontSize: "clamp(22px, 3vw, 38px)", fontFamily: "'Playfair Display', serif" }}>
                Proven Results Across<br />Two Continents
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                From high-volume construction drives in South Asia to specialised healthcare
                sourcing in West Africa — our campaigns deliver vetted talent at scale
                without sacrificing quality.
              </p>

              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Active source countries</p>
                <div className="flex flex-wrap gap-2">
                  {COUNTRIES.map(c => (
                    <span key={c}
                      className="text-[11px] font-semibold px-3 py-[5px] rounded-full uppercase tracking-wide"
                      style={{ background: "rgba(21,72,149,0.06)", color: "#154895", border: "1px solid rgba(21,72,149,0.14)" }}>
                      {c}
                    </span>
                  ))}
                  <span className="text-[11px] font-bold px-2 py-[5px]" style={{ color: "#e62224" }}>+ more</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Industries served</p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map(ind => (
                    <span key={ind}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-[5px] rounded-full"
                      style={{ background: "rgba(230,34,36,0.06)", color: "#e62224", border: "1px solid rgba(230,34,36,0.14)" }}>
                      <Building2 size={10} /> {ind}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div custom={0.1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label, color }) => (
                <div key={label}
                  className="glass-card glass-card-hover rounded-[20px] p-6 flex flex-col gap-1">
                  <span className="font-black leading-none mb-1"
                    style={{ fontSize: "clamp(28px, 4vw, 40px)", color, fontFamily: "'Playfair Display', serif" }}>
                    {value}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-gray-400">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── 5. WHY ON-SITE ──────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #154895 0%, #0d2f6b 60%, #0a1e4a 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob-1 absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "#2a5ccc" }} />
          <div className="blob-2 absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-15" style={{ background: "#e62224" }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <Container className="relative z-10">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16">
            {/* ✅ CHANGED: #f8c84a → #e62224 */}
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#e62224" }}>
              The On-Site Advantage
            </p>
            <h2 className="font-black text-white leading-tight"
              style={{ fontSize: "clamp(22px, 3.2vw, 38px)", fontFamily: "'Playfair Display', serif" }}>
              Why On-Site Campaigns Work
            </h2>
            <p className="text-white/60 mt-3 text-[15px] max-w-xl mx-auto leading-relaxed">
              Hiring at scale doesn't have to mean hiring blind. Our campaigns put your team
              in the room — or put our expertise to work on your behalf.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY.map((reason, i) => (
              <motion.div key={reason}
                custom={i * 0.07} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-start gap-3 rounded-2xl px-5 py-4"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                {/* ✅ CHANGED: #f8c84a → #e62224 */}
                <CheckCircle2 size={16} color="#e62224" className="flex-shrink-0 mt-[2px]" />
                <span className="text-[14px] font-medium leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {reason}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div custom={0.5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mt-12">
            <a href="#how-it-works"
              className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-2xl text-sm transition-all hover:-translate-y-[2px]"
              style={{ background: "#e62224", color: "#fff", boxShadow: "0 4px 18px rgba(230,34,36,0.45)" }}>
              See the Full Process <ArrowRight size={15} />
            </a>
          </motion.div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50V25C360 0 720 50 1080 25C1260 12.5 1380 37.5 1440 25V50H0Z" fill="#f4f8ff" />
          </svg>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 sm:py-28" style={{ background: "#f4f8ff" }}>
        <Container>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-12 sm:mb-16">
            <p className="text-sm font-bold text-[#e62224] uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="font-black text-gray-900 leading-tight"
              style={{ fontSize: "clamp(22px, 3.2vw, 38px)", fontFamily: "'Playfair Display', serif" }}>
              From Brief to Boots on Ground
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl text-[15px] leading-relaxed">
              Seven clear stages — each owned by our team so nothing falls through the cracks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-3">
            {STEPS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label}
                custom={i * 0.07} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="glass-card glass-card-hover rounded-2xl p-5 flex sm:flex-row lg:flex-col items-start sm:items-start lg:items-center gap-4 lg:gap-3 lg:text-center relative">

                <span className="absolute top-3 right-3 text-[11px] font-black"
                  style={{ color: i % 2 === 0 ? "#154895" : "#e62224", fontFamily: "'Playfair Display', serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ background: i % 2 === 0 ? "rgba(21,72,149,0.08)" : "rgba(230,34,36,0.08)" }}>
                  <Icon size={17} color={i % 2 === 0 ? "#154895" : "#e62224"} strokeWidth={1.8} />
                </div>

                <div className="flex-1 lg:flex-none min-w-0">
                  <p className="text-[13px] font-bold mb-1 leading-tight text-gray-900 pr-6 lg:pr-0">{label}</p>
                  <p className="text-[11.5px] leading-snug text-gray-400">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12 sm:mb-14">
            <p className="text-sm font-bold text-[#e62224] uppercase tracking-widest mb-3">Quick Answers</p>
            <h2 className="font-black text-gray-900"
              style={{ fontSize: "clamp(22px, 3vw, 38px)", fontFamily: "'Playfair Display', serif" }}>
              Common Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <motion.div key={i}
                  custom={i * 0.07} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "ring-1 ring-[#154895]/20" : ""}`}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-start gap-4 p-6 text-left cursor-pointer">
                    <span className="font-bold text-gray-900 flex-1 text-sm leading-relaxed">{faq.q}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                      isOpen ? "bg-[#154895] text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-100/80 pt-4">
                          <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── 8. CTA BANNER ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75, ease }}
            className="relative rounded-3xl overflow-hidden px-8 py-14 sm:py-20 md:p-20 text-center"
            style={{ background: "linear-gradient(135deg, #154895 0%, #0d2f6b 60%, #0a1e4a 100%)" }}>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-[.08]" style={{ background: "#fff" }} />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-[.09]" style={{ background: "#e62224" }} />
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-[#e62224] rounded-full" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span className="text-white/90 text-sm font-semibold">Ready to Scale Your Workforce?</span>
              </div>

              <h2 className="font-black text-white leading-tight mb-5"
                style={{ fontSize: "clamp(24px, 4vw, 48px)", fontFamily: "'Playfair Display', serif" }}>
                Launch Your Campaign Today
              </h2>
              <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-10">
                From 20 hires to 4,000 workers — tell us your headcount, industry & timeline.
                We'll handle every step in 25–30 days.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a href="tel:+97444434386"
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 font-bold px-7 py-4 rounded-2xl text-sm shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-300"
                  style={{ background: "#fff", color: "#154895" }}>
                  <Phone size={16} /> Call +974 4443 4386
                </motion.a>
                <motion.a href="mailto:business@asliyarecruitment.com"
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 font-bold px-7 py-4 rounded-2xl border text-sm transition-colors duration-300 hover:bg-white/20"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}>
                  <Mail size={16} /> Email Our Team
                </motion.a>
              </div>
              <p className="mt-8 text-white/30 text-sm">
                Free consultation · No commitment · Doha, Qatar · Min. 20 workers
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

    </div>
  )
}