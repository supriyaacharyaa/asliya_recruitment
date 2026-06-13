import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Globe,
  Briefcase,
  Users,
  ShieldCheck,
  ArrowRight,
  FileText,
} from "lucide-react";
import logo from "../../assets/logo.png";

// ── Nav data ──────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Local Recruitment",
        href: "/services",
        icon: Briefcase,
        desc: "Qatar local talent acquisition",
      },
      {
        label: "Overseas Recruitment",
        href: "/services",
        icon: Globe,
        desc: "From 28+ approved source nations",
      },
      {
        label: "Bulk Manpower Supply",
        href: "/services",
        icon: Users,
        desc: "Large-scale corporate campaigns",
      },
      {
        label: "Visa & Compliance Support",
        href: "/services",
        icon: ShieldCheck,
        desc: "Ministry of Labor compliant tracking",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Our Clients", href: "/clients" },
  { label: "Global Network", href: "/networks" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { num: "20K+", label: "Deployed" },
  { num: "300+", label: "Clients" },
  { num: "28+", label: "Countries" },
];

// ── Component ─────────────────────────────────────────────────

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  // Determine active link from URL
  const isActive = (link) => {
    if (link.href === "/") return location.pathname === "/";
    return location.pathname.startsWith(link.href);
  };

  return (
    <>
      {/* Top accent bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gradient-to-r from-[#0d3270] via-[#154895] to-[#3b7ce8]" />

      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/96 backdrop-blur-2xl shadow-[0_2px_32px_rgba(0,0,0,0.06)] border-b border-gray-100/80"
            : "bg-white/90 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-[68px] md:h-[76px] gap-2 md:gap-4">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center group">
                <img
                  src={logo}
                  alt="Asliya Manpower Supply Logo"
                  className="h-9 sm:h-11 md:h-12 lg:h-12 xl:h-14 w-auto object-contain transition-all duration-300"
                />
              </Link>
            </motion.div>

            {/* License badge */}
            <motion.div
              className="hidden xl:flex items-center gap-[6px] bg-[#eef4ff] border border-[rgba(21,72,149,0.15)] rounded-full px-3 py-[5px] flex-shrink-0"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-green-500" />
              </span>
              <span className="text-[11px] font-semibold text-[#154895] tracking-wide whitespace-nowrap">
                License No: 618
              </span>
            </motion.div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center lg:gap-1 xl:gap-2 2xl:gap-3">
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
                  onMouseEnter={() => link.children && handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={link.href}
                    className={`relative flex items-center gap-[4px] lg:px-[10px] xl:px-[14px] py-[6px] lg:text-[13px] xl:text-[14px] font-semibold rounded-[8px] transition-all duration-200 whitespace-nowrap ${
                      isActive(link)
                        ? "text-[#154895] bg-[rgba(21,72,149,0.07)]"
                        : "text-gray-600 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.05)]"
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={12}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {isActive(link) && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[12px] h-[2px] rounded-full bg-[#154895]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={() => handleMouseEnter(link.label)}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[268px] bg-white rounded-[16px] border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.1)] overflow-hidden z-50"
                      >
                        <div className="px-4 pt-3 pb-2 border-b border-gray-50">
                          <p className="text-[10px] font-bold text-gray-400 tracking-[0.1em] uppercase">
                            What we offer
                          </p>
                        </div>
                        <div className="p-2">
                          {link.children.map((child, ci) => (
                            <motion.div key={child.label}>
                              <Link
                                to={child.href}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 px-3 py-[9px] rounded-[10px] group/item hover:bg-[rgba(21,72,149,0.06)] transition-colors duration-150"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="w-[32px] h-[32px] rounded-[8px] bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-[#154895] group-hover/item:text-white transition-all duration-200 flex-shrink-0">
                                  <child.icon size={15} strokeWidth={2} />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-[13px] font-semibold text-gray-700 group-hover/item:text-[#154895] transition-colors duration-150 leading-none mb-[4px] truncate">
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
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        <Link
                          to="/services"
                          onClick={() => setActiveDropdown(null)}
                          className="px-4 py-3 bg-[#f8faff] border-t border-gray-100 flex items-center justify-between group/footer hover:bg-[#f2f6ff] transition-colors"
                        >
                          <span className="text-[11px] text-gray-500 font-semibold group-hover/footer:text-[#154895]">
                            View all services
                          </span>
                          <ArrowRight
                            size={12}
                            className="text-[#154895] group-hover/footer:translate-x-1 transition-transform"
                          />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            {/* Right CTAs */}
            <motion.div
              className="hidden lg:flex items-center lg:gap-2 xl:gap-3 flex-shrink-0"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="tel:+97444434386"
                className="flex items-center gap-[6px] lg:text-[12px] xl:text-[13.5px] font-bold text-gray-600 hover:text-[#154895] transition-colors duration-200 px-2 xl:px-3 py-2 rounded-[8px] hover:bg-[rgba(21,72,149,0.05)] whitespace-nowrap"
              >
                <Phone size={13} strokeWidth={2.5} className="text-[#154895]" />
                <span className="hidden xl:inline">+974 4443 4386</span>
                <span className="xl:hidden">Call Us</span>
              </a>

              <Link
                to="/contact"
                className="group relative flex items-center gap-1.5 bg-[#154895] hover:bg-[#1a58b8] text-white lg:text-[12px] xl:text-[13px] font-bold lg:px-4 xl:px-5 py-[9px] rounded-[9px] overflow-hidden transition-all duration-250 shadow-[0_2px_10px_rgba(21,72,149,0.25)] hover:shadow-[0_4px_18px_rgba(21,72,149,0.35)] hover:-translate-y-[1px] active:translate-y-0 whitespace-nowrap"
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[120%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                Submit Vacancy
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-[3px] transition-transform duration-200 flex-shrink-0"
                />
              </Link>
            </motion.div>

            {/* Mobile hamburger */}
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

        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#154895] to-[#3b7ce8] origin-left"
          style={{ scaleX, opacity: scrolled ? 1 : 0 }}
        />
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[79px] z-50 bg-white rounded-[18px] border border-gray-100 shadow-[0_12px_48px_rgba(0,0,0,0.14)] overflow-hidden lg:hidden"
            >
              {/* Stats strip */}
              <div className="flex items-center justify-around bg-[#f4f8ff] border-b border-[rgba(21,72,149,0.1)] px-4 py-3">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-[16px] font-bold text-[#154895] leading-none">
                      {s.num}
                    </div>
                    <div className="text-[10px] text-gray-400 font-semibold mt-[3px] uppercase tracking-wide">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Nav links */}
              <nav className="px-3 pt-3 pb-2 max-h-[60vh] overflow-y-auto">
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
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 text-[14px] font-semibold text-gray-700 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.05)] rounded-[10px] transition-all duration-200"
                        >
                          {link.label}
                          <ChevronDown
                            size={14}
                            className={`text-gray-400 transition-transform duration-200 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 pl-3 border-l-2 border-[rgba(21,72,149,0.15)] mb-1">
                                {link.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 px-3 py-[9px] text-[13px] font-medium text-gray-600 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.04)] rounded-[8px] transition-all duration-150"
                                  >
                                    <child.icon size={14} className="text-gray-400" />
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-4 py-3 text-[14px] font-semibold rounded-[10px] transition-all duration-200 ${
                          isActive(link)
                            ? "text-[#154895] bg-[rgba(21,72,149,0.07)]"
                            : "text-gray-700 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.05)]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="px-3 pb-4 pt-2 border-t border-gray-50 flex flex-col gap-2">
                <a
                  href="tel:+97444434386"
                  className="flex items-center justify-center gap-2 py-[11px] text-[13.5px] font-bold text-gray-600 border border-gray-200 rounded-[10px] hover:border-[#154895] hover:text-[#154895] transition-all duration-200"
                >
                  <Phone size={14} className="text-[#154895]" />
                  +974 4443 4386
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-[11px] text-[13.5px] font-bold text-white bg-[#154895] rounded-[10px] hover:bg-[#1a58b8] transition-colors duration-200 shadow-[0_2px_10px_rgba(21,72,149,0.25)]"
                  >
                    <FileText size={14} />
                    Hire Talent
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-[11px] text-[13.5px] font-bold text-[#154895] border border-[rgba(21,72,149,0.3)] rounded-[10px] hover:bg-[rgba(21,72,149,0.05)] transition-all duration-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}