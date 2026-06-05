import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Users, Globe, Briefcase, CheckCircle } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const FloatingCard = ({ icon: Icon, title, value, color, delay, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl px-4 py-3 shadow-2xl shadow-blue-900/10 flex items-center gap-3 min-w-[160px] ${className}`}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={16} className="text-white" />
    </div>
    <div>
      <div className="text-xs text-gray-400 font-medium">{title}</div>
      <div className="text-sm font-bold text-gray-800">{value}</div>
    </div>
  </motion.div>
);

const words = ["Exceptional", "Verified", "Elite"];

export default function HeroSection() {
  const wordRef = useRef(null);
  const wordIndex = useRef(0);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    el.textContent = words[0];
    const interval = setInterval(() => {
      wordIndex.current = (wordIndex.current + 1) % words.length;
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
      setTimeout(() => {
        el.textContent = words[wordIndex.current];
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8f9fc]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-gradient-to-br from-[#154895]/12 via-[#154895]/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#e62224]/8 via-[#e62224]/4 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-[#154895]/8 to-transparent rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#154895 1px, transparent 1px), linear-gradient(90deg, #154895 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Container className="relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#154895]/8 border border-[#154895]/15 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-[#e62224] rounded-full animate-pulse" />
              <span className="text-[#154895] text-sm font-semibold tracking-wide">
                Trusted Recruitment Partner Since 2014
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl xl:text-6xl font-black text-gray-900 leading-[1.08] tracking-tight mb-6"
            >
              Connecting{" "}
              <span
                ref={wordRef}
                className="text-[#154895] inline-block transition-all duration-300"
                style={{ transition: "opacity 0.3s, transform 0.3s" }}
              />{" "}
              Talent With Leading{" "}
              <span className="relative">
                Employers
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 10" fill="none">
                  <path d="M2 8 Q75 2 150 6 Q225 10 298 4" stroke="#e62224" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              Worldwide
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg"
            >
              We provide reliable domestic, overseas, and mass recruitment solutions for businesses across multiple industries — connecting the right people to the right opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Hire Talent
              </Button>
              <Button variant="outline" size="lg">
                Find Jobs
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              {["ISO Certified", "5000+ Placements", "Global Network"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle size={15} className="text-[#154895]" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Visual */}
          <div className="relative h-[520px] hidden lg:block">
            {/* Central illustration card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-8 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-3xl overflow-hidden shadow-2xl shadow-[#154895]/30"
            >
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 70%, #e62224 0%, transparent 50%), radial-gradient(circle at 70% 30%, #4a7fd4 0%, transparent 50%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-white/15 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Users size={36} className="text-white" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">Global Talent Network</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                  Connecting skilled professionals with leading companies across 30+ countries
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 w-full">
                  {[
                    { label: "Placed", value: "5000+" },
                    { label: "Clients", value: "300+" },
                    { label: "Countries", value: "30+" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                      <div className="text-white font-bold text-lg">{s.value}</div>
                      <div className="text-white/50 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating cards */}
            <FloatingCard
              icon={Briefcase}
              title="Active Jobs"
              value="1,240 Open"
              color="bg-[#154895]"
              delay={0.7}
              className="-left-6 top-16"
            />
            <FloatingCard
              icon={Users}
              title="New Hires"
              value="48 This Week"
              color="bg-[#e62224]"
              delay={0.85}
              className="-right-6 top-1/3"
            />
            <FloatingCard
              icon={Globe}
              title="Coverage"
              value="30+ Countries"
              color="bg-emerald-500"
              delay={1.0}
              className="-left-6 bottom-24"
            />

            {/* Decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-24 h-24 border-2 border-dashed border-[#154895]/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-dashed border-[#e62224]/20 rounded-full"
            />
          </div>
        </div>
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
