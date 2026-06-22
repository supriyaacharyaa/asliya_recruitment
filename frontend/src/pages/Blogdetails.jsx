// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import DOMPurify from "dompurify";
// import axios from "../Axios/Axios";
// import {
//   ArrowLeft,
//   Calendar,
//   Clock,
//   Tag,
//   ChevronDown,
//   ChevronUp,
//   Loader2,
//   BookOpen,
//   ArrowRight,
//   Share2,
//   Copy,
//   Check,
//   LayoutList,
//   HelpCircle,
//   Hash,
// } from "lucide-react";

// const API = "/blog";

// // ── Helpers ────────────────────────────────────────────────────

// const readTime = (content = "") => {
//   if (typeof content !== "string") return 1;
//   return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
// };

// const fmtDate = (d) =>
//   d
//     ? new Date(d).toLocaleDateString("en-GB", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       })
//     : "";

// /**
//  * Sanitize HTML before injecting via dangerouslySetInnerHTML.
//  * DOMPurify strips <script>, event handlers, javascript: hrefs, etc.
//  * while leaving all safe formatting tags intact.
//  */
// const sanitize = (html = "") =>
//   DOMPurify.sanitize(html, {
//     USE_PROFILES: { html: true },
//     ADD_ATTR: ["target", "rel"],
//   });

// // ── Shared prose classes ───────────────────────────────────────

// const proseClasses = `
//   prose prose-slate prose-sm md:prose-base max-w-none
//   prose-headings:font-bold prose-headings:text-slate-800
//   prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
//   prose-p:text-slate-600 prose-p:leading-relaxed
//   prose-a:text-[#154895] prose-a:no-underline hover:prose-a:underline
//   prose-strong:text-slate-800
//   prose-ul:text-slate-600 prose-ul:list-disc prose-ul:pl-5
//   prose-ol:text-slate-600 prose-ol:list-decimal prose-ol:pl-5
//   prose-li:my-1
//   prose-blockquote:border-[#154895] prose-blockquote:text-slate-500
//   prose-img:rounded-xl prose-img:shadow-md
//   prose-hr:border-slate-100
//   prose-table:text-sm
//   prose-th:text-slate-700 prose-th:font-semibold
//   prose-td:text-slate-600
// `.trim();

// // ── Sub-components ─────────────────────────────────────────────

// const FaqItem = ({ faq, index }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border border-slate-100 rounded-xl overflow-hidden">
//       <button
//         onClick={() => setOpen((o) => !o)}
//         className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
//       >
//         <span className="text-sm font-semibold text-slate-800 pr-4 flex items-start gap-3">
//           <span className="mt-0.5 w-5 h-5 rounded-full bg-[#154895]/10 text-[#154895] text-[10px] font-bold flex items-center justify-center shrink-0">
//             {index + 1}
//           </span>
//           {faq.question}
//         </span>
//         {open ? (
//           <ChevronUp className="w-4 h-4 text-[#154895] shrink-0" />
//         ) : (
//           <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
//         )}
//       </button>
//       {open && (
//         <div className="px-5 pb-5 pt-3 bg-blue-50/30 border-t border-slate-100">
//           <p className="text-sm text-slate-600 leading-relaxed pl-8">{faq.answer}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const SectionBlock = ({ section, index }) => (
//   <div className="mt-10">
//     <h2
//       className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"
//       style={{ fontFamily: "'Playfair Display', serif" }}
//     >
//       <span className="w-1 h-6 rounded-full bg-[#154895] inline-block shrink-0" />
//       {section.heading}
//     </h2>
//     <div
//       className={proseClasses}
//       dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
//     />
//   </div>
// );

// const RelatedCard = ({ blog, onClick }) => (
//   <article
//     onClick={onClick}
//     className="group flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
//   >
//     <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
//       {blog.heroImage ? (
//         <img
//           src={blog.heroImage}
//           alt={blog.title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//       ) : (
//         <div className="w-full h-full flex items-center justify-center">
//           <BookOpen className="w-5 h-5 text-slate-300" />
//         </div>
//       )}
//     </div>
//     <div className="min-w-0 flex-1">
//       <p className="text-xs text-[#154895] font-semibold mb-1">{blog.category}</p>
//       <h4
//         className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#154895] transition-colors"
//         style={{ fontFamily: "'Playfair Display', serif" }}
//       >
//         {blog.title}
//       </h4>
//       <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
//         <Clock className="w-3 h-3" />
//         {readTime(blog.excerpt || blog.content)} min read
//       </p>
//     </div>
//   </article>
// );

