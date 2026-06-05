import { motion } from "framer-motion";

export default function SectionHeading({ tag, title, subtitle, align = "center", className = "" }) {
  const alignClass = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-3 max-w-2xl ${align === "center" ? "mx-auto" : ""} ${alignClass} ${className}`}
    >
      {tag && (
        <span className="text-sm font-semibold text-[#e62224] uppercase tracking-widest">
          {tag}
        </span>
      )}
      <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-lg leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
