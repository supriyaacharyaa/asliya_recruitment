import { motion } from "framer-motion";
import { Zap, Globe, ShieldCheck, Trophy, Headphones, Scale } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const features = [
  {
    icon: Zap,
    title: "Fast Hiring",
    description: "Average time-to-fill of 7–14 days. Our streamlined process eliminates bottlenecks and delivers results quickly.",
    accent: "bg-amber-500",
    light: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Operations across 30+ countries with local expertise and international standards for seamless cross-border hiring.",
    accent: "bg-[#154895]",
    light: "bg-[#154895]/8",
    iconColor: "text-[#154895]",
  },
  {
    icon: ShieldCheck,
    title: "Verified Talent",
    description: "Every candidate undergoes rigorous background checks, skills testing, and reference verification.",
    accent: "bg-emerald-500",
    light: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: Trophy,
    title: "Industry Expertise",
    description: "15+ years of deep sector knowledge across construction, healthcare, hospitality, IT, and more.",
    accent: "bg-violet-500",
    light: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Your personal account manager is available throughout the entire recruitment journey — no handoffs.",
    accent: "bg-cyan-500",
    light: "bg-cyan-50",
    iconColor: "text-cyan-500",
  },
  {
    icon: Scale,
    title: "Compliance Focus",
    description: "Full adherence to labor laws, visa regulations, and international employment standards in every country we operate.",
    accent: "bg-[#e62224]",
    light: "bg-[#e62224]/8",
    iconColor: "text-[#e62224]",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-28 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Heading + intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32"
          >
            <p className="text-sm font-semibold text-[#e62224] uppercase tracking-widest mb-4">
              Why Choose Us
            </p>
            <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6">
              The Recruitment Partner You've Been Looking For
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              We don't just fill positions — we build long-term workforce partnerships. Our approach combines technology, expertise, and a human touch that the biggest platforms can't replicate.
            </p>

            {/* Big stat */}
            <div className="bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-2xl p-8 text-white">
              <div className="text-5xl font-black mb-2">97%</div>
              <div className="text-white/70 text-sm font-semibold">Client Retention Rate</div>
              <div className="mt-4 h-px bg-white/10" />
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-white font-bold">4.9/5.0</div>
                  <div className="text-white/50">Avg. Client Rating</div>
                </div>
                <div>
                  <div className="text-white font-bold">48 hrs</div>
                  <div className="text-white/50">First Candidates</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="group bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-gray-200 hover:shadow-lg transition-all duration-400"
                >
                  <div className={`w-12 h-12 ${feature.light} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className={feature.iconColor} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-[#154895] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
                  <div className={`mt-4 h-0.5 ${feature.accent} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
