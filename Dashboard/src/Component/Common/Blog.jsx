// import React, { useState, useEffect, useRef, useCallback } from "react";
// import axios from "../../Axios/Axios";
// import Sidebar from "./Dashboard";
// import {
//   Plus, Search, Filter, Edit2, Archive, Trash2, X, Upload,
//   Image, FileText, Globe, ChevronDown, ChevronLeft, ChevronRight,
//   CheckCircle, AlertCircle, Loader2, Eye, BookOpen, PenLine,
//   LayoutList, HelpCircle, Tag, Hash, AlignLeft, Type, Link2,
//   Clock, Check,
// } from "lucide-react";

// const API = "/blog";

// const EMPTY_FORM = {
//   title: "", slug: "", excerpt: "", content: "",
//   category: "General", tags: "", status: "draft",
//   metaTitle: "", metaDescription: "", focusKeyword: "",
//   sections: [], faqs: [],
// };

// const TABS = [
//   { id: "content", label: "Content", icon: PenLine },
//   { id: "media",   label: "Media",   icon: Image },
//   { id: "seo",     label: "SEO",     icon: Globe },
//   { id: "extras",  label: "Extras",  icon: LayoutList },
// ];

// // ── Pure components ────────────────────────────────────────────

// const StatusBadge = ({ status }) => {
//   const map = {
//     published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
//     draft:     "bg-amber-50 text-amber-700 ring-amber-600/20",
//     archived:  "bg-red-50 text-red-700 ring-red-600/20",
//   };
//   const dot = {
//     published: "bg-emerald-500",
//     draft:     "bg-amber-400",
//     archived:  "bg-red-400",
//   };
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ring-inset capitalize ${map[status] || map.draft}`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${dot[status] || dot.draft}`} />
//       {status}
//     </span>
//   );
// };

// const Toast = ({ msg, type, onClose }) => (
//   <div
//     className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white text-sm font-semibold ${type === "error" ? "bg-red-600" : "bg-[#154895]"}`}
//     style={{ animation: "slideUp .25s ease" }}
//   >
//     <style>{`@keyframes slideUp{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
//     {type === "error"
//       ? <AlertCircle className="w-4 h-4 shrink-0" />
//       : <CheckCircle className="w-4 h-4 shrink-0" />
//     }
//     {msg}
//     <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100 transition-opacity">
//       <X className="w-3.5 h-3.5" />
//     </button>
//   </div>
// );

// const Field = ({ label, hint, icon: Icon, children }) => (
//   <div className="flex flex-col gap-1.5">
//     <label className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
//       <span className="flex items-center gap-1.5">
//         {Icon && <Icon className="w-3 h-3" />}{label}
//       </span>
//       {hint && <span className="font-normal normal-case tracking-normal text-slate-300">{hint}</span>}
//     </label>
//     {children}
//   </div>
// );

// const StatCard = ({ label, value, icon: Icon, color }) => (
//   <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-slate-100 flex items-center gap-4">
//     <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
//       <Icon className="w-5 h-5" />
//     </div>
//     <div>
//       <div className="text-2xl font-bold text-slate-800 leading-none">{value}</div>
//       <div className="text-xs text-slate-400 font-medium mt-1">{label}</div>
//     </div>
//   </div>
// );

// const inputCls    = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white placeholder:text-slate-300 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all";
// const textareaCls = `${inputCls} resize-y leading-relaxed`;

// // ── Main component ─────────────────────────────────────────────

// export default function BlogAdmin() {
//   const [blogs, setBlogs]               = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [modal, setModal]               = useState(false);   // false | "create" | "edit"
//   const [editing, setEditing]           = useState(null);
//   const [form, setForm]                 = useState(EMPTY_FORM);
//   const [heroFile, setHeroFile]         = useState(null);
//   const [heroPreview, setHeroPreview]   = useState("");
//   const [removeHero, setRemoveHero]     = useState(false);
//   const [saving, setSaving]             = useState(false);
//   const [search, setSearch]             = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage]                 = useState(1);
//   const [totalPages, setTotalPages]     = useState(1);
//   const [toast, setToast]               = useState(null);
//   const [activeTab, setActiveTab]       = useState("content");
//   const [selected, setSelected]         = useState([]);
//   const [stats, setStats]               = useState({ total: 0, published: 0, draft: 0 });

//   const fileRef       = useRef();
//   const searchTimeout = useRef();
//   const isMounted     = useRef(true);

//   // Keep a ref to the latest search value so async/non-React callbacks
//   // always read the current value without needing it in dependency arrays.
//   const searchRef = useRef(search);
//   useEffect(() => { searchRef.current = search; }, [search]);

//   useEffect(() => {
//     isMounted.current = true;
//     return () => { isMounted.current = false; };
//   }, []);

//   // ── Fetch ──────────────────────────────────────────────────────
//   // All values passed as explicit args — no stale closure on state.
//   const fetchBlogs = useCallback(async ({ pg, status, q } = {}) => {
//     setLoading(true);
//     try {
//       const params = { page: pg, limit: 8 };
//       if (q)      params.search = q;
//       if (status) params.status = status;

//       const { data } = await axios.get(`${API}/admin/all`, { params });

//       if (!isMounted.current) return;
//       setBlogs(data.blogs);
//       setTotalPages(data.totalPages);
//       setStats({
//         total:     data.count,
//         published: data.publishedCount ?? 0,
//         draft:     data.draftCount     ?? 0,
//       });
//     } catch {
//       if (isMounted.current) showToast("Failed to load blogs", "error");
//     }
//     if (isMounted.current) setLoading(false);
//   }, []); // stable — all inputs are explicit args

//   // Effect owns page + statusFilter changes.
//   // Search has its own debounced path that calls fetchBlogs directly.
//   useEffect(() => {
//     fetchBlogs({ pg: page, status: statusFilter, q: searchRef.current });
//   }, [page, statusFilter, fetchBlogs]);

//   // ── Search — debounced, resets page to 1 ──────────────────────
//   const handleSearchChange = (val) => {
//     setSearch(val);
//     searchRef.current = val; // keep ref in sync immediately
//     clearTimeout(searchTimeout.current);
//     searchTimeout.current = setTimeout(() => {
//       setPage(1);
//       fetchBlogs({ pg: 1, status: statusFilter, q: val });
//     }, 350);
//   };

//   // ── Status filter — passes current search ref to avoid stale read
//   const handleStatusFilterChange = (val) => {
//     setStatusFilter(val);
//     setPage(1);
//     setSelected([]);
//     fetchBlogs({ pg: 1, status: val, q: searchRef.current });
//   };

