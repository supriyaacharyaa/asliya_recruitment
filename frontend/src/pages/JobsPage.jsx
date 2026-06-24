import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "../Axios/Axios";
import {
  Search, ArrowRight, Briefcase, MapPin, Tag, ChevronRight,
  ChevronLeft, Building2, Banknote, Filter, X, Clock,
  Building, HardHat, UtensilsCrossed, Stethoscope, Wrench,
  LineChart, Cpu, GraduationCap, Mail, Check,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";

const API   = "/jobs";
const EASE  = [0.22, 1, 0.36, 1];
const APPLY_EMAIL = "info@asliyarecruitment.com";

const INDUSTRIES = [
  { icon: HardHat,           name: "Construction" },
  { icon: Building,          name: "Oil & Gas" },
  { icon: UtensilsCrossed,   name: "Hospitality" },
  { icon: Stethoscope,       name: "Healthcare" },
  { icon: Wrench,            name: "Engineering" },
  { icon: LineChart,         name: "Finance" },
  { icon: Cpu,               name: "IT & Technology" },
  { icon: GraduationCap,     name: "Education" },
];

const EMPLOYMENT_TYPES = ["All", "full-time", "part-time", "contract", "internship", "temporary"];

const formatType = (t) =>
  t === "All" ? "All" : t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const fmtSalary = (job) => {
  if (!job.salaryMin && !job.salaryMax) return null;
  const cur = job.salaryCurrency || "QAR";
  const per = job.salaryPeriod ? `/${job.salaryPeriod}` : "";
  const min = job.salaryMin ? `${cur} ${Number(job.salaryMin).toLocaleString()}` : "";
  const max = job.salaryMax ? `${Number(job.salaryMax).toLocaleString()}` : "";
  if (min && max) return `${min} – ${max}${per}`;
  return `${min || max}${per}`;
};

const daysUntil = (d) => {
  if (!d) return null;
  const diff = Math.ceil((new Date(d) - Date.now()) / 86400000);
  if (diff < 0)   return { text: "Closed",        color: "red" };
  if (diff === 0) return { text: "Closes today",  color: "orange" };
  if (diff === 1) return { text: "1 day left",    color: "orange" };
  if (diff <= 7)  return { text: `${diff} days left`, color: "yellow" };
  return { text: `${diff} days left`, color: "green" };
};

const mailtoFor = (job) =>
  `mailto:${job.applicationEmail || APPLY_EMAIL}?subject=${encodeURIComponent(
    `Application: ${job.title}`
  )}&body=${encodeURIComponent(
    `Hello,\n\nI would like to apply for the position of ${job.title}${job.company ? ` at ${job.company}` : ""}.\n\nPlease find my CV attached.\n\nThank you.`
  )}`;

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const ANIM_CSS = `
  @keyframes blob1 {
    0%,100% { transform:scale(1)    translate(0,0);        opacity:.08; }
    33%      { transform:scale(1.15) translate(20px,-16px); opacity:.13; }
    66%      { transform:scale(.9)   translate(-14px,10px); opacity:.06; }
  }
  @keyframes blob2 {
    0%,100% { transform:scale(1.1)  translate(0,0);        opacity:.06; }
    33%      { transform:scale(.88)  translate(-18px,14px); opacity:.11; }
    66%      { transform:scale(1.18) translate(12px,-8px);  opacity:.05; }
  }
  @keyframes shimmer-text {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulse-dot {
    0%,100% { opacity:.7; transform:scale(1); }
    50%     { opacity:1;  transform:scale(1.3); }
  }
  @keyframes fadeSlideIn {
    from { opacity:0; transform:translateY(-6px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .blob1 { animation: blob1 10s ease-in-out infinite; }
  .blob2 { animation: blob2 13s ease-in-out infinite; }
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
    transition: transform .3s cubic-bezier(.22,1,.36,1),
                box-shadow .3s cubic-bezier(.22,1,.36,1),
                border-color .3s;
  }
  .card-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(21,72,149,.10);
    border-color: rgba(21,72,149,.2) !important;
  }
  .industry-tile {
    position: relative;
    overflow: hidden;
    transition: transform .3s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .3s;
  }
  .industry-tile::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 20%, rgba(21,72,149,.10), transparent 65%);
    opacity: 0;
    transition: opacity .35s ease;
  }
  .industry-tile:hover {
    transform: translateY(-3px);
    border-color: rgba(21,72,149,.28);
    box-shadow: 0 14px 32px rgba(21,72,149,.10);
  }
  .industry-tile:hover::before { opacity: 1; }
  .industry-tile:active { transform: translateY(-1px) scale(.99); }
  .scrollbar-hide::-webkit-scrollbar { display:none; }
  .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
  .filter-pop { animation: fadeSlideIn .22s ease both; }
  .type-chip {
    position: relative;
    transition: background-color .2s, color .2s, border-color .2s, transform .15s;
  }
  .type-chip:active { transform: scale(.96); }
  .filter-trigger { transition: background-color .2s, color .2s, border-color .2s, box-shadow .2s; }
`;

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.06 },
  }),
};

