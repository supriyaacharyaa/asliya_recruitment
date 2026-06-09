import { useState, useEffect, useRef } from "react";
import {
  Zap, Globe, ShieldCheck, Trophy, Headphones, Scale
} from "lucide-react";

// ── Real Datasets Aligned With Ministry Guidelines & Verified Track Records ──
const features = [
  {
    Icon: Zap,
    title: "Fast Deployment",
    description: "Complete mobilization lifecycle wrapped within 25–30 days. Efficient deployment vectors managed under active project tracking.",
    color: "#e62224", bg: "#fdf2f2", // Asliya Brand Red Accent Accentuation
  },
  {
    Icon: Globe,
    title: "Global Supply Network",
    description: "Legally compliant operational structures operating seamlessly across 28+ sourcing nations with tailored vetting funnels.",
    color: "#154895", bg: "#f0f4fb", // Corporate Identity Blue Accent
  },
  {
    Icon: ShieldCheck,
    title: "Pre-Screened Talent",
    description: "Every single candidate undergoes multi-tier physical screening, capability testing, and medical parameters before Qatar routing.",
    color: "#059669", bg: "#ecfdf5",
  },
  {
    Icon: Trophy,
    title: "Proven Scale Fleet",
    description: "7+ Years of absolute leadership with 20,000+ deployments executed successfully across core enterprise sectors.",
    color: "#b9975b", bg: "#fbf8f2",
  },
  {
    Icon: Scale,
    title: "Zero Compliance Risk",
    description: "Fully licensed by Ministry of Labor (#618) and Supreme Committee approved. Absolute protection under Qatar Labor Law.",
    color: "#154895", bg: "#f0f4fb",
  },
  {
    Icon: Headphones,
    title: "Dedicated Task Forces",
    description: "Single point-of-contact account squads on-site to handle labor integration, logistics, and corporate administration.",
    color: "#0891B2", bg: "#ecfeff",
  },
];

