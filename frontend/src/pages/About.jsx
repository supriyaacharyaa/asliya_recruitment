import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  Users, Award, Globe, Target, Eye, Heart,
  Linkedin, ShieldCheck, ChevronRight, Download, Phone, Mail, MapPin
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";

const EASE = [0.22, 1, 0.36, 1];
const BLUE = "#154895";
const RED  = "#e62224";
const GOLD = "#C9A84C";

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
    0%   { transform: scale(1);    opacity: .5; }
    100% { transform: scale(1.6);  opacity: 0;  }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes orb1 {
    0%,100%{ transform:scale(1) translate(0,0); }
    50%    { transform:scale(1.2) translate(20px,-14px); }
  }
  @keyframes orb2 {
    0%,100%{ transform:scale(1.15) translate(0,0); }
    50%    { transform:scale(.85) translate(-18px,12px); }
  }
  @keyframes blob1 {
    0%,100%{ transform:scale(1) translate(0,0); opacity:.08; }
    50%    { transform:scale(1.18) translate(22px,-16px); opacity:.14; }
  }
  @keyframes blob2 {
    0%,100%{ transform:scale(1.1) translate(0,0); opacity:.06; }
    50%    { transform:scale(.9) translate(-18px,12px); opacity:.11; }
  }

  .float-y   { animation: floatY 5s ease-in-out infinite; }
  .float-x   { animation: floatX 7s ease-in-out infinite; }
  .spin-slow { animation: spin-slow 18s linear infinite; }
  .orb1      { animation: orb1 8s ease-in-out infinite; }
  .orb2      { animation: orb2 11s ease-in-out infinite; }
  .blob1     { animation: blob1 9s ease-in-out infinite; }
  .blob2     { animation: blob2 12s ease-in-out infinite; }

  .ring-spin-cw  { animation: spin-slow 22s linear infinite; }
  .ring-spin-ccw { animation: spin-slow 28s linear infinite reverse; }
  .badge-float   { animation: floatY 4s ease-in-out infinite; }

  .shimmer-text {
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.4) 40%,#fff 60%,rgba(255,255,255,.4) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3.5s linear infinite;
  }

  .stat-num {
    display:inline-block;
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.55) 40%,#fff 60%);
    background-size:200% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation: shimmer 2.5s linear infinite;
  }

  /* Glass card */
  .glass-card {
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(21,72,149,0.10);
    box-shadow: 0 2px 24px rgba(21,72,149,0.06);
    transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
  }
  .glass-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(21,72,149,0.14);
  }

  /* MVV top bar */
  .mvv-bar {
    position:absolute; top:0; left:0; right:0; height:3px;
    border-radius:16px 16px 0 0;
    transform: scaleX(0); transform-origin: left;
    transition: transform .45s cubic-bezier(.22,1,.36,1);
  }
  .mvv-wrap:hover .mvv-bar { transform: scaleX(1); }
  .mvv-wrap .mvv-icon { transition: transform .35s cubic-bezier(.22,1,.36,1); }
  .mvv-wrap:hover .mvv-icon { transform: scale(1.12) rotate(-4deg); }

  /* TL pulse */
  .tl-dot-wrap { position:relative; display:flex; align-items:center; justify-content:center; }
  .tl-dot-wrap::before {
    content:''; position:absolute;
    width:28px; height:28px; border-radius:50%;
    background: rgba(21,72,149,0.22);
    animation: pulse-ring 1.8s ease-out infinite;
  }

  .partner-chip {
    transition: transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s;
  }
  .partner-chip:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 10px 28px rgba(21,72,149,0.12);
  }

  .team-card .avatar-ring {
    transition: box-shadow .3s;
  }
  .team-card:hover .avatar-ring {
    box-shadow: 0 0 0 3px rgba(21,72,149,0.22);
  }
