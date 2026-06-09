import { motion, useInView } from "framer-motion";
import { ArrowRight, Award, Users, Globe, Shield, TrendingUp, CheckCircle, ChevronRight } from "lucide-react";
import { useRef } from "react";


const highlights = [
  { icon: Award,      label: "ISO 9001 Certified",  desc: "Quality-assured end-to-end processes"      },
  { icon: Users,      label: "Specialist Recruiters", desc: "Industry-focused hiring experts"          },
  { icon: Globe,      label: "Global Network",      desc: "Active placements in 42 countries"          },
  { icon: Shield,     label: "Compliance Ready",    desc: "Full legal & visa processing support"       },
  { icon: TrendingUp, label: "98% Retention",       desc: "Clients that return, year after year"       },
];


const milestones = [
  { year: "2006", event: "Founded in Kathmandu as a domestic staffing firm" },
  { year: "2010", event: "Expanded to GCC region — first 500 overseas placements" },
  { year: "2016", event: "ISO 9001 certified & opened Dubai operations office" },
  { year: "2024", event: "20,000+ placements across 28 countries" },
];


const coreStats = [
  { value: "7+", label: "Years" },
  { value: "20K+", label: "Placed" },
  { value: "28+", label: "Countries" },
];


function Btn({ children, variant = "primary", href = "#", icon: Icon }) {
  const base = "inline-flex items-center gap-2 font-bold text-[14px] px-7 py-[13px] rounded-[12px] transition-all duration-250 cursor-pointer";
  const styles = {
    primary: { background: "#154895", color: "#fff", boxShadow: "0 4px 20px rgba(21,72,149,0.32)" },
    outline:  { background: "transparent", color: "#154895", border: "2px solid rgba(21,72,149,0.28)" },
  };
  return (
    <motion.a
      href={href}
      className={base}
      style={styles[variant]}
      whileHover={{ scale: 1.03, y: -1,
        boxShadow: variant === "primary" ? "0 8px 28px rgba(21,72,149,0.42)" : undefined,
        background: variant === "outline" ? "rgba(21,72,149,0.06)" : "#1a58b8",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
      {Icon && <Icon size={15} />}
    </motion.a>
  );
}


export default function AboutPreviewSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}
    >
     
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            top: "-20%", right: "-15%",
            background: "radial-gradient(circle, rgba(21,72,149,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
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

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
          
            <div
              className="absolute -top-5 -left-5 w-56 h-56 rounded-[28px] pointer-events-none"
              style={{ border: "2px dashed rgba(21,72,149,0.12)", zIndex: 0 }}
            />

          
            <div
              className="relative rounded-[28px] overflow-hidden aspect-[4/5] shadow-2xl"
              style={{
                background: "linear-gradient(145deg, #0a1f42 0%, #154895 55%, #1a5caa 100%)",
                boxShadow: "0 28px 72px rgba(21,72,149,0.36)",
              }}
            >
            
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse at 15% 85%, rgba(230,34,36,0.25) 0%, transparent 45%),
                    radial-gradient(ellipse at 85% 15%, rgba(100,160,255,0.15) 0%, transparent 45%)
                  `,
                }}
              />
             
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
            
              <div className="absolute top-7 right-7 w-20 h-20 rounded-[18px]" style={{ border: "1.5px solid rgba(255,255,255,0.1)" }} />
              <div className="absolute bottom-7 left-7 w-14 h-14 rounded-[14px]" style={{ border: "1.5px solid rgba(255,255,255,0.1)" }} />

            
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 pb-4 text-center">
              
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-24 h-24 rounded-[22px] flex items-center justify-center mb-8"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.18)" }}
                >
                  <Users size={44} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-white font-black text-[26px] leading-tight mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  7+ Years of<br />Manpower Excellence
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-[13.5px] leading-relaxed mb-8 max-w-[230px]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  From a small Kathmandu office to a globally recognized recruitment agency
                </motion.p>

              
                <div className="grid grid-cols-3 gap-3 w-full">
                  {coreStats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.65 + i * 0.08 }}
                      className="rounded-[13px] py-3 text-center"
                      style={{ background: "rgba(255,255,255,0.09)" }}
                    >
                      <div className="text-white font-black text-[19px] leading-none">{s.value}</div>
                      <div className="text-[10px] mt-1 font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>

               
                <div className="w-full mt-7 space-y-3">
                  {milestones.map((m, i) => (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.07 }}
                      className="flex items-start gap-3 text-left"
                    >
                      <span
                        className="flex-shrink-0 text-[10px] font-black px-2 py-[3px] rounded-md mt-[1px]"
                        style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                      >
                        {m.year}
                      </span>
                      <span className="text-[11.5px] leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {m.event}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

           
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -right-5 rounded-[18px] p-4 shadow-2xl z-20"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "0.5px solid rgba(21,72,149,0.12)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 12px 40px rgba(21,72,149,0.18)",
              }}
            >
              <div
                className="text-[36px] font-black leading-none"
                style={{ color: "#154895", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                #1
              </div>
              <div className="text-[11px] font-semibold mt-[3px]" style={{ color: "#64748b" }}>
                Rated Agency<br />in Nepal 2024
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: -12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -top-4 -left-4 rounded-[14px] px-4 py-3 flex items-center gap-2 z-20"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "0.5px solid rgba(21,72,149,0.1)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(16,185,129,0.1)" }}
              >
                <CheckCircle size={14} color="#10b981" />
              </div>
              <div>
                <div className="text-[11px] font-bold" style={{ color: "#1e293b" }}>ISO 9001 Certified</div>
                <div className="text-[10px]" style={{ color: "#94a3b8" }}>Quality Assured</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
         
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
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
              About Asliya Recruitment
            </motion.div>

          
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-black text-gray-900 leading-[1.1] tracking-tight mb-6"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Your Trusted{" "}
              <span style={{ color: "#154895" }}>Manpower</span>
              <br />Recruitment Partner
            </motion.h2>

       
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.6 }}
              className="space-y-4 mb-8"
            >
              <p className="text-[16px] leading-relaxed" style={{ color: "#475569" }}>
                Founded in 2006, <strong style={{ color: "#1e293b", fontWeight: 600 }}>Asliya Recruitment </strong> has
                grown from a domestic staffing firm into one of Quatar's most recognized international recruitment agencies —
                placing skilled workers, professionals and executives across 28 countries.
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "#64748b" }}>
                We specialize in the full recruitment lifecycle: sourcing, screening, trade testing, visa processing, pre-departure
                orientation and post-placement support — so your workforce is ready from day one.
              </p>
            </motion.div>

          
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
            >
              {highlights.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.24 + i * 0.06 }}
                  className="flex items-center gap-3 rounded-[14px] px-4 py-4 border transition-all duration-250 group cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    borderColor: "rgba(21,72,149,0.08)",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(21,72,149,0.22)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(21,72,149,0.09)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-250"
                    style={{ background: "rgba(21,72,149,0.07)" }}
                  >
                    <Icon size={17} color="#154895" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold" style={{ color: "#1e293b" }}>{label}</div>
                    <div className="text-[11.5px]" style={{ color: "#94a3b8" }}>{desc}</div>
                  </div>
                  <ChevronRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "#154895", flexShrink: 0 }} />
                </motion.div>
              ))}
            </motion.div>

           
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32, duration: 0.55 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Btn href="/about" icon={ArrowRight}>Learn More About Us</Btn>
              <Btn href="/contact" variant="outline">Get in Touch</Btn>
            </motion.div>
          </motion.div>

        </div>
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