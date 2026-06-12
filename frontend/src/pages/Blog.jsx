import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, BookOpen, ArrowRight, Clock, Send, Globe, Users,
  FileText, Briefcase, TrendingUp, Shield, Brain, BarChart2,
  Plane, AlertTriangle, Lightbulb, Calendar, ChevronRight, Phone,
  CheckCircle, ChevronDown, Plus, Minus,
  UserCheck, Building2, Heart, Cpu, Truck, ShoppingBag,
  Landmark, Flame, GraduationCap, Package, Wrench, UtensilsCrossed,
  Trophy, Star, Award, Target, Eye,
  Linkedin, ShieldCheck, Download,
  Tag, RefreshCw   // ✅ ADD THIS
} from "lucide-react";
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Container from "../components/ui/Container"
import SectionHeading from "../components/ui/SectionHeading"


const EASE = [0.22, 1, 0.36, 1];

const ANIM_CSS = `
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes floatX {
    0%,100% { transform: translateX(0px); }
    50%      { transform: translateX(8px); }
  }
  @keyframes spin-slow {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .6; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes count-pop {
    0%   { transform: scale(1);    }
    50%  { transform: scale(1.08); }
    100% { transform: scale(1);    }
  }
  .float-y   { animation: floatY 5s ease-in-out infinite; }
  .float-x   { animation: floatX 7s ease-in-out infinite; }
  .spin-slow { animation: spin-slow 18s linear infinite; }
  .count-pop { animation: count-pop .35s ease; }

  @keyframes blob1 {
    0%,100% { transform: scale(1)   translate(0,0);     opacity:.10; }
    33%      { transform: scale(1.18) translate(24px,-18px); opacity:.16; }
    66%      { transform: scale(.92) translate(-16px,12px); opacity:.08; }
  }
  @keyframes blob2 {
    0%,100% { transform: scale(1.1) translate(0,0);     opacity:.08; }
    33%      { transform: scale(.9)  translate(-20px,16px); opacity:.13; }
    66%      { transform: scale(1.2) translate(14px,-10px); opacity:.07; }
  }
  .blob1 { animation: blob1 9s ease-in-out infinite; }
  .blob2 { animation: blob2 11s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.4) 40%,#fff 60%,rgba(255,255,255,.4) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3.5s linear infinite;
  }

  .card-glow {
    position:relative; transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
  }
  .card-glow:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(21,72,149,.14); }

  .tl-dot-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
  .tl-dot-wrap::before {
    content:''; position:absolute;
    width:28px; height:28px; border-radius:50%;
    background: rgba(21,72,149,.25);
    animation: pulse-ring 1.8s ease-out infinite;
  }

  .partner-chip {
    transition: transform .28s cubic-bezier(.22,1,.36,1),
                box-shadow .28s, filter .28s;
  }
  .partner-chip:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 10px 28px rgba(21,72,149,.14);
    filter: grayscale(0%) !important;
  }

  .team-avatar-wrap { position:relative; display:inline-block; }
  .team-avatar-wrap::after {
    content:''; position:absolute; inset:-4px; border-radius:24px;
    border: 2px solid rgba(21,72,149,.4);
    opacity:0; transition: opacity .3s;
  }
  .team-card:hover .team-avatar-wrap::after { opacity:1; }

  .stat-num {
    display:inline-block;
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.55) 40%,#fff 60%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation: shimmer 2.5s linear infinite;
  }

  @keyframes orb1 {
    0%,100%{ transform:scale(1) translate(0,0);   }
    50%    { transform:scale(1.25) translate(20px,-15px); }
  }
  @keyframes orb2 {
    0%,100%{ transform:scale(1.2) translate(0,0); }
    50%    { transform:scale(.85) translate(-18px,12px); }
  }
  .orb1 { animation: orb1 8s ease-in-out infinite; }
  .orb2 { animation: orb2 10s ease-in-out infinite; }

  .badge-float { animation: floatY 4s ease-in-out infinite; }

  .ring-spin-cw  { animation: spin-slow 22s linear infinite; }
  .ring-spin-ccw { animation: spin-slow 28s linear infinite reverse; }

  .mvv-bar {
    position:absolute; top:0; left:0; right:0; height:4px;
    border-radius:16px 16px 0 0;
    transform: scaleX(0); transform-origin: left;
    transition: transform .45s cubic-bezier(.22,1,.36,1);
  }
  .mvv-card-wrap:hover .mvv-bar { transform: scaleX(1); }
  .mvv-card-wrap .mvv-icon-inner {
    transition: transform .35s cubic-bezier(.22,1,.36,1);
  }
  .mvv-card-wrap:hover .mvv-icon-inner { transform: scale(1.12) rotate(-4deg); }

  .sr { opacity:0; transform:translateY(28px); transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1); }
  .sr.in { opacity:1; transform:translateY(0); }
`;



