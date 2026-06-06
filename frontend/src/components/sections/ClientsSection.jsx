import { motion } from "framer-motion";
import { Shield, Award, ThumbsUp, Globe, Building2 } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const TRUST_BADGES = [
  { icon: Shield,   label: "100% Verified Partners"    },
  { icon: Award,    label: "Award-Winning Service"      },
  { icon: ThumbsUp, label: "97% Client Retention Rate"  },
  { icon: Globe,    label: "15+ Industries Worldwide"   },
];

const ACCENT_COLORS = [
  "#154895","#1e5cbf","#c9902a","#1a7a5c",
  "#6b2f9e","#2271b3","#c0392b","#0e9b7a",
];

export default function ClientsSection({ clients = [] }) {
  return (
    <section className="relative py-28 bg-[#f3f5fb] overflow-hidden">

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(21,72,149,0.07)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,144,42,0.09)_0%,transparent_70%)]" />

      <Container className="relative z-10">

        {/* Section heading */}
        <SectionHeading
          tag="Our Clients"
          title={
            <>
              Trusted by{" "}
              <span className="text-[#154895]">Industry Leaders</span>
            </>
          }
          subtitle="We are proud to partner with some of the most respected organisations across the globe — placing the right talent, every time."
        />

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 max-w-[240px] mx-auto mt-8 mb-12"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#154895]/25 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9902a] flex-shrink-0" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#154895]/25 to-transparent" />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(13,43,110,0.13)" }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="flex items-center gap-2.5 bg-white border border-[#154895]/10 rounded-full px-4 py-2.5 shadow-sm cursor-default"
            >
              <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[#154895] to-[#0d3270] flex items-center justify-center flex-shrink-0">
                <Icon size={12} strokeWidth={2.3} className="text-white" />
              </div>
              <span className="text-[12.5px] font-semibold text-[#0f1e3c] whitespace-nowrap">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Client logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
          {clients.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex justify-center mt-12"
        >
          <div className="inline-flex items-center gap-2.5 bg-white border border-[#154895]/10 rounded-full px-5 py-3 shadow-sm text-[12.5px] text-[#5a6a8a] flex-wrap justify-center text-center">
            <Building2 size={14} strokeWidth={1.8} className="text-[#154895] flex-shrink-0" />
            <span>
              And{" "}
              <strong className="text-[#154895] font-semibold">270+ more companies</strong>{" "}
              across{" "}
              <strong className="text-[#154895] font-semibold">15+ industries</strong>{" "}
              worldwide
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c9902a] flex-shrink-0" />
            <span>
              <strong className="text-[#154895] font-semibold">Since 2008</strong>
            </span>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}

// ClientCard component
function ClientCard({ client, index }) {
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const gradientColor = client.color || "linear-gradient(135deg,#154895,#0d3270)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white border border-[#154895]/10 rounded-2xl p-6 flex flex-col items-center gap-2.5 cursor-default overflow-hidden shadow-[0_1px_4px_rgba(13,43,110,0.05)] hover:shadow-[0_12px_36px_rgba(13,43,110,0.12)] hover:border-[#154895]/20 transition-shadow transition-[border-color] duration-300"
    >
      {/* Top accent bar - reveals on hover */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: accentColor }}
      />

      {/* Logo abbreviation */}
      <motion.div
        className="w-12 h-12 rounded-[13px] flex items-center justify-center text-white text-[13px] font-black tracking-wide shadow-[0_5px_16px_rgba(0,0,0,0.2)] flex-shrink-0"
        style={{ background: gradientColor }}
        whileHover={{ scale: 1.14, rotate: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {client.abbr}
      </motion.div>

      {/* Company name */}
      <span className="text-[11.5px] font-semibold text-[#334266] group-hover:text-[#154895] transition-colors duration-[250ms] text-center leading-[1.38]">
        {client.name}
      </span>

      {/* Industry tag */}
      {client.industry && (
        <span className="text-[9.5px] font-normal tracking-[0.11em] uppercase text-[#b0b8cc]">
          {client.industry}
        </span>
      )}
    </motion.div>
  );
}