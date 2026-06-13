// import { motion, useInView } from "framer-motion";
// import { useRef, useState } from "react";
// import {
//   Building2,
//   Globe,
//   Users,
//   Megaphone,
//   Search,
//   Clock,
//   ArrowUpRight,
//   CheckCircle2,
//   ChevronRight,
//   TrendingUp,
//   Award,
//   MapPin,
//   Briefcase,
//   HardHat,
//   Hotel,
//   Stethoscope,
//   ShieldCheck,
//   Truck,
//   ShoppingBag,
//   Home,
//   Wrench,
// } from "lucide-react";

// // ─── Data ────────────────────────────────────────────────────────────────────

// const stats = [
//   { value: "7+", label: "Years in Operation", icon: Award },
//   { value: "20K+", label: "Candidates Placed", icon: Users },
//   { value: "28+", label: "Countries Covered", icon: MapPin },
//   { value: "98%", label: "Client Retention", icon: TrendingUp },
// ];

// const services = [
//   {
//     id: "01",
//     icon: Building2,
//     title: "Domestic Recruitment",
//     tagline: "Local talent, global standards",
//     description:
//       "End-to-end hiring solutions for businesses seeking top local talent. We handle sourcing, psychometric screening, background verification, and final placement — all within your country.",
//     features: [
//       "Dedicated account manager",
//       "72-hour shortlist delivery",
//       "90-day replacement guarantee",
//     ],
//     accent: "#154895",
//     accentLight: "rgba(21,72,149,0.08)",
//     gradient: "from-[#154895] to-[#1e5bb8]",
//   },
//   {
//     id: "02",
//     icon: Globe,
//     title: "Overseas Recruitment",
//     tagline: "Bridging talent across borders",
//     description:
//       "Skilled international manpower deployment backed by full documentation, medical fitness testing, visa processing, and pre-departure orientation programs.",
//     features: [
//       "PDOS & visa assistance",
//       "Medical & documentation handling",
//       "Airport deployment support",
//     ],
//     accent: "#e62224",
//     accentLight: "rgba(230,34,36,0.08)",
//     gradient: "from-[#e62224] to-[#c01a1c]",
//   },
//   {
//     id: "03",
//     icon: Users,
//     title: "Local Staffing",
//     tagline: "Right people, right now",
//     description:
//       "Flexible workforce solutions for businesses that need reliable staff at short or long-term notice. We maintain a pre-vetted talent pool for rapid deployment across all major industries.",
//     features: [
//       "Pre-vetted talent pool",
//       "48-hour deployment capability",
//       "Flexible contract terms",
//     ],
//     accent: "#2563eb",
//     accentLight: "rgba(37,99,235,0.08)",
//     gradient: "from-[#2563eb] to-[#154895]",
//   },
//   {
//     id: "04",
//     icon: Megaphone,
//     title: "Mass Recruitment",
//     tagline: "Scale fast, hire smart",
//     description:
//       "Large-scale hiring campaigns managed with military precision — from 50 to 5,000+ candidates. Our dedicated mass deployment teams run simultaneous multi-city drives.",
//     features: [
//       "Multi-city mobilization",
//       "Dedicated project team",
//       "Real-time recruitment dashboard",
//     ],
//     accent: "#dc2626",
//     accentLight: "rgba(220,38,38,0.08)",
//     gradient: "from-[#dc2626] to-[#b91c1c]",
//   },
//   {
//     id: "05",
//     icon: Search,
//     title: "Executive Search",
//     tagline: "C-suite talent, confidentially sourced",
//     description:
//       "Senior-level and C-suite talent acquisition through our confidential, bespoke headhunting process. We engage passive candidates through deep network mapping and discreet outreach.",
//     features: [
//       "Passive candidate outreach",
//       "Psychometric assessments",
//       "100% confidentiality assured",
//     ],
//     accent: "#3b82f6",
//     accentLight: "rgba(59,130,246,0.08)",
//     gradient: "from-[#3b82f6] to-[#2563eb]",
//   },
//   {
//     id: "06",
//     icon: Clock,
//     title: "Temporary Staffing",
//     tagline: "On-demand workforce coverage",
//     description:
//       "On-demand temporary workers for seasonal peaks, project-based needs, or sudden workforce gaps. Fully compliant placements with payroll and HR administration handled end-to-end.",
//     features: [
//       "Payroll & HR administration",
//       "Seasonal surge coverage",
//       "Compliant labor contracts",
//     ],
//     accent: "#b91c1c",
//     accentLight: "rgba(185,28,28,0.08)",
//     gradient: "from-[#b91c1c] to-[#991b1b]",
//   },
// ];

