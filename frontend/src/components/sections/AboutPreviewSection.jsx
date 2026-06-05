import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Globe } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const highlights = [
  { icon: Award, label: "ISO Certified", desc: "Quality assured processes" },
  { icon: Users, label: "Expert Team", desc: "Dedicated recruitment specialists" },
  { icon: Globe, label: "Global Reach", desc: "Operations in 30+ countries" },
];

export default function AboutPreviewSection() {
  return (
    <section className="py-28 bg-[#f8f9fc] overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#154895] to-[#0d3270] aspect-[4/5] shadow-2xl shadow-[#154895]/25">
              <div className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 80%, rgba(230,34,36,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center mb-8 border border-white/20">
                  <Users size={44} className="text-white" />
                </div>
                <h3 className="text-white text-3xl font-black mb-4 leading-tight">A Decade of<br />Excellence</h3>
                <p className="text-white/60 text-base leading-relaxed max-w-xs">
                  From a small domestic staffing firm to a globally recognized recruitment partner
                </p>
              </div>

              {/* Decorative squares */}
              <div className="absolute top-8 right-8 w-20 h-20 border border-white/10 rounded-2xl" />
              <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/10 rounded-xl" />
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-2xl shadow-gray-200/80 border border-gray-100"
            >
              <div className="text-4xl font-black text-[#154895]">10+</div>
              <div className="text-sm font-semibold text-gray-500 mt-1">Years in Business</div>
            </motion.div>

            {/* Decorative accent */}
            <div className="absolute -top-6 -left-6 w-48 h-48 border-2 border-dashed border-[#154895]/15 rounded-3xl -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold text-[#e62224] uppercase tracking-widest mb-4">About Us</p>
            <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight mb-6">
              Your Trusted Recruitment Partner
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Founded in 2014, we have grown into one of the most reliable recruitment and manpower agencies, specializing in placing skilled professionals across domestic and international markets.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              Our mission is simple: connect exceptional talent with the right opportunities while helping businesses build high-performing teams. With a deep understanding of industry demands and a vast talent network, we deliver results that matter.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 text-center hover:border-[#154895]/20 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-[#154895]/8 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={18} className="text-[#154895]" />
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-1">{label}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                </div>
              ))}
            </div>

            <Button variant="primary" size="lg" icon={ArrowRight}>
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
