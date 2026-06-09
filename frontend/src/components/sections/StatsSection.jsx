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
  Briefcase,
  MapPin,
  Clock,
} from "lucide-react";

const stats = [
  {
    value: 20000,
    suffix: "+",
    label: "Candidates Placed",
    description:
      "Skilled workers, professionals & executives successfully deployed worldwide",
    icon: Users,
    accent: "#154895",
    lightBg: "rgba(21,72,149,0.06)",
  },
  {
    value: 500,
    suffix: "+",
    label: "Corporate Clients",
    description:
      "Leading companies across hospitality, construction, oil & gas and more",
    icon: Building2,
    accent: "#e62224",
    lightBg: "rgba(230,34,36,0.06)",
  },
  {
    value: 28,
    suffix: "+",
    label: "Countries Covered",
    description:
      "Active placement network spanning the Middle East, Asia, Europe & beyond",
    icon: Globe2,
    accent: "#10b981",
    lightBg: "rgba(16,185,129,0.06)",
  },
  {
    value: 7,
    suffix: "+ yrs",
    label: "Years of Excellence",
    description:
      "Nearly two decades of manpower expertise and industry relationships",
    icon: Award,
    accent: "#f59e0b",
    lightBg: "rgba(245,158,11,0.06)",
  },
  {
    value: 40,
    suffix: "+",
    label: "Industries Served",
    description:
      "From healthcare and IT to construction, logistics and finance",
    icon: Briefcase,
    accent: "#8b5cf6",
    lightBg: "rgba(139,92,246,0.06)",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention",
    description:
      "Nearly all clients return — a testament to our quality and reliability",
    icon: TrendingUp,
    accent: "#0891b2",
    lightBg: "rgba(8,145,178,0.06)",
  },
  {
    value: 15,
    suffix: " days",
    label: "Avg. Placement Time",
    description:
      "Fast turnaround from requirement to deployment without compromising quality",
    icon: Clock,
    accent: "#154895",
    lightBg: "rgba(21,72,149,0.06)",
  },
  {
    value: 30,
    suffix: "+",
    label: "Destination Countries",
    description:
      "Overseas postings across the GCC, Southeast Asia, Europe and beyond",
    icon: MapPin,
    accent: "#e62224",
    lightBg: "rgba(230,34,36,0.06)",
  },
];

function CountUp({ value, suffix, inView, accent }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const displayRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, value, count]);

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
      className="tabular-nums font-black leading-none"
      style={{
        fontSize: "clamp(32px, 4vw, 48px)",
        color: accent,
        fontFamily: "'Playfair Display', Georgia, serif",
      }}
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
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.07,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative group"
    >
      <div
        className="h-full rounded-[20px] p-7 border flex flex-col gap-5 transition-all duration-400"
        style={{
          background: "rgba(255,255,255,0.85)",
          borderColor: "rgba(21,72,149,0.08)",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${stat.accent}35`;
          e.currentTarget.style.boxShadow = `0 16px 48px ${stat.accent}14`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className="w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{ background: stat.lightBg }}
          >
            <Icon size={21} color={stat.accent} strokeWidth={1.8} />
          </div>
          <CountUp
            value={stat.value}
            suffix={stat.suffix}
            inView={inView}
            accent={stat.accent}
          />
        </div>

        <div>
          <h3
            className="font-bold text-[15px] mb-[5px]"
            style={{ color: "#1e293b" }}
          >
            {stat.label}
          </h3>
          <p
            className="text-[12.5px] leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            {stat.description}
          </p>
        </div>

        <div
          className="absolute bottom-0 left-6 right-6 h-[3px] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-350"
          style={{
            background: `linear-gradient(90deg, ${stat.accent}, ${stat.accent}60)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f4f8ff 50%, #ffffff 100%)",
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(21,72,149,0.045) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(21,72,149,0.12), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(21,72,149,0.12), transparent)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-[640px] mx-auto text-center mb-16">
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
              style={{
                background: "#e62224",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            Our Impact in Numbers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.08,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-black text-gray-900 leading-tight tracking-tight mb-4"
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            A Decade of Placing{" "}
            <span
              className="relative inline-block"
              style={{ color: "#154895" }}
            >
              The Right Talent
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 260 10"
                fill="none"
                style={{ height: 10 }}
              >
                <motion.path
                  d="M2 7 Q35 2 65 7 Q95 12 130 5 Q165 0 195 6 Q225 11 258 5"
                  stroke="#e62224"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
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
            From frontline workers to C-suite leaders — our numbers reflect the
            trust of hundreds of global companies and thousands of careers built
            through RecruitMax.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 rounded-[22px] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background:
              "linear-gradient(135deg, #0d2d5e 0%, #154895 60%, #1d5eaa 100%)",
            boxShadow: "0 20px 60px rgba(21,72,149,0.28)",
          }}
        >
          <div className="text-center sm:text-left">
            <p
              className="font-black text-white leading-tight mb-1"
              style={{
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Ready to scale your workforce?
            </p>
            <p
              className="text-[13.5px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Tell us your hiring needs — we'll find the right manpower, fast.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold px-6 py-3 rounded-[11px] text-white border-2 transition-all duration-200"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
              }}
              whileHover={{
                background: "rgba(255,255,255,0.2)",
                borderColor: "rgba(255,255,255,0.6)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Get a Free Quote
            </motion.a>
            <motion.a
              href="/services"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold px-6 py-3 rounded-[11px] transition-all duration-200"
              style={{ background: "#ffffff", color: "#154895" }}
              whileHover={{ background: "#e8f0fd" }}
              whileTap={{ scale: 0.97 }}
            >
              Our Services
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
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