//   const handlePageChange = (p) => {
//     setPage(p);
//     setSelected([]);
//   };

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => { if (isMounted.current) setToast(null); }, 3200);
//   };

//   // ── Modal open / close ─────────────────────────────────────────

//   const openCreate = () => {
//     setForm(EMPTY_FORM);
//     setHeroFile(null); setHeroPreview(""); setRemoveHero(false);
//     setEditing(null); setActiveTab("content"); setModal("create");
//   };

//   const openEdit = (blog) => {
//     setForm({
//       title:           blog.title           || "",
//       slug:            blog.slug            || "",
//       excerpt:         blog.excerpt         || "",
//       content:         blog.content         || "",
//       category:        blog.category        || "General",
//       tags:            (blog.tags || []).join(", "),
//       status:          blog.status          || "draft",
//       metaTitle:       blog.metaTitle       || "",
//       metaDescription: blog.metaDescription || "",
//       focusKeyword:    blog.focusKeyword    || "",
//       sections:        blog.sections        || [],
//       faqs:            blog.faqs            || [],
//     });
//     setHeroFile(null);
//     setHeroPreview(blog.heroImage || "");
//     setRemoveHero(false);
//     setEditing(blog); setActiveTab("content"); setModal("edit");
//   };

//   const closeModal = () => {
//     setModal(false);
//     setEditing(null);
//   };

//   // ── Form helpers ───────────────────────────────────────────────

//   const handleTitleChange = (val) => {
//     const slug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
//     setForm(f => ({ ...f, title: val, ...(modal === "create" ? { slug } : {}) }));
//   };

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setHeroFile(file);
//     setHeroPreview(URL.createObjectURL(file));
//     setRemoveHero(false);
//   };

//   // ── Save ───────────────────────────────────────────────────────
//   // overrideStatus bypasses the form's current status value without
//   // a setState + re-render race (e.g. "Save as Draft" on a published post).
//   const handleSave = async (overrideStatus) => {
//     const finalForm = overrideStatus ? { ...form, status: overrideStatus } : form;

//     if (!finalForm.title || !finalForm.slug || !finalForm.excerpt || !finalForm.content) {
//       showToast("Title, slug, excerpt and content are required", "error");
//       return;
//     }

//     setSaving(true);
//     try {
//       const fd = new FormData();
//       Object.entries(finalForm).forEach(([k, v]) => {
//         if (["sections", "faqs"].includes(k)) fd.append(k, JSON.stringify(v));
//         else if (k === "tags") fd.append(k, JSON.stringify(v.split(",").map(t => t.trim()).filter(Boolean)));
//         else fd.append(k, v);
//       });

//       if (heroFile) {
//         fd.append("heroImage", heroFile);
//       } else if (removeHero) {
//         fd.append("removeHeroImage", "true");
//       }

//       if (modal === "create") {
//         await axios.post(API, fd);
//         showToast(finalForm.status === "published" ? "Post published" : "Draft saved");
//       } else {
//         await axios.put(`${API}/${editing._id}`, fd);
//         showToast("Changes saved");
//       }

//       if (!isMounted.current) return;
//       closeModal();
//       fetchBlogs({ pg: page, status: statusFilter, q: searchRef.current });
//     } catch (e) {
//       if (isMounted.current)
//         showToast(e.response?.data?.message || "Save failed", "error");
//     }

//     if (isMounted.current) setSaving(false);
//   };

//   // ── Row actions ────────────────────────────────────────────────

//   const handleArchive = async (id) => {
//     if (!window.confirm("Archive this post?")) return;
//     try {
//       await axios.patch(`${API}/${id}/archive`);
//       showToast("Post archived");
//       fetchBlogs({ pg: page, status: statusFilter, q: searchRef.current });
//     } catch {
//       showToast("Failed to archive", "error");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Permanently delete this post? This cannot be undone.")) return;
//     try {
//       await axios.delete(`${API}/${id}`);
//       showToast("Post deleted");
//       // Step back a page if we deleted the last item on a non-first page
//       const remainingOnPage = blogs.filter(b => b._id !== id).length;
//       const newPage = remainingOnPage === 0 && page > 1 ? page - 1 : page;
//       setPage(newPage);
//       setSelected(s => s.filter(x => x !== id));
//       fetchBlogs({ pg: newPage, status: statusFilter, q: searchRef.current });
//     } catch {
//       showToast("Failed to delete", "error");
//     }
//   };

//   // ── Sections ───────────────────────────────────────────────────

//   const addSection    = () => setForm(f => ({ ...f, sections: [...f.sections, { heading: "", content: "" }] }));
//   const updateSection = (i, k, v) => setForm(f => { const s = [...f.sections]; s[i] = { ...s[i], [k]: v }; return { ...f, sections: s }; });
//   const removeSection = (i) => setForm(f => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }));

//   // ── FAQs ───────────────────────────────────────────────────────

//   const addFaq    = () => setForm(f => ({ ...f, faqs: [...f.faqs, { question: "", answer: "" }] }));
//   const updateFaq = (i, k, v) => setForm(f => { const fa = [...f.faqs]; fa[i] = { ...fa[i], [k]: v }; return { ...f, faqs: fa }; });
//   const removeFaq = (i) => setForm(f => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) }));

//   // ── Selection ──────────────────────────────────────────────────

//   const allSelected = blogs.length > 0 && selected.length === blogs.length;
//   const toggleAll   = () => setSelected(allSelected ? [] : blogs.map(b => b._id));
//   const toggleOne   = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

//   // Extras tab badge — reflects current item count
//   const extrasLabel = `Extras${form.sections.length + form.faqs.length > 0 ? ` (${form.sections.length + form.faqs.length})` : ""}`;

//   // Main save button label — reflects actual status correctly
//   const mainBtnLabel = modal === "edit"
//     ? "Save Changes"
//     : form.status === "published" ? "Publish Post" : "Save Draft";

//   // ── Render ─────────────────────────────────────────────────────

//   return (
//     <>
//       <div className="flex min-h-screen bg-slate-50">
//         <div className="fixed top-0 left-0 h-screen z-40 shrink-0">
//           <Sidebar />
//         </div>

//         <div className="flex-1 ml-64 min-h-screen overflow-y-auto">
//           <div className="p-6 lg:p-8">

//             {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

