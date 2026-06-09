import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

// Stagger container
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function IndustriesSection({ industries = [] }) {
  return (
    <section className="relative py-28 bg-white overflow-hidden">

      {/* Faint background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top-right ambient glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(21,72,149,0.06)_0%,transparent_70%)]" />

      <Container className="relative z-10">

        <SectionHeading
          tag="Industries"
          title={<>Industries We <span className="text-[#154895]">Serve</span></>}
          subtitle="Deep specialisation across the sectors that power the global economy — connecting the right people with the right opportunity."
        />

        {/* ── Stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-0 mt-10 mb-16"
        >
          <div className="inline-flex flex-wrap justify-center border border-[#154895]/10 rounded-2xl overflow-hidden bg-[#f3f5fb]">
            {[
              { value: "15+", label: "Industries Covered" },
              { value: "20K+", label: "Placements Made" },
              { value: "28+", label: "Countries Reached" },
            ].map(({ value, label }, i, arr) => (
              <div
                key={label}
                className={[
                  "flex flex-col items-center px-8 py-4",
                  i < arr.length - 1 ? "border-r border-[#154895]/10" : "",
                ].join(" ")}
              >
                <span className="text-[22px] font-black text-[#154895] leading-none mb-0.5">{value}</span>
                <span className="text-[11px] uppercase tracking-[0.1em] text-[#5a6a8a] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Industry cards grid ── */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <IndustryCard key={industry.name} industry={industry} Icon={Icon} />
            );
          })}
        </motion.div>

      </Container>
    </section>
  );
}

// ── Single card ──────────────────────────────────────────────────────────────
function IndustryCard({ industry, Icon }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -7, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative bg-white border border-[#154895]/10 rounded-2xl p-6 overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(13,43,110,0.05)] hover:shadow-[0_16px_48px_rgba(13,43,110,0.13)] hover:border-[#154895]/22 transition-shadow transition-[border-color] duration-300"
    >

      {/* Hover bg wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#154895]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Top accent bar */}
      <span className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#154895] to-[#1e5cbf] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Corner arrow */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
        <div className="w-7 h-7 rounded-full bg-[#154895]/8 flex items-center justify-center">
          <ArrowUpRight size={13} className="text-[#154895]" />
        </div>
      </div>

      <div className="relative z-10">

        {/* Icon box */}
        <motion.div
          className="w-13 h-13 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-xl flex items-center justify-center mb-5 shadow-[0_6px_18px_rgba(13,43,110,0.22)]"
          style={{ width: 52, height: 52 }}
          whileHover={{ scale: 1.12, rotate: -5 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
        >
          <Icon size={22} className="text-white" strokeWidth={1.8} />
        </motion.div>

        {/* Name */}
        <h3 className="text-[15px] font-bold text-[#0f1e3c] mb-2 group-hover:text-[#154895] transition-colors duration-250 leading-snug">
          {industry.name}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-[#8a96ad] leading-[1.65] mb-4">
          {industry.description}
        </p>

        {/* Role pills */}
        {industry.roles?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {industry.roles.slice(0, 2).map((role) => (
              <span
                key={role}
                className="text-[11px] font-semibold bg-[#154895]/7 text-[#154895] px-2.5 py-[5px] rounded-full tracking-[0.01em] group-hover:bg-[#154895]/12 transition-colors duration-250"
              >
                {role}
              </span>
            ))}
            {industry.roles.length > 2 && (
              <span className="text-[11px] font-semibold text-[#b0b8cc] px-2 py-[5px]">
                +{industry.roles.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom-right glow blob */}
      <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#154895]/6 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}