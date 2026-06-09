import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  Zap,
  Shield,
  TrendingUp,
  Star,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const REGIONS = [
  {
    id: "asia",
    label: "Asia",
    emoji: "🌏",
    color: "bg-blue-900",
    ring: "ring-blue-400",
    accentHex: "#3b82f6",
    workers: "35,000+",
    campaigns: "70+",
    desc: "Our largest talent pool. Skilled, semi-skilled, and domestic workers across every trade and sector.",
    countries: [
      "India",
      "Pakistan",
      "Nepal",
      "Bangladesh",
      "Philippines",
      "Sri Lanka",
      "Maldives",
    ],
    // map dot positions [cx%, cy%] within the SVG viewBox
    dots: [
      { cx: 69, cy: 46, name: "India" },
      { cx: 66, cy: 40, name: "Pakistan" },
      { cx: 68, cy: 38, name: "Nepal" },
      { cx: 70, cy: 43, name: "Bangladesh" },
      { cx: 77, cy: 50, name: "Philippines" },
      { cx: 67, cy: 52, name: "Sri Lanka" },
      { cx: 61, cy: 58, name: "Maldives" },
    ],
  },
  {
    id: "africa",
    label: "Africa",
    emoji: "🌍",
    color: "bg-amber-900",
    ring: "ring-amber-400",
    accentHex: "#f59e0b",
    workers: "12,000+",
    campaigns: "25+",
    desc: "Fast-growing sourcing hub for construction, security, hospitality, and logistics sectors.",
    countries: ["Ghana", "Kenya", "Nigeria", "Tanzania", "Morocco", "Algeria"],
    dots: [
      { cx: 48, cy: 52, name: "Nigeria" },
      { cx: 46, cy: 43, name: "Morocco" },
      { cx: 47, cy: 46, name: "Algeria" },
      { cx: 51, cy: 54, name: "Ghana" },
      { cx: 55, cy: 57, name: "Kenya" },
      { cx: 54, cy: 61, name: "Tanzania" },
    ],
  },
  {
    id: "europe",
    label: "Europe & Middle East",
    emoji: "🌐",
    color: "bg-emerald-900",
    ring: "ring-emerald-400",
    accentHex: "#10b981",
    workers: "3,000+",
    campaigns: "10+",
    desc: "Specialized professionals and skilled trades for high-end projects requiring European standards.",
    countries: [
      "UK",
      "Ukraine",
      "Romania",
      "Cyprus",
      "Lebanon",
      "Armenia",
      "Moldova",
      "Russia",
    ],
    dots: [
      { cx: 44, cy: 28, name: "UK" },
      { cx: 49, cy: 26, name: "Ukraine" },
      { cx: 48, cy: 29, name: "Romania" },
      { cx: 51, cy: 35, name: "Cyprus" },
      { cx: 56, cy: 37, name: "Lebanon" },
      { cx: 57, cy: 34, name: "Armenia" },
      { cx: 47, cy: 27, name: "Moldova" },
      { cx: 54, cy: 24, name: "Russia" },
    ],
  },
];

const STATS = [
  { value: "28+", label: "Countries", icon: Globe },
  { value: "50K+", label: "Candidates Assessed", icon: Users },
  { value: "100+", label: "Campaigns Executed", icon: TrendingUp },
  { value: "25–30", label: "Days to Deploy", icon: Zap },
];

const WHY_ITEMS = [
  {
    title: "Local Partner in Every Country",
    body: "Dedicated ground teams source and pre-screen candidates before you see a single profile.",
  },
  {
    title: "Labor Law Compliance",
    body: "Every country's regulations handled by people who live and work there.",
  },
  {
    title: "On-Site Campaigns",
    body: "500–5,000+ candidates screened per campaign. Face-to-face. Real assessments.",
  },
  {
    title: "25–30 Day Deployment",
    body: "From signed agreement to workers on-site in Qatar — tracked every step.",
  },
  {
    title: "Zero Exploitation Guarantee",
    body: "Ethical, documented, Ministry of Labor approved. License #618.",
  },
];

