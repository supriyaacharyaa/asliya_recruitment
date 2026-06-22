import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone, Mail, MapPin, Send, CheckCircle, ChevronDown,
  Plus, Minus, Linkedin, Facebook, Instagram,
  Clock, Shield, Star, Users
} from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Container from "../components/ui/Container"
import SectionHeading from "../components/ui/SectionHeading"
import axios from "axios";
import api from "../Axios/Axios"

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.1 },
  }),
}

const FAQS = [
  {
    q: "What information should I prepare before contacting you?",
    a: "For employers, have your job requirements, headcount, preferred countries, and target start date ready. For job seekers, an updated CV and your preferred role or destination country helps us assist you faster.",
  },
  {
    q: "How quickly will you respond to my enquiry?",
    a: "We aim to respond to all inquiries within 24 business hours. For urgent manpower needs, call us directly at +974 4443 4386 — our team is available Sun–Thu, 8am–6pm.",
  },
  {
    q: "Can I visit your office without an appointment?",
    a: "Walk-ins are welcome during business hours at our Doha office. Scheduling an appointment in advance ensures a dedicated consultant is available to give you their full attention.",
  },
  {
    q: "Which countries do you source workers from?",
    a: "We source from 28+ countries across Asia, Africa, Europe, and the Middle East — including India, Philippines, Pakistan, Nepal, Bangladesh, Ghana, Kenya, Nigeria, and more.",
  },
  {
    q: "Is there a fee for job seekers?",
    a: "No. Our recruitment services are completely free for job seekers. We are compensated by the hiring employers, never by candidates.",
  },
  {
    q: "How do I submit a CV or manpower request?",
    a: "You can use the contact form on this page, email us at info@asliyarecruitment.com, or call +974 4443 4386. For bulk hiring enquiries, include your required headcount, roles, and timeline.",
  },
]

const BG_CSS = `
  @keyframes blob-drift-1 {
    0%,100%{ transform:scale(1) translate(0,0); opacity:.16; }
    40%    { transform:scale(1.18) translate(28px,-18px); opacity:.24; }
    70%    { transform:scale(.9)  translate(-16px,12px); opacity:.12; }
  }
  @keyframes blob-drift-2 {
    0%,100%{ transform:scale(1.1) translate(0,0); opacity:.10; }
    35%    { transform:scale(.88) translate(-22px,16px); opacity:.18; }
    65%    { transform:scale(1.22) translate(14px,-10px); opacity:.08; }
  }
  .blob-1 { animation: blob-drift-1 11s ease-in-out infinite; }
  .blob-2 { animation: blob-drift-2 14s ease-in-out infinite; }

  @keyframes spin-ring { to { transform: rotate(360deg); } }
  .ring-cw  { animation: spin-ring 24s linear infinite; }
  .ring-ccw { animation: spin-ring 30s linear infinite reverse; }

  @keyframes hero-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .shimmer-text {
    background: linear-gradient(90deg,#fff 0%,rgba(255,255,255,.35) 40%,#fff 60%,rgba(255,255,255,.35) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: hero-shimmer 4s linear infinite;
  }

  .glass-card {
    background: rgba(255,255,255,0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.9);
    box-shadow: 0 4px 24px rgba(21,72,149,0.08), 0 1px 4px rgba(21,72,149,0.04);
  }
  .glass-card-hover {
    transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s;
  }
  .glass-card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 48px rgba(21,72,149,0.13), 0 1px 4px rgba(21,72,149,0.06);
  }

  .input-field {
    background: rgba(255,255,255,0.8);
    border: 1.5px solid rgba(21,72,149,0.12);
    border-radius: 14px;
    padding: 14px 16px;
    font-size: 14px;
    width: 100%;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
    color: #111;
  }
  .input-field::placeholder { color: #9ca3af; }
  .input-field:focus {
    border-color: #154895;
    box-shadow: 0 0 0 3px rgba(21,72,149,0.1);
  }

  .select-field {
    background: rgba(255,255,255,0.8);
    border: 1.5px solid rgba(21,72,149,0.12);
    border-radius: 14px;
    padding: 14px 16px;
    font-size: 14px;
    width: 100%;
    outline: none;
    appearance: none;
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s;
    color: #111;
  }
  .select-field:focus {
    border-color: #154895;
    box-shadow: 0 0 0 3px rgba(21,72,149,0.1);
  }
`

