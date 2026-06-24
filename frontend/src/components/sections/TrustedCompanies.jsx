// import { motion } from "framer-motion";

// // ─── Real Brand Partners Vetted Datasets ───────────────────────────────────
// import { clientsData as companies } from "../../mockData";

// const LogoItem = ({ company }) => (
//   <div className="flex-shrink-0 px-3 py-2 group cursor-default select-none">
//     <div 
//       className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#154895]/8 bg-white/70 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:scale-[1.02]"
//       style={{
//         // Tailwind provides standard transitions, dynamically maps brand border & custom glow on group hover
//         "--hover-border": `${company.color}35`,
//         "--hover-shadow": `0 10px 25px -5px ${company.color}15`
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.borderColor = "var(--hover-border)";
//         e.currentTarget.style.boxShadow = "var(--hover-shadow)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
//         e.currentTarget.style.boxShadow = "none";
//       }}
//     >
//       {/* Abbreviation Round Badge Box */}
//       <div 
//         className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-95"
//         style={{ background: `${company.color}12` }}
//       >
//         <span 
//           className="text-[10px] font-black tracking-tight"
//           style={{ color: company.color }}
//         >
//           {company.abbr}
//         </span>
//       </div>

//       {/* Brand Text Content */}
//       <span 
//         className="font-medium text-[13.5px] whitespace-nowrap tracking-tight text-gray-500 transition-colors duration-300"
//         style={{ "--brand-color": company.color }}
//         onMouseEnter={(e) => e.target.style.color = "var(--brand-color)"}
//         onMouseLeave={(e) => e.target.style.color = "#6b7280"}
//       >
//         {company.name}
//       </span>
//     </div>
//   </div>
// );

// const MarqueeTrack = ({ items, reverse = false, speed = 35 }) => {
//   // Merging two vectors is mathematically sufficient to fulfill loop logic continuity
//   const doubledItems = [...items, ...items];
  
//   return (
//     <div className="flex overflow-hidden w-full select-none mask-gradient">
//       <motion.div
//         className="flex flex-nowrap whitespace-nowrap min-w-full"
//         animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
//         transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
//       >
//         {doubledItems.map((company, i) => (
//           <LogoItem key={`${company.name}-${reverse}-${i}`} company={company} />
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// const StatChip = ({ value, label, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 12 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//     className="flex flex-col items-center sm:items-start md:items-center gap-0.5"
//   >
//     <span className="text-[20px] font-serif font-black leading-none text-[#154895]">
//       {value}
//     </span>
//     <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//       {label}
//     </span>
//   </motion.div>
// );

// export default function TrustedCompanies() {
//   return (
//     <section className="relative py-14 overflow-hidden bg-gradient-to-b from-[#f8faff] via-white to-[#f8faff]">
//       {/* Structural Minimal Board Lines */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#154895]/12 to-transparent" />
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#154895]/12 to-transparent" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full pointer-events-none bg-[radial-gradient(ellipse,rgba(21,72,149,0.04)_0%,transparent_70%)] blur-[40px]" />

//       <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
//           {/* Left Block Header Identity */}
//           <motion.div
//             initial={{ opacity: 0, x: -16 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//             className="flex items-center gap-3 text-center sm:text-left"
//           >
//             <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#154895]/8 text-[#154895]">
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#154895]">
//                 Trusted Partners
//               </h3>
//               <p className="text-[11.5px] text-gray-400">
//                 Corporate clients deployment network across Qatar
//               </p>
//             </div>
//           </motion.div>

//           {/* Center Real Stats Core Columns */}
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1, duration: 0.5 }}
//             className="hidden sm:flex items-center gap-6 lg:gap-8 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-2xl border border-gray-100"
//           >
//             <StatChip value="300+" label="Enterprise Clients" delay={0.12} />
//             <span className="w-px h-6 bg-[#154895]/10" />
//             <StatChip value="20K+" label="Staff Deployed" delay={0.16} />
//             <span className="w-px h-6 bg-[#154895]/10" />
//             <StatChip value="7+ Yrs" label="Qatar Leadership" delay={0.2} />
//           </motion.div>