/* ── Performance Optimized Animated Counter Engine ── */
function useCountUp(target, duration = 1200, suffix = "") {
  const [value, setValue] = useState("0" + suffix);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = 16;
          const steps = Math.ceil(duration / step);
          let current = 0;
          const timer = setInterval(() => {
            current++;
            const v = Math.round((current / steps) * target);
            setValue(v + suffix);
            if (current >= steps) { setValue(target + suffix); clearInterval(timer); }
          }, step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return { ref, value };
}

/* ── Hardware Accelerated CSS Intersection Hook ── */
function useFadeUp() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function FeatureCard({ Icon, title, description, color, bg, index }) {
  const { ref, visible } = useFadeUp();

  return (
    <div
      ref={ref}
      className={`wcu-card group ${visible ? "is-visible" : ""}`}
      style={{
        "--accent-color": color,
        "--bg-tint": bg,
        "--anim-delay": `${index * 70}ms`
      }}
    >
      {/* Icon Capsule Block */}
      <div className="wcu-icon-box">
        <Icon size={20} color={color} strokeWidth={2} />
      </div>

      {/* Text Context Node Elements */}
      <h3 className="wcu-card-title">{title}</h3>
      <p className="wcu-card-desc">{description}</p>

      {/* Sleek Underline Accent Border Rail */}
      <span className="wcu-card-rail" />
    </div>
  );
}

export default function WhyChooseUsSection() {
  const { ref: statRef, value: successVal } = useCountUp(20, 1400, "K+");

  return (
    <section className="wcu-section">
      <style>{`
        .wcu-section { 
          padding: 6rem 1.5rem; 
          background: #ffffff; 
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow: hidden;
        }
        .wcu-container {
          max-w-7xl; max-width: 1140px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.15fr;
          gap: 4.5rem; align-items: start;
        }
        .wcu-sticky-col { position: sticky; top: 3.5rem; }
        
        /* Eyebrow Label Badge */
        .wcu-eyebrow {
          display: inline-flex; items-center: center; gap: 8px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.15em;
          text-transform: uppercase; color: #e62224; margin-bottom: 1.25rem;
        }
        .wcu-line { width: 16px; height: 2px; background: #e62224; border-radius: 2px; }
        
        .wcu-heading {
          font-size: clamp(1.8rem, 3.2vw, 2.35rem); font-weight: 800;
          color: #0f172a;安排; line-height: 1.2; margin-bottom: 1.2rem;
          letter-spacing: -0.02em;
        }
        .wcu-heading span { color: #154895; }
        
        .wcu-intro { font-size: 14.5px; color: #475569; line-height: 1.75; margin-bottom: 2rem; }
        
        /* Real Stats Visual Identity Card */
        .wcu-stat-envelope {
          background: linear-gradient(135deg, #154895 0%, #0d3270 100%);
          border-radius: 24px; padding: 2rem; color: #ffffff;
          position: relative; overflow: hidden; box-shadow: 0 20px 40px -10px rgba(21,72,149,0.2);
        }
        .wcu-circle-decor-1 {
          position: absolute; top: -30px; right: -30px; width: 120px; height: 120px;
          background: rgba(255,255,255,0.05); border-radius: 50%; pointer-events: none;
        }
        
        .wcu-stat-num { font-size: 3.5rem; font-weight: 900; line-height: 1; letter-spacing: -0.03em; }
        .wcu-stat-lbl { font-size: 12px; color: #93c5fd; font-weight: 700; uppercase; tracking-wider; margin-top: 4px; letter-spacing: 0.05em; }
        .wcu-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 1.5rem 0; }
        
        .wcu-mini-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .wcu-metric-val { font-size: 16px; font-weight: 800; color: #ffffff; }
        .wcu-metric-lbl { font-size: 11px; color: #94a3b8; margin-top: 2px; }

        /* Performance Accelerated Feature Grid CSS rules */
        .wcu-feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        
        .wcu-card {
          background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px;
          padding: 1.5rem; position: relative; overflow: hidden;
          opacity: 0; transform: translateY(24px);
          transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1), 
                      box-shadow 0.4s cubic-bezier(0.2, 1, 0.3, 1), 
                      border-color 0.3s ease, opacity 0.4s ease;
        }
        .wcu-card.is-visible { opacity: 1; transform: translateY(0); transition-delay: var(--anim-delay); }
        .wcu-card:hover { border-color: #cbd5e1; transform: translateY(-4px); box-shadow: 0 12px 30px -5px rgba(15,23,42,0.08); }
        
        .wcu-icon-box {
          width: 44px; height: 44px; border-radius: 12px; background: var(--bg-tint);
          display: flex; align-items: center; justify-content: center; margin-bottom: 1.15rem;
          transition: transform 0.3s cubic-bezier(0.2, 1, 0.3, 1);
        }
        .wcu-card:hover .wcu-icon-box { transform: scale(1.08); }
        
        .wcu-card-title { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 6px; transition: color 0.2s; }
        .wcu-card:hover .wcu-card-title { color: var(--accent-color); }
        .wcu-card-desc { font-size: 12.5px; color: #64748b; line-height: 1.6; }
        
        .wcu-card-rail {
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: var(--accent-color); transform: scaleX(0);
          transform-origin: left; transition: transform 0.35s cubic-bezier(0.2, 1, 0.3, 1);
        }
        .wcu-card:hover .wcu-card-rail { transform: scaleX(1); }

        /* Responsive Breakpoint Adaptors */
        @media (max-width: 960px) {
          .wcu-container { grid-template-columns: 1fr; gap: 3rem; }
          .wcu-sticky-col { position: static; }
        }
        @media (max-width: 580px) {
          .wcu-feat-grid { grid-template-columns: 1fr; }
          .wcu-section { padding: 4rem 1rem; }
        }
      `}</style>

      <div className="wcu-container">

        {/* ── LEFT FRAMEWORK: Strategic Core & Master Counter ── */}
        <div className="wcu-sticky-col">
          <div className="wcu-eyebrow">
            <span className="wcu-line" />
            Corporate Assurance
          </div>

          <h2 className="wcu-heading">
            The Staffing Leadership <span>Your Enterprise Demands</span>
          </h2>

          <p className="wcu-intro">
            We bridge the gap between international workforce hubs and Qatar's major infrastructure projects. Operating under absolute legal compliance and rigorous assessment parameters, we don't just supply manpower—we de-risk your scaling operations.
          </p>

          <div ref={statRef} className="wcu-stat-envelope">
            <div className="wcu-circle-decor-1" />
            <div className="wcu-stat-num">{successVal}</div>
            <div className="wcu-stat-lbl">Successful Deployments</div>

            <div className="wcu-divider" />

            <div className="wcu-mini-metrics">
              <div>
                <div className="wcu-metric-val">7+ Years</div>
                <div className="wcu-metric-lbl">Qatar Market Tenure</div>
              </div>
              <div>
                <div className="wcu-metric-val">25-30 Days</div>
                <div className="wcu-metric-lbl">Target Mobilization Window</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT FRAMEWORK: Optimized Grid System Matrix ── */}
        <div className="wcu-feat-grid">
          {features.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}