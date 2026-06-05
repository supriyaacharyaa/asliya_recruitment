import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Container from "../ui/Container";

export default function CTASection() {
  return (
    <section className="py-20 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-br from-[#154895] via-[#1a56b0] to-[#0d3270] rounded-3xl overflow-hidden px-8 py-16 md:p-20 text-center"
        >
          {/* Background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.06, 0.1, 0.06] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#e62224] rounded-full blur-3xl"
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-[#e62224] rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-semibold">Ready to Get Started?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-6"
            >
              Ready To Build Your{" "}
              <span className="relative">
                Workforce?
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10 Q75 2 150 7 Q225 12 298 5" stroke="#e62224" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/70 text-lg leading-relaxed mb-10"
            >
              Join 300+ companies that trust us with their most critical asset — their people. Let's build your team today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-[#154895] font-bold px-8 py-4 rounded-2xl flex items-center gap-2.5 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-300"
              >
                Hire Talent Now
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl border border-white/20 flex items-center gap-2.5 hover:bg-white/20 transition-colors duration-300"
              >
                <Calendar size={18} />
                Schedule Consultation
              </motion.button>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 text-white/40 text-sm"
            >
              Free consultation · No commitment required · Response within 24 hours
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
