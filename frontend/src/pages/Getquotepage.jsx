import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, User, Mail, Phone, MapPin, Globe,
  Users, Briefcase, CheckCircle, Send, MessageSquare,
  Clock, Shield, Award, TrendingUp, ChevronDown, ArrowRight
} from "lucide-react";

/* ─── Services list ─────────────────────────────────────────── */
const SERVICES = [
  "Domestic Recruitment",
  "Overseas Recruitment",
  "Mass Recruitment",
  "Executive Search",
  "Temporary Staffing",
  "Visa & Documentation",
  "Skilled Trade Deployment",
  "Mobilization Support",
];

const COMPANY_SIZES = [
  { label: "1 – 50",      sub: "Small business"  },
  { label: "51 – 200",    sub: "Growing company"  },
  { label: "201 – 1000",  sub: "Mid-size firm"    },
  { label: "1000+",       sub: "Enterprise"       },
];

const WHY_ITEMS = [
  { icon: Clock,     title: "24-hr Response",   desc: "We reply to every quote request within one business day — guaranteed." },
  { icon: Shield,    title: "No Obligation",     desc: "A free quote is exactly that — free. No commitment, no pressure." },
  { icon: Award,     title: "18 Yrs Experience", desc: "Nearly two decades of manpower placement expertise behind every quote." },
  { icon: TrendingUp,title: "Tailored Pricing",  desc: "We price based on your exact requirement — no generic packages." },
];

const CONTACT_ITEMS = [
  { icon: Phone,       label: "Call / WhatsApp", value: "+974 1234 5678"        },
  { icon: Mail,        label: "Email Us",        value: "info@recruitmax.com"   },
  { icon: MapPin,      label: "Our Office",      value: "Al Sadd, Doha, Qatar"  },
  { icon: Globe,       label: "Operating Hours", value: "Sun – Thu, 8am – 6pm"  },
];

/* ─── Field wrapper ──────────────────────────────────────────── */
function Field({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[12px] font-bold uppercase tracking-wider" style={{ color: "#475569" }}>
        {label}{required && <span style={{ color: "#e62224" }}> *</span>}
      </label>
      {children}
      {hint && <p className="text-[11px]" style={{ color: "#94a3b8" }}>{hint}</p>}
    </div>
  );
}

function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"><Icon size={14} color="#94a3b8" /></div>}
      <input
        className="w-full rounded-[11px] border px-4 py-[11px] text-[14px] outline-none transition-all duration-200"
        style={{ paddingLeft: Icon ? "40px" : "16px", borderColor: "rgba(21,72,149,0.14)", background: "rgba(255,255,255,0.9)", color: "#1e293b" }}
        onFocus={e => { e.target.style.borderColor = "#154895"; e.target.style.boxShadow = "0 0 0 3px rgba(21,72,149,0.1)"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(21,72,149,0.14)"; e.target.style.boxShadow = "none"; }}
        {...props}
      />
    </div>
  );
}

