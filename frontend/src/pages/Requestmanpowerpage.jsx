import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Globe, Users, HardHat, Hotel, Stethoscope,
  ShieldCheck, Truck, ShoppingBag, Home, Wrench, ChevronRight,
  ChevronLeft, CheckCircle, Phone, Mail, MapPin, User,
  Briefcase, Clock, FileText, Send, ArrowRight, Landmark
} from "lucide-react";

// Synchronized to match the core specialized operations of the firm
const INDUSTRIES = [
  { icon: HardHat,     label: "Construction"       },
  { icon: Wrench,      label: "Technical / MEP"    },
  { icon: Building2,   label: "Facility Management"},
  { icon: Hotel,       label: "Hospitality"        },
  { icon: ShieldCheck, label: "Security Services"  },
  { icon: Truck,       label: "Logistics & Supply" },
  { icon: ShoppingBag, label: "Retail & Commercial"},
  { icon: Stethoscope, label: "Healthcare"         },
  { icon: Globe,       label: "Other Sectors"      },
];

// Reflects the strategic deployment regions managed under Ministry of Labor licenses
const DESTINATIONS = [
  "Qatar (License #618)", "United Arab Emirates", "Saudi Arabia", 
  "Kuwait", "Bahrain", "Oman", "Malaysia", "International-Other"
];

// Formatted to accommodate both specific project teams and large corporate mass-mobilization campaigns
const VOLUMES = [
  { label: "10 – 50",    sub: "Core Team"           },
  { label: "51 – 200",   sub: "Project Batch"       },
  { label: "201 – 1000", sub: "Large Mobilization"  },
  { label: "1000+",      sub: "Massive Cohort"      },
];

// Standard international recruitment cycle steps (Visa processing, trade testing, clearances)
const TIMELINES = [
  { label: "25 – 30 Days", sub: "Express Mobilization" },
  { label: "30 – 45 Days", sub: "Standard Recruitment" },
  { label: "45 – 60 Days", sub: "Phased Deployment"     },
  { label: "Flexible",     sub: "Strategic Pipeline"   },
];

const STEPS = [
  { id: 1, label: "Company",   icon: Building2 },
  { id: 2, label: "Industry",  icon: Briefcase },
  { id: 3, label: "Workforce", icon: Users     },
  { id: 4, label: "Timeline",  icon: Clock     },
  { id: 5, label: "Details",   icon: FileText  },
];

function Pill({ label, selected, onClick, icon: Icon, sub }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 px-4 py-3 rounded-[13px] border-2 text-left transition-all duration-200 w-full"
      style={{
        borderColor: selected ? "#154895" : "rgba(21,72,149,0.1)",
        background: selected ? "rgba(21,72,149,0.07)" : "rgba(255,255,255,0.8)",
        boxShadow: selected ? "0 0 0 3px rgba(21,72,149,0.12)" : "none",
      }}
    >
      {Icon && (
        <div
          className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
          style={{ background: selected ? "rgba(21,72,149,0.12)" : "rgba(21,72,149,0.05)" }}
        >
          <Icon size={16} color={selected ? "#154895" : "#94a3b8"} strokeWidth={1.8} />
        </div>
      )}
      <div className="min-w-0">
        <div className="text-[13.5px] font-semibold leading-none" style={{ color: selected ? "#154895" : "#1e293b" }}>
          {label}
        </div>
        {sub && <div className="text-[11px] mt-[3px]" style={{ color: "#94a3b8" }}>{sub}</div>}
      </div>
      {selected && (
        <CheckCircle size={15} color="#154895" className="ml-auto flex-shrink-0" />
      )}
    </motion.button>
  );
}

function Field({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[12.5px] font-bold uppercase tracking-wider" style={{ color: "#475569" }}>
        {label} {required && <span style={{ color: "#e62224" }}>*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px]" style={{ color: "#94a3b8" }}>{hint}</p>}
    </div>
  );
}

