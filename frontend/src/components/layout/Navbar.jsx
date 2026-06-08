import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Globe,
  Crown,
  Users,
  Clock,
  Home,
  Zap,
  ArrowRight,
  MapPin,
} from "lucide-react";
import logo from "../../assets/logo.png"

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#services",
    children: [
      {
        label: "Domestic Recruitment",
        href: "/services",
        icon: Home,
        desc: "Local talent acquisition",
      },
      {
        label: "Overseas Recruitment",
        href: "/services",
        icon: Globe,
        desc: "International placements",
      },
      {
        label: "Executive Search",
        href: "//services",
        icon: Crown,
        desc: "C-suite & leadership",
      },
      {
        label: "Mass Recruitment",
        href: "/services",
        icon: Users,
        desc: "Large-scale hiring drives",
      },
      {
        label: "Temporary Staffing",
        href: "/services",
        icon: Clock,
        desc: "Flexible workforce solutions",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { num: "50K+", label: "Placed" },
  { num: "500+", label: "Clients" },
  { num: "42", label: "Countries" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activePage, setActivePage] = useState("Home");
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gradient-to-r from-[#0d3270] via-[#154895] to-[#3b7ce8]" />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/96 backdrop-blur-2xl shadow-[0_2px_32px_rgba(0,0,0,0.08)] border-b border-gray-100/80"
            : "bg-white/90 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px] gap-4">
            <motion.a
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* <div className="relative w-[38px] h-[38px] rounded-[10px] bg-[#154895] flex items-center justify-center overflow-hidden shadow-[0_2px_10px_rgba(21,72,149,0.35)] group-hover:shadow-[0_4px_18px_rgba(21,72,149,0.45)] transition-shadow duration-300">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[120%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div> */}
              {/* <div className="leading-none">
                <div className="text-[15.5px] font-bold text-gray-900 tracking-[-0.3px]">
                  RecruitMax
                </div>
                <div className="text-[9.5px] text-[#154895] font-semibold tracking-[0.1em] uppercase mt-[2px]">
                  Global Manpower
                </div>
              </div> */}

            <img 
  src={logo} 
  alt="Company Logo" 
  width={160} 
  height={50} 
  className="h-8 w-auto object-contain" 
/>

            </motion.a>

            <motion.div
              className="hidden sm:flex items-center gap-[6px] bg-[#eef4ff] border border-[rgba(21,72,149,0.18)] rounded-full px-3 py-[5px] flex-shrink-0"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.45,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-green-500" />
              </span>
              <span className="text-[11px] font-semibold text-[#154895]">
                1,240 live jobs
              </span>
            </motion.div>

            <nav className="hidden lg:flex items-center gap-[2px]">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.18 + i * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() =>
                    link.children && handleMouseEnter(link.label)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={link.href}
                    onClick={() => setActivePage(link.label)}
                    className={`relative flex items-center gap-[5px] px-[13px] py-[7px] text-[13.5px] font-semibold rounded-[9px] transition-all duration-200 ${
                      activePage === link.label
                        ? "text-[#154895] bg-[rgba(21,72,149,0.07)]"
                        : "text-gray-600 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.06)]"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`transition-transform duration-250 ${activeDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    )}

                    {activePage === link.label && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[14px] h-[2px] rounded-full bg-[#154895]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>

                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={() => handleMouseEnter(link.label)}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[248px] bg-white rounded-[16px] border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50"
                      >
                        <div className="px-4 pt-3 pb-2 border-b border-gray-50">
                          <p className="text-[10px] font-bold text-gray-400 tracking-[0.1em] uppercase">
                            What we offer
                          </p>
                        </div>
                        <div className="p-2">
                          {link.children.map((child, ci) => (
                            <motion.a
                              key={child.label}
                              href={child.href}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ci * 0.04, duration: 0.2 }}
                              className="flex items-center gap-3 px-3 py-[9px] rounded-[10px] group/item hover:bg-[rgba(21,72,149,0.06)] transition-colors duration-150"
                            >
                              <div className="w-[32px] h-[32px] rounded-[8px] bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-[#154895] group-hover/item:text-white transition-all duration-200 flex-shrink-0">
                                <child.icon size={15} strokeWidth={2} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-[13px] font-semibold text-gray-700 group-hover/item:text-[#154895] transition-colors duration-150 leading-none mb-[3px]">
                                  {child.label}
                                </div>
                                <div className="text-[11px] text-gray-400 truncate">
                                  {child.desc}
                                </div>
                              </div>
                              <ArrowRight
                                size={12}
                                className="ml-auto text-gray-300 group-hover/item:text-[#154895] group-hover/item:translate-x-[2px] transition-all duration-200 flex-shrink-0"
                              />
                            </motion.a>
                          ))}
                        </div>

                        <div className="px-4 py-3 bg-[#f8faff] border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[11px] text-gray-500 font-medium">
                            View all services
                          </span>
                          <ArrowRight size={12} className="text-[#154895]" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="hidden lg:flex items-center gap-2 flex-shrink-0"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href="tel:+1234567890"
                className="flex items-center gap-[6px] text-[12.5px] font-semibold text-gray-500 hover:text-[#154895] transition-colors duration-200 px-3 py-2 rounded-[8px] hover:bg-[rgba(21,72,149,0.05)]"
              >
                <Phone size={13} strokeWidth={2.5} />
                +1 234 567 890
              </a>

              <a
                href="#get-started"
                className="group relative flex items-center gap-2 bg-[#154895] hover:bg-[#1a58b8] text-white text-[13px] font-semibold px-5 py-[9px] rounded-[9px] overflow-hidden transition-all duration-250 shadow-[0_2px_10px_rgba(21,72,149,0.3)] hover:shadow-[0_4px_18px_rgba(21,72,149,0.4)] hover:-translate-y-[1px] active:translate-y-0"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[120%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                Get Started
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-[3px] transition-transform duration-200"
                />
              </a>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-[10px] hover:bg-gray-100 transition-colors duration-200 text-gray-700"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#154895] to-[#3b7ce8] origin-left"
          style={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[76px] z-50 bg-white rounded-[18px] border border-gray-100 shadow-[0_12px_48px_rgba(0,0,0,0.14)] overflow-hidden lg:hidden"
            >
              <div className="flex items-center justify-around bg-[#f4f8ff] border-b border-[rgba(21,72,149,0.1)] px-4 py-3">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-[16px] font-bold text-[#154895] leading-none">
                      {s.num}
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium mt-[2px] uppercase tracking-wide">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <nav className="px-3 pt-3 pb-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {link.children ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileServicesOpen(!mobileServicesOpen)
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-[14px] font-semibold text-gray-700 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.05)] rounded-[10px] transition-all duration-200"
                        >
                          {link.label}
                          <ChevronDown
                            size={14}
                            className={`text-gray-400 transition-transform duration-250 ${mobileServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.28,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 pl-3 border-l-2 border-[rgba(21,72,149,0.15)] mb-1">
                                {link.children.map((child) => (
                                  <a
                                    key={child.label}
                                    href={child.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-3 py-[9px] text-[13px] font-medium text-gray-600 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.04)] rounded-[8px] transition-all duration-150"
                                  >
                                    <child.icon
                                      size={14}
                                      className="text-gray-400"
                                    />
                                    {child.label}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => {
                          setActivePage(link.label);
                          setMobileOpen(false);
                        }}
                        className={`flex items-center px-4 py-3 text-[14px] font-semibold rounded-[10px] transition-all duration-200 ${
                          activePage === link.label
                            ? "text-[#154895] bg-[rgba(21,72,149,0.07)]"
                            : "text-gray-700 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.05)]"
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="px-3 pb-4 pt-2 border-t border-gray-50 flex flex-col gap-2">
                <a
                  href="tel:+1234567890"
                  className="flex items-center justify-center gap-2 py-[11px] text-[13.5px] font-semibold text-gray-600 border border-gray-200 rounded-[10px] hover:border-[#154895] hover:text-[#154895] transition-all duration-200"
                >
                  <Phone size={14} />
                  +1 234 567 890
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/hire"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-[11px] text-[13.5px] font-semibold text-white bg-[#154895] rounded-[10px] hover:bg-[#1a58b8] transition-colors duration-200 shadow-[0_2px_10px_rgba(21,72,149,0.3)]"
                  >
                    <Users size={14} />
                    Hire Talent
                  </a>
                  <a
                    href="/jobs"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-[11px] text-[13.5px] font-semibold text-[#154895] border border-[rgba(21,72,149,0.3)] rounded-[10px] hover:bg-[rgba(21,72,149,0.05)] transition-all duration-200"
                  >
                    <MapPin size={14} />
                    Find Jobs
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
