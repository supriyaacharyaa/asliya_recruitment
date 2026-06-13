// import { useState, useRef } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import {
//   Star,
//   Building2,
//   Award,
//   CheckCircle,
//   ArrowRight,
//   Phone,
//   Mail,
//   MessageCircle,
//   MapPin,
//   Shield,
//   ChevronLeft,
//   ChevronRight,
//   Quote,
//   Users,
//   Globe,
//   Zap,
//   TrendingUp,
//   Send,
//   User,
//   Briefcase,
//   Hash,
//   FileText,
//   X,
// } from "lucide-react";

// const clients = [
//   { name: "Gulf Warehousing Company", sector: "Logistics", workers: "400+" },
//   { name: "Milaha", sector: "Maritime & Logistics", workers: "300+" },
//   { name: "Al Rayyan Projects", sector: "Construction", workers: "250+" },
//   { name: "Mowasalat", sector: "Transport", workers: "200+" },
//   { name: "BUTEC Qatar", sector: "Engineering", workers: "600+" },
//   { name: "Draieh Contracting", sector: "Construction", workers: "4,000+" },
//   { name: "GASCO", sector: "Oil & Gas", workers: "180+" },
//   { name: "Certis GSSCI", sector: "Security", workers: "350+" },
//   { name: "Al Misnad Services", sector: "Facilities", workers: "500+" },
//   { name: "European Guarding Security", sector: "Security", workers: "220+" },
//   { name: "Qatar Foundation", sector: "Education", workers: "120+" },
//   { name: "Nakilat", sector: "Shipping", workers: "90+" },
//   { name: "Ashghal", sector: "Infrastructure", workers: "280+" },
//   { name: "Qatar Rail", sector: "Transport", workers: "160+" },
//   { name: "Barwa Group", sector: "Real Estate", workers: "110+" },
//   { name: "QTerminals", sector: "Port Operations", workers: "140+" },
//   { name: "Ooredoo", sector: "Telecom", workers: "70+" },
//   { name: "Gulf International", sector: "Construction", workers: "190+" },
//   { name: "Qatar Projects", sector: "Engineering", workers: "210+" },
//   { name: "Al Waha Contracting", sector: "Construction", workers: "130+" },
// ];

// const testimonials = [
//   {
//     quote:
//       "Asliya has consistently demonstrated the ability to manage high-volume recruitment campaigns and mobilize workers from Africa and Asia within demanding timeframes. Their professionalism is unmatched.",
//     name: "Mr. Sami Kayed Mohammad Hindawa",
//     title: "General Manager",
//     company: "Al Misnad Services",
//     initials: "SH",
//     rating: 5,
//     tag: "High-Volume Capability",
//   },
//   {
//     quote:
//       "They mobilized 4,000+ workers simultaneously without compromising quality. Asliya continues to support our current projects and we look forward to maintaining our long-term relationship.",
//     name: "Ahmed Abdrabbo",
//     title: "General Manager",
//     company: "Draieh Contracting",
//     initials: "AA",
//     rating: 5,
//     tag: "4,000+ Workers at Once",
//   },
//   {
//     quote:
//       "We are happy to work with Asliya Manpower Supply and confidently recommend their services to any organization requiring bulk manpower recruitment.",
//     name: "Mr. Antonie Ready",
//     title: "Manager",
//     company: "BUTEC Qatar",
//     initials: "AR",
//     rating: 5,
//     tag: "Bulk Manpower",
//   },
//   {
//     quote:
//       "This recognition is awarded in recognition of exceptional dedication, professionalism and unwavering commitment to providing excellent manpower supply services.",
//     name: "Management Team",
//     title: "Awards Committee",
//     company: "European Guarding Security Services",
//     initials: "EG",
//     rating: 5,
//     tag: "Award for Excellence",
//   },
//   {
//     quote:
//       "We confidently recommend their services to other organizations. Asliya has been a consistently reliable partner across multiple projects and continues to exceed our expectations.",
//     name: "Sajimon Sebastian",
//     title: "HR & Admin Manager",
//     company: "GASCO",
//     initials: "SS",
//     rating: 5,
//     tag: "Consistently Reliable",
//   },
// ];

// const stats = [
//   { num: "300+", label: "Corporate Clients", icon: Building2 },
//   { num: "20,000+", label: "Workers Deployed", icon: Users },
//   { num: "28+", label: "Source Countries", icon: Globe },
//   { num: "25–30", label: "Days Avg. Deploy", icon: Zap },
// ];

// function StatCard({ stat, index }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{
//         delay: index * 0.12,
//         duration: 0.7,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="relative bg-white rounded-2xl border border-gray-100 p-7 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-[#154895]/0 to-[#154895]/0 group-hover:from-[#154895]/5 group-hover:to-[#154895]/10 transition-all duration-500" />
//       <div className="relative z-10">
//         <div className="w-12 h-12 rounded-xl bg-[#eef4ff] flex items-center justify-center mb-5 group-hover:bg-[#154895] transition-colors duration-300">
//           <stat.icon
//             size={22}
//             className="text-[#154895] group-hover:text-white transition-colors duration-300"
//           />
//         </div>
//         <motion.div
//           className="text-4xl font-black text-gray-900 mb-1 tabular-nums"
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={inView ? { opacity: 1, scale: 1 } : {}}
//           transition={{
//             delay: index * 0.12 + 0.3,
//             duration: 0.5,
//             ease: [0.34, 1.56, 0.64, 1],
//           }}
//         >
//           {stat.num}
//         </motion.div>
//         <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
//       </div>
//     </motion.div>
//   );
// }