`;

/* ─── CountUp ─── */
function CountUp({ value, suffix, inView }) {
  const count = useMotionValue(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!inView) return;
    const c = animate(count, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
    return c.stop;
  }, [inView, value, count]);
  useEffect(() => {
    return count.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    });
  }, [count, suffix]);
  return <span ref={ref} className="stat-num text-5xl font-black tabular-nums">0{suffix}</span>;
}

/* ═══════════════════════════════
   1. HERO
═══════════════════════════════ */
function PageHero() {
  return (
    <section className="relative pt-40 pb-28 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #0d2f6b 55%, #091d46 100%)` }}>
      <style>{ANIM_CSS}</style>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob1 absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full blur-3xl"
          style={{ background: "#6b9fff" }} />
        <div className="blob2 absolute -bottom-40 -right-32 w-[480px] h-[480px] rounded-full blur-3xl"
          style={{ background: RED }} />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
        <div className="ring-spin-cw  absolute top-10 right-20 w-64 h-64 border-2 border-dashed border-white/[.09] rounded-full" />
        <div className="ring-spin-ccw absolute bottom-10 left-14 w-40 h-40 border-2 border-dashed border-white/[.09] rounded-full" />
      </div>

      <Container className="relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
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

        <motion.div className="flex flex-wrap gap-3"
          initial="hidden" animate="visible"
          variants={{ visible:{ transition:{ staggerChildren:.1, delayChildren:.5 } } }}
        >
          {[
            { icon:Award,  label:"Ministry of Labor Licensed #618" },
            { icon:Globe,  label:"28+ Countries" },
            { icon:Users,  label:"20,000+ Deployed" },
          ].map(({ icon:Icon, label }) => (
            <motion.div key={label}
              variants={{ hidden:{ opacity:0, scale:.8, y:6 }, visible:{ opacity:1, scale:1, y:0 } }}
              transition={{ type:"spring", stiffness:260, damping:20 }}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/85"
              style={{ background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)" }}
            >
              <Icon size={13} style={{ color:RED }} />{label}
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#f4f8ff" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   2. WHO WE ARE
═══════════════════════════════ */
const highlights = [
  { icon:Award,      label:"Ministry of Labor Qatar — License #618" },
  { icon:ShieldCheck,label:"Supreme Committee Approved" },
  { icon:Globe,      label:"28+ Countries" },
  { icon:Users,      label:"20,000+ Deployed" },
];

function WhoWeAre() {
  return (
    <section className="py-28 overflow-hidden" style={{ background:"#f4f8ff" }}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT visual */}
          <motion.div
            initial={{ opacity:0, x:-40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:.8, ease:EASE }}
            className="relative"
          >
            <div className="ring-spin-ccw absolute -top-6 -left-6 w-full h-full border-2 border-dashed rounded-3xl -z-10"
              style={{ borderColor:"rgba(21,72,149,0.14)" }} />

            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl"
              style={{ background:`linear-gradient(135deg, ${BLUE} 0%, #0d2f6b 100%)`, boxShadow:`0 30px 80px rgba(21,72,149,0.28)` }}>
              <div className="absolute inset-0" style={{
                backgroundImage:`radial-gradient(circle at 20% 80%,rgba(230,34,36,.28) 0%,transparent 45%),
                                 radial-gradient(circle at 80% 20%,rgba(107,159,255,.12) 0%,transparent 40%)`
              }} />
              <div className="float-x absolute top-8 right-8 w-20 h-20 rounded-2xl border"
                style={{ borderColor:"rgba(255,255,255,0.15)" }} />
              <div className="float-y absolute bottom-10 left-8 w-14 h-14 rounded-xl border"
                style={{ borderColor:"rgba(255,255,255,0.12)" }} />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <motion.div
                  initial={{ opacity:0, y:-12 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ delay:.3, duration:.6, ease:EASE }}
                  className="rounded-2xl px-6 py-2 mb-8"
                  style={{ background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)" }}
                >
                  <span className="text-sm font-semibold tracking-widest uppercase text-white/80">Est. 2018 · Doha, Qatar</span>
                </motion.div>

                <motion.div
                  initial={{ scale:.7, opacity:0 }} whileInView={{ scale:1, opacity:1 }}
                  viewport={{ once:true }} transition={{ delay:.45, type:"spring", stiffness:200, damping:16 }}
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8"
                  style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.18)" }}
                >
                  <Users size={44} className="text-white" />
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
              className="badge-float absolute -bottom-6 -right-6 bg-white rounded-2xl px-6 py-4 shadow-2xl"
              style={{ border:"1px solid rgba(21,72,149,0.10)", boxShadow:"0 16px 48px rgba(21,72,149,0.14)" }}
            >
              <div className="text-3xl font-black" style={{ color:BLUE }}>7+ Years</div>
              <div className="text-sm font-semibold text-gray-400 mt-0.5">Proven Expertise in Qatar</div>
            </motion.div>
          </motion.div>

          {/* RIGHT content */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:.8, ease:EASE }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color:RED }}>Who We Are</p>
            <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6">
              Fast, Reliable &amp;<br />Risk-Free Recruitment
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-5">
              Asliya Manpower Supply W.L.L is a Qatar-based recruitment company trusted by the country's top organizations since 2018. We specialize in sourcing, screening, and deploying skilled and semi-skilled talent from 28+ countries across Asia, Africa, Europe, and the Middle East.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              Licensed by the Ministry of Labor Qatar (License #618) and approved by the Supreme Committee for Delivery & Legacy as a FIFA supplier, we have completed 20,000+ successful deployments for 300+ corporate clients — including single campaigns of 4,000 workers — all within our industry-leading 25–40 day timeline.
            </p>

            <motion.div className="flex flex-wrap gap-3 mb-10"
              initial="hidden" whileInView="visible" viewport={{ once:true }}
              variants={{ visible:{ transition:{ staggerChildren:.1, delayChildren:.1 } } }}
            >
              {highlights.map(({ icon:Icon, label }) => (
                <motion.div key={label}
                  variants={{ hidden:{ opacity:0, scale:.75, y:8 }, visible:{ opacity:1, scale:1, y:0 } }}
                  transition={{ type:"spring", stiffness:260, damping:20 }}
                  className="flex items-center gap-2.5 rounded-full px-5 py-2.5"
                  style={{ background:"rgba(21,72,149,0.07)", border:"1px solid rgba(21,72,149,0.14)" }}
                >
                  <Icon size={15} style={{ color:BLUE }} />
                  <span className="text-sm font-semibold" style={{ color:BLUE }}>{label}</span>
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

/* ═══════════════════════════════
   3. MISSION VISION VALUES
═══════════════════════════════ */
const mvv = [
  {
    icon:Target, title:"Our Mission",
    body:"To deliver fast, reliable, and compliant recruitment solutions for businesses across Qatar and beyond — connecting the right talent to the right opportunities within 25–40 days, every time.",
    barFrom:BLUE, barTo:"#0d2f6b",
    iconBg:"rgba(21,72,149,0.08)", iconColor:BLUE,
  },
  {
    icon:Eye, title:"Our Vision",
    body:"To become Qatar's most trusted manpower partner — recognized for speed, scale, and ethical recruitment that benefits employers, workers, and communities across 28+ countries.",
    barFrom:RED, barTo:"#b81a1c",
    iconBg:"rgba(230,34,36,0.08)", iconColor:RED,
  },
  {
    icon:Heart, title:"Our Values",
    body:"Zero exploitation. Full transparency. Strict compliance with Qatar Labor Law and international standards. Unwavering commitment to quality at every level of scale — from 10 hires to 4,000.",
    barFrom:GOLD, barTo:"#a8893a",
    iconBg:"rgba(201,168,76,0.10)", iconColor:GOLD,
  },
];

function MissionVisionValues() {
  return (
    <section className="py-28 bg-white">
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
                className="mvv-wrap glass-card rounded-2xl p-10 text-center relative overflow-hidden"
              >
                <div className="mvv-bar"
                  style={{ background:`linear-gradient(90deg,${item.barFrom},${item.barTo})` }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background:item.iconBg }}>
                  <span className="mvv-icon inline-flex">
                    <Icon size={28} style={{ color:item.iconColor }} />
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

/* ═══════════════════════════════
   4. STATS BAND
═══════════════════════════════ */
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
    <section ref={ref} className="py-16 relative overflow-hidden"
      style={{ background:`linear-gradient(135deg, ${BLUE} 0%, #0d2f6b 100%)` }}>
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background:`linear-gradient(90deg,transparent,rgba(232, 228, 43, 0.7),transparent)` }} />

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

/* ═══════════════════════════════
   5. TIMELINE
═══════════════════════════════ */
const milestones = [
  { year:"2018", title:"Company Founded in Doha",             desc:"Asliya Manpower Supply W.L.L was established in Qatar, completing our first domestic placements and earning our Ministry of Labor license (#618)." },
  { year:"2019", title:"First Overseas Deployments",          desc:"Launched international recruitment operations, sourcing skilled and semi-skilled workers from Asia and Africa for Qatar-based corporate clients." },
  { year:"2020", title:"Supreme Committee Approval",          desc:"Achieved FIFA supplier status through Supreme Committee for Delivery & Legacy approval — the highest credibility standard in Qatar's recruitment industry." },
  { year:"2021", title:"Mass Campaign Milestone",             desc:"Completed our 50th mass recruitment campaign, with on-site interview programs running across India, Philippines, Nepal, and Ghana." },
  { year:"2022", title:"4,000-Worker Single Deployment",      desc:"Executed our largest single deployment — 4,000 workers mobilized simultaneously for a major Qatar client, without compromising quality or timeline." },
  { year:"2025", title:"20,000+ Deployments & 28+ Countries", desc:"Reached a landmark milestone: over 20,000 successful deployments across 28+ countries and 300+ corporate clients, cementing our position as Qatar's #1 manpower partner." },
];

function Timeline() {
  return (
    <section className="py-28" style={{ background:"#f4f8ff" }}>
      <Container>
        <SectionHeading tag="Our Journey" title="7 Years of Growth"
          subtitle="From a local staffing firm to Qatar's most trusted large-scale recruitment partner — here is our story." />

        <div className="relative mt-20 max-w-4xl mx-auto">
          {/* Center line */}
          <motion.div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{ background:`linear-gradient(to bottom,rgba(21,72,149,0) 0%,rgba(21,72,149,0.22) 15%,rgba(21,72,149,0.22) 85%,rgba(21,72,149,0) 100%)` }}
            initial={{ scaleY:0 }} whileInView={{ scaleY:1 }}
            viewport={{ once:true }} transition={{ duration:1.2, ease:EASE }}
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
                  className={`relative flex items-center gap-8 flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"} text-left`}>
                    <motion.div
                      whileHover={{ y:-4 }}
                      transition={{ type:"spring", stiffness:300, damping:22 }}
                      className="glass-card rounded-2xl p-6 group"
                    >
                      <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:transition-colors duration-300"
                        style={{ "--hover-color":BLUE }}>
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </div>

                  {/* Year pill + dot */}
                  <div className="relative flex-shrink-0 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ scale:0 }} whileInView={{ scale:1 }}
                      viewport={{ once:true }}
                      transition={{ delay:i*.1+.2, type:"spring", stiffness:300, damping:18 }}
                      className="text-white font-black text-sm px-5 py-2.5 rounded-xl whitespace-nowrap shadow-lg"
                      style={{ background:BLUE, boxShadow:`0 8px 24px rgba(21,72,149,0.28)` }}
                    >
                      {m.year}
                    </motion.div>
                    <div className="hidden lg:flex tl-dot-wrap">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md relative z-10"
                        style={{ border:`4px solid ${BLUE}` }} />
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

/* ═══════════════════════════════
   6. LEADERSHIP TEAM
═══════════════════════════════ */
const team = [
  { initials:"GM", name:"General Manager",      role:"Operations & Strategy",         bio:"Oversees company-wide recruitment operations, client relationships, and Qatar compliance standards." },
  { initials:"OR", name:"Overseas Recruitment", role:"Head of International Sourcing", bio:"Manages talent pipelines across Asia and Africa with 10+ years of cross-border deployment experience." },
  { initials:"CC", name:"Client Relations",     role:"Head of Corporate Accounts",     bio:"Serves 300+ corporate clients including major Qatar contractors, hospitality, and logistics groups." },
  { initials:"HR", name:"HR & Compliance",      role:"HR Director",                    bio:"Ensures full compliance with Qatar Labor Law, visa processing, and international recruitment standards." },
];

function LeadershipTeam() {
  return (
    <section className="py-28 bg-white">
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
              className="team-card glass-card rounded-2xl p-6 text-center"
            >
              <div className="mx-auto mb-5 inline-block">
                <motion.div
                  whileHover={{ rotate:[0,4,-4,0] }}
                  transition={{ duration:.4 }}
                  className="avatar-ring w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background:`linear-gradient(135deg,${BLUE} 0%,#0d2f6b 100%)`, boxShadow:`0 8px 24px rgba(21,72,149,0.22)` }}
                >
                  <span className="font-black text-xl text-white">{member.initials}</span>
                </motion.div>
              </div>

              <h3 className="font-bold text-gray-900 text-base mb-1">{member.name}</h3>
              <p className="text-sm font-semibold mb-2" style={{ color:RED }}>{member.role}</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-5">{member.bio}</p>

              <motion.a href="#" aria-label={`${member.name} LinkedIn`}
                whileHover={{ scale:1.15 }} whileTap={{ scale:.95 }}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 group/li"
                style={{ background:"rgba(21,72,149,0.07)" }}
                onMouseEnter={e => e.currentTarget.style.background = BLUE}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(21,72,149,0.07)"}
              >
                <Linkedin size={14} className="text-gray-400 group-hover/li:text-white transition-colors duration-300" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════
   7. CERTIFICATIONS + PARTNERS
═══════════════════════════════ */
const certifications = [
  {
    icon:ShieldCheck, name:"Ministry of Labor Qatar",
    body:"Licensed manpower recruitment agency operating under Qatar's Ministry of Labor — License #618. Full compliance with Qatar Labor Law and worker protection standards.",
    issued:"Active License · Since 2018",
    iconColor:BLUE, iconBg:"rgba(21,72,149,0.08)",
  },
  {
    icon:ShieldCheck, name:"Supreme Committee Approved",
    body:"Certified as an approved FIFA supplier by the Supreme Committee for Delivery & Legacy — the highest credibility standard for manpower providers in Qatar.",
    issued:"FIFA Supplier Standard · Active",
    iconColor:RED, iconBg:"rgba(230,34,36,0.08)",
  },
  {
    icon:ShieldCheck, name:"International Standards",
    body:"Full compliance with international labor standards and recruitment ethics. Zero exploitation guarantee. Transparent visa and documentation processing from start to finish.",
    issued:"Zero Exploitation · Annually Reviewed",
    iconColor:GOLD, iconBg:"rgba(201,168,76,0.10)",
  },
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
    <section className="py-28" style={{ background:"#f4f8ff" }}>
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
                className="glass-card rounded-2xl p-8"
              >
                <motion.div
                  whileHover={{ rotate:[-4,4,-4,0], scale:1.12 }}
                  transition={{ duration:.4 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background:cert.iconBg }}
                >
                  <Icon size={26} style={{ color:cert.iconColor }} />
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
          className="mt-16 pt-16"
          style={{ borderTop:"1px solid rgba(21,72,149,0.10)" }}
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
                className="partner-chip flex items-center gap-3 bg-white rounded-2xl px-6 py-4 cursor-default"
                style={{ border:"1px solid rgba(21,72,149,0.10)", boxShadow:"0 2px 12px rgba(21,72,149,0.06)" }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background:`linear-gradient(135deg,${BLUE} 0%,#0d2f6b 100%)` }}>
                  <span className="text-xs font-black" style={{ color:GOLD }}>{p.abbr}</span>
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

/* ═══════════════════════════════
   8. CTA BANNER
═══════════════════════════════ */
function CTABanner() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.8, ease:EASE }}
          className="relative rounded-3xl overflow-hidden px-8 py-16 md:p-20 text-center"
          style={{ background:`linear-gradient(135deg, ${BLUE} 0%, #0d2f6b 55%, #091d46 100%)` }}
        >
          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background:`linear-gradient(90deg,transparent,rgba(190, 40, 40, 0.8),transparent)` }} />

          {/* Bg orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="orb1 absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl"
              style={{ background:"#6b9fff", opacity:.08 }} />
            <div className="orb2 absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl"
              style={{ background:RED, opacity:.09 }} />
            <div className="absolute inset-0 opacity-[.04]"
              style={{ backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
            <div className="ring-spin-cw  absolute top-6 right-12 w-40 h-40 border border-dashed border-white/[.07] rounded-full" />
            <div className="ring-spin-ccw absolute bottom-6 left-12 w-24 h-24 border border-dashed border-white/[.07] rounded-full" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.2, duration:.6 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
              style={{ background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.20)" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:RED }} />
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
                className="font-bold px-8 py-4 rounded-2xl flex items-center gap-2.5 text-white transition-shadow duration-300"
                style={{ background:RED, boxShadow:`0 12px 32px rgba(0,0,0,0.22)` }}
              >
                <Phone size={18} /> Call Now: +974 4443 4386
              </motion.a>
              <motion.a href="mailto:business@asliyarecruitment.com"
                whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.97 }}
                className="font-bold px-8 py-4 rounded-2xl flex items-center gap-2.5 text-white transition-all duration-300"
                style={{ background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.20)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.20)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.10)"}
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

/* ═══════════════════════════════
   PAGE
═══════════════════════════════ */
export default function About() {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background:"#f4f8ff" }}>
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