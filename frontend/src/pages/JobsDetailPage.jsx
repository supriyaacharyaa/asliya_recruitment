import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../Axios/Axios";
import {
  ArrowLeft, Calendar, Clock, Tag, MapPin, Briefcase,
  Building2, Banknote, Star, ChevronRight, ArrowRight,
  Send, Check, X, Loader2, BookOpen, Users, Globe,
  Award, CheckCircle2, Target, Gift, Zap, Hash,
  Mail, Phone, User, FileText, AlertCircle, ExternalLink,
  Share2, Copy, BookmarkPlus, LayoutList,
} from "lucide-react";

const API  = "/jobs";
const EASE = [0.22, 1, 0.36, 1];
const APPLY_EMAIL = "info@asliyarecruitment.com";

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

const fmtSalary = (job) => {
  if (!job?.salaryMin && !job?.salaryMax) return null;
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
  if (diff < 0)   return { text: "Expired",      color: "red" };
  if (diff === 0) return { text: "Closes today",  color: "orange" };
  if (diff === 1) return { text: "1 day left",    color: "orange" };
  if (diff <= 7)  return { text: `${diff} days left`, color: "yellow" };
  return { text: `${diff} days left`, color: "green" };
};

/* ─── CSS ────────────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes blob1 {
    0%,100% { transform:scale(1) translate(0,0); opacity:.08; }
    33% { transform:scale(1.15) translate(20px,-16px); opacity:.13; }
    66% { transform:scale(.9) translate(-14px,10px); opacity:.06; }
  }
  @keyframes blob2 {
    0%,100% { transform:scale(1.1) translate(0,0); opacity:.06; }
    33% { transform:scale(.88) translate(-18px,14px); opacity:.11; }
    66% { transform:scale(1.18) translate(12px,-8px); opacity:.05; }
  }
  @keyframes pulse-dot {
    0%,100% { opacity:.7; transform:scale(1); }
    50% { opacity:1; transform:scale(1.3); }
  }
  @keyframes fadeSlideUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes shimmerBar {
    0%   { background-position:-200% center; }
    100% { background-position:200% center; }
  }
  .blob1 { animation: blob1 10s ease-in-out infinite; }
  .blob2 { animation: blob2 13s ease-in-out infinite; }
  .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
  .fade-up { animation: fadeSlideUp .6s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-d1 { animation-delay:.08s; }
  .fade-up-d2 { animation-delay:.16s; }
  .fade-up-d3 { animation-delay:.24s; }
  .fade-up-d4 { animation-delay:.32s; }
  .section-block { border-left: 3px solid #154895; padding-left: 1.25rem; margin-bottom: 2rem; }
  .chip { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:10px; font-size:12px; font-weight:600; }
  .scrollbar-hide::-webkit-scrollbar { display:none; }
  .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
  @media (max-width:640px) {
    .hero-title { font-size: clamp(22px, 6vw, 36px) !important; }
  }
`;

/* ─── Copy Link Button ───────────────────────────────────────────────────── */
const CopyLinkButton = ({ small }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className={`inline-flex items-center gap-1.5 rounded-xl font-semibold transition-colors ${
        small
          ? "px-3 py-1.5 text-xs bg-slate-100 text-slate-600 hover:bg-slate-200"
          : "px-4 py-2 text-sm bg-white/10 text-white/80 border border-white/15 hover:bg-white/20"
      }`}
    >
      {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy link</>}
    </button>
  );
};

/* ─── Related Job Card ───────────────────────────────────────────────────── */
const RelatedJobCard = ({ job, onClick }) => (
  <article
    onClick={onClick}
    className="group flex gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
    role="button" tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
  >
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#154895]/10 to-[#154895]/5 flex items-center justify-center shrink-0">
      <Briefcase className="w-4 h-4 text-[#154895]/40" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] text-[#154895] font-bold uppercase tracking-wider mb-0.5">{job.department || job.category}</p>
      <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#154895] transition-colors"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {job.title}
      </h4>
      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
        {job.location && <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{job.location}</span>}
        {job.employmentType && <><span>·</span><span>{job.employmentType}</span></>}
      </div>
    </div>
    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0 self-center" />
  </article>
);

