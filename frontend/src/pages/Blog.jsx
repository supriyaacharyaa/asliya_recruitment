
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../Axios/Axios";
import {
  Search, BookOpen, ArrowRight, Clock, Send, Globe, Users,
  FileText, Lightbulb, Calendar, ChevronRight, ChevronLeft,
  Tag, RefreshCw, TrendingUp, Brain, BarChart2, X,
  Briefcase, AlertTriangle,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";


const API   = "/blog";
const EASE  = [0.22, 1, 0.36, 1];

const TRENDING_TOPICS = [
  { icon: Globe,       name: "OFW Deployment",  count: "8 articles" },
  { icon: Users,       name: "Mass Hiring",      count: "5 articles" },
  { icon: FileText,    name: "Visa Processing",  count: "6 articles" },
  { icon: Search,      name: "Executive Search", count: "4 articles" },
  { icon: Lightbulb,   name: "HR Strategy",      count: "9 articles" },
  { icon: TrendingUp,  name: "Retention",        count: "7 articles" },
  { icon: Brain,       name: "AI in Hiring",     count: "3 articles" },
  { icon: BarChart2,   name: "Market Trends",    count: "5 articles" },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const readTime = (content = "") =>
  Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "";

/* ─── CSS animations ─────────────────────────────────────────────────────── */
const ANIM_CSS = `
  @keyframes blob1 {
    0%,100% { transform: scale(1)    translate(0,0);        opacity:.08; }
    33%      { transform: scale(1.15) translate(20px,-16px); opacity:.13; }
    66%      { transform: scale(.9)   translate(-14px,10px); opacity:.06; }
  }
  @keyframes blob2 {
    0%,100% { transform: scale(1.1)  translate(0,0);        opacity:.06; }
    33%      { transform: scale(.88)  translate(-18px,14px); opacity:.11; }
    66%      { transform: scale(1.18) translate(12px,-8px);  opacity:.05; }
  }
  @keyframes shimmer-text {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin-slow  { to { transform: rotate(360deg);  } }
  @keyframes pulse-dot  {
    0%,100% { opacity:.7; transform:scale(1); }
    50%     { opacity:1;  transform:scale(1.3); }
  }
  .blob1 { animation: blob1 10s ease-in-out infinite; }
  .blob2 { animation: blob2 13s ease-in-out infinite; }
  .ring-cw  { animation: spin-slow 24s linear infinite; }
  .ring-ccw { animation: spin-slow 30s linear infinite reverse; }
  .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
  .shimmer-h {
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.45) 40%,#fff 60%,rgba(255,255,255,.45) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer-text 3.5s linear infinite;
  }
  .card-lift {
    transition: transform .35s cubic-bezier(.22,1,.36,1),
                box-shadow .35s cubic-bezier(.22,1,.36,1),
                border-color .35s;
  }
  .card-lift:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 56px rgba(21,72,149,.12);
    border-color: rgba(21,72,149,.22) !important;
  }
  .scrollbar-hide::-webkit-scrollbar { display:none; }
  .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
`;

/* ─── Framer variants ────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.07 },
  }),
};

/* ─── Skeleton ───────────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-52 bg-gray-100" />
    <div className="p-6 space-y-3">
      <div className="h-3 w-24 bg-gray-100 rounded-full" />
      <div className="h-5 bg-gray-100 rounded-lg" />
      <div className="h-4 w-5/6 bg-gray-100 rounded-lg" />
      <div className="h-3 w-1/3 bg-gray-100 rounded-full mt-5" />
    </div>
  </div>
);

/* ─── Hero card (featured post) ──────────────────────────────────────────── */
const HeroCard = ({ blog, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: EASE }}
    onClick={onClick}
    className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#071a3a]"
    style={{ minHeight: 520 }}
  >
    {blog.heroImage && (
      <img
        src={blog.heroImage}
        alt={blog.title}
        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-[1.03] transition-all duration-700"
      />
    )}

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#071a3a]/96 via-[#071a3a]/55 to-transparent" />

    {/* Top accent line */}
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154895] via-[#C5282B] to-[#154895]" />

    {/* Dot grid texture */}
    <div className="absolute inset-0 opacity-[.04]"
      style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "26px 26px" }} />

    <div className="relative flex flex-col justify-end h-full p-10 md:p-14" style={{ minHeight: 520 }}>
      {/* Badges */}
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#C5282B] text-white uppercase tracking-wider">
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-white/80" />
          Featured
        </span>
        {blog.category && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/10 text-white/75 backdrop-blur-sm border border-white/12">
            <Tag className="w-3 h-3" />
            {blog.category}
          </span>
        )}
      </div>

      <h2
        className="text-3xl md:text-5xl font-bold text-white leading-[1.1] mb-4 max-w-3xl"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {blog.title}
      </h2>

      {blog.excerpt && (
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-2xl line-clamp-2">
          {blog.excerpt}
        </p>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-5 text-white/40 text-xs font-medium">
          <span className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            {fmtDate(blog.publishedAt)}
          </span>
          <span className="w-px h-3 bg-white/20" />
          <span className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            {readTime(blog.excerpt)} min read
          </span>
        </div>
        <span className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-[#154895] text-sm font-bold group-hover:bg-[#154895] group-hover:text-white transition-all duration-300 shadow-xl shadow-black/20">
          Read article
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        </span>
      </div>
    </div>
  </motion.div>
);

/* ─── Blog card ──────────────────────────────────────────────────────────── */
const BlogCard = ({ blog, onClick, index }) => (
  <motion.article
    custom={index}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    onClick={onClick}
    className="card-lift bg-white border border-gray-100/80 rounded-2xl overflow-hidden cursor-pointer flex flex-col"
  >
    {/* Image */}
    <div className="relative overflow-hidden bg-gray-50" style={{ height: 220 }}>
      {blog.heroImage ? (
        <img
          src={blog.heroImage}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#154895]/6 to-[#154895]/2">
          <BookOpen className="w-10 h-10 text-[#154895]/20" />
        </div>
      )}
      {blog.category && (
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 text-[#154895] uppercase tracking-wider shadow-sm backdrop-blur-sm">
          <Tag className="w-2.5 h-2.5" />
          {blog.category}
        </span>
      )}
    </div>

    {/* Body */}
    <div className="p-6 flex flex-col flex-1">
      <h3
        className="text-[15px] font-bold text-gray-900 leading-snug mb-2.5 line-clamp-2 group-hover:text-[#154895] transition-colors duration-300"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {blog.title}
      </h3>
      {blog.excerpt && (
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-5">
          {blog.excerpt}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-50/80">
        <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {fmtDate(blog.publishedAt)}
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {readTime(blog.excerpt)} min
          </span>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-bold text-[#154895] opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
          Read <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </motion.article>
);

/* ─── Recent post list row ───────────────────────────────────────────────── */
const RecentRow = ({ blog, index, onClick }) => (
  <motion.div
    custom={index}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    onClick={onClick}
    className="card-lift bg-white border border-gray-100 rounded-2xl p-5 flex gap-5 items-center cursor-pointer"
  >
    {/* Thumb */}
    <div
      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#154895]/10 to-[#154895]/4 flex items-center justify-center"
    >
      {blog.heroImage ? (
        <img src={blog.heroImage} alt={blog.title} className="w-full h-full object-cover" />
      ) : (
        <BookOpen className="w-6 h-6 text-[#154895]/30" />
      )}
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      {blog.category && (
        <span className="text-[10px] font-bold text-[#C5282B] uppercase tracking-wider">
          {blog.category}
        </span>
      )}
      <p
        className="font-bold text-gray-900 text-sm sm:text-base leading-snug mt-0.5 line-clamp-2 hover:text-[#154895] transition-colors"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {blog.title}
      </p>
      <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
        <span>{fmtDate(blog.publishedAt)}</span>
        <span className="w-px h-2.5 bg-gray-200" />
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {readTime(blog.excerpt)} min
        </span>
      </div>
    </div>

    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
  </motion.div>
);

/* ─── Newsletter ─────────────────────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail]   = useState("");
  const [done,  setDone]    = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-[#0d2454] via-[#154895] to-[#1a56b0] rounded-3xl p-10 lg:p-14 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 opacity-[.05]"
        style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      {/* Blobs */}
      <div className="blob1 absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl pointer-events-none" />
      <div className="blob2 absolute -bottom-16 -left-16 w-48 h-48 bg-[#C5282B] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="text-[11px] font-bold text-white/45 uppercase tracking-widest">Stay Updated</span>
          <h2
            className="mt-3 text-3xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Recruitment Insights, Delivered Weekly
          </h2>
          <p className="mt-3 text-white/55 text-sm leading-relaxed">
            Join 5,000+ HR leaders who read our digest every Thursday.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {done ? (
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-4 border border-white/15">
              <span className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300 font-bold text-sm flex-shrink-0">✓</span>
              <p className="text-white text-sm font-semibold">You're subscribed — check your inbox!</p>
            </div>
          ) : (
            <div className="flex gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                onKeyDown={(e) => e.key === "Enter" && email && setDone(true)}
                className="flex-1 bg-white/10 border border-white/18 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/30 outline-none focus:border-white/38 focus:bg-white/14 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => email && setDone(true)}
                className="flex items-center gap-2 px-6 py-4 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-gray-50 transition-colors flex-shrink-0 shadow-lg shadow-black/10"
              >
                <Send className="w-3.5 h-3.5" /> Subscribe
              </motion.button>
            </div>
          )}
          <p className="mt-3 text-white/30 text-xs">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function BlogPage() {
  const navigate = useNavigate();

  const [blogs,          setBlogs]          = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page,           setPage]           = useState(1);
  const [totalPages,     setTotalPages]     = useState(1);
  const [totalCount,     setTotalCount]     = useState(0);
  const [categories,     setCategories]     = useState(["All"]);
  const searchTimeout = useRef();

  /* Fetch */
  const fetchBlogs = async (overrides = {}) => {
    setLoading(true);
    try {
      const params = { page, limit: 9, ...overrides };
      if (search)                params.search   = search;
      if (activeCategory !== "All") params.category = activeCategory;

      const { data } = await axios.get(API, { params });
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
      setTotalCount(data.total ?? data.blogs.length);

      if (!overrides.category && activeCategory === "All") {
        const cats = ["All", ...new Set(data.blogs.map((b) => b.category).filter(Boolean))];
        setCategories(cats);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, [page, activeCategory]);

  useEffect(() => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchBlogs({ page: 1 });
    }, 350);
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  const featured       = blogs[0];
  const rest           = blogs.slice(1);
  const recentPosts    = blogs.slice(0, 4);
  const isDefaultView  = !search && activeCategory === "All" && page === 1;
  const showFeatured   = isDefaultView && !!featured;
  const gridBlogs      = search || activeCategory !== "All" || page > 1 ? blogs : rest;

  return (
    <div className="min-h-screen bg-[#f7f8fc] font-inter">
      <style>{ANIM_CSS}</style>
      <Navbar />

      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] pt-32 sm:pt-40 pb-0 overflow-hidden">
        {/* Blobs */}
        <div className="blob1 absolute -top-40 -left-40 w-[560px] h-[560px] bg-white rounded-full blur-3xl pointer-events-none" />
        <div className="blob2 absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-[#C5282B] rounded-full blur-3xl pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[.04]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        {/* Spinning rings */}
        <div className="ring-cw  absolute top-16 right-20 w-72 h-72 border border-dashed border-white/10 rounded-full pointer-events-none" />
        <div className="ring-ccw absolute bottom-20 left-14 w-44 h-44 border border-dashed border-white/10 rounded-full pointer-events-none" />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-8 text-sm text-white/45 font-medium"
          >
            <a href="/" className="hover:text-white/70 transition-colors">Home</a>
            <ChevronRight size={13} className="text-white/25" />
            <span className="text-white/70">Insights</span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-7"
          >
            <span className="pulse-dot w-2 h-2 rounded-full bg-[#C5282B]" />
            <span className="text-[11px] font-bold text-white/65 uppercase tracking-widest">
              Insights &amp; Resources
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75, ease: EASE }}
            className="shimmer-h font-bold leading-[1.1] tracking-tight mb-5 max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 6vw, 62px)" }}
          >
            Expert Insights on<br />Global Recruitment
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.65 }}
            className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mb-9"
          >
            Industry trends, hiring strategies, and workforce intelligence from
            Qatar's leading manpower consultancy.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-lg mb-9"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/18 rounded-2xl flex items-center px-5 py-1 gap-3 focus-within:border-white/35 focus-within:bg-white/14 transition-all">
              <Search className="w-4 h-4 text-white/35 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="flex-1 outline-none text-sm text-white placeholder:text-white/35 bg-transparent py-3.5"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors flex-shrink-0"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Stats pills */}
          <motion.div
            className="flex flex-wrap gap-2.5 sm:gap-3 pb-14 sm:pb-20"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } } }}
          >
            {[
              { icon: BookOpen,  label: `${totalCount || "—"} Articles` },
              { icon: Tag,       label: `${categories.length - 1 || "—"} Categories` },
              { icon: RefreshCw, label: "Updated Weekly" },
            ].map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={{ hidden: { opacity: 0, scale: 0.8, y: 6 }, visible: { opacity: 1, scale: 1, y: 0 } }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-xs font-semibold text-white/65"
              >
                <Icon size={12} className="text-white/45" />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </Container>

        {/* Wave */}
        <div className="relative" style={{ height: 64, marginBottom: -2 }}>
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M0 64V32C320 0 640 64 960 32C1200 8 1360 52 1440 32V64H0Z" fill="#f7f8fc" />
          </svg>
        </div>
      </section>

      {/* ── 2. STICKY CATEGORY FILTER ─────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm shadow-gray-200/40">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-250 ${
                  activeCategory === cat
                    ? "bg-[#154895] text-white shadow-md shadow-[#154895]/22"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200/80 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ── 3. FEATURED POST ──────────────────────────────────────────── */}
      {showFeatured && !loading && (
        <section className="bg-[#f7f8fc] pt-14 pb-6">
          <Container>
            <SectionHeading tag="Featured" title="Editor's Pick" />
            <div className="mt-10">
              <HeroCard blog={featured} onClick={() => navigate(`/blog/${featured.slug}`)} />
            </div>
          </Container>
        </section>
      )}

      {/* ── 4. ARTICLE GRID ───────────────────────────────────────────── */}
      <section className="bg-[#f7f8fc] pt-10 pb-20">
        <Container>
          {/* Section header */}
          {!loading && gridBlogs.length > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <SectionHeading
                tag={search ? "Results" : activeCategory !== "All" ? activeCategory : "All Articles"}
                title={search ? `Results for "${search}"` : isDefaultView ? "Latest Articles" : activeCategory}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 font-medium shrink-0 mt-auto">
                {gridBlogs.length} article{gridBlogs.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty */}
          {!loading && blogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-36 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#154895]/6 flex items-center justify-center mb-5">
                <BookOpen className="w-9 h-9 text-[#154895]/25" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                No articles found
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mb-6">
                {search
                  ? `No results for "${search}". Try a different search term.`
                  : "Check back soon for new articles."}
              </p>
              {(search || activeCategory !== "All") && (
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="px-6 py-3 bg-[#154895] text-white text-sm font-bold rounded-xl hover:bg-[#0d3270] transition-colors"
                >
                  Clear filters
                </motion.button>
              )}
            </div>
          )}

          {/* Grid */}
          <AnimatePresence mode="wait">
            {!loading && gridBlogs.length > 0 && (
              <motion.div
                key={activeCategory + search + page}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {gridBlogs.map((blog, i) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    index={i}
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 text-sm font-bold rounded-xl transition-all ${
                    p === page
                      ? "bg-[#154895] text-white shadow-md shadow-[#154895]/25"
                      : "text-gray-500 bg-white border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ── 5. NEWSLETTER ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <Container>
          <Newsletter />
        </Container>
      </section>

      {/* ── 6. TRENDING TOPICS ────────────────────────────────────────── */}
      <section className="bg-[#f7f8fc] py-20">
        <Container>
          <SectionHeading tag="Quick Reads" title="Trending Topics" />
          <div className="mt-10 flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {TRENDING_TOPICS.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.name}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group bg-white border border-gray-100 rounded-2xl px-6 py-5 flex flex-col gap-1.5 min-w-[172px] cursor-pointer hover:border-[#154895]/25 hover:bg-[#154895]/3 flex-shrink-0 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-[#154895] transition-colors duration-300 mb-0.5" />
                  <p className="font-bold text-gray-800 text-sm group-hover:text-[#154895] transition-colors duration-300">
                    {topic.name}
                  </p>
                  <p className="text-[11px] text-gray-400">{topic.count}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 7. RECENT POSTS LIST ──────────────────────────────────────── */}
      {!loading && recentPosts.length > 0 && isDefaultView && (
        <section className="bg-white py-20">
          <Container>
            <SectionHeading tag="Recent" title="Latest From the Blog" />
            <div className="mt-10 max-w-4xl mx-auto space-y-3">
              {recentPosts.map((blog, i) => (
                <RecentRow
                  key={blog._id}
                  blog={blog}
                  index={i}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── 8. CTA BANNER ─────────────────────────────────────────────── */}
      {!loading && blogs.length > 0 && (
        <section className="bg-[#f7f8fc] py-20">
          <Container>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#0d2454] via-[#154895] to-[#1a56b0] rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
            >
              {/* Texture */}
              <div className="absolute inset-0 opacity-[.05]"
                style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C5282B] to-transparent" />
              {/* Blobs */}
              <div className="blob1 absolute -top-16 -right-16 w-56 h-56 bg-white rounded-full blur-3xl pointer-events-none" />
              <div className="blob2 absolute -bottom-12 -left-12 w-44 h-44 bg-[#C5282B] rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                  Partner With Us
                </span>
                <h2
                  className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Ready to Build Your Team in Qatar?
                </h2>
                <p className="mt-4 text-base text-white/55 max-w-lg mx-auto leading-relaxed">
                  Talk to our specialists and design the right hiring strategy for your business.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/get-free-quote")}
                    className="bg-white text-[#154895] font-bold rounded-2xl px-8 py-4 hover:bg-gray-50 transition-colors duration-300 shadow-xl shadow-black/10"
                  >
                    Get Free Quote
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/request-manpower")}
                    className="bg-[#C5282B] text-white font-bold rounded-2xl px-8 py-4 hover:bg-[#a82226] inline-flex items-center gap-2 transition-colors duration-300"
                  >
                    Request Manpower <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      <Footer />
    </div>
  );
}