function SelectWrap({ children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "", company: "", email: "", phone: "",
    enquiryType: "", industry: "", message: "", agreed: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(p => ({ ...p, [name]: type === "checkbox" ? checked : value }))
  }

  // const handleSubmit = () => {
  //   if (!form.fullName || !form.email || !form.message || !form.agreed) return
  //   setSubmitting(true)
  //   setTimeout(() => { setSubmitting(false); setSuccess(true) }, 1500)
  // }


// const handleSubmit = async () => {
//   try {
//     setSubmitting(true);

//     const { data } = await axios.post(
//       "http://localhost:5000/api/contact",
//       form
//     );

//     if (data.success) {
//       setSuccess(true);
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Failed to send message");
//   } finally {
//     setSubmitting(false);
//   }
// };


const handleSubmit = async () => {
  try {
    setSubmitting(true);

const { data } = await api.post("/enquiry", {
  type: "contact",
  ...form
});

    if (data.success) {
      setSuccess(true);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to send message");
  } finally {
    setSubmitting(false);
  }
};

  const handleReset = () => {
    setForm({ fullName: "", company: "", email: "", phone: "", enquiryType: "", industry: "", message: "", agreed: false })
    setSuccess(false)
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: "#f4f8ff" }}>
      <style>{BG_CSS}</style>
      <Navbar />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-16"
        style={{ background: "linear-gradient(135deg, #154895 0%, #0d2f6b 55%, #0a1e4a 100%)" }}>

        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob-1 absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-3xl" style={{ background: "#2a5ccc" }} />
          <div className="blob-2 absolute -bottom-32 -right-32 w-[440px] h-[440px] rounded-full blur-3xl" style={{ background: "#e62224" }} />
          <div className="absolute inset-0 opacity-[0.045]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="ring-cw  absolute top-12 right-20 w-52 h-52 border-2 border-dashed border-white/10 rounded-full" />
          <div className="ring-ccw absolute bottom-10 left-14 w-36 h-36 border-2 border-dashed border-white/10 rounded-full" />
        </div>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/50 text-sm mb-8 font-medium">
            <a href="/" className="hover:text-white/80 transition-colors">Home</a>
            <span>/</span>
            <span className="text-white/80">Contact Us</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#e62224] animate-pulse" />
            <span className="text-white/90 text-sm font-semibold">Response Within 24 Hours — Always</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75, ease }}
            className="shimmer-text text-5xl xl:text-6xl font-black leading-tight max-w-2xl mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Get In Touch With Our Team
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.65 }}
            className="text-white/65 text-xl leading-relaxed max-w-xl mb-10">
            Whether you need to hire talent or scale your workforce — we're ready to help and will respond within 24 hours.
          </motion.p>

          {/* Contact pills */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.6 }}
            className="flex flex-wrap gap-3">
            {[
              { icon: Phone, text: "+974 4443 4386", href: "tel:+97444434386" },
              { icon: Mail, text: "business@asliyarecruitment.com", href: "mailto:business@asliyarecruitment.com" },
              { icon: MapPin, text: "Muntaza Trading Center, Doha", href: "#office" },
            ].map(({ icon: Icon, text, href }) => (
              <a key={text} href={href}
                className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-white text-sm font-medium hover:bg-white/20 transition-colors duration-200">
                <Icon className="w-4 h-4 text-[#e62224]" />
                {text}
              </a>
            ))}
          </motion.div>
        </Container>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="#f4f8ff" />
          </svg>
        </div>
      </section>

      {/* ── 2. FORM + INFO ───────────────────────────────────────────────── */}
      <section className="py-28" style={{ background: "#f4f8ff" }}>
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, #154895 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />

        <Container>
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* FORM — 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease }}
              className="lg:col-span-3 glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden"
            >
              {/* Top stripe */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, #154895, #e62224)" }} />

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}
                    className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent!</h3>
                    <p className="text-gray-500 mb-8 max-w-sm">Our team will contact you within 24 hours with a tailored recruitment plan.</p>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="bg-[#154895] text-white rounded-2xl px-8 py-4 font-bold hover:bg-[#0d2f6b] transition-colors">
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Send Us a Message
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">Free consultation · Response within 24 hours · No obligations</p>
                    <div className="h-px bg-gradient-to-r from-[#154895]/20 via-[#e62224]/20 to-transparent mb-7" />

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Full Name <span className="text-[#e62224]">*</span>
                          </label>
                          <input name="fullName" value={form.fullName} onChange={handleChange}
                            placeholder="Your full name" className="input-field" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Company Name</label>
                          <input name="company" value={form.company} onChange={handleChange}
                            placeholder="Your company" className="input-field" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Email Address <span className="text-[#e62224]">*</span>
                          </label>
                          <input name="email" type="email" value={form.email} onChange={handleChange}
                            placeholder="you@company.com" className="input-field" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Phone / WhatsApp</label>
                          <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                            placeholder="+974 ..." className="input-field" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Enquiry Type</label>
                        <SelectWrap>
                          <select name="enquiryType" value={form.enquiryType} onChange={handleChange} className="select-field">
                            <option value="">Select enquiry type…</option>
                            <option>Hire Talent — Local Recruitment</option>
                            <option>Hire Talent — Overseas Recruitment</option>
                            <option>Mass Recruitment Campaign</option>
                            <option>Domestic Staffing (Maids, Drivers, etc.)</option>
                            <option>General Enquiry</option>
                          </select>
                        </SelectWrap>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Industry</label>
                        <SelectWrap>
                          <select name="industry" value={form.industry} onChange={handleChange} className="select-field">
                            <option value="">Select your industry…</option>
                            <option>Construction & Engineering</option>
                            <option>Hospitality & Food Service</option>
                            <option>Healthcare & Elderly Care</option>
                            <option>Security & Facilities</option>
                            <option>Logistics & Warehousing</option>
                            <option>Retail & Customer Service</option>
                            <option>Domestic Services</option>
                            <option>Oil & Gas</option>
                            <option>Other</option>
                          </select>
                        </SelectWrap>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
                          Message / Requirements <span className="text-[#e62224]">*</span>
                        </label>
                        <textarea name="message" value={form.message} onChange={handleChange}
                          rows={5} placeholder="Describe your roles, headcount, timeline, preferred source countries…"
                          className="input-field resize-none" />
                      </div>

                      <div className="flex items-start gap-3">
                        <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange}
                          className="mt-0.5 w-4 h-4 cursor-pointer accent-[#154895]" />
                        <label className="text-sm text-gray-500 cursor-pointer leading-relaxed">
                          I agree to the{" "}
                          <span className="text-[#154895] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                          {" "}and{" "}
                          <span className="text-[#154895] font-semibold hover:underline cursor-pointer">Terms of Service</span>
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit} disabled={submitting}
                        className="w-full relative overflow-hidden bg-[#154895] text-white rounded-2xl px-8 py-4 font-bold flex items-center justify-center gap-2.5 hover:bg-[#0d2f6b] transition-colors duration-200 disabled:opacity-70 shadow-xl shadow-[#154895]/25"
                      >
                        <AnimatePresence mode="wait">
                          {submitting ? (
                            <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="flex items-center gap-2.5">
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              Sending…
                            </motion.div>
                          ) : (
                            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="flex items-center gap-2.5">
                              <Send className="w-4 h-4 text-white/80" />
                              Send Message — Get a Reply in 24h
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {/* Shimmer sweep */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                          initial={{ x: "-100%" }} animate={{ x: "200%" }}
                          transition={{ repeat: Infinity, duration: 2.8, ease: "linear", repeatDelay: 1 }}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* INFO CARDS — 2 cols */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: Phone, accent: "#154895", lightBg: "#eef4ff", label: "Call Us", value: "+974 4443 4386", sub: "Sun–Thu, 8am–6pm", href: "tel:+97444434386" },
                { icon: Mail, accent: "#e62224", lightBg: "#fff0f0", label: "Business Email", value: "business@asliyarecruitment.com", sub: "We reply within 24 hours", href: "mailto:business@asliyarecruitment.com" },
                { icon: Mail, accent: "#154895", lightBg: "#eef4ff", label: "General Enquiries", value: "info@asliyarecruitment.com", sub: "For general questions & info", href: "mailto:info@asliyarecruitment.com" },
                { icon: MapPin, accent: "#e62224", lightBg: "#fff0f0", label: "Visit Us", value: "Muntaza Trading Center, Office 3, Floor 6", sub: "Al Muntazah Hiteen St, Doha · P.O. Box 1414", href: "#office" },
                { icon: Clock, accent: "#154895", lightBg: "#eef4ff", label: "Business Hours", value: "Sun–Thu: 8:00am – 6:00pm", sub: "Fri–Sat: Closed", href: null },
              ].map(({ icon: Icon, accent, lightBg, label, value, sub, href }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                  className="glass-card glass-card-hover rounded-2xl p-5 flex items-start gap-4 group"
                  onClick={() => href && window.open(href, href.startsWith("http") ? "_blank" : "_self")}
                  style={{ cursor: href ? "pointer" : "default" }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: lightBg }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: accent }}>{label}</p>
                    <p className="font-bold text-gray-900 text-sm leading-snug break-all">{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                </motion.div>
              ))}

              {/* Socials */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.5 }}
                className="pt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}
                      className="group w-10 h-10 glass-card rounded-xl flex items-center justify-center transition-all duration-300 hover:!bg-[#154895] hover:border-[#154895]">
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. COMPLIANCE TRUST BAR ──────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: Shield, text: "Ministry of Labor Qatar — License #618" },
              { icon: Star,   text: "Supreme Committee Approved · FIFA Standard" },
              { icon: CheckCircle, text: "Qatar Labor Law Compliant" },
              { icon: Users,  text: "20,000+ Workers Deployed" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.div key={text}
                initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Icon size={15} className="text-[#154895]" />
                {text}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. OFFICE CARD ───────────────────────────────────────────────── */}
      {/* <section id="office" className="py-24" style={{ background: "#f4f8ff" }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease }}
            className="text-center mb-12">
            <p className="text-sm font-bold text-[#e62224] uppercase tracking-widest mb-3">Our Office</p>
            <h2 className="text-4xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Based in the Heart of Doha
            </h2>
          </motion.div>

          <div className="max-w-lg mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, ease }}
              className="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden">
           
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                style={{ background: "linear-gradient(90deg, #154895, #e62224)" }} />

              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl">🇶🇦</span>
                <span className="bg-[#154895] text-white text-xs font-bold rounded-full px-3 py-1.5">
                  Headquarters
                </span>
              </div>
              <h3 className="font-black text-gray-900 text-xl mb-1">Doha, Qatar</h3>
              <p className="text-sm font-semibold text-[#154895] mb-3">Asliya Manpower Supply W.L.L</p>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Muntaza Trading Center, Office 3, Floor 6, Building 1,<br />
                Al Muntazah Hiteen St, Rawdat Al Khail St, Doha<br />
                P.O. Box 1414
              </p>
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-4 h-4 text-[#154895]" />
                <a href="tel:+97444434386" className="text-sm font-bold text-gray-800 hover:text-[#154895] transition-colors">
                  +974 4443 4386
                </a>
              </div>
              <a href="https://maps.google.com/?q=Muntaza+Trading+Center+Doha+Qatar"
                target="_blank" rel="noopener noreferrer"
                className="w-full bg-[#154895] text-white font-bold rounded-2xl py-3.5 flex items-center justify-center gap-2 hover:bg-[#0d2f6b] transition-colors duration-200 text-sm shadow-lg shadow-[#154895]/20">
                <MapPin className="w-4 h-4" /> Get Directions
              </a>
            </motion.div>
          </div>
        </Container>
      </section> */}
      <section id="office" className="py-24" style={{ background: "#f4f8ff" }}>
  <Container>
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.65, ease }}
      className="text-center mb-12">
      <p className="text-sm font-bold text-[#e62224] uppercase tracking-widest mb-3">Our Office</p>
      <h2 className="text-4xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
        Based in the Heart of Doha
      </h2>
    </motion.div>

    <div className="max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.65, ease }}
        className="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden">
        {/* Top stripe */}
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
          style={{ background: "linear-gradient(90deg, #154895, #e62224)" }} />

        <div className="flex items-center justify-between mb-5">
          <span className="text-3xl">🇶🇦</span>
          <span className="bg-[#154895] text-white text-xs font-bold rounded-full px-3 py-1.5">
            Headquarters
          </span>
        </div>
        <h3 className="font-black text-gray-900 text-xl mb-1">Doha, Qatar</h3>
        <p className="text-sm font-semibold text-[#154895] mb-3">Asliya Manpower Supply W.L.L</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          Muntaza Trading Center, Office 3, Floor 6, Building 1,<br />
          Al Muntazah Hiteen St, Rawdat Al Khail St, Doha<br />
          P.O. Box 1414
        </p>
        <div className="flex items-center gap-2 mb-6">
          <Phone className="w-4 h-4 text-[#154895]" />
          <a href="tel:+97444434386" className="text-sm font-bold text-gray-800 hover:text-[#154895] transition-colors">
            +974 4443 4386
          </a>
        </div>
        <a href="https://maps.google.com/?q=Muntaaza+Trading+Doha+Qatar"
          target="_blank" rel="noopener noreferrer"
          className="w-full bg-[#154895] text-white font-bold rounded-2xl py-3.5 flex items-center justify-center gap-2 hover:bg-[#0d2f6b] transition-colors duration-200 text-sm shadow-lg shadow-[#154895]/20">
          <MapPin className="w-4 h-4" /> Get Directions
        </a>
      </motion.div>
    </div>
  </Container>