//             {/* Header */}
//             <div className="flex items-start justify-between mb-6">
//               <div>
//                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Content</p>
//                 <h1 className="text-2xl font-bold text-slate-800">Blog Posts</h1>
//               </div>
//               <button
//                 onClick={openCreate}
//                 className="flex items-center gap-2 px-4 py-2.5 bg-[#154895] text-white text-sm font-semibold rounded-xl hover:bg-[#1240a0] active:scale-95 transition-all shadow-sm shadow-[#154895]/20">
//                 <Plus className="w-4 h-4" /> New Post
//               </button>
//             </div>

//             {/* Stat cards — server totals, independent of current page/filter */}
//             <div className="grid grid-cols-3 gap-4 mb-6">
//               <StatCard label="Total Posts" value={stats.total}     icon={BookOpen}    color="bg-blue-50 text-[#154895]" />
//               <StatCard label="Published"   value={stats.published} icon={CheckCircle} color="bg-emerald-50 text-emerald-600" />
//               <StatCard label="Drafts"      value={stats.draft}     icon={Clock}       color="bg-amber-50 text-amber-600" />
//             </div>

//             {/* Table card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

//               {/* Toolbar */}
//               <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
//                 <div className="relative flex-1 min-w-[180px]">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
//                   <input
//                     className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 placeholder:text-slate-300 outline-none focus:border-[#154895] focus:bg-white focus:ring-2 focus:ring-[#154895]/10 transition-all"
//                     placeholder="Search posts…"
//                     value={search}
//                     onChange={e => handleSearchChange(e.target.value)}
//                   />
//                 </div>
//                 <div className="relative">
//                   <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
//                   <select
//                     className="pl-8 pr-8 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 appearance-none transition-all cursor-pointer"
//                     value={statusFilter}
//                     onChange={e => handleStatusFilterChange(e.target.value)}>
//                     <option value="">All Status</option>
//                     <option value="published">Published</option>
//                     <option value="draft">Draft</option>
//                     <option value="archived">Archived</option>
//                   </select>
//                   <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
//                 </div>
//                 {selected.length > 0 && (
//                   <span className="text-xs font-semibold text-[#154895] bg-blue-50 px-3 py-1.5 rounded-lg">
//                     {selected.length} selected
//                   </span>
//                 )}
//               </div>

//               {/* Table / empty / loading */}
//               {loading ? (
//                 <div className="flex flex-col items-center justify-center py-20 gap-3">
//                   <Loader2 className="w-7 h-7 text-[#154895] animate-spin" />
//                   <p className="text-sm text-slate-400">Loading posts…</p>
//                 </div>
//               ) : blogs.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
//                   <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-1">
//                     <FileText className="w-7 h-7 text-slate-300" />
//                   </div>
//                   <p className="font-semibold text-slate-600">No posts found</p>
//                   <p className="text-sm text-slate-400 max-w-xs">
//                     {search || statusFilter ? "Try adjusting your search or filters." : "Start by creating your first blog post."}
//                   </p>
//                   {!search && !statusFilter && (
//                     <button onClick={openCreate}
//                       className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#154895] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors">
//                       <Plus className="w-4 h-4" /> Create Post
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-slate-50/80 border-b border-slate-100">
//                         <th className="w-10 px-4 py-3">
//                           <input
//                             type="checkbox"
//                             className="w-4 h-4 rounded border-slate-300 accent-[#154895] cursor-pointer"
//                             checked={allSelected}
//                             onChange={toggleAll}
//                           />
//                         </th>
//                         {["Post", "Category", "Status", "Published", "Actions"].map(h => (
//                           <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-50">
//                       {blogs.map(b => (
//                         <tr key={b._id} className="group hover:bg-slate-50/60 transition-colors">
//                           <td className="px-4 py-3.5">
//                             <input
//                               type="checkbox"
//                               className="w-4 h-4 rounded border-slate-300 accent-[#154895] cursor-pointer"
//                               checked={selected.includes(b._id)}
//                               onChange={() => toggleOne(b._id)}
//                             />
//                           </td>
//                           <td className="px-4 py-3.5">
//                             <div className="flex items-center gap-3">
//                               {b.heroImage
//                                 ? <img src={b.heroImage} alt="" className="w-12 h-9 object-cover rounded-lg shrink-0 border border-slate-100" />
//                                 : <div className="w-12 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
//                                     <Image className="w-4 h-4 text-slate-300" />
//                                   </div>
//                               }
//                               <div className="min-w-0">
//                                 <p className="text-sm font-semibold text-slate-800 truncate max-w-[200px]">{b.title}</p>
//                                 <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
//                                   <Link2 className="w-3 h-3" />/{b.slug}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-3.5">
//                             <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-[#154895] text-xs font-medium rounded-md">
//                               <Tag className="w-3 h-3" />{b.category}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3.5"><StatusBadge status={b.status} /></td>
//                           <td className="px-4 py-3.5 text-xs text-slate-400 font-medium">
//                             {b.publishedAt
//                               ? new Date(b.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
//                               : <span className="text-slate-300">—</span>}
//                           </td>
//                           <td className="px-4 py-3.5">
//                             <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
//                               <button
//                                 onClick={() => openEdit(b)}
//                                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#154895] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
//                                 <Edit2 className="w-3 h-3" /> Edit
//                               </button>
//                               {b.status !== "archived" && (
//                                 <button
//                                   onClick={() => handleArchive(b._id)}
//                                   className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
//                                   <Archive className="w-3 h-3" /> Archive
//                                 </button>
//                               )}
//                               <button
//                                 onClick={() => handleDelete(b._id)}
//                                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
//                                 <Trash2 className="w-3 h-3" /> Delete
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex items-center justify-center gap-1.5 px-5 py-4 border-t border-slate-100">
//                   <button
//                     onClick={() => handlePageChange(Math.max(1, page - 1))}
//                     disabled={page === 1}
//                     className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                     <ChevronLeft className="w-3.5 h-3.5" /> Prev
//                   </button>
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//                     <button key={p} onClick={() => handlePageChange(p)}
//                       className={`w-9 h-9 text-sm font-semibold rounded-lg transition-colors ${p === page ? "bg-[#154895] text-white shadow-sm" : "text-slate-500 border border-slate-200 hover:bg-slate-50"}`}>
//                       {p}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
//                     disabled={page === totalPages}
//                     className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                     Next <ChevronRight className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {modal && (
//         <div
//           className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto p-4 sm:p-8 bg-slate-900/50 backdrop-blur-sm"
//           onClick={e => e.target === e.currentTarget && closeModal()}>