// ─── Data ─────────────────────────────────────────────────────────────────────

const POSTS = [
  {
    id: 1,
    title: "How to Hire 500 Workers in 30 Days: A Step-by-Step Guide",
    excerpt: "Mass hiring at speed requires more than just job postings — it demands a structured, multi-channel approach. We break down the exact playbook our team uses to fill large-scale manpower needs without sacrificing quality.",
    category: "Recruitment Tips",
    author: "Maria Santos",
    authorRole: "Head of Recruitment",
    authorInitials: "MS",
    date: "May 28, 2025",
    readTime: "8 min read",
    tag: "featured",
    icon: Users,
    imageGradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Top 10 Countries for OFW Deployment in 2025",
    excerpt: "The overseas employment landscape is shifting, with new opportunities emerging across the Middle East and Southeast Asia. Here are the top destinations offering the best wages, benefits, and stability for Filipino workers this year.",
    category: "Overseas Jobs",
    author: "Carlo Reyes",
    authorRole: "Overseas Deployment Manager",
    authorInitials: "CR",
    date: "May 20, 2025",
    readTime: "6 min read",
    tag: "trending",
    icon: Globe,
    imageGradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "Executive Search vs. Contingency Recruiting: Which Is Right for You?",
    excerpt: "Choosing the wrong search model for a senior hire can cost you months and thousands in lost productivity. This guide unpacks the key differences so you can make the right call for your organization.",
    category: "HR Insights",
    author: "Diana Lim",
    authorRole: "Senior Talent Advisor",
    authorInitials: "DL",
    date: "May 14, 2025",
    readTime: "7 min read",
    tag: "new",
    icon: Search,
    imageGradient: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    title: "Why Temp Staffing Is the Smart Choice for Seasonal Peaks",
    excerpt: "Overhiring for a season you can't predict is one of the most expensive mistakes in workforce management. Temporary staffing gives you the flexibility to scale instantly without the long-term overhead.",
    category: "Recruitment Tips",
    author: "James Ong",
    authorRole: "Staffing Solutions Lead",
    authorInitials: "JO",
    date: "May 8, 2025",
    readTime: "5 min read",
    tag: "trending",
    icon: Calendar,
    imageGradient: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "The Complete Visa Guide for GCC-Bound Workers",
    excerpt: "Navigating the visa process for Gulf countries can be confusing without the right guidance. This comprehensive guide covers every document, timeline, and requirement you need to deploy workers to the GCC region.",
    category: "Overseas Jobs",
    author: "Lena Torres",
    authorRole: "Documentation Specialist",
    authorInitials: "LT",
    date: "Apr 30, 2025",
    readTime: "9 min read",
    tag: "new",
    icon: FileText,
    imageGradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 6,
    title: "How RecruitMax Deployed 300 Engineers to Qatar in 3 Weeks",
    excerpt: "When a major infrastructure firm needed 300 civil engineers on-site in Qatar within the month, our team activated a coordinated sourcing-to-deployment operation unlike anything we had done before. Here's exactly how we did it.",
    category: "Case Studies",
    author: "Marco Villanueva",
    authorRole: "Project Deployment Head",
    authorInitials: "MV",
    date: "Apr 22, 2025",
    readTime: "10 min read",
    tag: "trending",
    icon: Briefcase,
    imageGradient: "from-rose-500 to-pink-600",
  },
  {
    id: 7,
    title: "5 Red Flags to Watch Out for in Overseas Job Offers",
    excerpt: "Not every overseas job offer is legitimate, and distinguishing real opportunities from scams requires knowing what to look for. We've compiled the most common warning signs that should make any job seeker pause.",
    category: "Career Advice",
    author: "Sofia Cruz",
    authorRole: "Worker Welfare Officer",
    authorInitials: "SC",
    date: "Apr 15, 2025",
    readTime: "5 min read",
    tag: "new",
    icon: AlertTriangle,
    imageGradient: "from-amber-500 to-orange-600",
  },
  {
    id: 8,
    title: "Building a High-Retention Workforce: Lessons from Top Employers",
    excerpt: "Retention isn't about perks — it's about building a culture where people genuinely want to stay. We studied the practices of the most employee-loyal companies across the region and distilled their top strategies.",
    category: "HR Insights",
    author: "Diana Lim",
    authorRole: "Senior Talent Advisor",
    authorInitials: "DL",
    date: "Apr 8, 2025",
    readTime: "7 min read",
    tag: null,
    icon: TrendingUp,
    imageGradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 9,
    title: "Mass Recruitment Job Fair: What Employers Need to Know",
    excerpt: "Job fairs remain one of the most effective tools for high-volume hiring when executed correctly. This guide covers everything from venue setup to applicant screening systems that ensure you leave with qualified hires.",
    category: "Recruitment Tips",
    author: "Maria Santos",
    authorRole: "Head of Recruitment",
    authorInitials: "MS",
    date: "Mar 28, 2025",
    readTime: "6 min read",
    tag: null,
    icon: Users,
    imageGradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 10,
    title: "The Rise of AI in Recruitment: What It Means for Job Seekers",
    excerpt: "AI is reshaping how companies find, assess, and hire talent — and job seekers who understand how these systems work have a significant advantage. Here's what you need to know to get past automated screening.",
    category: "Industry News",
    author: "Kevin Tan",
    authorRole: "Technology & Talent Writer",
    authorInitials: "KT",
    date: "Mar 18, 2025",
    readTime: "6 min read",
    tag: "trending",
    icon: Brain,
    imageGradient: "from-violet-500 to-purple-600",
  },
  {
    id: 11,
    title: "Domestic Hiring Trends in 2025: What's Changing?",
    excerpt: "The Philippine labor market is evolving faster than ever, driven by digital transformation and shifting employee expectations. We break down the biggest trends shaping how companies recruit locally this year.",
    category: "Industry News",
    author: "Carlo Reyes",
    authorRole: "Overseas Deployment Manager",
    authorInitials: "CR",
    date: "Mar 10, 2025",
    readTime: "5 min read",
    tag: "new",
    icon: BarChart2,
    imageGradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 12,
    title: "From Application to Deployment: The OFW Journey Explained",
    excerpt: "The path from submitting an application to boarding a plane for work abroad involves many steps, agencies, and approvals. This complete walkthrough demystifies every stage of the official OFW deployment process.",
    category: "Career Advice",
    author: "Lena Torres",
    authorRole: "Documentation Specialist",
    authorInitials: "LT",
    date: "Mar 1, 2025",
    readTime: "8 min read",
    tag: null,
    icon: Plane,
    imageGradient: "from-rose-500 to-pink-600",
  },
]

