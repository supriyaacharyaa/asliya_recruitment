import { motion } from "framer-motion";

const variants = {
  primary: "bg-[#154895] text-white hover:bg-[#1256b8] shadow-lg shadow-[#154895]/25 hover:shadow-xl hover:shadow-[#154895]/30",
  secondary: "bg-[#e62224] text-white hover:bg-[#c01a1c] shadow-lg shadow-[#e62224]/25",
  outline: "bg-white text-[#154895] border-2 border-[#154895] hover:bg-[#154895] hover:text-white",
  ghost: "text-[#154895] hover:bg-[#154895]/8",
};

const sizes = {
  sm: "text-sm px-5 py-2.5 rounded-xl",
  md: "text-sm px-6 py-3 rounded-xl",
  lg: "text-base px-8 py-4 rounded-2xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`
        inline-flex items-center justify-center gap-2.5 font-bold
        transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {iconPosition === "left" && Icon && <Icon size={size === "lg" ? 18 : 15} />}
      {children}
      {iconPosition === "right" && Icon && <Icon size={size === "lg" ? 18 : 15} />}
    </motion.button>
  );
}