//           <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl shadow-slate-900/20 overflow-hidden my-auto">

//             {/* Modal header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-xl bg-[#154895]/10 flex items-center justify-center">
//                   <PenLine className="w-4 h-4 text-[#154895]" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">
//                     {modal === "create" ? "New Post" : "Editing"}
//                   </p>
//                   <h2 className="text-base font-bold text-slate-800 leading-none truncate max-w-[300px]">
//                     {modal === "create" ? "Create Blog Post" : (form.title || "Blog Post")}
//                   </h2>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="relative">
//                   <select
//                     className="appearance-none pl-3 pr-7 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 outline-none focus:border-[#154895] cursor-pointer"
//                     value={form.status}
//                     onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
//                     <option value="draft">Draft</option>
//                     <option value="published">Published</option>
//                     <option value="archived">Archived</option>
//                   </select>
//                   <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
//                 </div>
//                 <button
//                   onClick={closeModal}
//                   className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
//                   <X className="w-4 h-4 text-slate-500" />
//                 </button>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="flex gap-1 px-6 pt-3 pb-0 border-b border-slate-100">
//               {TABS.map(({ id, icon: Icon }) => {
//                 const label = id === "extras" ? extrasLabel : id.charAt(0).toUpperCase() + id.slice(1);
//                 return (
//                   <button key={id} onClick={() => setActiveTab(id)}
//                     className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 -mb-px
//                       ${activeTab === id
//                         ? "text-[#154895] border-[#154895] bg-blue-50/50"
//                         : "text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50"}`}>
//                     <Icon className="w-3.5 h-3.5" />{label}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Tab content */}
//             <div className="p-6 max-h-[62vh] overflow-y-auto space-y-4">

//               {activeTab === "content" && (<>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="Title" hint="required" icon={Type}>
//                     <input
//                       className={inputCls}
//                       value={form.title}
//                       onChange={e => handleTitleChange(e.target.value)}
//                       placeholder="Post title"
//                     />
//                   </Field>
//                   <Field label="Slug" hint="required" icon={Hash}>
//                     <input
//                       className={inputCls}
//                       value={form.slug}
//                       onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
//                       placeholder="url-slug"
//                     />
//                   </Field>
//                 </div>
//                 <Field label="Excerpt" hint={`${form.excerpt.length}/300`} icon={AlignLeft}>
//                   <textarea
//                     className={textareaCls}
//                     style={{ height: 76 }}
//                     value={form.excerpt}
//                     placeholder="Short description shown in listings"
//                     onChange={e => setForm(f => ({ ...f, excerpt: e.target.value.slice(0, 300) }))}
//                   />
//                 </Field>
//                 <Field label="Content" hint="HTML or Markdown" icon={FileText}>
//                   <textarea
//                     className={`${textareaCls} font-mono text-xs`}
//                     style={{ height: 200 }}
//                     value={form.content}
//                     placeholder="Write your post content here…"
//                     onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
//                   />
//                 </Field>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="Category" icon={Tag}>
//                     <input
//                       className={inputCls}
//                       value={form.category}
//                       onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
//                       placeholder="General"
//                     />
//                   </Field>
//                   <Field label="Tags" hint="comma-separated" icon={Hash}>
//                     <input
//                       className={inputCls}
//                       value={form.tags}
//                       onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
//                       placeholder="recruitment, jobs, tips"
//                     />
//                   </Field>
//                 </div>
//               </>)}

//               {activeTab === "media" && (
//                 <Field label="Hero Image" icon={Image}>
//                   {heroPreview ? (
//                     <div className="relative rounded-xl overflow-hidden border border-slate-200">
//                       <img src={heroPreview} alt="Hero" className="w-full h-56 object-cover block" />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end gap-2 p-4">
//                         <button
//                           onClick={() => fileRef.current.click()}
//                           className="flex items-center gap-1.5 px-3 py-2 bg-white text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors">
//                           <Upload className="w-3.5 h-3.5" /> Replace
//                         </button>
//                         <button
//                           onClick={() => { setHeroFile(null); setHeroPreview(""); setRemoveHero(true); }}
//                           className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors">
//                           <Trash2 className="w-3.5 h-3.5" /> Remove
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => fileRef.current.click()}
//                       className="w-full border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-[#154895] hover:bg-blue-50/30 transition-all group cursor-pointer bg-transparent">
//                       <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mx-auto mb-3 transition-colors">
//                         <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#154895] transition-colors" />
//                       </div>
//                       <p className="text-sm font-semibold text-slate-500 group-hover:text-[#154895] transition-colors mb-1">
//                         Click to upload hero image
//                       </p>
//                       <p className="text-xs text-slate-300">PNG, JPG, WebP · Recommended 1200 × 630</p>
//                     </button>
//                   )}
//                   <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
//                 </Field>
//               )}

//               {activeTab === "seo" && (<>
//                 <div className="bg-white border border-slate-200 rounded-xl p-4">
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
//                     <Eye className="w-3 h-3" /> Search Preview
//                   </p>
//                   <p className="text-lg text-[#1a0dab] font-medium truncate mb-0.5">
//                     {form.metaTitle || form.title || "Post title will appear here"}
//                   </p>
//                   <p className="text-xs text-[#006621] mb-1.5">
//                     yourdomain.com › blog › {form.slug || "post-slug"}
//                   </p>
//                   <p className="text-sm text-[#545454] leading-relaxed line-clamp-2">
//                     {form.metaDescription || form.excerpt || "Meta description will appear here in search results."}
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Field label="Meta Title" hint={`${form.metaTitle.length}/60`} icon={Type}>
//                     <input
//                       className={inputCls}
//                       value={form.metaTitle}
//                       onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value.slice(0, 60) }))}
//                       placeholder="SEO title"
//                     />
//                   </Field>
//                   <Field label="Focus Keyword" icon={Search}>
//                     <input
//                       className={inputCls}
//                       value={form.focusKeyword}
//                       onChange={e => setForm(f => ({ ...f, focusKeyword: e.target.value }))}
//                       placeholder="Primary keyword"
//                     />
//                   </Field>
//                 </div>
//                 <Field label="Meta Description" hint={`${form.metaDescription.length}/160`} icon={AlignLeft}>
//                   <textarea
//                     className={textareaCls}
//                     style={{ height: 80 }}
//                     value={form.metaDescription}
//                     placeholder="Description shown in search results"
//                     onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value.slice(0, 160) }))}
//                   />
//                 </Field>
//               </>)}

