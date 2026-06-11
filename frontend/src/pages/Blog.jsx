import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Axios/Axios";
import {
  Search,
  Tag,
  ChevronRight,
  ArrowRight,
  Loader2,
  Clock,
  Calendar,
  BookOpen,
  X,
} from "lucide-react";

const API = "/blog";

const readTime = (content = "") =>
  Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse">
    <div className="h-48 bg-slate-100" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-20 bg-slate-100 rounded-full" />
      <div className="h-5 bg-slate-100 rounded-lg" />
      <div className="h-4 w-4/5 bg-slate-100 rounded-lg" />
      <div className="h-3 w-1/3 bg-slate-100 rounded-full mt-4" />
    </div>
  </div>
);

const HeroCard = ({ blog, onClick }) => (
  <div
    onClick={onClick}
    className="group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-900"
    style={{ minHeight: 460 }}
  >
    {blog.heroImage && (
      <img
        src={blog.heroImage}
        alt={blog.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
      />
    )}

    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

    <div
      className="relative flex flex-col justify-end h-full p-8 md:p-10"
      style={{ minHeight: 460 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#154895] text-white uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
          Featured
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 backdrop-blur-sm">
          <Tag className="w-3 h-3" />
          {blog.category}
        </span>
      </div>

      <h2
        className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 max-w-2xl"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {blog.title}
      </h2>
      <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-xl line-clamp-2">
        {blog.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-white/50 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {fmtDate(blog.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {readTime(blog.excerpt)} min read
          </span>
        </div>
        <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#154895] text-sm font-bold group-hover:bg-[#154895] group-hover:text-white transition-all duration-300">
          Read article{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  </div>
);

const BlogCard = ({ blog, onClick }) => (
  <article
    onClick={onClick}
    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-[#154895]/20 hover:shadow-xl hover:shadow-[#154895]/5 transition-all duration-300 cursor-pointer flex flex-col"
  >
    <div
      className="relative overflow-hidden bg-slate-100"
      style={{ height: 200 }}
    >
      {blog.heroImage ? (
        <img
          src={blog.heroImage}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300" />
        </div>
      )}

      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-sm text-[#154895] uppercase tracking-wider shadow-sm">
        <Tag className="w-2.5 h-2.5" />
        {blog.category}
      </span>
    </div>

    <div className="p-5 flex flex-col flex-1">
      <h3
        className="text-base font-bold text-slate-800 leading-snug mb-2 line-clamp-2 group-hover:text-[#154895] transition-colors"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {blog.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1 mb-4">
        {blog.excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {fmtDate(blog.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime(blog.excerpt)} min
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-[#154895] opacity-0 group-hover:opacity-100 transition-opacity">
          Read <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </article>
);

export default function BlogPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState(["All"]);
  const searchTimeout = useRef();

  const fetchBlogs = async (overrides = {}) => {
    setLoading(true);
    try {
      const params = { page, limit: 9, ...overrides };
      if (search) params.search = search;
      if (activeCategory !== "All") params.category = activeCategory;
      const { data } = await axios.get(API, { params });
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);

      if (!overrides.category && activeCategory === "All") {
        const cats = [
          "All",
          ...new Set(data.blogs.map((b) => b.category).filter(Boolean)),
        ];
        setCategories(cats);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, activeCategory]);

  useEffect(() => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchBlogs({ page: 1 });
    }, 350);
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative overflow-hidden bg-[#154895]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#C5282B]/20 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C5282B] animate-pulse" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
              Insights & Resources
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-2xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Expert Insights on
            <br />
            <span className="text-white/60">Global Recruitment</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-10">
            Industry trends, hiring strategies, and workforce insights from
            Qatar's leading manpower consultancy.
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 text-sm font-medium outline-none focus:bg-white/15 focus:border-white/40 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setPage(1);
                }}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#154895] text-white shadow-sm shadow-[#154895]/25"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading ? (
          <div>
            <div className="h-[460px] bg-white rounded-3xl animate-pulse border border-slate-100 mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-5">
              <BookOpen className="w-9 h-9 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              No articles found
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mb-6">
              {search
                ? `No results for "${search}". Try a different search term.`
                : "Check back soon for new articles."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="px-5 py-2.5 bg-[#154895] text-white text-sm font-semibold rounded-xl hover:bg-[#1240a0] transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            {featured && !search && activeCategory === "All" && page === 1 && (
              <div className="mb-10">
                <HeroCard
                  blog={featured}
                  onClick={() => navigate(`/blog/${featured.slug}`)}
                />
              </div>
            )}

            {rest.length > 0 && (
              <>
                {!search && activeCategory === "All" && page === 1 && (
                  <div className="flex items-center gap-3 mb-6">
                    <h2
                      className="text-lg font-bold text-slate-800"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Latest Articles
                    </h2>
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-xs text-slate-400 font-medium">
                      {rest.length} articles
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(search || activeCategory !== "All" || page > 1
                    ? blogs
                    : rest
                  ).map((blog) => (
                    <BlogCard
                      key={blog._id}
                      blog={blog}
                      onClick={() => navigate(`/blog/${blog.slug}`)}
                    />
                  ))}
                </div>
              </>
            )}

            {blogs.length === 1 && (search || activeCategory !== "All") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCard
                  blog={blogs[0]}
                  onClick={() => navigate(`/blog/${blogs[0].slug}`)}
                />
              </div>
            )}
          </>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2.5 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 text-sm font-bold rounded-xl transition-all ${
                  p === page
                    ? "bg-[#154895] text-white shadow-sm shadow-[#154895]/25"
                    : "text-slate-500 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2.5 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {!loading && blogs.length > 0 && (
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
      )}
    </div>
  );
}
