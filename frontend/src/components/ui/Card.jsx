import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = true,
  padding = "p-6",
  onClick,
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`
        bg-white border border-gray-100 rounded-2xl shadow-sm
        hover:border-gray-200 hover:shadow-lg transition-shadow duration-300
        ${onClick ? "cursor-pointer" : ""}
        ${padding}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