</section>

      {/* ── 5. MAP PLACEHOLDER ───────────────────────────────────────────── */}
      {/* <section className="bg-white py-0">
        <div className="h-80 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #eef4ff 0%, #e8eef8 100%)" }}>
       
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "linear-gradient(#154895 1px, transparent 1px), linear-gradient(90deg, #154895 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #e62224 2px, transparent 2px)", backgroundSize: "80px 80px" }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.55, ease }}
              className="glass-card rounded-2xl p-6 text-center w-80 shadow-xl">
              <div className="w-11 h-11 bg-[#eef4ff] rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5 text-[#154895]" />
              </div>
              <p className="font-black text-gray-900">Asliya Manpower Supply W.L.L</p>
              <p className="text-sm text-gray-500 mt-1">Muntaza Trading Center, Office 3, Floor 6</p>
              <p className="text-xs text-gray-400 mt-0.5">Al Muntazah Hiteen St, Doha, Qatar</p>
              <a href="https://maps.google.com/?q=Muntaza+Trading+Center+Doha+Qatar"
                target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-block text-[#154895] font-bold text-sm hover:underline underline-offset-4">
                Open in Google Maps →
              </a>
            </motion.div>
          </div>
        </div>
      </section> */}
<section className="bg-white py-0">
  <div className="h-80 relative overflow-hidden"
    style={{ background: "linear-gradient(135deg, #eef4ff 0%, #e8eef8 100%)" }}>
    {/* Grid lines */}
    <div className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: "linear-gradient(#154895 1px, transparent 1px), linear-gradient(90deg, #154895 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
    <div className="absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: "radial-gradient(circle, #e62224 2px, transparent 2px)", backgroundSize: "80px 80px" }} />

    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.55, ease }}
        className="glass-card rounded-2xl p-6 text-center w-80 shadow-xl">
        <div className="w-11 h-11 bg-[#eef4ff] rounded-xl flex items-center justify-center mx-auto mb-3">
          <MapPin className="w-5 h-5 text-[#154895]" />
        </div>
        <p className="font-black text-gray-900">Asliya Manpower Supply W.L.L</p>
        <p className="text-sm text-gray-500 mt-1">Muntaza Trading Center, Office 3, Floor 6, Building 1</p>
        <p className="text-xs text-gray-400 mt-0.5">Al Muntazah Hiteen St, Rawdat Al Khail St, Doha, Qatar</p>
        <a href="https://maps.google.com/?q=Muntaaza+Trading+Doha+Qatar"
          target="_blank" rel="noopener noreferrer"
          className="mt-3 inline-block text-[#154895] font-bold text-sm hover:underline underline-offset-4">
          Open in Google Maps →
        </a>
      </motion.div>
    </div>
  </div>