/* ─── Apply Modal ────────────────────────────────────────────────────────── */
const ApplyModal = ({ job, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "" });
  const [file,    setFile]    = useState(null);
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");
  const fileRef = useRef();

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSending(true);

    try {
      /* Build multipart form data so the CV file can be attached server-side */
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("coverLetter", form.coverLetter);
      if (file) formData.append("cv", file);

      const jobIdOrSlug = job.slug || job._id;

      await axios.post(`${API}/${jobIdOrSlug}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSending(false);
      setSent(true);
    } catch (err) {
      setSending(false);
      setError(
        err?.response?.data?.message ||
        "Something went wrong submitting your application. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#154895] to-[#0d3270] px-6 pt-6 pb-5 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Apply for</span>
              <h3 className="text-lg font-bold text-white mt-1 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {job.title}
              </h3>
              {job.company && <p className="text-white/60 text-xs mt-0.5">{job.company}</p>}
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0 mt-0.5">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-white/60 text-xs">
            <Mail className="w-3.5 h-3.5" />
            Your application will be sent directly to our hiring team
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {sent ? (
            <div className="py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Application Submitted!</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                Thanks for applying — our team has received your application and will be in touch soon.
              </p>
              <button onClick={onClose}
                className="mt-6 px-6 py-3 bg-[#154895] text-white text-sm font-bold rounded-xl hover:bg-[#0d3270] transition-colors">
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Full Name <span className="text-[#C5282B]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="text" value={form.name} onChange={set("name")} placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Email Address <span className="text-[#C5282B]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+974 XXXX XXXX"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all" />
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Upload CV / Resume</label>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={() => fileRef.current?.click()}
                  className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border-2 border-dashed text-sm font-semibold transition-all ${
                    file
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 text-slate-400 hover:border-[#154895]/40 hover:text-[#154895] hover:bg-blue-50/50"
                  }`}>
                  {file ? (
                    <><CheckCircle2 className="w-4 h-4" /> {file.name}</>
                  ) : (
                    <><FileText className="w-4 h-4" /> Choose PDF, DOC, or DOCX</>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 mt-1.5 pl-1">
                  Max file size 5MB. Your CV will be attached to the application email.
                </p>
              </div>

              {/* Cover letter */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Cover Letter / Message</label>
                <textarea value={form.coverLetter} onChange={set("coverLetter")} rows={4}
                  placeholder="Tell us why you're a great fit for this role…"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all resize-none" />
              </div>

              {error && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-xs text-red-600 font-medium">{error}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!sent && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 shrink-0">
            <button onClick={handleSubmit} disabled={sending}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#154895] text-white text-sm font-bold hover:bg-[#0d3270] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-[#154895]/20">
              {sending
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                : <><Send className="w-4 h-4" /> Submit Application</>}
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              By applying you agree to our privacy policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Section Block ──────────────────────────────────────────────────────── */
const SectionItem = ({ icon: Icon, title, items, color = "blue" }) => {
  if (!items?.length) return null;
  const colors = {
    blue:   { bg: "bg-blue-50",    text: "text-[#154895]",  dot: "bg-[#154895]",  border: "border-blue-100" },
    red:    { bg: "bg-red-50",     text: "text-[#C5282B]",  dot: "bg-[#C5282B]",  border: "border-red-100"  },
    green:  { bg: "bg-emerald-50", text: "text-emerald-700",dot: "bg-emerald-500",border: "border-emerald-100" },
    purple: { bg: "bg-purple-50",  text: "text-purple-700", dot: "bg-purple-500", border: "border-purple-100" },
  };
  const c = colors[color];
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-6`}>
      <h3 className={`text-sm font-bold ${c.text} uppercase tracking-widest mb-4 flex items-center gap-2`}>
        <Icon className="w-4 h-4" /> {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-2 shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ─── Main Detail Page ───────────────────────────────────────────────────── */
export default function JobDetailPage() {
  const { slugOrId } = useParams();
  const navigate     = useNavigate();

  const [job,     setJob]     = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [saved,     setSaved]     = useState(false);

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const load = async () => {
      setLoading(true); setError(false); setJob(null); setRelated([]);
      try {
        /* Try slug first, fallback to ID */
        const { data } = await axios.get(`${API}/slug/${slugOrId}`).catch(() => axios.get(`${API}/${slugOrId}`));
        const jobData = data.job || data;
        const rel = await axios.get(API, { params: { category: jobData.category, limit: 5 } });
        if (!isMounted.current) return;
        setJob(jobData);
        setRelated((rel.data.jobs || []).filter((j) => (j.slug || j._id) !== slugOrId).slice(0, 4));
      } catch {
        if (isMounted.current) setError(true);
      }
      if (isMounted.current) setLoading(false);
    };
    load();
  }, [slugOrId]);

  // ── View tracking ──────────────────────────────────────────────────────
  // Fires once the job has actually loaded, using its real _id (JobView.jobId
  // is an ObjectId ref, so the slug won't work here even if that's what's
  // in the URL). Failures are swallowed so a tracking hiccup never affects
  // the page itself.
  useEffect(() => {
    if (!job?._id) return;
    axios.post("/job-views", { jobId: job._id }).catch(() => {});
  }, [job?._id]);

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#154895] animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Loading job details…</p>
      </div>
    </div>
  );

  /* ── Error ── */
  if (error || !job) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
          <Briefcase className="w-9 h-9 text-slate-300" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Job not found</h2>
        <p className="text-slate-400 text-sm mb-6">This listing may have been removed or the link is incorrect.</p>
        <button onClick={() => navigate("/jobs")}
          className="px-6 py-3 bg-[#154895] text-white text-sm font-bold rounded-xl hover:bg-[#0d3270] transition-colors">
          Browse All Jobs
        </button>
      </div>
    </div>
  );

  const salary   = fmtSalary(job);
  const deadline = daysUntil(job.applicationDeadline);
  const isExpired = deadline?.color === "red";

  return (
    <>
      <style>{STYLES}</style>

      {showApply && <ApplyModal job={job} onClose={() => setShowApply(false)} />}

      <div className="min-h-screen bg-slate-50">

        {/* ── HERO BANNER ──────────────────────────────────────────────── */}
        <div className="relative bg-gradient-to-br from-[#071a3a] via-[#0d2454] to-[#154895] overflow-hidden">
          {/* Decorative */}
          <div className="blob1 absolute -top-32 -left-32 w-96 h-96 bg-white rounded-full blur-3xl pointer-events-none" />
          <div className="blob2 absolute -bottom-24 -right-24 w-72 h-72 bg-[#C5282B] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-[.04]"
            style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154895] via-[#C5282B] to-[#154895]" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-10 sm:pb-14">
            {/* Back button */}
            <button onClick={() => navigate("/jobs")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/20 transition-colors mb-8 fade-up">
              <ArrowLeft className="w-4 h-4" /> All Jobs
            </button>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-5 fade-up fade-up-d1">
              {job.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#C5282B] text-white uppercase tracking-wider">
                  <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-white/80" />
                  Featured
                </span>
              )}
              {job.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/10 text-white/70 border border-white/15">
                  <Tag className="w-3 h-3" /> {job.category}
                </span>
              )}
              {job.department && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white/10 text-white/70 border border-white/15">
                  <LayoutList className="w-3 h-3" /> {job.department}
                </span>
              )}
              {deadline && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                  deadline.color === "red"    ? "bg-red-500/20 text-red-300 border-red-400/20" :
                  deadline.color === "orange" ? "bg-orange-500/20 text-orange-300 border-orange-400/20" :
                  deadline.color === "yellow" ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/20" :
                                               "bg-emerald-500/20 text-emerald-300 border-emerald-400/20"
                }`}>
                  <Clock className="w-3 h-3" /> {deadline.text}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="hero-title font-bold text-white leading-tight mb-5 max-w-3xl fade-up fade-up-d2"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4.5vw, 48px)" }}
            >
              {job.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-white/55 text-sm mb-8 fade-up fade-up-d3">
              {job.company && (
                <span className="flex items-center gap-1.5 font-semibold text-white/80">
                  <Building2 className="w-4 h-4" /> {job.company}
                </span>
              )}
              {job.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {job.location}
                </span>
              )}
              {job.employmentType && (
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" /> {job.employmentType}
                </span>
              )}
              {job.experienceLevel && (
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> {job.experienceLevel} Level
                </span>
              )}
              {salary && (
                <span className="flex items-center gap-1.5 font-semibold text-white/80">
                  <Banknote className="w-4 h-4" /> {salary}
                </span>
              )}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3 fade-up fade-up-d4">
              {!isExpired && (
                <button
                  onClick={() => setShowApply(true)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-[#154895] hover:text-white transition-all duration-300 shadow-xl shadow-black/20"
                >
                  <Send className="w-4 h-4" /> Apply Now
                </button>
              )}
              {isExpired && (
                <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-500/20 text-red-300 text-sm font-bold border border-red-400/20">
                  <X className="w-4 h-4" /> Applications Closed
                </span>
              )}
              <button
                onClick={() => setSaved((p) => !p)}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                  saved
                    ? "bg-[#C5282B] text-white border-[#C5282B]"
                    : "bg-white/10 text-white/70 border-white/15 hover:bg-white/20"
                }`}
              >
                <BookmarkPlus className="w-4 h-4" />
                {saved ? "Saved" : "Save Job"}
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-white/70 text-sm font-semibold border border-white/15 hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <CopyLinkButton />
              </div>
            </div>
          </div>

          {/* Wave bottom */}
          <div className="relative" style={{ height: 56, marginBottom: -2 }}>
            <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path d="M0 56V28C320 0 640 56 960 28C1200 8 1360 46 1440 28V56H0Z" fill="#f8fafc" />
            </svg>
          </div>
        </div>

        {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">

            {/* ── LEFT: Main Content ──────────────────────────────────── */}
            <div className="min-w-0">

              {/* Excerpt / Intro */}
              {job.excerpt && (
                <div className="mb-8 p-5 sm:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed border-l-4 border-[#154895] pl-5 italic">
                    {job.excerpt}
                  </p>
                </div>
              )}

              {/* Description */}
              {job.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    <span className="w-1 h-6 rounded-full bg-[#154895] inline-block shrink-0" />
                    About This Role
                  </h2>
                  <div className="prose-custom bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                    <p className="text-slate-600 text-[15px] leading-[1.85] whitespace-pre-line">{job.description}</p>
                  </div>
                </div>
              )}

              {/* Requirements, Responsibilities, Benefits */}
              <div className="space-y-5 mb-8">
                <SectionItem
                  icon={CheckCircle2}
                  title="Requirements"
                  items={job.requirements}
                  color="blue"
                />
                <SectionItem
                  icon={Target}
                  title="Responsibilities"
                  items={job.responsibilities}
                  color="purple"
                />
                <SectionItem
                  icon={Gift}
                  title="Benefits & Perks"
                  items={job.benefits}
                  color="green"
                />
              </div>

              {/* Skills */}
              {job.skills?.length > 0 && (
                <div className="mb-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#154895]" /> Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span key={skill}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#154895] text-sm font-semibold border border-blue-100 hover:bg-blue-100 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              {job.stats && Object.keys(job.stats).length > 0 && (
                <div className="mb-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#154895]" /> Hiring Stats
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(job.stats).map(([key, val]) => (
                      <div key={key} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                        <p className="text-xl font-bold text-[#154895]">{val}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Share & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
                <button onClick={() => navigate("/jobs")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#154895] transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to all jobs
                </button>
                <div className="flex items-center gap-2">
                  <CopyLinkButton small />
                  {!isExpired && (
                    <button onClick={() => setShowApply(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#154895] text-white text-sm font-bold hover:bg-[#0d3270] transition-colors shadow-md shadow-[#154895]/20">
                      <Send className="w-3.5 h-3.5" /> Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Sidebar ───────────────────────────────────────── */}
            <aside className="space-y-6 lg:sticky lg:top-20">

              {/* Apply CTA card */}
              <div className="bg-gradient-to-br from-[#154895] to-[#0d2454] rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#C5282B]/25" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/70 uppercase tracking-wider mb-4">
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-white/60" />
                    Qatar MOL License #618
                  </span>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Ready to apply?
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-5">
                    Submit your application directly to our team. We'll be in touch within 48 hours.
                  </p>
                  {!isExpired ? (
                    <button onClick={() => setShowApply(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-black/10">
                      <Send className="w-4 h-4" /> Apply for This Role
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-400/20 text-red-300 text-sm font-bold border border-red-400/20">
                      <X className="w-4 h-4" /> Applications Closed
                    </div>
                  )}
                  <p className="mt-3 text-center text-white/35 text-[10px]">
                    Or email us at <span className="text-white/60">{APPLY_EMAIL}</span>
                  </p>
                </div>
              </div>

              {/* Job Details card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Job Details
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Building2, label: "Company",      val: job.company },
                    { icon: MapPin,    label: "Location",     val: job.location },
                    { icon: Briefcase, label: "Type",         val: job.employmentType },
                    { icon: Award,     label: "Experience",   val: job.experienceLevel ? `${job.experienceLevel} Level` : null },
                    { icon: Banknote,  label: "Salary",       val: salary },
                    { icon: Tag,       label: "Category",     val: job.category },
                    { icon: LayoutList,label: "Department",   val: job.department },
                    { icon: Calendar,  label: "Deadline",     val: job.applicationDeadline ? fmtDate(job.applicationDeadline) : null },
                    { icon: Hash,      label: "Focus",        val: job.focusKeyword },
                  ].filter((r) => r.val).map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex items-start justify-between gap-3">
                      <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5 shrink-0 pt-0.5">
                        <Icon className="w-3.5 h-3.5 text-slate-300" /> {label}
                      </span>
                      <span className="text-slate-700 text-xs font-semibold text-right leading-relaxed">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Deadline urgency */}
                {deadline && (
                  <div className={`mt-2 flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    deadline.color === "red"    ? "bg-red-50 text-red-600 border border-red-100" :
                    deadline.color === "orange" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                    deadline.color === "yellow" ? "bg-yellow-50 text-yellow-700 border border-yellow-100" :
                                                  "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  }`}>
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    {deadline.text}
                  </div>
                )}
              </div>

              {/* Application Contact */}
              {job.applicationEmail && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Direct Contact</h3>
                  <a href={`mailto:${job.applicationEmail}`}
                    className="flex items-center gap-2.5 text-sm text-[#154895] font-semibold hover:underline">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="break-all">{job.applicationEmail}</span>
                  </a>
                </div>
              )}

              {/* Related Jobs */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-5 pt-5 pb-2 flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-[#154895] inline-block shrink-0" />
                    <h3 className="text-sm font-bold text-slate-700">Similar Roles</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {related.map((j) => (
                      <RelatedJobCard key={j._id} job={j}
                        onClick={() => navigate(`/jobs/${j.slug || j._id}`)} />
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t border-slate-50">
                    <button onClick={() => navigate("/jobs")}
                      className="text-xs font-bold text-[#154895] hover:underline">
                      View all openings →
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* ── BOTTOM CTA BANNER ────────────────────────────────────────── */}
        <div className="bg-[#154895]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">For Employers</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Need to hire for this role?
              </h3>
              <p className="text-white/55 text-sm mt-1.5 max-w-sm leading-relaxed">
                We source pre-vetted candidates from 28+ countries for the Gulf market.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button onClick={() => navigate("/quote")}
                className="px-6 py-3 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-black/10">
                Get Free Quote
              </button>
              <button onClick={() => navigate("/contact")}
                className="px-6 py-3 rounded-xl bg-[#C5282B] text-white text-sm font-bold hover:bg-[#a82226] transition-colors inline-flex items-center gap-2">
                Request Manpower <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE STICKY APPLY BAR ──────────────────────────────────── */}
        {!isExpired && (
          <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
            <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 safe-bottom">
              <button onClick={() => setShowApply(true)}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#154895] text-white text-sm font-bold hover:bg-[#0d3270] transition-colors shadow-xl shadow-[#154895]/30">
                <Send className="w-4 h-4" /> Apply for This Role
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}