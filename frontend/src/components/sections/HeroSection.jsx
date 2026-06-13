// import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import {
//   ArrowRight, Users, Globe, Briefcase, CheckCircle,
//   MapPin, TrendingUp, Award, Shield, ChevronRight, Star
// } from "lucide-react";

// /* ─── Animated counter ─────────────────────────────────────── */
// function Counter({ from = 0, to, suffix = "", duration = 2.2, delay = 0 }) {
//   const [value, setValue] = useState(from);
//   const started = useRef(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       started.current = true;
//       const startTime = performance.now();
//       const step = (now) => {
//         const elapsed = (now - startTime) / 1000;
//         const progress = Math.min(elapsed / duration, 1);
//         // easeOutExpo
//         const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
//         setValue(Math.round(from + (to - from) * eased));
//         if (progress < 1) requestAnimationFrame(step);
//       };
//       requestAnimationFrame(step);
//     }, delay * 1000);
//     return () => clearTimeout(timer);
//   }, [from, to, duration, delay]);

//   return <>{value.toLocaleString()}{suffix}</>;
// }

// /* ─── Rotating word ─────────────────────────────────────────── */
// const wordPool = ["Qualified", "Certified", "Verified", "Elite", "Trusted"];

// function RotatingWord() {
//   const [index, setIndex] = useState(0);
//   useEffect(() => {
//     const id = setInterval(() => setIndex(i => (i + 1) % wordPool.length), 2400);
//     return () => clearInterval(id);
//   }, []);
//   return (
//     <span className="relative inline-block overflow-hidden align-bottom" style={{ minWidth: "220px" }}>
//       <AnimatePresence mode="wait">
//         <motion.span
//           key={wordPool[index]}
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -40, opacity: 0 }}
//           transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
//           className="inline-block text-[#154895]"
//           style={{ fontStyle: "italic" }}
//         >
//           {wordPool[index]}
//         </motion.span>
//       </AnimatePresence>
//     </span>
//   );
// }

// /* ─── Floating stat card ─────────────────────────────────────── */
// function StatCard({ icon: Icon, label, value, accent, delay, style }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.85, y: 20 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       style={style}
//       className="absolute backdrop-blur-2xl rounded-2xl border shadow-2xl px-4 py-3 flex items-center gap-3 min-w-[170px] z-20"
//       css={{
//         background: "rgba(255,255,255,0.92)",
//         borderColor: "rgba(255,255,255,0.7)",
//         boxShadow: "0 8px 32px rgba(21,72,149,0.12)",
//       }}
//     >
//       <div
//         className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
//         style={{ background: accent }}
//       >
//         <Icon size={17} color="#fff" />
//       </div>
//       <div>
//         <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</div>
//         <div className="text-[15px] font-bold text-gray-800 leading-tight">{value}</div>
//       </div>
//     </motion.div>
//   );
// }

// /* ─── Orbiting dot ───────────────────────────────────────────── */
// function OrbitDot({ radius, duration, startAngle, color, size = 6 }) {
//   return (
//     <motion.div
//       className="absolute rounded-full"
//       style={{
//         width: size, height: size,
//         background: color,
//         top: "50%", left: "50%",
//         marginTop: -size / 2, marginLeft: -size / 2,
//       }}
//       animate={{
//         x: [
//           Math.cos((startAngle * Math.PI) / 180) * radius,
//           Math.cos(((startAngle + 360) * Math.PI) / 180) * radius,
//         ],
//         y: [
//           Math.sin((startAngle * Math.PI) / 180) * radius,
//           Math.sin(((startAngle + 360) * Math.PI) / 180) * radius,
//         ],
//       }}
//       transition={{ duration, repeat: Infinity, ease: "linear" }}
//     />
//   );
// }

// /* ─── Trust badges ───────────────────────────────────────────── */
// const trustItems = [
//   { icon: Shield, label: "ISO 9001 Certified" },
//   { icon: Award, label: "Industry Awards 2024" },
//   { icon: Star, label: "4.9 / 5.0 Rating" },
// ];

// /* ─── Industry tags ──────────────────────────────────────────── */
// const industries = [
//   "Construction", "Healthcare", "IT & Tech", "Hospitality",
//   "Oil & Gas", "Manufacturing", "Finance", "Logistics",
// ];

// /* ════════════════════════════════════════════════════════════════
//    HERO SECTION
// ════════════════════════════════════════════════════════════════ */
// export default function HeroSection() {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
//   const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
//   const bgX = useTransform(springX, [-1, 1], [-18, 18]);
//   const bgY = useTransform(springY, [-1, 1], [-12, 12]);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
//     mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
//   };

