import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle, ChevronDown, Plus, Minus,
  Globe, Users, UserCheck, Search, Clock, Briefcase,
  Building2, Heart, Cpu, Shield, Truck, ShoppingBag,
  Landmark, Flame, GraduationCap, Package, Plane, Wrench, UtensilsCrossed,
  Trophy, Star, ArrowRight, Phone
} from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Container from "../components/ui/Container"
import Button from "../components/ui/Button"
import SectionHeading from "../components/ui/SectionHeading"

// ─── Data ────────────────────────────────────────────────────────────────────

const TABS = [
  {
    id: "domestic",
    label: "Domestic",
    icon: Building2,
    category: "Local Recruitment",
    title: "Domestic Recruitment Solutions",
    description:
      "We connect businesses across the country with qualified, vetted candidates ready to contribute from day one. Our deep network of local talent ensures fast, reliable placements across all job levels.",
    features: [
      "Nationwide candidate database with 200,000+ active profiles",
      "Pre-screened candidates matched to your JD within 48 hours",
      "Background verification & reference checks included",
      "30-day free replacement guarantee on all placements",
      "Dedicated account manager from search to onboarding",
    ],
    industries: ["Manufacturing", "Retail", "Finance", "Logistics", "Healthcare"],
    stat1: { value: "48 hrs", label: "Avg. Shortlist Time" },
    stat2: { value: "94%", label: "Offer Acceptance Rate" },
    stat3: { value: "30-day", label: "Replacement Guarantee" },
    metric: { value: "12,000+", label: "Domestic Placements" },
  },
  {
    id: "overseas",
    label: "Overseas",
    icon: Globe,
    category: "International Recruitment",
    title: "Overseas Manpower Deployment",
    description:
      "End-to-end overseas recruitment for GCC, Europe, and Southeast Asia. From sourcing to visa processing to flight coordination — we handle every step so your workforce arrives compliant and ready.",
    features: [
      "Recruitment for UAE, Qatar, Saudi Arabia, Oman & more",
      "Complete visa and work permit processing",
      "Medical, insurance & PDOS coordination",
      "POEA/OWWA documentation handled in full",
      "Post-deployment welfare monitoring for workers",
    ],
    industries: ["Construction", "Hospitality", "Oil & Gas", "Facilities Mgmt.", "Catering"],
    stat1: { value: "25+", label: "Destination Countries" },
    stat2: { value: "7–21 days", label: "Processing Time" },
    stat3: { value: "100%", label: "Compliance Rate" },
    metric: { value: "8,500+", label: "Workers Deployed" },
  },
  {
    id: "staffing",
    label: "Local Staffing",
    icon: Briefcase,
    category: "On-site Staffing",
    title: "Local Staffing & Outsourcing",
    description:
      "Flexible local staffing solutions where we manage payroll, HR admin, and compliance — letting your team focus on core operations. Perfect for businesses scaling fast without HR overhead.",
    features: [
      "Full payroll processing and statutory compliance",
      "SSS, PhilHealth, Pag-IBIG contributions managed",
      "Performance monitoring and reporting dashboard",
      "Replacement of underperformers within 5 business days",
      "Scalable headcount — ramp up or down anytime",
    ],
    industries: ["IT", "Finance", "Retail", "Education", "Transport"],
    stat1: { value: "5 days", label: "Replacement SLA" },
    stat2: { value: "Zero", label: "Compliance Gaps" },
    stat3: { value: "500+", label: "Active Client Sites" },
    metric: { value: "3,200+", label: "Staff Managed" },
  },
  {
    id: "mass",
    label: "Mass Recruitment",
    icon: Users,
    category: "Volume Hiring",
    title: "Mass & Bulk Recruitment",
    description:
      "Need 50 to 5,000 workers fast? Our dedicated mass hiring teams deploy job fairs, digital campaigns, and regional sourcing drives to fill large-scale manpower requirements in record time.",
    features: [
      "Dedicated bulk-hiring project team assigned",
      "Job fairs organized nationally within 7 days",
      "ATS-powered applicant tracking for large volumes",
      "Group onboarding and orientation services",
      "Real-time dashboard: applications, offers, hires",
    ],
    industries: ["Manufacturing", "Construction", "Logistics", "Retail", "Aviation"],
    stat1: { value: "5,000+", label: "Max Monthly Hires" },
    stat2: { value: "7 days", label: "First Batch Ready" },
    stat3: { value: "99%", label: "Fill Rate on Projects" },
    metric: { value: "40+", label: "Mass Projects Completed" },
  },
  {
    id: "executive",
    label: "Executive Search",
    icon: Search,
    category: "Senior Leadership",
    title: "Executive Search & Headhunting",
    description:
      "Confidential, research-driven executive search for C-suite, VP, and director-level roles. We map the market, engage passive candidates, and deliver a curated shortlist — not a stack of CVs.",
    features: [
      "Market mapping and competitor talent intelligence",
      "Passive candidate outreach via our executive network",
      "Psychometric profiling and leadership assessments",
      "Strictly confidential — no public job postings",
      "Retained or contingency engagement models",
    ],
    industries: ["Banking", "Tech", "Healthcare", "Oil & Gas", "FMCG"],
    stat1: { value: "4–6 weeks", label: "Avg. Search Duration" },
    stat2: { value: "3:1", label: "Shortlist Ratio" },
    stat3: { value: "90%", label: "Long-term Retention" },
    metric: { value: "320+", label: "Executives Placed" },
  },
  {
    id: "temp",
    label: "Temp Staffing",
    icon: Clock,
    category: "Flexible Workforce",
    title: "Temporary & Contract Staffing",
    description:
      "On-demand temporary workers for seasonal peaks, project coverage, or maternity/sick leave gaps. Deploy skilled, pre-vetted staff within 24–72 hours — no long-term commitment required.",
    features: [
      "24–72 hour deployment for urgent requirements",
      "Fully vetted and insured temporary workers",
      "Daily, weekly, or monthly engagement terms",
      "Convert to permanent hire at any time",
      "Single invoice covering all HR and payroll costs",
    ],
    industries: ["Hospitality", "Retail", "Events", "Healthcare", "Security"],
    stat1: { value: "24 hrs", label: "Fastest Deployment" },
    stat2: { value: "10,000+", label: "Temp Workers Pool" },
    stat3: { value: "No", label: "Long-term Commitment" },
    metric: { value: "1,800+", label: "Active Temp Placements" },
  },
]

