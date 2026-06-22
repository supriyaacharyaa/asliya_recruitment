import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Building2,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Shield,
  ChevronLeft,
  ChevronRight,
  Quote,
  Users,
  Globe,
  Zap,
  TrendingUp,
  Send,
  User,
  Briefcase,
  Hash,
  FileText,
} from "lucide-react";
import { clientsData as clients } from "../mockData";

const testimonials = [
  {
    quote:
      "Asliya has consistently demonstrated the ability to manage high-volume recruitment campaigns and mobilize workers from Africa and Asia within demanding timeframes. Their professionalism is unmatched.",
    name: "Mr. Sami Kayed Mohammad Hindawa",
    title: "General Manager",
    company: "Al Misnad Services",
    initials: "SH",
    rating: 5,
    tag: "High-Volume Capability",
  },
  {
    quote:
      "They mobilized 4,000+ workers simultaneously without compromising quality. Asliya continues to support our current projects and we look forward to maintaining our long-term relationship.",
    name: "Ahmed Abdrabbo",
    title: "General Manager",
    company: "Draieh Contracting",
    initials: "AA",
    rating: 5,
    tag: "4,000+ Workers at Once",
  },
  {
    quote:
      "We are happy to work with Asliya Manpower Supply and confidently recommend their services to any organization requiring bulk manpower recruitment.",
    name: "Mr. Antonie Ready",
    title: "Manager",
    company: "BUTEC Qatar",
    initials: "AR",
    rating: 5,
    tag: "Bulk Manpower",
  },
  {
    quote:
      "This recognition is awarded in recognition of exceptional dedication, professionalism and unwavering commitment to providing excellent manpower supply services.",
    name: "Management Team",
    title: "Awards Committee",
    company: "European Guarding Security Services",
    initials: "EG",
    rating: 5,
    tag: "Award for Excellence",
  },
  {
    quote:
      "We confidently recommend their services to other organizations. Asliya has been a consistently reliable partner across multiple projects and continues to exceed our expectations.",
    name: "Sajimon Sebastian",
    title: "HR & Admin Manager",
    company: "GASCO",
    initials: "SS",
    rating: 5,
    tag: "Consistently Reliable",
  },
];

const stats = [
  { num: "300+", label: "Corporate Clients", icon: Building2 },
  { num: "20,000+", label: "Workers Deployed", icon: Users },
  { num: "28+", label: "Source Countries", icon: Globe },
  { num: "25–30", label: "Days Avg. Deploy", icon: Zap },
];