const QATAR = { cx: 58, cy: 40 };

function WorldMap({ active, onRegionClick }) {
  const continents = [
    {
      id: "northAmerica",
      d: "M8 12 L20 10 L24 16 L22 28 L18 34 L14 32 L9 24 Z",
      passive: true,
    },
    {
      id: "southAmerica",
      d: "M16 36 L22 34 L25 42 L22 54 L17 56 L13 48 L14 40 Z",
      passive: true,
    },
    {
      id: "europe",
      d: "M40 12 L50 10 L54 15 L52 22 L46 24 L40 22 L38 17 Z",
      regionId: "europe",
    },
    {
      id: "africa",
      d: "M42 28 L52 26 L56 34 L54 48 L48 52 L42 48 L39 38 L40 30 Z",
      regionId: "africa",
    },
    {
      id: "asia",
      d: "M52 10 L74 8 L82 14 L84 22 L78 30 L68 34 L58 32 L52 26 L50 18 Z",
      regionId: "asia",
    },
    {
      id: "oceania",
      d: "M72 50 L82 48 L84 56 L78 60 L70 58 Z",
      passive: true,
    },
  ];

  const activeRegion = REGIONS.find((r) => r.id === active);

  return (
    <svg
      viewBox="0 0 100 70"
      className="w-full"
      style={{ maxHeight: 340 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="70" fill="rgba(21,72,149,0.12)" rx="8" />

      {[10, 20, 30, 40, 50, 60].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="100"
          y2={y}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.3"
        />
      ))}
      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="70"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.3"
        />
      ))}

      {continents.map((c) => {
        const region = REGIONS.find((r) => r.id === c.regionId);
        const isActive = active === c.regionId;
        return (
          <path
            key={c.id}
            d={c.d}
            fill={
              c.passive
                ? "rgba(255,255,255,0.06)"
                : isActive
                  ? region.accentHex + "44"
                  : "rgba(21,72,149,0.35)"
            }
            stroke={isActive ? region.accentHex : "rgba(255,255,255,0.15)"}
            strokeWidth={isActive ? 0.5 : 0.3}
            style={{
              cursor: c.passive ? "default" : "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => !c.passive && onRegionClick(c.regionId)}
          />
        );
      })}

      {REGIONS.map((region) =>
        region.dots.map((dot, i) => {
          const isActive = active === region.id;
          return (
            <line
              key={`${region.id}-${i}`}
              x1={dot.cx}
              y1={dot.cy}
              x2={QATAR.cx}
              y2={QATAR.cy}
              stroke={region.accentHex}
              strokeWidth={isActive ? 0.6 : 0.2}
              strokeDasharray="1.5 1.5"
              opacity={isActive ? 0.7 : active ? 0.05 : 0.18}
              style={{ transition: "all 0.4s" }}
            />
          );
        }),
      )}

      {REGIONS.map((region) =>
        region.dots.map((dot, i) => {
          const isActive = active === region.id;
          return (
            <g key={`dot-${region.id}-${i}`}>
              <circle
                cx={dot.cx}
                cy={dot.cy}
                r={isActive ? 1.4 : 0.9}
                fill={isActive ? region.accentHex : "rgba(255,255,255,0.4)"}
                style={{ transition: "all 0.3s", cursor: "pointer" }}
                onClick={() => onRegionClick(region.id)}
              />
              {isActive && (
                <text
                  x={dot.cx + 1.8}
                  y={dot.cy + 0.9}
                  fill={region.accentHex}
                  fontSize="2.2"
                  fontFamily="sans-serif"
                  style={{ pointerEvents: "none" }}
                >
                  {dot.name}
                </text>
              )}
            </g>
          );
        }),
      )}

      <circle
        cx={QATAR.cx}
        cy={QATAR.cy}
        r="3"
        fill="none"
        stroke="#e2b55a"
        strokeWidth="0.5"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          from="2"
          to="6"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.5"
          to="0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={QATAR.cx} cy={QATAR.cy} r="2" fill="#e2b55a" opacity="0.9" />
      <text
        x={QATAR.cx + 2.5}
        y={QATAR.cy - 1.2}
        fill="#e2b55a"
        fontSize="2.5"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        Qatar ★
      </text>
    </svg>
  );
}