// // Copy-link button for share
// const CopyLinkButton = () => {
//   const [copied, setCopied] = useState(false);
//   const handleCopy = () => {
//     navigator.clipboard.writeText(window.location.href).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };
//   return (
//     <button
//       onClick={handleCopy}
//       className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
//     >
//       {copied ? (
//         <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied!</>
//       ) : (
//         <><Copy className="w-3.5 h-3.5" /> Copy link</>
//       )}
//     </button>
//   );
// };

// // ── Page ───────────────────────────────────────────────────────

// export default function BlogDetailPage() {
//   const { slug }  = useParams();
//   const navigate  = useNavigate();

//   const [blog, setBlog]       = useState(null);
//   const [related, setRelated] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState(false);

//   const isMounted = useRef(true);
//   useEffect(() => {
//     isMounted.current = true;
//     return () => { isMounted.current = false; };
//   }, []);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" });

//     const load = async () => {
//       setLoading(true);
//       setError(false);
//       setBlog(null);
//       setRelated([]);

//       try {
//         const { data } = await axios.get(`${API}/slug/${slug}`);

//         // Fetch related posts by same category
//         const rel = await axios.get(API, {
//           params: { category: data.blog.category, limit: 4 },
//         });

//         if (!isMounted.current) return;

//         setBlog(data.blog);
//         setRelated(rel.data.blogs.filter((b) => b.slug !== slug).slice(0, 3));
//       } catch {
//         if (isMounted.current) setError(true);
//       }

//       if (isMounted.current) setLoading(false);
//     };

//     load();
//   }, [slug]);

//   // ── Loading state ──────────────────────────────────────────────

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="w-8 h-8 text-[#154895] animate-spin" />
//           <p className="text-sm text-slate-400 font-medium">Loading article…</p>
//         </div>
//       </div>
//     );

//   // ── Error / not found state ────────────────────────────────────

//   if (error || !blog)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="text-center px-6">
//           <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
//             <BookOpen className="w-9 h-9 text-slate-300" />
//           </div>
//           <h2 className="text-xl font-bold text-slate-700 mb-2">Article not found</h2>
//           <p className="text-slate-400 text-sm mb-6">
//             This article may have been removed or the link is incorrect.
//           </p>
//           <button
//             onClick={() => navigate("/blog")}
//             className="px-5 py-2.5 bg-[#154895] text-white text-sm font-semibold rounded-xl hover:bg-[#1240a0] transition-colors"
//           >
//             Back to Blog
//           </button>
//         </div>
//       </div>
//     );

//   // ── Render ─────────────────────────────────────────────────────

//   const hasSections = blog.sections?.length > 0;
//   const hasFaqs     = blog.faqs?.length > 0;
//   const hasTags     = blog.tags?.length > 0;

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ── Hero Banner ─────────────────────────────────────────── */}
//       <div className="relative bg-slate-900 overflow-hidden" style={{ height: 480 }}>
//         {blog.heroImage && (
//           <img
//             src={blog.heroImage}
//             alt={blog.title}
//             className="absolute inset-0 w-full h-full object-cover opacity-50"
//           />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-900/20" />

//         {/* Back button */}
//         <div className="absolute top-6 left-0 right-0 max-w-6xl mx-auto px-6">
//           <button
//             onClick={() => navigate("/blog")}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/20 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4" /> All Articles
//           </button>
//         </div>

