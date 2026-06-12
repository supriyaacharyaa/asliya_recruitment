import { motion } from "framer-motion";

const companies = [
  { name: "Marriott", abbr: "MAR", color: "#8B1A1A" },
  { name: "Hilton", abbr: "HLT", color: "#003580" },
  { name: "Samsung", abbr: "SAM", color: "#1428A0" },
  { name: "Hyatt", abbr: "HYT", color: "#B9975B" },
  { name: "Carrefour", abbr: "CAR", color: "#004A97" },
  { name: "Aramco", abbr: "ARC", color: "#006B3C" },
  { name: "Emirates", abbr: "EMR", color: "#D4001B" },
  { name: "Nestlé", abbr: "NES", color: "#B32533" },
  { name: "Siemens", abbr: "SIE", color: "#009999" },
  { name: "Accor", abbr: "ACC", color: "#C8A96E" },
  { name: "Unilever", abbr: "UNI", color: "#1F36C7" },
  { name: "Bosch", abbr: "BSH", color: "#E20015" },
  { name: "ADNOC", abbr: "ADN", color: "#007DC5" },
  { name: "Jumeirah", abbr: "JUM", color: "#8B7355" },
];

const LogoItem = ({ company }) => (
  <div className="flex-shrink-0 mx-5 group cursor-default select-none">
    <div
      className="flex items-center gap-[10px] px-5 py-3 rounded-[14px] border transition-all duration-350"
      style={{
        background: "rgba(255,255,255,0.7)",
        borderColor: "rgba(21,72,149,0.08)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${company.color}40`;
        e.currentTarget.style.boxShadow = `0 4px 18px ${company.color}18`;
        e.currentTarget.style.background = "rgba(255,255,255,0.95)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = "rgba(255,255,255,0.7)";
      }}
    >
      <div
        className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{ background: `${company.color}14` }}
      >
        <span
          className="text-[11px] font-black tracking-tight"
          style={{ color: company.color }}
        >
          {company.abbr}
        </span>
      </div>

      <span
        className="font-semibold text-[14.5px] whitespace-nowrap tracking-[-0.2px] transition-colors duration-300"
        style={{ color: "#64748b" }}
        onMouseEnter={(e) => {
          e.target.style.color = company.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#64748b";
        }}
      >
        {company.name}
      </span>
    </div>
  </div>
);

const MarqueeTrack = ({ items, reverse = false, speed = 38 }) => (
  <div className="flex overflow-hidden">
    <motion.div
      className="flex"
      animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items, ...items, ...items].map((company, i) => (
        <LogoItem key={`${company.name}-${i}`} company={company} />
      ))}
    </motion.div>
  </div>
);

const StatChip = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center gap-[2px]"
  >
    <span
      className="text-[22px] font-black leading-none"
      style={{ color: "#154895" }}
    >
      {value}
    </span>
    <span
      className="text-[11px] font-semibold uppercase tracking-wider"
      style={{ color: "#94a3b8" }}
    >
      {label}
    </span>
  </motion.div>
);

export default function TrustedCompanies() {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f8faff 0%, #ffffff 60%, #f8faff 100%)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(21,72,149,0.12), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(21,72,149,0.12), transparent)",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(21,72,149,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <div
              className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(21,72,149,0.08)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#154895"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p
                className="text-[13px] font-bold uppercase tracking-[0.12em]"
                style={{ color: "#154895" }}
              >
                Trusted Partners
              </p>
              <p className="text-[12px]" style={{ color: "#94a3b8" }}>
                300+ companies across 28+ countries
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hidden sm:flex items-center gap-8"
          >
            <StatChip value="300+" label="Client Companies" delay={0.12} />
            <div
              className="w-px h-8"
              style={{ background: "rgba(21,72,149,0.1)" }}
            />
            <StatChip value="50K+" label="Staff Placed" delay={0.18} />
            <div
              className="w-px h-8"
              style={{ background: "rgba(21,72,149,0.1)" }}
            />
            <StatChip value="18 yrs" label="Experience" delay={0.24} />
          </motion.div>

          <motion.a
            href="/clients"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.15,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden sm:inline-flex items-center gap-2 text-[12.5px] font-bold px-4 py-2 rounded-[9px] border transition-all duration-200"
            style={{
              color: "#154895",
              borderColor: "rgba(21,72,149,0.22)",
              background: "rgba(21,72,149,0.04)",
            }}
            whileHover={{
              background: "rgba(21,72,149,0.09)",
              borderColor: "rgba(21,72,149,0.4)",
            }}
          >
            View all clients
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </div>

   <div className="relative space-y-4">
  <div
    className="absolute left-0 top-0 bottom-0 w-40 pointer-events-none z-10"
    style={{
      background: "linear-gradient(to right, #f8faff, transparent)",
    }}
  />
  <div
    className="absolute right-0 top-0 bottom-0 w-40 pointer-events-none z-10"
    style={{
      background: "linear-gradient(to left, #f8faff, transparent)",
    }}
  />

  {/* ── TOP ROW (SLOW) ── */}
  <MarqueeTrack
    items={companies}
    reverse={false}
    speed={90}   // ⬅️ MUCH SLOWER
  />

  {/* ── BOTTOM ROW (EVEN SLOWER + smooth offset) ── */}
  <MarqueeTrack
    items={[...companies.slice(5), ...companies.slice(0, 5)]}
    reverse={true}
    speed={110}  // ⬅️ EVEN SLOWER
  />
</div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-10 text-center"
      >
        <p
          className="text-[12px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "#cbd5e1" }}
        >
          From hospitality to oil &amp; gas — we staff every industry
        </p>
      </motion.div>
    </section>
  );
}