// const INDUSTRIES = [
//   {
//     icon: HardHat,
//     title: "Construction",
//     sub: "Infrastructure & mega-project specialists for any scale.",
//     roles: ["Civil Engineers", "Steel Fixers", "Masons", "Electricians"],
//     accent: "#154895",
//     tag: "High Demand",
//   },
//   {
//     icon: Hotel,
//     title: "Hospitality",
//     sub: "5-star pre-screened talent for hotels and resorts.",
//     roles: ["Managers", "Chefs", "Front Desk", "Housekeeping"],
//     accent: "#e62224",
//     tag: "GCC Focus",
//   },
//   {
//     icon: Stethoscope,
//     title: "Healthcare",
//     sub: "Licensed and verified medical professionals worldwide.",
//     roles: ["Nurses", "Lab Techs", "Physiotherapists", "Caregivers"],
//     accent: "#154895",
//     tag: "Certified",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Security",
//     sub: "Trained, certified security personnel ready to deploy.",
//     roles: ["Guards", "CCTV Operators", "Supervisors", "Cleaners"],
//     accent: "#e62224",
//     tag: "Vetted",
//   },
//   {
//     icon: Truck,
//     title: "Logistics",
//     sub: "Supply chain, warehousing and transportation experts.",
//     roles: ["Warehouse Staff", "Forklift Ops", "HMV Drivers", "Inventory"],
//     accent: "#154895",
//     tag: "Operational",
//   },
//   {
//     icon: ShoppingBag,
//     title: "Retail",
//     sub: "Multilingual staff for luxury outlets and megastores.",
//     roles: ["Sales Associates", "Store Managers", "Cashiers", "Merchandisers"],
//     accent: "#e62224",
//     tag: "Multilingual",
//   },
//   {
//     icon: Home,
//     title: "Domestic",
//     sub: "Background-verified home and facility staff.",
//     roles: ["Housemaids", "Nannies", "Drivers", "Cooks"],
//     accent: "#154895",
//     tag: "Verified",
//   },
//   {
//     icon: Wrench,
//     title: "Technical / MEP",
//     sub: "Skilled maintenance, MEP and workshop technicians.",
//     roles: ["HVAC Techs", "Welders", "Painters", "Crane Operators"],
//     accent: "#e62224",
//     tag: "Skilled Trade",
//   },
// ];

// // ─── Sub-components ─────────────────────────────────────────────────────────

// function StatCard({ stat, index, total }) {
//   const Icon = stat.icon;
//   const isLast = index === total - 1;
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       className="flex flex-col items-start gap-3 flex-1 min-w-0"
//       style={{
//         paddingLeft: index === 0 ? 0 : "1.5rem",
//         paddingRight: isLast ? 0 : "1.5rem",
//         borderRight: isLast ? "none" : "1px solid #e5e7eb",
//       }}
//     >
//       <div className="w-10 h-10 rounded-xl bg-[#154895]/10 flex items-center justify-center flex-shrink-0">
//         <Icon size={18} className="text-[#154895]" />
//       </div>
//       <div className="min-w-0">
//         <p className="text-4xl font-bold text-[#0f1929] font-serif leading-none mb-1">
//           {stat.value}
//         </p>
//         <p className="text-xs uppercase tracking-widest text-gray-400 font-medium leading-snug">
//           {stat.label}
//         </p>
//       </div>
//     </motion.div>
//   );
// }

// function ServiceCard({ service, index }) {
//   const [hovered, setHovered] = useState(false);
//   const Icon = service.icon;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-60px" }}
//       transition={{ delay: index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//       onHoverStart={() => setHovered(true)}
//       onHoverEnd={() => setHovered(false)}
//       className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer"
//       style={{
//         boxShadow: hovered
//           ? `0 32px 64px -12px rgba(0,0,0,0.12), 0 0 0 1px ${service.accent}22`
//           : "0 1px 4px rgba(0,0,0,0.04)",
//         transform: hovered ? "translateY(-6px)" : "translateY(0)",
//         transitionProperty: "box-shadow, transform",
//         transitionDuration: "0.5s",
//         transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
//       }}
//     >
//       <motion.div
//         className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient}`}
//         initial={{ scaleX: 0, transformOrigin: "left" }}
//         animate={{ scaleX: hovered ? 1 : 0 }}
//         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//       />