// Glassmorphism card style helper
const glassCard =
  "bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_4px_24px_rgba(21,72,149,0.08)]";

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${glassCard} rounded-2xl p-7 overflow-hidden group hover:shadow-[0_8px_32px_rgba(21,72,149,0.16)] transition-shadow duration-300`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#154895]/0 to-[#154895]/0 group-hover:from-[#154895]/5 group-hover:to-[#e62224]/5 transition-all duration-500 rounded-2xl" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#154895]/10 flex items-center justify-center mb-5 group-hover:bg-[#154895] transition-colors duration-300">
          <stat.icon size={22} className="text-[#154895] group-hover:text-white transition-colors duration-300" />
        </div>
        <motion.div
          className="text-4xl font-black text-gray-900 mb-1 tabular-nums"
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

// FIX 3: Use React state for logo fallback instead of direct DOM manipulation
function ClientCard({ client, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [logoError, setLogoError] = useState(false);
  const getAvatarColor = (str = "") => {
  const colors = [
    { bg: "#EEF2FF", text: "#4338CA" },
    { bg: "#F0FDF4", text: "#15803D" },
    { bg: "#FFF7ED", text: "#C2410C" },
    { bg: "#FDF4FF", text: "#9333EA" },
    { bg: "#F0F9FF", text: "#0369A1" },
    { bg: "#FFF1F2", text: "#BE123C" },
    { bg: "#F7FEE7", text: "#4D7C0F" },
    { bg: "#FFFBEB", text: "#B45309" },
  ];
  const index = str.charCodeAt(0) % colors.length;
  return colors[index];
};

const avatarColor = getAvatarColor(client.abbr || client.name);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: (index % 10) * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      // FIX 4: duration-400 is not a valid Tailwind class — changed to duration-300
      className={`group relative ${glassCard} rounded-2xl p-4 sm:p-5 hover:border-[#154895]/30 hover:shadow-[0_8px_32px_rgba(21,72,149,0.14)] transition-all duration-300 cursor-default overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#154895]/0 to-[#154895]/0 group-hover:from-[#154895]/5 group-hover:to-white/50 transition-all duration-300 rounded-2xl" />
      <div className="relative z-10">
        {/* <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 overflow-hidden transition-colors duration-300">
          {client.logo && !logoError ? (
            <img
              src={client.logo}
              alt={client.name || client.abbr}
              className="w-full h-full object-contain p-1.5"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
            </div>
          )}
        </div> */}
  {/* <motion.div
  className="w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] flex items-center justify-center overflow-hidden flex-shrink-0"
  style={{
    background: (!client.logo || logoError) ? avatarColor.bg : "transparent",
    border: (!client.logo || logoError) ? `1.5px solid ${avatarColor.text}22` : "none",
  }}
  whileHover={{ scale: 1.08, rotate: -3 }}
  transition={{ type: "spring", stiffness: 400, damping: 15 }}
>
  {client.logo && !logoError ? (
    <img
      src={client.logo}
      alt={client.name || client.abbr}
      className="w-full h-full object-contain p-1.5"
      onError={() => setLogoError(true)}
    />
  ) : (
    <span
      className="text-[11px] sm:text-[12px] font-black tracking-wide leading-none text-center px-1"
      style={{ color: avatarColor.text }}
    >
      {client.abbr || (client.name?.slice(0, 4).toUpperCase()) || "CORP"}
    </span>
  )}
</motion.div> */}
<motion.div
  className="w-32 h-24 sm:w-32 sm:h-24 rounded-[12px] flex items-center justify-center overflow-hidden flex-shrink-0"
  style={{
    background: (!client.logo || logoError) ? avatarColor.bg : "transparent",
    border: (!client.logo || logoError) ? `1.5px solid ${avatarColor.text}22` : "none",
  }}
  whileHover={{ scale: 1.08, rotate: -3 }}
  transition={{ type: "spring", stiffness: 400, damping: 15 }}
>
  {client.logo && !logoError ? (
    <img
      src={client.logo}
      alt={client.name || client.abbr}
      className="w-full h-full object-contain p-0.5"
      onError={() => setLogoError(true)}
    />
  ) : (
    <span
      className="text-[11px] sm:text-[12px] font-black tracking-wide leading-none text-center px-1"
      style={{ color: avatarColor.text }}
    >
      {client.abbr || (client.name?.slice(0, 4).toUpperCase()) || "CORP"}
    </span>
  )}
</motion.div>

        <div className="text-[12.5px] sm:text-[13.5px] font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
          {client.name}
        </div>

        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="text-[9.5px] sm:text-[10.5px] font-semibold text-[#154895] bg-[#154895]/10 px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap">
            {client.sector}
          </span>
          <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium whitespace-nowrap">
            {client.workers} placed
          </span>
        </div>
      </div>
    </motion.div>
  

  );
}

