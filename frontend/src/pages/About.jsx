import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import {
  Users, Award, Globe, Target, Eye, Heart,
  Linkedin, ShieldCheck, ChevronRight, Download, ArrowRight
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";

// ── ease curve used throughout ────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CountUp helper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CountUp({ value, suffix, inView }) {
  const count = useMotionValue(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, value, count]);

  useEffect(() => {
    return count.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    });
  }, [count, suffix]);

  return (
    <span ref={ref} className="text-5xl font-black text-white tabular-nums">
      0{suffix}
    </span>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. PAGE HERO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function PageHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] pt-40 pb-28 overflow-hidden">
      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.16, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.13, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#e62224] rounded-full blur-3xl"
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Dashed rings */}
        <div className="absolute top-16 right-24 w-64 h-64 border-2 border-dashed border-white/10 rounded-full" />
        <div className="absolute bottom-12 left-16 w-40 h-40 border-2 border-dashed border-white/10 rounded-full" />
      </div>

      <Container className="relative z-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 text-sm text-white/50 font-medium"
        >
          <a href="/" className="hover:text-white/80 transition-colors">Home</a>
          <ChevronRight size={14} className="text-white/30" />
          <span className="text-white/80">About Us</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="text-5xl xl:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6 max-w-3xl"
        >
          About RecruitMax Global Manpower
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-white/70 text-lg leading-relaxed max-w-xl"
        >
          A decade of connecting talent with opportunity across the globe — built on trust, integrity, and results that matter.
        </motion.p>
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. WHO WE ARE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const highlights = [
  { icon: Award, label: "ISO Certified" },
  { icon: Globe, label: "30+ Countries" },
  { icon: Users, label: "5000+ Placed" },
];

function WhoWeAre() {
  return (
    <section className="bg-white py-28 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            {/* Dashed frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-dashed border-[#154895]/15 rounded-3xl -z-10" />

            {/* Main visual */}
            <div className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-[#154895]/25">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 80%, rgba(230,34,36,0.28) 0%, transparent 45%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)",
                }}
              />
              {/* Content inside card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                {/* Founding badge */}
                <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-2 mb-8 backdrop-blur-sm">
                  <span className="text-white/80 text-sm font-semibold tracking-widest uppercase">
                    Founded 2014
                  </span>
                </div>
                <div className="w-24 h-24 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center mb-8 border border-white/20">
                  <Users size={44} className="text-white" />
                </div>
                <h3 className="text-white text-2xl font-black mb-3 leading-tight">
                  Your Global<br />Manpower Partner
                </h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
                  From local staffing to international deployments — we deliver every time
                </p>
              </div>
              {/* Decorative squares */}
              <div className="absolute top-8 right-8 w-20 h-20 border border-white/10 rounded-2xl" />
              <div className="absolute bottom-10 left-8 w-14 h-14 border border-white/10 rounded-xl" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-6 py-4 shadow-2xl shadow-gray-200/80 border border-gray-100"
            >
              <div className="text-3xl font-black text-[#154895]">Est. 2014</div>
              <div className="text-sm font-semibold text-gray-400 mt-0.5">· 10+ Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="text-sm font-semibold text-[#e62224] uppercase tracking-widest mb-4">
              Who We Are
            </p>
            <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6">
              Built on Trust,<br />Driven by Results
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-5">
              RecruitMax Global Manpower was founded in 2014 with a single mission: to bridge the gap between exceptional talent and the companies that need them most. What began as a domestic staffing firm serving local businesses has grown into a globally recognized recruitment partner.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              Over the past decade, we have expanded our operations to 30+ countries, served 300+ corporate clients, and successfully placed over 5,000 candidates across 15+ industries. Our ISO-certified processes, dedicated team of specialists, and commitment to compliance set us apart in an industry that demands nothing less than excellence.
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 bg-[#154895]/6 border border-[#154895]/15 rounded-full px-5 py-2.5"
                >
                  <Icon size={15} className="text-[#154895]" />
                  <span className="text-sm font-semibold text-[#154895]">{label}</span>
                </div>
              ))}
            </div>

            <Button variant="primary" size="lg" icon={Download} iconPosition="left">
              Download Company Profile
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. MISSION, VISION, VALUES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const mvv = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To connect the right people with the right opportunities — delivering reliable, compliant, and high-quality recruitment solutions for businesses and candidates across every industry we serve.",
    gradient: "from-[#154895] to-[#0d3270]",
    accent: "bg-[#154895]/8",
    iconColor: "text-[#154895]",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To become the world's most trusted manpower partner — recognized for integrity, innovation, and the transformative impact we create for employers and job-seekers alike across all continents.",
    gradient: "from-[#e62224] to-[#c01a1c]",
    accent: "bg-[#e62224]/8",
    iconColor: "text-[#e62224]",
  },
  {
    icon: Heart,
    title: "Our Values",
    body: "Integrity in every placement. Speed without compromising quality. Unwavering compliance with labor laws. And a genuine commitment to the long-term success of every candidate and client we serve.",
    gradient: "from-emerald-500 to-emerald-600",
    accent: "bg-emerald-500/8",
    iconColor: "text-emerald-600",
  },
];

