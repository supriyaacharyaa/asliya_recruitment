import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Container from "../ui/Container";

const STATS = [
  { value: "300+", label: "Companies Served" },
  { value: "98%",  label: "Satisfaction Rate" },
  { value: "24h",  label: "Response Time"     },
];

const PERKS = [
  { icon: CheckCircle, text: "Free consultation" },
  { icon: Users,       text: "No commitment required" },
  { icon: Clock,       text: "Response within 24 hours" },
];

// Stagger children helper
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function CTASection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const navigate = useNavigate();

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[32px] overflow-hidden"
        >
          {/* ── Deep navy base ── */}
          <div className="absolute inset-0 bg-[#134a93]" />

          {/* ── Subtle grid texture ── */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* ── Top-right blue orb (parallax) ── */}
          <motion.div
            style={{ y: orb1Y }}
            className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
            animate={{ opacity: [0.18, 0.26, 0.18] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <div className="w-full h-full rounded-full bg-[#154895] blur-[80px]" />
          </motion.div>

          {/* ── Bottom-left gold orb (parallax) ── */}
          <motion.div
            style={{ y: orb2Y }}
            className="absolute -bottom-28 -left-28 w-[400px] h-[400px] rounded-full"
            animate={{ opacity: [0.14, 0.22, 0.14] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            aria-hidden
          >
            <div className="w-full h-full rounded-full bg-[#c9902a] blur-[72px]" />
          </motion.div>

          {/* ── Diagonal light slash ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 left-[30%] w-[1px] h-full opacity-[0.06]"
              style={{ background: "linear-gradient(to bottom, transparent, white 40%, transparent)" }}
            />
            <div
              className="absolute top-0 right-[28%] w-[1px] h-full opacity-[0.04]"
              style={{ background: "linear-gradient(to bottom, transparent, white 55%, transparent)" }}
            />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 px-6 py-16 md:px-20 md:py-24">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >

              {/* Status pill */}
              {/* <motion.div variants={fadeUp} className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/12 rounded-full px-5 py-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8b45a] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9902a]" />
                  </span>
                  <span className="text-white/80 text-[12.5px] font-semibold tracking-wide uppercase">
                    Now Accepting New Partners
                  </span>
                </div>
              </motion.div> */}
               <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
              style={{
                background: "rgba(21,72,149,0.06)",
                borderColor: "white",
                color: "white",
              }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: "#e62224", animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              Now Accepting New Partners
            </motion.div>

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                className="text-[clamp(32px,5vw,60px)] font-black text-white leading-[1.1] mb-6 tracking-tight"
              >
                Build Your Dream{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-brand-secondary bg-clip-text bg-gradient-to-r from-[#e8b45a] to-[#c9902a]">
                    Workforce
                  </span>
                  {/* Underline squiggle */}
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full"
                    viewBox="0 0 260 10"
                    fill="none"
                    aria-hidden
                  >
                    <motion.path
                      d="M2 8 Q65 2 130 6 Q195 10 258 4"
                      stroke="#e62224"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
                    />
                  </svg>
                </span>
                {" "}Today
              </motion.h2>

              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                className="text-white/55 text-[16px] leading-[1.75] mb-12 max-w-xl mx-auto font-light"
              >
                Join 300+ industry leaders who trust us with their most critical asset — their people. Let's place the right talent, at the right time.
              </motion.p>

              {/* ── Stats row ── */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap justify-center gap-px mb-12"
              >
                <div className="flex flex-wrap justify-center gap-0 bg-white/6 border border-white/10 rounded-2xl overflow-hidden">
                  {STATS.map(({ value, label }, i) => (
                    <div
                      key={label}
                      className={[
                        "flex flex-col items-center px-8 py-5",
                        i < STATS.length - 1 ? "border-r border-white/10" : "",
                      ].join(" ")}
                    >
                      <span className="text-[26px] font-black text-white leading-none mb-1">
                        {value}
                      </span>
                      <span className="text-white/45 text-[11px] uppercase tracking-[0.1em] font-medium">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── CTA buttons ── */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-4 justify-center mb-10"
              >
                {/* Primary */}
                <motion.button
  onClick={() => navigate("/contact")}
  whileHover={{ scale: 1.04, y: -3 }}
  whileTap={{ scale: 0.97 }}
  className="group relative bg-white text-[#0b2454] font-bold text-[15px] px-8 py-4 rounded-2xl flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-shadow duration-300 overflow-hidden"
>
  {/* Shine sweep */}
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />

  <span className="relative">Hire Talent Now</span>

  <ArrowRight
    size={17}
    className="relative transition-transform duration-300 group-hover:translate-x-1"
  />
</motion.button>

                {/* Secondary */}
                <motion.button
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group bg-white/8 backdrop-blur-sm text-white font-bold text-[15px] px-8 py-4 rounded-2xl border border-white/14 flex items-center gap-2.5 hover:bg-white/14 hover:border-white/22 transition-all duration-300"
                >
                  <Calendar size={17} className="transition-transform duration-300 group-hover:rotate-6" />
                  Schedule Consultation
                </motion.button>
              </motion.div>

              {/* ── Perks row ── */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap justify-center gap-5"
              >
                {PERKS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon size={13} strokeWidth={2.2} className="text-brand-secondary flex-shrink-0" />
                    <span className="text-white/40 text-[12.5px]">{text}</span>
                  </div>
                ))}
              </motion.div>

            </motion.div>
          </div>

          {/* ── Bottom border glow ── */}
          <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#154895]/60 to-transparent" />
        </motion.div>
      </Container>
    </section>
  );
}