function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`${glassCard} rounded-3xl p-10 lg:p-14`}
          >
            <div className="flex items-start gap-5 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#154895] to-[#1a5ab5] flex items-center justify-center text-white text-lg font-black flex-shrink-0 shadow-lg">
                {testimonials[active].initials}
              </div>
              <div>
                <span className="inline-block bg-[#e62224]/10 text-[#e62224] text-xs font-bold px-3 py-1.5 rounded-full mb-2">
                  {testimonials[active].tag}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#154895" className="text-[#154895]" />
                  ))}
                </div>
              </div>
              <Quote size={40} className="ml-auto text-[#154895]/10 flex-shrink-0 hidden sm:block" />
            </div>

            <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-8 font-light">
              "{testimonials[active].quote}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-[#154895]/10">
              <div>
                <div className="font-bold text-gray-900">{testimonials[active].name}</div>
                <div className="text-gray-500 text-sm">
                  {testimonials[active].title} · {testimonials[active].company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "bg-[#154895] w-8" : "bg-[#154895]/20 w-2 hover:bg-[#154895]/40"}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-xl border border-[#154895]/20 flex items-center justify-center hover:bg-[#154895] hover:border-[#154895] hover:text-white text-gray-500 transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-xl border border-[#154895]/20 flex items-center justify-center hover:bg-[#154895] hover:border-[#154895] hover:text-white text-gray-500 transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

const fields = [
  { id: "name", label: "Full Name", placeholder: "Your full name", icon: User, type: "text" },
  { id: "company", label: "Company Name", placeholder: "Your company", icon: Briefcase, type: "text" },
  { id: "email", label: "Email Address", placeholder: "you@company.com", icon: Mail, type: "email" },
  { id: "phone", label: "Phone / WhatsApp", placeholder: "+974 ...", icon: Phone, type: "tel" },
];

function FloatingInput({ field, value, onChange, delay }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isActive = focused || hasValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className={`relative border-2 rounded-2xl transition-all duration-300 overflow-hidden bg-white/80 ${
          focused
            ? "border-[#154895] shadow-[0_0_0_4px_rgba(21,72,149,0.10)]"
            : hasValue
              ? "border-[#154895]/40"
              : "border-gray-200 hover:border-[#154895]/30"
        }`}
      >
        {/* FIX 2: duration-250 is not a valid Tailwind class — changed to duration-200 */}
        <div
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            isActive
              ? "top-2.5 text-[10px] font-bold text-[#154895] tracking-wide uppercase"
              : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
          }`}
        >
          {field.label}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <field.icon size={16} className={`transition-colors duration-200 ${focused ? "text-[#154895]" : "text-gray-300"}`} />
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
    </motion.div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", workers: "", message: "" });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !form.email.includes("@")) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitError("");
    setStep(1);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          fullName: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          workers: form.workers,
          message: form.message,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setStep(2);
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
        setStep(0);
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to send. Please check your connection and try again.");
      setStep(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className={`relative ${glassCard} rounded-3xl overflow-hidden`}
    >
      {/* Top accent bar: blue → red → blue */}
      <div className="h-1.5 bg-gradient-to-r from-[#154895] via-[#e62224] to-[#154895]" />

      <div className="p-8 lg:p-12">
        <AnimatePresence mode="wait">
          {step === 2 ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-24 h-24 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={44} className="text-green-500" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-black text-gray-900 mb-3"
              >
                Request Sent!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="text-gray-500 mb-8 max-w-sm mx-auto"
              >
                Our team will contact you within 24 hours with a tailored recruitment plan.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => { setStep(0); setForm({ name: "", company: "", email: "", phone: "", workers: "", message: "" }); }}
                className="text-[#154895] font-semibold text-sm border border-[#154895]/30 px-5 py-2.5 rounded-xl hover:bg-[#154895]/10 transition-colors"
              >
                Send Another Enquiry
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h3 className="text-3xl font-black text-gray-900 mb-2">Become Our Next Success Story</h3>
                <p className="text-gray-500">Free consultation · Response within 24 hours · No obligations</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {fields.map((field, i) => (
                  <div key={field.id} className="relative">
                    <FloatingInput
                      field={field}
                      value={form[field.id]}
                      onChange={(v) => { setForm({ ...form, [field.id]: v }); setErrors({ ...errors, [field.id]: false }); }}
                      delay={i * 0.08}
                    />
                    <AnimatePresence>
                      {errors[field.id] && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#e62224] text-xs mt-1.5 ml-1"
                        >
                          Required field
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mb-5"
              >
                <div className="relative border-2 border-gray-200 hover:border-[#154895]/30 rounded-2xl transition-colors duration-200 overflow-hidden bg-white/80">
                  <div className="absolute left-4 top-2.5 text-[10px] font-bold text-gray-400 tracking-wide uppercase">Workers Needed</div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Hash size={16} className="text-gray-300" />
                  </div>
                  <select
                    value={form.workers}
                    onChange={(e) => setForm({ ...form, workers: e.target.value })}
                    className="w-full pt-7 pb-3 px-4 text-gray-900 text-sm bg-transparent outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select a range</option>
                    <option>1–10</option>
                    <option>11–50</option>
                    <option>51–200</option>
                    <option>201–500</option>
                    <option>500–1,000</option>
                    <option>1,000+</option>
                  </select>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
              >
                <div className="relative border-2 border-gray-200 hover:border-[#154895]/30 focus-within:border-[#154895] focus-within:shadow-[0_0_0_4px_rgba(21,72,149,0.10)] rounded-2xl transition-all duration-300 overflow-hidden bg-white/80">
                  <div className="absolute left-4 top-3 text-[10px] font-bold text-gray-400 tracking-wide uppercase">Message / Requirements</div>
                  <div className="absolute right-4 top-3">
                    <FileText size={16} className="text-gray-300" />
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

              {/* FIX 1: Render submitError so the user sees API failure messages */}
              <AnimatePresence>
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[#e62224] text-sm mb-4 text-center font-medium"
                  >
                    {submitError}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleSubmit}
                disabled={step === 1}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden bg-[#154895] hover:bg-[#1a5ab5] disabled:bg-[#154895]/70 text-white font-bold py-4 rounded-2xl transition-colors duration-200 shadow-xl shadow-[#154895]/25 flex items-center justify-center gap-3 text-[15px]"
              >
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div key="loading" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      Sending your request...
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                      <Send size={17} />
                      Send Enquiry — Get a Reply in 24h
                      <ArrowRight size={16} className="ml-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
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

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#f4f8ff] font-sans">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#0d2e6e] via-[#154895] to-[#1a5ab5] py-16 px-5 sm:px-8 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#e62224]/15 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        {/* red top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e62224] to-transparent opacity-80" />

        <div className="relative max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#e62224] animate-pulse" />
              <span className="text-white/90 text-sm font-semibold">300+ Organizations Trust Asliya Manpower</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              The Companies
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b6b] to-[#e62224]">
                Betting On Us
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
              Same companies you compete with. Same companies your employees want to join.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl py-5 px-4 text-center"
              >
                <div className="text-3xl font-black text-white mb-1">{s.num}</div>
                <div className="text-white/50 text-xs font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f4f8ff] to-transparent" />
      </section>

      {/* TRUST BAR */}
      <section className="bg-white/80 backdrop-blur-md border-b border-[#154895]/10 py-5 px-5 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: Shield, text: "Ministry of Labor Qatar — License #618" },
            { icon: Award, text: "Supreme Committee Approved · FIFA Standard" },
            { icon: CheckCircle, text: "Qatar Labor Law Compliant" },
            { icon: TrendingUp, text: "7+ Years in Business" },
          ].map((c, i) => (
            <motion.div
              key={c.text}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-600"
            >
              <c.icon size={16} className="text-[#154895]" />
              {c.text}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLIENT GRID */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
            >
              Our Trusted Partners
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-500 text-lg"
            >
              Leading organizations across Qatar — construction, logistics, security, hospitality and beyond.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {clients.map((c, i) => (
              <ClientCard key={c.name} client={c} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mt-8 text-sm"
          >
            + 20 more corporate and government clients not listed
          </motion.p>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-16 px-5 sm:px-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-5 sm:px-8 bg-[#f4f8ff]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-500 text-lg"
            >
              Real quotes from real General Managers and HR leaders.
            </motion.p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA + FORM */}
      <section className="py-24 px-5 sm:px-8 bg-gradient-to-b from-white/60 to-[#154895]/8">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
              Join 300+ Companies
              <br />
              <span className="text-[#154895]">That Already Trust Us</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Every week you delay hiring costs money. We deliver pre-screened talent in 25–30 days — or faster. No excuses. FIFA projects prove it.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { icon: Zap, text: "Workers deployed in 25–40 days" },
                { icon: Shield, text: "100% compliant — Ministry of Labor Licensed" },
                { icon: Users, text: "Bulk hiring from 28+ source countries" },
                { icon: CheckCircle, text: "4,000+ workers in a single deployment" },
              ].map((p, i) => (
                <motion.div
                  key={p.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 p-4 ${glassCard} rounded-xl hover:border-[#154895]/30 hover:shadow-[0_4px_20px_rgba(21,72,149,0.12)] transition-all duration-200`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#154895]/10 flex items-center justify-center flex-shrink-0">
                    <p.icon size={18} className="text-[#154895]" />
                  </div>
                  <span className="font-semibold text-gray-800">{p.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+97444434386"
                className="flex items-center gap-2.5 bg-[#154895] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#1a5ab5] transition-colors shadow-lg shadow-[#154895]/25"
              >
                <Phone size={16} /> +974 4443 4386
              </a>
              <a
                href="mailto:business@asliyarecruitment.com"
                className="flex items-center gap-2.5 border-2 border-[#e62224]/30 text-[#e62224] font-bold px-6 py-3.5 rounded-xl hover:bg-[#e62224]/8 transition-colors"
              >
                <Mail size={16} /> Email Us
              </a>
            </div>
          </motion.div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}