</section>

      {/* ── 6. QUICK CALL BAND ───────────────────────────────────────────── */}
      <section className="py-14" style={{ background: "#154895" }}>
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white">Prefer to Talk? Call Us Now.</h3>
              <p className="text-white/60 text-sm mt-1">Our recruiters are available Sun–Thu 8am–6pm. Response within 24 hours.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.a href="tel:+97444434386"
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="bg-white text-[#154895] font-bold rounded-2xl px-6 py-3.5 flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-lg">
                <Phone className="w-4 h-4" /> +974 4443 4386
              </motion.a>
              <motion.a href="mailto:business@asliyarecruitment.com"
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="bg-white/10 border border-white/25 text-white font-bold rounded-2xl px-6 py-3.5 flex items-center gap-2 hover:bg-white/20 transition-colors">
                <Mail className="w-4 h-4" /> Email Us
              </motion.a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-28" style={{ background: "#f4f8ff" }}>
        <Container>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease }}
            className="text-center mb-14">
            <p className="text-sm font-bold text-[#e62224] uppercase tracking-widest mb-3">Quick Answers</p>
            <h2 className="text-4xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Common Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <motion.div key={i}
                  custom={i * 0.08} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "ring-1 ring-[#154895]/20" : ""}`}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-start gap-4 p-6 text-left cursor-pointer">
                    <span className="font-bold text-gray-900 flex-1 text-sm leading-relaxed">{faq.q}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                      isOpen ? "bg-[#154895] text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-100/80 pt-4">
                          <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── 8. CTA BANNER ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75, ease }}
            className="relative rounded-3xl overflow-hidden px-8 py-16 md:p-20 text-center"
            style={{ background: "linear-gradient(135deg, #154895 0%, #0d2f6b 60%, #0a1e4a 100%)" }}>

            {/* Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full blur-3xl opacity-[.08]" style={{ background: "#fff" }} />
              <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full blur-3xl opacity-[.09]" style={{ background: "#e62224" }} />
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-[#e62224] rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-semibold">Stop Recruiting Slowly. Start Hiring Smart.</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Ready to Grow Your Workforce?
              </h2>
              <p className="text-white/65 text-lg leading-relaxed mb-10">
                From 10 hires to 4,000 workers — Asliya delivers in 25–30 days. We've done this 20,000+ times. Your competitors are already with us.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a href="tel:+97444434386"
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="bg-white text-[#154895] font-bold px-8 py-4 rounded-2xl flex items-center gap-2.5 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-300">
                  <Phone size={18} /> Call +974 4443 4386
                </motion.a>
                <motion.a href="mailto:business@asliyarecruitment.com"
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl border border-white/25 hover:bg-white/20 transition-colors duration-300">
                  business@asliyarecruitment.com
                </motion.a>
              </div>
              <p className="mt-8 text-white/30 text-sm">Free consultation · No commitment · Doha, Qatar · P.O. Box 1414</p>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  )
}