// function ClientCard({ client, index }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, scale: 0.88 }}
//       animate={inView ? { opacity: 1, scale: 1 } : {}}
//       transition={{
//         delay: (index % 10) * 0.04,
//         duration: 0.45,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#154895]/40 hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-[#eef4ff]/0 to-[#eef4ff]/0 group-hover:from-[#eef4ff] group-hover:to-white transition-all duration-400" />
//       <div className="relative z-10">
//         <div className="w-11 h-11 rounded-xl bg-[#f0f5ff] flex items-center justify-center mb-3 group-hover:bg-[#154895] transition-colors duration-300">
//           <Building2
//             size={18}
//             className="text-[#154895] group-hover:text-white transition-colors duration-300"
//           />
//         </div>
//         <div className="text-[13.5px] font-bold text-gray-900 mb-1 leading-tight">
//           {client.name}
//         </div>
//         <div className="flex items-center justify-between mt-2">
//           <span className="text-[10.5px] font-semibold text-[#154895] bg-[#eef4ff] px-2.5 py-1 rounded-full">
//             {client.sector}
//           </span>
//           <span className="text-[11px] text-gray-400 font-medium">
//             {client.workers} placed
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function TestimonialsCarousel() {
//   const [active, setActive] = useState(0);
//   const prev = () =>
//     setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
//   const next = () =>
//     setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

//   return (
//     <div className="relative max-w-4xl mx-auto">
//       <div className="overflow-hidden rounded-3xl">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={active}
//             initial={{ opacity: 0, x: 60 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -60 }}
//             transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//             className="bg-white border border-gray-100 rounded-3xl p-10 lg:p-14"
//           >
//             <div className="flex items-start gap-5 mb-8">
//               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#154895] to-[#1e3a8a] flex items-center justify-center text-white text-lg font-black flex-shrink-0 shadow-lg">
//                 {testimonials[active].initials}
//               </div>
//               <div>
//                 <span className="inline-block bg-[#eef4ff] text-[#154895] text-xs font-bold px-3 py-1.5 rounded-full mb-2">
//                   {testimonials[active].tag}
//                 </span>
//                 <div className="flex gap-1">
//                   {Array.from({ length: testimonials[active].rating }).map(
//                     (_, i) => (
//                       <Star
//                         key={i}
//                         size={14}
//                         fill="#fbbf24"
//                         className="text-amber-400"
//                       />
//                     ),
//                   )}
//                 </div>
//               </div>
//               <Quote
//                 size={40}
//                 className="ml-auto text-gray-100 flex-shrink-0 hidden sm:block"
//               />
//             </div>

//             <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-8 font-light">
//               "{testimonials[active].quote}"
//             </p>

//             <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
//               <div>
//                 <div className="font-bold text-gray-900">
//                   {testimonials[active].name}
//                 </div>
//                 <div className="text-gray-500 text-sm">
//                   {testimonials[active].title} · {testimonials[active].company}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       <div className="flex items-center justify-between mt-8">
//         <div className="flex gap-2">
//           {testimonials.map((_, i) => (
//             <motion.button
//               key={i}
//               onClick={() => setActive(i)}
//               className={`h-2 rounded-full transition-all duration-300 ${i === active ? "bg-[#154895] w-8" : "bg-gray-200 w-2 hover:bg-gray-300"}`}
//             />
//           ))}
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={prev}
//             className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#154895] hover:border-[#154895] hover:text-white text-gray-500 transition-all duration-200"
//           >
//             <ChevronLeft size={18} />
//           </button>
//           <button
//             onClick={next}
//             className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#154895] hover:border-[#154895] hover:text-white text-gray-500 transition-all duration-200"
//           >
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const fields = [
//   {
//     id: "name",
//     label: "Full Name",
//     placeholder: "Your full name",
//     icon: User,
//     type: "text",
//     span: 1,
//   },
//   {
//     id: "company",
//     label: "Company Name",
//     placeholder: "Your company",
//     icon: Briefcase,
//     type: "text",
//     span: 1,
//   },
//   {
//     id: "email",
//     label: "Email Address",
//     placeholder: "you@company.com",
//     icon: Mail,
//     type: "email",
//     span: 1,
//   },
//   {
//     id: "phone",
//     label: "Phone / WhatsApp",
//     placeholder: "+974 ...",
//     icon: Phone,
//     type: "tel",
//     span: 1,
//   },
// ];

// function FloatingInput({ field, value, onChange, delay }) {
//   const [focused, setFocused] = useState(false);
//   const hasValue = value.length > 0;
//   const isActive = focused || hasValue;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//       className="relative"
//     >
//       <div
//         className={`relative border-2 rounded-2xl transition-all duration-300 overflow-hidden ${
//           focused
//             ? "border-[#154895] shadow-[0_0_0_4px_rgba(21,72,149,0.1)]"
//             : hasValue
//               ? "border-[#154895]/40"
//               : "border-gray-200 hover:border-gray-300"
//         }`}
//       >
//         <div
//           className={`absolute left-4 transition-all duration-250 pointer-events-none ${
//             isActive
//               ? "top-2.5 text-[10px] font-bold text-[#154895] tracking-wide uppercase"
//               : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
//           }`}
//         >
//           {field.label}
//         </div>
//         <div className="absolute right-4 top-1/2 -translate-y-1/2">
//           <field.icon
//             size={16}
//             className={`transition-colors duration-200 ${focused ? "text-[#154895]" : "text-gray-300"}`}
//           />
//         </div>
//         <input
//           type={field.type}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//           placeholder={isActive ? field.placeholder : ""}
//           className="w-full pt-7 pb-3 px-4 text-gray-900 text-sm bg-transparent outline-none placeholder-gray-300"
//         />
//       </div>
//     </motion.div>
//   );
// }

// function ContactForm() {
//   const [form, setForm] = useState({
//     name: "",
//     company: "",
//     email: "",
//     phone: "",
//     workers: "",
//     message: "",
//   });
//   const [step, setStep] = useState(0);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = true;
//     if (!form.email.trim() || !form.email.includes("@")) e.email = true;
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;
//     setStep(1);
//     setTimeout(() => setStep(2), 2000);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//       viewport={{ once: true }}
//       className="relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-[#154895]/10"
//     >
//       <div className="h-1.5 bg-gradient-to-r from-[#154895] via-[#3b7ce8] to-[#154895]" />

//       <div className="p-8 lg:p-12">
//         <AnimatePresence mode="wait">
//           {step === 2 ? (
//             <motion.div
//               key="success"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
//               className="py-16 text-center"
//             >
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{
//                   delay: 0.2,
//                   duration: 0.7,
//                   ease: [0.34, 1.56, 0.64, 1],
//                 }}
//                 className="w-24 h-24 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mx-auto mb-6"
//               >
//                 <CheckCircle size={44} className="text-green-500" />
//               </motion.div>
//               <motion.h3
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="text-3xl font-black text-gray-900 mb-3"
//               >
//                 Request Sent!
//               </motion.h3>
//               <motion.p
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.65 }}
//                 className="text-gray-500 mb-8 max-w-sm mx-auto"
//               >
//                 Our team will contact you within 24 hours with a tailored
//                 recruitment plan.
//               </motion.p>
//               <motion.button
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//                 onClick={() => {
//                   setStep(0);
//                   setForm({
//                     name: "",
//                     company: "",
//                     email: "",
//                     phone: "",
//                     workers: "",
//                     message: "",
//                   });
//                 }}
//                 className="text-[#154895] font-semibold text-sm border border-[#154895]/30 px-5 py-2.5 rounded-xl hover:bg-[#eef4ff] transition-colors"
//               >
//                 Send Another Enquiry
//               </motion.button>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="form"
//               initial={{ opacity: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="mb-10"
//               >
//                 <h3 className="text-3xl font-black text-gray-900 mb-2">
//                   Become Our Next Success Story
//                 </h3>
//                 <p className="text-gray-500">
//                   Free consultation · Response within 24 hours · No obligations
//                 </p>
//               </motion.div>

//               <div className="grid sm:grid-cols-2 gap-5 mb-5">
//                 {fields.map((field, i) => (
//                   <div key={field.id} className="relative">
//                     <FloatingInput
//                       field={field}
//                       value={form[field.id]}
//                       onChange={(v) => {
//                         setForm({ ...form, [field.id]: v });
//                         setErrors({ ...errors, [field.id]: false });
//                       }}
//                       delay={i * 0.08}
//                     />
//                     <AnimatePresence>
//                       {errors[field.id] && (
//                         <motion.p
//                           initial={{ opacity: 0, y: -6 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0 }}
//                           className="text-red-500 text-xs mt-1.5 ml-1"
//                         >
//                           Required field
//                         </motion.p>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ))}
//               </div>

//               <motion.div
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   delay: 0.35,
//                   duration: 0.55,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//                 className="mb-5"
//               >
//                 <div className="relative border-2 border-gray-200 hover:border-gray-300 rounded-2xl transition-colors duration-200 overflow-hidden">
//                   <div className="absolute left-4 top-2.5 text-[10px] font-bold text-gray-400 tracking-wide uppercase">
//                     Workers Needed
//                   </div>
//                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//                     <Hash size={16} className="text-gray-300" />
//                   </div>
//                   <select
//                     value={form.workers}
//                     onChange={(e) =>
//                       setForm({ ...form, workers: e.target.value })
//                     }
//                     className="w-full pt-7 pb-3 px-4 text-gray-900 text-sm bg-transparent outline-none appearance-none cursor-pointer"
//                   >
//                     <option value="">Select a range</option>
//                     <option>1–10</option>
//                     <option>11–50</option>
//                     <option>51–200</option>
//                     <option>201–500</option>
//                     <option>500–1,000</option>
//                     <option>1,000+</option>
//                   </select>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   delay: 0.42,
//                   duration: 0.55,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//                 className="mb-8"
//               >
//                 <div className="relative border-2 border-gray-200 hover:border-gray-300 focus-within:border-[#154895] focus-within:shadow-[0_0_0_4px_rgba(21,72,149,0.1)] rounded-2xl transition-all duration-300 overflow-hidden">
//                   <div className="absolute left-4 top-3 text-[10px] font-bold text-gray-400 tracking-wide uppercase">
//                     Message / Requirements
//                   </div>
//                   <div className="absolute right-4 top-3">
//                     <FileText size={16} className="text-gray-300" />
//                   </div>
//                   <textarea
//                     value={form.message}
//                     onChange={(e) =>
//                       setForm({ ...form, message: e.target.value })
//                     }
//                     placeholder="Describe roles, industries, timeline, preferred countries..."
//                     rows={4}
//                     className="w-full pt-9 pb-4 px-4 text-gray-900 text-sm bg-transparent outline-none resize-none placeholder-gray-300"
//                   />
//                 </div>
//               </motion.div>

//               <motion.button
//                 onClick={handleSubmit}
//                 disabled={step === 1}
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full relative overflow-hidden bg-[#154895] hover:bg-[#1a58b8] disabled:bg-[#154895]/70 text-white font-bold py-4 rounded-2xl transition-colors duration-200 shadow-xl shadow-[#154895]/30 flex items-center justify-center gap-3 text-[15px]"
//               >
//                 <AnimatePresence mode="wait">
//                   {step === 1 ? (
//                     <motion.div
//                       key="loading"
//                       initial={{ opacity: 0, scale: 0.5 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center gap-3"
//                     >
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{
//                           repeat: Infinity,
//                           duration: 0.8,
//                           ease: "linear",
//                         }}
//                         className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
//                       />
//                       Sending your request...
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key="idle"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="flex items-center gap-3"
//                     >
//                       <Send size={17} />
//                       Send Enquiry — Get a Reply in 24h
//                       <ArrowRight size={16} className="ml-1" />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
//                   initial={{ x: "-100%" }}
//                   animate={{ x: "200%" }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2.5,
//                     ease: "linear",
//                     repeatDelay: 1,
//                   }}
//                 />
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// }

// export default function ClientsPage() {
//   return (
//     <div className="min-h-screen bg-[#f8faff] font-sans">
//       <section className="relative bg-gradient-to-br from-[#050f2e] via-[#0d2660] to-[#154895] py-28 px-5 sm:px-8 overflow-hidden">
//         <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/10 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

//         <div className="relative max-w-[1280px] mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.1, duration: 0.5 }}
//               className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 mb-8"
//             >
//               <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
//               <span className="text-white/90 text-sm font-semibold">
//                 300+ Organizations Trust Asliya Manpower
//               </span>
//             </motion.div>

//             <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
//               The Companies
//               <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
//                 Betting On Us
//               </span>
//             </h1>
//             <p className="text-xl text-blue-200 max-w-xl mx-auto leading-relaxed">
//               Same companies you compete with. Same companies your employees
//               want to join.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.7 }}
//             className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
//           >
//             {stats.map((s, i) => (
//               <motion.div
//                 key={s.label}
//                 initial={{ opacity: 0, scale: 0.7 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{
//                   delay: 0.5 + i * 0.08,
//                   duration: 0.5,
//                   ease: [0.34, 1.56, 0.64, 1],
//                 }}
//                 className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl py-5 px-4 text-center"
//               >
//                 <div className="text-3xl font-black text-yellow-400 mb-1">
//                   {s.num}
//                 </div>
//                 <div className="text-blue-200 text-xs font-medium">
//                   {s.label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8faff] to-transparent" />
//       </section>

//       <section className="bg-white border-b border-gray-100 py-5 px-5 sm:px-8">
//         <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-8">
//           {[
//             { icon: Shield, text: "Ministry of Labor Qatar — License #618" },
//             { icon: Award, text: "Supreme Committee Approved · FIFA Standard" },
//             { icon: CheckCircle, text: "Qatar Labor Law Compliant" },
//             { icon: TrendingUp, text: "7+ Years in Business" },
//           ].map((c, i) => (
//             <motion.div
//               key={c.text}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.06, duration: 0.4 }}
//               className="flex items-center gap-2 text-sm font-semibold text-gray-600"
//             >
//               <c.icon size={16} className="text-[#154895]" />
//               {c.text}
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       <section className="py-24 px-5 sm:px-8">
//         <div className="max-w-[1280px] mx-auto">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
//             >
//               Our Trusted Partners
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.15, duration: 0.5 }}
//               viewport={{ once: true }}
//               className="text-gray-500 text-lg"
//             >
//               Leading organizations across Qatar — construction, logistics,
//               security, hospitality and beyond.
//             </motion.p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//             {clients.map((c, i) => (
//               <ClientCard key={c.name} client={c} index={i} />
//             ))}
//           </div>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="text-center text-gray-400 mt-8 text-sm"
//           >
//             + 20 more corporate and government clients not listed
//           </motion.p>
//         </div>
//       </section>

//       <section className="py-16 px-5 sm:px-8 bg-white">
//         <div className="max-w-[1280px] mx-auto">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((s, i) => (
//               <StatCard key={s.label} stat={s} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-24 px-5 sm:px-8 bg-[#f8faff]">
//         <div className="max-w-[1280px] mx-auto">
//           <div className="text-center mb-16">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
//             >
//               What Our Clients Say
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ delay: 0.15, duration: 0.5 }}
//               viewport={{ once: true }}
//               className="text-gray-500 text-lg"
//             >
//               Real quotes from real General Managers and HR leaders.
//             </motion.p>
//           </div>
//           <TestimonialsCarousel />
//         </div>
//       </section>

