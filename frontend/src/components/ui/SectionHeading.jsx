import { motion } from "framer-motion";

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "flex flex-col gap-3",
        isCenter ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left",
        className,
      ].join(" ")}
    >
      {/* {tag && (
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9902a] flex-shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#154895]">
            {tag}
          </span>
        </div>
      )} */}
        <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center justify-center gap-2 mb-6 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
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
             {tag}
            </motion.div>

      <h2 className="text-4xl xl:text-5xl font-black text-[#0f1e3c] leading-[1.13]">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[#5a6a8a] text-[15.5px] font-light leading-[1.7] max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}