//         {/* Hero text */}
//         <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-10">
//           <div className="flex items-center gap-2 mb-4">
//             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#154895] text-white uppercase tracking-wider">
//               <Tag className="w-2.5 h-2.5" />
//               {blog.category}
//             </span>
//           </div>
//           <h1
//             className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl"
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           >
//             {blog.title}
//           </h1>
//           <div className="flex flex-wrap items-center gap-5 mt-5 text-white/50 text-sm font-medium">
//             <span className="flex items-center gap-1.5">
//               <Calendar className="w-4 h-4" />
//               {fmtDate(blog.publishedAt)}
//             </span>
//             <span className="flex items-center gap-1.5">
//               <Clock className="w-4 h-4" />
//               {readTime(blog.content)} min read
//             </span>
//             {blog.focusKeyword && (
//               <span className="flex items-center gap-1.5 text-white/40">
//                 <Hash className="w-3.5 h-3.5" />{blog.focusKeyword}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── Body ────────────────────────────────────────────────── */}
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

//           {/* ── Main Content Column ──────────────────────────────── */}
//           <div>

//             {/* Share row */}
//             <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
//               <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
//                 <Share2 className="w-3.5 h-3.5" /> Share this article
//               </p>
//               <div className="flex items-center gap-2">
//                 {/* Twitter/X */}
//                 <a
//                   href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
//                 >
//                   𝕏 Twitter
//                 </a>
//                 {/* LinkedIn */}
//                 <a
//                   href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
//                 >
//                   LinkedIn
//                 </a>
//                 <CopyLinkButton />
//               </div>
//             </div>

//             {/* Excerpt / lead */}
//             {blog.excerpt && (
//               <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-[#154895] pl-5 mb-8 italic">
//                 {blog.excerpt}
//               </p>
//             )}

//             {/* Main content — sanitized before injection */}
//             <div
//               className={proseClasses}
//               dangerouslySetInnerHTML={{ __html: sanitize(blog.content) }}
//             />

//             {/* Additional Sections */}
//             {hasSections && (
//               <div className="mt-12 pt-10 border-t border-slate-100">
//                 <h2
//                   className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"
//                 >
//                   <LayoutList className="w-3.5 h-3.5" /> More in this article
//                 </h2>
//                 {blog.sections.map((sec, i) => (
//                   <SectionBlock key={i} section={sec} index={i} />
//                 ))}
//               </div>
//             )}

//             {/* Tags */}
//             {hasTags && (
//               <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
//                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest self-center mr-1">
//                   Tags:
//                 </span>
//                 {blog.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#154895] text-xs font-semibold border border-blue-100"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* FAQs */}
//             {hasFaqs && (
//               <div className="mt-12">
//                 <h2
//                   className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2"
//                   style={{ fontFamily: "'Playfair Display', serif" }}
//                 >
//                   <HelpCircle className="w-5 h-5 text-[#154895]" />
//                   Frequently Asked Questions
//                 </h2>
//                 <p className="text-sm text-slate-400 mb-6">
//                   Common questions about this topic answered below.
//                 </p>
//                 <div className="space-y-3">
//                   {blog.faqs.map((faq, i) => (
//                     <FaqItem key={i} faq={faq} index={i} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Bottom share strip */}
//             <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
//               <button
//                 onClick={() => navigate("/blog")}
//                 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#154895] transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4" /> Back to all articles
//               </button>
//               <CopyLinkButton />
//             </div>
//           </div>

//           {/* ── Sidebar ──────────────────────────────────────────── */}
//           <aside className="space-y-8">