//   return (
//     <section
//       className="relative min-h-screen flex items-center overflow-hidden"
//       style={{ background: "linear-gradient(160deg, #f0f4fc 0%, #fafbff 50%, #f5f0f8 100%)" }}
//       onMouseMove={handleMouseMove}
//     >
//       {/* ── Background layers ── */}
//       <motion.div
//         className="absolute inset-0 pointer-events-none"
//         style={{ x: bgX, y: bgY }}
//       >
//         {/* Blobs */}
//         <div
//           className="absolute rounded-full blur-[100px] opacity-40"
//           style={{
//             width: 700, height: 700,
//             top: "-20%", right: "-10%",
//             background: "radial-gradient(circle, rgba(21,72,149,0.25) 0%, transparent 70%)",
//           }}
//         />
//         <div
//           className="absolute rounded-full blur-[80px] opacity-30"
//           style={{
//             width: 500, height: 500,
//             bottom: "5%", left: "-8%",
//             background: "radial-gradient(circle, rgba(230,34,36,0.2) 0%, transparent 70%)",
//           }}
//         />
//         <div
//           className="absolute rounded-full blur-[120px] opacity-20"
//           style={{
//             width: 400, height: 400,
//             top: "40%", left: "30%",
//             background: "radial-gradient(circle, rgba(21,72,149,0.3) 0%, transparent 70%)",
//           }}
//         />
//       </motion.div>

//       {/* Subtle dot grid */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-[0.035]"
//         style={{
//           backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)",
//           backgroundSize: "40px 40px",
//         }}
//       />

//       {/* Diagonal accent line */}
//       <div
//         className="absolute pointer-events-none overflow-hidden inset-0"
//         style={{ zIndex: 0 }}
//       >
//         <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
//           <line x1="900" y1="0" x2="400" y2="900" stroke="#154895" strokeWidth="200" />
//           <line x1="1100" y1="0" x2="600" y2="900" stroke="#154895" strokeWidth="80" />
//         </svg>
//       </div>

//       {/* ── Content ── */}
//       <div
//         className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-20"
//         style={{ zIndex: 2 }}
//       >
//         <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

//           {/* ═══ LEFT COLUMN ═══ */}
//           <div className="max-w-[600px]">

//             {/* Eyebrow badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//               className="inline-flex items-center gap-2 mb-8"
//             >
//               <div
//                 className="flex items-center gap-2 rounded-full px-4 py-[7px] text-[12.5px] font-semibold tracking-wide border"
//                 style={{
//                   background: "rgba(21,72,149,0.07)",
//                   borderColor: "rgba(21,72,149,0.16)",
//                   color: "#154895",
//                 }}
//               >
//                 <span
//                   className="w-[7px] h-[7px] rounded-full flex-shrink-0"
//                   style={{
//                     background: "#e62224",
//                     animation: "pulse-dot 2s ease-in-out infinite",
//                   }}
//                 />
//                 Trusted Manpower Partner Since 2006
               
//               </div>
//             </motion.div>

//             {/* Headline */}
//             <motion.h1
//               initial={{ opacity: 0, y: 28 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//               className="font-black text-gray-900 leading-[1.06] tracking-tight mb-6"
//               style={{ fontSize: "clamp(36px, 5vw, 62px)", fontFamily: "'Playfair Display', Georgia, serif" }}
//             >
//               We Place&nbsp;
//               <RotatingWord />
//               <br />
//               <span style={{ letterSpacing: "-1px" }}>Manpower</span>{" "}
//               <span
//                 className="relative inline-block"
//                 style={{ color: "#154895" }}
//               >
//                 Globally
//                 {/* Underline squiggle */}
//                 <svg
//                   className="absolute -bottom-1 left-0 w-full"
//                   viewBox="0 0 220 10"
//                   fill="none"
//                   style={{ height: 10 }}
//                 >
//                   <motion.path
//                     d="M2 7 Q30 2 55 7 Q80 12 110 5 Q140 0 165 6 Q190 11 218 5"
//                     stroke="#e62224"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     fill="none"
//                     initial={{ pathLength: 0 }}
//                     animate={{ pathLength: 1 }}
//                     transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
//                   />
//                 </svg>
//               </span>
//             </motion.h1>

//             {/* Sub-copy */}
//             <motion.p
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.25, duration: 0.6 }}
//               className="text-[17px] leading-relaxed mb-10"
//               style={{ color: "#64748b", maxWidth: 480 }}
//             >
//               Scale your workforce in 25-30 days with pre-screened professionals from 28+ countries.
// Trusted by Qatar's leading organizations.
//  </motion.p>

