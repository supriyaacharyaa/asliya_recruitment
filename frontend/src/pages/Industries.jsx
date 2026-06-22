import { motion } from "framer-motion";
import {
  HardHat, Hotel, Stethoscope, ShieldCheck,
  Truck, ShoppingBag, Home, Wrench, ChevronRight,
  CalendarDays, Users, Globe, Building2,
  ArrowUpRight, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const STATS = [
  { icon: CalendarDays, value: "18+", label: "Years Experience",  accent: "#154895" },
  { icon: Building2,    value: "500+", label: "Corporate Clients", accent: "#e62224" },
  { icon: Users,        value: "50K+", label: "Workers Placed",    accent: "#10b981" },
  { icon: Globe,        value: "42",   label: "Countries Served",  accent: "#f59e0b" },
];


const INDUSTRIES = [
  {
    icon: HardHat,
    title: "Construction",
    sub: "Infrastructure & mega-project specialists for any scale.",
    roles: ["Civil Engineers", "Steel Fixers", "Masons", "Electricians"],
    accent: "#154895",
    tag: "High Demand",
  },
  {
    icon: Hotel,
    title: "Hospitality",
    sub: "5-star pre-screened talent for hotels and resorts.",
    roles: ["Managers", "Chefs", "Front Desk", "Housekeeping"],
    accent: "#b45309",
    tag: "GCC Focus",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    sub: "Licensed and verified medical professionals worldwide.",
    roles: ["Nurses", "Lab Techs", "Physiotherapists", "Caregivers"],
    accent: "#e62224",
    tag: "Certified",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    sub: "Trained, certified security personnel ready to deploy.",
    roles: ["Guards", "CCTV Operators", "Supervisors", "Cleaners"],
    accent: "#0891b2",
    tag: "Vetted",
  },
  {
    icon: Truck,
    title: "Logistics",
    sub: "Supply chain, warehousing and transportation experts.",
    roles: ["Warehouse Staff", "Forklift Ops", "HMV Drivers", "Inventory"],
    accent: "#7c3aed",
    tag: "Operational",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    sub: "Multilingual staff for luxury outlets and megastores.",
    roles: ["Sales Associates", "Store Managers", "Cashiers", "Merchandisers"],
    accent: "#059669",
    tag: "Multilingual",
  },
  {
    icon: Home,
    title: "Domestic",
    sub: "Background-verified home and facility staff.",
    roles: ["Housemaids", "Nannies", "Drivers", "Cooks"],
    accent: "#154895",
    tag: "Verified",
  },
  {
    icon: Wrench,
    title: "Technical / MEP",
    sub: "Skilled maintenance, MEP and workshop technicians.",
    roles: ["HVAC Techs", "Welders", "Painters", "Crane Operators"],
    accent: "#d97706",
    tag: "Skilled Trade",
  },
];

 


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


function IndustryCard({ ind, index, onHire }) {
  const Icon = ind.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="group relative flex flex-col rounded-[22px] border overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.88)",
        borderColor: "rgba(21,72,149,0.08)",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${ind.accent}32`;
        e.currentTarget.style.boxShadow = `0 16px 48px ${ind.accent}14`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
        style={{ background: `linear-gradient(90deg, ${ind.accent}, ${ind.accent}55)` }}
      />

      <div className="flex flex-col gap-4 p-7 flex-1">

        {/* Icon + tag */}
        <div className="flex items-start justify-between gap-2">
          <div
            className="w-12 h-12 rounded-[13px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${ind.accent}10` }}
          >
            <Icon size={21} color={ind.accent} strokeWidth={1.8} />
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-[5px] rounded-full flex-shrink-0"
            style={{
              background: `${ind.accent}0e`,
              color: ind.accent,
              border: `1px solid ${ind.accent}22`,
            }}
          >
            {ind.tag}
          </span>
        </div>

        {/* Title + sub */}
        <div>
          <h3
            className="font-bold text-[16px] mb-[6px] leading-snug transition-colors duration-250 group-hover:text-[#154895]"
            style={{ color: "#1e293b" }}
          >
            {ind.title}
          </h3>
          <p className="text-[12.5px] leading-relaxed" style={{ color: "#64748b" }}>
            {ind.sub}
          </p>
        </div>

        {/* Roles */}
        <div className="flex flex-wrap gap-[7px] mt-auto">
          {ind.roles.map((r) => (
            <span
              key={r}
              className="text-[10.5px] font-semibold px-3 py-[5px] rounded-full uppercase tracking-wide"
              style={{
                background: "rgba(21,72,149,0.05)",
                color: "#475569",
                border: "1px solid rgba(21,72,149,0.08)",
              }}
            >
              {r}
            </span>
          ))}
        </div>

        {/* CTA link */}
        <motion.button
          onClick={() => onHire?.(ind)}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-bold mt-3 self-start transition-colors duration-200"
          style={{ color: ind.accent }}
          whileHover={{ x: 3 }}
        >
          Hire Specialists
          <ArrowUpRight size={13} />
        </motion.button>
      </div>
    </motion.div>
  );
}


