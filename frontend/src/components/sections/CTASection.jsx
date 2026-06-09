import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { useRef } from "react";
import Container from "../ui/Container";

// Asliya Manpower Authentic Stats & Perks
const STATS = [
  { value: "300+",  label: "Satisfied Clients" },
  { value: "20K+",  label: "Deployments"       },
  { value: "25-30", label: "Days Delivery"     },
];

const PERKS = [
  { icon: CheckCircle, text: "Ministry Licensed (#618)" },
  { icon: Users,       text: "Pre-Screened Talent Hub" },
  { icon: Clock,       text: "24/7 Deployment Support" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function CTASection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  // Parallax optimized for smoother scrolling
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-28 overflow-hidden bg-[#f3f5fb]">
      <Container className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(11,36,84,0.15)]"
        >
          {/* Deep navy corporate base */}
          <div className="absolute inset-0 bg-[#0b2454]" />

          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top-right blue ambient orb */}
          <motion.div
            style={{ y: orb1Y }}
            className="absolute -top-40 -right-40 w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full pointer-events-none"
            animate={{ opacity: [0.15, 0.22, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <div className="w-full h-full rounded-full bg-[#154895] blur-[60px] md:blur-[90px]" />
          </motion.div>

          {/* Bottom-left gold luxury orb */}
          <motion.div
            style={{ y: orb2Y }}
            className="absolute -bottom-36 -left-36 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full pointer-events-none"
            animate={{ opacity: [0.12, 0.18, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden
          >
            <div className="w-full h-full rounded-full bg-[#c9902a] blur-[50px] md:blur-[80px]" />
          </motion.div>

          {/* Technical light slashes for industrial depth */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <div
              className="absolute top-0 left-[20%] w-[1px] h-full opacity-[0.05]"
              style={{ background: "linear-gradient(to bottom, transparent, white 50%, transparent)" }}
            />
            <div
              className="absolute top-0 right-[25%] w-[1px] h-full opacity-[0.04]"
              style={{ background: "linear-gradient(to bottom, transparent, white 50%, transparent)" }}
            />
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 px-5 py-12 sm:px-12 sm:py-20 md:px-20 md:py-24">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >

              {/* Recruitment Status Tag */}
              <motion.div variants={fadeUp} className="flex justify-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8b45a] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9902a]" />
                  </span>
                  <span className="text-white/90 text-[11px] sm:text-[12px] font-bold tracking-wider uppercase">
                    Scale Your Workforce Instantly
                  </span>
                </div>
              </motion.div>

              {/* Dynamic H2 Heading */}
              <motion.h2
                variants={fadeUp}
                className="text-[28px] sm:text-[40px] md:text-[52px] font-black text-white leading-[1.15] mb-5 sm:mb-6 tracking-tight"
              >
                Build Your Dream{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#e8b45a] to-[#c9902a]">
                    Workforce
                  </span>
                  {/* Underline custom svg graphics */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-[8px]"
                    viewBox="0 0 260 10"
                    fill="none"
                    aria-hidden
                  >
                    <motion.path
                      d="M2 8 Q65 2 130 6 Q195 10 258 4"
                      stroke="#c9902a"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                </span>
                {" "}Today
              </motion.h2>

              {/* Core Proposition Paragraph */}
              <motion.p
                variants={fadeUp}
                className="text-white/70 text-[14px] sm:text-[16px] leading-relaxed mb-10 sm:mb-12 max-w-xl mx-auto font-normal"
              >
                Stop waiting for talent. Partner with Asliya Manpower to deploy fully certified, pre-screened professionals from 28+ countries within 25–30 days.
              </motion.p>

              {/* Stats Counters Grid */}
              <motion.div
                variants={fadeUp}
                className="flex justify-center mb-10 sm:mb-12"
              >
                <div className="grid grid-cols-3 w-full max-w-lg bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm divide-x divide-white/10">
                  {STATS.map(({ value, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center justify-center p-3 sm:p-5 text-center min-w-0"
                    >
                      <span className="text-[20px] sm:text-[28px] font-black text-white leading-none mb-1 truncate w-full">
                        {value}
                      </span>
                      <span className="text-white/50 text-[9px] sm:text-[11px] uppercase tracking-wider font-semibold block truncate w-full">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Double CTA Buttons Row */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3.5 justify-center items-stretch sm:items-center mb-10"
              >
                {/* Primary Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white text-[#0b2454] font-bold text-[14px] sm:text-[15px] px-7 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-black/[0.04] to-transparent skew-x-[-20deg]" />
                  <span className="relative">Get Started Now</span>
                  <ArrowRight
                    size={16}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>

                {/* Secondary Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white/5 backdrop-blur-sm text-white font-bold text-[14px] sm:text-[15px] px-7 py-4 rounded-xl border border-white/15 flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/25 transition-all duration-300"
                >
                  <Calendar size={16} className="transition-transform duration-300 group-hover:rotate-6" />
                  Schedule Consultation
                </motion.button>
              </motion.div>

              {/* Lower Verified Badges Bar */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 border-t border-white/10 pt-8"
              >
                {PERKS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 w-full sm:w-auto justify-center">
                    <Icon size={14} strokeWidth={2.5} className="text-[#c9902a] flex-shrink-0" />
                    <span className="text-white/60 text-[12px] font-medium tracking-wide">{text}</span>
                  </div>
                ))}
              </motion.div>

            </motion.div>
          </div>

          {/* Top-edge ambient lighting highlight */}
          <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </Container>
    </section>
  );
}