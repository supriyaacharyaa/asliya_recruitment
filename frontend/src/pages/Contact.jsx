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

// ─── Constants ────────────────────────────────────────────────────────────────

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
  flag: "🇶🇦",
  city: "Doha",
  country: "Qatar",
  hq: false,
  address: "Muntaaza Trading, Doha, Qatar",
  phone: "+974 4443 4386",
},
{
  flag: "🇦🇪",
  city: "Dubai",
  country: "UAE",
  hq: false,
  address: "Level 18, One Central, DWTC, Dubai",
  phone: "+971 4 567 8901",
},
  {
    flag: "🇵🇭", city: "Manila", country: "Philippines", hq: false,
    address: "12F Ayala Tower One, Makati City, Metro Manila",
    phone: "+63 2 8567 8902",
  },
  {
    flag: "🇬🇧", city: "London", country: "UK", hq: false,
    address: "25 Canada Square, Canary Wharf, London E14 5LQ",
    phone: "+44 20 7946 8903",
  },
  {
    flag: "🇸🇬", city: "Singapore", country: "Singapore", hq: false,
    address: "8 Marina View, Asia Square Tower 1, Singapore 018960",
    phone: "+65 6789 0904",
  },
  {
    flag: "🇸🇦", city: "Riyadh", country: "Saudi Arabia", hq: false,
    address: "King Fahad Road, Al Olaya District, Riyadh 12211",
    phone: "+966 11 567 8905",
  },
]

const FAQS = [
  {
    q: "What information should I prepare before contacting you?",
    a: "For employers, have your job requirements, headcount, and target start date ready. For job seekers, an updated CV and your preferred role or destination country helps us assist you faster.",
  },
  {
    q: "How quickly will you respond to my enquiry?",
    a: "We aim to respond to all inquiries within 24 business hours. For urgent manpower needs, call us directly — our team is available Mon–Fri, 8am–6pm.",
  },
  {
    q: "Can I visit your office without an appointment?",
    a: "Walk-ins are welcome during business hours, though scheduling an appointment ensures a dedicated consultant is available to give you their full attention.",
  },
  {
    q: "Do you have offices in my country?",
    a: "We have offices in New York, Dubai, Manila, London, Singapore, and Riyadh. Even if we don't have a local office, we can serve you remotely from our nearest branch.",
  },
  {
    q: "Is there a fee for job seekers?",
    a: "No. Our recruitment services are completely free for job seekers. We are compensated by the hiring employers, never by candidates.",
  },
  {
    q: "How do I submit a CV?",
    a: "You can submit your CV via the contact form on this page, email it to cv@recruitmax.com, or drop it off at any of our offices. We review all applications and reach out when a matching opportunity arises.",
  },
]

const inputClass =
  "bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all duration-200 w-full text-gray-900 placeholder:text-gray-400"

const selectClass =
  "bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#154895] focus:ring-2 focus:ring-[#154895]/10 transition-all duration-200 w-full text-gray-900 appearance-none cursor-pointer"

// ─── Sub-components ───────────────────────────────────────────────────────────

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