//             {/* CTA row */}
//             <motion.div
//               initial={{ opacity: 0, y: 18 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.38, duration: 0.6 }}
//               className="flex flex-wrap gap-3 mb-10"
//             >
//               {/* Primary CTA */}
//               <motion.a
//                 href="/hire"
//                 className="group relative inline-flex items-center gap-2 text-white text-[14.5px] font-bold px-7 py-[14px] rounded-[12px] overflow-hidden shadow-lg"
//                 style={{
//                   background: "linear-gradient(135deg, #154895 0%, #1a58b8 100%)",
//                   boxShadow: "0 4px 22px rgba(21,72,149,0.38)",
//                 }}
//                 whileHover={{ scale: 1.03, boxShadow: "0 6px 28px rgba(21,72,149,0.48)" }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
//                 <Users size={16} />
//                 Hire Manpower
//                 <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
//               </motion.a>

//               {/* Secondary CTA */}
//               <motion.a
//                 href="/jobs"
//                 className="inline-flex items-center gap-2 text-[14.5px] font-bold px-7 py-[14px] rounded-[12px] border-2 transition-all duration-200"
//                 style={{
//                   color: "#154895",
//                   borderColor: "rgba(21,72,149,0.28)",
//                   background: "rgba(21,72,149,0.04)",
//                 }}
//                 whileHover={{
//                   background: "rgba(21,72,149,0.09)",
//                   borderColor: "rgba(21,72,149,0.5)",
//                   scale: 1.02,
//                 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Briefcase size={15} />
//                 Browse Jobs
//               </motion.a>
//             </motion.div>

