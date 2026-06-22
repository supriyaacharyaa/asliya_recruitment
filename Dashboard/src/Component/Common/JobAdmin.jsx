import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "../../api/axios.js";
import Sidebar from "./Dashboard";
import {
  Plus, Search, Filter, Edit2, Trash2, X,
  Globe, ChevronDown, ChevronLeft, ChevronRight,
  CheckCircle, AlertCircle, Loader2, Eye,
  LayoutList, Tag, Hash, AlignLeft, Type, Link2,
  Clock, Check, MoreVertical, Briefcase, MapPin,
  DollarSign, Star, Users, XCircle, Building2,
  Zap, BookOpen,
} from "lucide-react";

const API = "/jobs";

const EMPTY_FORM = {
  title: "",
  slug: "",
  company: "",
  location: "",
  locationType: "onsite",
  employmentType: "full-time",
  experienceLevel: "mid",
  salaryMin: "",
  salaryMax: "",
  salaryCurrency: "USD",
  salaryPeriod: "yearly",
  excerpt: "",
  description: "",
  requirements: "",
  responsibilities: "",
  benefits: "",
  skills: "",
  category: "General",
  department: "",
  status: "active",
  featured: false,
  applicationDeadline: "",
  applicationEmail: "",
  applicationUrl: "",
  metaTitle: "",
  metaDescription: "",
};

const TABS = [
  { id: "details",  label: "Details",     icon: Briefcase },
  { id: "content",  label: "Description", icon: AlignLeft },
  { id: "apply",    label: "Apply",       icon: Link2 },
  { id: "seo",      label: "SEO",         icon: Globe },
];

const LOC_TYPE_LABELS = { onsite: "On-site", remote: "Remote", hybrid: "Hybrid" };
const EMP_TYPE_LABELS = {
  "full-time": "Full-time", "part-time": "Part-time",
  "contract": "Contract", "internship": "Internship", "temporary": "Temporary",
};
const EXP_LEVEL_LABELS = {
  entry: "Entry", mid: "Mid", senior: "Senior", lead: "Lead", executive: "Executive",
};

// ── Pure UI ───────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    active:  { wrap: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", dot: "bg-emerald-500" },
    draft:   { wrap: "bg-amber-50 text-amber-700 ring-amber-600/20",       dot: "bg-amber-400" },
    closed:  { wrap: "bg-red-50 text-red-700 ring-red-600/20",             dot: "bg-red-400" },
  };
  const s = styles[status] || styles.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ring-inset capitalize ${s.wrap}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
};