//       <motion.div
//         className="absolute inset-0 pointer-events-none"
//         style={{ background: service.accentLight }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: hovered ? 0.5 : 0 }}
//         transition={{ duration: 0.4 }}
//       />

//       <div className="relative z-10 p-8 flex flex-col h-full">
//         <div className="flex items-start justify-between mb-6">
//           <motion.div
//             className="w-14 h-14 rounded-2xl flex items-center justify-center"
//             style={{ background: service.accentLight }}
//             animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -5 : 0 }}
//             transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <Icon size={24} style={{ color: service.accent }} />
//           </motion.div>
//           <span
//             className="text-5xl font-bold font-serif leading-none"
//             style={{ color: `${service.accent}14` }}
//           >
//             {service.id}
//           </span>
//         </div>

//         <p
//           className="text-[11px] font-semibold uppercase tracking-widest mb-2"
//           style={{ color: service.accent }}
//         >
//           {service.tagline}
//         </p>

//         <h3
//           className="text-[21px] font-bold text-gray-900 mb-3 leading-snug font-serif transition-colors duration-300"
//           style={{ color: hovered ? service.accent : undefined }}
//         >
//           {service.title}
//         </h3>

//         <p className="text-sm text-gray-500 leading-relaxed mb-6">
//           {service.description}
//         </p>

//         <ul className="space-y-2 mb-6">
//           {service.features.map((feat) => (
//             <li key={feat} className="flex items-center gap-2.5 text-sm text-gray-600">
//               <CheckCircle2 size={14} style={{ color: service.accent, flexShrink: 0 }} />
//               {feat}
//             </li>
//           ))}
//         </ul>

//         <motion.div
//           className="flex items-center gap-2 text-sm font-semibold mt-auto"
//           style={{ color: service.accent }}
//           initial={{ opacity: 0, x: -8 }}
//           animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
//           transition={{ duration: 0.3 }}
//         >
//           Learn More
//           <ArrowUpRight size={14} />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// function IndustryCard({ ind, index }) {
//   const Icon = ind.icon;
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 32 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-40px" }}
//       transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ y: -5, transition: { duration: 0.22 } }}
//       className="group relative flex flex-col rounded-[22px] border overflow-hidden transition-all duration-300 cursor-pointer"
//       style={{
//         background: "rgba(255,255,255,0.88)",
//         borderColor: "rgba(21,72,149,0.08)",
//         backdropFilter: "blur(10px)",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.borderColor = `${ind.accent}32`;
//         e.currentTarget.style.boxShadow = `0 16px 48px ${ind.accent}14`;
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
//         e.currentTarget.style.boxShadow = "none";
//       }}
//     >
//       <div
//         className="h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
//         style={{ background: `linear-gradient(90deg, ${ind.accent}, ${ind.accent}55)` }}
//       />

//       <div className="flex flex-col gap-4 p-7 flex-1">
//         <div className="flex items-start justify-between gap-2">
//           <div
//             className="w-12 h-12 rounded-[13px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
//             style={{ background: `${ind.accent}10` }}
//           >
//             <Icon size={21} color={ind.accent} strokeWidth={1.8} />
//           </div>
//           <span
//             className="text-[10px] font-bold uppercase tracking-widest px-3 py-[5px] rounded-full flex-shrink-0"
//             style={{
//               background: `${ind.accent}0e`,
//               color: ind.accent,
//               border: `1px solid ${ind.accent}22`,
//             }}
//           >
//             {ind.tag}
//           </span>
//         </div>

//         <div>
//           <h3
//             className="font-bold text-[16px] mb-[6px] leading-snug transition-colors duration-250 group-hover:text-[#154895]"
//             style={{ color: "#1e293b" }}
//           >
//             {ind.title}
//           </h3>
//           <p className="text-[12.5px] leading-relaxed" style={{ color: "#64748b" }}>
//             {ind.sub}
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-[7px] mt-auto">
//           {ind.roles.map((r) => (
//             <span
//               key={r}
//               className="text-[10.5px] font-semibold px-3 py-[5px] rounded-full uppercase tracking-wide"
//               style={{
//                 background: "rgba(21,72,149,0.05)",
//                 color: "#475569",
//                 border: "1px solid rgba(21,72,149,0.08)",
//               }}
//             >
//               {r}
//             </span>
//           ))}
//         </div>