//             {/* Trust row */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.58, duration: 0.6 }}
//               className="flex flex-wrap gap-5 mb-8"
//             >
//               {trustItems.map(({ icon: Icon, label }, i) => (
//                 <motion.div
//                   key={label}
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.62 + i * 0.07 }}
//                   className="flex items-center gap-2 text-[13px] font-semibold"
//                   style={{ color: "#475569" }}
//                 >
//                   <Icon size={14} color="#154895" />
//                   {label}
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Industry tags */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.75, duration: 0.5 }}
//             >
//               <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: "#94a3b8" }}>
//                 Industries we serve
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {industries.map((ind, i) => (
//                   <motion.span
//                     key={ind}
//                     initial={{ opacity: 0, scale: 0.85 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.78 + i * 0.04 }}
//                     className="px-3 py-1 rounded-full text-[11.5px] font-semibold border cursor-default hover:border-[#154895] hover:text-[#154895] transition-colors duration-200"
//                     style={{
//                       background: "rgba(21,72,149,0.04)",
//                       borderColor: "rgba(21,72,149,0.15)",
//                       color: "#475569",
//                     }}
//                   >
//                     {ind}
//                   </motion.span>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* ═══ RIGHT COLUMN — Visual ═══ */}
//           <div className="relative h-[540px] hidden lg:block">

//             {/* Central card */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.88, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute rounded-[28px] overflow-hidden"
//               style={{
//                 inset: "28px 12px",
//                 background: "linear-gradient(145deg, #0d2d5e 0%, #154895 55%, #1d5eaa 100%)",
//                 boxShadow: "0 24px 72px rgba(21,72,149,0.38), 0 4px 16px rgba(0,0,0,0.1)",
//               }}
//             >
//               {/* Inner glow accents */}
//               <div
//                 className="absolute inset-0 pointer-events-none"
//                 style={{
//                   background: `
//                     radial-gradient(ellipse at 20% 80%, rgba(230,34,36,0.22) 0%, transparent 50%),
//                     radial-gradient(ellipse at 80% 20%, rgba(100,160,255,0.18) 0%, transparent 50%)
//                   `,
//                 }}
//               />
//               {/* Subtle dot pattern */}
//               <div
//                 className="absolute inset-0 opacity-[0.06]"
//                 style={{
//                   backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
//                   backgroundSize: "24px 24px",
//                 }}
//               />

//               {/* Content inside card */}
//               <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
//                 {/* Icon ring */}
//                 <div className="relative mb-6">
//                   <div
//                     className="w-24 h-24 rounded-[22px] flex items-center justify-center"
//                     style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
//                   >
//                     <Users size={42} color="rgba(255,255,255,0.9)" />
//                   </div>
//                   {/* Orbiting dots */}
//                   <div className="absolute inset-0 flex items-center justify-center" style={{ width: 96, height: 96 }}>
//                     <OrbitDot radius={56} duration={6} startAngle={0} color="#e62224" size={8} />
//                     <OrbitDot radius={56} duration={6} startAngle={180} color="rgba(255,255,255,0.5)" size={5} />
//                     <OrbitDot radius={72} duration={10} startAngle={90} color="rgba(100,180,255,0.7)" size={6} />
//                   </div>
//                 </div>

//                 <motion.h3
//                   className="text-white font-bold text-[22px] mb-2 leading-tight"
//                   style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.9 }}
//                 >
//                   Global Manpower Network
//                 </motion.h3>
//                 <motion.p
//                   className="text-[13.5px] leading-relaxed mb-8 max-w-[260px]"
//                   style={{ color: "rgba(255,255,255,0.55)" }}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.0 }}
//                 >
//                   Connecting skilled professionals with leading employers across 28+ countries
//                 </motion.p>

//                 {/* Stats grid */}
//                 <motion.div
//                   className="grid grid-cols-3 gap-3 w-full"
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 1.05 }}
//                 >
//                   {[
//                     { label: "Placed", to: 50000, suffix: "+" },
//                     { label: "Clients", to: 500, suffix: "+" },
//                     { label: "Countries", to: 42, suffix: "" },
//                   ].map((s, i) => (
//                     <div
//                       key={s.label}
//                       className="rounded-[14px] py-3 px-2 text-center"
//                       style={{ background: "rgba(255,255,255,0.09)" }}
//                     >
//                       <div className="text-white font-black text-[18px] leading-none">
//                         <Counter to={s.to} suffix={s.suffix} delay={1.2 + i * 0.15} duration={2} />
//                       </div>
//                       <div className="text-[11px] mt-1 font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
//                         {s.label}
//                       </div>
//                     </div>
//                   ))}
//                 </motion.div>

//                 {/* Bottom CTA inside card */}
//                 <motion.a
//                   href="/contact"
//                   className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-bold py-2 px-4 rounded-full transition-all duration-200"
//                   style={{
//                     background: "rgba(255,255,255,0.1)",
//                     color: "rgba(255,255,255,0.8)",
//                     border: "1px solid rgba(255,255,255,0.2)",
//                   }}
//                   whileHover={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.3 }}
//                 >
//                   Get a Free Consultation
//                   <ChevronRight size={13} />
//                 </motion.a>
//               </div>
//             </motion.div>

//             {/* ── Floating stat chips ── */}
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.8, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute left-[-18px] top-[80px] flex items-center gap-3 rounded-[16px] px-4 py-3 min-w-[172px] z-30"
//               style={{
//                 background: "rgba(255,255,255,0.94)",
//                 border: "0.5px solid rgba(255,255,255,0.9)",
//                 boxShadow: "0 8px 32px rgba(21,72,149,0.14)",
//                 backdropFilter: "blur(20px)",
//               }}
//             >
//               <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "#154895" }}>
//                 <Briefcase size={16} color="#fff" />
//               </div>
//               <div>
//                 <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8" }}>Active Jobs</div>
//                 <div className="text-[14px] font-black" style={{ color: "#1e293b" }}>1,240 Open</div>
//               </div>
//               <TrendingUp size={14} className="ml-auto" style={{ color: "#22c55e" }} />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 24 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.95, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute right-[-18px] top-[200px] flex items-center gap-3 rounded-[16px] px-4 py-3 min-w-[172px] z-30"
//               style={{
//                 background: "rgba(255,255,255,0.94)",
//                 border: "0.5px solid rgba(255,255,255,0.9)",
//                 boxShadow: "0 8px 32px rgba(21,72,149,0.14)",
//                 backdropFilter: "blur(20px)",
//               }}
//             >
//               <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "#e62224" }}>
//                 <Users size={16} color="#fff" />
//               </div>
//               <div>
//                 <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8" }}>New Hires</div>
//                 <div className="text-[14px] font-black" style={{ color: "#1e293b" }}>48 This Week</div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 1.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute left-[-18px] bottom-[90px] flex items-center gap-3 rounded-[16px] px-4 py-3 min-w-[172px] z-30"
//               style={{
//                 background: "rgba(255,255,255,0.94)",
//                 border: "0.5px solid rgba(255,255,255,0.9)",
//                 boxShadow: "0 8px 32px rgba(21,72,149,0.14)",
//                 backdropFilter: "blur(20px)",
//               }}
//             >
//               <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "#10b981" }}>
//                 <Globe size={16} color="#fff" />
//               </div>
//               <div>
//                 <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8" }}>Coverage</div>
//                 <div className="text-[14px] font-black" style={{ color: "#1e293b" }}>28+ Countries</div>
//               </div>
//             </motion.div>

//             {/* Location ping chips */}
//             {[
//               { label: "Doha, Quatar", top: "18%", right: "2%", delay: 1.2 },
//               // { label: "Riyadh, KSA", top: "62%", right: "-2%", delay: 1.35 },
//             ].map((loc) => (
//               <motion.div
//                 key={loc.label}
//                 initial={{ opacity: 0, scale: 0.7 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: loc.delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                 className="absolute inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold z-20"
//                 style={{
//                   top: loc.top, right: loc.right,
//                   background: "rgba(255,255,255,0.9)",
//                   color: "#154895",
//                   border: "1px solid rgba(21,72,149,0.15)",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                   backdropFilter: "blur(12px)",
//                 }}
//               >
//                 <MapPin size={10} />
//                 {loc.label}
//               </motion.div>
//             ))}

//             {/* Decorative rotating rings */}
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
//               className="absolute pointer-events-none"
//               style={{
//                 width: 100, height: 100,
//                 top: -8, right: 8,
//                 borderRadius: "50%",
//                 border: "2px dashed rgba(21,72,149,0.15)",
//               }}
//             />
//             <motion.div
//               animate={{ rotate: -360 }}
//               transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
//               className="absolute pointer-events-none"
//               style={{
//                 width: 64, height: 64,
//                 bottom: 8, left: -8,
//                 borderRadius: "50%",
//                 border: "2px dashed rgba(230,34,36,0.18)",
//               }}
//             />
//           </div>
//         </div>

//         {/* ── Bottom metric strip ── */}
//         {/* <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.85, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//           className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
//         >
//           {[
//             { icon: Users, label: "Candidates Placed", to: 20000, suffix: "+", color: "#154895" },
//             { icon: Briefcase, label: "Partner Companies", to: 500, suffix: "+", color: "#e62224" },
//             { icon: Globe, label: "Countries Covered", to: 28, suffix: "+", color: "#10b981" },
//             { icon: Award, label: "Years Experience", to: 7, suffix: " yrs", color: "#f59e0b" },
//           ].map(({ icon: Icon, label, to, suffix, color }, i) => (
//             <motion.div
//               key={label}
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9 + i * 0.08 }}
//               className="rounded-[16px] p-5 border flex items-start gap-3 group hover:shadow-md transition-shadow duration-300"
//               style={{
//                 background: "rgba(255,255,255,0.72)",
//                 borderColor: "rgba(255,255,255,0.8)",
//                 backdropFilter: "blur(16px)",
//               }}
//             >
//               <div
//                 className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
//                 style={{ background: `${color}14` }}
//               >
//                 <Icon size={18} color={color} />
//               </div>
//               <div>
//                 <div
//                   className="text-[26px] font-black leading-none mb-[3px]"
//                   style={{ color, fontFamily: "'Playfair Display', Georgia, serif" }}
//                 >
//                   <Counter to={to} suffix={suffix} delay={1.1 + i * 0.15} duration={2.2} />
//                 </div>
//                 <div className="text-[12px] font-semibold" style={{ color: "#64748b" }}>{label}</div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div> */}
//         <motion.div
//   initial={{ opacity: 0, y: 24 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.85, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//   className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
// >
//   {[
//    { icon: Users, label: "Candidates Placed", to: 20000, suffix: "+", color: "#154895" }, // Primary Blue
// { icon: Briefcase, label: "Partner Companies", to: 500, suffix: "+", color: "#e62224" }, // Primary Red
// { icon: Globe, label: "Countries Covered", to: 28, suffix: "+", color: "#154895" }, // Lighter Blue
// { icon: Award, label: "Years Experience", to: 7, suffix: " yrs", color: "#e62224" }, // Darker Red
//   ].map(({ icon: Icon, label, to, suffix, color }, i) => (
//     <motion.div
//       key={label}
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.9 + i * 0.08 }}
//       className="rounded-[16px] p-3 sm:p-5 border flex items-start gap-2 sm:gap-3 group hover:shadow-md transition-shadow duration-300 min-w-0"
//       style={{
//         background: "rgba(255,255,255,0.72)",
//         borderColor: "rgba(255,255,255,0.8)",
//         backdropFilter: "blur(16px)",
//       }}
//     >
//       <div
//         className="w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] sm:rounded-[10px] flex items-center justify-center flex-shrink-0"
//         style={{ background: `${color}14` }}
//       >
//         <Icon size={15} className="sm:hidden" color={color} />
//         <Icon size={18} className="hidden sm:block" color={color} />
//       </div>
//       <div className="min-w-0 flex-1">
//         <div
//           className="text-[20px] sm:text-[26px] font-black leading-none mb-[3px] truncate"
//           style={{ color, fontFamily: "'Playfair Display', Georgia, serif" }}
//         >
//           <Counter to={to} suffix={suffix} delay={1.1 + i * 0.15} duration={2.2} />
//         </div>
//         <div
//           className="text-[10px] sm:text-[12px] font-semibold leading-tight"
//           style={{ color: "#64748b" }}
//         >
//           {label}
//         </div>
//       </div>
//     </motion.div>
//   ))}
// </motion.div>