//       <section className="py-24 px-5 sm:px-8 bg-gradient-to-b from-white to-[#eef4ff]">
//         <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
//               Join 300+ Companies
//               <br />
//               <span className="text-[#154895]">That Already Trust Us</span>
//             </h2>
//             <p className="text-gray-600 text-lg leading-relaxed mb-10">
//               Every week you delay hiring costs money. We deliver pre-screened
//               talent in 25–30 days — or faster. No excuses. FIFA projects prove
//               it.
//             </p>

//             <div className="space-y-4 mb-10">
//               {[
//                 { icon: Zap, text: "Workers deployed in 25–40 days" },
//                 {
//                   icon: Shield,
//                   text: "100% compliant — Ministry of Labor Licensed",
//                 },
//                 { icon: Users, text: "Bulk hiring from 28+ source countries" },
//                 {
//                   icon: CheckCircle,
//                   text: "4,000+ workers in a single deployment",
//                 },
//               ].map((p, i) => (
//                 <motion.div
//                   key={p.text}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.1, duration: 0.5 }}
//                   viewport={{ once: true }}
//                   className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#154895]/30 hover:shadow-md transition-all duration-200"
//                 >
//                   <div className="w-10 h-10 rounded-xl bg-[#eef4ff] flex items-center justify-center flex-shrink-0">
//                     <p.icon size={18} className="text-[#154895]" />
//                   </div>
//                   <span className="font-semibold text-gray-800">{p.text}</span>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <a
//                 href="tel:+97444434386"
//                 className="flex items-center gap-2.5 bg-[#154895] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#1a58b8] transition-colors shadow-lg"
//               >
//                 <Phone size={16} /> +974 4443 4386
//               </a>
//               <a
//                 href="mailto:business@asliyarecruitment.com"
//                 className="flex items-center gap-2.5 border-2 border-[#154895]/30 text-[#154895] font-bold px-6 py-3.5 rounded-xl hover:bg-[#eef4ff] transition-colors"
//               >
//                 <Mail size={16} /> Email Us
//               </a>
//             </div>
//           </motion.div>