//             {/* CTA Card */}
//             <div className="bg-[#154895] rounded-2xl p-6 text-white overflow-hidden relative">
//               <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
//               <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#C5282B]/30" />
//               <div className="relative">
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/80 uppercase tracking-wider mb-4">
//                   <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
//                   Qatar MOL License #618
//                 </span>
//                 <h3
//                   className="text-lg font-bold mb-2"
//                   style={{ fontFamily: "'Playfair Display', serif" }}
//                 >
//                   Need skilled manpower?
//                 </h3>
//                 <p className="text-white/60 text-xs leading-relaxed mb-5">
//                   7+ years connecting Gulf employers with talent from 28+ countries.
//                 </p>
//                 <button
//                   onClick={() => navigate("/get-free-quote")}
//                   className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-slate-100 transition-colors"
//                 >
//                   Get Free Quote <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Article Info Card */}
//             <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//                 Article Info
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-slate-500 flex items-center gap-1.5">
//                     <Calendar className="w-3.5 h-3.5 text-slate-300" /> Published
//                   </span>
//                   <span className="font-semibold text-slate-700 text-xs">
//                     {fmtDate(blog.publishedAt) || "—"}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-slate-500 flex items-center gap-1.5">
//                     <Clock className="w-3.5 h-3.5 text-slate-300" /> Read time
//                   </span>
//                   <span className="font-semibold text-slate-700 text-xs">
//                     {readTime(blog.content)} min
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-slate-500 flex items-center gap-1.5">
//                     <Tag className="w-3.5 h-3.5 text-slate-300" /> Category
//                   </span>
//                   <span className="font-semibold text-[#154895] text-xs">
//                     {blog.category}
//                   </span>
//                 </div>
//                 {hasSections && (
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-500 flex items-center gap-1.5">
//                       <LayoutList className="w-3.5 h-3.5 text-slate-300" /> Sections
//                     </span>
//                     <span className="font-semibold text-slate-700 text-xs">
//                       {blog.sections.length}
//                     </span>
//                   </div>
//                 )}
//                 {hasFaqs && (
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-500 flex items-center gap-1.5">
//                       <HelpCircle className="w-3.5 h-3.5 text-slate-300" /> FAQs
//                     </span>
//                     <span className="font-semibold text-slate-700 text-xs">
//                       {blog.faqs.length}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Related Articles */}
//             {related.length > 0 && (
//               <div>
//                 <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
//                   <span className="w-1 h-4 rounded-full bg-[#154895] inline-block" />
//                   Related Articles
//                 </h3>
//                 <div className="space-y-1">
//                   {related.map((b) => (
//                     <RelatedCard
//                       key={b._id}
//                       blog={b}
//                       onClick={() => navigate(`/blog/${b.slug}`)}
//                     />
//                   ))}
//                 </div>
//                 <button
//                   onClick={() => navigate("/blog")}
//                   className="mt-4 w-full text-center text-xs font-bold text-[#154895] hover:underline py-2"
//                 >
//                   View all articles →
//                 </button>
//               </div>
//             )}
//           </aside>
//         </div>
//       </div>

//       {/* ── Footer CTA Banner ────────────────────────────────────── */}
//       <div className="bg-[#154895] mt-8">
//         <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
//               Work with us
//             </p>
//             <h3
//               className="text-2xl md:text-3xl font-bold text-white"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               Ready to build your team?
//             </h3>
//           </div>
//           <div className="flex gap-3 shrink-0">
//             <button
//               onClick={() => navigate("/get-free-quote")}
//               className="px-6 py-3 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-slate-100 transition-colors"
//             >
//               Get Free Quote
//             </button>
//             <button
//               onClick={() => navigate("/request-manpower")}
//               className="px-6 py-3 rounded-xl bg-[#C5282B] text-white text-sm font-bold hover:bg-[#a82226] transition-colors"
//             >
//               Request Manpower
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "../Axios/Axios";
import {
  ArrowLeft, Calendar, Clock, Tag, ChevronDown, ChevronUp,
  Loader2, BookOpen, ArrowRight, Share2, Copy, Check,
  LayoutList, HelpCircle, Hash,
} from "lucide-react";

const API = "/blog";



const readTime = (content = "") => {
  if (typeof content !== "string") return 1;
  
  const plain = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return Math.max(1, Math.ceil(plain.split(/\s+/).length / 200));
};

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "";


const sanitize = (html = "") =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });



export const FaqItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-800 pr-4 flex items-start gap-3">
          <span className="mt-0.5 w-5 h-5 rounded-full bg-[#154895]/10 text-[#154895] text-[10px] font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          {faq.question}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#154895] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3 bg-blue-50/30 border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed pl-8">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export const SectionBlock = ({ section }) => (
  <div className="mt-10">
    <h2
      className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <span className="w-1 h-6 rounded-full bg-[#154895] inline-block shrink-0" />
      {section.heading}
    </h2>
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
    />
  </div>
);

export const RelatedCard = ({ blog, onClick }) => (
  <article
    onClick={onClick}
    className="group flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
  >
    <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
      {blog.heroImage ? (
        <img
          src={blog.heroImage}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-slate-300" />
        </div>
      )}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-[#154895] font-semibold mb-1">{blog.category}</p>
      <h4
        className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#154895] transition-colors"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {blog.title}
      </h4>
      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {readTime(blog.excerpt || blog.content)} min read
      </p>
    </div>
  </article>
);

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied!
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" /> Copy link
        </>
      )}
    </button>
  );
};