//           {/* Right Action Button */}
//           <motion.a
//             href="/contact"
//             initial={{ opacity: 0, x: 16 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//             className="hidden sm:inline-flex items-center gap-2 text-[12px] font-bold px-4 py-2 rounded-xl border border-[#154895]/20 bg-[#154895]/4 text-[#154895] hover:bg-[#154895]/8 hover:border-[#154895]/40 transition-all duration-200"
//           >
//             Partner With Us
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//             >
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </motion.a>
//         </div>
//       </div>

//       {/* Infinite Horizontal Rolling Tracks */}
//       <div className="relative space-y-3.5">
//         {/* Ambient Blur Edge Faders (Prevents raw cuts on viewport edges) */}
//         <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10 bg-gradient-to-r from-[#f8faff] via-[#f8faff]/50 to-transparent" />
//         <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10 bg-gradient-to-l from-[#f8faff] via-[#f8faff]/50 to-transparent" />

//         {/* Track 1: Forward Motion */}
//         <MarqueeTrack items={companies} reverse={false} speed={36} />

//         {/* Track 2: Reverse Motion & Offset Start */}
//         <MarqueeTrack
//           items={[...companies.slice(6), ...companies.slice(0, 6)]}
//           reverse={true}
//           speed={42}
//         />
//       </div>

//       {/* Footer Industry Notice Label */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//         className="mt-9 text-center"
//       >
//         <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-300">
//           From Hospitality &amp; Retail to Oil &amp; Gas Contracting
//         </p>
//       </motion.div>
//     </section>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";

// ─── Real Brand Partners Vetted Datasets ───────────────────────────────────
import { clientsData as companies } from "../../mockData";

// const LogoItem = ({ company }) => {
//   const [imgError, setImgError] = useState(false);
//   const showLogo = company.logo && !imgError;

//   return (
//     <div className="flex-shrink-0 px-3 py-2 group cursor-default select-none">
//       <div 
//         className="flex items-center gap-2 px-2 py-2 rounded-xl border border-[#154895]/8 bg-white/70 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:scale-[1.02]"
//         style={{
//           // Tailwind provides standard transitions, dynamically maps brand border & custom glow on group hover
//           "--hover-border": `${company.color}35`,
//           "--hover-shadow": `0 10px 25px -5px ${company.color}15`
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.borderColor = "var(--hover-border)";
//           e.currentTarget.style.boxShadow = "var(--hover-shadow)";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
//           e.currentTarget.style.boxShadow = "none";
//         }}
//       >
//         {/* Logo / Abbreviation Badge Box */}
//         <div 
// className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-95"
//           style={{ background: showLogo ? "transparent" : `${company.color}12` }}
//         >
//           {showLogo ? (
//             <img
//               src={company.logo}
//               alt={company.name}
//               className="w-full h-full object-contain p-1"
//               onError={() => setImgError(true)}
//             />
//           ) : (
//             <span 
//               className="text-[10px] font-black tracking-tight"
//               style={{ color: company.color }}
//             >
//               {company.abbr}
//             </span>
//           )}
//         </div>

//         {/* Brand Text Content */}
//         <span 
//           className="font-medium text-[13.5px] whitespace-nowrap tracking-tight text-gray-500 transition-colors duration-300"
//           style={{ "--brand-color": company.color }}
//           onMouseEnter={(e) => e.target.style.color = "var(--brand-color)"}
//           onMouseLeave={(e) => e.target.style.color = "#6b7280"}
//         >
//           {company.name}
//         </span>
//       </div>
//     </div>
//   );
// };




