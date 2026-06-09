import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Users,
  Building2,
  Globe2,
  Award,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

// ─── Official Asliya Data (No Counterfeit Stats) ───────────────────────────
const stats = [
  {
    value: 7,
    suffix: "+",
    label: "Years of Expertise",
    description: "Since 2018, delivering regulated manpower solution leadership inside Qatar.",
    icon: Award,
    accent: "text-[#154895]",
    bgLight: "bg-[#154895]/6",
    borderHover: "hover:border-[#154895]/30",
    shadowHover: "hover:shadow-[0_20px_50px_-12px_rgba(21,72,149,0.15)]",
    lineGradient: "from-[#154895] to-[#1e5bb8]",
  },
  {
    value: 20000,
    suffix: "+",
    label: "Successful Deployments",
    description: "Skilled, semi-skilled, and professional workforces legally mobilized.",
    icon: Users,
    accent: "text-[#1a5ab8]",
    bgLight: "bg-[#1a5ab8]/6",
    borderHover: "hover:border-[#1a5ab8]/30",
    shadowHover: "hover:shadow-[0_20px_50px_-12px_rgba(26,90,184,0.15)]",
    lineGradient: "from-[#1a5ab8] to-[#154895]",
  },
  {
    value: 300,
    suffix: "+",
    label: "Corporate Clients",
    description: "Trusted by Qatar's premiere contracting, hospitality, and energy giants.",
    icon: Building2,
    accent: "text-[#0d3270]",
    bgLight: "bg-[#0d3270]/6",
    borderHover: "hover:border-[#0d3270]/30",
    shadowHover: "hover:shadow-[0_20px_50px_-12px_rgba(13,50,112,0.15)]",
    lineGradient: "from-[#0d3270] to-[#154895]",
  },
  {
    value: 28,
    suffix: "+",
    label: "Source Countries",
    description: "Global networks ensuring prompt and legal vetting pipelines.",
    icon: Globe2,
    accent: "text-[#154895]",
    bgLight: "bg-[#154895]/6",
    borderHover: "hover:border-[#154895]/30",
    shadowHover: "hover:shadow-[0_20px_50px_-12px_rgba(21,72,149,0.15)]",
    lineGradient: "from-[#154895] to-[#1a5ab8]",
  },
];

function CountUp({ value, suffix, inView, accentClass }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const displayRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [inView, value]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v.toLocaleString() + suffix;
      }
    });
  }, [rounded, suffix]);

  return (
    <span
      ref={displayRef}
      className={`tabular-nums font-serif font-black leading-none text-[clamp(32px,4vw,46px)] ${accentClass}`}
    >
      0{suffix}
    </span>
  );
}

function StatCard({ stat, index, inView }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      className={`relative group bg-white/90 border border-[#154895]/8 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between min-h-[190px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${stat.borderHover} ${stat.shadowHover}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.bgLight}`}>
            <Icon size={20} className={stat.accent} strokeWidth={2} />
          </div>
          <CountUp
            value={stat.value}
            suffix={stat.suffix}
            inView={inView}
            accentClass={stat.accent}
          />
        </div>

        <h3 className="font-bold text-[15px] mb-1.5 text-gray-800 tracking-tight">
          {stat.label}
        </h3>
        <p className="text-[12.5px] leading-relaxed text-gray-400 font-normal">
          {stat.description}
        </p>
      </div>

      {/* Tailwind Refactored Bottom Accent Border */}
      <span
        className={`absolute bottom-0 left-6 right-6 h-[3px] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${stat.lineGradient}`}
      />
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white via-[#f4f8ff] to-white"
    >
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(ellipse,rgba(21,72,149,0.04)_0%,transparent_70%)] blur-[60px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#154895]/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#154895]/12 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 rounded-full px-4 py-1.5 border border-[#154895]/15 bg-[#154895]/6 text-[11px] font-bold uppercase tracking-widest text-[#154895]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a5ab8] animate-ping" />
            Our Impact in Numbers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-bold text-gray-900 leading-tight tracking-tight text-[30px] sm:text-[38px] lg:text-[44px] mb-4"
          >
            Empowering Qatar With{" "}
            <span className="relative inline-block text-[#154895] italic font-normal">
              The Right Talent
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-[8px]"
                viewBox="0 0 260 10"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 7 Q35 2 65 7 Q95 12 130 5 Q165 0 195 6 Q225 11 258 5"
                  stroke="#1a5ab8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="text-sm sm:text-[15px] leading-relaxed text-gray-500 max-w-lg mx-auto"
          >
            From specialized bulk workforces to corporate administrators — our deployments reflect the compliance, speed, and continuous trust built by Asliya Manpower.
          </motion.p>
        </div>

        {/* Real Stats Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer Commercial Call-To-Action Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-br from-[#0d3270] via-[#154895] to-[#1e5bb8] shadow-xl"
        >
          <div className="text-center md:text-left">
            <p className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight mb-2">
              Ready to scale your workforce under full compliance?
            </p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-xs text-white/70">
              <span className="inline-flex items-center gap-1 text-[#1a5ab8] font-bold bg-white px-2 py-0.5 rounded-md text-[10px] uppercase">
                <ShieldCheck size={12} /> Ministry Licensed #618
              </span>
              <span>• Zero delays. 25–30 days structured delivery.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center font-bold text-xs tracking-wide uppercase px-6 py-3.5 rounded-xl text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-200 w-full sm:w-auto"
              whileTap={{ scale: 0.97 }}
            >
              Get a Free Quote
            </motion.a>
            <motion.a
              href="/services"
              className="inline-flex items-center justify-center font-bold text-xs tracking-wide uppercase px-6 py-3.5 rounded-xl bg-white text-[#154895] hover:bg-[#e8f0fd] transition-all duration-200 shadow-md w-full sm:w-auto"
              whileTap={{ scale: 0.97 }}
            >
              Our Services
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="ml-1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}