const PROCESS_STEPS = [
  {
    id: "domestic",
    service: "Domestic Recruitment",
    icon: Building2,
    steps: [
      { n: 1, title: "Intake & JD Review", desc: "We understand your role, culture, and timeline" },
      { n: 2, title: "Talent Search", desc: "We search our database and active market" },
      { n: 3, title: "Screening & Shortlist", desc: "Interviews, background checks, and matching" },
      { n: 4, title: "Placement & Follow-up", desc: "Offer support, onboarding, and 30-day check-in" },
    ],
  },
  {
    id: "overseas",
    service: "Overseas Deployment",
    icon: Globe,
    steps: [
      { n: 1, title: "Manpower Order", desc: "Receive and verify principal's job order" },
      { n: 2, title: "Sourcing & Selection", desc: "Trade tests, interviews, and skills validation" },
      { n: 3, title: "Documentation", desc: "Visa, medical, insurance, PDOS processing" },
      { n: 4, title: "Deployment & Monitoring", desc: "Flight coordination and welfare follow-up" },
    ],
  },
  {
    id: "staffing",
    service: "Local Staffing",
    icon: Briefcase,
    steps: [
      { n: 1, title: "Scope Agreement", desc: "Define headcount, roles, and SLA terms" },
      { n: 2, title: "Rapid Deployment", desc: "Staff sourced, screened, and deployed" },
      { n: 3, title: "Ongoing Management", desc: "Payroll, compliance, and HR admin handled" },
      { n: 4, title: "Performance Reviews", desc: "Monthly reports and replacement as needed" },
    ],
  },
  {
    id: "mass",
    service: "Mass Recruitment",
    icon: Users,
    steps: [
      { n: 1, title: "Project Kickoff", desc: "Assign dedicated team, set targets and timeline" },
      { n: 2, title: "Sourcing Drive", desc: "Job fairs, digital campaigns, referrals" },
      { n: 3, title: "Bulk Screening", desc: "Group interviews and assessment centers" },
      { n: 4, title: "Batch Onboarding", desc: "Group orientation, deployment in waves" },
    ],
  },
  {
    id: "executive",
    service: "Executive Search",
    icon: Search,
    steps: [
      { n: 1, title: "Mandate Brief", desc: "Deep-dive into role, strategy, and culture fit" },
      { n: 2, title: "Market Mapping", desc: "Research and identify top passive candidates" },
      { n: 3, title: "Confidential Outreach", desc: "Direct approach and candidate engagement" },
      { n: 4, title: "Curated Shortlist", desc: "Assessed profiles with our recommendation" },
    ],
  },
  {
    id: "temp",
    service: "Temp Staffing",
    icon: Clock,
    steps: [
      { n: 1, title: "Urgent Request", desc: "Submit your requirements — any time, any day" },
      { n: 2, title: "Instant Matching", desc: "Match from our pre-vetted temp worker pool" },
      { n: 3, title: "Same-day Deploy", desc: "Worker briefed, insured, and sent to site" },
      { n: 4, title: "Billing & Extension", desc: "Simple single invoice, extend or convert anytime" },
    ],
  },
]

