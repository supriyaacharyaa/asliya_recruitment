import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardList, Search, UserCheck,
  MessageSquare, CheckSquare, HeartHandshake,
  ArrowRight, Clock, BadgeCheck, UserCog,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Requirement Analysis",
    description: "In-depth consultation to understand job roles, skills, culture fit, and timelines.",
    color: "#154895",
  },
  {
    icon: Search,
    step: "02",
    title: "Candidate Sourcing",
    description: "Leveraging our vast database and active global networks to identify best-matched candidates.",
    color: "#1a5ab8",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Screening & Vetting",
    description: "Rigorous background checks, skills assessments, and reference verification for every shortlist.",
    color: "#1e5cbf",
  },
  {
    icon: MessageSquare,
    step: "04",
    title: "Structured Interviews",
    description: "We coordinate and facilitate structured interview rounds between clients and top candidates.",
    color: "#1565c0",
  },
  {
    icon: CheckSquare,
    step: "05",
    title: "Placement",
    description: "Seamless onboarding including documentation, visa processing, and relocation assistance.",
    color: "#0f4fa3",
  },
  {
    icon: HeartHandshake,
    step: "06",
    title: "Follow-Up",
    description: "Post-placement monitoring to ensure long-term success for both employers and employees.",
    color: "#0d3f8f",
  },
];

const GUARANTEES = [
  { icon: Clock,     text: "7–14 day avg. time-to-fill" },
  { icon: BadgeCheck, text: "Replacement guarantee"      },
  { icon: UserCog,   text: "Dedicated account manager"   },
];

// Animation variants
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function RecruitmentProcessSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-28 bg-[#f3f5fb] overflow-hidden">

      {/* Background dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient glow top-left */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(21,72,149,0.07)_0%,transparent_70%)]" />
      {/* Ambient glow bottom-right */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(201,144,42,0.07)_0%,transparent_70%)]" />

      <Container className="relative z-10">

        {/* ── Heading ── */}
       
        <SectionHeading
          tag="How We Work"
          title={<>Our Recruitment <span className="text-[#154895]">Process</span></>}
          subtitle="A proven, transparent 6-step process engineered for speed, quality, and lasting results — from first brief to successful placement."
        />

        {/* ── Process steps ── */}
        <div className="relative mt-20">

          {/* Scroll-driven connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-px overflow-hidden">
            <div className="absolute inset-0 bg-[#154895]/10" />
            <motion.div
              style={{ scaleX: lineScaleX }}
              className="absolute inset-0 bg-gradient-to-r from-[#154895]/0 via-[#154895]/50 to-[#154895]/0 origin-left"
            />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-3"
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === STEPS.length - 1;
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon circle */}
                  <div className="relative mb-5">
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="w-[88px] h-[88px] bg-white rounded-[20px] border border-[#154895]/12 shadow-[0_4px_18px_rgba(13,43,110,0.08)] flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[#154895]/30 group-hover:shadow-[0_10px_32px_rgba(13,43,110,0.16)] transition-shadow transition-[border-color] duration-300"
                    >
                      {/* Fill wash on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350"
                        style={{ background: `linear-gradient(135deg, ${step.color}, #0d3270)` }}
                      />
                      {/* Top accent bar */}
                      <span
                        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: step.color }}
                      />
                      <Icon
                        size={22}
                        strokeWidth={1.8}
                        className="text-[#154895] group-hover:text-white relative z-10 transition-colors duration-300 mb-1"
                      />
                      <span className="text-[10px] font-black text-[#c0c8d8] group-hover:text-white/60 relative z-10 transition-colors duration-300 tracking-wider">
                        {step.step}
                      </span>
                    </motion.div>

                    {/* Connector arrow dot (not on last) */}
                    {!isLast && (
                      <div className="hidden lg:flex absolute -right-[7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#154895]/25 items-center justify-center z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#154895]/40" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-[13px] font-bold text-[#0f1e3c] mb-1.5 group-hover:text-[#154895] transition-colors duration-250 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[11.5px] text-[#8a96ad] leading-[1.6]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Bottom guarantee strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
        >
          <div className="bg-white border border-[#154895]/10 rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(13,43,110,0.06)]">

            {/* Top accent */}
            <div className="h-[3px] bg-gradient-to-r from-[#154895] via-[#1e5cbf] to-[#0d3270]" />

            <div className="px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-6">

              {/* Left label */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#154895]/8 flex items-center justify-center flex-shrink-0">
                  <Clock size={17} strokeWidth={1.8} className="text-[#154895]" />
                </div>
                <div>
                  <p className="text-[12px] text-[#8a96ad] uppercase tracking-[0.1em] font-medium mb-0.5">Average time-to-fill</p>
                  <p className="text-[20px] font-black text-[#154895] leading-none">7–14 <span className="text-[14px] font-semibold text-[#5a6a8a]">business days</span></p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-[#154895]/10" />

              {/* Guarantees */}
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                {GUARANTEES.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#154895]/8 flex items-center justify-center flex-shrink-0">
                      <Icon size={12} strokeWidth={2} className="text-[#154895]" />
                    </div>
                    <span className="text-[12.5px] font-medium text-[#5a6a8a]">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div className="hidden md:block w-px h-12 bg-[#154895]/10" />
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 bg-[#154895] text-white text-[13px] font-bold px-6 py-3 rounded-xl shadow-[0_4px_16px_rgba(21,72,149,0.28)] hover:shadow-[0_8px_24px_rgba(21,72,149,0.38)] transition-shadow duration-300 flex-shrink-0"
              >
                Start Hiring
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}