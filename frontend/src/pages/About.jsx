import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  Users, Award, Globe, Target, Eye, Heart,
  Linkedin, ShieldCheck, ChevronRight, Download, ArrowRight
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1];

const ANIM_CSS = `
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes floatX {
    0%,100% { transform: translateX(0px); }
    50%      { transform: translateX(8px); }
  }
  @keyframes spin-slow {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .6; }
    100% { transform: scale(1.55); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes fade-up {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0);    }
  }
  @keyframes count-pop {
    0%   { transform: scale(1);    }
    50%  { transform: scale(1.08); }
    100% { transform: scale(1);    }
  }
  .float-y   { animation: floatY 5s ease-in-out infinite; }
  .float-x   { animation: floatX 7s ease-in-out infinite; }
  .spin-slow { animation: spin-slow 18s linear infinite; }
  .count-pop { animation: count-pop .35s ease; }

  @keyframes blob1 {
    0%,100% { transform: scale(1)   translate(0,0);     opacity:.10; }
    33%      { transform: scale(1.18) translate(24px,-18px); opacity:.16; }
    66%      { transform: scale(.92) translate(-16px,12px); opacity:.08; }
  }
  @keyframes blob2 {
    0%,100% { transform: scale(1.1) translate(0,0);     opacity:.08; }
    33%      { transform: scale(.9)  translate(-20px,16px); opacity:.13; }
    66%      { transform: scale(1.2) translate(14px,-10px); opacity:.07; }
  }
  .blob1 { animation: blob1 9s ease-in-out infinite; }
  .blob2 { animation: blob2 11s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.4) 40%,#fff 60%,rgba(255,255,255,.4) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3.5s linear infinite;
  }

  .card-glow {
    position:relative; transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
  }
  .card-glow:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(21,72,149,.14); }

  .tl-dot-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
  .tl-dot-wrap::before {
    content:''; position:absolute;
    width:28px; height:28px; border-radius:50%;
    background: rgba(21,72,149,.25);
    animation: pulse-ring 1.8s ease-out infinite;
  }

  .partner-chip {
    transition: transform .28s cubic-bezier(.22,1,.36,1),
                box-shadow .28s, filter .28s;
  }
  .partner-chip:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 10px 28px rgba(21,72,149,.14);
    filter: grayscale(0%) !important;
  }

  .team-avatar-wrap { position:relative; display:inline-block; }
  .team-avatar-wrap::after {
    content:''; position:absolute; inset:-4px; border-radius:24px;
    border: 2px solid rgba(21,72,149,.4);
    opacity:0; transition: opacity .3s;
  }
  .team-card:hover .team-avatar-wrap::after { opacity:1; }

  .stat-num {
    display:inline-block;
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.55) 40%,#fff 60%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation: shimmer 2.5s linear infinite;
  }

  @keyframes orb1 {
    0%,100%{ transform:scale(1) translate(0,0);   }
    50%    { transform:scale(1.25) translate(20px,-15px); }
  }
  @keyframes orb2 {
    0%,100%{ transform:scale(1.2) translate(0,0); }
    50%    { transform:scale(.85) translate(-18px,12px); }
  }
  .orb1 { animation: orb1 8s ease-in-out infinite; }
  .orb2 { animation: orb2 10s ease-in-out infinite; }

  .badge-float { animation: floatY 4s ease-in-out infinite; }

  .ring-spin-cw  { animation: spin-slow 22s linear infinite; }
  .ring-spin-ccw { animation: spin-slow 28s linear infinite reverse; }

  .mvv-bar {
    position:absolute; top:0; left:0; right:0; height:4px;
    border-radius:16px 16px 0 0;
    transform: scaleX(0); transform-origin: left;
    transition: transform .45s cubic-bezier(.22,1,.36,1);
  }
  .mvv-card-wrap:hover .mvv-bar { transform: scaleX(1); }
  .mvv-card-wrap .mvv-icon-inner {
    transition: transform .35s cubic-bezier(.22,1,.36,1);
  }
  .mvv-card-wrap:hover .mvv-icon-inner { transform: scale(1.12) rotate(-4deg); }

  .sr { opacity:0; transform:translateY(28px); transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1); }
  .sr.in { opacity:1; transform:translateY(0); }
`;