//         <motion.button
//           className="inline-flex items-center gap-1.5 text-[12.5px] font-bold mt-3 self-start transition-colors duration-200"
//           style={{ color: ind.accent }}
//           whileHover={{ x: 3 }}
//         >
//           Hire Specialists
//           <ArrowUpRight size={13} />
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

// // ─── Main Section ────────────────────────────────────────────────────────────

// export default function ServicesSection() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

//   return (
//     <section ref={sectionRef} className="relative py-20 sm:py-32 bg-[#f8f7f4] overflow-hidden">
//       {/* Ambient background glows */}
//       <div
//         className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
//         style={{
//           background: "radial-gradient(circle, rgba(21,72,149,0.04) 0%, transparent 70%)",
//           transform: "translate(30%, -30%)",
//         }}
//       />
//       <div
//         className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
//         style={{
//           background: "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)",
//           transform: "translate(-30%, 30%)",
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
//         {/* Header */}
//         <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16 sm:mb-20 items-end">
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.45 }}
//               className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
//               style={{
//                 background: "rgba(21,72,149,0.06)",
//                 borderColor: "rgba(21,72,149,0.14)",
//                 color: "#154895",
//               }}
//             >
//               <span
//                 className="w-[6px] h-[6px] rounded-full flex-shrink-0"
//                 style={{ background: "#e62224" }}
//               />
//               Our Services
//             </motion.div>

//             <motion.h2
//               initial={{ opacity: 0, y: 24 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//               className="font-serif text-[clamp(32px,4vw,56px)] font-bold text-[#0f1929] leading-[1.1] mb-5"
//             >
//               Comprehensive
//               <br />
//               <span className="text-[#154895] italic">Manpower Solutions</span>
//             </motion.h2>

//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.18, duration: 0.6 }}
//               className="text-[14px] sm:text-base text-gray-500 leading-relaxed max-w-md font-light"
//             >
//               From executive headhunting to mass overseas deployment — we
//               connect ambitious organizations with the right people, at the
//               right time, anywhere in the world.
//             </motion.p>
//           </div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.25, duration: 0.6 }}
//           >
//             <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:hidden">
//               {stats.map((stat, i) => {
//                 const Icon = stat.icon;
//                 return (
//                   <motion.div
//                     key={stat.label}
//                     initial={{ opacity: 0, y: 24 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//                     className="flex flex-col items-start gap-3"
//                   >
//                     <div className="w-10 h-10 rounded-xl bg-[#154895]/10 flex items-center justify-center flex-shrink-0">
//                       <Icon size={18} className="text-[#154895]" />
//                     </div>
//                     <div>
//                       <p className="text-4xl font-bold text-[#0f1929] font-serif leading-none mb-1">
//                         {stat.value}
//                       </p>
//                       <p className="text-xs uppercase tracking-widest text-gray-400 font-medium leading-snug">
//                         {stat.label}
//                       </p>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             <div className="hidden sm:flex flex-row items-start">
//               {stats.map((stat, i) => (
//                 <StatCard key={stat.label} stat={stat} index={i} total={stats.length} />
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Services grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
//           {services.map((service, i) => (
//             <ServiceCard key={service.id} service={service} index={i} />
//           ))}
//         </div>

//         {/* Industries */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="mb-8"
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <Briefcase size={16} className="text-[#154895]" />
//             <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
//               Industries We Serve
//             </span>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {INDUSTRIES.map((ind, i) => (
//               <IndustryCard key={ind.title} ind={ind} index={i} />
//             ))}
//           </div>
//         </motion.div>

//         {/* CTA Banner */}
//         <motion.div
//           initial={{ opacity: 0, y: 32 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           className="relative rounded-2xl overflow-hidden bg-[#0f1929]"
//         >
//           <div
//             className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
//             style={{ background: "rgba(21,72,149,0.2)" }}
//           />
//           <div
//             className="absolute -bottom-16 right-32 w-48 h-48 rounded-full pointer-events-none"
//             style={{ background: "rgba(230,34,36,0.15)" }}
//           />
//           <div
//             className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full -translate-y-1/2 pointer-events-none"
//             style={{ background: "rgba(21,72,149,0.06)" }}
//           />