function Select({ icon: Icon, children, ...props }) {
  return (
    <div className="relative">
      {Icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"><Icon size={14} color="#94a3b8" /></div>}
      <select
        className="w-full rounded-[11px] border px-4 py-[11px] text-[14px] outline-none transition-all duration-200 appearance-none cursor-pointer"
        style={{ paddingLeft: Icon ? "40px" : "16px", paddingRight: "36px", borderColor: "rgba(21,72,149,0.14)", background: "rgba(255,255,255,0.9)", color: "#1e293b" }}
        onFocus={e => { e.target.style.borderColor = "#154895"; e.target.style.boxShadow = "0 0 0 3px rgba(21,72,149,0.1)"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(21,72,149,0.14)"; e.target.style.boxShadow = "none"; }}
        {...props}
      >
        {children}
      </select>
      <ChevronDown size={13} color="#94a3b8" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}

function Textarea(props) {
  return (
    <textarea
      rows={4}
      className="w-full rounded-[11px] border px-4 py-3 text-[14px] outline-none transition-all duration-200 resize-none"
      style={{ borderColor: "rgba(21,72,149,0.14)", background: "rgba(255,255,255,0.9)", color: "#1e293b" }}
      onFocus={e => { e.target.style.borderColor = "#154895"; e.target.style.boxShadow = "0 0 0 3px rgba(21,72,149,0.1)"; }}
      onBlur={e => { e.target.style.borderColor = "rgba(21,72,149,0.14)"; e.target.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

function ServiceCheckbox({ label, checked, onChange }) {
  return (
    <motion.button
      type="button"
      onClick={onChange}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 px-4 py-[10px] rounded-[11px] border-2 text-left transition-all duration-200"
      style={{
        borderColor: checked ? "#154895" : "rgba(21,72,149,0.1)",
        background: checked ? "rgba(21,72,149,0.06)" : "rgba(255,255,255,0.7)",
      }}
    >
      <div
        className="w-5 h-5 rounded-[5px] flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200"
        style={{ borderColor: checked ? "#154895" : "rgba(21,72,149,0.2)", background: checked ? "#154895" : "transparent" }}
      >
        {checked && <CheckCircle size={11} color="#fff" />}
      </div>
      <span className="text-[13px] font-semibold" style={{ color: checked ? "#154895" : "#475569" }}>{label}</span>
    </motion.button>
  );
}

/* ════════════════════════════════════════════════════════════
   GET FREE QUOTE PAGE
════════════════════════════════════════════════════════════ */
export default function GetFreeQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: "", contactName: "", email: "", phone: "",
    country: "", companySize: "", services: [], message: "",
    preferredContact: "email",
  });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleService = (s) =>
    setForm(f => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s],
    }));

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-5"
        style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[500px] w-full text-center rounded-[28px] p-12 border"
          style={{ background: "rgba(255,255,255,0.94)", borderColor: "rgba(21,72,149,0.1)", boxShadow: "0 24px 72px rgba(21,72,149,0.12)" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(21,72,149,0.08)" }}
          >
            <CheckCircle size={36} color="#154895" />
          </motion.div>
          <h2 className="font-black text-[28px] mb-3" style={{ color: "#1e293b", fontFamily: "'Playfair Display', Georgia, serif" }}>
            Quote Request Sent!
          </h2>
          <p className="text-[15px] leading-relaxed mb-2" style={{ color: "#64748b" }}>
            Thank you, <strong style={{ color: "#1e293b" }}>{form.contactName || "there"}</strong>!
          </p>
          <p className="text-[14px] leading-relaxed mb-8" style={{ color: "#64748b" }}>
            Our team will prepare a customized quote and reach you via <strong style={{ color: "#154895" }}>{form.preferredContact === "email" ? form.email : form.phone}</strong> within <strong style={{ color: "#154895" }}>24 hours</strong>.
          </p>
          <div className="rounded-[14px] p-5 mb-6 text-left" style={{ background: "rgba(21,72,149,0.05)", border: "1px solid rgba(21,72,149,0.1)" }}>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "#154895" }}>Services Requested</p>
            <div className="flex flex-wrap gap-2">
              {(form.services.length ? form.services : ["Not specified"]).map(s => (
                <span key={s} className="text-[11.5px] font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(21,72,149,0.08)", color: "#154895" }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a href="/request-manpower" className="inline-flex items-center justify-center gap-2 text-[14px] font-bold py-3 px-6 rounded-[11px] text-white" style={{ background: "#154895" }}>
              Request Specific Manpower <ArrowRight size={14} />
            </a>
            <a href="/" className="inline-flex items-center justify-center gap-2 text-[14px] font-bold py-3 px-6 rounded-[11px] border-2" style={{ color: "#154895", borderColor: "rgba(21,72,149,0.2)" }}>
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}>
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute rounded-full" style={{ width: 700, height: 400, top: "-10%", right: "-10%", background: "radial-gradient(ellipse, rgba(21,72,149,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "5%", left: "-8%", background: "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #154895 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 py-16 sm:py-24" style={{ zIndex: 2 }}>

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(21,72,149,0.06)", borderColor: "rgba(21,72,149,0.14)", color: "#154895" }}>
            <span className="w-[6px] h-[6px] rounded-full" style={{ background: "#e62224", animation: "pulse-dot 2s ease-in-out infinite" }} />
            Free Consultation
          </div>
          <h1 className="font-black leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 48px)", fontFamily: "'Playfair Display', Georgia, serif", color: "#1e293b" }}>
            Get Your <span style={{ color: "#154895" }}>Free Quote</span>
          </h1>
          <p className="text-[15.5px] max-w-xl mx-auto leading-relaxed" style={{ color: "#64748b" }}>
            Tell us about your manpower needs — we'll prepare a detailed, custom proposal at no cost, with no strings attached.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

          {/* ── LEFT: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[24px] border p-8 sm:p-10"
            style={{ background: "rgba(255,255,255,0.88)", borderColor: "rgba(21,72,149,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 8px 40px rgba(21,72,149,0.08)" }}
          >
            <h2 className="font-black text-[20px] mb-7" style={{ color: "#1e293b", fontFamily: "'Playfair Display', Georgia, serif" }}>
              Your Details
            </h2>

            <div className="space-y-8">
              {/* Company info */}
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Company Name" required>
                  <Input icon={Building2} placeholder="Your company name" value={form.companyName} onChange={e => update("companyName", e.target.value)} />
                </Field>
                <Field label="Contact Person" required>
                  <Input icon={User} placeholder="Your full name" value={form.contactName} onChange={e => update("contactName", e.target.value)} />
                </Field>
                <Field label="Email Address" required>
                  <Input icon={Mail} type="email" placeholder="you@company.com" value={form.email} onChange={e => update("email", e.target.value)} />
                </Field>
                <Field label="Phone / WhatsApp" required>
                  <Input icon={Phone} type="tel" placeholder="+974 00 000 000" value={form.phone} onChange={e => update("phone", e.target.value)} />
                </Field>
                <Field label="Country">
                  <Input icon={MapPin} placeholder="Where are you based?" value={form.country} onChange={e => update("country", e.target.value)} />
                </Field>
                <Field label="Company Size">
                  <Select icon={Users} value={form.companySize} onChange={e => update("companySize", e.target.value)}>
                    <option value="">Select size...</option>
                    {COMPANY_SIZES.map(s => <option key={s.label} value={s.label}>{s.label} employees ({s.sub})</option>)}
                  </Select>
                </Field>
              </div>

              {/* Services */}
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider mb-4" style={{ color: "#475569" }}>
                  Services of Interest <span style={{ color: "#e62224" }}>*</span>
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SERVICES.map(s => (
                    <ServiceCheckbox
                      key={s}
                      label={s}
                      checked={form.services.includes(s)}
                      onChange={() => toggleService(s)}
                    />
                  ))}
                </div>
              </div>

              {/* Message */}
              <Field label="Tell Us More" hint="Describe your requirement, expected timeline, source country preference, etc.">
                <Textarea
                  placeholder="e.g. We need 50 construction workers for a project in Riyadh starting March. Preferred source: Nepal or India..."
                  value={form.message}
                  onChange={e => update("message", e.target.value)}
                />
              </Field>

              {/* Preferred contact */}
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>Preferred Contact Method</p>
                <div className="flex gap-3">
                  {["email", "phone", "whatsapp"].map(m => (
                    <motion.button
                      key={m}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => update("preferredContact", m)}
                      className="flex-1 py-[10px] rounded-[10px] border-2 text-[12.5px] font-bold capitalize transition-all duration-200"
                      style={{
                        borderColor: form.preferredContact === m ? "#154895" : "rgba(21,72,149,0.12)",
                        background: form.preferredContact === m ? "rgba(21,72,149,0.07)" : "rgba(255,255,255,0.7)",
                        color: form.preferredContact === m ? "#154895" : "#475569",
                      }}
                    >
                      {m === "whatsapp" ? "WhatsApp" : m.charAt(0).toUpperCase() + m.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="button"
                onClick={() => setSubmitted(true)}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(21,72,149,0.42)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-2 text-[15px] font-bold py-4 rounded-[13px] text-white transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #0a1f42 0%, #154895 60%, #1a58b8 100%)", boxShadow: "0 4px 20px rgba(21,72,149,0.32)" }}
              >
                <Send size={16} />
                Get My Free Quote
              </motion.button>

              <p className="text-center text-[11.5px]" style={{ color: "#94a3b8" }}>
                By submitting, you agree to be contacted by our team. No spam, ever.
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Why + contact ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Why section */}
            <div
              className="rounded-[22px] border p-7"
              style={{ background: "rgba(255,255,255,0.88)", borderColor: "rgba(21,72,149,0.1)", backdropFilter: "blur(14px)", boxShadow: "0 4px 24px rgba(21,72,149,0.07)" }}
            >
              <h3 className="font-black text-[17px] mb-6" style={{ color: "#1e293b", fontFamily: "'Playfair Display', Georgia, serif" }}>
                Why Get a Quote?
              </h3>
              <div className="space-y-5">
                {WHY_ITEMS.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: "rgba(21,72,149,0.07)" }}>
                      <Icon size={17} color="#154895" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-bold text-[13.5px] mb-[3px]" style={{ color: "#1e293b" }}>{title}</p>
                      <p className="text-[12px] leading-relaxed" style={{ color: "#64748b" }}>{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div
              className="rounded-[22px] overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0a1f42 0%, #154895 60%, #1d5eaa 100%)", boxShadow: "0 16px 48px rgba(21,72,149,0.28)" }}
            >
              <div className="relative p-7">
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 10% 90%, rgba(230,34,36,0.18) 0%, transparent 50%)" }} />
                <div className="relative z-10">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Prefer to talk?</p>
                  <h3 className="font-black text-[18px] text-white mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Reach Us Directly
                  </h3>
                  <div className="space-y-4">
                    {CONTACT_ITEMS.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                          <Icon size={15} color="rgba(255,255,255,0.75)" strokeWidth={1.8} />
                        </div>
                        <div>
                          <p className="text-[10.5px] font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
                          <p className="text-[13px] font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <motion.a
                    href="https://wa.me/97412345678"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 text-[13.5px] font-bold py-3 rounded-[11px] transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.22)" }}
                  >
                    <MessageSquare size={14} />
                    Chat on WhatsApp
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Testimonial mini */}
            <div
              className="rounded-[18px] border p-6"
              style={{ background: "rgba(255,255,255,0.88)", borderColor: "rgba(21,72,149,0.08)", backdropFilter: "blur(14px)" }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                ))}
              </div>
              <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#475569" }}>
                "We received a detailed proposal within 6 hours. Within 3 weeks, 40 workers were deployed to our site in Dubai. Exceptional service."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[13px] text-white" style={{ background: "#154895" }}>AH</div>
                <div>
                  <p className="text-[12.5px] font-bold" style={{ color: "#1e293b" }}>Ahmed Hassan</p>
                  <p className="text-[11px]" style={{ color: "#94a3b8" }}>Project Director, Dubai</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.6} }
      `}</style>
    </div>
  );
}