//           <div>
//             <ContactForm />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// // import { useState, useRef } from "react";
// // import { motion, AnimatePresence, useInView } from "framer-motion";
// // import {
// //   Star, Building2, Award, CheckCircle, ArrowRight, Phone, Mail,
// //   MessageCircle, MapPin, Shield, ChevronLeft, ChevronRight, Quote,
// //   Users, Globe, Zap, TrendingUp, Send, User, Briefcase, Hash,
// //   FileText,
// // } from "lucide-react";

// // // ─── Data ─────────────────────────────────────────────────────────
// // const clients = [
// //   { name: "Gulf Warehousing Company", sector: "Logistics", workers: "400+" },
// //   { name: "Milaha", sector: "Maritime & Logistics", workers: "300+" },
// //   { name: "Al Rayyan Projects", sector: "Construction", workers: "250+" },
// //   { name: "Mowasalat", sector: "Transport", workers: "200+" },
// //   { name: "BUTEC Qatar", sector: "Engineering", workers: "600+" },
// //   { name: "Draieh Contracting", sector: "Construction", workers: "4,000+" },
// //   { name: "GASCO", sector: "Oil & Gas", workers: "180+" },
// //   { name: "Certis GSSCI", sector: "Security", workers: "350+" },
// // ];

// // const testimonials = [
// //   {
// //     quote:
// //       "Asliya has consistently demonstrated the ability to manage high-volume recruitment campaigns within demanding timeframes.",
// //     name: "Mr. Sami Kayed Mohammad Hindawa",
// //     title: "General Manager",
// //     company: "Al Misnad Services",
// //     initials: "SH",
// //     rating: 5,
// //     tag: "High-Volume Capability",
// //   },
// //   {
// //     quote:
// //       "They mobilized 4,000+ workers simultaneously without compromising quality.",
// //     name: "Ahmed Abdrabbo",
// //     title: "General Manager",
// //     company: "Draieh Contracting",
// //     initials: "AA",
// //     rating: 5,
// //     tag: "4,000+ Workers",
// //   },
// // ];

