import { useState, useEffect, useRef } from "react";
import {
  Zap, Globe, ShieldCheck, Trophy, Headphones, Scale
} from "lucide-react";

const features = [
  {
    Icon: Zap,
    title: "Fast Hiring",
    description: "Average time-to-fill of 7–14 days. Our streamlined process eliminates bottlenecks and delivers results quickly.",
    color: "#D97706", bg: "#FEF3C7", cls: "c1",
  },
  {
    Icon: Globe,
    title: "Global Reach",
    description: "Operations across 30+ countries with local expertise and international standards for seamless cross-border hiring.",
    color: "#1E40AF", bg: "#EFF6FF", cls: "c2",
  },
  {
    Icon: ShieldCheck,
    title: "Verified Talent",
    description: "Every candidate undergoes rigorous background checks, skills testing, and reference verification before placement.",
    color: "#059669", bg: "#ECFDF5", cls: "c3",
  },
  {
    Icon: Trophy,
    title: "Industry Expertise",
    description: "15+ years of deep sector knowledge across construction, healthcare, hospitality, IT, and more.",
    color: "#7C3AED", bg: "#F5F3FF", cls: "c4",
  },
  {
    Icon: Headphones,
    title: "Dedicated Support",
    description: "Your personal account manager is available throughout the entire recruitment journey — no handoffs, ever.",
    color: "#0891B2", bg: "#ECFEFF", cls: "c5",
  },
  {
    Icon: Scale,
    title: "Compliance Focus",
    description: "Full adherence to labor laws, visa regulations, and international employment standards in every country we operate.",
    color: "#DC2626", bg: "#FEF2F2", cls: "c6",
  },
];

/* ── Animated counter hook ── */
function useCountUp(target, duration = 1400, suffix = "") {
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
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return { ref, value };
}

/* ── Fade-up on scroll hook ── */
function useFadeUp(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible, delay };
}

/* ── Feature card ── */
function FeatureCard({ Icon, title, description, color, bg, index }) {
  const { ref, visible } = useFadeUp(index * 80);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "1.5px solid #E2E8F0",
        borderRadius: 16,
        padding: "1.4rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s cubic-bezier(.22,1,.36,1), border-color 0.25s ease",
        transform: !visible ? "translateY(24px)" : hovered ? "translateY(-5px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
        boxShadow: hovered ? "0 16px 40px rgba(15,23,42,.1)" : "none",
        borderColor: hovered ? "#CBD5E1" : "#E2E8F0",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 48, height: 48, borderRadius: 12,
          background: bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1rem",
          transition: "transform 0.32s cubic-bezier(.22,1,.36,1)",
          transform: hovered ? "scale(1.12)" : "scale(1)",
        }}
      >
        <Icon size={22} color={color} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div style={{
        fontSize: 14, fontWeight: 700, marginBottom: 6,
        color: hovered ? color : "#0F172A",
        transition: "color 0.25s ease",
      }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.65 }}>
        {description}
      </div>

      {/* Bottom accent bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 3, borderRadius: "0 0 16px 16px",
        background: color,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.35s cubic-bezier(.22,1,.36,1)",
      }} />
    </div>
  );
}

/* ── Main section ── */
export default function WhyChooseUsSection() {
  const { ref: statRef, value: retentionVal } = useCountUp(97, 1400, "%");

  return (
    <section style={{ padding: "5.5rem 2rem", background: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .wcu-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1.1fr;
          gap: 4rem; align-items: start;
        }
        .wcu-sticky { position: sticky; top: 2rem; }
        .wcu-feat-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }
        @media (max-width: 900px) {
          .wcu-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .wcu-sticky { position: static !important; }
        }
        @media (max-width: 560px) {
          .wcu-feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="wcu-grid">

        {/* ── LEFT: Heading + stat card ── */}
        <div className="wcu-sticky">

          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", color: "#DC2626", marginBottom: "1.1rem",
          }}>
            <span style={{ width: 20, height: 2.5, background: "#DC2626", borderRadius: 2, display: "inline-block" }} />
            Why Choose Us
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(1.75rem, 3vw, 2.4rem)", fontWeight: 800,
            color: "#0F172A", lineHeight: 1.18, marginBottom: "1rem",
          }}>
            The Recruitment Partner{" "}
            <span style={{ color: "#1E40AF" }}>You've Been<br />Looking For</span>
          </h2>

          {/* Description */}
          <p style={{ fontSize: 15.5, color: "#64748B", lineHeight: 1.78, marginBottom: "1.75rem" }}>
            We don't just fill positions — we build long-term workforce partnerships. Our approach combines technology, expertise, and a human touch that the biggest platforms can't replicate.
          </p>

          {/* Stat card */}
          <div
            ref={statRef}
            style={{
              background: "#1E40AF", borderRadius: 16, padding: "1.75rem",
              color: "#fff", position: "relative", overflow: "hidden",
            }}
          >
            {/* Decorative circle */}
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 140, height: 140,
              background: "rgba(255,255,255,.06)", borderRadius: "50%",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: -60, right: 20,
              width: 100, height: 100,
              background: "rgba(255,255,255,.04)", borderRadius: "50%",
              pointerEvents: "none",
            }} />

            <div style={{ fontSize: "3.25rem", fontWeight: 800, lineHeight: 1, color: "#fff" }}>
              {retentionVal}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)", fontWeight: 600, marginTop: 4 }}>
              Client Retention Rate
            </div>

            <div style={{ height: 1, background: "rgba(255,255,255,.12)", margin: "1.25rem 0" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>4.9 / 5.0</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 2 }}>Avg. Client Rating</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>48 hrs</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 2 }}>First Candidates</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Feature cards grid ── */}
        <div className="wcu-feat-grid">
          {features.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}