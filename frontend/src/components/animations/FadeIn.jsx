import { motion } from "framer-motion";

export default function FadeIn({ children, delay = 0, duration = 0.6, className = "", once = true }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once }}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
