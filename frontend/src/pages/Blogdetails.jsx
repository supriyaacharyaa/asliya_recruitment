import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "../Axios/Axios";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  Loader2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const API = "/blog";

// ── Helpers ────────────────────────────────────────────────────

const readTime = (content = "") =>
  Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

/**
 * Sanitize HTML before injecting via dangerouslySetInnerHTML.
 * DOMPurify strips <script>, event handlers, javascript: hrefs, etc.
 * while leaving all safe formatting tags intact.
 */
const sanitize = (html = "") =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"], // allow link targets
  });

// ── Shared prose classes ───────────────────────────────────────

const proseClasses = `
  prose prose-slate prose-sm md:prose-base max-w-none
  prose-headings:font-bold prose-headings:text-slate-800
  prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
  prose-p:text-slate-600 prose-p:leading-relaxed
  prose-a:text-[#154895] prose-a:no-underline hover:prose-a:underline
  prose-strong:text-slate-800
  prose-ul:text-slate-600 prose-ul:list-disc prose-ul:pl-5
  prose-ol:text-slate-600 prose-ol:list-decimal prose-ol:pl-5
  prose-li:my-1
  prose-blockquote:border-[#154895] prose-blockquote:text-slate-500
  prose-img:rounded-xl prose-img:shadow-md
  prose-hr:border-slate-100
  prose-table:text-sm
  prose-th:text-slate-700 prose-th:font-semibold
  prose-td:text-slate-600
`.trim();

// ── Sub-components ─────────────────────────────────────────────

const FaqItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-800 pr-4">
          {faq.question}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#154895] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 bg-white border-t border-slate-50">
          <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const RelatedCard = ({ blog, onClick }) => (
  <article
    onClick={onClick}
    className="group flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
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
      {/* List endpoint omits `content`, so read time is estimated from excerpt.
          Label is "min read" which is an approximation — acceptable for cards. */}
      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {readTime(blog.excerpt)} min read
      </p>
    </div>
  </article>
);

// ── Page ───────────────────────────────────────────────────────

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate  = useNavigate();

  const [blog, setBlog]       = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const load = async () => {
      setLoading(true);
      setError(false);

      try {
        const { data } = await axios.get(`${API}/slug/${slug}`);

        // Fetch related posts: request 4 so we can drop the current one and
        // still have up to 3. Keep limit tight to avoid over-fetching.
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

  // ── Loading / error states ─────────────────────────────────────

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
        <div className="text-center">
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

  // ── Render ─────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Banner */}
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
                #{blog.focusKeyword}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

          {/* Main Content Column */}
          <div>

            {/* Excerpt / lead */}
            <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-[#154895] pl-5 mb-8 italic">
              {blog.excerpt}
            </p>

            {/* Main content — sanitized before injection */}
            <div
              className={proseClasses}
              dangerouslySetInnerHTML={{ __html: sanitize(blog.content) }}
            />

            {/* Additional structured sections */}
            {blog.sections?.length > 0 && (
              <div className="mt-10 space-y-10">
                {blog.sections.map((sec, i) => (
                  <div
                    key={i}
                    className="border-t border-slate-100 pt-8 first:border-t-0 first:pt-0"
                  >
                    {sec.heading && (
                      <h2
                        className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        <span className="inline-block w-1 h-5 rounded-full bg-[#154895] shrink-0" />
                        {sec.heading}
                      </h2>
                    )}
                    {/* Section content also sanitized */}
                    <div
                      className={proseClasses}
                      dangerouslySetInnerHTML={{ __html: sanitize(sec.content) }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
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

            {/* FAQs */}
            {blog.faqs?.length > 0 && (
              <div className="mt-12">
                <h2
                  className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {blog.faqs.map((faq, i) => (
                    <FaqItem key={i} faq={faq} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">

            {/* CTA Card */}
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
                  onClick={() => navigate("/get-free-quote")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-slate-100 transition-colors"
                >
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Related Articles */}
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

      {/* Footer CTA Banner */}
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
              onClick={() => navigate("/get-free-quote")}
              className="px-6 py-3 rounded-xl bg-white text-[#154895] text-sm font-bold hover:bg-slate-100 transition-colors"
            >
              Get Free Quote
            </button>
            <button
              onClick={() => navigate("/request-manpower")}
              className="px-6 py-3 rounded-xl bg-[#C5282B] text-white text-sm font-bold hover:bg-[#a82226] transition-colors"
            >
              Request Manpower
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}