// ─── Main Page ────────────────────────────────────────────────────────────────

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
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleReset = () => {
    setFormData({ fullName: "", company: "", email: "", phone: "", enquiryType: "", industry: "", message: "", agreed: false })
    setIsSuccess(false)
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />

      {/* ── 1. PAGE HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#154895] to-[#0d3270] py-40 overflow-hidden">
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-[#e62224]/10 blur-3xl"
            animate={{ scale: [1, 1.15, 1], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>

        <Container>
          {/* Breadcrumb */}
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
            Whether you're hiring or job-seeking, we're ready to help.
          </motion.p>

          {/* Contact pills */}
          <motion.div variants={fadeUp} custom={1.5} initial="hidden" animate="visible"
            className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: Phone, text: "+974 4443 4386" },
              { icon: Mail, text: "info@asliyarecruitment.com" },
              { icon: MapPin, text: "Doha, Qatar" },
            ].map(({ icon: Icon, text }) => (
              <div key={text}
                className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 text-white text-sm font-medium">
                <Icon className="w-4 h-4 text-white/60" />
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
                    <p className="text-gray-500 mb-8">We'll get back to you within 24 hours.</p>
                    <motion.button
                      whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                      className="bg-[#154895] text-white rounded-2xl px-8 py-4 font-bold hover:bg-[#0d3270] transition-colors duration-300"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
                    <p className="text-sm text-gray-400 mt-1">We'll respond within 24 hours.</p>
                    <div className="h-px bg-gray-100 my-6" />

                    <div className="space-y-4">
                      {/* Row 1 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name <span className="text-[#e62224]">*</span></label>
                          <input name="fullName" value={formData.fullName} onChange={handleChange}
                            placeholder="John Smith" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Company Name</label>
                          <input name="company" value={formData.company} onChange={handleChange}
                            placeholder="Acme Corp" className={inputClass} />
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address <span className="text-[#e62224]">*</span></label>
                          <input name="email" type="email" value={formData.email} onChange={handleChange}
                            placeholder="john@company.com" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number</label>
                          <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                            placeholder="+1 234 567 890" className={inputClass} />
                        </div>
                      </div>

                      {/* Row 3 — Enquiry Type */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Enquiry Type</label>
                        <SelectWrapper>
                          <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className={selectClass}>
                            <option value="">Select enquiry type…</option>
                            <option>Hire Talent</option>
                            <option>Find a Job</option>
                            <option>Mass Recruitment</option>
                            <option>Executive Search</option>
                            <option>General Enquiry</option>
                          </select>
                        </SelectWrapper>
                      </div>

                      {/* Row 4 — Industry */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Industry</label>
                        <SelectWrapper>
                          <select name="industry" value={formData.industry} onChange={handleChange} className={selectClass}>
                            <option value="">Select your industry…</option>
                            <option>Construction</option>
                            <option>Hospitality</option>
                            <option>Healthcare</option>
                            <option>Manufacturing</option>
                            <option>IT</option>
                            <option>Security</option>
                            <option>Transport</option>
                            <option>Retail</option>
                            <option>Other</option>
                          </select>
                        </SelectWrapper>
                      </div>

                      {/* Row 5 — Message */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message <span className="text-[#e62224]">*</span></label>
                        <textarea name="message" value={formData.message} onChange={handleChange}
                          rows={5} placeholder="Tell us about your requirements…"
                          className={`${inputClass} resize-none`} />
                      </div>

                      {/* Row 6 — Checkbox */}
                      <div className="flex items-start gap-3">
                        <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange}
                          className="mt-0.5 w-4 h-4 accent-[#154895] cursor-pointer" />
                        <label className="text-sm text-gray-500 cursor-pointer leading-relaxed">
                          I agree to the{" "}
                          <span className="text-[#154895] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                          {" "}and{" "}
                          <span className="text-[#154895] font-semibold hover:underline cursor-pointer">Terms of Service</span>
                        </label>
                      </div>

                      {/* Submit */}
                      <motion.button
                        whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-[#154895] text-white rounded-2xl px-8 py-4 font-bold flex items-center justify-center gap-2 hover:bg-[#0d3270] transition-colors duration-300 disabled:opacity-70 mt-2"
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
                          <><Send className="w-4 h-4" /> Send Message</>
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
                  icon: Phone, iconBg: "bg-[#154895]", label: "Call Us",
                  value: "+974 4443 4386", sub: "Mon–Fri, 8am–6pm",
                },
                {
                  icon: Mail, iconBg: "bg-[#e62224]", label: "Email Us",
                  value: "info@asliyarecruitment.com", sub: "We reply within 24 hours",
                },
                {
                  icon: MapPin, iconBg: "bg-emerald-500", label: "Visit Us",
                  value: "Muntaaza Trading, Doha, Qatar", sub: "Walk-ins welcome during business hours",
                },
                {
                  icon: Clock, iconBg: "bg-amber-500", label: "Business Hours",
                  value: "Mon–Fri: 8:00am – 6:00pm", sub: "Sat: 9:00am – 1:00pm · Sun: Closed",
                },
              ].map(({ icon: Icon, iconBg, label, value, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex items-start gap-4 hover:border-[#154895]/20 hover:shadow-xl hover:shadow-[#154895]/10 transition-all duration-500 cursor-pointer"
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
                viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.45 }}
                className="pt-2"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                    <motion.button
                      key={i} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                      className="group w-10 h-10 bg-gray-100 hover:bg-[#154895] rounded-xl flex items-center justify-center transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. GLOBAL OFFICES ────────────────────────────────────────────── */}
      <section className="bg-[#f8f9fc] py-28">
        <Container>
          <SectionHeading tag="Our Offices" title="Global Presence, Local Expertise" />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFICES.map((office, i) => (
              <motion.div
                key={office.city}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#154895]/20 hover:shadow-xl hover:shadow-[#154895]/10 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{office.flag}</span>
                  {office.hq && (
                    <span className="bg-[#154895] text-white text-xs font-bold rounded-full px-2.5 py-1">
                      Headquarters
                    </span>
                  )}
                </div>
                <p className="font-bold text-gray-900 text-lg">{office.city}</p>
                <p className="text-sm text-[#154895] font-semibold">{office.country}</p>
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
        <div className="h-96 bg-gradient-to-br from-[#f0f4fb] to-[#e8eef8] relative overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(#154895 1px, transparent 1px), linear-gradient(90deg, #154895 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

          {/* Subtle decorative dots */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #154895 2px, transparent 2px)", backgroundSize: "80px 80px" }} />

          {/* Centered card overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease }}
              className="bg-white rounded-2xl p-6 shadow-xl text-center w-72"
            >
              <MapPin className="w-8 h-8 text-[#e62224] mx-auto mb-3" />
              <p className="font-bold text-gray-900">Asliya Recruitment</p>
              <p className="text-sm text-gray-500 mt-1">Muntaaza Trading, Doha, Qatar</p>
              <button className="mt-3 text-[#154895] font-semibold text-sm hover:underline underline-offset-4 transition-all">
                Get Directions →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. QUICK CONTACT BAND ────────────────────────────────────────── */}
      <section className="bg-[#154895] py-16">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white">Prefer to Talk? Call Us Now.</h3>
              <p className="text-white/60 text-sm mt-1">Our recruiters are available Mon–Fri 8am–6pm.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="bg-white text-[#154895] font-bold rounded-2xl px-6 py-3.5 flex items-center gap-2 hover:bg-gray-50 transition-colors duration-300"
              >
                <a href="tel:+97444434386" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call +974 4443 4386
                </a>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                className="bg-white/10 border border-white/20 text-white font-bold rounded-2xl px-6 py-3.5 flex items-center gap-2 hover:bg-white/20 transition-colors duration-300"
              >
                <Calendar className="w-4 h-4" /> Schedule a Callback
              </motion.button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. FAQ MINI ──────────────────────────────────────────────────── */}
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
            className="bg-gradient-to-br from-[#154895] via-[#1a56b0] to-[#0d3270] rounded-3xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="relative z-10">
              <span className="text-sm font-semibold text-brand-secondary uppercase tracking-widest">Ready to Start?</span>
              <h2 className="mt-4 text-4xl font-black text-white">Let's Build Your Workforce Together</h2>
              <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
                From a single hire to 1,000 workers — Asliya Recruitment has the scale, speed, and expertise to deliver.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="bg-white text-[#154895] font-bold rounded-2xl px-8 py-4 hover:bg-gray-50 transition-colors duration-300"
                >
                  Book Free Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/40 text-white font-bold rounded-2xl px-8 py-4 hover:bg-white/10 inline-flex items-center gap-2 transition-colors duration-300"
                >
                <a href="tel:+97444434386" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call Us Now
                </a>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  )
}