/* ─────────────── CountUp ─────────────── */
function CountUp({ value, suffix, inView }) {
  const count = useMotionValue(0);
  const ref   = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, value, count]);

  useEffect(() => {
    return count.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v).toLocaleString() + suffix;
      }
    });
  }, [count, suffix]);

  return (
    /* FIX: was text-5xl, now fluid clamp so it never overflows on mobile */
    <span
      ref={ref}
      className="stat-num font-black tabular-nums"
      style={{ fontSize: "clamp(28px, 6vw, 48px)" }}
    >
      0{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════
   1. PAGE HERO
═══════════════════════════════════════════ */
function PageHero() {
  return (
    /* FIX: pt-32 on mobile (was pt-40 everywhere) */
    <section className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      <style>{ANIM_CSS}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob1 absolute -top-32 -left-32 w-[600px] h-[600px] bg-white rounded-full blur-3xl" />
        <div className="blob2 absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#e62224] rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
        <div className="ring-spin-cw  absolute top-16  right-24 w-64 h-64 border-2 border-dashed border-white/10 rounded-full" />
        <div className="ring-spin-ccw absolute bottom-12 left-16  w-40 h-40 border-2 border-dashed border-white/10 rounded-full" />
        <div className="ring-spin-cw  absolute top-1/2  left-1/3  w-24 h-24 border   border-dashed border-white/[.06] rounded-full" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:.5 }}
          className="flex items-center gap-2 mb-6 sm:mb-8 text-sm text-white/50 font-medium"
        >
          <a href="/" className="hover:text-white/80 transition-colors">Home</a>
          <ChevronRight size={14} className="text-white/30" />
          <span className="text-white/80">About Us</span>
        </motion.div>

        {/* FIX: fluid font-size via clamp — no hard breakpoint jumps */}
        <motion.h1
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.1, duration:.7, ease:EASE }}
          className="shimmer-text font-black leading-[1.08] tracking-tight mb-5 sm:mb-6 max-w-3xl"
          style={{ fontSize: "clamp(32px, 6vw, 60px)" }}
        >
          About Asliya Recruitment
        </motion.h1>

        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.25, duration:.6 }}
          className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mb-7 sm:mb-8"
        >
          A decade of connecting talent with opportunity across the globe — built on trust, integrity, and results that matter.
        </motion.p>

        {/* FIX: gap-2 on mobile to prevent wrapping issues */}
        <motion.div className="flex flex-wrap gap-2 sm:gap-3"
          initial="hidden" animate="visible"
          variants={{ visible:{ transition:{ staggerChildren:.1, delayChildren:.5 } } }}
        >
          {[
            { icon: Award,  label:"ISO Certified" },
            { icon: Globe,  label:"30+ Countries" },
            { icon: Users,  label:"5,000+ Placed" },
          ].map(({ icon: Icon, label }) => (
            <motion.div key={label}
              variants={{ hidden:{ opacity:0, scale:.8, y:6 }, visible:{ opacity:1, scale:1, y:0 } }}
              transition={{ type:"spring", stiffness:260, damping:20 }}
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white/80"
            >
              <Icon size={12} className="text-white/60" />{label}
            </motion.div>
          ))}
        </motion.div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. WHO WE ARE
═══════════════════════════════════════════ */
const highlights = [
  { icon: Award, label:"ISO Certified" },
  { icon: Globe, label:"28+ Countries" },
  { icon: Users, label:"20000+ Placed" },
];

