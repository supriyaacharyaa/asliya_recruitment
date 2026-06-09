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
  MessageCircle,
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
  X,
} from "lucide-react";

const clients = [
  { name: "Gulf Warehousing Company", sector: "Logistics", workers: "400+" },
  { name: "Milaha", sector: "Maritime & Logistics", workers: "300+" },
  { name: "Al Rayyan Projects", sector: "Construction", workers: "250+" },
  { name: "Mowasalat", sector: "Transport", workers: "200+" },
  { name: "BUTEC Qatar", sector: "Engineering", workers: "600+" },
  { name: "Draieh Contracting", sector: "Construction", workers: "4,000+" },
  { name: "GASCO", sector: "Oil & Gas", workers: "180+" },
  { name: "Certis GSSCI", sector: "Security", workers: "350+" },
  { name: "Al Misnad Services", sector: "Facilities", workers: "500+" },
  { name: "European Guarding Security", sector: "Security", workers: "220+" },
  { name: "Qatar Foundation", sector: "Education", workers: "120+" },
  { name: "Nakilat", sector: "Shipping", workers: "90+" },
  { name: "Ashghal", sector: "Infrastructure", workers: "280+" },
  { name: "Qatar Rail", sector: "Transport", workers: "160+" },
  { name: "Barwa Group", sector: "Real Estate", workers: "110+" },
  { name: "QTerminals", sector: "Port Operations", workers: "140+" },
  { name: "Ooredoo", sector: "Telecom", workers: "70+" },
  { name: "Gulf International", sector: "Construction", workers: "190+" },
  { name: "Qatar Projects", sector: "Engineering", workers: "210+" },
  { name: "Al Waha Contracting", sector: "Construction", workers: "130+" },
];

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

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white rounded-2xl border border-gray-100 p-7 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/0 to-[#0A1628]/0 group-hover:from-[#0A1628]/5 group-hover:to-[#C9A84C]/10 transition-all duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-5 group-hover:bg-[#0A1628] transition-colors duration-300">
          <stat.icon size={22} className="text-[#0A1628] group-hover:text-[#C9A84C] transition-colors duration-300" />
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

function ClientCard({ client, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: (index % 10) * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#C9A84C]/40 hover:shadow-lg transition-all duration-300 cursor-default overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/0 to-[#C9A84C]/0 group-hover:from-[#C9A84C]/5 group-hover:to-white transition-all duration-400" />
      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-3 group-hover:bg-[#0A1628] transition-colors duration-300">
          <Building2 size={18} className="text-[#0A1628] group-hover:text-[#C9A84C] transition-colors duration-300" />
        </div>
        <div className="text-[13.5px] font-bold text-gray-900 mb-1 leading-tight">{client.name}</div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10.5px] font-semibold text-[#0A1628] bg-[#C9A84C]/10 px-2.5 py-1 rounded-full">
            {client.sector}
          </span>
          <span className="text-[11px] text-gray-400 font-medium">{client.workers} placed</span>
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
            className="bg-white border border-gray-100 rounded-3xl p-10 lg:p-14"
          >
            <div className="flex items-start gap-5 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A1628] to-[#0d2245] flex items-center justify-center text-[#C9A84C] text-lg font-black flex-shrink-0 shadow-lg">
                {testimonials[active].initials}
              </div>
              <div>
                <span className="inline-block bg-[#C9A84C]/10 text-[#0A1628] text-xs font-bold px-3 py-1.5 rounded-full mb-2">
                  {testimonials[active].tag}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#C9A84C" className="text-[#C9A84C]" />
                  ))}
                </div>
              </div>
              <Quote size={40} className="ml-auto text-gray-100 flex-shrink-0 hidden sm:block" />
            </div>

            <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-8 font-light">
              "{testimonials[active].quote}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
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
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "bg-[#C9A84C] w-8" : "bg-gray-200 w-2 hover:bg-gray-300"}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#0A1628] hover:border-[#0A1628] hover:text-[#C9A84C] text-gray-500 transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#0A1628] hover:border-[#0A1628] hover:text-[#C9A84C] text-gray-500 transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

