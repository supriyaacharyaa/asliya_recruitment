import { motion } from "framer-motion";
import Container from "../ui/Container";

const companies = [
  { name: "Marriott", abbr: "MAR" },
  { name: "Hilton", abbr: "HLT" },
  { name: "Samsung", abbr: "SAM" },
  { name: "Hyatt", abbr: "HYT" },
  { name: "Carrefour", abbr: "CAR" },
  { name: "Aramco", abbr: "ARC" },
  { name: "Emirates", abbr: "EMR" },
  { name: "Nestlé", abbr: "NES" },
  { name: "Siemens", abbr: "SIE" },
  { name: "Accor", abbr: "ACC" },
  { name: "Unilever", abbr: "UNI" },
  { name: "Bosch", abbr: "BSH" },
];

const LogoItem = ({ company }) => (
  <div className="flex-shrink-0 mx-8 group cursor-default">
    <div className="flex items-center gap-3 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#154895] to-[#0d3270] flex items-center justify-center shadow-sm group-hover:shadow-[#154895]/30 group-hover:shadow-md transition-shadow duration-300">
        <span className="text-white text-xs font-black tracking-tight">{company.abbr}</span>
      </div>
      <span className="text-gray-600 font-semibold text-lg tracking-tight whitespace-nowrap group-hover:text-[#154895] transition-colors duration-300">
        {company.name}
      </span>
    </div>
  </div>
);

const MarqueeTrack = ({ items, reverse = false }) => (
  <div className="flex overflow-hidden">
    <motion.div
      className="flex"
      animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items, ...items, ...items].map((company, i) => (
        <LogoItem key={`${company.name}-${i}`} company={company} />
      ))}
    </motion.div>
  </div>
);

export default function TrustedCompanies() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <Container className="mb-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest"
        >
          Trusted by 300+ leading companies worldwide
        </motion.p>
      </Container>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <MarqueeTrack items={companies} />
      </div>
    </section>
  );
}