const LogoItem = ({ company }) => {
  const [imgError, setImgError] = useState(false);
  const showLogo = company.logo && !imgError;

  return (
    <div className="flex-shrink-0 px-3 py-3 group cursor-default select-none">
      <div
        className="flex flex-col items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-[#154895]/10 bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
        style={{ minWidth: "110px" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${company.color}50`;
          e.currentTarget.style.boxShadow = `0 16px 40px -8px ${company.color}30`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(21,72,149,0.10)";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
        }}
      >
        {/* Logo / Abbr Badge */}
        <div
          className="w-28 h-28 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ background: showLogo ? `${company.color}08` : `${company.color}15` }}
        >
          {showLogo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain p-1.5"
              onError={() => setImgError(true)}
            />
          ) : (
            <span
              className="text-[18px] font-black tracking-tight"
              style={{ color: company.color }}
            >
              {company.abbr}
            </span>
          )}
        </div>

        {/* Company Name */}
        <span
          className="text-[11.5px] font-semibold text-center whitespace-nowrap tracking-tight text-gray-500 transition-colors duration-300 group-hover:text-gray-800"
        >
          {/* {company.name} */}
        </span>
      </div>
    </div>
  );
};

const MarqueeTrack = ({ items, reverse = false, speed = 35 }) => {

  const doubledItems = [...items, ...items];
  
  return (
    <div className="flex overflow-hidden w-full select-none mask-gradient">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap min-w-full"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubledItems.map((company, i) => (
          <LogoItem key={`${company.name}-${reverse}-${i}`} company={company} />
        ))}
      </motion.div>
    </div>
  );
};

const StatChip = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center sm:items-start md:items-center gap-0.5"
  >
    <span className="text-[20px] font-serif font-black leading-none text-[#154895]">
      {value}
    </span>
    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
      {label}
    </span>
  </motion.div>
);

export default function TrustedCompanies() {
  return (
    <section className="relative py-14 overflow-hidden bg-gradient-to-b from-[#f8faff] via-white to-[#f8faff]">
  
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#154895]/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#154895]/12 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full pointer-events-none bg-[radial-gradient(ellipse,rgba(21,72,149,0.04)_0%,transparent_70%)] blur-[40px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
        
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-center sm:text-left"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#154895]/8 text-[#154895]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#154895]">
                Trusted Partners
              </h3>
              <p className="text-[11.5px] text-gray-400">
                Corporate clients deployment network across Qatar
              </p>
            </div>
          </motion.div>

          {/* Center Real Stats Core Columns */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hidden sm:flex items-center gap-6 lg:gap-8 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-2xl border border-gray-100"
          >
            <StatChip value="300+" label="Enterprise Clients" delay={0.12} />
            <span className="w-px h-6 bg-[#154895]/10" />
            <StatChip value="20K+" label="Staff Deployed" delay={0.16} />
            <span className="w-px h-6 bg-[#154895]/10" />
            <StatChip value="7+ Yrs" label="Qatar Leadership" delay={0.2} />
          </motion.div>

          {/* Right Action Button */}
          <motion.a
            href="/contact"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:inline-flex items-center gap-2 text-[12px] font-bold px-4 py-2 rounded-xl border border-[#154895]/20 bg-[#154895]/4 text-[#154895] hover:bg-[#154895]/8 hover:border-[#154895]/40 transition-all duration-200"
          >
            Partner With Us
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

  
      <div className="relative space-y-3.5">
      
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10 bg-gradient-to-r from-[#f8faff] via-[#f8faff]/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10 bg-gradient-to-l from-[#f8faff] via-[#f8faff]/50 to-transparent" />

        {/* Track 1: Forward Motion */}
        <MarqueeTrack items={companies} reverse={false} speed={36} />

    
        <MarqueeTrack
          items={[...companies.slice(6), ...companies.slice(0, 6)]}
          reverse={true}
          speed={42}
        />
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-9 text-center"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-300">
          From Hospitality &amp; Retail to Oil &amp; Gas Contracting
        </p>
      </motion.div>
    </section>
  );
}