function MissionVisionValues() {
  return (
    <section className="bg-[#f8f9fc] py-28">
      <Container>
        <SectionHeading
          tag="Our Foundation"
          title="Mission, Vision & Values"
          subtitle="The principles that guide every decision we make and every placement we deliver."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {mvv.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: EASE }}
                whileHover={{ y: -6 }}
                className="group bg-white border border-gray-100 rounded-2xl p-10 text-center hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10 transition-all duration-500 relative overflow-hidden"
              >
                {/* Top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />

                <div className={`w-16 h-16 ${item.accent} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={28} className={item.iconColor} />
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. STATS BAND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const stats = [
  { value: 5000, suffix: "+", label: "Candidates Placed" },
  { value: 300, suffix: "+", label: "Corporate Clients" },
  { value: 15, suffix: "+", label: "Industries Served" },
  { value: 30, suffix: "+", label: "Countries Covered" },
];

function StatsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#154895] py-16">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              className="relative text-center px-6 py-8"
            >
              {/* Divider (desktop only, not after last) */}
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. TIMELINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const milestones = [
  { year: "2014", title: "Company Founded", desc: "RecruitMax was incorporated with a team of 5, completing our first 50 domestic placements within the year." },
  { year: "2015", title: "First Overseas Deployment", desc: "Launched international operations with our inaugural deployment of 120 skilled workers to the Gulf region." },
  { year: "2017", title: "Industry Expansion", desc: "Grew our service coverage to 5 key industries and crossed the milestone of 100+ active corporate clients." },
  { year: "2019", title: "Executive Search Division", desc: "Established a dedicated C-suite and senior leadership headhunting practice, serving Fortune 500 partners." },
  { year: "2021", title: "ISO 9001 Certified", desc: "Achieved ISO 9001:2015 certification, formalizing our commitment to quality management and operational excellence." },
  { year: "2024", title: "5000+ Placements & 30+ Countries", desc: "Reached our decade milestone: over 5,000 successful placements across 30+ countries and 15+ industries." },
];

function Timeline() {
  return (
    <section className="bg-white py-28">
      <Container>
        <SectionHeading
          tag="Our Journey"
          title="A Decade of Growth"
          subtitle="From a small domestic agency to a globally recognized recruitment powerhouse — here is our story."
        />

        <div className="relative mt-20 max-w-4xl mx-auto">
          {/* Center vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#154895]/0 via-[#154895]/25 to-[#154895]/0" />

          <div className="flex flex-col gap-12">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
                  className={`relative flex items-center gap-8 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col lg:flex-row`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"} text-left`}>
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-[#154895]/20 hover:shadow-xl hover:shadow-[#154895]/8 transition-all duration-500 group">
                      <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-[#154895] transition-colors duration-300">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Center: Year badge + dot */}
                  <div className="relative flex-shrink-0 flex flex-col items-center gap-2 lg:w-auto w-full lg:flex-col flex-row">
                    <div className="bg-[#154895] text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-[#154895]/25 whitespace-nowrap">
                      {m.year}
                    </div>
                    {/* Dot on the line */}
                    <div className="hidden lg:block w-4 h-4 bg-white border-4 border-[#154895] rounded-full shadow-md" />
                  </div>

                  {/* Spacer (opposite side, desktop only) */}
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. LEADERSHIP TEAM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const team = [
  {
    initials: "JR",
    name: "James Reyes",
    role: "Chief Executive Officer",
    bio: "20+ years in global workforce strategy and enterprise recruitment.",
  },
  {
    initials: "MS",
    name: "Maria Santos",
    role: "Chief Operating Officer",
    bio: "Former HR director with expertise scaling operations across Asia-Pacific.",
  },
  {
    initials: "AF",
    name: "Ahmed Al-Farsi",
    role: "Head of Overseas Recruitment",
    bio: "Specializes in Middle East and Gulf deployments with 15+ years experience.",
  },
  {
    initials: "PN",
    name: "Priya Nair",
    role: "HR Director",
    bio: "Leads talent acquisition strategy, compliance, and candidate experience.",
  },
];

function LeadershipTeam() {
  return (
    <section className="bg-[#f8f9fc] py-28">
      <Container>
        <SectionHeading
          tag="Our Team"
          title="Meet the Leadership"
          subtitle="The experienced professionals steering RecruitMax toward its global vision."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              whileHover={{ y: -6 }}
              className="group bg-white border border-gray-100 rounded-2xl p-6 text-center hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10 transition-all duration-500"
            >
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-lg shadow-[#154895]/20 group-hover:scale-105 transition-transform duration-500">
                <span className="text-white font-black text-xl">{member.initials}</span>
              </div>

              <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-[#154895] transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-sm text-[#154895] font-semibold mb-2">{member.role}</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-5">{member.bio}</p>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label={`${member.name} LinkedIn`}
                className="inline-flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-[#154895] rounded-xl transition-all duration-300 group/li"
              >
                <Linkedin size={14} className="text-gray-400 group-hover/li:text-white transition-colors duration-300" />
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. CERTIFICATIONS & PARTNERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const certifications = [
  {
    icon: ShieldCheck,
    name: "ISO 9001:2015",
    body: "Quality Management System certified, ensuring consistent, world-class service delivery across all operations.",
    issued: "Issued 2021 · Renewal 2024",
    color: "text-[#154895]",
    bg: "bg-[#154895]/8",
  },
  {
    icon: ShieldCheck,
    name: "POEA Accredited",
    body: "Officially accredited by the Philippine Overseas Employment Administration for lawful overseas deployment.",
    issued: "Active Accreditation · Since 2015",
    color: "text-[#e62224]",
    bg: "bg-[#e62224]/8",
  },
  {
    icon: ShieldCheck,
    name: "GDPR Compliant",
    body: "Full compliance with EU General Data Protection Regulation, protecting candidate and client data privacy.",
    issued: "Compliant Since 2018 · Annually Audited",
    color: "text-emerald-600",
    bg: "bg-emerald-500/8",
  },
];

const partners = [
  { name: "Marriott", abbr: "MAR" },
  { name: "Hilton", abbr: "HLT" },
  { name: "Samsung", abbr: "SAM" },
  { name: "Aramco", abbr: "ARC" },
  { name: "Emirates", abbr: "EMR" },
  { name: "Siemens", abbr: "SIE" },
];

function CertificationsPartners() {
  return (
    <section className="bg-white py-28">
      <Container>
        <SectionHeading
          tag="Credentials"
          title="Certified. Compliant. Trusted."
          subtitle="Our credentials reflect our unwavering commitment to quality, legality, and data security."
        />

        {/* Certification cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                whileHover={{ y: -6 }}
                className="group bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10 transition-all duration-500"
              >
                <div className={`w-14 h-14 ${cert.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon size={26} className={cert.color} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3">{cert.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{cert.body}</p>
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{cert.issued}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Partner logos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 pt-16 border-t border-gray-100"
        >
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
            Partnering With Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#154895]/20 hover:shadow-lg transition-all duration-400 cursor-default grayscale hover:grayscale-0"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-xl flex items-center justify-center">
                  <span className="text-white text-xs font-black">{p.abbr}</span>
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. CTA BANNER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CTABanner() {
  return (
    <section className="py-20 bg-[#f8f9fc]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative bg-gradient-to-br from-[#154895] via-[#1a56b0] to-[#0d3270] rounded-3xl overflow-hidden px-8 py-16 md:p-20 text-center"
        >
          {/* Background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.13, 0.08] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.1, 0.06] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#e62224] rounded-full blur-3xl"
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-[#e62224] rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-semibold">Let's Work Together</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl font-black text-white leading-tight mb-6"
            >
              Want to Partner With Us?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/70 text-lg leading-relaxed mb-10"
            >
              Whether you're looking to hire top talent or seeking your next career opportunity, our team is ready to make it happen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-[#154895] font-bold px-8 py-4 rounded-2xl flex items-center gap-2.5 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-300"
              >
                Get In Touch <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors duration-300"
              >
                View Our Services
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 text-white/40 text-sm"
            >
              Free consultation · No commitment required · Response within 24 hours
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE ASSEMBLY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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