//       </div>

//   {/* ── Bottom wave ── */}
// <motion.div
//   initial={{ opacity: 0, y: 40 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{
//     delay: 1.2,
//     duration: 1.4,
//     ease: [0.22, 1, 0.36, 1],
//   }}
//   className="absolute bottom-0 left-0 right-0 pointer-events-none"
//   style={{ zIndex: 3 }}
// >
//   <svg
//     viewBox="0 0 1440 64"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     preserveAspectRatio="none"
//     className="w-full h-[70px] sm:h-[80px]"
//   >
//     <path
//       d="M0 64V38C180 8 360 58 540 34C720 10 900 64 1080 36C1260 12 1380 56 1440 40V64H0Z"
//       fill="white"
//     />
//   </svg>
// </motion.div>

// {/* ── Keyframe styles (slightly smoother pulse) ── */}
// <style>{`
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

//   @keyframes pulse-dot {
//     0%, 100% {
//       transform: scale(1);
//       opacity: 0.9;
//     }
//     50% {
//       transform: scale(1.35);
//       opacity: 0.5;
//     }
//   }
// `}</style>
//     </section>
//   );
// }


import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Users, Globe, Briefcase, CheckCircle,
  MapPin, TrendingUp, Award, Shield, ChevronRight, Star
} from "lucide-react";