function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon size={15} color="#94a3b8" />
        </div>
      )}
      <input
        className="w-full rounded-[11px] border px-4 py-3 text-[14px] outline-none transition-all duration-200"
        style={{
          paddingLeft: Icon ? "42px" : "16px",
          borderColor: "rgba(21,72,149,0.14)",
          background: "rgba(255,255,255,0.9)",
          color: "#1e293b",
        }}
        onFocus={e => { e.target.style.borderColor = "#154895"; e.target.style.boxShadow = "0 0 0 3px rgba(21,72,149,0.1)"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(21,72,149,0.14)"; e.target.style.boxShadow = "none"; }}
        {...props}
      />
    </div>
  );
}

function Textarea(props) {
  return (
    <textarea
      rows={4}
      className="w-full rounded-[11px] border px-4 py-3 text-[14px] outline-none transition-all duration-200 resize-none"
      style={{
        borderColor: "rgba(21,72,149,0.14)",
        background: "rgba(255,255,255,0.9)",
        color: "#1e293b",
      }}
      onFocus={e => { e.target.style.borderColor = "#154895"; e.target.style.boxShadow = "0 0 0 3px rgba(21,72,149,0.1)"; }}
      onBlur={e => { e.target.style.borderColor = "rgba(21,72,149,0.14)"; e.target.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

function StepBar({ current }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = current > step.id;
        const active = current === step.id;
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  background: done ? "#154895" : active ? "#154895" : "rgba(21,72,149,0.08)",
                  scale: active ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ border: `2px solid ${done || active ? "#154895" : "rgba(21,72,149,0.15)"}` }}
              >
                {done
                  ? <CheckCircle size={16} color="#fff" />
                  : <Icon size={16} color={active ? "#fff" : "#94a3b8"} strokeWidth={1.8} />
                }
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block"
                style={{ color: active ? "#154895" : done ? "#154895" : "#94a3b8" }}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 rounded-full overflow-hidden" style={{ background: "rgba(21,72,149,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "#154895" }}
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function RequestManpowerPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: "", contactName: "", email: "", phone: "", country: "",
    industries: [],
    destinations: [],
    volume: "", positions: "",
    timeline: "",
    jobTitle: "", skills: "", salaryRange: "", additionalNotes: "",
  });

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggleArr = (key, val) =>
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
    }));

  const next = () => setStep(s => Math.min(s + 1, 5));
  const back = () => setStep(s => Math.max(s - 1, 1));
  const submit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-5"
        style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[480px] w-full text-center rounded-[28px] p-12 border"
          style={{
            background: "rgba(255,255,255,0.92)",
            borderColor: "rgba(21,72,149,0.1)",
            boxShadow: "0 24px 72px rgba(21,72,149,0.12)",
          }}
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
            Requirement Filed!
          </h2>
          <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#64748b" }}>
            Thank you, <strong style={{ color: "#1e293b" }}>{form.contactName || "there"}</strong>. Our business development team will draft a technical proposal and contact you within <strong style={{ color: "#154895" }}>24 hours</strong>.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+97444444444"
              className="inline-flex items-center justify-center gap-2 text-[14px] font-bold py-3 px-6 rounded-[11px] text-white transition-all duration-200"
              style={{ background: "#154895" }}
            >
              <Phone size={14} /> Contact Corporate Office
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 text-[14px] font-bold py-3 px-6 rounded-[11px] border-2 transition-all duration-200"
              style={{ color: "#154895", borderColor: "rgba(21,72,149,0.2)" }}
            >
              Back to Dashboard
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #f4f8ff 0%, #fafbff 60%, #f0f4fc 100%)" }}
    >
    
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute rounded-full" style={{ width: 700, height: 400, top: "-10%", right: "-10%", background: "radial-gradient(ellipse, rgba(21,72,149,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: "5%", left: "-8%", background: "radial-gradient(circle, rgba(230,34,36,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative max-w-[760px] mx-auto px-5 py-16 sm:py-24" style={{ zIndex: 2 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 mb-5 rounded-full px-4 py-[7px] border text-[12px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(21,72,149,0.06)", borderColor: "rgba(21,72,149,0.14)", color: "#154895" }}
          >
            <span className="w-[6px] h-[6px] rounded-full" style={{ background: "#154895", animation: "pulse-dot 2s ease-in-out infinite" }} />
            Corporate Recruitment Services
          </div>
          <h1
            className="font-black leading-tight tracking-tight mb-3"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", fontFamily: "'Playfair Display', Georgia, serif", color: "#1e293b" }}
          >
            Deploy <span style={{ color: "#154895" }}>Global Manpower</span>
          </h1>
          <p className="text-[15px]" style={{ color: "#64748b" }}>
            Submit your specific resource requests. Our procurement specialists will process your criteria across 28+ source hubs.
          </p>
        </motion.div>

        <div className="mb-10">
          <StepBar current={step} />
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[24px] border p-8 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.88)",
            borderColor: "rgba(21,72,149,0.1)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(21,72,149,0.08)",
          }}
        >
         
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "#94a3b8" }}>
              Step {step} of {STEPS.length}
            </p>
            <h2 className="font-black text-[22px]" style={{ color: "#1e293b", fontFamily: "'Playfair Display', Georgia, serif" }}>
              {step === 1 && "Corporate Client Profile"}
              {step === 2 && "Industry Classification & Target Sector"}
              {step === 3 && "Workforce Scale & Roles"}
              {step === 4 && "Mobilization Schedule"}
              {step === 5 && "Trade Specifications & Terms"}
            </h2>
          </div>

          {step === 1 && (
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Registered Company Name" required>
                <Input icon={Building2} placeholder="e.g. Asliya Contracting & Trading" value={form.companyName} onChange={e => update("companyName", e.target.value)} />
              </Field>
              <Field label="Authorized Contact Representative" required>
                <Input icon={User} placeholder="Full Name & Designation" value={form.contactName} onChange={e => update("contactName", e.target.value)} />
              </Field>
              <Field label="Corporate Email Address" required>
                <Input icon={Mail} type="email" placeholder="hr@yourcompany.com" value={form.email} onChange={e => update("email", e.target.value)} />
              </Field>
              <Field label="Direct Telephone / WhatsApp" required>
                <Input icon={Phone} type="tel" placeholder="e.g. +974 4444 4444" value={form.phone} onChange={e => update("phone", e.target.value)} />
              </Field>
              <Field label="Operations / HQ Country" required className="sm:col-span-2">
                <Input icon={MapPin} placeholder="Primary base of project operations (e.g., Doha, Qatar)" value={form.country} onChange={e => update("country", e.target.value)} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <p className="text-[13px] font-bold mb-4" style={{ color: "#475569" }}>Primary Operational Field <span style={{ color: "#e62224" }}>*</span></p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {INDUSTRIES.map(({ label, icon }) => (
                    <Pill
                      key={label}
                      label={label}
                      icon={icon}
                      selected={form.industries.includes(label)}
                      onClick={() => toggleArr("industries", label)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-bold mb-4" style={{ color: "#475569" }}>Target Deployment Destination <span style={{ color: "#e62224" }}>*</span></p>
                <div className="flex flex-wrap gap-2">
                  {DESTINATIONS.map(d => (
                    <motion.button
                      key={d}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => toggleArr("destinations", d)}
                      className="px-4 py-2 rounded-full text-[12.5px] font-semibold border-2 transition-all duration-200"
                      style={{
                        borderColor: form.destinations.includes(d) ? "#154895" : "rgba(21,72,149,0.12)",
                        background: form.destinations.includes(d) ? "rgba(21,72,149,0.08)" : "rgba(255,255,255,0.8)",
                        color: form.destinations.includes(d) ? "#154895" : "#475569",
                      }}
                    >
                      {d}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-7">
              <div>
                <p className="text-[13px] font-bold mb-4" style={{ color: "#475569" }}>Required Worker Volume <span style={{ color: "#e62224" }}>*</span></p>
                <div className="grid grid-cols-2 gap-3">
                  {VOLUMES.map(v => (
                    <Pill
                      key={v.label}
                      label={v.label}
                      sub={v.sub}
                      icon={Users}
                      selected={form.volume === v.label}
                      onClick={() => update("volume", v.label)}
                    />
                  ))}
                </div>
              </div>
              <Field label="Specific Trade / Position Titles" required hint="e.g. 6G Welders, MEP Technicians, Structural Carpenters, Shuttering Foremen">
                <Input icon={Briefcase} placeholder="List specific trades needed" value={form.positions} onChange={e => update("positions", e.target.value)} />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-[13px] font-bold mb-4" style={{ color: "#475569" }}>Target Deployment Mobilization Window <span style={{ color: "#e62224" }}>*</span></p>
              <div className="grid grid-cols-2 gap-3">
                {TIMELINES.map(t => (
                  <Pill
                    key={t.label}
                    label={t.label}
                    sub={t.sub}
                    icon={Clock}
                    selected={form.timeline === t.label}
                    onClick={() => update("timeline", t.label)}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <Field label="Certifications & Trade Testing Parameters" hint="e.g. Bureau Veritas certification, Supreme Committee structural approval, specific medical checks">
                <Input icon={FileText} placeholder="List special compliance or trade test standards" value={form.skills} onChange={e => update("skills", e.target.value)} />
              </Field>
              <Field label="Base Salary Matrix / Allowances Structure" hint="Helps align matching candidate clusters from specific international trade testing centers">
                <Input placeholder="e.g. QAR 1,800 + Food allowance / Month" value={form.salaryRange} onChange={e => update("salaryRange", e.target.value)} />
              </Field>
              <Field label="Contractual & Camp Logistics Parameters">
                <Textarea
                  placeholder="Detail logistics provisions (e.g., Corporate camp accommodation details, local transport routing, specialized medical health insurance provisions)..."
                  value={form.additionalNotes}
                  onChange={e => update("additionalNotes", e.target.value)}
                />
              </Field>
             
              <div className="rounded-[14px] p-5 border" style={{ background: "rgba(21,72,149,0.04)", borderColor: "rgba(21,72,149,0.1)" }}>
                <p className="text-[12px] font-bold uppercase tracking-wider mb-3" style={{ color: "#154895" }}>Procurement Request Abstract</p>
                <div className="space-y-2 text-[12.5px]" style={{ color: "#475569" }}>
                  <div className="flex gap-2"><span className="font-semibold" style={{ color: "#1e293b" }}>Corporate Entity:</span> {form.companyName || "—"}</div>
                  <div className="flex gap-2"><span className="font-semibold" style={{ color: "#1e293b" }}>Target Sectors:</span> {form.industries.join(", ") || "—"}</div>
                  <div className="flex gap-2"><span className="font-semibold" style={{ color: "#1e293b" }}>Deploy Destination:</span> {form.destinations.join(", ") || "—"}</div>
                  <div className="flex gap-2"><span className="font-semibold" style={{ color: "#1e293b" }}>Cohort Scale:</span> {form.volume || "—"}</div>
                  <div className="flex gap-2"><span className="font-semibold" style={{ color: "#1e293b" }}>Target Schedule:</span> {form.timeline || "—"}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-10 pt-6 border-t" style={{ borderColor: "rgba(21,72,149,0.08)" }}>
            {step > 1 ? (
              <motion.button
                type="button"
                onClick={back}
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[13.5px] font-bold px-5 py-3 rounded-[10px] border-2 transition-all duration-200"
                style={{ color: "#154895", borderColor: "rgba(21,72,149,0.2)", background: "transparent" }}
              >
                <ChevronLeft size={15} /> Back
              </motion.button>
            ) : <div />}

            {step < 5 ? (
              <motion.button
                type="button"
                onClick={next}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 24px rgba(21,72,149,0.38)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[13.5px] font-bold px-7 py-3 rounded-[11px] text-white transition-all duration-200"
                style={{ background: "#154895", boxShadow: "0 4px 16px rgba(21,72,149,0.28)" }}
              >
                Continue <ChevronRight size={15} />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={submit}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 24px rgba(21,72,149,0.38)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[13.5px] font-bold px-7 py-3 rounded-[11px] text-white transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #154895, #1a58b8)", boxShadow: "0 4px 16px rgba(21,72,149,0.28)" }}
              >
                <Send size={14} /> Submit Request
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6"
        >
          {["SLA response inside 24h", "Ministry compliant tenders", "Full trade-testing validation"].map(t => (
            <div key={t} className="flex items-center gap-2 text-[12.5px] font-semibold" style={{ color: "#64748b" }}>
              <CheckCircle size={13} color="#154895" /> {t}
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        @keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.6} }
      `}</style>
    </div>
  );
}