const INDUSTRIES = [
  { icon: Building2, name: "Construction" },
  { icon: UtensilsCrossed, name: "Hospitality" },
  { icon: Heart, name: "Healthcare" },
  { icon: Wrench, name: "Manufacturing" },
  { icon: Cpu, name: "IT" },
  { icon: Shield, name: "Security" },
  { icon: Truck, name: "Transport" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Landmark, name: "Finance" },
  { icon: Flame, name: "Oil & Gas" },
  { icon: GraduationCap, name: "Education" },
  { icon: Package, name: "Logistics" },
  { icon: Plane, name: "Aviation" },
  { icon: Wrench, name: "FM" },
  { icon: UtensilsCrossed, name: "Catering" },
]

const TESTIMONIALS = [
  {
    quote:
      "RecruitMax deployed 300 construction workers to our UAE project in under 3 weeks. Documentation was flawless and every worker arrived compliant. Absolutely professional.",
    name: "Mohammed Al-Rashidi",
    role: "Projects Director",
    company: "Al Futtaim Engineering",
    service: "Overseas Deployment",
    avatar: "MA",
  },
  {
    quote:
      "We needed a Country Manager fast. RecruitMax's executive search team delivered a shortlist of 4 outstanding candidates within 5 weeks — all passive, all perfectly matched.",
    name: "Sandra Reyes",
    role: "Chief People Officer",
    company: "Pacific Rim Holdings",
    service: "Executive Search",
    avatar: "SR",
  },
  {
    quote:
      "During our peak season we needed 150 temp staff across 12 outlets. RecruitMax filled every position in 48 hours. That kind of speed is unmatched in the industry.",
    name: "Kevin Tan",
    role: "Head of Operations",
    company: "Foodpanda Philippines",
    service: "Temp Staffing",
    avatar: "KT",
  },
]

const FAQS = [
  {
    q: "How long does the recruitment process take?",
    a: "Timelines vary by service: domestic placements take 3–10 days, overseas deployment 2–4 weeks, executive search 4–6 weeks, and temp staffing as fast as 24 hours.",
  },
  {
    q: "Do you handle visa and work permit processing?",
    a: "Yes. For overseas deployment, we manage the full documentation cycle — visa applications, work permits, medical clearances, PDOS, OEC, and insurance — end to end.",
  },
  {
    q: "What industries do you cover?",
    a: "We recruit across 15+ sectors including Construction, Hospitality, Healthcare, IT, Manufacturing, Security, Transport, Oil & Gas, Finance, Logistics, Aviation, and more.",
  },
  {
    q: "Is there a replacement guarantee if a hire doesn't work out?",
    a: "All standard placements include a 30-day free replacement guarantee. Executive search engagements include a 90-day guarantee. Terms are outlined in your service agreement.",
  },
  {
    q: "How do you verify and screen candidates?",
    a: "Our screening process includes background checks, employment history verification, trade tests (for technical roles), reference checks, and optional psychometric assessments.",
  },
  {
    q: "Do you offer temporary and contractual staffing?",
    a: "Absolutely. Our temp staffing service provides pre-vetted workers on daily, weekly, or monthly terms — deployable within 24–72 hours, with no long-term commitment required.",
  },
  {
    q: "Which countries do you recruit workers from?",
    a: "We source talent from the Philippines, Nepal, India, Sri Lanka, Bangladesh, Indonesia, and other key labor-sending countries, depending on principal requirements.",
  },
  {
    q: "How do I get started with RecruitMax?",
    a: "Simply click 'Book a Free Consultation' or call our hotline. A dedicated account manager will contact you within 2 hours to understand your needs and propose a plan.",
  },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.1 },
  }),
}

const tabPanel = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease } },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WaveBottom({ fill = "#ffffff" }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    </div>
  )
}