// // const stats = [
// //   { num: "300+", label: "Corporate Clients", icon: Building2 },
// //   { num: "20,000+", label: "Workers Deployed", icon: Users },
// //   { num: "28+", label: "Source Countries", icon: Globe },
// //   { num: "25–30", label: "Days Avg. Deploy", icon: Zap },
// // ];

// // // ─── StatCard ─────────────────────────────────────────────────────
// // function StatCard({ stat, index }) {
// //   const ref = useRef(null);
// //   const inView = useInView(ref, { once: true });

// //   return (
// //     <motion.div
// //       ref={ref}
// //       initial={{ opacity: 0, y: 40 }}
// //       animate={inView ? { opacity: 1, y: 0 } : {}}
// //       transition={{ delay: index * 0.1, duration: 0.6 }}
// //       className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition"
// //     >
// //       <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-brand-primary/10">
// //         <stat.icon className="text-brand-primary" size={20} />
// //       </div>

// //       <div className="text-3xl font-black text-gray-900">{stat.num}</div>
// //       <div className="text-gray-500 text-sm">{stat.label}</div>

// //       <div className="absolute left-0 top-6 bottom-6 w-1 bg-brand-secondary rounded-r opacity-0 group-hover:opacity-100" />
// //     </motion.div>
// //   );
// // }

// // // ─── ClientCard ───────────────────────────────────────────────────
// // function ClientCard({ client, index }) {
// //   const ref = useRef(null);
// //   const inView = useInView(ref, { once: true });

// //   return (
// //     <motion.div
// //       ref={ref}
// //       initial={{ opacity: 0, scale: 0.9 }}
// //       animate={inView ? { opacity: 1, scale: 1 } : {}}
// //       transition={{ delay: index * 0.03 }}
// //       className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition"
// //     >
// //       <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-brand-primary/10">
// //         <Building2 className="text-brand-primary" size={16} />
// //       </div>

// //       <div className="font-bold text-gray-900 text-sm">{client.name}</div>

// //       <div className="flex justify-between mt-2 text-xs">
// //         <span className="px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold">
// //           {client.sector}
// //         </span>
// //         <span className="text-gray-400">{client.workers}</span>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // // ─── Testimonials ────────────────────────────────────────────────
// // function TestimonialsCarousel() {
// //   const [active, setActive] = useState(0);

// //   const prev = () =>
// //     setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
// //   const next = () =>
// //     setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

// //   return (
// //     <div className="max-w-4xl mx-auto">
// //       <AnimatePresence mode="wait">
// //         <motion.div
// //           key={active}
// //           initial={{ opacity: 0, x: 40 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           exit={{ opacity: 0, x: -40 }}
// //           className="bg-white rounded-2xl p-8 border border-gray-100"
// //         >
// //           <div className="flex items-center gap-3 mb-4">
// //             <div className="w-12 h-12 bg-brand-primary text-white rounded-xl flex items-center justify-center font-bold">
// //               {testimonials[active].initials}
// //             </div>
// //             <div>
// //               <div className="font-bold">{testimonials[active].name}</div>
// //               <div className="text-xs text-gray-500">
// //                 {testimonials[active].title}
// //               </div>
// //             </div>
// //           </div>

// //           <p className="text-gray-600 mb-4">
// //             "{testimonials[active].quote}"
// //           </p>

// //           <div className="flex justify-between items-center">
// //             <span className="text-sm text-brand-primary font-semibold">
// //               {testimonials[active].tag}
// //             </span>

// //             <div className="flex gap-2">
// //               <button onClick={prev} className="p-2 border rounded-lg">
// //                 <ChevronLeft />
// //               </button>
// //               <button onClick={next} className="p-2 border rounded-lg">
// //                 <ChevronRight />
// //               </button>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// // // ─── Contact Form ────────────────────────────────────────────────
// // function ContactForm() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     company: "",
// //     phone: "",
// //     message: "",
// //   });

// //   const [step, setStep] = useState(0);

// //   const handleSubmit = () => {
// //     if (!form.name || !form.email) return;
// //     setStep(1);
// //     setTimeout(() => setStep(2), 1500);
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl p-8 border border-gray-100">
// //       {step === 2 ? (
// //         <div className="text-center">
// //           <CheckCircle className="text-brand-primary mx-auto mb-4" size={40} />
// //           <h2 className="text-xl font-bold">Request Sent!</h2>
// //         </div>
// //       ) : (
// //         <>
// //           <input
// //             className="w-full border p-3 rounded-lg mb-3"
// //             placeholder="Name"
// //             onChange={(e) => setForm({ ...form, name: e.target.value })}
// //           />

