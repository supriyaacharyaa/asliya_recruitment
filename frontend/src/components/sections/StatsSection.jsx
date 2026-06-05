import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Container from "../ui/Container";

const stats = [
  { value: 5000, suffix: "+", label: "Candidates Placed", description: "Successful placements across all industries" },
  { value: 300, suffix: "+", label: "Corporate Clients", description: "Businesses trust us with their hiring" },
  { value: 15, suffix: "+", label: "Industries Served", description: "From healthcare to construction" },
  { value: 10, suffix: "+", label: "Years Experience", description: "A decade of recruitment excellence" },
];

function CountUp({ value, suffix, inView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, value, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v.toLocaleString() + suffix;
      }
    });
  }, [rounded, suffix]);

  return (
    <span
      ref={displayRef}
      className="text-5xl xl:text-6xl font-black text-[#154895] tabular-nums"
    >
      0{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#e62224] uppercase tracking-widest mb-3">Our Impact</p>
          <h2 className="text-4xl font-black text-gray-900">Numbers That Define Us</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100 hover:border-[#154895]/20 hover:shadow-xl hover:shadow-[#154895]/8 transition-all duration-500 hover:-translate-y-1">
                <div className="mb-3">
                  <CountUp value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{stat.description}</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#154895] to-[#e62224] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
