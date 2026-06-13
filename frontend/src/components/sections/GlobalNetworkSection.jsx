import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, MapPin, CheckCircle, ArrowRight,
  Phone, ChevronRight, Zap, Shield, Users, Building2, CalendarDays, ArrowUpRight
} from "lucide-react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

// ── Data ──────────────────────────────────────────────────────────
const STATS = [
  { icon: Globe,        value: "28+",   label: "Countries",           accent: "#154895" },
  { icon: Users,        value: "50K+",  label: "Candidates Assessed", accent: "#e62224" },
  { icon: CalendarDays, value: "100+",  label: "Campaigns Run",       accent: "#154895" },
  { icon: Building2,    value: "25–30", label: "Days to Deploy",      accent: "#e62224" },
];

const REGIONS = [
  {
    id: "asia",
    flag: "🌏",
    label: "Asia",
    workers: "35,000+",
    dotColor: "#154895",
    tag: "Largest Pool",
    desc: "Our largest talent pool. Skilled, semi-skilled, and domestic workers across every trade.",
    countries: ["India", "Pakistan", "Nepal", "Bangladesh", "Philippines", "Sri Lanka", "Maldives"],
  },
  {
    id: "africa",
    flag: "🌍",
    label: "Africa",
    workers: "12,000+",
    dotColor: "#e62224",
    tag: "Fast Growing",
    desc: "Fast-growing sourcing hub for construction, security, and hospitality sectors.",
    countries: ["Ghana", "Kenya", "Nigeria", "Tanzania", "Morocco", "Algeria"],
  },
  {
    id: "europe",
    flag: "🌐",
    label: "Europe & Middle East",
    workers: "3,000+",
    dotColor: "#0891b2",
    tag: "Specialist Trades",
    desc: "Specialized professionals and skilled trades for projects requiring European standards.",
    countries: ["UK", "Ukraine", "Romania", "Cyprus", "Lebanon", "Armenia", "Moldova", "Russia"],
  },
];

const WHY_POINTS = [
  { icon: Zap,         title: "Quality Screening",           body: "Pre-qualified candidates before you see a single profile." },
  { icon: Shield,      title: "Local Law Compliance",        body: "Every country's labor regulations handled by in-country experts." },
  { icon: Users,       title: "On-Site Campaigns",           body: "500–5,000+ candidates screened per campaign. Face-to-face, real assessments." },
  { icon: ArrowRight,  title: "Fast-Track Deployment",       body: "25–30 days from interview to arrival in Qatar." },
  { icon: CheckCircle, title: "Zero Exploitation Guarantee", body: "Ethical, documented, Ministry of Labor approved process every time." },
];

const CONTINENT_PATHS = [
  { id: "asia",     d: "M520 100 L620 90 L680 110 L720 140 L700 190 L660 210 L620 230 L580 220 L540 200 L510 180 L490 150 L500 120 Z" },
  { id: "africa",   d: "M410 200 L450 190 L480 210 L490 270 L470 320 L440 340 L410 330 L385 300 L380 250 L390 220 Z" },
  { id: "europe",   d: "M340 80 L410 75 L430 100 L420 140 L390 160 L360 155 L330 135 L320 110 Z" },
  { id: "americas", d: "M160 100 L220 90 L240 140 L230 200 L210 240 L185 260 L160 240 L140 190 L130 140 Z", inactive: true },
  { id: "oceania",  d: "M640 290 L690 280 L710 310 L690 335 L655 335 L635 315 Z", inactive: true },
];

const SOURCE_DOTS = [
  { cx: 580, cy: 175, label: "India",       region: "asia" },
  { cx: 553, cy: 155, label: "Pakistan",    region: "asia" },
  { cx: 575, cy: 150, label: "Nepal",       region: "asia" },
  { cx: 577, cy: 163, label: "Bangladesh",  region: "asia" },
  { cx: 655, cy: 202, label: "Philippines", region: "asia" },
  { cx: 560, cy: 196, label: "Sri Lanka",   region: "asia" },
  { cx: 430, cy: 228, label: "Ghana",       region: "africa" },
  { cx: 456, cy: 256, label: "Kenya",       region: "africa" },
  { cx: 440, cy: 207, label: "Nigeria",     region: "africa" },
  { cx: 418, cy: 196, label: "Morocco",     region: "africa" },
  { cx: 385, cy: 95,  label: "UK",          region: "europe" },
  { cx: 402, cy: 88,  label: "Ukraine",     region: "europe" },
  { cx: 415, cy: 98,  label: "Romania",     region: "europe" },
  { cx: 462, cy: 140, label: "Lebanon",     region: "europe" },
  { cx: 472, cy: 155, label: "Armenia",     region: "europe" },
];