//           <div className="relative z-10 px-6 py-10 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
//             <div className="max-w-xl">
//               <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
//                 Start Today
//               </p>

//               <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
//                 Ready to build your
//                 <br />
//                 <span className="text-[#1a5ab8] italic">ideal workforce?</span>
//               </h3>

//               <p className="text-[13px] sm:text-sm text-white/75 leading-relaxed font-light">
//                 Our recruitment specialists are on hand to craft a tailored
//                 manpower strategy for your business — whether you need one
//                 executive or a thousand skilled workers, locally or overseas.
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="flex items-center justify-center gap-2.5 bg-white text-[#134a93] px-6 sm:px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto"
//               >
//                 Get a Free Consultation
//                 <ChevronRight size={16} />
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="flex items-center justify-center gap-2.5 bg-white/10 text-white border border-white/20 px-6 sm:px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-white/15 transition-colors duration-200 w-full sm:w-auto"
//               >
//                 Download Company Profile
//                 <ArrowUpRight size={15} />
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Building2,
  Globe,
  Users,
  Megaphone,
  Search,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  MapPin,
  Briefcase,
  HardHat,
  Hotel,
  Stethoscope,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Home,
  Wrench,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "7+", label: "Years in Operation", icon: Award },
  { value: "20K+", label: "Candidates Placed", icon: Users },
  { value: "28+", label: "Countries Covered", icon: MapPin },
  { value: "98%", label: "Client Retention", icon: TrendingUp },
];

const services = [
  {
    id: "01",
    icon: Building2,
    title: "Domestic Recruitment",
    tagline: "Local talent, global standards",
    description:
      "End-to-end hiring solutions for businesses seeking top local talent. We handle sourcing, psychometric screening, background verification, and final placement — all within your country.",
    features: [
      "Dedicated account manager",
      "72-hour shortlist delivery",
      "90-day replacement guarantee",
    ],
    accent: "#154895",
    accentLight: "rgba(21,72,149,0.08)",
    gradient: "from-[#154895] to-[#1e5bb8]",
  },
  {
    id: "02",
    icon: Globe,
    title: "Overseas Recruitment",
    tagline: "Bridging talent across borders",
    description:
      "Skilled international manpower deployment backed by full documentation, medical fitness testing, visa processing, and pre-departure orientation programs.",
    features: [
      "PDOS & visa assistance",
      "Medical & documentation handling",
      "Airport deployment support",
    ],
    accent: "#e62224",
    accentLight: "rgba(230,34,36,0.08)",
    gradient: "from-[#e62224] to-[#c01a1c]",
  },
  {
    id: "03",
    icon: Users,
    title: "Local Staffing",
    tagline: "Right people, right now",
    description:
      "Flexible workforce solutions for businesses that need reliable staff at short or long-term notice. We maintain a pre-vetted talent pool for rapid deployment across all major industries.",
    features: [
      "Pre-vetted talent pool",
      "48-hour deployment capability",
      "Flexible contract terms",
    ],
    accent: "#2563eb",
    accentLight: "rgba(37,99,235,0.08)",
    gradient: "from-[#2563eb] to-[#154895]",
  },
  {
    id: "04",
    icon: Megaphone,
    title: "Mass Recruitment",
    tagline: "Scale fast, hire smart",
    description:
      "Large-scale hiring campaigns managed with military precision — from 50 to 5,000+ candidates. Our dedicated mass deployment teams run simultaneous multi-city drives.",
    features: [
      "Multi-city mobilization",
      "Dedicated project team",
      "Real-time recruitment dashboard",
    ],
    accent: "#dc2626",
    accentLight: "rgba(220,38,38,0.08)",
    gradient: "from-[#dc2626] to-[#b91c1c]",
  },
  {
    id: "05",
    icon: Search,
    title: "Executive Search",
    tagline: "C-suite talent, confidentially sourced",
    description:
      "Senior-level and C-suite talent acquisition through our confidential, bespoke headhunting process. We engage passive candidates through deep network mapping and discreet outreach.",
    features: [
      "Passive candidate outreach",
      "Psychometric assessments",
      "100% confidentiality assured",
    ],
    accent: "#3b82f6",
    accentLight: "rgba(59,130,246,0.08)",
    gradient: "from-[#3b82f6] to-[#2563eb]",
  },
  {
    id: "06",
    icon: Clock,
    title: "Temporary Staffing",
    tagline: "On-demand workforce coverage",
    description:
      "On-demand temporary workers for seasonal peaks, project-based needs, or sudden workforce gaps. Fully compliant placements with payroll and HR administration handled end-to-end.",
    features: [
      "Payroll & HR administration",
      "Seasonal surge coverage",
      "Compliant labor contracts",
    ],
    accent: "#b91c1c",
    accentLight: "rgba(185,28,28,0.08)",
    gradient: "from-[#b91c1c] to-[#991b1b]",
  },
];