// //           <input
// //             className="w-full border p-3 rounded-lg mb-3"
// //             placeholder="Email"
// //             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //           />

// //           <textarea
// //             className="w-full border p-3 rounded-lg mb-4"
// //             placeholder="Message"
// //             rows={4}
// //             onChange={(e) => setForm({ ...form, message: e.target.value })}
// //           />

// //           <button
// //             onClick={handleSubmit}
// //             className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold"
// //           >
// //             Send Enquiry
// //           </button>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // // ─── PAGE ─────────────────────────────────────────────────────────
// // export default function ClientsPage() {
// //   return (
// //     <div className="min-h-screen bg-gray-50">

// //       {/* HERO */}
// //       <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-24 text-center">
// //         <h1 className="text-5xl font-black">
// //           The Companies Betting On Us
// //         </h1>
// //         <p className="mt-4 text-blue-100">
// //           300+ organizations trust us
// //         </p>

// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
// //           {stats.map((s, i) => (
// //             <StatCard key={i} stat={s} index={i} />
// //           ))}
// //         </div>
// //       </section>

// //       {/* CLIENTS */}
// //       <section className="py-20 max-w-6xl mx-auto px-4">
// //         <h2 className="text-3xl font-bold text-center mb-10">
// //           Trusted Partners
// //         </h2>

// //         <div className="grid md:grid-cols-4 gap-4">
// //           {clients.map((c, i) => (
// //             <ClientCard key={i} client={c} index={i} />
// //           ))}
// //         </div>
// //       </section>

// //       {/* TESTIMONIALS */}
// //       <section className="py-20">
// //         <TestimonialsCarousel />
// //       </section>

// //       {/* FORM */}
// //       <section className="py-20 max-w-4xl mx-auto px-4">
// //         <ContactForm />
// //       </section>

// //     </div>
// //   );
// // } 
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star, Building2, Award, CheckCircle, ArrowRight, Phone, Mail,
  Shield, ChevronLeft, ChevronRight, Quote, Users, Globe, Zap,
  TrendingUp, Send, User, Briefcase, Hash, FileText,
} from "lucide-react";
import Container from "../components/ui/Container";

// ─── Data ──────────────────────────────────────────────────────────────────────

const clients = [
  { name: "Gulf Warehousing Company",    sector: "Logistics",          workers: "400+"   },
  { name: "Milaha",                      sector: "Maritime & Logistics",workers: "300+"   },
  { name: "Al Rayyan Projects",          sector: "Construction",        workers: "250+"   },
  { name: "Mowasalat",                   sector: "Transport",           workers: "200+"   },
  { name: "BUTEC Qatar",                 sector: "Engineering",         workers: "600+"   },
  { name: "Draieh Contracting",          sector: "Construction",        workers: "4,000+" },
  { name: "GASCO",                       sector: "Oil & Gas",           workers: "180+"   },
  { name: "Certis GSSCI",                sector: "Security",            workers: "350+"   },
  { name: "Al Misnad Services",          sector: "Facilities",          workers: "500+"   },
  { name: "European Guarding Security",  sector: "Security",            workers: "220+"   },
  { name: "Qatar Foundation",            sector: "Education",           workers: "120+"   },
  { name: "Nakilat",                     sector: "Shipping",            workers: "90+"    },
  { name: "Ashghal",                     sector: "Infrastructure",      workers: "280+"   },
  { name: "Qatar Rail",                  sector: "Transport",           workers: "160+"   },
  { name: "Barwa Group",                 sector: "Real Estate",         workers: "110+"   },
  { name: "QTerminals",                  sector: "Port Operations",     workers: "140+"   },
  { name: "Ooredoo",                     sector: "Telecom",             workers: "70+"    },
  { name: "Gulf International",          sector: "Construction",        workers: "190+"   },
  { name: "Qatar Projects",              sector: "Engineering",         workers: "210+"   },
  { name: "Al Waha Contracting",         sector: "Construction",        workers: "130+"   },
];

const testimonials = [
  {
    quote: "Asliya has consistently demonstrated the ability to manage high-volume recruitment campaigns and mobilize workers from Africa and Asia within demanding timeframes. Their professionalism is unmatched.",
    name: "Mr. Sami Kayed Mohammad Hindawa", title: "General Manager",   company: "Al Misnad Services",
    initials: "SH", rating: 5, tag: "High-Volume Capability",
  },
  {
    quote: "They mobilized 4,000+ workers simultaneously without compromising quality. Asliya continues to support our current projects and we look forward to maintaining our long-term relationship.",
    name: "Ahmed Abdrabbo",                  title: "General Manager",   company: "Draieh Contracting",
    initials: "AA", rating: 5, tag: "4,000+ Workers at Once",
  },
  {
    quote: "We are happy to work with Asliya Manpower Supply and confidently recommend their services to any organization requiring bulk manpower recruitment.",
    name: "Mr. Antonie Ready",               title: "Manager",           company: "BUTEC Qatar",
    initials: "AR", rating: 5, tag: "Bulk Manpower",
  },
  {
    quote: "This recognition is awarded in recognition of exceptional dedication, professionalism and unwavering commitment to providing excellent manpower supply services.",
    name: "Management Team",                 title: "Awards Committee",  company: "European Guarding Security",
    initials: "EG", rating: 5, tag: "Award for Excellence",
  },
  {
    quote: "We confidently recommend their services to other organizations. Asliya has been a consistently reliable partner across multiple projects and continues to exceed our expectations.",
    name: "Sajimon Sebastian",               title: "HR & Admin Manager",company: "GASCO",
    initials: "SS", rating: 5, tag: "Consistently Reliable",
  },
];