/* ─── Skeleton ───────────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse p-6">
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-gray-100 shrink-0" />
      <div className="flex-1 space-y-2.5">
        <div className="h-4 w-3/4 bg-gray-100 rounded-lg" />
        <div className="h-3 w-1/2 bg-gray-100 rounded-lg" />
      </div>
    </div>
    <div className="mt-5 space-y-2">
      <div className="h-3 bg-gray-100 rounded-lg" />
      <div className="h-3 w-5/6 bg-gray-100 rounded-lg" />
    </div>
    <div className="mt-5 flex gap-2">
      <div className="h-6 w-20 bg-gray-100 rounded-full" />
      <div className="h-6 w-24 bg-gray-100 rounded-full" />
    </div>
  </div>
);

/* ─── Job Card ───────────────────────────────────────────────────────────── */
const JobCard = ({ job, index, onView }) => {
  const salary   = fmtSalary(job);
  const deadline = daysUntil(job.applicationDeadline);
  const closed   = deadline?.color === "red";

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="card-lift bg-white border border-gray-100/80 rounded-2xl overflow-hidden flex flex-col group"
    >
      <button onClick={onView} className="text-left p-6 flex flex-col flex-1 cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#154895]/10 to-[#154895]/5 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-[#154895]/40" />
            </div>
            <div className="min-w-0">
              <h3
                className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#154895] transition-colors duration-300 mb-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {job.title}
              </h3>
              {job.company && <p className="text-xs text-gray-500 font-medium">{job.company}</p>}
            </div>
          </div>
          {job.featured && (
            <span className="shrink-0 px-2 py-1 rounded-lg bg-[#C5282B]/8 text-[#C5282B] text-[10px] font-bold uppercase tracking-wider border border-[#C5282B]/15">
              Hot
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-[11px] font-medium">
              <MapPin className="w-3 h-3" /> {job.location}
            </span>
          )}
          {job.employmentType && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#154895] text-[11px] font-semibold">
              <Briefcase className="w-3 h-3" /> {formatType(job.employmentType)}
            </span>
          )}
          {job.experienceLevel && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-[11px] font-medium">
              {job.experienceLevel}
            </span>
          )}
        </div>

        {/* Excerpt */}
        {job.excerpt && (
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-4">
            {job.excerpt}
          </p>
        )}

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.skills.slice(0, 3).map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-md bg-gray-50 text-gray-400 text-[10px] font-semibold border border-gray-100">
                {s}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-gray-50 text-gray-400 text-[10px] font-semibold border border-gray-100">
                +{job.skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50/80 gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            {salary && (
              <span className="text-[12px] font-bold text-[#154895] flex items-center gap-1 truncate">
                <Banknote className="w-3 h-3 shrink-0" /> {salary}
              </span>
            )}
            {deadline && (
              <span className={`text-[10px] font-semibold ${
                deadline.color === "red"    ? "text-red-500" :
                deadline.color === "orange" ? "text-orange-500" :
                deadline.color === "yellow" ? "text-yellow-600" : "text-emerald-600"
              }`}>
                {deadline.text}
              </span>
            )}
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 text-[#154895] text-xs font-bold group-hover:bg-[#154895] group-hover:text-white transition-colors duration-300">
            Details <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </button>

      {/* Quick apply */}
      {!closed && (
        <a
          href={mailtoFor(job)}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50/80 text-gray-500 text-xs font-bold border-t border-gray-50 hover:bg-[#154895] hover:text-white transition-colors duration-300"
        >
          <Mail className="w-3.5 h-3.5" /> Apply by Email
        </a>
      )}
    </motion.article>
  );
};

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function JobsPage() {
  const navigate = useNavigate();

  const [jobs,           setJobs]           = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType,     setActiveType]     = useState("All");
  const [page,           setPage]           = useState(1);
  const [totalPages,     setTotalPages]     = useState(1);
  const [totalCount,     setTotalCount]     = useState(0);
  const [categories,     setCategories]     = useState(["All"]);
  const [showFilters,    setShowFilters]    = useState(false);

  const searchTimeout  = useRef();
  const filterPanelRef = useRef(null);

  // ── Core fetch: always receives explicit values, never reads stale state ──
  const fetchJobs = useCallback(async (pg, cat, type, q) => {
    setLoading(true);
    try {
      const params = { page: pg, limit: 9 };
      if (q)            params.search         = q;
      if (cat !== "All") params.category       = cat;
      if (type !== "All") params.employmentType = type;

      const { data } = await axios.get(API, { params });
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setTotalCount(data.total ?? data.jobs.length);

      if (cat === "All") {
        const cats = ["All", ...new Set(data.jobs.map((j) => j.category).filter(Boolean))];
        setCategories(cats);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []); // no deps — all values are passed explicitly as arguments

  // ── Effect: page / category / type changes ────────────────────────────────
  useEffect(() => {
    fetchJobs(page, activeCategory, activeType, search);
  }, [page, activeCategory, activeType]); // intentionally excludes search — search has its own effect

  // ── Effect: search with debounce ──────────────────────────────────────────
  useEffect(() => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchJobs(1, activeCategory, activeType, search); // passes current search directly
    }, 350);
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  // ── Close filter popover on outside click ─────────────────────────────────
  useEffect(() => {
    if (!showFilters) return;
    const handleClick = (e) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilters]);

  const hasFilters = search || activeCategory !== "All" || activeType !== "All";
  const activeFilterCount =
    (activeCategory !== "All" ? 1 : 0) + (activeType !== "All" ? 1 : 0);

  const clearAllFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setActiveType("All");
    setPage(1);
  };

  // When category or type chips are clicked, also pass current search so results stay filtered
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setPage(1);
    fetchJobs(1, cat, activeType, search);
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setPage(1);
    fetchJobs(1, activeCategory, type, search);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] font-inter">
      <style>{ANIM_CSS}</style>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] pt-16 pb-0 overflow-hidden">
        <div className="blob1 absolute -top-40 -left-40 w-[480px] h-[480px] bg-white rounded-full blur-3xl pointer-events-none" />
        <div className="blob2 absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-[#C5282B] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[.04]"
          style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "30px 30px" }} />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-8 text-sm text-white/45 font-medium"
          >
            <a href="/" className="hover:text-white/70 transition-colors">Home</a>
            <ChevronRight size={13} className="text-white/25" />
            <span className="text-white/70">Job Openings</span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-7"
          >
            <span className="pulse-dot w-2 h-2 rounded-full bg-[#C5282B]" />
            <span className="text-[11px] font-bold text-white/65 uppercase tracking-widest">
              Now Hiring · Qatar &amp; Gulf Region
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
            className="shimmer-h font-bold leading-[1.1] tracking-tight mb-5 max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5.5vw, 56px)" }}
          >
            Find Your Next<br />Career in the Gulf
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
            className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mb-9"
          >
            Browse open roles across Qatar and the GCC, posted directly by employers we work with.
          </motion.p>

          {/* Search & Filter row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.55 }}
            className="relative flex gap-3 flex-wrap mb-3 max-w-2xl"
            ref={filterPanelRef}
          >
            <div className="flex-1 min-w-[200px] bg-white/10 backdrop-blur-sm border border-white/18 rounded-2xl flex items-center px-5 py-1 gap-3 focus-within:border-white/35 focus-within:bg-white/14 transition-all">
              <Search className="w-4 h-4 text-white/35 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, skill, or keyword…"
                className="flex-1 outline-none text-sm text-white placeholder:text-white/35 bg-transparent py-3.5"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors flex-shrink-0">
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters((p) => !p)}
              className={`filter-trigger shrink-0 flex items-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-semibold ${
                showFilters
                  ? "bg-white text-[#154895] border-white shadow-lg shadow-black/10"
                  : activeFilterCount > 0
                    ? "bg-white/16 text-white border-white/30"
                    : "bg-white/10 text-white/80 border-white/18 hover:bg-white/15"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                  showFilters ? "bg-[#154895] text-white" : "bg-[#C5282B] text-white"
                }`}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filters popover */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="absolute top-full left-0 right-0 sm:right-auto sm:w-[420px] mt-3 z-30
                             bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Refine results
                    </p>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={() => { handleCategoryChange("All"); handleTypeChange("All"); }}
                        className="text-xs font-semibold text-[#C5282B] hover:text-[#a82226] transition-colors"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                      Employment Type
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {EMPLOYMENT_TYPES.map((t) => {
                        const isActive = activeType === t;
                        return (
                          <button
                            key={t}
                            onClick={() => handleTypeChange(t)}
                            className={`type-chip inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border ${
                              isActive
                                ? "bg-[#154895] text-white border-[#154895]"
                                : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                          >
                            {isActive && <Check className="w-3 h-3" />}
                            {formatType(t)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((c) => {
                        const isActive = activeCategory === c;
                        return (
                          <button
                            key={c}
                            onClick={() => handleCategoryChange(c)}
                            className={`type-chip inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border ${
                              isActive
                                ? "bg-[#0d3270] text-white border-[#0d3270]"
                                : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                          >
                            {isActive && <Check className="w-3 h-3" />}
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="mt-5 w-full py-3 rounded-xl bg-[#154895] text-white text-sm font-bold hover:bg-[#0d3270] transition-colors"
                  >
                    Show {totalCount} role{totalCount !== 1 ? "s" : ""}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Active filter pills */}
          {hasFilters && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="filter-pop flex items-center gap-2 flex-wrap mb-6 max-w-2xl"
            >
              {activeType !== "All" && (
                <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-white/12 border border-white/20 text-white/80 text-xs font-semibold">
                  {formatType(activeType)}
                  <button onClick={() => handleTypeChange("All")} className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
              {activeCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-white/12 border border-white/20 text-white/80 text-xs font-semibold">
                  {activeCategory}
                  <button onClick={() => handleCategoryChange("All")} className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/30">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
              <button onClick={clearAllFilters} className="text-xs font-semibold text-white/45 hover:text-white/70 transition-colors underline underline-offset-2">
                Clear all
              </button>
            </motion.div>
          )}

          <div className="pb-12 sm:pb-16 text-white/45 text-sm font-medium">
            {totalCount || 0} open role{totalCount !== 1 ? "s" : ""} right now
          </div>
        </Container>

        {/* Wave */}
        <div className="relative" style={{ height: 56, marginBottom: -2 }}>
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M0 56V28C320 0 640 56 960 28C1200 8 1360 46 1440 28V56H0Z" fill="#f7f8fc" />
          </svg>
        </div>
      </section>

      {/* ── STICKY FILTER BAR ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm shadow-gray-200/40">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-hide">
            <span className="shrink-0 hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest pr-1">
              <Tag className="w-3 h-3" /> Category
            </span>
            {categories.map((cat) => (
              <button key={cat} onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#154895] text-white shadow-md shadow-[#154895]/22"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200/80 hover:text-gray-700"
                }`}>
                {cat}
              </button>
            ))}
            <div className="w-px h-5 bg-gray-200 shrink-0 mx-1" />
            <span className="shrink-0 hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest pr-1">
              <Clock className="w-3 h-3" /> Type
            </span>
            {EMPLOYMENT_TYPES.map((t) => (
              <button key={t} onClick={() => handleTypeChange(t)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeType === t ? "bg-[#0d3270] text-white" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}>
                {formatType(t)}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ── JOB GRID ──────────────────────────────────────────────────── */}
      <section className="bg-[#f7f8fc] pt-12 pb-20">
        <Container>
          {!loading && jobs.length > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <SectionHeading
                tag={search ? "Results" : activeCategory !== "All" ? activeCategory : "Open Roles"}
                title={search ? `Results for "${search}"` : "Job Openings"}
                className="flex-1"
              />
              <span className="text-xs text-gray-400 font-medium shrink-0 mt-auto">
                {jobs.length} role{jobs.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && jobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#154895]/6 flex items-center justify-center mb-5">
                <Briefcase className="w-9 h-9 text-[#154895]/25" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                No openings found
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mb-6">
                {search ? `No results for "${search}". Try a different keyword.` : "Check back soon for new opportunities."}
              </p>
              {hasFilters && (
                <button onClick={clearAllFilters}
                  className="px-6 py-3 bg-[#154895] text-white text-sm font-bold rounded-xl hover:bg-[#0d3270] transition-colors">
                  Clear filters
                </button>
              )}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!loading && jobs.length > 0 && (
              <motion.div
                key={activeCategory + activeType + search + page}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {jobs.map((job, i) => (
                  <JobCard key={job._id} job={job} index={i}
                    onView={() => navigate(`/jobs/${job.slug || job._id}`)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-35 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-10 h-10 text-sm font-bold rounded-xl transition-all ${
                    p === page ? "bg-[#154895] text-white shadow-md shadow-[#154895]/25" : "text-gray-500 bg-white border border-gray-200 hover:bg-gray-50"
                  }`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-35 disabled:cursor-not-allowed transition-colors">
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading tag="Browse" title="Hiring Across Every Industry" />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {INDUSTRIES.map(({ icon: Icon, name }, i) => (
              <motion.button
                key={name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => { setActiveCategory("All"); setSearch(name); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="industry-tile bg-[#f7f8fc] border border-gray-100 rounded-2xl px-5 py-6 flex flex-col items-start gap-3 text-left"
              >
                <span className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#154895]" />
                </span>
                <p className="font-bold text-gray-800 text-sm leading-snug">{name}</p>
              </motion.button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="bg-[#f7f8fc] py-16 sm:py-20">
        <Container>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#0d2454] via-[#154895] to-[#1a56b0] rounded-3xl p-10 sm:p-14 lg:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[.05]"
              style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C5282B] to-transparent" />
            <div className="blob1 absolute -top-16 -right-16 w-56 h-56 bg-white rounded-full blur-3xl pointer-events-none" />
            <div className="blob2 absolute -bottom-12 -left-12 w-44 h-44 bg-[#C5282B] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Employers</span>
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Hire Top Talent Across the GCC
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/55 max-w-lg mx-auto leading-relaxed">
                Access our pre-vetted workforce from 28+ countries. Speak to our recruitment specialists today.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button onClick={() => navigate("/quote")}
                  className="bg-white text-[#154895] font-bold rounded-2xl px-8 py-4 hover:bg-gray-50 transition-colors duration-300 shadow-xl shadow-black/10">
                  Get Free Quote
                </button>
                <button onClick={() => navigate("/contact")}
                  className="bg-[#C5282B] text-white font-bold rounded-2xl px-8 py-4 hover:bg-[#a82226] inline-flex items-center gap-2 transition-colors duration-300">
                  Request Manpower <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}