function WhoWeAre() {
  return (
    /* FIX: py-16 sm:py-28 — less vertical padding on mobile */
    <section className="bg-white py-16 sm:py-28 overflow-hidden">
      <Container>
        {/* FIX: gap-10 sm:gap-14 lg:gap-20 — tighter gaps at smaller widths */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">

          {/* LEFT: Visual card */}
          <motion.div
            initial={{ opacity:0, x:-40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:.8, ease:EASE }}
            className="relative"
          >
            <div className="ring-spin-ccw absolute -top-6 -left-6 w-full h-full border-2 border-dashed border-[#154895]/15 rounded-3xl -z-10" />

            {/* FIX: aspect-[4/3] on mobile, aspect-[4/5] on sm+ to avoid huge image block */}
            <div className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[4/5] shadow-2xl shadow-[#154895]/25">
              <div
                className="absolute inset-0 scale-110"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(6px)",
                }}
              />
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12 text-center">
                <motion.div
                  initial={{ opacity:0, y:-12 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ delay:.3, duration:.6, ease:EASE }}
                  className="bg-white/10 border border-white/20 rounded-2xl px-4 sm:px-6 py-2 mb-5 sm:mb-8 backdrop-blur-sm"
                >
                  <span className="text-white/80 text-xs sm:text-sm font-semibold tracking-widest uppercase">Founded 2018</span>
                </motion.div>

                <motion.div
                  initial={{ scale:.7, opacity:0 }} whileInView={{ scale:1, opacity:1 }}
                  viewport={{ once:true }} transition={{ delay:.45, type:"spring", stiffness:200, damping:16 }}
                  className="w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center mb-5 sm:mb-8 border border-white/20"
                >
                  <Users size={32} className="sm:hidden text-white" />
                  <Users size={44} className="hidden sm:block text-white" />
                </motion.div>

                <h3 className="text-white text-lg sm:text-2xl font-black mb-2 sm:mb-3 leading-tight">
                  Your Global<br />Manpower Partner
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-[200px] sm:max-w-[220px]">
                  From local staffing to international deployments — we deliver every time
                </p>
              </div>
            </div>

            {/* FIX: badge repositioned to not clip on mobile; hidden on xs, visible sm+ */}
            <motion.div
              initial={{ opacity:0, scale:.8, rotate:-6 }}
              whileInView={{ opacity:1, scale:1, rotate:0 }}
              viewport={{ once:true }}
              transition={{ delay:.5, duration:.6, ease:EASE }}
              className="badge-float hidden sm:block absolute -bottom-6 -right-6 bg-white rounded-2xl px-6 py-4 shadow-2xl shadow-gray-200/80 border border-gray-100"
            >
              <div className="text-3xl font-black text-[#154895]">Est. 2018</div>
              <div className="text-sm font-semibold text-gray-400 mt-0.5">· 7+ Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:.8, ease:EASE }}
            /* FIX: sm:pt-0 pt-0 — remove extra top padding pushing content down on mobile */
            className="pt-0 sm:pt-8 lg:pt-0"
          >
            <p className="text-sm font-semibold text-[#e62224] uppercase tracking-widest mb-3 sm:mb-4">Who We Are</p>
            {/* FIX: fluid heading size */}
            <h2
              className="font-black text-gray-900 leading-tight mb-5 sm:mb-6"
              style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
            >
              Built on Trust,<br />Driven by Results
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-4 sm:mb-5">
              Asliya Recruitment was founded in 2018 with a single mission: to bridge the gap between exceptional talent and the companies that need them most. What began as a domestic staffing firm serving local businesses has grown into a globally recognized recruitment partner.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
              Over the past decade, we have expanded our operations to 28+ countries, served 500+ corporate clients, and successfully placed over 20,000 candidates across 40+ industries. Our ISO-certified processes, dedicated team of specialists, and commitment to compliance set us apart in an industry that demands nothing less than excellence.
            </p>

            <motion.div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10"
              initial="hidden" whileInView="visible" viewport={{ once:true }}
              variants={{ visible:{ transition:{ staggerChildren:.1, delayChildren:.1 } } }}
            >
              {highlights.map(({ icon: Icon, label }) => (
                <motion.div key={label}
                  variants={{ hidden:{ opacity:0, scale:.75, y:8 }, visible:{ opacity:1, scale:1, y:0 } }}
                  transition={{ type:"spring", stiffness:260, damping:20 }}
                  className="flex items-center gap-2 sm:gap-2.5 bg-[#154895]/6 border border-[#154895]/15 rounded-full px-3 sm:px-5 py-2 sm:py-2.5"
                >
                  <Icon size={13} className="text-[#154895]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#154895]">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            <Button variant="primary" size="lg" icon={Download} iconPosition="left">
              Download Company Profile
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. MISSION VISION VALUES
═══════════════════════════════════════════ */
const mvv = [
  { icon:Target, title:"Our Mission", body:"To connect the right people with the right opportunities — delivering reliable, compliant, and high-quality recruitment solutions for businesses and candidates across every industry we serve.", gradient:"from-[#154895] to-[#0d3270]", accent:"bg-[#154895]/8", iconColor:"text-[#154895]" },
  { icon:Eye,    title:"Our Vision",  body:"To become the world's most trusted manpower partner — recognized for integrity, innovation, and the transformative impact we create for employers and job-seekers alike across all continents.", gradient:"from-[#e62224] to-[#c01a1c]", accent:"bg-[#e62224]/8", iconColor:"text-[#e62224]" },
  { icon:Heart,  title:"Our Values",  body:"Integrity in every placement. Speed without compromising quality. Unwavering compliance with labor laws. And a genuine commitment to the long-term success of every candidate and client we serve.", gradient:"from-emerald-500 to-emerald-600", accent:"bg-emerald-500/8", iconColor:"text-emerald-600" },
];

function MissionVisionValues() {
  return (
    <section className="bg-[#f8f9fc] py-16 sm:py-28">
      <Container>
        <SectionHeading tag="Our Foundation" title="Mission, Vision & Values"
          subtitle="The principles that guide every decision we make and every placement we deliver." />

        {/* FIX: single col on mobile, 3 col on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-16">
          {mvv.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ delay:i*.12, duration:.6, ease:EASE }}
                whileHover={{ y:-6 }}
                className="mvv-card-wrap group bg-white border border-gray-100 rounded-2xl p-7 sm:p-10 text-center
                           hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10
                           transition-all duration-500 relative overflow-hidden"
              >
                <div className={`mvv-bar bg-gradient-to-r ${item.gradient}`} />
                <div className={`w-14 h-14 ${item.accent} rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6`}>
                  <span className="mvv-icon-inner inline-flex">
                    <Icon size={26} className={item.iconColor} />
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. STATS BAND
═══════════════════════════════════════════ */
const stats = [
  { value:20000, suffix:"+", label:"Candidates Placed" },
  { value:500,  suffix:"+", label:"Corporate Clients" },
  { value:40,   suffix:"+", label:"Industries Served" },
  { value:28,   suffix:"+", label:"Countries Covered" },
];

function StatsBand() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="bg-[#154895] py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"24px 24px" }} />

      <Container className="relative z-10">
        {/* FIX: 2-col on all sizes, dividers only on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:i*.1, duration:.6, ease:EASE }}
              className="relative text-center px-3 sm:px-6 py-6 sm:py-8"
            >
              {/* vertical divider between cells */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />
              )}
              {/* horizontal divider for 2-col grid on mobile (bottom of top row) */}
              {i < 2 && (
                <div className="lg:hidden absolute bottom-0 left-4 right-4 h-px bg-white/10" />
              )}
              {/* vertical divider between left and right columns on mobile */}
              {i % 2 === 0 && (
                <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
              )}
              {/* FIX: overflow-hidden + min-w-0 on number container */}
              <div className="min-w-0 overflow-hidden">
                <CountUp value={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <p className="text-white/60 text-xs sm:text-sm font-semibold mt-1 sm:mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. TIMELINE
═══════════════════════════════════════════ */
const milestones = [
  { year: "2014", title: "Company Founded", desc: "Asliya Recruitment was incorporated with a team of 5, completing our first 50 domestic placements within the year." },
  { year: "2015", title: "First Overseas Deployment", desc: "Launched international operations with our inaugural deployment of 120 skilled workers to the Gulf region." },
  { year: "2017", title: "Industry Expansion", desc: "Grew our service coverage to 5 key industries and crossed the milestone of 100+ active corporate clients." },
  { year: "2019", title: "Executive Search Division", desc: "Established a dedicated C-suite and senior leadership headhunting practice, serving Fortune 500 partners." },
  { year: "2021", title: "ISO 9001 Certified", desc: "Achieved ISO 9001:2015 certification, formalizing our commitment to quality management and operational excellence." },
  { year: "2024", title: "5000+ Placements & 30+ Countries", desc: "Reached our decade milestone: over 5,000 successful placements across 30+ countries and 15+ industries." },
];

function Timeline() {
  return (
    <section className="bg-white py-16 sm:py-28">
      <Container>
        <SectionHeading tag="Our Journey" title="A Decade of Growth"
          subtitle="From a small domestic agency to a globally recognized recruitment powerhouse — here is our story." />

        <div className="relative mt-12 sm:mt-20 max-w-4xl mx-auto">
          {/* Center line — desktop only */}
          <motion.div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{ background:"linear-gradient(to bottom,rgba(21,72,149,0) 0%,rgba(21,72,149,.25) 15%,rgba(21,72,149,.25) 85%,rgba(21,72,149,0) 100%)" }}
            initial={{ scaleY:0 }} whileInView={{ scaleY:1 }}
            viewport={{ once:true }} transition={{ duration:1.2, ease:[.22,1,.36,1] }}
          />

          {/* Left vertical line — mobile only */}
          <div className="lg:hidden absolute left-5 top-0 bottom-0 w-px bg-[#154895]/15" />

          <div className="flex flex-col gap-8 sm:gap-12">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div key={m.year}
                  initial={{ opacity:0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, margin:"-60px" }}
                  transition={{ delay:i*.1, duration:.7, ease:EASE }}
                  /* FIX: on mobile always left-aligned with left dot; alternating only on lg */
                  className={`relative flex items-start gap-4 sm:gap-6 lg:gap-8
                    lg:items-center
                    ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}
                    flex-row lg:flex-row`}
                >
                  {/* Mobile: year badge + dot on the left */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2 lg:hidden">
                    <motion.div
                      initial={{ scale:0 }} whileInView={{ scale:1 }}
                      viewport={{ once:true }}
                      transition={{ delay:i*.1+.2, type:"spring", stiffness:300, damping:18 }}
                      className="bg-[#154895] text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-md shadow-[#154895]/25 whitespace-nowrap z-10"
                    >
                      {m.year}
                    </motion.div>
                    <div className="w-3 h-3 bg-white border-[3px] border-[#154895] rounded-full shadow-sm z-10 mt-1" />
                  </div>

                  {/* Content card — full width on mobile */}
                  <div className={`flex-1 min-w-0 ${isEven ? "lg:text-right" : "lg:text-left"} text-left`}>
                    <motion.div
                      whileHover={{ y:-4, boxShadow:"0 16px 40px rgba(21,72,149,.1)" }}
                      transition={{ type:"spring", stiffness:300, damping:22 }}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-6 transition-colors duration-300 group"
                    >
                      <h3 className="text-base sm:text-lg font-black text-gray-900 mb-1 sm:mb-2 group-hover:text-[#154895] transition-colors duration-300">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </div>

                  {/* Desktop: center year + pulsing dot */}
                  <div className="hidden lg:flex relative flex-shrink-0 flex-col items-center gap-2">
                    <motion.div
                      initial={{ scale:0 }} whileInView={{ scale:1 }}
                      viewport={{ once:true }}
                      transition={{ delay:i*.1+.2, type:"spring", stiffness:300, damping:18 }}
                      className="bg-[#154895] text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-[#154895]/25 whitespace-nowrap"
                    >
                      {m.year}
                    </motion.div>
                    <div className="tl-dot-wrap">
                      <div className="w-4 h-4 bg-white border-4 border-[#154895] rounded-full shadow-md relative z-10" />
                    </div>
                  </div>

                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. LEADERSHIP TEAM
═══════════════════════════════════════════ */
const team = [
  { initials:"JR", name:"James Reyes",    role:"Chief Executive Officer",      bio:"20+ years in global workforce strategy and enterprise recruitment." },
  { initials:"MS", name:"Maria Santos",   role:"Chief Operating Officer",      bio:"Former HR director with expertise scaling operations across Asia-Pacific." },
  { initials:"AF", name:"Ahmed Al-Farsi", role:"Head of Overseas Recruitment", bio:"Specializes in Middle East and Gulf deployments with 15+ years experience." },
  { initials:"PN", name:"Priya Nair",     role:"HR Director",                  bio:"Leads talent acquisition strategy, compliance, and candidate experience." },
];

function LeadershipTeam() {
  return (
    <section className="bg-[#f8f9fc] py-16 sm:py-28">
      <Container>
        <SectionHeading tag="Our Team" title="Meet the Leadership"
          subtitle="The experienced professionals steering RecruitMax toward its global vision." />

        {/* FIX: 2-col on mobile, 4-col on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-10 sm:mt-16">
          {team.map((member, i) => (
            <motion.div key={member.name}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-40px" }}
              transition={{ delay:i*.1, duration:.6, ease:EASE }}
              whileHover={{ y:-6 }}
              className="team-card group bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 text-center
                         hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10
                         transition-all duration-500"
            >
              <div className="team-avatar-wrap mx-auto mb-3 sm:mb-5">
                <motion.div
                  whileHover={{ rotate:[0,4,-4,0] }}
                  transition={{ duration:.4 }}
                  className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-2xl
                             flex items-center justify-center shadow-lg shadow-[#154895]/20 mx-auto"
                >
                  <span className="text-white font-black text-base sm:text-xl">{member.initials}</span>
                </motion.div>
              </div>

              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-[#154895] transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#154895] font-semibold mb-1 sm:mb-2">{member.role}</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-3 sm:mb-5 hidden sm:block">{member.bio}</p>

              <motion.a href="#" aria-label={`${member.name} LinkedIn`}
                whileHover={{ scale:1.15 }} whileTap={{ scale:.95 }}
                className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 hover:bg-[#154895] rounded-xl transition-all duration-300 group/li"
              >
                <Linkedin size={13} className="text-gray-400 group-hover/li:text-white transition-colors duration-300" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   7. CERTIFICATIONS & PARTNERS
═══════════════════════════════════════════ */
const certifications = [
  { icon:ShieldCheck, name:"ISO 9001:2015",  body:"Quality Management System certified, ensuring consistent, world-class service delivery across all operations.", issued:"Issued 2021 · Renewal 2024",         color:"text-[#154895]",    bg:"bg-[#154895]/8" },
  { icon:ShieldCheck, name:"POEA Accredited",body:"Officially accredited by the Philippine Overseas Employment Administration for lawful overseas deployment.",   issued:"Active Accreditation · Since 2015", color:"text-[#e62224]",    bg:"bg-[#e62224]/8" },
  { icon:ShieldCheck, name:"GDPR Compliant", body:"Full compliance with EU General Data Protection Regulation, protecting candidate and client data privacy.",     issued:"Compliant Since 2018 · Annually Audited", color:"text-emerald-600", bg:"bg-emerald-500/8" },
];

const partners = [
  { name:"Marriott", abbr:"MAR" },{ name:"Hilton",   abbr:"HLT" },
  { name:"Samsung",  abbr:"SAM" },{ name:"Aramco",   abbr:"ARC" },
  { name:"Emirates", abbr:"EMR" },{ name:"Siemens",  abbr:"SIE" },
];

function CertificationsPartners() {
  return (
    <section className="bg-white py-16 sm:py-28">
      <Container>
        <SectionHeading tag="Credentials" title="Certified. Compliant. Trusted."
          subtitle="Our credentials reflect our unwavering commitment to quality, legality, and data security." />

        {/* FIX: single col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-16">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div key={cert.name}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ delay:i*.1, duration:.6, ease:EASE }}
                whileHover={{ y:-6 }}
                className="card-glow group bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8
                           hover:border-[#154895]/20 transition-all duration-500"
              >
                <motion.div
                  whileHover={{ rotate:[-4,4,-4,0], scale:1.12 }}
                  transition={{ duration:.4 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${cert.bg} rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
                >
                  <Icon size={22} className={cert.color} />
                </motion.div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2 sm:mb-3">{cert.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3 sm:mb-4">{cert.body}</p>
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{cert.issued}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay:.2, duration:.6 }}
          className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-gray-100"
        >
          <p className="text-center text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-7 sm:mb-10">
            Partnering With Industry Leaders
          </p>
          {/* FIX: tighter gap on mobile, wrap naturally */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {partners.map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity:0, scale:.9 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                transition={{ delay:i*.07, duration:.5, ease:EASE }}
                className="partner-chip flex items-center gap-2 sm:gap-3 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3 sm:py-4
                           hover:border-[#154895]/20 grayscale hover:grayscale-0 transition-all duration-400 cursor-default"
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="text-white text-[10px] sm:text-xs font-black">{p.abbr}</span>
                </div>
                <span className="font-semibold text-gray-600 text-xs sm:text-sm">{p.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   8. CTA BANNER
═══════════════════════════════════════════ */
function CTABanner() {
  return (
    <section className="py-12 sm:py-20 bg-[#f8f9fc]">
      <Container>
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.8, ease:EASE }}
          className="relative bg-gradient-to-br from-[#154895] via-[#1a56b0] to-[#0d3270]
                     rounded-3xl overflow-hidden px-6 py-12 sm:px-8 sm:py-16 md:p-20 text-center"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="orb1 absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-[.08]" />
            <div className="orb2 absolute -bottom-20 -right-20 w-96 h-96 bg-[#e62224] rounded-full blur-3xl opacity-[.07]" />
            <div className="absolute inset-0 opacity-[.04]"
              style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
            <div className="ring-spin-cw  absolute top-6  right-12 w-40 h-40 border border-dashed border-white/[.07] rounded-full" />
            <div className="ring-spin-ccw absolute bottom-6 left-12  w-24 h-24 border border-dashed border-white/[.07] rounded-full" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.2, duration:.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 bg-[#e62224] rounded-full animate-pulse" />
              <span className="text-white/90 text-xs sm:text-sm font-semibold">Let's Work Together</span>
            </motion.div>

            {/* FIX: fluid heading */}
            <motion.h2
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.3, duration:.7 }}
              className="shimmer-text font-black leading-tight mb-5 sm:mb-6"
              style={{ fontSize: "clamp(26px, 5vw, 48px)" }}
            >
              Want to Partner With Us?
            </motion.h2>

            <motion.p
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.4, duration:.6 }}
              className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
            >
              Whether you're looking to hire top talent or seeking your next career opportunity, our team is ready to make it happen.
            </motion.p>

            {/* FIX: stack buttons on mobile */}
            <motion.div
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.5, duration:.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <a href="/contact" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.97 }}
                  className="w-full sm:w-auto bg-white text-[#154895] font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-300"
                >
                  Get In Touch <ArrowRight size={16} />
                </motion.button>
              </a>
              <motion.button
                whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.97 }}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors duration-300"
              >
                View Our Services
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ delay:.7, duration:.6 }}
              className="mt-6 sm:mt-8 text-white/40 text-xs sm:text-sm"
            >
              Free consultation · No commitment required · Response within 24 hours
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PAGE ASSEMBLY
═══════════════════════════════════════════ */
export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <PageHero />
        <WhoWeAre />
        <MissionVisionValues />
        <StatsBand />
        <Timeline />
        <LeadershipTeam />
        <CertificationsPartners />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}