import { motion, useInView } from "framer-motion";
import { ArrowRight, Award, Users, Globe, Shield, TrendingUp, CheckCircle, ChevronRight } from "lucide-react";
import { useRef } from "react";

/* ─── Asliya Manpower Features ─── */
const highlights = [
  { icon: Award,      label: "Ministry Licensed",  desc: "Ministry of Labor License No: 618"      },
  { icon: Shield,     label: "Supreme Committee",  desc: "Approved for major Qatari projects"    },
  { icon: Users,      label: "Pre-Screened Talent",desc: "Rigorous testing & sourcing pipeline"  },
  { icon: Globe,      label: "28+ Source Countries",desc: "Global recruitment infrastructure"    },
  { icon: TrendingUp, label: "25-30 Days Delivery",desc: "Industry-leading deployment speed"   },
];

/* ─── Asliya's Real Milestone Timeline ─── */
const milestones = [
  { year: "2018", event: "Established in Doha, Qatar to redefine workforce supply" },
  { year: "2020", event: "Mobilized massive workforce during global supply chain challenges" },
  { year: "2022", event: "Key deployment partner for prestigious FIFA infrastructure projects" },
  { year: "2026", event: "Reached 20,000+ successful deployments across 300+ corporate clients" },
];

/* ─── Asliya's Verified Core Stats ─── */
const coreStats = [
  { value: "7+", label: "Years" },
  { value: "20K+", label: "Placed" },
  { value: "300+", label: "Clients" },
];