/* ─── Animated counter ─────────────────────────────────────── */
function Counter({ from = 0, to, suffix = "", duration = 2.2, delay = 0 }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const step = (now) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(Math.round(from + (to - from) * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [from, to, duration, delay]);

  return <>{value.toLocaleString()}{suffix}</>;
}

/* ─── Rotating word ─────────────────────────────────────────── */
const wordPool = ["Qualified", "Certified", "Verified", "Elite", "Trusted"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % wordPool.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ minWidth: "clamp(160px, 18vw, 220px)" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={wordPool[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-[#154895]"
          style={{ fontStyle: "italic" }}
        >
          {wordPool[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Orbiting dot ───────────────────────────────────────────── */
function OrbitDot({ radius, duration, startAngle, color, size = 6 }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size, height: size,
        background: color,
        top: "50%", left: "50%",
        marginTop: -size / 2, marginLeft: -size / 2,
      }}
      animate={{
        x: [
          Math.cos((startAngle * Math.PI) / 180) * radius,
          Math.cos(((startAngle + 360) * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin((startAngle * Math.PI) / 180) * radius,
          Math.sin(((startAngle + 360) * Math.PI) / 180) * radius,
        ],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─── Trust badges ───────────────────────────────────────────── */
const trustItems = [
  { icon: Shield, label: "ISO 9001 Certified" },
  { icon: Award, label: "Industry Awards 2024" },
  { icon: Star, label: "4.9 / 5.0 Rating" },
];

/* ─── Industry tags ──────────────────────────────────────────── */
const industries = [
  "Construction", "Healthcare", "IT & Tech", "Hospitality",
  "Oil & Gas", "Manufacturing", "Finance", "Logistics",
];

/* ════════════════════════════════════════════════════════════════
   HERO SECTION
════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const bgX = useTransform(springX, [-1, 1], [-18, 18]);
  const bgY = useTransform(springY, [-1, 1], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f0f4fc 0%, #fafbff 50%, #f5f0f8 100%)" }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Background layers ── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: bgX, y: bgY }}>
        <div className="absolute rounded-full blur-[100px] opacity-40" style={{
          width: "min(700px, 55vw)", height: "min(700px, 55vw)",
          top: "-20%", right: "-10%",
          background: "radial-gradient(circle, rgba(21,72,149,0.25) 0%, transparent 70%)",
        }} />
        <div className="absolute rounded-full blur-[80px] opacity-30" style={{
          width: "min(500px, 40vw)", height: "min(500px, 40vw)",
          bottom: "5%", left: "-8%",
          background: "radial-gradient(circle, rgba(230,34,36,0.2) 0%, transparent 70%)",
        }} />
        <div className="absolute rounded-full blur-[120px] opacity-20" style={{
          width: "min(400px, 32vw)", height: "min(400px, 32vw)",
          top: "40%", left: "30%",
          background: "radial-gradient(circle, rgba(21,72,149,0.3) 0%, transparent 70%)",
        }} />
      </motion.div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{
        backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Diagonal accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
          <line x1="900" y1="0" x2="400" y2="900" stroke="#154895" strokeWidth="200" />
          <line x1="1100" y1="0" x2="600" y2="900" stroke="#154895" strokeWidth="80" />
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-24 pb-16 lg:pt-20 lg:pb-12">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ═══ LEFT COLUMN ═══ */}
          <div className="max-w-[560px] lg:max-w-none">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div
                className="flex items-center gap-2 rounded-full px-4 py-[7px] text-[12px] font-semibold tracking-wide border"
                style={{
                  background: "rgba(21,72,149,0.07)",
                  borderColor: "rgba(21,72,149,0.16)",
                  color: "#154895",
                }}
              >
                <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{
                  background: "#e62224",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }} />
                Trusted Manpower Partner Since 2006
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-black text-gray-900 leading-[1.07] tracking-tight mb-5"
              style={{
                fontSize: "clamp(32px, 4vw, 54px)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              We Place&nbsp;
              <RotatingWord />
              <br />
              <span style={{ letterSpacing: "-1px" }}>Manpower</span>{" "}
              <span className="relative inline-block" style={{ color: "#154895" }}>
                Globally
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 220 10" fill="none" style={{ height: 9 }}>
                  <motion.path
                    d="M2 7 Q30 2 55 7 Q80 12 110 5 Q140 0 165 6 Q190 11 218 5"
                    stroke="#e62224" strokeWidth="3" strokeLinecap="round" fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-[15.5px] leading-relaxed mb-8"
              style={{ color: "#64748b", maxWidth: 440 }}
            >
              Scale your workforce in 25–30 days with pre-screened professionals from 28+ countries.
              Trusted by Qatar's leading organizations.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <motion.a
                href="/hire"
                className="group relative inline-flex items-center gap-2 text-white text-[14px] font-bold px-6 py-[13px] rounded-[11px] overflow-hidden shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #154895 0%, #1a58b8 100%)",
                  boxShadow: "0 4px 20px rgba(21,72,149,0.35)",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 6px 26px rgba(21,72,149,0.46)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                <Users size={15} />
                Hire Manpower
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                href="/jobs"
                className="inline-flex items-center gap-2 text-[14px] font-bold px-6 py-[13px] rounded-[11px] border-2 transition-all duration-200"
                style={{
                  color: "#154895",
                  borderColor: "rgba(21,72,149,0.28)",
                  background: "rgba(21,72,149,0.04)",
                }}
                whileHover={{
                  background: "rgba(21,72,149,0.09)",
                  borderColor: "rgba(21,72,149,0.5)",
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Briefcase size={14} />
                Browse Jobs
              </motion.a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-7"
            >
              {trustItems.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.58 + i * 0.07 }}
                  className="flex items-center gap-2 text-[12.5px] font-semibold"
                  style={{ color: "#475569" }}
                >
                  <Icon size={13} color="#154895" />
                  {label}
                </motion.div>
              ))}
            </motion.div>

            {/* Industry tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.5 }}
            >
              <p className="text-[10.5px] font-bold uppercase tracking-wider mb-2" style={{ color: "#94a3b8" }}>
                Industries we serve
              </p>
              <div className="flex flex-wrap gap-[7px]">
                {industries.map((ind, i) => (
                  <motion.span
                    key={ind}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.76 + i * 0.04 }}
                    className="px-3 py-[5px] rounded-full text-[11px] font-semibold border cursor-default hover:border-[#154895] hover:text-[#154895] transition-colors duration-200"
                    style={{
                      background: "rgba(21,72,149,0.04)",
                      borderColor: "rgba(21,72,149,0.14)",
                      color: "#475569",
                    }}
                  >
                    {ind}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN — Visual ═══ */}
          <div className="relative hidden lg:block" style={{ height: "min(520px, 46vw)" }}>

            {/* Central card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="absolute rounded-[26px] overflow-hidden"
              style={{
                inset: "24px 10px",
                background: "linear-gradient(145deg, #0d2d5e 0%, #154895 55%, #1d5eaa 100%)",
                boxShadow: "0 20px 60px rgba(21,72,149,0.35), 0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `
                  radial-gradient(ellipse at 20% 80%, rgba(230,34,36,0.22) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, rgba(100,160,255,0.18) 0%, transparent 50%)
                `,
              }} />
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />

              <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                {/* Icon ring */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-[20px] flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                    <Users size={36} color="rgba(255,255,255,0.9)" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center" style={{ width: 80, height: 80 }}>
                    <OrbitDot radius={50} duration={6} startAngle={0} color="#e62224" size={7} />
                    <OrbitDot radius={50} duration={6} startAngle={180} color="rgba(255,255,255,0.5)" size={4} />
                    <OrbitDot radius={64} duration={10} startAngle={90} color="rgba(100,180,255,0.7)" size={5} />
                  </div>
                </div>

                <motion.h3
                  className="text-white font-bold text-[19px] mb-2 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                >
                  Global Manpower Network
                </motion.h3>
                <motion.p
                  className="text-[12.5px] leading-relaxed mb-6 max-w-[240px]"
                  style={{ color: "rgba(255,255,255,0.52)" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
                >
                  Connecting skilled professionals with leading employers across 28+ countries
                </motion.p>

                {/* Stats grid */}
                <motion.div
                  className="grid grid-cols-3 gap-2 w-full"
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
                >
                  {[
                    { label: "Placed", to: 50000, suffix: "+" },
                    { label: "Clients", to: 500, suffix: "+" },
                    { label: "Countries", to: 42, suffix: "" },
                  ].map((s, i) => (
                    <div key={s.label} className="rounded-[12px] py-3 px-2 text-center"
                      style={{ background: "rgba(255,255,255,0.09)" }}>
                      <div className="text-white font-black text-[17px] leading-none">
                        <Counter to={s.to} suffix={s.suffix} delay={1.2 + i * 0.15} duration={2} />
                      </div>
                      <div className="text-[10px] mt-1 font-semibold" style={{ color: "rgba(255,255,255,0.42)" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.a
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold py-2 px-4 rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  whileHover={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                >
                  Get a Free Consultation
                  <ChevronRight size={12} />
                </motion.a>
              </div>
            </motion.div>

            {/* Floating stat chips */}
            {[
              {
                icon: Briefcase, color: "#154895", label: "Active Jobs", value: "1,240 Open",
                side: "left", top: "13%", extra: <TrendingUp size={13} style={{ color: "#22c55e", marginLeft: "auto" }} />,
                delay: 0.8,
              },
              {
                icon: Users, color: "#e62224", label: "New Hires", value: "48 This Week",
                side: "right", top: "36%", delay: 0.95,
              },
              {
                icon: Globe, color: "#10b981", label: "Coverage", value: "28+ Countries",
                side: "left", top: "68%", delay: 1.1,
              },
            ].map((chip) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, x: chip.side === "left" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: chip.delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute flex items-center gap-3 rounded-[14px] px-3 py-[10px] z-30"
                style={{
                  [chip.side]: "-14px",
                  top: chip.top,
                  background: "rgba(255,255,255,0.95)",
                  border: "0.5px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 6px 24px rgba(21,72,149,0.12)",
                  backdropFilter: "blur(20px)",
                  minWidth: 158,
                }}
              >
                <div className="w-8 h-8 rounded-[10px] flex-shrink-0 flex items-center justify-center"
                  style={{ background: chip.color }}>
                  <chip.icon size={14} color="#fff" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9.5px] font-bold uppercase tracking-wider truncate" style={{ color: "#94a3b8" }}>
                    {chip.label}
                  </div>
                  <div className="text-[13px] font-black leading-tight" style={{ color: "#1e293b" }}>
                    {chip.value}
                  </div>
                </div>
                {chip.extra}
              </motion.div>
            ))}

            {/* Location ping */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-bold z-20"
              style={{
                top: "4%", right: "2%",
                background: "rgba(255,255,255,0.9)",
                color: "#154895",
                border: "1px solid rgba(21,72,149,0.15)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              <MapPin size={9} />
              Doha, Qatar
            </motion.div>

            {/* Decorative rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute pointer-events-none"
              style={{
                width: 88, height: 88, top: -6, right: 6,
                borderRadius: "50%",
                border: "2px dashed rgba(21,72,149,0.13)",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute pointer-events-none"
              style={{
                width: 56, height: 56, bottom: 6, left: -6,
                borderRadius: "50%",
                border: "2px dashed rgba(230,34,36,0.16)",
              }}
            />
          </div>
        </div>

        {/* ── Bottom metric strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { icon: Users,    label: "Candidates Placed",  to: 20000, suffix: "+",    color: "#154895" },
            { icon: Briefcase,label: "Partner Companies",  to: 500,   suffix: "+",    color: "#e62224" },
            { icon: Globe,    label: "Countries Covered",  to: 28,    suffix: "+",    color: "#154895" },
            { icon: Award,    label: "Years Experience",   to: 7,     suffix: " yrs", color: "#e62224" },
          ].map(({ icon: Icon, label, to, suffix, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.08 }}
              className="rounded-[14px] p-4 border flex items-center gap-3 group hover:shadow-md transition-shadow duration-300"
              style={{
                background: "rgba(255,255,255,0.78)",
                borderColor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}12` }}>
                <Icon size={16} color={color} />
              </div>
              <div className="min-w-0">
                <div className="text-[22px] sm:text-[24px] font-black leading-none mb-[2px] truncate"
                  style={{ color, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  <Counter to={to} suffix={suffix} delay={1.1 + i * 0.15} duration={2.2} />
                </div>
                <div className="text-[11px] font-semibold leading-tight" style={{ color: "#64748b" }}>
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom wave ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" className="w-full h-[56px] sm:h-[70px]">
          <path
            d="M0 64V38C180 8 360 58 540 34C720 10 900 64 1080 36C1260 12 1380 56 1440 40V64H0Z"
            fill="white"
          />
        </svg>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.35); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}