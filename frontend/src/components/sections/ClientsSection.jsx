import { motion } from "framer-motion";
import { Shield, Award, ThumbsUp, Globe, Building2 } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";


const TRUST_BADGES = [
  { icon: Shield,   label: "100% Verified Partners"    },
  { icon: Award,    label: "Ministry Approved Supply"  }, 
  { icon: ThumbsUp, label: "98% Client Retention Rate"  },
  { icon: Globe,    label: "28+ Source Countries"      }, 
];

const ACCENT_COLORS = [
  "#154895", "#1e5cbf", "#c9902a", "#1a7a5c",
  "#6b2f9e", "#2271b3", "#c0392b", "#0e9b7a",
];

export default function ClientsSection({ clients = [] }) {
  return (
    <section className="relative py-16 md:py-24 lg:py-28 bg-[#f3f5fb] overflow-hidden">

   
      <div className="pointer-events-none absolute -top-36 -right-36 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(21,72,149,0.05)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[250px] h-[250px] md:w-[380px] md:h-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,144,42,0.06)_0%,transparent_70%)]" />

      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">

      
        <SectionHeading
          tag="Our Clients"
          title={
            <>
              Trusted by{" "}
              <span className="text-[#154895]">Industry Leaders</span>
            </>
          }
          subtitle="We are proud to partner with some of the most respected organizations across the region — placing the right talent, every time."
        />

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-4 max-w-[200px] mx-auto mt-6 mb-10"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#154895]/25 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary flex-shrink-0" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#154895]/25 to-transparent" />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(13,43,110,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 bg-white border border-[#154895]/10 rounded-full px-3.5 py-2 shadow-sm cursor-default"
            >
              <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-[#154895] to-[#0d3270] flex items-center justify-center flex-shrink-0">
                <Icon size={11} strokeWidth={2.5} className="text-white" />
              </div>
              <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-[#0f1e3c] whitespace-nowrap">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Client logo grid (Perfect responsive spacing) */}
        {clients.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4">
            {clients.map((client, i) => (
              <ClientCard key={client.name || i} client={client} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">No client data available.</div>
        )}

        {/* Footer note - Corrected Timeline to 2018 & Placements to 300+ Clients */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-white border border-[#154895]/10 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 shadow-sm text-[12px] sm:text-[13px] text-[#5a6a8a] flex-wrap justify-center text-center max-w-[640px] sm:max-w-none">
            <Building2 size={14} strokeWidth={1.8} className="text-[#154895] flex-shrink-0" />
            <span className="leading-relaxed">
              And <strong className="text-[#154895] font-bold">300+ corporate clients</strong> across multiple strategic sectors in Qatar
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-brand-secondary flex-shrink-0" />
            <span className="w-full sm:w-auto mt-1 sm:mt-0">
              Established in <strong className="text-[#154895] font-bold">Doha, Since 2018</strong>
            </span>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}

// Optimized ClientCard component
function ClientCard({ client, index }) {
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const gradientColor = client.color || "linear-gradient(135deg, #154895, #0d3270)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative bg-white border border-[#154895]/8 rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center gap-3 cursor-default overflow-hidden min-h-[130px] w-full shadow-[0_1px_3px_rgba(13,43,110,0.03)] hover:shadow-[0_10px_28px_rgba(13,43,110,0.1)] hover:border-[#154895]/15 transition-all duration-300"
    >
      {/* Top accent bar - reveals on hover */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: accentColor }}
      />

      {/* Logo abbreviation wrapper */}
  {/* <div className="relative flex-shrink-0">
  <motion.div
  className="w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] flex items-center justify-center text-white text-[12px] sm:text-[13px] font-black tracking-wide shadow-md overflow-hidden"
    // style={{ background: gradientColor }}
    whileHover={{ scale: 1.08, rotate: -3 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
  >
    {client.logo ? (
      <img
        src={client.logo}
        alt={client.name || client.abbr}
        className="w-full h-full object-contain p-1.5"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          e.currentTarget.nextSibling.style.display = "flex";
        }}
      />
    ) : null}
    <span
      style={{ display: client.logo ? "none" : "flex" }}
      className="w-full h-full items-center justify-center"
    >
      {client.abbr || "CORP"}
    </span>
  </motion.div>
</div> */}
<motion.div
  className="flex-shrink-0"
  whileHover={{ scale: 1.08 }}
  transition={{ type: "spring", stiffness: 400, damping: 15 }}
>
  {client.logo ? (
    <img
      src={client.logo}
      alt={client.name || client.abbr}
      className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
      onError={(e) => {
        e.currentTarget.style.display = "none";
        e.currentTarget.nextSibling.style.display = "flex";
      }}
    />
  ) : (
    <span className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 font-black text-[12px] sm:text-[13px]">
      {client.abbr || "CORP"}
    </span>
  )}
</motion.div>

      {/* Company Name & Tag details */}
      <div className="text-center w-full min-w-0 flex flex-col items-center gap-0.5">
        <span className="text-[11px] sm:text-[12px] font-bold text-[#334266] group-hover:text-[#154895] transition-colors duration-200 line-clamp-2 leading-[1.3] w-full px-1">
          {client.name || "Unnamed Client"}
        </span>

        {client.industry && (
          <span className="text-[9px] font-medium tracking-wider uppercase text-gray-400 block truncate max-w-full mt-0.5">
            {client.industry}
          </span>
        )}
      </div>
    </motion.div>
  );
}