const QATAR = { cx: 492, cy: 156 };

// ── Stat Chip — matches Industries exactly ────────────────────────
function StatChip({ icon: Icon, value, label, accent, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 min-w-[140px] flex items-center gap-4 px-7 py-6 border-r last:border-r-0"
      style={{ borderColor: "rgba(21,72,149,0.08)" }}
    >
      <div
        className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}12` }}
      >
        <Icon size={19} color={accent} strokeWidth={1.8} />
      </div>
      <div>
        <div
          className="font-black leading-none mb-[3px]"
          style={{
            fontSize: "clamp(20px, 2.5vw, 28px)",
            color: accent,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {value}
        </div>
        <div className="text-[12px] font-semibold" style={{ color: "#64748b" }}>{label}</div>
      </div>
    </motion.div>
  );
}

// ── World Map SVG ─────────────────────────────────────────────────
function WorldMap({ active, setActive }) {
  return (
    <svg viewBox="0 50 840 320" className="w-full" style={{ maxHeight: 300 }} xmlns="http://www.w3.org/2000/svg">
      {CONTINENT_PATHS.map(c => {
        const reg = REGIONS.find(r => r.id === c.id);
        const isActive = active === c.id;
        return (
          <path
            key={c.id}
            d={c.d}
            fill={isActive && reg ? `${reg.dotColor}18` : c.inactive ? "#e8eef8" : "#dce8f7"}
            stroke={isActive && reg ? reg.dotColor : "rgba(21,72,149,0.18)"}
            strokeWidth={isActive ? 2 : 1}
            style={{ cursor: c.inactive ? "default" : "pointer", transition: "all 0.3s" }}
            onClick={() => !c.inactive && setActive(active === c.id ? null : c.id)}
          />
        );
      })}
      {SOURCE_DOTS.map((d, i) => {
        const reg = REGIONS.find(r => r.id === d.region);
        const isActive = active === d.region;
        return (
          <line
            key={`l${i}`}
            x1={d.cx} y1={d.cy} x2={QATAR.cx} y2={QATAR.cy}
            stroke={reg ? reg.dotColor : "#154895"}
            strokeWidth={isActive ? 1.5 : 0.6}
            strokeDasharray="4 4"
            opacity={active === null ? 0.22 : isActive ? 0.8 : 0.06}
            style={{ transition: "all 0.4s" }}
          />
        );
      })}
      {SOURCE_DOTS.map((d, i) => {
        const reg = REGIONS.find(r => r.id === d.region);
        const isActive = active === d.region;
        return (
          <g key={`d${i}`} style={{ cursor: "pointer" }}
            onClick={() => setActive(active === d.region ? null : d.region)}>
            <circle cx={d.cx} cy={d.cy} r={isActive ? 5 : 3}
              fill={reg ? reg.dotColor : "#154895"}
              opacity={active === null ? 0.55 : isActive ? 1 : 0.18}
              style={{ transition: "all 0.3s" }}
            />
            {isActive && (
              <text x={d.cx + 7} y={d.cy + 4} fill="#1e293b" fontSize="7" fontFamily="sans-serif" fontWeight="600">
                {d.label}
              </text>
            )}
          </g>
        );
      })}
      <circle cx={QATAR.cx} cy={QATAR.cy} r={11} fill="none" stroke="#154895" strokeWidth={1.5} opacity={0.3} />
      <circle cx={QATAR.cx} cy={QATAR.cy} r={6} fill="#154895" />
      <text x={QATAR.cx + 12} y={QATAR.cy - 8} fill="#154895" fontSize="9" fontFamily="sans-serif" fontWeight="700">Qatar ★</text>
      <circle cx={QATAR.cx} cy={QATAR.cy} r={6} fill="none" stroke="#e62224" strokeWidth={1.5}>
        <animate attributeName="r" from="8" to="22" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.45" to="0" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// ── Region Card — mirrors IndustryCard ────────────────────────────
function RegionCard({ region, index, active, setActive }) {
  const isActive = active === region.id;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      onClick={() => setActive(isActive ? null : region.id)}
      className="group relative flex flex-col rounded-[22px] border overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.88)",
        borderColor: isActive ? `${region.dotColor}40` : "rgba(21,72,149,0.08)",
        backdropFilter: "blur(10px)",
        boxShadow: isActive ? `0 16px 48px ${region.dotColor}18` : "none",
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.borderColor = `${region.dotColor}30`;
          e.currentTarget.style.boxShadow = `0 16px 48px ${region.dotColor}12`;
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] w-full origin-left transition-transform duration-300"
        style={{
          background: `linear-gradient(90deg, ${region.dotColor}, ${region.dotColor}55)`,
          transform: isActive ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      <div className="flex flex-col gap-4 p-7 flex-1">
        {/* Icon + tag */}
        <div className="flex items-start justify-between gap-2">
          <div
            className="w-12 h-12 rounded-[13px] flex items-center justify-center flex-shrink-0 text-2xl transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${region.dotColor}10` }}
          >
            {region.flag}
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-[5px] rounded-full flex-shrink-0"
            style={{
              background: `${region.dotColor}0e`,
              color: region.dotColor,
              border: `1px solid ${region.dotColor}22`,
            }}
          >
            {region.tag}
          </span>
        </div>

        {/* Title + sub */}
        <div>
          <h3
            className="font-bold text-[16px] mb-[6px] leading-snug transition-colors duration-200 group-hover:text-[#154895]"
            style={{ color: "#1e293b" }}
          >
            {region.label}
          </h3>
          <p className="text-[12.5px] leading-relaxed" style={{ color: "#64748b" }}>
            {region.desc}
          </p>
        </div>

        {/* Candidate count pill */}
        <div
          className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2"
          style={{ background: `${region.dotColor}08`, border: `1px solid ${region.dotColor}18` }}
        >
          <Users size={12} color={region.dotColor} strokeWidth={2} />
          <span
            className="text-[11px] font-bold"
            style={{ color: region.dotColor, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {region.workers}
          </span>
          <span className="text-[11px]" style={{ color: "#94a3b8" }}>candidates</span>
        </div>

        {/* Country pills */}
        <div className="flex flex-wrap gap-[6px] mt-auto">
          {region.countries.slice(0, 5).map(c => (
            <span
              key={c}
              className="text-[10.5px] font-semibold px-3 py-[5px] rounded-full uppercase tracking-wide"
              style={{
                background: "rgba(21,72,149,0.05)",
                color: "#475569",
                border: "1px solid rgba(21,72,149,0.08)",
              }}
            >
              {c}
            </span>
          ))}
          {region.countries.length > 5 && (
            <span className="text-[10.5px] font-bold px-2 py-[5px] rounded-full"
              style={{ color: region.dotColor }}>
              +{region.countries.length - 5} more
            </span>
          )}
        </div>

        {/* CTA link */}
        <motion.div
          className="inline-flex items-center gap-1.5 text-[12.5px] font-bold mt-2 self-start"
          style={{ color: region.dotColor }}
          whileHover={{ x: 3 }}
        >
          {isActive ? "Selected ✓" : "Explore Region"}
          <ArrowUpRight size={13} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function GlobalNetwork() {
  const [active, setActive] = useState(null);
  const activeRegion = REGIONS.find(r => r.id === active);

  return (
    <>
   
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}
    >
      {/* Background blobs + dot grid — identical to Industries */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{
          width: 800, height: 400, top: "5%", right: "-15%",
          background: "radial-gradient(ellipse, rgba(21,72,149,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
        <div className="absolute rounded-full" style={{
          width: 500, height: 500, bottom: "0%", left: "-10%",
          background: "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{
          backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12" style={{ zIndex: 2 }}>

        {/* ── Header ── */}
        <div className="max-w-[640px] mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(21,72,149,0.06)", borderColor: "rgba(21,72,149,0.14)", color: "#154895" }}
          >
            <span
              className="w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ background: "#e62224", animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            Global Presence
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-gray-900 leading-[1.1] tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Talent From{" "}
            <span className="relative inline-block" style={{ color: "#154895" }}>
              Across the World
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 10" fill="none" style={{ height: 10 }}>
                <motion.path
                  d="M2 7 Q45 2 80 7 Q115 12 155 5 Q195 0 230 6 Q260 11 298 5"
                  stroke="#e62224" strokeWidth="2.5" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
                />
              </svg>
            </span>
            ,{" "}Delivered to Qatar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="text-[15.5px] leading-relaxed"
            style={{ color: "#64748b" }}
          >
            28+ countries. 50,000+ assessed candidates. Dedicated local partners ensuring
            quality screening, compliance, and seamless coordination — every deployment.
          </motion.p>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap rounded-[20px] border mb-12 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderColor: "rgba(21,72,149,0.1)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(21,72,149,0.07)",
          }}
        >
          {STATS.map((s, i) => <StatChip key={s.label} {...s} index={i} />)}
        </motion.div>

        {/* ── Interactive Map Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[22px] border overflow-hidden mb-12"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderColor: "rgba(21,72,149,0.1)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(21,72,149,0.07)",
          }}
        >
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-7 py-4 border-b"
            style={{ borderColor: "rgba(21,72,149,0.08)" }}>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-[8px] flex items-center justify-center"
                style={{ background: "rgba(21,72,149,0.08)" }}>
                <Globe size={14} color="#154895" strokeWidth={1.8} />
              </div>
              <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: "#64748b" }}>
                Click a region to explore source countries
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {REGIONS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setActive(active === r.id ? null : r.id)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold px-4 py-[6px] rounded-full border transition-all duration-200"
                  style={active === r.id
                    ? { background: `${r.dotColor}12`, borderColor: `${r.dotColor}40`, color: r.dotColor }
                    : { background: "transparent", borderColor: "rgba(21,72,149,0.12)", color: "#64748b" }}
                >
                  <span>{r.flag}</span> {r.label}
                </button>
              ))}
              {active && (
                <button
                  onClick={() => setActive(null)}
                  className="text-[11px] font-semibold px-3 py-[6px] rounded-full border transition-all"
                  style={{ borderColor: "rgba(21,72,149,0.1)", color: "#94a3b8" }}
                >
                  Clear ×
                </button>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="px-6 py-4" style={{ background: "#f8faff" }}>
            <WorldMap active={active} setActive={setActive} />
          </div>

          {/* Detail panel */}
          <div className="min-h-[96px] px-7 py-5 border-t" style={{ borderColor: "rgba(21,72,149,0.08)" }}>
            {activeRegion ? (
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-8"
              >
                <div className="flex-1" style={{ minWidth: 220 }}>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xl">{activeRegion.flag}</span>
                    <span className="font-black text-[16px]"
                      style={{ color: "#1e293b", fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {activeRegion.label}
                    </span>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                      style={{
                        background: `${activeRegion.dotColor}0e`,
                        color: activeRegion.dotColor,
                        border: `1px solid ${activeRegion.dotColor}22`,
                      }}>
                      {activeRegion.workers} candidates
                    </span>
                  </div>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: "#64748b" }}>{activeRegion.desc}</p>
                </div>
                <div className="flex-1" style={{ minWidth: 260 }}>
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#94a3b8" }}>
                    Source Countries
                  </p>
                  <div className="flex flex-wrap gap-[6px]">
                    {activeRegion.countries.map(c => (
                      <span key={c}
                        className="text-[10.5px] font-semibold px-3 py-[5px] rounded-full uppercase tracking-wide"
                        style={{ background: "rgba(21,72,149,0.05)", color: "#475569", border: "1px solid rgba(21,72,149,0.08)" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <p className="text-center text-[13px] py-3" style={{ color: "#cbd5e1" }}>
                Select a region on the map to see sourcing details
              </p>
            )}
          </div>
        </motion.div>

        {/* ── Region Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {REGIONS.map((r, i) => (
            <RegionCard key={r.id} region={r} index={i} active={active} setActive={setActive} />
          ))}
        </div>

        {/* ── Why local partners card ── */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[22px] border mb-12 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderColor: "rgba(21,72,149,0.1)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 24px rgba(21,72,149,0.07)",
          }}
        >
       
        </motion.div> */}

        {/* ── CTA Banner — matches Industries exactly ── */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[22px] px-8 sm:px-10 py-8 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #0a1f42 0%, #154895 60%, #1d5eaa 100%)",
            boxShadow: "0 20px 60px rgba(21,72,149,0.3)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 10% 90%, rgba(230,34,36,0.18) 0%, transparent 50%)" }} />

          <div className="relative z-10 flex items-center gap-5">
            <div
              className="w-12 h-12 rounded-[13px] flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <MapPin size={20} color="rgba(255,255,255,0.85)" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-bold text-white text-[16px] leading-snug">
                Ready to hire from anywhere in the world?
              </p>
              <p className="text-[13px] mt-[3px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                Our global network delivers in{" "}
                <strong style={{ color: "rgba(255,255,255,0.85)" }}>25–30 days</strong> — we've done it 20,000+ times.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 flex-shrink-0">
            <motion.a
              href="tel:+97444434386"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold px-6 py-3 rounded-[11px] text-white border-2 transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}
              whileHover={{ background: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.6)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={14} /> +974 4443 4386
            </motion.a>
            <motion.a
              href="mailto:business@asliyarecruitment.com"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold px-6 py-3 rounded-[11px] transition-all duration-200"
              style={{ background: "#ffffff", color: "#154895" }}
              whileHover={{ background: "#e8f0fd", scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Email Us <ChevronRight size={14} />
            </motion.a>
          </div>
        </motion.div> */}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
      `}</style>
    </section>
  
    </>
  );
}