function Btn({ children, variant = "primary", href = "#", icon: Icon }) {
  const base = "inline-flex items-center justify-center gap-2 font-bold text-[13px] sm:text-[14px] px-5 sm:px-7 py-[11px] sm:py-[13px] rounded-[12px] transition-all duration-250 cursor-pointer whitespace-nowrap w-full sm:w-auto";
  const styles = {
    primary: { background: "#154895", color: "#fff", boxShadow: "0 4px 20px rgba(21,72,149,0.32)" },
    outline:  { background: "transparent", color: "#154895", border: "2px solid rgba(21,72,149,0.28)" },
  };
  return (
    <motion.a
      href={href}
      className={base}
      style={styles[variant]}
      whileHover={{ 
        scale: 1.02, 
        y: -1,
        boxShadow: variant === "primary" ? "0 8px 28px rgba(21,72,149,0.42)" : undefined,
        background: variant === "outline" ? "rgba(21,72,149,0.06)" : "#1a58b8",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
      {Icon && <Icon size={15} className="flex-shrink-0" />}
    </motion.a>
  );
}

export default function AboutPreviewSection() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}
    >
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full w-[400px] h-[400px] md:w-[700px] md:h-[700px]"
          style={{
            top: "-10%", right: "-15%",
            background: "radial-gradient(circle, rgba(21,72,149,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
          style={{
            bottom: "0%", left: "-8%",
            background: "radial-gradient(circle, rgba(230,34,36,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-16 2xl:gap-24 items-center">

          {/* ═══ LEFT COLUMN: Visual Milestone Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[540px] lg:max-w-none mx-auto order-2 lg:order-1"
          >
            {/* Decorative dashed outline border */}
            <div
              className="hidden sm:block absolute -top-5 -left-5 w-44 h-44 xl:w-56 xl:h-56 rounded-[28px] pointer-events-none"
              style={{ border: "2px dashed rgba(21,72,149,0.12)", zIndex: 0 }}
            />

            {/* Glowing Main Container Card */}
            <div
              className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden aspect-auto xl:aspect-[4/5] shadow-2xl w-full"
              style={{
                background: "linear-gradient(145deg, #0a1f42 0%, #154895 55%, #1a5caa 100%)",
                boxShadow: "0 24px 60px rgba(21,72,149,0.3)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse at 15% 85%, rgba(230,34,36,0.22) 0%, transparent 45%),
                    radial-gradient(ellipse at 85% 15%, rgba(100,160,255,0.15) 0%, transparent 45%)
                  `,
                }}
              />
               
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
            
              <div className="absolute top-6 right-6 w-16 h-16 rounded-[14px]" style={{ border: "1.5px solid rgba(255,255,255,0.08)" }} />
              <div className="absolute bottom-6 left-6 w-12 h-12 rounded-[12px]" style={{ border: "1.5px solid rgba(255,255,255,0.08)" }} />

              {/* Inner Card Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 sm:px-8 xl:px-10 py-10 lg:py-8 xl:py-12 text-center">
              
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-16 h-16 xl:w-20 xl:h-20 rounded-[18px] xl:rounded-[22px] flex items-center justify-center mb-5 xl:mb-6"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.15)" }}
                >
                  <Users className="w-8 h-8 xl:w-10 xl:h-10 text-white/90" strokeWidth={1.5} />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-white font-black text-[22px] sm:text-[24px] xl:text-[28px] leading-tight mb-2.5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  7+ Years of<br />Manpower Excellence
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[12.5px] sm:text-[13.5px] leading-relaxed mb-6 xl:mb-8 max-w-[280px]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  From strategic roots in 2018 to Qatar's premier corporate labor supply partner.
                </motion.p>

                {/* Core Stats Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[420px]">
                  {coreStats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="rounded-[12px] py-2.5 sm:py-3 text-center"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white font-black text-[17px] sm:text-[20px] leading-none">{s.value}</div>
                      <div className="text-[9.5px] sm:text-[10px] mt-1 font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Dynamic Timeline Wrapper */}
                <div className="w-full max-w-[440px] mt-6 xl:mt-8 space-y-3 sm:space-y-3.5 border-t border-white/10 pt-5 xl:pt-6">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-start gap-2.5 sm:gap-3 text-left"
                    >
                      <span
                        className="flex-shrink-0 text-[9.5px] sm:text-[10px] font-black px-1.5 py-[2px] rounded-md mt-[2px]"
                        style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
                      >
                        {m.year}
                      </span>
                      <span className="text-[11px] sm:text-[12px] lg:text-[11px] xl:text-[12.5px] leading-snug text-white/50">
                        {m.event}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Right Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-4 -right-2 sm:-right-4 rounded-[16px] p-3 sm:p-4 shadow-xl z-20"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "0.5px solid rgba(21,72,149,0.12)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 12px 32px rgba(21,72,149,0.15)",
              }}
            >
              <div
                className="text-[24px] sm:text-[30px] font-black leading-none"
                style={{ color: "#154895", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                100%
              </div>
              <div className="text-[9.5px] sm:text-[11px] font-bold mt-[2px] text-gray-500 leading-tight">
                Qatar Labor Law<br />Compliant Agency
              </div>
            </motion.div>

            {/* Top Left Floating Certification Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="absolute -top-4 -left-2 sm:-left-4 rounded-[14px] px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2 z-20"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "0.5px solid rgba(21,72,149,0.1)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(16,185,129,0.1)" }}
              >
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] sm:text-[11px] font-bold text-gray-800 leading-none">License #618</div>
                <div className="text-[9px] sm:text-[10px] text-gray-400 mt-[2px]">Ministry Approved</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN: Content Text ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            {/* Section Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-4 sm:mb-5 rounded-full px-3.5 py-[6px] border text-[11px] sm:text-[12px] font-bold uppercase tracking-widest"
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
              About Asliya Manpower
            </div>

            {/* Main Section Title */}
            <h2
              className="font-black text-gray-900 leading-[1.15] lg:leading-[1.1] tracking-tight mb-5 sm:mb-6"
              style={{
                fontSize: "clamp(26px, 3.8vw, 42px)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Your Trusted Corporate <br className="hidden sm:inline" />
              <span style={{ color: "#154895" }}>Workforce Supply</span> Partner
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 mb-6 sm:mb-8 text-gray-600">
              <p className="text-[14.5px] sm:text-[16px] leading-relaxed">
                Established with a vision to streamline bulk labor deployment, <strong className="text-gray-800 font-semibold">Asliya Manpower</strong> has
                solidified its position as a certified leader in Qatar's manpower sector. We specialize in fast-tracked recruitment, legally mobilizing fully compliant skilled and semi-skilled talent from 28+ source countries.
              </p>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-500">
                Operating under Ministry of Labor License No. 618 and fully approved by the Supreme Committee, we handle the entire deployment lifecycle—from biometric screening and trade testing to final on-site mobilization within 25-30 days.
              </p>
            </div>

            {/* Highlighted Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 sm:mb-10">
              {highlights.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3 rounded-[14px] px-3.5 py-3.5 border transition-all duration-250 group cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    borderColor: "rgba(21,72,149,0.06)",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(21,72,149,0.2)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(21,72,149,0.06)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(21,72,149,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-250"
                    style={{ background: "rgba(21,72,149,0.07)" }}
                  >
                    <Icon className="w-4 h-4 sm:w-[17px] sm:h-[17px] text-[#154895]" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] sm:text-[13px] font-bold text-gray-800 truncate">{label}</div>
                    <div className="text-[11px] sm:text-[11.5px] text-gray-400 truncate">{desc}</div>
                  </div>
                  <ChevronRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#154895] flex-shrink-0" />
                </motion.div>
              ))}
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Btn href="/about" icon={ArrowRight}>Our Track Record</Btn>
              <Btn href="/contact" variant="outline">Request Proposal</Btn>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}