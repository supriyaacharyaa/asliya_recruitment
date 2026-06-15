import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Users, Globe, Briefcase, CheckCircle,
  MapPin, TrendingUp, Award, Shield, ChevronRight
} from "lucide-react";

/* ─── Animated counter ─────────────────────────────────────── */
function Counter({ from = 0, to, suffix = "", duration = 2.2, delay = 0 }) {
  const [value, setValue] = useState(from);
  const started = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      started.current = true;
      const startTime = performance.now();
      const step = (now) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(Math.round(from + (to - from) * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [from, to, duration, delay]);

  return <>{value.toLocaleString()}{suffix}</>;
}

/* ─── Rotating word (Responsive Fixed) ─────────────────────── */
const wordPool = ["Your Workforce", "Pre-Screened Talent", "Bulk Workforce", "Expert Talent"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % wordPool.length), 2600);
    return () => clearInterval(id);
  }, []);
  
  return (
    <span className="relative inline-block overflow-hidden align-bottom min-w-[200px] sm:min-w-[280px] md:min-w-[310px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={wordPool[index]}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-[#154895] not-italic"
        >
          {wordPool[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Orbiting dot ───────────────────────────────────────────── */
function OrbitDot({ radius, duration, startAngle, color, size = 6 }) {
  return (
    <motion.div
      className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      animate={{
        x: [
          Math.cos((startAngle * Math.PI) / 180) * radius,
          Math.cos(((startAngle + 360) * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin((startAngle * Math.PI) / 180) * radius,
          Math.sin(((startAngle + 360) * Math.PI) / 180) * radius,
        ],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}

const trustItems = [
  { icon: Shield, label: "Ministry of Labor License #618" },
  { icon: Award, label: "Supreme Committee Approved" },
  { icon: CheckCircle, label: "Qatar Labor Law Compliant" },
];

const industries = [
  "Construction", "Hospitality", "Healthcare", "Security",
  "Logistics", "Retail", "Domestic Services"
];

/* ════════════════════════════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const bgX = useTransform(springX, [-1, 1], [-15, 15]);
  const bgY = useTransform(springY, [-1, 1], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
   className="relative min-h-screen py-16 flex items-center overflow-hidden  bg-gradient-to-br from-[#f0f4fc] via-[#fafbff] to-[#f5f0f8]"
      onMouseMove={handleMouseMove}
    >
      {/* Background Ambient Layers (Parallax) */}
      <motion.div className="absolute inset-0 pointer-events-none z-0 hidden sm:block" style={{ x: bgX, y: bgY }}>
        <div className="absolute rounded-full blur-[100px] opacity-30 w-[400px] h-[400px] md:w-[700px] md:h-[700px] -top-[10%] -right-[5%] bg-gradient-to-r from-[rgba(21,72,149,0.2)] to-transparent" />
        <div className="absolute rounded-full blur-[80px] opacity-25 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bottom-[5%] -left-[5%] bg-gradient-to-r from-[rgba(230,34,36,0.15)] to-transparent" />
      </motion.div>

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#154895_1px,transparent_1px)] [background-size:32px_32px] sm:[background-size:40px_40px] z-0" />

      {/* Corporate Accent Shapes */}
      <div className="absolute pointer-events-none overflow-hidden inset-0 opacity-[0.03] sm:opacity-[0.04] z-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
          <line x1="900" y1="0" x2="400" y2="900" stroke="#154895" strokeWidth="200" />
          <line x1="1100" y1="0" x2="600" y2="900" stroke="#154895" strokeWidth="80" />
        </svg>
      </div>

      {/* ── Content Container ── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.14fr_0.86fr] gap-10 xl:gap-16 items-center">

          {/* ═══ LEFT COLUMN (Typography & Actions) ═══ */}
          <div className="flex flex-col text-center lg:text-left max-w-[650px] mx-auto lg:mx-0">

            {/* Experience Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex justify-center lg:justify-start mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11.5px] sm:text-[12.5px] font-semibold tracking-wide border bg-[#154895]/5 border-[#154895]/15 text-[#154895]">
                <span className="w-2 h-2 rounded-full bg-[#e62224] animate-pulse-slow" />
                Trusted Manpower Partner Since 2018 | 7+ Years of Excellence
              </div>
            </motion.div>

            {/* Main Typographic Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-black text-gray-900 leading-[1.15] sm:leading-[1.1] tracking-tight mb-5 font-playfair text-[30px] sm:text-[44px] md:text-[54px]"
            >
              Scale <RotatingWord /> <br className="hidden sm:inline" />
              <span className="relative inline-block mt-1 sm:mt-2">
                In 25-30 Days
                {/* Decorative underline path */}
                <svg className="absolute -bottom-1.5 left-0 w-full h-[6px] sm:h-[10px]" viewBox="0 0 220 10" fill="none">
                  <motion.path
                    d="M2 7 Q30 2 55 7 Q80 12 110 5 Q140 0 165 6 Q190 11 218 5"
                    stroke="#e62224"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                  />
                </svg>
              </span>{" "}
              <span className="text-[#154895] italic font-medium ml-1">Without Headaches</span>
            </motion.h1>

            {/* Informative Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[15px] sm:text-[16.5px] leading-relaxed text-slate-500 mb-8 max-w-[540px] mx-auto lg:mx-0"
            >
              Trusted by Qatar's top companies. We deliver pre-screened talent from 28+ countries. 
              Licensed, verified, and mobilized fast with zero operational or compliance risk.
            </motion.p>

            {/* Core Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 sm:mb-10"
            >
              <motion.a
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 text-white text-[14px] sm:text-[14.5px] font-bold px-6 sm:px-7 py-3.5 rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-[#154895] to-[#1a58b8] hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                <Users size={16} />
                Get Started Now
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href="/services"
                className="inline-flex items-center justify-center gap-2 text-[14px] sm:text-[14.5px] font-bold px-6 sm:px-7 py-3.5 rounded-xl border-2 text-[#154895] border-[#154895]/20 bg-[#154895]/5 hover:bg-[#154895]/10 hover:border-[#154895]/40 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Briefcase size={15} />
                Schedule a Consultation
              </motion.a>
            </motion.div>

            {/* Legal Trust Compliance Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap justify-center lg:justify-start sm:gap-x-5 sm:gap-y-2 mb-8"
            >
              {trustItems.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center justify-center lg:justify-start gap-1.5 text-[12.5px] sm:text-[13px] font-semibold text-slate-600"
                >
                  <Icon size={14} className="text-[#154895] flex-shrink-0" />
                  {label}
                </motion.div>
              ))}
            </motion.div>

            {/* Dynamic Market Verticals / Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-left hidden sm:block"
            >
              <p className="text-[10.5px] font-bold uppercase tracking-wider mb-2.5 text-slate-400 text-center lg:text-left">
                Industries We Serve
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                {industries.map((ind, i) => (
                  <motion.span
                    key={ind}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 + i * 0.03 }}
                    className="px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-[#154895]/5 border-[#154895]/10 text-slate-600 hover:border-[#154895] hover:text-[#154895] transition-colors duration-200 cursor-default"
                  >
                    {ind}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN (Visual Interactive Card Dashboard) ═══ */}
          <div className="relative h-[480px] xl:h-[510px] hidden lg:block w-full">
            
            {/* Structural Core Graphic Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-6 inset-x-3 rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0d2d5e] via-[#154895] to-[#1d5eaa] shadow-2xl flex flex-col items-center justify-center p-6 text-center"
            >
              {/* Dynamic Overlay Glowing Lights */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_20%_80%,rgba(230,34,36,0.18)_0%,transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(100,160,255,0.15)_0%,transparent_50%)]" />
              <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Floating Orbit Wrapper */}
                <div className="relative mb-5 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-md rounded-[20px] flex items-center justify-center">
                  <Users size={38} className="text-white/90" />
                  <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                    <OrbitDot radius={52} duration={5} startAngle={0} color="#e62224" size={7} />
                    <OrbitDot radius={52} duration={5} startAngle={180} color="rgba(255,255,255,0.4)" size={5} />
                    <OrbitDot radius={66} duration={8} startAngle={90} color="rgba(100,180,255,0.6)" size={6} />
                  </div>
                </div>

                <h3 className="text-white font-bold text-[20px] sm:text-[22px] mb-1.5 font-playfair">
                  Asliya Manpower Supply
                </h3>
                <p className="text-[13px] text-white/60 leading-relaxed mb-6 max-w-[250px]">
                  Connecting Doha's premium organizations with pre-screened global talent.
                </p>

                {/* Dashboard Stats Nested Rows */}
                <div className="grid grid-cols-3 gap-2.5 w-full max-w-[320px]">
                  {[
                    { label: "Deployments", to: 20000, suffix: "+" },
                    { label: "Clients", to: 300, suffix: "+" },
                    { label: "Countries", to: 28, suffix: "+" },
                  ].map((s, i) => (
                    <div key={s.label} className="bg-white/10 rounded-xl py-2.5 px-1.5 text-center">
                      <div className="text-white font-black text-[14px] sm:text-[15px] leading-none">
                        <Counter to={s.to} suffix={s.suffix} delay={0.9 + i * 0.1} duration={1.8} />
                      </div>
                      <div className="text-[9.5px] mt-1 font-semibold text-white/40 uppercase tracking-wider">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Micro Action Trigger */}
                <motion.a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-bold py-2 px-4 rounded-full bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.03 }}
                >
                  Get a Free Consultation
                  <ChevronRight size={13} />
                </motion.a>
              </div>
            </motion.div>

            {/* ── Floating Indicator Badges (Absolutes) ── */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="absolute left-[-10px] top-[14%] flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 bg-white/95 border border-white/90 shadow-md backdrop-blur-md z-20 min-w-[175px]"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#154895] flex-shrink-0">
                <Briefcase size={14} className="text-white" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Mass Campaigns</div>
                <div className="text-[13px] font-black text-slate-800">100+ Executed</div>
              </div>
              <TrendingUp size={13} className="ml-auto text-emerald-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="absolute right-[-10px] top-[38%] flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 bg-white/95 border border-white/90 shadow-md backdrop-blur-md z-20 min-w-[175px]"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#e62224] flex-shrink-0">
                <Users size={14} className="text-white" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Single Order Max</div>
                <div className="text-[13px] font-black text-slate-800">4,000 Mobilized</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="absolute left-[-10px] bottom-[18%] flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 bg-white/95 border border-white/90 shadow-md backdrop-blur-md z-20 min-w-[175px]"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500 flex-shrink-0">
                <Globe size={14} className="text-white" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Global Pool</div>
                <div className="text-[13px] font-black text-slate-800">50,000+ Sourced</div>
              </div>
            </motion.div>

            {/* Geographical Geo-Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-bold bg-white/90 border border-[#154895]/15 text-[#154895] shadow-sm backdrop-blur-md top-[8%] right-[5%] z-20"
            >
              <MapPin size={11} className="flex-shrink-0" />
              Doha, Qatar
            </motion.div>

            {/* Mechanical Space Decoration Rings */}
            <div className="absolute top-0 right-12 w-20 h-20 rounded-full border-2 border-dashed border-[#154895]/10 animate-spin-slow pointer-events-none" />
            <div className="absolute bottom-4 -left-4 w-14 h-14 rounded-full border-2 border-dashed border-[#e62224]/10 animate-spin-reverse pointer-events-none" />
          </div>
        </div>

        {/* ── Bottom Metric Strip (Grid Fixed for Mobile & Tablet) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
        >
          {[
            { icon: Users, label: "Successful Placements", to: 20000, suffix: "+", color: "text-[#154895]", bg: "bg-[#154895]/5" },
            { icon: Briefcase, label: "Corporate Clients", to: 300, suffix: "+", color: "text-[#e62224]", bg: "bg-[#e62224]/5" },
            { icon: Globe, label: "Global Presence Countries", to: 28, suffix: "+", color: "text-emerald-500", bg: "bg-emerald-500/5" },
            { icon: Award, label: "Deployment Speed (Days)", to: 25, suffix: "-30", color: "text-amber-500", bg: "bg-amber-500/5" },
          ].map(({ icon: Icon, label, to, suffix, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.05 }}
              className="rounded-xl p-4.5 sm:p-5 border bg-white/70 border-white/80 shadow-sm backdrop-blur-md flex items-center lg:items-start gap-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bg}`}>
                <Icon size={18} className={color} />
              </div>
              <div className="min-w-0">
                <div className={`text-[24px] sm:text-[26px] font-black leading-none mb-1 font-playfair ${color}`}>
                  <Counter to={to} suffix={suffix} delay={0.9 + i * 0.1} duration={1.8} />
                </div>
                <div className="text-[11.5px] sm:text-[12px] font-semibold text-slate-500 truncate">{label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fluid Organic Base Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
        <svg className="w-full h-[30px] sm:h-[45px] md:h-[64px]" viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 64V38C180 8 360 58 540 34C720 10 900 64 1080 36C1260 12 1380 56 1440 40V64H0Z" fill="white" />
        </svg>
      </div>

      {/* Global CSS Injector Class via Tailwind Custom Arbitrary Config */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,600&display=swap');
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .animate-pulse-slow { animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-spin-slow { animation: spin 35s linear infinite; }
        .animate-spin-reverse { animation: spin 22s linear infinite reverse; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(1.2); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}