const stats = [
  { num: "300+",    label: "Corporate Clients",  icon: Building2 },
  { num: "20,000+", label: "Workers Deployed",   icon: Users     },
  { num: "28+",     label: "Source Countries",   icon: Globe     },
  { num: "25–30",   label: "Days Avg. Deploy",   icon: Zap       },
];

const trustBadges = [
  { icon: Shield,      text: "Ministry of Labor Qatar — License #618"        },
  { icon: Award,       text: "Supreme Committee Approved · FIFA Standard"    },
  { icon: CheckCircle, text: "Qatar Labor Law Compliant"                     },
  { icon: TrendingUp,  text: "7+ Years in Business"                          },
];

const ctaPoints = [
  { icon: Zap,         text: "Workers deployed in 25–40 days"               },
  { icon: Shield,      text: "100% compliant — Ministry of Labor Licensed"  },
  { icon: Users,       text: "Bulk hiring from 28+ source countries"        },
  { icon: CheckCircle, text: "4,000+ workers in a single deployment"        },
];

const formFields = [
  { id: "name",    label: "Full Name",        placeholder: "Your full name",   icon: User,     type: "text"  },
  { id: "company", label: "Company Name",     placeholder: "Your company",     icon: Briefcase,type: "text"  },
  { id: "email",   label: "Email Address",    placeholder: "you@company.com",  icon: Mail,     type: "email" },
  { id: "phone",   label: "Phone / WhatsApp", placeholder: "+974 ...",         icon: Phone,    type: "tel"   },
];

// ─── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Hover tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-brand-primary/10 transition-all duration-500 pointer-events-none" />
      {/* Left accent bar */}
      <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-brand-primary transition-colors duration-300">
          <stat.icon size={20} className="text-brand-primary group-hover:text-white transition-colors duration-300" />
        </div>
        <motion.div
          className="text-3xl sm:text-4xl font-black text-gray-900 mb-1 tabular-nums"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {stat.num}
        </motion.div>
        <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
      </div>
    </motion.div>
  );
}

// ─── ClientCard ────────────────────────────────────────────────────────────────

function ClientCard({ client, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: (index % 10) * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:border-brand-primary/40 hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-white transition-all duration-300 pointer-events-none" />
      <div className="relative z-10">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-3 group-hover:bg-brand-primary transition-colors duration-300">
          <Building2 size={17} className="text-brand-primary group-hover:text-white transition-colors duration-300" />
        </div>
        <p className="text-[13px] sm:text-[13.5px] font-bold text-gray-900 mb-2 leading-tight">{client.name}</p>
        <div className="flex items-center justify-between gap-1 flex-wrap">
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
            {client.sector}
          </span>
          <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium whitespace-nowrap">{client.workers} placed</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── TestimonialsCarousel ──────────────────────────────────────────────────────

function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));
  const t = testimonials[active];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-7 sm:p-10 lg:p-14"
          >
            {/* Header */}
            <div className="flex items-start gap-4 sm:gap-5 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-primary flex items-center justify-center text-white text-base sm:text-lg font-black flex-shrink-0 shadow-lg">
                {t.initials}
              </div>
              <div className="min-w-0">
                <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1.5 rounded-full mb-2">
                  {t.tag}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-brand-secondary fill-brand-secondary" />
                  ))}
                </div>
              </div>
              <Quote size={36} className="ml-auto text-gray-100 flex-shrink-0 hidden sm:block" />
            </div>

            <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 font-light">
              "{t.quote}"
            </p>

            <div className="pt-5 sm:pt-6 border-t border-gray-100">
              <p className="font-bold text-gray-900 text-sm sm:text-base">{t.name}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{t.title} · {t.company}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 sm:mt-8">
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-brand-primary" : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-200"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-200"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FloatingInput ─────────────────────────────────────────────────────────────