//               {activeTab === "extras" && (
//                 <div className="space-y-6">
//                   {/* Sections */}
//                   <div>
//                     <div className="flex items-center justify-between mb-3">
//                       <div>
//                         <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
//                           <LayoutList className="w-4 h-4 text-slate-400" /> Sections
//                         </p>
//                         <p className="text-xs text-slate-400 mt-0.5">Additional structured content blocks</p>
//                       </div>
//                       <button
//                         onClick={addSection}
//                         className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#154895] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
//                         <Plus className="w-3.5 h-3.5" /> Add Section
//                       </button>
//                     </div>
//                     {form.sections.length === 0
//                       ? <p className="text-center text-sm text-slate-300 py-6">No sections yet.</p>
//                       : form.sections.map((sec, i) => (
//                           <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3 last:mb-0">
//                             <div className="flex items-center justify-between mb-3">
//                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section {i + 1}</span>
//                               <button
//                                 onClick={() => removeSection(i)}
//                                 className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
//                                 <X className="w-3 h-3" /> Remove
//                               </button>
//                             </div>
//                             <input
//                               className={`${inputCls} mb-2.5`}
//                               placeholder="Heading"
//                               value={sec.heading}
//                               onChange={e => updateSection(i, "heading", e.target.value)}
//                             />
//                             <textarea
//                               className={textareaCls}
//                               style={{ height: 80 }}
//                               placeholder="Content"
//                               value={sec.content}
//                               onChange={e => updateSection(i, "content", e.target.value)}
//                             />
//                           </div>
//                         ))
//                     }
//                   </div>

//                   {/* FAQs */}
//                   <div>
//                     <div className="flex items-center justify-between mb-3">
//                       <div>
//                         <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
//                           <HelpCircle className="w-4 h-4 text-slate-400" /> FAQs
//                         </p>
//                         <p className="text-xs text-slate-400 mt-0.5">Structured Q&A — improves SEO rich snippets</p>
//                       </div>
//                       <button
//                         onClick={addFaq}
//                         className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#154895] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
//                         <Plus className="w-3.5 h-3.5" /> Add FAQ
//                       </button>
//                     </div>
//                     {form.faqs.length === 0
//                       ? <p className="text-center text-sm text-slate-300 py-6">No FAQs yet.</p>
//                       : form.faqs.map((faq, i) => (
//                           <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3 last:mb-0">
//                             <div className="flex items-center justify-between mb-3">
//                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">FAQ {i + 1}</span>
//                               <button
//                                 onClick={() => removeFaq(i)}
//                                 className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
//                                 <X className="w-3 h-3" /> Remove
//                               </button>
//                             </div>
//                             <input
//                               className={`${inputCls} mb-2.5`}
//                               placeholder="Question"
//                               value={faq.question}
//                               onChange={e => updateFaq(i, "question", e.target.value)}
//                             />
//                             <textarea
//                               className={textareaCls}
//                               style={{ height: 80 }}
//                               placeholder="Answer"
//                               value={faq.answer}
//                               onChange={e => updateFaq(i, "answer", e.target.value)}
//                             />
//                           </div>
//                         ))
//                     }
//                   </div>
//                 </div>
//               )}
//             </div>

       
//             <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2.5 text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
//                 Cancel
//               </button>
//               <div className="flex items-center gap-2">
              
//                 {form.status === "published" && (
//                   <button
//                     onClick={() => handleSave("draft")}
//                     disabled={saving}
//                     className="px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 disabled:opacity-60 transition-colors">
//                     Save as Draft
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleSave()}
//                   disabled={saving}
//                   className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#154895] rounded-xl hover:bg-[#1240a0] disabled:opacity-60 active:scale-95 transition-all shadow-sm shadow-[#154895]/25">
//                   {saving
//                     ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
//                     : <><Check className="w-4 h-4" /> {mainBtnLabel}</>
//                   }
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }


import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "../../Axios/Axios";
import Sidebar from "./Dashboard";
import {
  Plus, Search, Filter, Edit2, Archive, Trash2, X, Upload,
  Image, FileText, Globe, ChevronDown, ChevronLeft, ChevronRight,
  CheckCircle, AlertCircle, Loader2, Eye, BookOpen, PenLine,
  LayoutList, HelpCircle, Tag, Hash, AlignLeft, Type, Link2,
  Clock, Check,
} from "lucide-react";

const API = "/blog";

const EMPTY_FORM = {
  title: "", slug: "", excerpt: "", content: "",
  category: "General", tags: "", status: "draft",
  metaTitle: "", metaDescription: "", focusKeyword: "",
  sections: [], faqs: [],
};

const TABS = [
  { id: "content", label: "Content", icon: PenLine },
  { id: "media",   label: "Media",   icon: Image },
  { id: "seo",     label: "SEO",     icon: Globe },
  { id: "extras",  label: "Extras",  icon: LayoutList },
];

// ── Pure components ────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const map = {
    published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    draft:     "bg-amber-50 text-amber-700 ring-amber-600/20",
    archived:  "bg-red-50 text-red-700 ring-red-600/20",
  };
  const dot = {
    published: "bg-emerald-500",
    draft:     "bg-amber-400",
    archived:  "bg-red-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 ring-inset capitalize ${map[status] || map.draft}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status] || dot.draft}`} />
      {status}
    </span>
  );
};