const fields = [
  { id: "name", label: "Full Name", placeholder: "Your full name", icon: User, type: "text", span: 1 },
  { id: "company", label: "Company Name", placeholder: "Your company", icon: Briefcase, type: "text", span: 1 },
  { id: "email", label: "Email Address", placeholder: "you@company.com", icon: Mail, type: "email", span: 1 },
  { id: "phone", label: "Phone / WhatsApp", placeholder: "+974 ...", icon: Phone, type: "tel", span: 1 },
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
        className={`relative border-2 rounded-2xl transition-all duration-300 overflow-hidden ${
          focused
            ? "border-[#C9A84C] shadow-[0_0_0_4px_rgba(201,168,76,0.12)]"
            : hasValue
              ? "border-[#C9A84C]/40"
              : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div
          className={`absolute left-4 transition-all duration-250 pointer-events-none ${
            isActive
              ? "top-2.5 text-[10px] font-bold text-[#0A1628] tracking-wide uppercase"
              : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
          }`}
        >
          {field.label}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <field.icon size={16} className={`transition-colors duration-200 ${focused ? "text-[#C9A84C]" : "text-gray-300"}`} />
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="relative bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-[#0A1628]/10"
    >
      <div className="h-1.5 bg-gradient-to-r from-[#0A1628] via-[#C9A84C] to-[#0A1628]" />

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
                className="text-[#0A1628] font-semibold text-sm border border-[#C9A84C]/40 px-5 py-2.5 rounded-xl hover:bg-[#C9A84C]/10 transition-colors"
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
                          className="text-red-500 text-xs mt-1.5 ml-1"
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
                <div className="relative border-2 border-gray-200 hover:border-gray-300 rounded-2xl transition-colors duration-200 overflow-hidden">
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
                <div className="relative border-2 border-gray-200 hover:border-gray-300 focus-within:border-[#C9A84C] focus-within:shadow-[0_0_0_4px_rgba(201,168,76,0.12)] rounded-2xl transition-all duration-300 overflow-hidden">
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

              <motion.button
                onClick={handleSubmit}
                disabled={step === 1}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden bg-[#0A1628] hover:bg-[#0d2245] disabled:bg-[#0A1628]/70 text-white font-bold py-4 rounded-2xl transition-colors duration-200 shadow-xl shadow-[#0A1628]/30 flex items-center justify-center gap-3 text-[15px]"
              >
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div key="loading" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-[#C9A84C] rounded-full" />
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
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent -skew-x-12"
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
    <div className="min-h-screen bg-[#f8f9fc] font-sans">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#060d1f] via-[#0A1628] to-[#0d2245] py-28 px-5 sm:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#C5282B]/10 translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-70" />

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
              <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
              <span className="text-white/90 text-sm font-semibold">300+ Organizations Trust Asliya Manpower</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              The Companies
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#e8cc7a]">
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
                className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl py-5 px-4 text-center"
              >
                <div className="text-3xl font-black text-[#C9A84C] mb-1">{s.num}</div>
                <div className="text-white/50 text-xs font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f8f9fc] to-transparent" />
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-b border-gray-100 py-5 px-5 sm:px-8">
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
              <c.icon size={16} className="text-[#C9A84C]" />
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
      <section className="py-16 px-5 sm:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-5 sm:px-8 bg-[#f8f9fc]">
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
      <section className="py-24 px-5 sm:px-8 bg-gradient-to-b from-white to-[#C9A84C]/8">
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
              <span className="text-[#0A1628]">That Already Trust Us</span>
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
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#C9A84C]/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <p.icon size={18} className="text-[#0A1628]" />
                  </div>
                  <span className="font-semibold text-gray-800">{p.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+97444434386"
                className="flex items-center gap-2.5 bg-[#0A1628] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#0d2245] transition-colors shadow-lg"
              >
                <Phone size={16} className="text-[#C9A84C]" /> +974 4443 4386
              </a>
              <a
                href="mailto:business@asliyarecruitment.com"
                className="flex items-center gap-2.5 border-2 border-[#C9A84C]/40 text-[#0A1628] font-bold px-6 py-3.5 rounded-xl hover:bg-[#C9A84C]/10 transition-colors"
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