function FloatingInput({ field, value, onChange, hasError, delay }) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className={`relative border-2 rounded-2xl transition-all duration-200 overflow-hidden ${
          hasError
            ? "border-red-400"
            : focused
            ? "border-brand-primary shadow-[0_0_0_4px_theme(colors.brand.primary/15%)]"
            : value
            ? "border-brand-primary/40"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span
          className={`absolute left-4 pointer-events-none transition-all duration-200 ${
            isActive
              ? "top-2.5 text-[10px] font-bold text-brand-primary tracking-widest uppercase"
              : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
          }`}
        >
          {field.label}
        </span>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <field.icon size={15} className={`transition-colors duration-200 ${focused ? "text-brand-primary" : "text-gray-300"}`} />
        </div>
        <input
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isActive ? field.placeholder : ""}
          className="w-full pt-7 pb-3 px-4 text-gray-900 text-sm bg-transparent outline-none placeholder-gray-300"
        />
      </div>
      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-xs mt-1.5 ml-1"
          >
            Required field
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── ContactForm ───────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", workers: "", message: "" });
  const [step, setStep] = useState(0); // 0 = idle, 1 = loading, 2 = success
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !form.email.includes("@")) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStep(1);
    setTimeout(() => setStep(2), 2000);
  };

  const reset = () => {
    setStep(0);
    setForm({ name: "", company: "", email: "", phone: "", workers: "", message: "" });
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-brand-primary/10"
    >
      {/* Top gradient bar */}
      <div className="h-1.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" />

      <div className="p-6 sm:p-8 lg:p-12">
        <AnimatePresence mode="wait">

          {/* ── Success state ── */}
          {step === 2 ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="py-12 sm:py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={40} className="text-green-500" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-2xl sm:text-3xl font-black text-gray-900 mb-3"
              >
                Request Sent!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500 text-sm sm:text-base mb-8 max-w-xs mx-auto"
              >
                Our team will contact you within 24 hours with a tailored recruitment plan.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                onClick={reset}
                className="text-brand-primary text-sm font-semibold border border-brand-primary/30 px-5 py-2.5 rounded-xl hover:bg-brand-primary/5 transition-colors"
              >
                Send Another Enquiry
              </motion.button>
            </motion.div>

          ) : (

            /* ── Form state ── */
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }}>

              <div className="mb-7 sm:mb-10">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 leading-tight">
                  Become Our Next Success Story
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Free consultation · Response within 24 hours · No obligations
                </p>
              </div>

              {/* 2-col input grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                {formFields.map((field, i) => (
                  <FloatingInput
                    key={field.id}
                    field={field}
                    value={form[field.id]}
                    onChange={(v) => { setForm({ ...form, [field.id]: v }); setErrors({ ...errors, [field.id]: false }); }}
                    hasError={!!errors[field.id]}
                    delay={i * 0.08}
                  />
                ))}
              </div>

              {/* Workers needed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 sm:mb-5"
              >
                <div className="relative border-2 border-gray-200 hover:border-gray-300 focus-within:border-brand-primary focus-within:shadow-[0_0_0_4px_theme(colors.brand.primary/15%)] rounded-2xl transition-all duration-200 overflow-hidden">
                  <span className="absolute left-4 top-2.5 text-[10px] font-bold text-gray-400 tracking-widest uppercase pointer-events-none">
                    Workers Needed
                  </span>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Hash size={15} className="text-gray-300" />
                  </div>
                  <select
                    value={form.workers}
                    onChange={(e) => setForm({ ...form, workers: e.target.value })}
                    className="w-full pt-7 pb-3 px-4 text-gray-900 text-sm bg-transparent outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select a range</option>
                    {["1–10", "11–50", "51–200", "201–500", "500–1,000", "1,000+"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 sm:mb-8"
              >
                <div className="relative border-2 border-gray-200 hover:border-gray-300 focus-within:border-brand-primary focus-within:shadow-[0_0_0_4px_theme(colors.brand.primary/15%)] rounded-2xl transition-all duration-300 overflow-hidden">
                  <span className="absolute left-4 top-3 text-[10px] font-bold text-gray-400 tracking-widest uppercase pointer-events-none">
                    Message / Requirements
                  </span>
                  <div className="absolute right-4 top-3">
                    <FileText size={15} className="text-gray-300" />
                  </div>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe roles, industries, timeline, preferred countries..."
                    rows={4}
                    className="w-full pt-9 pb-4 px-4 text-gray-900 text-sm bg-transparent outline-none resize-none placeholder-gray-300"
                  />
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                disabled={step === 1}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-70 text-white font-bold py-3.5 sm:py-4 rounded-2xl transition-colors duration-200 shadow-lg shadow-brand-primary/30 flex items-center justify-center gap-3 text-sm sm:text-[15px]"
              >
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending your request…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <Send size={16} />
                      Send Enquiry — Get a Reply in 24h
                      <ArrowRight size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
                {/* Shimmer */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                />
              </motion.button>
            </motion.div>

          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#f8faff] font-sans">
      <Container>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#050f2e] via-[#0d2660] to-brand-primary py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-64 sm:w-[500px] h-64 sm:h-[500px] rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 sm:w-96 h-56 sm:h-96 rounded-full bg-brand-secondary/10 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-7 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-white/90 text-xs sm:text-sm font-semibold">
              300+ Organizations Trust Asliya Manpower
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5 sm:mb-6">
              The Companies
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-secondary/70">
                Betting On Us
              </span>
            </h1>
            <p className="text-base sm:text-xl text-blue-200 max-w-xl mx-auto leading-relaxed px-2">
              Same companies you compete with. Same companies your employees want to join.
            </p>
          </motion.div>

          {/* Hero stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 max-w-3xl mx-auto"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl py-4 sm:py-5 px-3 sm:px-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-black text-brand-secondary mb-1">{s.num}</div>
                <div className="text-blue-200 text-[10px] sm:text-xs font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f8faff] to-transparent" />
      </section>

      {/* ── Trust bar ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-4 sm:py-5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-8">
          {trustBadges.map((c, i) => (
            <motion.div
              key={c.text}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600"
            >
              <c.icon size={15} className="text-brand-primary shrink-0" />
              <span>{c.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Client cards ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
            >
              Our Trusted Partners
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }} viewport={{ once: true }}
              className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto"
            >
              Leading organisations across Qatar — construction, logistics, security, hospitality and beyond.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {clients.map((c, i) => <ClientCard key={c.name} client={c} index={i} />)}
          </div>

          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="text-center text-gray-400 mt-6 sm:mt-8 text-sm"
          >
            + 20 more corporate and government clients not listed
          </motion.p>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#f8faff]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }} viewport={{ once: true }}
              className="text-gray-500 text-base sm:text-lg"
            >
              Real quotes from real General Managers and HR leaders.
            </motion.p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── CTA + Form ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-brand-primary/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-5 sm:mb-6">
              Join 300+ Companies
              <br />
              <span className="text-brand-primary">That Already Trust Us</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              Every week you delay hiring costs money. We deliver pre-screened talent in 25–30 days — or faster. No excuses. FIFA projects prove it.
            </p>

            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {ctaPoints.map((p, i) => (
                <motion.li
                  key={p.text}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                  className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white rounded-xl border border-gray-100 hover:border-brand-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <p.icon size={17} className="text-brand-primary" />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">{p.text}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+97444434386"
                className="flex items-center justify-center gap-2.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold px-5 sm:px-6 py-3.5 rounded-xl transition-opacity shadow-lg shadow-brand-primary/30 text-sm sm:text-base"
              >
                <Phone size={15} /> +974 4443 4386
              </a>
              <a
                href="mailto:business@asliyarecruitment.com"
                className="flex items-center justify-center gap-2.5 border-2 border-brand-primary/30 text-brand-primary font-bold px-5 sm:px-6 py-3.5 rounded-xl hover:bg-brand-primary/5 transition-colors text-sm sm:text-base"
              >
                <Mail size={15} /> Email Us
              </a>
            </div>
          </motion.div>

          {/* Right form */}
          <ContactForm />
        </div>
      </section>
</Container>
    </div>
  );
}