const Toast = ({ msg, type, onClose }) => (
  <div
    className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-white text-sm font-semibold ${type === "error" ? "bg-red-600" : "bg-[#154895]"}`}
    style={{ animation: "slideUp .25s ease" }}
  >
    <style>{`@keyframes slideUp{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    {type === "error"
      ? <AlertCircle className="w-4 h-4 shrink-0" />
      : <CheckCircle className="w-4 h-4 shrink-0" />
    }
    {msg}
    <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100 transition-opacity">
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

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-2xl font-bold text-slate-800 leading-none">{value}</div>
      <div className="text-xs text-slate-400 font-medium mt-1">{label}</div>
    </div>
  </div>
);

const inputCls    = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 bg-white placeholder:text-slate-300 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all";
const textareaCls = `${inputCls} resize-y leading-relaxed`;

// ── Main component ─────────────────────────────────────────────

export default function BlogAdmin() {
  const [blogs, setBlogs]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [modal, setModal]               = useState(false);   // false | "create" | "edit"
  const [editing, setEditing]           = useState(null);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [heroFile, setHeroFile]         = useState(null);
  const [heroPreview, setHeroPreview]   = useState("");
  const [removeHero, setRemoveHero]     = useState(false);
  const [saving, setSaving]             = useState(false);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage]                 = useState(1);
  const [totalPages, setTotalPages]     = useState(1);
  const [toast, setToast]               = useState(null);
  const [activeTab, setActiveTab]       = useState("content");
  const [selected, setSelected]         = useState([]);
  const [stats, setStats]               = useState({ total: 0, published: 0, draft: 0 });

  const fileRef       = useRef();
  const searchTimeout = useRef();
  const isMounted     = useRef(true);
  const searchRef     = useRef(search);

  useEffect(() => { searchRef.current = search; }, [search]);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  // ── Fetch ──────────────────────────────────────────────────────

  const fetchBlogs = useCallback(async ({ pg, status, q } = {}) => {
    setLoading(true);
    try {
      const params = { page: pg, limit: 8 };
      if (q)      params.search = q;
      if (status) params.status = status;

      const { data } = await axios.get(`${API}/admin/all`, { params });

      if (!isMounted.current) return;
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
      setStats({
        total:     data.count,
        published: data.publishedCount ?? 0,
        draft:     data.draftCount     ?? 0,
      });
    } catch {
      if (isMounted.current) showToast("Failed to load blogs", "error");
    }
    if (isMounted.current) setLoading(false);
  }, []);

  useEffect(() => {
    fetchBlogs({ pg: page, status: statusFilter, q: searchRef.current });
  }, [page, statusFilter, fetchBlogs]);

  // ── Search — debounced ─────────────────────────────────────────

  const handleSearchChange = (val) => {
    setSearch(val);
    searchRef.current = val;
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchBlogs({ pg: 1, status: statusFilter, q: val });
    }, 350);
  };

  const handleStatusFilterChange = (val) => {
    setStatusFilter(val);
    setPage(1);
    setSelected([]);
    fetchBlogs({ pg: 1, status: val, q: searchRef.current });
  };

  const handlePageChange = (p) => {
    setPage(p);
    setSelected([]);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => { if (isMounted.current) setToast(null); }, 3200);
  };

  // ── Modal ──────────────────────────────────────────────────────

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setHeroFile(null); setHeroPreview(""); setRemoveHero(false);
    setEditing(null); setActiveTab("content"); setModal("create");
  };

  const openEdit = (blog) => {
    setForm({
      title:           blog.title           || "",
      slug:            blog.slug            || "",
      excerpt:         blog.excerpt         || "",
      content:         blog.content         || "",
      category:        blog.category        || "General",
      tags:            (blog.tags || []).join(", "),
      status:          blog.status          || "draft",
      metaTitle:       blog.metaTitle       || "",
      metaDescription: blog.metaDescription || "",
      focusKeyword:    blog.focusKeyword    || "",
      sections:        blog.sections        || [],
      faqs:            blog.faqs            || [],
    });
    setHeroFile(null);
    setHeroPreview(blog.heroImage || "");
    setRemoveHero(false);
    setEditing(blog); setActiveTab("content"); setModal("edit");
  };

  const closeModal = () => {
    setModal(false);
    setEditing(null);
  };

  // ── Form helpers ───────────────────────────────────────────────

  const handleTitleChange = (val) => {
    const slug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setForm(f => ({ ...f, title: val, ...(modal === "create" ? { slug } : {}) }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHeroFile(file);
    setHeroPreview(URL.createObjectURL(file));
    setRemoveHero(false);
  };

  // ── Save ───────────────────────────────────────────────────────

  const handleSave = async (overrideStatus) => {
    const finalForm = overrideStatus ? { ...form, status: overrideStatus } : form;

    if (!finalForm.title || !finalForm.slug || !finalForm.excerpt || !finalForm.content) {
      showToast("Title, slug, excerpt and content are required", "error");
      return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(finalForm).forEach(([k, v]) => {
        if (["sections", "faqs"].includes(k)) fd.append(k, JSON.stringify(v));
        else if (k === "tags") fd.append(k, JSON.stringify(v.split(",").map(t => t.trim()).filter(Boolean)));
        else fd.append(k, v);
      });

      if (heroFile) {
        fd.append("heroImage", heroFile);
      } else if (removeHero) {
        fd.append("removeHeroImage", "true");
      }

      if (modal === "create") {
        await axios.post(API, fd);
        showToast(finalForm.status === "published" ? "Post published" : "Draft saved");
      } else {
        await axios.put(`${API}/${editing._id}`, fd);
        showToast("Changes saved");
      }

      if (!isMounted.current) return;
      closeModal();
      fetchBlogs({ pg: page, status: statusFilter, q: searchRef.current });
    } catch (e) {
      if (isMounted.current)
        showToast(e.response?.data?.message || "Save failed", "error");
    }

    if (isMounted.current) setSaving(false);
  };

  // ── Row actions ────────────────────────────────────────────────

  const handleArchive = async (id) => {
    if (!window.confirm("Archive this post?")) return;
    try {
      await axios.patch(`${API}/${id}/archive`);
      showToast("Post archived");
      fetchBlogs({ pg: page, status: statusFilter, q: searchRef.current });
    } catch {
      showToast("Failed to archive", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this post? This cannot be undone.")) return;
    try {
      await axios.delete(`${API}/${id}`);
      showToast("Post deleted");
      const remainingOnPage = blogs.filter(b => b._id !== id).length;
      const newPage = remainingOnPage === 0 && page > 1 ? page - 1 : page;
      setPage(newPage);
      setSelected(s => s.filter(x => x !== id));
      fetchBlogs({ pg: newPage, status: statusFilter, q: searchRef.current });
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  // ── Sections ───────────────────────────────────────────────────

  const addSection    = () => setForm(f => ({ ...f, sections: [...f.sections, { heading: "", content: "" }] }));
  const updateSection = (i, k, v) => setForm(f => { const s = [...f.sections]; s[i] = { ...s[i], [k]: v }; return { ...f, sections: s }; });
  const removeSection = (i) => setForm(f => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }));

  // ── FAQs ───────────────────────────────────────────────────────

  const addFaq    = () => setForm(f => ({ ...f, faqs: [...f.faqs, { question: "", answer: "" }] }));
  const updateFaq = (i, k, v) => setForm(f => { const fa = [...f.faqs]; fa[i] = { ...fa[i], [k]: v }; return { ...f, faqs: fa }; });
  const removeFaq = (i) => setForm(f => ({ ...f, faqs: f.faqs.filter((_, idx) => idx !== i) }));

  // ── Selection ──────────────────────────────────────────────────

  const allSelected = blogs.length > 0 && selected.length === blogs.length;
  const toggleAll   = () => setSelected(allSelected ? [] : blogs.map(b => b._id));
  const toggleOne   = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const extrasLabel  = `Extras${form.sections.length + form.faqs.length > 0 ? ` (${form.sections.length + form.faqs.length})` : ""}`;
  const mainBtnLabel = modal === "edit"
    ? "Save Changes"
    : form.status === "published" ? "Publish Post" : "Save Draft";

  // ── Render ─────────────────────────────────────────────────────

  return (
    <>
      <div className="flex min-h-screen bg-slate-50">
        <div className="fixed top-0 left-0 h-screen z-40 shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 ml-64 min-h-screen overflow-y-auto">
          <div className="p-6 lg:p-8">

            {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Content</p>
                <h1 className="text-2xl font-bold text-slate-800">Blog Posts</h1>
              </div>
              <button
                onClick={openCreate}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#154895] text-white text-sm font-semibold rounded-xl hover:bg-[#1240a0] active:scale-95 transition-all shadow-sm shadow-[#154895]/20">
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard label="Total Posts" value={stats.total}     icon={BookOpen}    color="bg-blue-50 text-[#154895]" />
              <StatCard label="Published"   value={stats.published} icon={CheckCircle} color="bg-emerald-50 text-emerald-600" />
              <StatCard label="Drafts"      value={stats.draft}     icon={Clock}       color="bg-amber-50 text-amber-600" />
            </div>

            {/* Table card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                  <input
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 placeholder:text-slate-300 outline-none focus:border-[#154895] focus:bg-white focus:ring-2 focus:ring-[#154895]/10 transition-all"
                    placeholder="Search posts…"
                    value={search}
                    onChange={e => handleSearchChange(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                  <select
                    className="pl-8 pr-8 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-600 outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 appearance-none transition-all cursor-pointer"
                    value={statusFilter}
                    onChange={e => handleStatusFilterChange(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none" />
                </div>
                {selected.length > 0 && (
                  <span className="text-xs font-semibold text-[#154895] bg-blue-50 px-3 py-1.5 rounded-lg">
                    {selected.length} selected
                  </span>
                )}
              </div>

              {/* Table / empty / loading */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="w-7 h-7 text-[#154895] animate-spin" />
                  <p className="text-sm text-slate-400">Loading posts…</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-1">
                    <FileText className="w-7 h-7 text-slate-300" />
                  </div>
                  <p className="font-semibold text-slate-600">No posts found</p>
                  <p className="text-sm text-slate-400 max-w-xs">
                    {search || statusFilter ? "Try adjusting your search or filters." : "Start by creating your first blog post."}
                  </p>
                  {!search && !statusFilter && (
                    <button onClick={openCreate}
                      className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#154895] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors">
                      <Plus className="w-4 h-4" /> Create Post
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-100">
                        <th className="w-10 px-4 py-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 accent-[#154895] cursor-pointer"
                            checked={allSelected}
                            onChange={toggleAll}
                          />
                        </th>
                        {["Post", "Category", "Status", "Published", "Actions"].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {blogs.map(b => (
                        <tr key={b._id} className="group hover:bg-slate-50/60 transition-colors">
                          <td className="px-4 py-3.5">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-slate-300 accent-[#154895] cursor-pointer"
                              checked={selected.includes(b._id)}
                              onChange={() => toggleOne(b._id)}
                            />
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              {b.heroImage
                                ? <img src={b.heroImage} alt="" className="w-12 h-9 object-cover rounded-lg shrink-0 border border-slate-100" />
                                : <div className="w-12 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                    <Image className="w-4 h-4 text-slate-300" />
                                  </div>
                              }
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate max-w-[200px]">{b.title}</p>
                                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                  <Link2 className="w-3 h-3" />/{b.slug}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-[#154895] text-xs font-medium rounded-md">
                              <Tag className="w-3 h-3" />{b.category}
                            </span>
                          </td>
                          <td className="px-4 py-3.5"><StatusBadge status={b.status} /></td>
                          <td className="px-4 py-3.5 text-xs text-slate-400 font-medium">
                            {b.publishedAt
                              ? new Date(b.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                              : <span className="text-slate-300">—</span>}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => openEdit(b)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#154895] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <Edit2 className="w-3 h-3" /> Edit
                              </button>
                              {b.status !== "archived" && (
                                <button
                                  onClick={() => handleArchive(b._id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                                  <Archive className="w-3 h-3" /> Archive
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(b._id)}
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
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 px-5 py-4 border-t border-slate-100">
                  <button
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => handlePageChange(p)}
                      className={`w-9 h-9 text-sm font-semibold rounded-lg transition-colors ${p === page ? "bg-[#154895] text-white shadow-sm" : "text-slate-500 border border-slate-200 hover:bg-slate-50"}`}>
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto p-4 sm:p-8 bg-slate-900/50 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && closeModal()}>

          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl shadow-slate-900/20 overflow-hidden my-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#154895]/10 flex items-center justify-center">
                  <PenLine className="w-4 h-4 text-[#154895]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">
                    {modal === "create" ? "New Post" : "Editing"}
                  </p>
                  <h2 className="text-base font-bold text-slate-800 leading-none truncate max-w-[300px]">
                    {modal === "create" ? "Create Blog Post" : (form.title || "Blog Post")}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-7 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 outline-none focus:border-[#154895] cursor-pointer"
                    value={form.status}
                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 pt-3 pb-0 border-b border-slate-100">
              {TABS.map(({ id, icon: Icon }) => {
                const label = id === "extras" ? extrasLabel : id.charAt(0).toUpperCase() + id.slice(1);
                return (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 -mb-px
                      ${activeTab === id
                        ? "text-[#154895] border-[#154895] bg-blue-50/50"
                        : "text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50"}`}>
                    <Icon className="w-3.5 h-3.5" />{label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="p-6 max-h-[62vh] overflow-y-auto space-y-4">

              {activeTab === "content" && (<>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title" hint="required" icon={Type}>
                    <input
                      className={inputCls}
                      value={form.title}
                      onChange={e => handleTitleChange(e.target.value)}
                      placeholder="Post title"
                    />
                  </Field>
                  <Field label="Slug" hint="required" icon={Hash}>
                    <input
                      className={inputCls}
                      value={form.slug}
                      onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                      placeholder="url-slug"
                    />
                  </Field>
                </div>
                <Field label="Excerpt" hint={`${form.excerpt.length}/300`} icon={AlignLeft}>
                  <textarea
                    className={textareaCls}
                    style={{ height: 76 }}
                    value={form.excerpt}
                    placeholder="Short description shown in listings"
                    onChange={e => setForm(f => ({ ...f, excerpt: e.target.value.slice(0, 300) }))}
                  />
                </Field>
                <Field label="Content" hint="HTML or Markdown" icon={FileText}>
                  <textarea
                    className={`${textareaCls} font-mono text-xs`}
                    style={{ height: 200 }}
                    value={form.content}
                    placeholder="Write your post content here…"
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Category" icon={Tag}>
                    <input
                      className={inputCls}
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      placeholder="General"
                    />
                  </Field>
                  <Field label="Tags" hint="comma-separated" icon={Hash}>
                    <input
                      className={inputCls}
                      value={form.tags}
                      onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                      placeholder="recruitment, jobs, tips"
                    />
                  </Field>
                </div>
              </>)}

              {activeTab === "media" && (
                <Field label="Hero Image" icon={Image}>
                  {heroPreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200">
                      <img src={heroPreview} alt="Hero" className="w-full h-56 object-cover block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end gap-2 p-4">
                        <button
                          onClick={() => fileRef.current.click()}
                          className="flex items-center gap-1.5 px-3 py-2 bg-white text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                          <Upload className="w-3.5 h-3.5" /> Replace
                        </button>
                        <button
                          onClick={() => { setHeroFile(null); setHeroPreview(""); setRemoveHero(true); }}
                          className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileRef.current.click()}
                      className="w-full border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-[#154895] hover:bg-blue-50/30 transition-all group cursor-pointer bg-transparent">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mx-auto mb-3 transition-colors">
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#154895] transition-colors" />
                      </div>
                      <p className="text-sm font-semibold text-slate-500 group-hover:text-[#154895] transition-colors mb-1">
                        Click to upload hero image
                      </p>
                      <p className="text-xs text-slate-300">PNG, JPG, WebP · Recommended 1200 × 630</p>
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                </Field>
              )}

              {activeTab === "seo" && (<>
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Eye className="w-3 h-3" /> Search Preview
                  </p>
                  <p className="text-lg text-[#1a0dab] font-medium truncate mb-0.5">
                    {form.metaTitle || form.title || "Post title will appear here"}
                  </p>
                  <p className="text-xs text-[#006621] mb-1.5">
                    yourdomain.com › blog › {form.slug || "post-slug"}
                  </p>
                  <p className="text-sm text-[#545454] leading-relaxed line-clamp-2">
                    {form.metaDescription || form.excerpt || "Meta description will appear here in search results."}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Meta Title" hint={`${form.metaTitle.length}/60`} icon={Type}>
                    <input
                      className={inputCls}
                      value={form.metaTitle}
                      onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value.slice(0, 60) }))}
                      placeholder="SEO title"
                    />
                  </Field>
                  <Field label="Focus Keyword" icon={Search}>
                    <input
                      className={inputCls}
                      value={form.focusKeyword}
                      onChange={e => setForm(f => ({ ...f, focusKeyword: e.target.value }))}
                      placeholder="Primary keyword"
                    />
                  </Field>
                </div>
                <Field label="Meta Description" hint={`${form.metaDescription.length}/160`} icon={AlignLeft}>
                  <textarea
                    className={textareaCls}
                    style={{ height: 80 }}
                    value={form.metaDescription}
                    placeholder="Description shown in search results"
                    onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value.slice(0, 160) }))}
                  />
                </Field>
              </>)}

              {activeTab === "extras" && (
                <div className="space-y-6">
                  {/* Sections */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                          <LayoutList className="w-4 h-4 text-slate-400" /> Sections
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">Additional structured content blocks</p>
                      </div>
                      <button
                        onClick={addSection}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#154895] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Section
                      </button>
                    </div>
                    {form.sections.length === 0
                      ? <p className="text-center text-sm text-slate-300 py-6">No sections yet.</p>
                      : form.sections.map((sec, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3 last:mb-0">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section {i + 1}</span>
                              <button
                                onClick={() => removeSection(i)}
                                className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                                <X className="w-3 h-3" /> Remove
                              </button>
                            </div>
                            <input
                              className={`${inputCls} mb-2.5`}
                              placeholder="Heading"
                              value={sec.heading}
                              onChange={e => updateSection(i, "heading", e.target.value)}
                            />
                            <textarea
                              className={textareaCls}
                              style={{ height: 80 }}
                              placeholder="Content"
                              value={sec.content}
                              onChange={e => updateSection(i, "content", e.target.value)}
                            />
                          </div>
                        ))
                    }
                  </div>

                  {/* FAQs */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-slate-400" /> FAQs
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">Structured Q&A — improves SEO rich snippets</p>
                      </div>
                      <button
                        onClick={addFaq}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#154895] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add FAQ
                      </button>
                    </div>
                    {form.faqs.length === 0
                      ? <p className="text-center text-sm text-slate-300 py-6">No FAQs yet.</p>
                      : form.faqs.map((faq, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-3 last:mb-0">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">FAQ {i + 1}</span>
                              <button
                                onClick={() => removeFaq(i)}
                                className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                                <X className="w-3 h-3" /> Remove
                              </button>
                            </div>
                            <input
                              className={`${inputCls} mb-2.5`}
                              placeholder="Question"
                              value={faq.question}
                              onChange={e => updateFaq(i, "question", e.target.value)}
                            />
                            <textarea
                              className={textareaCls}
                              style={{ height: 80 }}
                              placeholder="Answer"
                              value={faq.answer}
                              onChange={e => updateFaq(i, "answer", e.target.value)}
                            />
                          </div>
                        ))
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <div className="flex items-center gap-2">
                {form.status === "published" && (
                  <button
                    onClick={() => handleSave("draft")}
                    disabled={saving}
                    className="px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 disabled:opacity-60 transition-colors">
                    Save as Draft
                  </button>
                )}
                <button
                  onClick={() => handleSave()}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#154895] rounded-xl hover:bg-[#1240a0] disabled:opacity-60 active:scale-95 transition-all shadow-sm shadow-[#154895]/25">
                  {saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                    : <><Check className="w-4 h-4" /> {mainBtnLabel}</>
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