const INDUSTRIES = [
  {
    icon: HardHat,
    title: "Construction",
    sub: "Infrastructure & mega-project specialists for any scale.",
    roles: ["Civil Engineers", "Steel Fixers", "Masons", "Electricians"],
    accent: "#154895",
    tag: "High Demand",
  },
  {
    icon: Hotel,
    title: "Hospitality",
    sub: "5-star pre-screened talent for hotels and resorts.",
    roles: ["Managers", "Chefs", "Front Desk", "Housekeeping"],
    accent: "#e62224",
    tag: "GCC Focus",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    sub: "Licensed and verified medical professionals worldwide.",
    roles: ["Nurses", "Lab Techs", "Physiotherapists", "Caregivers"],
    accent: "#154895",
    tag: "Certified",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    sub: "Trained, certified security personnel ready to deploy.",
    roles: ["Guards", "CCTV Operators", "Supervisors", "Cleaners"],
    accent: "#e62224",
    tag: "Vetted",
  },
  {
    icon: Truck,
    title: "Logistics",
    sub: "Supply chain, warehousing and transportation experts.",
    roles: ["Warehouse Staff", "Forklift Ops", "HMV Drivers", "Inventory"],
    accent: "#154895",
    tag: "Operational",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    sub: "Multilingual staff for luxury outlets and megastores.",
    roles: ["Sales Associates", "Store Managers", "Cashiers", "Merchandisers"],
    accent: "#e62224",
    tag: "Multilingual",
  },
  {
    icon: Home,
    title: "Domestic",
    sub: "Background-verified home and facility staff.",
    roles: ["Housemaids", "Nannies", "Drivers", "Cooks"],
    accent: "#154895",
    tag: "Verified",
  },
  {
    icon: Wrench,
    title: "Technical / MEP",
    sub: "Skilled maintenance, MEP and workshop technicians.",
    roles: ["HVAC Techs", "Welders", "Painters", "Crane Operators"],
    accent: "#e62224",
    tag: "Skilled Trade",
  },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function StatCard({ stat, index, total }) {
  const Icon = stat.icon;
  const isLast = index === total - 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-3 flex-1 min-w-0"
      style={{
        paddingLeft: index === 0 ? 0 : "1.5rem",
        paddingRight: isLast ? 0 : "1.5rem",
        borderRight: isLast ? "none" : "1px solid #e5e7eb",
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-[#154895]/10 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-[#154895]" />
      </div>
      <div className="min-w-0">
        <p className="text-4xl font-bold text-[#0f1929] font-serif leading-none mb-1">
          {stat.value}
        </p>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-medium leading-snug">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered
          ? `0 32px 64px -12px rgba(0,0,0,0.12), 0 0 0 1px ${service.accent}22`
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transitionProperty: "box-shadow, transform",
        transitionDuration: "0.5s",
        transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <motion.div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.gradient}`}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: service.accentLight }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: service.accentLight }}
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? -5 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon size={24} style={{ color: service.accent }} />
          </motion.div>
          <span
            className="text-5xl font-bold font-serif leading-none"
            style={{ color: `${service.accent}14` }}
          >
            {service.id}
          </span>
        </div>

        <p
          className="text-[11px] font-semibold uppercase tracking-widest mb-2"
          style={{ color: service.accent }}
        >
          {service.tagline}
        </p>

        <h3
          className="text-[21px] font-bold text-gray-900 mb-3 leading-snug font-serif transition-colors duration-300"
          style={{ color: hovered ? service.accent : undefined }}
        >
          {service.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="space-y-2 mb-6">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5 text-sm text-gray-600">
              <CheckCircle2 size={14} style={{ color: service.accent, flexShrink: 0 }} />
              {feat}
            </li>
          ))}
        </ul>

        <motion.div
          className="flex items-center gap-2 text-sm font-semibold mt-auto"
          style={{ color: service.accent }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          Learn More
          <ArrowUpRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function IndustryCard({ ind, index }) {
  const Icon = ind.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="group relative flex flex-col rounded-[22px] border overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.88)",
        borderColor: "rgba(21,72,149,0.08)",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${ind.accent}32`;
        e.currentTarget.style.boxShadow = `0 16px 48px ${ind.accent}14`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(21,72,149,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
        style={{ background: `linear-gradient(90deg, ${ind.accent}, ${ind.accent}55)` }}
      />

      <div className="flex flex-col gap-4 p-7 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div
            className="w-12 h-12 rounded-[13px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${ind.accent}10` }}
          >
            <Icon size={21} color={ind.accent} strokeWidth={1.8} />
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-[5px] rounded-full flex-shrink-0"
            style={{
              background: `${ind.accent}0e`,
              color: ind.accent,
              border: `1px solid ${ind.accent}22`,
            }}
          >
            {ind.tag}
          </span>
        </div>

        <div>
          <h3
            className="font-bold text-[16px] mb-[6px] leading-snug transition-colors duration-250 group-hover:text-[#154895]"
            style={{ color: "#1e293b" }}
          >
            {ind.title}
          </h3>
          <p className="text-[12.5px] leading-relaxed" style={{ color: "#64748b" }}>
            {ind.sub}
          </p>
        </div>

        <div className="flex flex-wrap gap-[7px] mt-auto">
          {ind.roles.map((r) => (
            <span
              key={r}
              className="text-[10.5px] font-semibold px-3 py-[5px] rounded-full uppercase tracking-wide"
              style={{
                background: "rgba(21,72,149,0.05)",
                color: "#475569",
                border: "1px solid rgba(21,72,149,0.08)",
              }}
            >
              {r}
            </span>
          ))}
        </div>

        <motion.button
          className="inline-flex items-center gap-1.5 text-[12.5px] font-bold mt-3 self-start transition-colors duration-200"
          style={{ color: ind.accent }}
          whileHover={{ x: 3 }}
        >
          Hire Specialists
          <ArrowUpRight size={13} />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 bg-[#f8f7f4] overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(21,72,149,0.04) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16 sm:mb-20 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
              style={{
                background: "rgba(21,72,149,0.06)",
                borderColor: "rgba(21,72,149,0.14)",
                color: "#154895",
              }}
            >
              <span
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ background: "#e62224" }}
              />
              Our Services
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(32px,4vw,56px)] font-bold text-[#0f1929] leading-[1.1] mb-5"
            >
              Comprehensive
              <br />
              <span className="text-[#154895] italic">Manpower Solutions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.6 }}
              className="text-[14px] sm:text-base text-gray-500 leading-relaxed max-w-md font-light"
            >
              From executive headhunting to mass overseas deployment — we
              connect ambitious organizations with the right people, at the
              right time, anywhere in the world.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:hidden">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#154895]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#154895]" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-[#0f1929] font-serif leading-none mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-medium leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="hidden sm:flex flex-row items-start">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} total={stats.length} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Briefcase size={16} className="text-[#154895]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Industries We Serve
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <IndustryCard key={ind.title} ind={ind} index={i} />
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden bg-[#0f1929]"
        >
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "rgba(21,72,149,0.2)" }}
          />
          <div
            className="absolute -bottom-16 right-32 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "rgba(230,34,36,0.15)" }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-96 h-96 rounded-full -translate-y-1/2 pointer-events-none"
            style={{ background: "rgba(21,72,149,0.06)" }}
          />

          <div className="relative z-10 px-6 py-10 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
                Start Today
              </p>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug mb-4">
                Ready to build your
                <br />
                <span className="text-[#1a5ab8] italic">ideal workforce?</span>
              </h3>

              <p className="text-[13px] sm:text-sm text-white/75 leading-relaxed font-light">
                Our recruitment specialists are on hand to craft a tailored
                manpower strategy for your business — whether you need one
                executive or a thousand skilled workers, locally or overseas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-white text-[#134a93] px-6 sm:px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto"
              >
                Get a Free Consultation
                <ChevronRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 bg-white/10 text-white border border-white/20 px-6 sm:px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:bg-white/15 transition-colors duration-200 w-full sm:w-auto"
              >
                Download Company Profile
                <ArrowUpRight size={15} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}