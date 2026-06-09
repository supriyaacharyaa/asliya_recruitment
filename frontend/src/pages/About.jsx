import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  Users, Award, Globe, Target, Eye, Heart,
  Linkedin, ShieldCheck, ChevronRight, Download, ArrowRight, Phone, Mail
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1];

/* ─── keyframe CSS injected once ─── */
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
  .card-glow:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(10,22,40,.14); }

  .tl-dot-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
  .tl-dot-wrap::before {
    content:''; position:absolute;
    width:28px; height:28px; border-radius:50%;
    background: rgba(10,22,40,.25);
    animation: pulse-ring 1.8s ease-out infinite;
  }

  .partner-chip {
    transition: transform .28s cubic-bezier(.22,1,.36,1),
                box-shadow .28s, filter .28s;
  }
  .partner-chip:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 10px 28px rgba(10,22,40,.14);
    filter: grayscale(0%) !important;
  }

  .team-avatar-wrap { position:relative; display:inline-block; }
  .team-avatar-wrap::after {
    content:''; position:absolute; inset:-4px; border-radius:24px;
    border: 2px solid rgba(201,168,76,.4);
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
    <span ref={ref} className="stat-num text-5xl font-black tabular-nums">
      0{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════
   1. PAGE HERO
═══════════════════════════════════════════ */
function PageHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1628] to-[#0d2245] pt-40 pb-28 overflow-hidden">
      <style>{ANIM_CSS}</style>

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob1 absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#C9A84C] rounded-full blur-3xl" />
        <div className="blob2 absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#C5282B] rounded-full blur-3xl" />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"32px 32px" }} />

        {/* Spinning dashed rings */}
        <div className="ring-spin-cw  absolute top-16  right-24 w-64 h-64 border-2 border-dashed border-white/10 rounded-full" />
        <div className="ring-spin-ccw absolute bottom-12 left-16  w-40 h-40 border-2 border-dashed border-white/10 rounded-full" />
        <div className="ring-spin-cw  absolute top-1/2  left-1/3  w-24 h-24 border   border-dashed border-white/[.06] rounded-full" />
      </div>

      <Container className="relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:.5 }}
          className="flex items-center gap-2 mb-8 text-sm text-white/50 font-medium"
        >
          <a href="/" className="hover:text-white/80 transition-colors">Home</a>
          <ChevronRight size={14} className="text-white/30" />
          <span className="text-white/80">About Us</span>
        </motion.div>

        <motion.h1
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.1, duration:.7, ease:EASE }}
          className="shimmer-text text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight mb-6 max-w-3xl"
        >
          About Asliya Manpower Supply
        </motion.h1>

        <motion.p
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:.25, duration:.6 }}
          className="text-white/70 text-lg leading-relaxed max-w-xl mb-8"
        >
          7 years of delivering pre-screened talent from 28+ countries to Qatar's top companies — fast, compliant, and at scale.
        </motion.p>

        {/* Animated trust pills */}
        <motion.div className="flex flex-wrap gap-3"
          initial="hidden" animate="visible"
          variants={{ visible:{ transition:{ staggerChildren:.1, delayChildren:.5 } } }}
        >
          {[
            { icon: Award,  label:"Ministry of Labor Licensed #618" },
            { icon: Globe,  label:"28+ Countries" },
            { icon: Users,  label:"20,000+ Deployed" },
          ].map(({ icon: Icon, label }) => (
            <motion.div key={label}
              variants={{ hidden:{ opacity:0, scale:.8, y:6 }, visible:{ opacity:1, scale:1, y:0 } }}
              transition={{ type:"spring", stiffness:260, damping:20 }}
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-semibold text-white/80"
            >
              <Icon size={13} className="text-[#C9A84C]" />{label}
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Bottom wave */}
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
  { icon: Award, label:"Ministry of Labor Qatar — License #618" },
  { icon: ShieldCheck, label:"Supreme Committee Approved" },
  { icon: Globe, label:"28+ Countries" },
  { icon: Users, label:"20,000+ Deployed" },
];

function WhoWeAre() {
  return (
    <section className="bg-white py-28 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT: Visual card */}
          <motion.div
            initial={{ opacity:0, x:-40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:.8, ease:EASE }}
            className="relative"
          >
            {/* Spinning dashed frame */}
            <div className="ring-spin-ccw absolute -top-6 -left-6 w-full h-full border-2 border-dashed border-[#0A1628]/15 rounded-3xl -z-10" />

            <div className="relative bg-gradient-to-br from-[#0A1628] to-[#0d2245] rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-[#0A1628]/25">
              <div className="absolute inset-0"
                style={{ backgroundImage:"radial-gradient(circle at 20% 80%,rgba(197,40,43,.28) 0%,transparent 45%),radial-gradient(circle at 80% 20%,rgba(201,168,76,.10) 0%,transparent 40%)" }} />

              {/* Floating decorative squares */}
              <div className="float-x absolute top-8  right-8  w-20 h-20 border border-[#C9A84C]/20 rounded-2xl" />
              <div className="float-y absolute bottom-10 left-8  w-14 h-14 border border-[#C9A84C]/20 rounded-xl" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <motion.div
                  initial={{ opacity:0, y:-12 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ delay:.3, duration:.6, ease:EASE }}
                  className="bg-[#C9A84C]/15 border border-[#C9A84C]/30 rounded-2xl px-6 py-2 mb-8 backdrop-blur-sm"
                >
                  <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">Est. 2018 · Doha, Qatar</span>
                </motion.div>

                <motion.div
                  initial={{ scale:.7, opacity:0 }} whileInView={{ scale:1, opacity:1 }}
                  viewport={{ once:true }} transition={{ delay:.45, type:"spring", stiffness:200, damping:16 }}
                  className="w-24 h-24 bg-[#C9A84C]/15 rounded-3xl backdrop-blur-sm flex items-center justify-center mb-8 border border-[#C9A84C]/30"
                >
                  <Users size={44} className="text-[#C9A84C]" />
                </motion.div>

                <h3 className="text-white text-2xl font-black mb-3 leading-tight">
                  Qatar's Trusted<br />Manpower Partner
                </h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
                  From local staffing to 4,000-worker deployments — we deliver every time
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity:0, scale:.8, rotate:-6 }}
              whileInView={{ opacity:1, scale:1, rotate:0 }}
              viewport={{ once:true }}
              transition={{ delay:.5, duration:.6, ease:EASE }}
              className="badge-float absolute -bottom-6 -right-6 bg-white rounded-2xl px-6 py-4 shadow-2xl shadow-gray-200/80 border border-gray-100"
            >
              <div className="text-3xl font-black text-[#0A1628]">7+ Years</div>
              <div className="text-sm font-semibold text-gray-400 mt-0.5">· Proven Expertise in Qatar</div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:.8, ease:EASE }}
          >
            <p className="text-sm font-semibold text-[#C5282B] uppercase tracking-widest mb-4">Who We Are</p>
            <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6">
              Fast, Reliable &amp;<br />Risk-Free Recruitment
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-5">
              Asliya Manpower Supply W.L.L is a Qatar-based recruitment company trusted by the country's top organizations since 2018. We specialize in sourcing, screening, and deploying skilled and semi-skilled talent from 28+ countries across Asia, Africa, Europe, and the Middle East.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              Licensed by the Ministry of Labor Qatar (License #618) and approved by the Supreme Committee for Delivery & Legacy as a FIFA supplier, we have completed 20,000+ successful deployments for 300+ corporate clients — including single campaigns of 4,000 workers — all within our industry-leading 25–40 day timeline.
            </p>

            {/* Staggered highlight pills */}
            <motion.div className="flex flex-wrap gap-3 mb-10"
              initial="hidden" whileInView="visible" viewport={{ once:true }}
              variants={{ visible:{ transition:{ staggerChildren:.1, delayChildren:.1 } } }}
            >
              {highlights.map(({ icon: Icon, label }) => (
                <motion.div key={label}
                  variants={{ hidden:{ opacity:0, scale:.75, y:8 }, visible:{ opacity:1, scale:1, y:0 } }}
                  transition={{ type:"spring", stiffness:260, damping:20 }}
                  className="flex items-center gap-2.5 bg-[#0A1628]/6 border border-[#0A1628]/15 rounded-full px-5 py-2.5"
                >
                  <Icon size={15} className="text-[#0A1628]" />
                  <span className="text-sm font-semibold text-[#0A1628]">{label}</span>
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
  { icon:Target, title:"Our Mission", body:"To deliver fast, reliable, and compliant recruitment solutions for businesses across Qatar and beyond — connecting the right talent to the right opportunities within 25–40 days, every time.", gradient:"from-[#0A1628] to-[#0d2245]", accent:"bg-[#0A1628]/8", iconColor:"text-[#0A1628]" },
  { icon:Eye,    title:"Our Vision",  body:"To become Qatar's most trusted manpower partner — recognized for speed, scale, and ethical recruitment that benefits employers, workers, and communities across 28+ countries.", gradient:"from-[#C5282B] to-[#a31f22]", accent:"bg-[#C5282B]/8", iconColor:"text-[#C5282B]" },
  { icon:Heart,  title:"Our Values",  body:"Zero exploitation. Full transparency. Strict compliance with Qatar Labor Law and international standards. Unwavering commitment to quality at every level of scale — from 10 hires to 4,000.", gradient:"from-[#C9A84C] to-[#a8893a]", accent:"bg-[#C9A84C]/8", iconColor:"text-[#C9A84C]" },
];

function MissionVisionValues() {
  return (
    <section className="bg-[#f8f9fc] py-28">
      <Container>
        <SectionHeading tag="Our Foundation" title="Mission, Vision & Values"
          subtitle="The principles behind every placement we deliver — no shortcuts, no compromises." />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {mvv.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ delay:i*.12, duration:.6, ease:EASE }}
                whileHover={{ y:-6 }}
                className="mvv-card-wrap group bg-white border border-gray-100 rounded-2xl p-10 text-center
                           hover:border-[#0A1628]/20 hover:shadow-2xl hover:shadow-[#0A1628]/10
                           transition-all duration-500 relative overflow-hidden"
              >
                {/* Animated top bar */}
                <div className={`mvv-bar bg-gradient-to-r ${item.gradient}`} />

                <div className={`w-16 h-16 ${item.accent} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <span className="mvv-icon-inner inline-flex">
                    <Icon size={28} className={item.iconColor} />
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{item.title}</h3>
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
  { value:20000, suffix:"+", label:"Successful Deployments" },
  { value:300,   suffix:"+", label:"Corporate Clients" },
  { value:28,    suffix:"+", label:"Countries Covered" },
  { value:100,   suffix:"+", label:"Mass Campaigns Executed" },
];

function StatsBand() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section ref={ref} className="bg-[#0A1628] py-16 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:i*.1, duration:.6, ease:EASE }}
              className="relative text-center px-6 py-8"
            >
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />
              )}
              <CountUp value={s.value} suffix={s.suffix} inView={inView} />
              <p className="text-white/60 text-sm font-semibold mt-2">{s.label}</p>
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
  { year:"2018", title:"Company Founded in Doha",        desc:"Asliya Manpower Supply W.L.L was established in Qatar, completing our first domestic placements and earning our Ministry of Labor license (#618)." },
  { year:"2019", title:"First Overseas Deployments",     desc:"Launched international recruitment operations, sourcing skilled and semi-skilled workers from Asia and Africa for Qatar-based corporate clients." },
  { year:"2020", title:"Supreme Committee Approval",     desc:"Achieved FIFA supplier status through Supreme Committee for Delivery & Legacy approval — the highest credibility standard in Qatar's recruitment industry." },
  { year:"2021", title:"Mass Campaign Milestone",        desc:"Completed our 50th mass recruitment campaign, with on-site interview programs running across India, Philippines, Nepal, and Ghana." },
  { year:"2022", title:"4,000-Worker Single Deployment", desc:"Executed our largest single deployment — 4,000 workers mobilized simultaneously for a major Qatar client, without compromising quality or timeline." },
  { year:"2025", title:"20,000+ Deployments & 28+ Countries", desc:"Reached a landmark milestone: over 20,000 successful deployments across 28+ countries and 300+ corporate clients, cementing our position as Qatar's #1 manpower partner." },
];

function Timeline() {
  return (
    <section className="bg-white py-28">
      <Container>
        <SectionHeading tag="Our Journey" title="7 Years of Growth"
          subtitle="From a local staffing firm to Qatar's most trusted large-scale recruitment partner — here is our story." />

        <div className="relative mt-20 max-w-4xl mx-auto">
          {/* Animated center line */}
          <motion.div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{ background:"linear-gradient(to bottom,rgba(10,22,40,0) 0%,rgba(10,22,40,.25) 15%,rgba(10,22,40,.25) 85%,rgba(10,22,40,0) 100%)" }}
            initial={{ scaleY:0 }} whileInView={{ scaleY:1 }}
            viewport={{ once:true }} transition={{ duration:1.2, ease:[.22,1,.36,1] }}
          />

          <div className="flex flex-col gap-12">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div key={m.year}
                  initial={{ opacity:0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, margin:"-60px" }}
                  transition={{ delay:i*.1, duration:.7, ease:EASE }}
                  className={`relative flex items-center gap-8 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:flex-row`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"} text-left`}>
                    <motion.div
                      whileHover={{ y:-4, boxShadow:"0 16px 40px rgba(10,22,40,.1)" }}
                      transition={{ type:"spring", stiffness:300, damping:22 }}
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-6 transition-colors duration-300 group"
                    >
                      <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-[#0A1628] transition-colors duration-300">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center year + pulsing dot */}
                  <div className="relative flex-shrink-0 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ scale:0 }} whileInView={{ scale:1 }}
                      viewport={{ once:true }}
                      transition={{ delay:i*.1+.2, type:"spring", stiffness:300, damping:18 }}
                      className="bg-[#C9A84C] text-[#0A1628] font-black text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-[#C9A84C]/30 whitespace-nowrap"
                    >
                      {m.year}
                    </motion.div>
                    <div className="hidden lg:flex tl-dot-wrap">
                      <div className="w-4 h-4 bg-white border-4 border-[#0A1628] rounded-full shadow-md relative z-10" />
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
  { initials:"GM", name:"General Manager",        role:"Operations & Strategy",          bio:"Oversees company-wide recruitment operations, client relationships, and Qatar compliance standards." },
  { initials:"OR", name:"Overseas Recruitment",   role:"Head of International Sourcing",  bio:"Manages talent pipelines across Asia and Africa with 10+ years of cross-border deployment experience." },
  { initials:"CC", name:"Client Relations",       role:"Head of Corporate Accounts",      bio:"Serves 300+ corporate clients including major Qatar contractors, hospitality, and logistics groups." },
  { initials:"HR", name:"HR & Compliance",        role:"HR Director",                     bio:"Ensures full compliance with Qatar Labor Law, visa processing, and international recruitment standards." },
];

function LeadershipTeam() {
  return (
    <section className="bg-[#f8f9fc] py-28">
      <Container>
        <SectionHeading tag="Our Team" title="The People Behind Every Placement"
          subtitle="Dedicated specialists who manage every stage of your recruitment — from sourcing to deployment." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {team.map((member, i) => (
            <motion.div key={member.name}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-40px" }}
              transition={{ delay:i*.1, duration:.6, ease:EASE }}
              whileHover={{ y:-6 }}
              className="team-card group bg-white border border-gray-100 rounded-2xl p-6 text-center
                         hover:border-[#0A1628]/20 hover:shadow-2xl hover:shadow-[#0A1628]/10
                         transition-all duration-500"
            >
              <div className="team-avatar-wrap mx-auto mb-5">
                <motion.div
                  whileHover={{ rotate:[0,4,-4,0] }}
                  transition={{ duration:.4 }}
                  className="w-20 h-20 bg-gradient-to-br from-[#0A1628] to-[#0d2245] rounded-2xl
                             flex items-center justify-center shadow-lg shadow-[#0A1628]/20"
                >
                  <span className="text-[#C9A84C] font-black text-xl">{member.initials}</span>
                </motion.div>
              </div>

              <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-[#0A1628] transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-sm text-[#C9A84C] font-semibold mb-2">{member.role}</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-5">{member.bio}</p>

              <motion.a href="#" aria-label={`${member.name} LinkedIn`}
                whileHover={{ scale:1.15 }} whileTap={{ scale:.95 }}
                className="inline-flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-[#0A1628] rounded-xl transition-all duration-300 group/li"
              >
                <Linkedin size={14} className="text-gray-400 group-hover/li:text-[#C9A84C] transition-colors duration-300" />
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
  { icon:ShieldCheck, name:"Ministry of Labor Qatar",    body:"Licensed manpower recruitment agency operating under Qatar's Ministry of Labor — License #618. Full compliance with Qatar Labor Law and worker protection standards.", issued:"Active License · Since 2018", color:"text-[#0A1628]", bg:"bg-[#0A1628]/8" },
  { icon:ShieldCheck, name:"Supreme Committee Approved", body:"Certified as an approved FIFA supplier by the Supreme Committee for Delivery & Legacy — the highest credibility standard for manpower providers in Qatar.", issued:"FIFA Supplier Standard · Active",  color:"text-[#C5282B]", bg:"bg-[#C5282B]/8" },
  { icon:ShieldCheck, name:"International Standards",    body:"Full compliance with international labor standards and recruitment ethics. Zero exploitation guarantee. Transparent visa and documentation processing from start to finish.", issued:"Zero Exploitation · Annually Reviewed", color:"text-[#C9A84C]", bg:"bg-[#C9A84C]/8" },
];

const partners = [
  { name:"Gulf Warehousing", abbr:"GWC" },
  { name:"Milaha",           abbr:"MIL" },
  { name:"Mowasalat",        abbr:"MOW" },
  { name:"BUTEC",            abbr:"BUT" },
  { name:"Draieh",           abbr:"DRH" },
  { name:"GASCO",            abbr:"GAS" },
  { name:"Certis GSSCI",     abbr:"CGS" },
  { name:"Al Misnad",        abbr:"AMS" },
];

function CertificationsPartners() {
  return (
    <section className="bg-white py-28">
      <Container>
        <SectionHeading tag="Credentials" title="Certified. Compliant. Trusted."
          subtitle="Our licenses and approvals reflect our zero-compromise approach to legal, ethical recruitment." />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div key={cert.name}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-40px" }}
                transition={{ delay:i*.1, duration:.6, ease:EASE }}
                whileHover={{ y:-6 }}
                className="card-glow group bg-gray-50 border border-gray-100 rounded-2xl p-8
                           hover:border-[#0A1628]/20 transition-all duration-500"
              >
                <motion.div
                  whileHover={{ rotate:[-4,4,-4,0], scale:1.12 }}
                  transition={{ duration:.4 }}
                  className={`w-14 h-14 ${cert.bg} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <Icon size={26} className={cert.color} />
                </motion.div>
                <h3 className="text-lg font-black text-gray-900 mb-3">{cert.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{cert.body}</p>
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{cert.issued}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay:.2, duration:.6 }}
          className="mt-16 pt-16 border-t border-gray-100"
        >
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
            Trusted by Qatar's Leading Organizations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity:0, scale:.9 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                transition={{ delay:i*.07, duration:.5, ease:EASE }}
                className="partner-chip flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4
                           hover:border-[#0A1628]/20 grayscale hover:grayscale-0 transition-all duration-400 cursor-default"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-[#0A1628] to-[#0d2245] rounded-xl flex items-center justify-center">
                  <span className="text-[#C9A84C] text-xs font-black">{p.abbr}</span>
                </div>
                <span className="font-semibold text-gray-600 text-sm">{p.name}</span>
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
    <section className="py-20 bg-[#f8f9fc]">
      <Container>
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.8, ease:EASE }}
          className="relative bg-gradient-to-br from-[#0A1628] via-[#0d2245] to-[#0A1628]
                     rounded-3xl overflow-hidden px-8 py-16 md:p-20 text-center"
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-80" />

          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="orb1 absolute -top-20 -left-20 w-80 h-80 bg-[#C9A84C] rounded-full blur-3xl opacity-[.06]" />
            <div className="orb2 absolute -bottom-20 -right-20 w-96 h-96 bg-[#C5282B] rounded-full blur-3xl opacity-[.07]" />
            <div className="absolute inset-0 opacity-[.04]"
              style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
            <div className="ring-spin-cw  absolute top-6  right-12 w-40 h-40 border border-dashed border-white/[.07] rounded-full" />
            <div className="ring-spin-ccw absolute bottom-6 left-12  w-24 h-24 border border-dashed border-white/[.07] rounded-full" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.2, duration:.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-semibold">Stop Recruiting Slowly. Start Hiring Smart.</span>
            </motion.div>

            <motion.h2
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.3, duration:.7 }}
              className="shimmer-text text-4xl md:text-5xl font-black leading-tight mb-6"
            >
              Ready to Grow Your Workforce?
            </motion.h2>

            <motion.p
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.4, duration:.6 }}
              className="text-white/70 text-lg leading-relaxed mb-10"
            >
              Every week you delay hiring costs money. Asliya delivers in 25–30 days. We've done this 20,000+ times. Your competitors are already with us.
            </motion.p>

            <motion.div
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.5, duration:.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a href="tel:+97444434386"
                whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.97 }}
                className="bg-[#C9A84C] text-[#0A1628] font-bold px-8 py-4 rounded-2xl flex items-center gap-2.5 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-300"
              >
                <Phone size={18} /> Call Now: +974 4443 4386
              </motion.a>
              <motion.a href="mailto:business@asliyarecruitment.com"
                whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.97 }}
                className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors duration-300 flex items-center gap-2.5"
              >
                <Mail size={18} /> Email Us
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity:0 }} whileInView={{ opacity:1 }}
              viewport={{ once:true }} transition={{ delay:.7, duration:.6 }}
              className="mt-8 text-white/40 text-sm"
            >
              Free consultation · Response within 24 hours · business@asliyarecruitment.com
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