function ServiceTabPanel({ tab }) {
  const Icon = tab.icon
  return (
    <motion.div
      key={tab.id}
      variants={tabPanel}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid lg:grid-cols-2 gap-16 items-center"
    >
      {/* LEFT */}
      <div>
        <span className="text-sm font-semibold text-[#e62224] uppercase tracking-widest">{tab.category}</span>
        <h2 className="mt-3 text-4xl font-black text-gray-900 leading-tight">{tab.title}</h2>
        <p className="mt-5 text-gray-500 text-lg leading-relaxed">{tab.description}</p>

        <ul className="mt-8 space-y-3">
          {tab.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#154895] flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Who is this for?</p>
          <div className="flex flex-wrap gap-2">
            {tab.industries.map((ind) => (
              <span key={ind} className="bg-[#154895]/8 text-[#154895] text-sm font-semibold px-4 py-1.5 rounded-full">
                {ind}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#154895] text-white rounded-2xl px-8 py-4 font-bold inline-flex items-center gap-2 hover:bg-[#0d3270] transition-colors duration-300"
          >
            Request This Service <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative">
        <div className="bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-3xl p-10 text-white relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <Icon className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[tab.stat1, tab.stat2, tab.stat3].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <p className="text-xl font-black text-white">{s.value}</p>
                  <p className="text-xs text-white/60 mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Floating metric badge */}
            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-2xl">
              <div className="w-12 h-12 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">{tab.metric.value}</p>
                <p className="text-sm text-gray-500">{tab.metric.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Services() {
  const [activeTab, setActiveTab] = useState(0)
  const [openProcess, setOpenProcess] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />

      {/* ── 1. PAGE HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] py-40 overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#e62224]/10 blur-3xl"
            animate={{ scale: [1, 1.15, 1], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
        </div>

        <Container>
          {/* Breadcrumb */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible"
            className="flex items-center gap-2 text-white/50 text-sm mb-8"
          >
            <span>Home</span>
            <span>/</span>
            <span className="text-white/80 font-semibold">Services</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.h1
              variants={fadeUp} custom={0.5} initial="hidden" animate="visible"
              className="text-5xl lg:text-6xl font-black text-white leading-tight"
            >
              End-to-End Recruitment Solutions
            </motion.h1>
            <motion.p
              variants={fadeUp} custom={1} initial="hidden" animate="visible"
              className="mt-6 text-xl text-white/70 leading-relaxed"
            >
              Domestic. Overseas. Executive. Mass Hiring. We cover it all.
            </motion.p>

            <motion.div
              variants={fadeUp} custom={1.5} initial="hidden" animate="visible"
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="bg-white text-[#154895] font-bold rounded-2xl px-8 py-4 hover:bg-gray-50 transition-colors duration-300"
              >
                Get a Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="border-2 border-white/40 text-white font-bold rounded-2xl px-8 py-4 hover:bg-white/10 transition-colors duration-300"
              >
                See All Industries
              </motion.button>
            </motion.div>
          </div>
        </Container>

        <WaveBottom fill="#ffffff" />
      </section>

      {/* ── 2. SERVICES OVERVIEW TABS ────────────────────────────────────── */}
      <section className="bg-white py-28">
        <Container>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Tab bar */}
            <div className="flex overflow-x-auto gap-2 bg-gray-50 rounded-2xl p-2 mb-16 scrollbar-hide">
              {TABS.map((tab, i) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                      activeTab === i
                        ? "bg-[#154895] text-white shadow-lg shadow-[#154895]/25"
                        : "text-gray-500 hover:text-[#154895] hover:bg-[#154895]/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab panel */}
            <AnimatePresence mode="wait">
              <ServiceTabPanel key={activeTab} tab={TABS[activeTab]} />
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* ── 3. HOW EACH SERVICE WORKS ─────────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-28">
        <Container>
          <SectionHeading tag="Our Process" title="Tailored Process for Every Service" />

          <div className="mt-16 space-y-3">
            {PROCESS_STEPS.map((item, i) => {
              const Icon = item.icon
              const isOpen = openProcess === i
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp} custom={i * 0.08} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-[#154895]/30 bg-white shadow-md" : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <button
                    onClick={() => setOpenProcess(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 p-6 text-left"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? "bg-gradient-to-br from-[#154895] to-[#0d3270]" : "bg-[#154895]/8"
                    }`}>
                      <Icon className={`w-5 h-5 ${isOpen ? "text-white" : "text-[#154895]"}`} />
                    </div>
                    <span className="font-bold text-gray-900 flex-1">{item.service}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          {/* Steps with connecting line */}
                          <div className="relative">
                            <div className="flex items-start gap-0 relative">
                              {item.steps.map((step, j) => (
                                <div key={j} className="flex-1 relative">
                                  {/* Connector line */}
                                  {j < item.steps.length - 1 && (
                                    <div className="absolute top-5 left-1/2 right-0 border-t-2 border-dashed border-[#154895]/20 z-0" />
                                  )}
                                  <div className="relative z-10 flex flex-col items-center text-center px-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-full flex items-center justify-center text-white font-black text-sm mb-3">
                                      {step.n}
                                    </div>
                                    <p className="font-bold text-gray-900 text-sm">{step.title}</p>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
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

      {/* ── 4. PRICING / ENGAGEMENT MODEL ───────────────────────────────── */}
      <section className="bg-white py-28">
        <Container>
          <SectionHeading tag="Engagement Models" title="Flexible Hiring, Your Way" />

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {/* Card 1: Standard */}
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10 transition-all duration-500"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Standard Placement</h3>
              <p className="text-sm text-gray-500 mt-2 mb-6">For single or small-batch hires</p>
              <ul className="space-y-3 flex-1">
                {["One-time recruitment fee", "30-day replacement guarantee", "Background-verified candidates", "Dedicated account contact", "Interview scheduling support"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="mt-8 border-2 border-[#154895] text-[#154895] font-bold rounded-2xl px-6 py-3 hover:bg-[#154895] hover:text-white transition-colors duration-300"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Card 2: Bulk — FEATURED */}
            <motion.div
              variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-2xl shadow-[#154895]/30"
            >
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="absolute top-4 right-4 bg-[#e62224] text-white text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="relative z-10 flex flex-col flex-1">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Bulk / Mass Hire</h3>
                <p className="text-sm text-white/60 mt-2 mb-6">For high-volume manpower needs</p>
                <ul className="space-y-3 flex-1">
                  {["Dedicated bulk-hiring project team", "Job fairs and sourcing drives", "ATS tracking for all applicants", "Group onboarding and orientation", "Real-time applicant dashboard", "Discounted rates for 50+ hires"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="mt-8 bg-white text-[#154895] font-bold rounded-2xl px-6 py-3 hover:bg-gray-100 transition-colors duration-300"
                >
                  Talk to Us
                </motion.button>
              </div>
            </motion.div>

            {/* Card 3: Executive */}
            <motion.div
              variants={fadeUp} custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10 transition-all duration-500"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Executive / Retained</h3>
              <p className="text-sm text-gray-500 mt-2 mb-6">For C-suite and senior leadership</p>
              <ul className="space-y-3 flex-1">
                {["Market mapping & talent intelligence", "Confidential passive outreach", "Psychometric profiling included", "90-day replacement guarantee", "Dedicated senior search consultant"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="mt-8 border-2 border-[#154895] text-[#154895] font-bold rounded-2xl px-6 py-3 hover:bg-[#154895] hover:text-white transition-colors duration-300"
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── 5. INDUSTRIES SERVED ─────────────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-20">
        <Container>
          <SectionHeading tag="Industries" title="We Recruit Across 15+ Sectors" />

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon
              return (
                <motion.div
                  key={ind.name}
                  custom={i * 0.04}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group bg-white border border-gray-200 rounded-full px-5 py-2.5 flex items-center gap-2.5 cursor-pointer hover:border-[#154895]/30 hover:bg-[#154895]/5 hover:text-[#154895] transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#154895] transition-colors duration-300" />
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-[#154895] transition-colors duration-300 whitespace-nowrap">
                    {ind.name}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>

      {/* ── 6. CLIENT TESTIMONIALS ───────────────────────────────────────── */}
      <section className="bg-white py-28">
        <Container>
          <SectionHeading tag="Client Stories" title="Results That Speak" />

          <div className="mt-16 grid lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10 transition-all duration-500"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Service tag */}
                <span className="text-xs font-semibold text-[#e62224] uppercase tracking-widest mb-3">{t.service}</span>

                <p className="text-gray-700 leading-relaxed flex-1 text-sm">"{t.quote}"</p>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-28">
        <Container>
          <SectionHeading tag="FAQ" title="Frequently Asked Questions" />

          <div className="mt-16 grid lg:grid-cols-2 gap-6">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <motion.div
                  key={i}
                  custom={i * 0.08} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-start gap-4 p-6 text-left"
                  >
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
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── 8. CTA BANNER ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-gradient-to-br from-[#154895] via-[#1a56b0] to-[#0d3270] rounded-3xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="relative z-10">
              <span className="text-sm font-semibold text-white/50 uppercase tracking-widest">Get Started</span>
              <h2 className="mt-4 text-4xl font-black text-white">Not Sure Which Service You Need?</h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                Book a free consultation and we'll recommend the right solution for your hiring needs.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="bg-white text-[#154895] font-bold rounded-2xl px-8 py-4 hover:bg-gray-50 transition-colors duration-300"
                >
                  Book Free Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/40 text-white font-bold rounded-2xl px-8 py-4 hover:bg-white/10 inline-flex items-center gap-2 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" /> Call Us Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  )
}