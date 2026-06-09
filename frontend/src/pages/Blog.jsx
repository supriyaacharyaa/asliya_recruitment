import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, BookOpen, ArrowRight, Clock, Send, Globe, Users,
  FileText, Briefcase, TrendingUp, Shield, Brain, BarChart2,
  Plane, AlertTriangle, Lightbulb, Calendar, ChevronRight, Phone
} from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Container from "../components/ui/Container"
import SectionHeading from "../components/ui/SectionHeading"

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
      <section className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] py-40 overflow-hidden">
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-[#e62224]/10 blur-3xl"
            animate={{ scale: [1, 1.15, 1], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <Container>
          {/* Breadcrumb */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible"
            className="flex items-center gap-2 text-white/50 text-sm mb-8">
            <span>Home</span><span>/</span>
            <span className="text-white/80 font-semibold">Blog</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl">
            Insights, Guides &amp; Industry News
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="mt-5 text-xl text-white/70 max-w-2xl">
            Expert recruitment insights to help employers hire smarter and job seekers move faster.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="max-w-xl mt-10"
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

          {/* Stat pills */}
          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible"
            className="mt-8 flex flex-wrap gap-3">
            {["12 Articles Published", "6 Categories", "Updated Weekly"].map((txt) => (
              <div key={txt}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-white text-sm font-medium">
                {txt}
              </div>
            ))}
          </motion.div>
        </Container>

        <WaveBottom fill="#ffffff" />
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