const Toast = ({ msg, type, onClose }) => (
  <div className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:w-auto z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white text-sm font-semibold ${type === "error" ? "bg-red-600" : "bg-[#154895]"}`}
    style={{ animation: "slideUp .25s ease" }}>
    <style>{`@keyframes slideUp{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    {type === "error" ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
    <span className="flex-1">{msg}</span>
    <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity ml-1">
      <X className="w-3.5 h-3.5" />
    </button>
  </div>
);

const Field = ({ label, hint, icon: Icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
      <span className="flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />}{label}
      </span>
      {hint && <span className="font-normal normal-case tracking-normal text-slate-300">{hint}</span>}
    </label>
    {children}
  </div>
);

const StatCard = ({ label, value, icon: Icon, color, accent }) => (
  <div className="relative overflow-hidden bg-white rounded-2xl px-5 py-5 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${accent}`} />
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-2xl font-bold text-slate-800 leading-none tabular-nums">{value}</div>
      <div className="text-xs text-slate-400 font-medium mt-1">{label}</div>
    </div>
  </div>
);

const inputCls    = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white placeholder:text-slate-300 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all";
const textareaCls = `${inputCls} resize-y leading-relaxed`;
const selectCls   = `${inputCls} appearance-none cursor-pointer`;

// ── Mobile Job Card ───────────────────────────────────────────────────────────

const JobCard = ({ job, onEdit, onClose, onDelete, onFeature, selected, onToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={`relative bg-white rounded-xl border transition-all ${selected ? "border-[#154895] ring-2 ring-[#154895]/15" : "border-slate-100 hover:border-slate-200 hover:shadow-sm"}`}>
      <div className="flex items-start gap-3 p-3">
        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#154895] cursor-pointer mt-0.5 shrink-0"
          checked={selected} onChange={onToggle} />
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <Briefcase className="w-4.5 h-4.5 text-[#154895]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-1">{job.title}</p>
            {job.featured && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
          </div>
          {job.company && <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 truncate">
            <Building2 className="w-3 h-3 shrink-0" />{job.company}
          </p>}
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 shrink-0" />{job.location || "—"} · {LOC_TYPE_LABELS[job.locationType]}
          </p>
        </div>
        <div className="relative shrink-0" ref={menuRef}>
          <button onClick={() => setMenuOpen(v => !v)}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 bg-white rounded-xl shadow-xl border border-slate-100 py-1 min-w-[150px]">
              <button onClick={() => { onEdit(job); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Edit2 className="w-3.5 h-3.5 text-[#154895]" /> Edit
              </button>
              <button onClick={() => { onFeature(job._id); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 transition-colors">
                <Star className="w-3.5 h-3.5" /> {job.featured ? "Unfeature" : "Feature"}
              </button>
              {job.status !== "closed" && (
                <button onClick={() => { onClose(job._id); setMenuOpen(false); }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  <XCircle className="w-3.5 h-3.5" /> Close listing
                </button>
              )}
              <button onClick={() => { onDelete(job._id); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 pb-3 flex-wrap">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-[#154895] text-xs font-medium rounded-md">
          <Tag className="w-3 h-3" />{job.category}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
          {EMP_TYPE_LABELS[job.employmentType]}
        </span>
        <StatusBadge status={job.status} />
        {job.salaryMin && (
          <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
            <DollarSign className="w-3 h-3" />{Number(job.salaryMin).toLocaleString()}
            {job.salaryMax ? `–${Number(job.salaryMax).toLocaleString()}` : "+"} {job.salaryCurrency}
          </span>
        )}
      </div>
    </div>
  );
};

// ── List input (bullet-style) ─────────────────────────────────────────────────

const ListInput = ({ label, icon: Icon, value, onChange, placeholder }) => {
  const lines = value ? value.split("\n") : [""];

  const handleLine = (i, val) => {
    const next = [...lines];
    next[i] = val;
    onChange(next.join("\n"));
  };

  const addLine = () => onChange(value ? value + "\n" : "");
  const removeLine = (i) => {
    const next = lines.filter((_, idx) => idx !== i);
    onChange(next.join("\n"));
  };

  return (
    <Field label={label} icon={Icon} hint={`${lines.filter(Boolean).length} items`}>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
            <input
              className={`${inputCls} flex-1`}
              value={line}
              onChange={e => handleLine(i, e.target.value)}
              placeholder={placeholder}
              onKeyDown={e => {
                if (e.key === "Enter") { e.preventDefault(); addLine(); }
                if (e.key === "Backspace" && !line && lines.length > 1) { e.preventDefault(); removeLine(i); }
              }}
            />
            {lines.length > 1 && (
              <button type="button" onClick={() => removeLine(i)}
                className="shrink-0 w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addLine}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#154895] hover:text-[#1240a0] transition-colors mt-1">
          <Plus className="w-3.5 h-3.5" /> Add item
        </button>
      </div>
    </Field>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

export default function JobAdmin() {
  const [jobs, setJobs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [modal, setModal]             = useState(false);
  const [editing, setEditing]         = useState(null);
  const [form, setForm]               = useState(EMPTY_FORM);
  const [saving, setSaving]           = useState(false);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [toast, setToast]             = useState(null);
  const [activeTab, setActiveTab]     = useState("details");
  const [selected, setSelected]       = useState([]);
  const [stats, setStats]             = useState({ total: 0, active: 0, draft: 0, closed: 0 });

  const searchTimeout = useRef();
  const isMounted     = useRef(true);

  useEffect(() => { isMounted.current = true; return () => { isMounted.current = false; }; }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => { if (isMounted.current) setToast(null); }, 3200);
  };

  const fetchJobs = useCallback(async ({ pg, status, q } = {}) => {
    setLoading(true);
    try {
      const params = { page: pg, limit: 8 };
      if (q)      params.search = q;
      if (status) params.status = status;
      const { data } = await axios.get(`${API}/admin/all`, { params });
      if (!isMounted.current) return;
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setStats({ total: data.count, active: data.activeCount ?? 0, draft: data.draftCount ?? 0, closed: data.closedCount ?? 0 });
    } catch {
      if (isMounted.current) showToast("Failed to load jobs", "error");
    }
    if (isMounted.current) setLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs({ pg: page, status: statusFilter, q: search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter]);

  const handleSearchChange = (val) => {
    setSearch(val);
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchJobs({ pg: 1, status: statusFilter, q: val });
    }, 350);
  };

  const handleStatusFilterChange = (val) => { setStatusFilter(val); setPage(1); setSelected([]); };
  const handlePageChange = (p) => { setPage(p); setSelected([]); };

  // ── Modal helpers ─────────────────────────────────────────────────────────

  const openCreate = () => {
    setForm(EMPTY_FORM); setEditing(null); setActiveTab("details"); setModal("create");
  };

  const openEdit = (job) => {
    setForm({
      title: job.title || "",
      slug: job.slug || "",
      company: job.company || "",
      location: job.location || "",
      locationType: job.locationType || "onsite",
      employmentType: job.employmentType || "full-time",
      experienceLevel: job.experienceLevel || "mid",
      salaryMin: job.salaryMin ?? "",
      salaryMax: job.salaryMax ?? "",
      salaryCurrency: job.salaryCurrency || "USD",
      salaryPeriod: job.salaryPeriod || "yearly",
      excerpt: job.excerpt || "",
      description: job.description || "",
      requirements: (job.requirements || []).join("\n"),
      responsibilities: (job.responsibilities || []).join("\n"),
      benefits: (job.benefits || []).join("\n"),
      skills: (job.skills || []).join(", "),
      category: job.category || "General",
      department: job.department || "",
      status: job.status || "draft",
      featured: job.featured || false,
      applicationDeadline: job.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().split("T")[0]
        : "",
      applicationEmail: job.applicationEmail || "",
      applicationUrl: job.applicationUrl || "",
      metaTitle: job.metaTitle || "",
      metaDescription: job.metaDescription || "",
    });
    setEditing(job); setActiveTab("details"); setModal("edit");
  };

  const closeModal = () => { setModal(false); setEditing(null); };

  // ── Auto-slug ─────────────────────────────────────────────────────────────

 const handleTitleChange = (val) => {
  const slug = val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  setForm(f => ({
    ...f,
    title: val,
    ...(modal === "create" ? { slug } : {})
  }));
};

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async (overrideStatus) => {
   console.log("FORM:", form);

  const finalForm = overrideStatus
    ? { ...form, status: overrideStatus }
    : form;

  console.log("FINAL FORM:", finalForm);

  if (!finalForm.title || !finalForm.slug || !finalForm.description) {
    showToast("Title, slug and description are required", "error");
    return; 
    }

    setSaving(true);
    try {
      const  payload = {
  ...finalForm,

  requirements: (finalForm.requirements || "")
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean),

  responsibilities: (finalForm.responsibilities || "")
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean),

  benefits: (finalForm.benefits || "")
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean),

skills: (finalForm.skills || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean),

  featured: finalForm.featured,
salaryMin:
  finalForm.salaryMin !== "" && finalForm.salaryMin !== undefined
    ? Number(finalForm.salaryMin)
    : null,

salaryMax:
  finalForm.salaryMax !== "" && finalForm.salaryMax !== undefined
    ? Number(finalForm.salaryMax)
    : null,
  applicationDeadline: finalForm.applicationDeadline || null,
};

      if (modal === "create") {
        await axios.post(API, payload);
        showToast(finalForm.status === "active" ? "Job published 🎉" : "Draft saved");
      } else {
        await axios.put(`${API}/${editing._id}`, payload);
        showToast("Changes saved");
      }
      if (!isMounted.current) return;
      closeModal(); fetchJobs({ pg: page, status: statusFilter, q: search });
    } catch (e) {
      if (isMounted.current) showToast(e.response?.data?.message || "Save failed", "error");
    }
    if (isMounted.current) setSaving(false);
  };

  const handleClose = async (id) => {
    if (!window.confirm("Close this job listing?")) return;
    try {
      await axios.patch(`${API}/${id}/close`);
      showToast("Job closed");
      fetchJobs({ pg: page, status: statusFilter, q: search });
    } catch { showToast("Failed to close job", "error"); }
  };

  const handleFeature = async (id) => {
    try {
      const { data } = await axios.patch(`${API}/${id}/feature`);
      showToast(data.message);
      fetchJobs({ pg: page, status: statusFilter, q: search });
    } catch { showToast("Failed to update featured status", "error"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this job? This cannot be undone.")) return;
    try {
      await axios.delete(`${API}/${id}`);
      showToast("Job deleted");
      const remaining = jobs.filter(j => j._id !== id).length;
      const newPage = remaining === 0 && page > 1 ? page - 1 : page;
      setPage(newPage); setSelected(s => s.filter(x => x !== id));
      fetchJobs({ pg: newPage, status: statusFilter, q: search });
    } catch { showToast("Failed to delete", "error"); }
  };

  const allSelected = jobs.length > 0 && selected.length === jobs.length;
  const toggleAll   = () => setSelected(allSelected ? [] : jobs.map(j => j._id));
  const toggleOne   = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const setField    = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="flex min-h-screen bg-slate-50">
        <div className="fixed top-0 left-0 h-screen z-40 shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 w-full lg:ml-72 min-h-screen overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

            {/* Page header */}
            <div className="flex items-center justify-between mb-6 mt-12 lg:mt-0">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recruitment</p>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Job Listings</h1>
              </div>
              <button onClick={openCreate}
                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-[#154895] text-white text-sm font-semibold rounded-xl
                  hover:bg-[#1240a0] active:scale-95 transition-all shadow-sm shadow-[#154895]/25">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Post Job</span>
                <span className="sm:hidden">New</span>
              </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <StatCard label="Total Jobs"  value={stats.total}  icon={BookOpen}   color="bg-blue-50 text-[#154895]"     accent="bg-[#154895]" />
              <StatCard label="Active"      value={stats.active} icon={CheckCircle} color="bg-emerald-50 text-emerald-600" accent="bg-emerald-500" />
              <StatCard label="Drafts"      value={stats.draft}  icon={Clock}       color="bg-amber-50 text-amber-600"    accent="bg-amber-400" />
              <StatCard label="Closed"      value={stats.closed} icon={XCircle}     color="bg-slate-100 text-slate-500"   accent="bg-slate-400" />
            </div>

            {/* Table card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100">
                <div className="relative flex-1 min-w-[140px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                  <input
                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50
                      placeholder:text-slate-300 outline-none focus:border-[#154895] focus:bg-white focus:ring-2 focus:ring-[#154895]/10 transition-all"
                    placeholder="Search jobs…"
                    value={search}
                    onChange={e => handleSearchChange(e.target.value)}
                  />
                </div>
                <div className="relative shrink-0">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                  <select
                    className="pl-8 pr-8 py-2 sm:py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600
                      outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 appearance-none transition-all cursor-pointer"
                    value={statusFilter}
                    onChange={e => handleStatusFilterChange(e.target.value)}>
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                </div>
                {selected.length > 0 && (
                  <span className="text-xs font-semibold text-[#154895] bg-blue-50 px-3 py-1.5 rounded-lg whitespace-nowrap">
                    {selected.length} selected
                  </span>
                )}
              </div>

              {/* Loading */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="w-7 h-7 text-[#154895] animate-spin" />
                  <p className="text-sm text-slate-400">Loading jobs…</p>
                </div>

              /* Empty */
              ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-1">
                    <Briefcase className="w-7 h-7 text-slate-300" />
                  </div>
                  <p className="font-semibold text-slate-600">No jobs found</p>
                  <p className="text-sm text-slate-400 max-w-xs">
                    {search || statusFilter ? "Try adjusting your search or filters." : "Post your first job opening."}
                  </p>
                  {!search && !statusFilter && (
                    <button onClick={openCreate}
                      className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#154895] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors">
                      <Plus className="w-4 h-4" /> Post Job
                    </button>
                  )}
                </div>

              ) : (
                <>
                  {/* Mobile cards */}
                  <div className="lg:hidden p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2 flex items-center gap-2 pb-1 border-b border-slate-100 mb-1">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#154895] cursor-pointer"
                        checked={allSelected} onChange={toggleAll} />
                      <span className="text-xs text-slate-400 font-medium">Select all ({jobs.length})</span>
                    </div>
                    {jobs.map(j => (
                      <JobCard key={j._id} job={j}
                        selected={selected.includes(j._id)}
                        onToggle={() => toggleOne(j._id)}
                        onEdit={openEdit}
                        onClose={handleClose}
                        onDelete={handleDelete}
                        onFeature={handleFeature}
                      />
                    ))}
                  </div>

                  {/* Desktop table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100">
                          <th className="w-10 px-4 py-3">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#154895] cursor-pointer"
                              checked={allSelected} onChange={toggleAll} />
                          </th>
                          {["Job", "Category", "Type", "Salary", "Status", "Posted", "Actions"].map(h => (
                            <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {jobs.map(j => (
                          <tr key={j._id} className="group hover:bg-slate-50/60 transition-colors">
                            <td className="px-4 py-3.5">
                              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#154895] cursor-pointer"
                                checked={selected.includes(j._id)} onChange={() => toggleOne(j._id)} />
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                  <Briefcase className="w-4 h-4 text-[#154895]" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-semibold text-slate-800 truncate max-w-[200px]">{j.title}</p>
                                    {j.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />}
                                  </div>
                                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />{j.location || "—"} · {LOC_TYPE_LABELS[j.locationType]}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-[#154895] text-xs font-medium rounded-md">
                                <Tag className="w-3 h-3" />{j.category}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-xs text-slate-500 font-medium">
                              {EMP_TYPE_LABELS[j.employmentType]}
                            </td>
                            <td className="px-4 py-3.5 text-xs text-slate-500 font-medium">
                              {j.salaryMin
                                ? `${j.salaryCurrency} ${Number(j.salaryMin).toLocaleString()}${j.salaryMax ? `–${Number(j.salaryMax).toLocaleString()}` : "+"}`
                                : <span className="text-slate-300">—</span>
                              }
                            </td>
                            <td className="px-4 py-3.5"><StatusBadge status={j.status} /></td>
                            <td className="px-4 py-3.5 text-xs text-slate-400 font-medium">
                              {j.publishedAt
                                ? new Date(j.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                                : <span className="text-slate-300">—</span>}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5 ">
                                <button onClick={() => openEdit(j)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#154895] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                  <Edit2 className="w-3 h-3" /> Edit
                                </button>
                                <button onClick={() => handleFeature(j._id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                                  <Star className="w-3 h-3" /> {j.featured ? "Unfeature" : "Feature"}
                                </button>
                                {j.status !== "closed" && (
                                  <button onClick={() => handleClose(j._id)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                                    <XCircle className="w-3 h-3" /> Close
                                  </button>
                                )}
                                <button onClick={() => handleDelete(j._id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                  <Trash2 className="w-3 h-3" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 px-4 sm:px-5 py-4 border-t border-slate-100 flex-wrap">
                  <button
                    onClick={() => handlePageChange(Math.max(1, page - 1))} disabled={page === 1}
                    className="flex items-center gap-1 px-2.5 sm:px-3 py-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" /><span className="hidden sm:inline">Prev</span>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => handlePageChange(p)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 text-sm font-semibold rounded-lg transition-colors
                        ${p === page ? "bg-[#154895] text-white shadow-sm" : "text-slate-500 border border-slate-200 hover:bg-slate-50"}`}>
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                    className="flex items-center gap-1 px-2.5 sm:px-3 py-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <span className="hidden sm:inline">Next</span><ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ MODAL ══════════════════════════════════════════════════════════════ */}
      {modal && (
        <div
          className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center sm:p-4 lg:p-8 bg-slate-900/60 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && closeModal()}>

          <div className="bg-white w-full sm:rounded-2xl sm:max-w-2xl lg:max-w-3xl shadow-2xl shadow-slate-900/20 overflow-hidden
            rounded-t-2xl sm:my-auto max-h-[95dvh] sm:max-h-[90vh] flex flex-col">

            {/* Modal header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#154895]/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4 text-[#154895]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">
                    {modal === "create" ? "New Job" : "Editing"}
                  </p>
                  <h2 className="text-sm sm:text-base font-bold text-slate-800 leading-none truncate max-w-[180px] sm:max-w-[300px]">
                    {modal === "create" ? "Post a Job" : (form.title || "Job Listing")}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {/* Featured toggle */}
                <button
                  onClick={() => setField("featured", !form.featured)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all
                    ${form.featured
                      ? "bg-amber-50 border-amber-200 text-amber-700"
                      : "bg-white border-slate-200 text-slate-400 hover:border-amber-200 hover:text-amber-600"}`}>
                  <Star className={`w-3.5 h-3.5 ${form.featured ? "fill-amber-400 text-amber-400" : ""}`} />
                  <span className="hidden sm:inline">{form.featured ? "Featured" : "Feature"}</span>
                </button>
                {/* Status picker */}
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-7 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 outline-none focus:border-[#154895] cursor-pointer"
                    value={form.status}
                    onChange={e => setField("status", e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                </div>
                <button onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0.5 sm:gap-1 px-4 sm:px-6 pt-3 pb-0 border-b border-slate-100 shrink-0 overflow-x-auto">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 -mb-px whitespace-nowrap
                    ${activeTab === id
                      ? "text-[#154895] border-[#154895] bg-blue-50/50"
                      : "text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50"}`}>
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">

              {/* ── Details tab ─────────────────────────────────────────── */}
              {activeTab === "details" && (<>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Job Title" hint="required" icon={Type}>
                    <input className={inputCls} value={form.title}
                      onChange={e => handleTitleChange(e.target.value)} placeholder="e.g. Senior Software Engineer" />
                  </Field>
                  <Field label="Slug" hint="required" icon={Hash}>
                    <input className={inputCls} value={form.slug}
                      onChange={e => setField("slug", e.target.value)} placeholder="senior-software-engineer" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Company" icon={Building2}>
                    <input className={inputCls} value={form.company}
                      onChange={e => setField("company", e.target.value)} placeholder="Company name" />
                  </Field>
                  <Field label="Department" icon={Users}>
                    <input className={inputCls} value={form.department}
                      onChange={e => setField("department", e.target.value)} placeholder="e.g. Engineering" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Location" icon={MapPin}>
                    <input className={inputCls} value={form.location}
                      onChange={e => setField("location", e.target.value)} placeholder="e.g. New York, NY" />
                  </Field>
                  <Field label="Location Type" icon={Globe}>
                    <div className="relative">
                      <select className={selectCls} value={form.locationType}
                        onChange={e => setField("locationType", e.target.value)}>
                        <option value="onsite">On-site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                    </div>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Employment Type" icon={Briefcase}>
                    <div className="relative">
                      <select className={selectCls} value={form.employmentType}
                        onChange={e => setField("employmentType", e.target.value)}>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="temporary">Temporary</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                    </div>
                  </Field>
                  <Field label="Experience Level" icon={Zap}>
                    <div className="relative">
                      <select className={selectCls} value={form.experienceLevel}
                        onChange={e => setField("experienceLevel", e.target.value)}>
                        <option value="entry">Entry level</option>
                        <option value="mid">Mid level</option>
                        <option value="senior">Senior</option>
                        <option value="lead">Lead</option>
                        <option value="executive">Executive</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                    </div>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Category" icon={Tag}>
                    <input className={inputCls} value={form.category}
                      onChange={e => setField("category", e.target.value)} placeholder="e.g. Technology" />
                  </Field>
                  <Field label="Skills" hint="comma-separated" icon={Hash}>
                    <input className={inputCls} value={form.skills}
                      onChange={e => setField("skills", e.target.value)} placeholder="React, Node.js, MongoDB" />
                  </Field>
                </div>

                {/* Salary */}
                <div className="border border-slate-100 rounded-xl p-4 space-y-3 bg-slate-50/50">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3" /> Salary Range (optional)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Field label="Min">
                      <input className={inputCls} type="number" min="0" value={form.salaryMin}
                        onChange={e => setField("salaryMin", e.target.value)} placeholder="50000" />
                    </Field>
                    <Field label="Max">
                      <input className={inputCls} type="number" min="0" value={form.salaryMax}
                        onChange={e => setField("salaryMax", e.target.value)} placeholder="80000" />
                    </Field>
                    <Field label="Currency">
                      <input className={inputCls} value={form.salaryCurrency}
                        onChange={e => setField("salaryCurrency", e.target.value.toUpperCase())} placeholder="USD" maxLength={3} />
                    </Field>
                    <Field label="Period">
                      <div className="relative">
                        <select className={selectCls} value={form.salaryPeriod}
                          onChange={e => setField("salaryPeriod", e.target.value)}>
                          <option value="hourly">Hourly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                      </div>
                    </Field>
                  </div>
                </div>
              </>)}

              {/* ── Description tab ─────────────────────────────────────── */}
              {activeTab === "content" && (<>
                <Field label="Short Excerpt" hint={`${form.excerpt.length}/300`} icon={AlignLeft}>
                  <textarea className={textareaCls} style={{ minHeight: 76 }} value={form.excerpt}
                    placeholder="A one-liner that appears in job listings…"
                    onChange={e => setField("excerpt", e.target.value.slice(0, 300))} />
                </Field>
                <Field label="Full Description" hint="required" icon={BookOpen}>
                  <textarea className={textareaCls} style={{ minHeight: 160 }} value={form.description}
                    placeholder="Describe the role, team, and what makes it exciting…"
                    onChange={e => setField("description", e.target.value)} />
                </Field>
                <ListInput
                  label="Responsibilities"
                  icon={CheckCircle}
                  value={form.responsibilities}
                  onChange={v => setField("responsibilities", v)}
                  placeholder="e.g. Lead architectural decisions"
                />
                <ListInput
                  label="Requirements"
                  icon={Zap}
                  value={form.requirements}
                  onChange={v => setField("requirements", v)}
                  placeholder="e.g. 3+ years of React experience"
                />
                <ListInput
                  label="Benefits"
                  icon={Star}
                  value={form.benefits}
                  onChange={v => setField("benefits", v)}
                  placeholder="e.g. Health insurance, 401k matching"
                />
              </>)}

              {/* ── Apply tab ────────────────────────────────────────────── */}
              {activeTab === "apply" && (<>
                <Field label="Application Deadline" icon={Clock}>
                  <input className={inputCls} type="date" value={form.applicationDeadline}
                    onChange={e => setField("applicationDeadline", e.target.value)} />
                </Field>
                <Field label="Application Email" icon={AlignLeft}>
                  <input className={inputCls} type="email" value={form.applicationEmail}
                    onChange={e => setField("applicationEmail", e.target.value)}
                    placeholder="careers@yourcompany.com" />
                </Field>
                <Field label="Application URL" hint="External ATS link" icon={Link2}>
                  <input className={inputCls} type="url" value={form.applicationUrl}
                    onChange={e => setField("applicationUrl", e.target.value)}
                    placeholder="https://apply.yourcompany.com/job-id" />
                </Field>
                <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#154895] mb-1 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> How applications work
                  </p>
                  <p className="text-xs text-slate-500">
                    If an application URL is set, candidates will be redirected there. Otherwise they'll email
                    the application address. At least one should be filled for active listings.
                  </p>
                </div>
              </>)}

              {/* ── SEO tab ─────────────────────────────────────────────── */}
              {activeTab === "seo" && (<>
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Eye className="w-3 h-3" /> Search Preview
                  </p>
                  <p className="text-base sm:text-lg text-[#1a0dab] font-medium truncate mb-0.5">
                    {form.metaTitle || form.title || "Job title will appear here"}
                  </p>
                  <p className="text-xs text-[#006621] mb-1.5 truncate">
                    yourdomain.com › jobs › {form.slug || "job-slug"}
                  </p>
                  <p className="text-xs sm:text-sm text-[#545454] leading-relaxed line-clamp-2">
                    {form.metaDescription || form.excerpt || "Meta description will appear here in search results."}
                  </p>
                </div>
                <Field label="Meta Title" hint={`${form.metaTitle.length}/60`} icon={Type}>
                  <input className={inputCls} value={form.metaTitle}
                    onChange={e => setField("metaTitle", e.target.value.slice(0, 60))} placeholder="SEO title" />
                </Field>
                <Field label="Meta Description" hint={`${form.metaDescription.length}/160`} icon={AlignLeft}>
                  <textarea className={textareaCls} style={{ minHeight: 80 }} value={form.metaDescription}
                    placeholder="Description shown in search results"
                    onChange={e => setField("metaDescription", e.target.value.slice(0, 160))} />
                </Field>
              </>)}
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 bg-slate-50/50 shrink-0 gap-2">
              <button onClick={closeModal}
                className="px-3 sm:px-4 py-2.5 text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <div className="flex items-center gap-2">
                {form.status === "draft" && (
                  <button onClick={() => handleSave("draft")} disabled={saving}
                    className="px-3 sm:px-4 py-2.5 text-sm font-semibold text-[#154895] bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 disabled:opacity-60 transition-colors">
                    <span className="hidden sm:inline">Save Draft</span>
                    <span className="sm:hidden">Draft</span>
                  </button>
                )}
                <button onClick={() => handleSave()} disabled={saving}
                  className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-[#154895] rounded-xl
                    hover:bg-[#1240a0] disabled:opacity-60 active:scale-95 transition-all shadow-sm shadow-[#154895]/25">
                  {saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" /><span className="hidden sm:inline">Saving…</span></>
                    : <><Check className="w-4 h-4" /><span>{modal === "create" ? "Publish" : "Save"}</span></>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}