const CATEGORIES = ["All", "Recruitment Tips", "Overseas Jobs", "Industry News", "Career Advice", "HR Insights", "Case Studies"]

const TRENDING_TOPICS = [
  { icon: Globe, name: "OFW Deployment", count: "8 articles" },
  { icon: Users, name: "Mass Hiring", count: "5 articles" },
  { icon: FileText, name: "Visa Processing", count: "6 articles" },
  { icon: Search, name: "Executive Search", count: "4 articles" },
  { icon: Clock, name: "Temp Staffing", count: "7 articles" },
  { icon: Lightbulb, name: "HR Strategy", count: "9 articles" },
]

const FEATURED_POST = POSTS[0]
const RECENT_POSTS = POSTS.slice(1, 5)

// ─── Animation ────────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  }),
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

function TagBadge({ tag }) {
  if (!tag || tag === "featured") return null
  const styles = {
    trending: "bg-amber-400 text-white",
    new: "bg-emerald-500 text-white",
  }
  return (
    <span className={`${styles[tag]} text-xs font-bold px-2.5 py-1 rounded-full capitalize`}>
      {tag === "trending" ? "Trending" : "New"}
    </span>
  )
}

function PostCard({ post, index }) {
  const Icon = post.icon
  return (
    <motion.div
      custom={index} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10 transition-all duration-500 flex flex-col"
    >
      {/* Image area */}
      <div className={`h-48 bg-gradient-to-br ${post.imageGradient} relative flex items-center justify-center`}>
        <Icon className="w-8 h-8 text-white/60" />
        <span className="absolute top-3 left-3 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
          {post.category}
        </span>
        {post.tag && post.tag !== "featured" && (
          <span className="absolute top-3 right-3">
            <TagBadge tag={post.tag} />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="font-bold text-gray-900 text-base leading-snug line-clamp-2 hover:text-[#154895] transition-colors cursor-pointer">
          {post.title}
        </p>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed flex-1">{post.excerpt}</p>

        {/* Author + meta */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0">
              {post.authorInitials}
            </div>
            <span className="text-xs font-semibold text-gray-700">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)

  const filteredPosts = POSTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  const handleNewsletterSubmit = () => {
    if (!newsletterEmail) return
    setNewsletterSuccess(true)
    setNewsletterEmail("")
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
     <section className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
  <style>{ANIM_CSS}</style>

  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="blob1 absolute -top-32 -left-32 w-[600px] h-[600px] bg-white rounded-full blur-3xl" />
    <div className="blob2 absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#e62224] rounded-full blur-3xl" />
    <div className="absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
    <div className="ring-spin-cw  absolute top-16  right-24 w-64 h-64 border-2 border-dashed border-white/10 rounded-full" />
    <div className="ring-spin-ccw absolute bottom-12 left-16  w-40 h-40 border-2 border-dashed border-white/10 rounded-full" />
    <div className="ring-spin-cw  absolute top-1/2  left-1/3  w-24 h-24 border   border-dashed border-white/[.06] rounded-full" />
  </div>

  <Container className="relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .5 }}
      className="flex items-center gap-2 mb-6 sm:mb-8 text-sm text-white/50 font-medium"
    >
      <a href="/" className="hover:text-white/80 transition-colors">Home</a>
      <ChevronRight size={14} className="text-white/30" />
      <span className="text-white/80">Blog</span>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .1, duration: .7, ease: EASE }}
      className="shimmer-text font-black leading-[1.08] tracking-tight mb-5 sm:mb-6 max-w-3xl"
      style={{ fontSize: "clamp(32px, 6vw, 60px)" }}
    >
      Insights, Guides &amp; Industry News
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .25, duration: .6 }}
      className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mb-7 sm:mb-8"
    >
      Expert recruitment insights to help employers hire smarter and job seekers move faster.
    </motion.p>

    {/* Search bar */}
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .4, duration: .6 }}
      className="max-w-xl mb-7 sm:mb-8"
    >
      <div className="bg-white rounded-2xl flex items-center px-5 py-3 gap-3 shadow-2xl">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles…"
          className="flex-1 outline-none text-sm text-gray-900 placeholder:text-gray-400 bg-transparent"
        />
        <button className="bg-[#154895] text-white rounded-xl px-5 py-2 text-sm font-bold hover:bg-[#0d3270] transition-colors duration-200 flex-shrink-0">
          Search
        </button>
      </div>
    </motion.div>

    <motion.div
      className="flex flex-wrap gap-2 sm:gap-3"
      initial="hidden" animate="visible"
      variants={{ visible: { transition: { staggerChildren: .1, delayChildren: .6 } } }}
    >
      {[
        { icon: BookOpen,  label: "12 Articles" },
        { icon: Tag,       label: "6 Categories" },
        { icon: RefreshCw, label: "Updated Weekly" },
      ].map(({ icon: Icon, label }) => (
        <motion.div key={label}
          variants={{ hidden: { opacity: 0, scale: .8, y: 6 }, visible: { opacity: 1, scale: 1, y: 0 } }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white/80"
        >
          <Icon size={12} className="text-white/60" />{label}
        </motion.div>
      ))}
    </motion.div>
  </Container>

  <div className="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="white" />
    </svg>
  </div>
</section>

      {/* ── 2. FEATURED POST ─────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <Container>
          <SectionHeading tag="Featured" title="Editor's Pick" />

          <div className="mt-16 grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-100/80">
            {/* Left image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease }}
              className={`bg-gradient-to-br ${FEATURED_POST.imageGradient} min-h-[360px] relative flex flex-col items-center justify-center`}
            >
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <span className="absolute top-4 left-4 bg-[#e62224] text-white rounded-full px-3 py-1 text-xs font-bold">
                Featured
              </span>
              <BookOpen className="w-14 h-14 text-white/80 relative z-10" />
              <span className="mt-4 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm relative z-10">
                {FEATURED_POST.category}
              </span>
            </motion.div>

            {/* Right content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease }}
              className="bg-white p-10 lg:p-14 flex flex-col justify-center"
            >
              <span className="text-sm text-[#e62224] font-semibold uppercase tracking-widest">
                {FEATURED_POST.category}
              </span>
              <h2 className="font-black text-3xl text-gray-900 mt-3 leading-tight">{FEATURED_POST.title}</h2>
              <p className="text-gray-500 mt-4 leading-relaxed">{FEATURED_POST.excerpt}</p>

              {/* Author row */}
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {FEATURED_POST.authorInitials}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{FEATURED_POST.author}</p>
                  <p className="text-xs text-gray-400">{FEATURED_POST.authorRole}</p>
                </div>
                <div className="ml-auto flex items-center gap-3 text-xs text-gray-400">
                  <span>{FEATURED_POST.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{FEATURED_POST.readTime}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="mt-8 bg-[#154895] text-white rounded-2xl px-8 py-4 font-bold inline-flex items-center gap-2 hover:bg-[#0d3270] transition-colors duration-300 self-start"
              >
                Read Full Article <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── 3. CATEGORY FILTER + GRID ────────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-28">
        <Container>
          <SectionHeading tag="All Articles" title="Browse By Category" />

          {/* Filter tabs */}
          <div className="mt-10 flex overflow-x-auto gap-2 bg-white rounded-2xl p-2 shadow-sm scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#154895] text-white shadow-lg shadow-[#154895]/25"
                    : "text-gray-500 hover:text-[#154895] hover:bg-[#154895]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="mt-10"
            >
              {filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-5">
                    <Search className="w-7 h-7 text-gray-300" />
                  </div>
                  <p className="font-bold text-gray-900 text-lg">No articles found</p>
                  <p className="text-gray-400 mt-2 text-sm">Try a different search term or category.</p>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
                    className="mt-6 border-2 border-[#154895] text-[#154895] font-bold rounded-2xl px-6 py-3 hover:bg-[#154895] hover:text-white transition-colors duration-300"
                  >
                    Clear Filters
                  </motion.button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* ── 4. NEWSLETTER BAND ───────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <Container>
          <div className="bg-gradient-to-br from-[#154895] via-[#1a56b0] to-[#0d3270] rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              {/* Left text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, ease }}
              >
                <span className="text-sm font-semibold text-white/50 uppercase tracking-widest">Stay Updated</span>
                <h2 className="mt-3 text-3xl font-black text-white leading-tight">
                  Get Recruitment Insights Delivered to Your Inbox
                </h2>
                <p className="mt-3 text-white/70">
                  Join 5,000+ HR leaders and recruiters who read our weekly digest.
                </p>
              </motion.div>

              {/* Right form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, ease }}
              >
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address…"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                    onClick={handleNewsletterSubmit}
                    className="bg-white text-[#154895] font-bold rounded-xl px-6 py-3.5 hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" /> Subscribe
                  </motion.button>
                </div>
                <AnimatePresence>
                  {newsletterSuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-3 text-sm text-emerald-300 font-medium"
                    >
                      ✓ You're subscribed! Check your inbox.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. TRENDING TOPICS ───────────────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-28">
        <Container>
          <SectionHeading tag="Quick Reads" title="Trending Topics This Week" />

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-12 flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
          >
            {TRENDING_TOPICS.map((topic, i) => {
              const Icon = topic.icon
              return (
                <motion.div
                  key={topic.name}
                  custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group bg-white border border-gray-200 rounded-2xl px-6 py-4 flex flex-col gap-1 min-w-[180px] cursor-pointer hover:border-[#154895]/30 hover:bg-[#154895]/5 transition-all duration-300 flex-shrink-0"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#154895] transition-colors duration-300 mb-1" />
                  <p className="font-bold text-gray-900 text-sm group-hover:text-[#154895] transition-colors duration-300">
                    {topic.name}
                  </p>
                  <p className="text-xs text-gray-400">{topic.count}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>

      {/* ── 6. RECENT POSTS LIST ─────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <Container>
          <SectionHeading tag="Recent" title="Latest From the Blog" />

          <div className="mt-16 max-w-4xl mx-auto space-y-4">
            {RECENT_POSTS.map((post, i) => {
              const Icon = post.icon
              return (
                <motion.div
                  key={post.id}
                  custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex gap-6 items-center hover:border-[#154895]/20 hover:shadow-xl hover:shadow-[#154895]/10 transition-all duration-500"
                >
                  {/* Thumb */}
                  <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${post.imageGradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-[#e62224] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <p className="font-bold text-gray-900 text-base leading-snug mt-1 hover:text-[#154895] transition-colors cursor-pointer">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <button className="mt-2 text-[#154895] text-xs font-semibold hover:underline underline-offset-4 transition-all">
                      Read More →
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── 7. CTA BANNER ────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f9fc]">
        <Container>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-gradient-to-br from-[#154895] via-[#1a56b0] to-[#0d3270] rounded-3xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="relative z-10">
              <span className="text-sm font-semibold text-white/50 uppercase tracking-widest">Partner With Us</span>
              <h2 className="mt-4 text-4xl font-black text-white">Ready to Partner With a Recruitment Expert?</h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                Talk to our team and let's design the right hiring strategy for your business.
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
                  <ChevronRight className="w-4 h-4" /> Browse Services
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