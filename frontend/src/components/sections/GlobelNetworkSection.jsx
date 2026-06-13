import { motion } from "framer-motion";
import { Globe, Users, MapPin, ArrowRight, CalendarDays } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────
const STATS = [
  { value: "28+",   label: "Source Countries" },
  { value: "50K+",  label: "Candidates Assessed" },
  { value: "25–30", label: "Days to Deploy" },
];

const REGIONS = [
  { flag: "🌏", label: "Asia",               workers: "35,000+", color: "#154895", countries: ["India", "Nepal", "Philippines", "Pakistan", "Bangladesh"] },
  { flag: "🌍", label: "Africa",             workers: "12,000+", color: "#e62224", countries: ["Ghana", "Kenya", "Nigeria", "Morocco"] },
  { flag: "🌐", label: "Europe & Middle East", workers: "3,000+",  color: "#0891b2", countries: ["UK", "Ukraine", "Romania", "Lebanon"] },
];

// Mini SVG world map — simplified continents only, no interaction
function MiniWorldMap() {
  return (
    <svg viewBox="0 50 840 300" className="w-full" style={{ maxHeight: 180 }} xmlns="http://www.w3.org/2000/svg">
      {/* Inactive continents */}
      <path d="M160 100 L220 90 L240 140 L230 200 L210 240 L185 260 L160 240 L140 190 L130 140 Z" fill="#dce8f7" stroke="rgba(21,72,149,0.15)" strokeWidth={1} />
      <path d="M640 290 L690 280 L710 310 L690 335 L655 335 L635 315 Z" fill="#dce8f7" stroke="rgba(21,72,149,0.15)" strokeWidth={1} />
      {/* Active continents */}
      <path d="M520 100 L620 90 L680 110 L720 140 L700 190 L660 210 L620 230 L580 220 L540 200 L510 180 L490 150 L500 120 Z" fill="rgba(21,72,149,0.14)" stroke="#154895" strokeWidth={1.5} />
      <path d="M410 200 L450 190 L480 210 L490 270 L470 320 L440 340 L410 330 L385 300 L380 250 L390 220 Z" fill="rgba(230,34,36,0.12)" stroke="#e62224" strokeWidth={1.5} />
      <path d="M340 80 L410 75 L430 100 L420 140 L390 160 L360 155 L330 135 L320 110 Z" fill="rgba(8,145,178,0.12)" stroke="#0891b2" strokeWidth={1.5} />

      {/* Connection lines to Qatar */}
      {[
        { x1: 580, y1: 175, color: "#154895" },
        { x1: 553, y1: 155, color: "#154895" },
        { x1: 655, y1: 202, color: "#154895" },
        { x1: 430, y1: 228, color: "#e62224" },
        { x1: 456, y1: 256, color: "#e62224" },
        { x1: 385, y1:  95, color: "#0891b2" },
        { x1: 402, y1:  88, color: "#0891b2" },
        { x1: 462, y1: 140, color: "#0891b2" },
      ].map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={492} y2={156}
          stroke={l.color} strokeWidth={0.8} strokeDasharray="4 4" opacity={0.5} />
      ))}

      {/* Source dots */}
      {[
        { cx: 580, cy: 175, c: "#154895" }, { cx: 553, cy: 155, c: "#154895" },
        { cx: 655, cy: 202, c: "#154895" }, { cx: 575, cy: 150, c: "#154895" },
        { cx: 430, cy: 228, c: "#e62224" }, { cx: 456, cy: 256, c: "#e62224" },
        { cx: 440, cy: 207, c: "#e62224" }, { cx: 418, cy: 196, c: "#e62224" },
        { cx: 385, cy:  95, c: "#0891b2" }, { cx: 402, cy:  88, c: "#0891b2" },
        { cx: 462, cy: 140, c: "#0891b2" },
      ].map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={3} fill={d.c} opacity={0.75} />
      ))}

      {/* Qatar pulse */}
      <circle cx={492} cy={156} r={6} fill="#154895" />
      <circle cx={492} cy={156} r={6} fill="none" stroke="#e62224" strokeWidth={1.5}>
        <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x={504} y={150} fill="#154895" fontSize="8" fontFamily="sans-serif" fontWeight="700">Qatar ★</text>
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────
export default function GlobalNetworkTeaser() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{
          width: 700, height: 350, top: "0%", right: "-12%",
          background: "radial-gradient(ellipse, rgba(21,72,149,0.06) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />
        <div className="absolute rounded-full" style={{
          width: 400, height: 400, bottom: "0%", left: "-8%",
          background: "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)",
          filter: "blur(50px)",
        }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{
          backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12" style={{ zIndex: 2 }}>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy + stats + regions + CTA */}
          <div>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 mb-5 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(21,72,149,0.06)", borderColor: "rgba(21,72,149,0.14)", color: "#154895" }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: "#e62224", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              Global Network
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-black text-gray-900 leading-[1.1] tracking-tight mb-4"
              style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Talent From{" "}
              <span style={{ color: "#154895" }}>28+ Countries</span>,
              <br />Delivered to Qatar
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.13, duration: 0.5 }}
              className="text-[15px] leading-relaxed mb-7"
              style={{ color: "#64748b" }}
            >
              Dedicated local partners across Asia, Africa, and Europe ensure quality
              screening, compliance, and 25–30 day deployment — every time.
            </motion.p>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="inline-flex flex-wrap border border-[rgba(21,72,149,0.1)] rounded-2xl overflow-hidden mb-7"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}
            >
              {STATS.map(({ value, label }, i, arr) => (
                <div
                  key={label}
                  className={`flex flex-col items-center px-6 py-4${i < arr.length - 1 ? " border-r border-[rgba(21,72,149,0.08)]" : ""}`}
                >
                  <span
                    className="text-[20px] font-black leading-none mb-[3px]"
                    style={{ color: i % 2 === 0 ? "#154895" : "#e62224", fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {value}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.08em] font-semibold" style={{ color: "#64748b" }}>
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Region pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.5 }}
              className="flex flex-col gap-3 mb-8"
            >
              {REGIONS.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-[14px] border"
                  style={{
                    background: `${r.color}06`,
                    borderColor: `${r.color}20`,
                  }}
                >
                  <span className="text-lg flex-shrink-0">{r.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-[5px]">
                      <span className="text-[13px] font-bold" style={{ color: "#1e293b" }}>{r.label}</span>
                      <span
                        className="text-[10px] font-bold px-2 py-[2px] rounded-full"
                        style={{ background: `${r.color}10`, color: r.color, border: `1px solid ${r.color}20` }}
                      >
                        {r.workers}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {r.countries.map(c => (
                        <span
                          key={c}
                          className="text-[10px] font-semibold px-2 py-[3px] rounded-full uppercase tracking-wide"
                          style={{ background: "rgba(21,72,149,0.05)", color: "#64748b", border: "1px solid rgba(21,72,149,0.08)" }}
                        >
                          {c}
                        </span>
                      ))}
                      <span className="text-[10px] font-bold px-1 py-[3px]" style={{ color: r.color }}>+ more</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="flex items-center gap-4"
            >
              <a
                href="/networks"
                className="group inline-flex items-center gap-2 bg-[#154895] hover:bg-[#1a58b8] text-white text-[13.5px] font-bold px-6 py-[11px] rounded-[11px] transition-all duration-250 shadow-[0_2px_12px_rgba(21,72,149,0.25)] hover:shadow-[0_4px_20px_rgba(21,72,149,0.35)] hover:-translate-y-[1px] active:translate-y-0"
              >
                <Globe size={15} className="flex-shrink-0" />
                Explore Global Network
                <ArrowRight size={13} className="group-hover:translate-x-[3px] transition-transform duration-200 flex-shrink-0" />
              </a>
              <a
                href="/networks"
                className="text-[13px] font-semibold hover:text-[#154895] transition-colors duration-200"
                style={{ color: "#64748b" }}
              >
                View all countries →
              </a>
            </motion.div>
          </div>

          {/* Right: mini map card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[22px] border overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.88)",
              borderColor: "rgba(21,72,149,0.1)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 4px 28px rgba(21,72,149,0.09)",
            }}
          >
            {/* Map card header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: "rgba(21,72,149,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px] flex items-center justify-center" style={{ background: "rgba(21,72,149,0.08)" }}>
                  <MapPin size={13} color="#154895" strokeWidth={1.8} />
                </div>
                <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: "#64748b" }}>
                  Source Map
                </span>
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="relative flex h-[7px] w-[7px]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-green-500" />
                </span>
                <span className="text-[11px] font-semibold" style={{ color: "#154895" }}>28+ active countries</span>
              </div>
            </div>

            {/* Map */}
            <div className="px-4 py-3" style={{ background: "#f8faff" }}>
              <MiniWorldMap />
            </div>

            {/* Region legend */}
            <div className="flex items-center justify-around px-5 py-4 border-t" style={{ borderColor: "rgba(21,72,149,0.08)" }}>
              {REGIONS.map(r => (
                <div key={r.label} className="flex items-center gap-2">
                  <span className="text-base">{r.flag}</span>
                  <div>
                    <div className="text-[11px] font-bold" style={{ color: "#1e293b" }}>{r.label.split(" ")[0]}</div>
                    <div className="text-[10px] font-semibold" style={{ color: r.color }}>{r.workers}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA strip */}
            <a
              href="/networks"
              className="flex items-center justify-between px-6 py-4 border-t group hover:bg-[#f2f6ff] transition-colors duration-200"
              style={{ borderColor: "rgba(21,72,149,0.08)", background: "#f8faff" }}
            >
              <span className="text-[12px] font-semibold" style={{ color: "#64748b" }}>
                See full interactive network map
              </span>
              <ArrowRight size={13} color="#154895" className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}