export default function GlobalNetwork() {
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionClick = (id) => {
    setActiveRegion((prev) => (prev === id ? null : id));
  };

  const activeData = REGIONS.find((r) => r.id === activeRegion);

  return (
    <div className="min-h-screen bg-[#0b1829] text-white font-sans">
      <section className="relative overflow-hidden px-6 pt-24 pb-20">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #e2b55a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(21,72,149,0.35) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e2b55a33] bg-[#e2b55a11] mb-7"
          >
            <Globe size={13} className="text-[#e2b55a]" />
            <span className="text-[#e2b55a] text-xs font-semibold tracking-widest uppercase">
              Global Presence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Talent From{" "}
            <span className="text-[#e2b55a]">Across the World,</span>
            <br />
            Delivered to Qatar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed mb-12"
          >
            28+ countries. 50,000+ assessed candidates. Dedicated local partners
            ensuring quality screening, compliance, and fast deployment — every
            time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e2b55a22] border border-[#e2b55a22] rounded-2xl overflow-hidden backdrop-blur-sm"
          >
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div
                key={i}
                className="bg-[#0b1829] px-6 py-6 flex flex-col items-center gap-2"
              >
                <Icon size={18} className="text-[#154895]" strokeWidth={2} />
                <div
                  className="text-3xl font-bold text-[#e2b55a]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {value}
                </div>
                <div className="text-slate-500 text-xs tracking-wider uppercase">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-[#154895]/40 overflow-hidden"
            style={{ background: "rgba(21,72,149,0.08)" }}
          >
            <div className="px-6 py-4 border-b border-[#154895]/30 flex items-center justify-between flex-wrap gap-3">
              <span className="text-slate-500 text-xs tracking-widest uppercase">
                Click a region · Dots show source countries · Star = Qatar
              </span>
              {activeRegion && (
                <button
                  onClick={() => setActiveRegion(null)}
                  className="text-xs text-slate-400 border border-slate-700 rounded-full px-3 py-1 hover:border-[#e2b55a] hover:text-[#e2b55a] transition-colors"
                >
                  Clear selection
                </button>
              )}
            </div>

            <div className="p-4 bg-[#060e1a]">
              <WorldMap
                active={activeRegion}
                onRegionClick={handleRegionClick}
              />
            </div>

            <div className="min-h-[100px] px-6 py-5 border-t border-[#154895]/30">
              <AnimatePresence mode="wait">
                {activeData ? (
                  <motion.div
                    key={activeData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap gap-8 items-start"
                  >
                    <div className="flex-1 min-w-[220px]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{activeData.emoji}</span>
                        <span
                          className="text-xl font-bold text-[#e2b55a]"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {activeData.label}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full border border-[#e2b55a33] bg-[#e2b55a11] text-[#e2b55a]">
                          {activeData.workers} candidates
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {activeData.desc}
                      </p>
                    </div>
                    <div className="flex-1 min-w-[240px]">
                      <div className="text-xs text-slate-500 tracking-widest uppercase mb-3">
                        Source Countries
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeData.countries.map((c) => (
                          <span
                            key={c}
                            className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-600 text-sm text-center py-4"
                  >
                    Select a region on the map to explore source countries
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <div className="text-[#154895] text-xs font-semibold tracking-widest uppercase mb-3">
              Our Sourcing Network
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Where We Source Your Talent
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {REGIONS.map((r, i) => {
              const isActive = activeRegion === r.id;
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleRegionClick(r.id)}
                  className={`
                    relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 p-7
                    ${
                      isActive
                        ? "border-[#e2b55a] bg-[#154895]/20"
                        : "border-[#154895]/30 bg-[#154895]/05 hover:border-[#154895]/60"
                    }
                  `}
                >
                  <div
                    className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${r.accentHex}22 0%, transparent 70%)`,
                    }}
                  />

                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl">{r.emoji}</span>
                    <span
                      className="text-2xl font-bold text-[#e2b55a]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {r.workers}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-2">{r.label}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {r.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {r.countries.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="text-xs text-slate-400 bg-white/5 rounded-md px-2.5 py-1"
                      >
                        {c}
                      </span>
                    ))}
                    {r.countries.length > 4 && (
                      <span className="text-xs text-[#e2b55a] px-2 py-1">
                        +{r.countries.length - 4} more
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-[#e2b55a]/20 flex items-center gap-2 text-xs text-[#e2b55a] font-semibold">
                      <CheckCircle size={13} />
                      {r.campaigns} campaigns executed
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="px-6 py-24 border-t border-[#154895]/30"
        style={{ background: "rgba(21,72,149,0.05)" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="text-[#154895] text-xs font-semibold tracking-widest uppercase mb-4">
              Why It Works
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold leading-snug mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dedicated Partners
              <br />
              <span className="text-[#e2b55a]">In Every Country</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-[0.95rem] mb-8">
              We don't source blindly. Each of our 28+ country partnerships
              means a team on the ground — sourcing, vetting, and preparing
              candidates before they ever meet your hiring manager.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#154895] hover:bg-[#1a5ab8] text-white font-bold text-sm px-7 py-3.5 rounded-lg transition-colors"
            >
              Start a Campaign <ArrowRight size={15} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="space-y-0"
          >
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className={`flex gap-4 items-start py-5 ${i < WHY_ITEMS.length - 1 ? "border-b border-[#154895]/20" : ""}`}
              >
                <CheckCircle
                  size={18}
                  className="text-[#154895] mt-0.5 shrink-0"
                  strokeWidth={2.5}
                />
                <div>
                  <div className="font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-slate-400 text-[0.84rem] leading-relaxed">
                    {item.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-10 border-t border-[#154895]/30">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-center">
          {[
            { icon: Shield, text: "Ministry of Labor Qatar · License #618" },
            { icon: Star, text: "Supreme Committee Approved · FIFA Standard" },
            { icon: CheckCircle, text: "Qatar Labor Law Compliant" },
            { icon: Globe, text: "International Standards" },
          ].map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-[#154895]/30 bg-[#154895]/08"
            >
              <Icon size={14} className="text-[#154895]" />
              <span className="text-slate-300 text-sm">{text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative px-6 py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #e2b55a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(21,72,149,0.2) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e2b55a33] bg-[#e2b55a11] mb-6">
              <MapPin size={12} className="text-[#e2b55a]" />
              <span className="text-[#e2b55a] text-xs font-semibold tracking-widest uppercase">
                Doha, Qatar
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Hire From
              <br />
              <span className="text-[#e2b55a]">Anywhere in the World?</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-10 text-[0.97rem]">
              Every week you delay costs money. Our global network is ready to
              deploy in 25–30 days.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:+97444434386"
                className="inline-flex items-center gap-2.5 bg-[#154895] hover:bg-[#1a5ab8] text-white font-bold text-sm px-7 py-4 rounded-lg transition-colors"
              >
                <Phone size={15} /> +974 4443 4386
              </a>
              <a
                href="mailto:business@asliyarecruitment.com"
                className="inline-flex items-center gap-2.5 border border-[#154895]/60 hover:border-[#154895] bg-[#154895]/10 hover:bg-[#154895]/20 text-white font-semibold text-sm px-7 py-4 rounded-lg transition-colors"
              >
                <Mail size={15} /> business@asliyarecruitment.com
              </a>
            </div>

            <div className="mt-10 text-slate-600 text-xs">
              Muntaza Trading Center, Office 3, Floor 6 · Doha, Qatar · P.O. Box
              1414
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