export default function Industries({ onHire, onContact }) {
   const navigate = useNavigate();
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}
    >
     
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 800, height: 400,
            top: "5%", right: "-15%",
            background: "radial-gradient(ellipse, rgba(21,72,149,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: "0%", left: "-10%",
            background: "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)",
            backgroundSize: "38px 38px",
          }}
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12" style={{ zIndex: 2 }}>

      
        <div className="max-w-[640px] mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
            style={{
              background: "rgba(21,72,149,0.06)",
              borderColor: "rgba(21,72,149,0.14)",
              color: "#154895",
            }}
          >
            <span
              className="w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ background: "#e62224", animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            Industries We Serve
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-gray-900 leading-[1.1] tracking-tight mb-4"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Sector-Specific{" "}
            <span className="relative inline-block" style={{ color: "#154895" }}>
              Manpower Expertise
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 10" fill="none" style={{ height: 10 }}>
                <motion.path
                  d="M2 7 Q45 2 80 7 Q115 12 155 5 Q195 0 230 6 Q260 11 298 5"
                  stroke="#e62224"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="text-[15.5px] leading-relaxed"
            style={{ color: "#64748b" }}
          >
            Our recruiters are industry-specialists — not generalists. Pre-screened, trade-tested,
            and deployment-ready professionals for every sector you operate in.
          </motion.p>
        </div>

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
          {STATS.map((s, i) => (
            <StatChip key={s.label} {...s} index={i} />
          ))}
        </motion.div>

        {/* ── Industries grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
          {INDUSTRIES.map((ind, i) => (
            <IndustryCard key={ind.title} ind={ind} index={i} onHire={onHire} />
          ))}
        </div>

      
        <motion.div
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
      
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 10% 90%, rgba(230,34,36,0.18) 0%, transparent 50%)",
            }}
          />

          <div className="relative z-10 flex items-center gap-5">
            <div
              className="w-12 h-12 rounded-[13px] flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <Zap size={20} color="rgba(255,255,255,0.85)" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-bold text-white text-[16px] leading-snug">
                Don't see your sector?
              </p>
              <p className="text-[13px] mt-[3px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                We recruit across <strong style={{ color: "rgba(255,255,255,0.85)" }}>all industries</strong> — tell us what you need and we'll source it.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 flex-shrink-0">
            <motion.button
               onClick={() => navigate("/quote")}
              className="inline-flex items-center gap-2 text-[13.5px] font-bold px-6 py-3 rounded-[11px] text-white border-2 transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)" }}
              whileHover={{ background: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.6)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get a Free Quote
            </motion.button>
            <motion.button
               onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 text-[13.5px] font-bold px-6 py-3 rounded-[11px] transition-all duration-200"
              style={{ background: "#ffffff", color: "#154895" }}
              whileHover={{ background: "#e8f0fd", scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Request Manpower
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </motion.div>

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