export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog]       = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const load = async () => {
      setLoading(true);
      setError(false);
      setBlog(null);
      setRelated([]);

      try {
        const { data } = await axios.get(`${API}/slug/${slug}`);

        const rel = await axios.get(API, {
          params: { category: data.blog.category, limit: 4 },
        });

        if (!isMounted.current) return;

        setBlog(data.blog);
        setRelated(rel.data.blogs.filter((b) => b.slug !== slug).slice(0, 3));
      } catch {
        if (isMounted.current) setError(true);
      }

      if (isMounted.current) setLoading(false);
    };

    load();
  }, [slug]);

 

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#154895] animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading article…</p>
        </div>
      </div>
    );

  

  if (error || !blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-9 h-9 text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">Article not found</h2>
          <p className="text-slate-400 text-sm mb-6">
            This article may have been removed or the link is incorrect.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="px-5 py-2.5 bg-[#154895] text-white text-sm font-semibold rounded-xl hover:bg-[#1240a0] transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );



  const hasSections = blog.sections?.length > 0;
  const hasFaqs     = blog.faqs?.length > 0;
  const hasTags     = blog.tags?.length > 0;

  return (
    <>
    
      <style>{`
        .blog-content h1 { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin: 2rem 0 1rem; font-family: 'Playfair Display', serif; line-height: 1.3; }
        .blog-content h2 { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 1.75rem 0 0.75rem; font-family: 'Playfair Display', serif; line-height: 1.35; }
        .blog-content h3 { font-size: 1.1rem; font-weight: 600; color: #334155; margin: 1.5rem 0 0.6rem; }
        .blog-content h4 { font-size: 1rem; font-weight: 600; color: #475569; margin: 1.25rem 0 0.5rem; }
        .blog-content p  { font-size: 0.9375rem; color: #475569; line-height: 1.8; margin-bottom: 1rem; }
        .blog-content a  { color: #154895; text-decoration: none; font-weight: 500; }
        .blog-content a:hover { text-decoration: underline; }
        .blog-content strong { font-weight: 600; color: #1e293b; }
        .blog-content em { font-style: italic; }
        .blog-content ul { list-style: disc; padding-left: 1.4rem; margin-bottom: 1rem; color: #475569; }
        .blog-content ol { list-style: decimal; padding-left: 1.4rem; margin-bottom: 1rem; color: #475569; }
        .blog-content li { font-size: 0.9375rem; line-height: 1.75; margin-bottom: 0.25rem; }
        .blog-content blockquote { border-left: 4px solid #154895; padding: 0.5rem 1.25rem; margin: 1.5rem 0; background: #eff6ff; border-radius: 0 0.5rem 0.5rem 0; color: #64748b; font-style: italic; }
        .blog-content code { background: #f1f5f9; color: #154895; font-size: 0.8125rem; padding: 0.15rem 0.4rem; border-radius: 0.3rem; font-family: monospace; }
        .blog-content pre { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; overflow-x: auto; margin: 1.5rem 0; }
        .blog-content pre code { background: none; color: inherit; padding: 0; font-size: 0.875rem; }
        .blog-content img { border-radius: 0.75rem; box-shadow: 0 4px 16px rgba(0,0,0,0.08); max-width: 100%; margin: 1.5rem 0; }
        .blog-content hr { border: none; border-top: 1px solid #e2e8f0; margin: 2rem 0; }
        .blog-content table { width: 100%; border-collapse: collapse; font-size: 0.875rem; margin: 1.5rem 0; }
        .blog-content th { background: #f8fafc; padding: 0.625rem 1rem; text-align: left; font-weight: 600; color: #334155; border: 1px solid #e2e8f0; }
        .blog-content td { padding: 0.625rem 1rem; color: #475569; border: 1px solid #e2e8f0; }
        .blog-content tr:nth-child(even) td { background: #f8fafc; }
      `}</style>

      <div className="min-h-screen bg-slate-50">

     
        <div className="relative bg-slate-900 overflow-hidden" style={{ height: 480 }}>
          {blog.heroImage && (
            <img
              src={blog.heroImage}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-900/20" />

       
          <div className="absolute top-6 left-0 right-0 max-w-6xl mx-auto px-6">
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Articles
            </button>
          </div>

       
          <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#154895] text-white uppercase tracking-wider">
                <Tag className="w-2.5 h-2.5" />
                {blog.category}
              </span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 mt-5 text-white/50 text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {fmtDate(blog.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readTime(blog.content)} min read
              </span>
              {blog.focusKeyword && (
                <span className="flex items-center gap-1.5 text-white/40">
                  <Hash className="w-3.5 h-3.5" />
                  {blog.focusKeyword}
                </span>
              )}
            </div>
          </div>
        </div>

      
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

          
            <div>

             
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-slate-100">
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" /> Share this article
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    𝕏 Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <CopyLinkButton />
                </div>
              </div>

           
              {blog.excerpt && (
                <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-[#154895] pl-5 mb-8 italic">
                  {blog.excerpt}
                </p>
              )}

            
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: sanitize(blog.content) }}
              />

            
              {hasSections && (
                <div className="mt-12 pt-10 border-t border-slate-100">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <LayoutList className="w-3.5 h-3.5" /> More in this article
                  </h2>
                  {blog.sections.map((sec, i) => (
                    <SectionBlock key={i} section={sec} index={i} />
                  ))}
                </div>
              )}

            
              {hasTags && (
                <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest self-center mr-1">
                    Tags:
                  </span>
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#154895] text-xs font-semibold border border-blue-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

             
              {hasFaqs && (
                <div className="mt-12">
                  <h2
                    className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <HelpCircle className="w-5 h-5 text-[#154895]" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm text-slate-400 mb-6">
                    Common questions about this topic answered below.
                  </p>
                  <div className="space-y-3">
                    {blog.faqs.map((faq, i) => (
                      <FaqItem key={i} faq={faq} index={i} />
                    ))}
                  </div>
                </div>
              )}

            
              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate("/blog")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#154895] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to all articles
                </button>
                <CopyLinkButton />
              </div>
            </div>

          
            <aside className="space-y-8">

            
              <div className="bg-[#154895] rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#C5282B]/30" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-white/10 text-white/80 uppercase tracking-wider mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                    Qatar MOL License #618
                  </span>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Need skilled manpower?
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-5">
                    7+ years connecting Gulf employers with talent from 28+ countries.
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-slate-100 transition-colors"
                  >
                    Get Free Quote <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

             
              <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Article Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" /> Published
                    </span>
                    <span className="font-semibold text-slate-700 text-xs">
                      {fmtDate(blog.publishedAt) || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-300" /> Read time
                    </span>
                    <span className="font-semibold text-slate-700 text-xs">
                      {readTime(blog.content)} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-300" /> Category
                    </span>
                    <span className="font-semibold text-[#154895] text-xs">
                      {blog.category}
                    </span>
                  </div>
                  {hasSections && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <LayoutList className="w-3.5 h-3.5 text-slate-300" /> Sections
                      </span>
                      <span className="font-semibold text-slate-700 text-xs">
                        {blog.sections.length}
                      </span>
                    </div>
                  )}
                  {hasFaqs && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-300" /> FAQs
                      </span>
                      <span className="font-semibold text-slate-700 text-xs">
                        {blog.faqs.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            
              {related.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-[#154895] inline-block" />
                    Related Articles
                  </h3>
                  <div className="space-y-1">
                    {related.map((b) => (
                      <RelatedCard
                        key={b._id}
                        blog={b}
                        onClick={() => navigate(`/blog/${b.slug}`)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/blog")}
                    className="mt-4 w-full text-center text-xs font-bold text-[#154895] hover:underline py-2"
                  >
                    View all articles →
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>

        <div className="bg-[#154895] mt-8">
          <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                Work with us
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to build your team?
              </h3>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => navigate("/quote")}
                className="px-6 py-3 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-slate-100 transition-colors"
              >
                Get Free Quote
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-6 py-3 rounded-xl bg-[#C5282B] text-white text-sm font-bold hover:bg-[#a82226] transition-colors"
              >
                Request Manpower
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}