import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone, Mail, MapPin, Send, CheckCircle, ChevronDown,
  Plus, Minus, Linkedin, Twitter, Facebook, Instagram,
  Clock, Calendar, Building2
} from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Container from "../components/ui/Container"
import SectionHeading from "../components/ui/SectionHeading"

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.1 },
  }),
}

const OFFICES = [
  {
    flag: "🇶🇦", city: "Doha", country: "Qatar", hq: true,
    address: "Muntaza Trading Center, Office 3, Floor 6, Building 1, Al Muntazah Hiteen St, Rawdat Al Khail St, Doha",
    phone: "+974 4443 4386",
  },
]

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

const inputClass =
  "bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/12 transition-all duration-200 w-full text-gray-900 placeholder:text-gray-400"

const selectClass =
  "bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/12 transition-all duration-200 w-full text-gray-900 appearance-none cursor-pointer"

function WaveBottom({ fill = "#ffffff" }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    </div>
  )
}

function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "", company: "", email: "", phone: "",
    enquiryType: "", industry: "", message: "", agreed: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.message || !formData.agreed) return
    setIsSubmitting(true)
    setTimeout(() => { setIsSubmitting(false); setIsSuccess(true) }, 1500)
  }

  const handleReset = () => {
    setFormData({ fullName: "", company: "", email: "", phone: "", enquiryType: "", industry: "", message: "", agreed: false })
    setIsSuccess(false)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* ── 1. PAGE HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#060d1f] via-[#0A1628] to-[#0d2245] py-40 overflow-hidden">
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-70" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-[#C5282B]/8 blur-3xl"
            animate={{ scale: [1, 1.15, 1], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <Container>
          <motion.div variants={fadeUp} initial="hidden" animate="visible"
            className="flex items-center gap-2 text-white/50 text-sm mb-8">
            <span>Home</span><span>/</span>
            <span className="text-white/80 font-semibold">Contact Us</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={0.5} initial="hidden" animate="visible"
            className="text-5xl lg:text-6xl font-black text-white leading-tight max-w-2xl">
            Get In Touch With Our Team
          </motion.h1>

          <motion.p variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="mt-5 text-xl text-white/70 max-w-xl">
            Whether you need to hire talent or scale your workforce, we're ready to help — and we respond within 24 hours.
          </motion.p>

          <motion.div variants={fadeUp} custom={1.5} initial="hidden" animate="visible"
            className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: Phone, text: "+974 4443 4386" },
              { icon: Mail, text: "business@asliyarecruitment.com" },
              { icon: MapPin, text: "Muntaza Trading Center, Doha" },
            ].map(({ icon: Icon, text }) => (
              <div key={text}
                className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-white text-sm font-medium">
                <Icon className="w-4 h-4 text-[#C9A84C]" />
                {text}
              </div>
            ))}
          </motion.div>
        </Container>

        <WaveBottom fill="#ffffff" />
      </section>

      {/* ── 2. MAIN CONTACT SECTION ──────────────────────────────────────── */}
      <section className="bg-white py-28">
        <Container>
          <div className="grid lg:grid-cols-5 gap-16 items-start">

            {/* LEFT — Form (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease }}
              className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-100/80"
            >
              {/* Gold accent bar */}
              <div className="h-1 bg-gradient-to-r from-[#0A1628] via-[#C9A84C] to-[#0A1628] rounded-full mb-8 -mx-2" />

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 mb-6" />
                    <h3 className="text-2xl font-black text-gray-900 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-500 mb-8">Our team will contact you within 24 hours with a tailored recruitment plan.</p>
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="bg-[#0A1628] text-white rounded-2xl px-8 py-4 font-bold hover:bg-[#0d2245] transition-colors duration-300"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
                    <p className="text-sm text-gray-400 mt-1">Free consultation · Response within 24 hours · No obligations</p>
                    <div className="h-px bg-gray-100 my-6" />

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name <span className="text-[#C5282B]">*</span></label>
                          <input name="fullName" value={formData.fullName} onChange={handleChange}
                            placeholder="Your full name" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Company Name</label>
                          <input name="company" value={formData.company} onChange={handleChange}
                            placeholder="Your company" className={inputClass} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address <span className="text-[#C5282B]">*</span></label>
                          <input name="email" type="email" value={formData.email} onChange={handleChange}
                            placeholder="you@company.com" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone / WhatsApp</label>
                          <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                            placeholder="+974 ..." className={inputClass} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Enquiry Type</label>
                        <SelectWrapper>
                          <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className={selectClass}>
                            <option value="">Select enquiry type…</option>
                            <option>Hire Talent — Local Recruitment</option>
                            <option>Hire Talent — Overseas Recruitment</option>
                            <option>Mass Recruitment Campaign</option>
                            <option>Domestic Staffing (Maids, Drivers, etc.)</option>
                            <option>General Enquiry</option>
                          </select>
                        </SelectWrapper>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Industry</label>
                        <SelectWrapper>
                          <select name="industry" value={formData.industry} onChange={handleChange} className={selectClass}>
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
                        </SelectWrapper>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message / Requirements <span className="text-[#C5282B]">*</span></label>
                        <textarea name="message" value={formData.message} onChange={handleChange}
                          rows={5} placeholder="Describe your roles, headcount, timeline, preferred source countries…"
                          className={`${inputClass} resize-none`} />
                      </div>

                      <div className="flex items-start gap-3">
                        <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange}
                          className="mt-0.5 w-4 h-4 accent-[#C9A84C] cursor-pointer" />
                        <label className="text-sm text-gray-500 cursor-pointer leading-relaxed">
                          I agree to the{" "}
                          <span className="text-[#0A1628] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                          {" "}and{" "}
                          <span className="text-[#0A1628] font-semibold hover:underline cursor-pointer">Terms of Service</span>
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-[#0A1628] text-white rounded-2xl px-8 py-4 font-bold flex items-center justify-center gap-2 hover:bg-[#0d2245] transition-colors duration-300 disabled:opacity-70 mt-2 shadow-xl shadow-[#0A1628]/20"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <><Send className="w-4 h-4 text-[#C9A84C]" /> Send Message — Get a Reply in 24h</>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT — Contact Info (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  icon: Phone, iconBg: "bg-[#0A1628]", label: "Call Us",
                  value: "+974 4443 4386", sub: "Sun–Thu, 8am–6pm",
                },
                {
                  icon: Mail, iconBg: "bg-[#C5282B]", label: "Email Us",
                  value: "business@asliyarecruitment.com", sub: "We reply within 24 hours",
                },
                {
                  icon: Mail, iconBg: "bg-[#C9A84C]", label: "General Enquiries",
                  value: "info@asliyarecruitment.com", sub: "For general questions & info",
                },
                {
                  icon: MapPin, iconBg: "bg-emerald-600", label: "Visit Us",
                  value: "Muntaza Trading Center, Office 3, Floor 6", sub: "Al Muntazah Hiteen St, Doha · P.O. Box 1414",
                },
                {
                  icon: Clock, iconBg: "bg-amber-500", label: "Business Hours",
                  value: "Sun–Thu: 8:00am – 6:00pm", sub: "Fri–Sat: Closed",
                },
              ].map(({ icon: Icon, iconBg, label, value, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex items-start gap-4 hover:border-[#C9A84C]/30 hover:shadow-xl hover:shadow-[#0A1628]/8 transition-all duration-500 cursor-pointer"
                >
                  <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="font-bold text-gray-900 mt-0.5 text-sm">{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                </motion.div>
              ))}

              {/* Social row */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.55 }}
                className="pt-2"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                    <motion.button
                      key={i} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                      className="group w-10 h-10 bg-gray-100 hover:bg-[#0A1628] rounded-xl flex items-center justify-center transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#C9A84C] transition-colors duration-300" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. DOHA OFFICE ───────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-28">
        <Container>
          <SectionHeading tag="Our Office" title="Based in the Heart of Doha" />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-5 max-w-lg">
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.city}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#C9A84C]/30 hover:shadow-xl hover:shadow-[#0A1628]/8 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{office.flag}</span>
                  {office.hq && (
                    <span className="bg-[#0A1628] text-[#C9A84C] text-xs font-bold rounded-full px-2.5 py-1">
                      Headquarters
                    </span>
                  )}
                </div>
                <p className="font-bold text-gray-900 text-lg">{office.city}</p>
                <p className="text-sm text-[#C9A84C] font-semibold">{office.country}</p>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{office.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-sm text-gray-500">{office.phone}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4. MAP SECTION ───────────────────────────────────────────────── */}
      <section className="bg-white py-0">
        <div className="h-96 bg-gradient-to-br from-[#f0f2f8] to-[#e8ecf4] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(#0A1628 1px, transparent 1px), linear-gradient(90deg, #0A1628 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #C9A84C 2px, transparent 2px)", backgroundSize: "80px 80px" }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="bg-white rounded-2xl p-6 shadow-xl text-center w-80"
            >
              <div className="w-10 h-10 bg-[#0A1628] rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <p className="font-bold text-gray-900">Asliya Manpower Supply W.L.L</p>
              <p className="text-sm text-gray-500 mt-1">Muntaza Trading Center, Office 3, Floor 6</p>
              <p className="text-xs text-gray-400 mt-0.5">Al Muntazah Hiteen St, Doha, Qatar</p>
              <a
                href="https://maps.google.com/?q=Muntaza+Trading+Center+Doha+Qatar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[#0A1628] font-semibold text-sm hover:underline underline-offset-4 transition-all"
              >
                Get Directions →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. QUICK CONTACT BAND ────────────────────────────────────────── */}
      <section className="bg-[#0A1628] py-16 relative overflow-hidden">
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white">Prefer to Talk? Call Us Now.</h3>
              <p className="text-white/60 text-sm mt-1">Our recruiters are available Sun–Thu 8am–6pm. Response within 24 hours.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="tel:+97444434386"
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="bg-[#C9A84C] text-[#0A1628] font-bold rounded-2xl px-6 py-3.5 flex items-center gap-2 hover:bg-[#e8cc7a] transition-colors duration-300"
              >
                <Phone className="w-4 h-4" /> +974 4443 4386
              </motion.a>
              <motion.a
                href="mailto:business@asliyarecruitment.com"
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="bg-white/10 border border-white/20 text-white font-bold rounded-2xl px-6 py-3.5 flex items-center gap-2 hover:bg-white/20 transition-colors duration-300"
              >
                <Mail className="w-4 h-4" /> Email Us
              </motion.a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-28">
        <Container>
          <SectionHeading tag="Quick Answers" title="Common Questions" />

          <div className="mt-16 max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <motion.div
                  key={i}
                  custom={i * 0.08} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-start gap-4 p-6 text-left cursor-pointer"
                  >
                    <span className="font-bold text-gray-900 flex-1 text-sm leading-relaxed">{faq.q}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                      isOpen ? "bg-[#0A1628] text-[#C9A84C]" : "bg-gray-100 text-gray-500"
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
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
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

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0A1628] via-[#0d2245] to-[#0A1628] rounded-3xl p-16 text-center relative overflow-hidden"
          >
            {/* Gold top line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-80 rounded-t-3xl" />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            {/* Gold glow orb */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#C9A84C] rounded-full blur-3xl opacity-[.06] pointer-events-none" />

            <div className="relative z-10">
              <span className="text-sm font-semibold text-white/50 uppercase tracking-widest">Stop Recruiting Slowly. Start Hiring Smart.</span>
              <h2 className="mt-4 text-4xl font-black text-white">Ready to Grow Your Workforce?</h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                From 10 hires to 4,000 workers — Asliya delivers in 25–30 days. We've done this 20,000+ times. Your competitors are already with us.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <motion.a
                  href="tel:+97444434386"
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="bg-[#C9A84C] text-[#0A1628] font-bold rounded-2xl px-8 py-4 flex items-center gap-2 hover:bg-[#e8cc7a] transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" /> Call +974 4443 4386
                </motion.a>
                <motion.a
                  href="mailto:business@asliyarecruitment.com"
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/30 text-white font-bold rounded-2xl px-8 py-4 hover:bg-white/10 inline-flex items-center gap-2 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" /> business@asliyarecruitment.com
                </motion.a>
              </div>
              <p className="mt-6 text-white/30 text-sm">Free consultation · No commitment · Doha, Qatar · P.O. Box 1414</p>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  )
}