import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
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
  Clock3,
  Search,
  UserCheck,
  Info,
  Building2,
  UserCircle2,
} from "lucide-react";
import logo from "../../assets/logo.png";

// ── Nav link definitions ─────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#services",
    children: [
      {
        label: "Domestic Recruitment",
        href: "/services#domestic",
        icon: Briefcase,
        desc: "Qatar local talent acquisition",
      },
      {
        label: "Overseas Recruitment",
        href: "/services#overseas",
        icon: Globe,
        desc: "From 28+ approved source nations",
      },
      {
        label: "Local Staffing",
        href: "/services#staffing",
        icon: UserCheck,
        desc: "Flexible workforce solutions",
      },
      {
        label: "Mass Recruitment",
        href: "/services/#mass",
        icon: Users,
        desc: "Large-scale corporate campaigns",
      },
      {
        label: "Executive Search",
        href: "/services#executive",
        icon: Search,
        desc: "Leadership and C-level hiring",
      },
      {
        label: "Temp Staffing",
        href: "/services#temp",
        icon: Clock3,
        desc: "Short-term and project-based staffing",
      },
    ],
  },
  
  {
    label: "Company",
    href: "/about",
    children: [
      {
        label: "About Us",
        href: "/about",
        icon: Info,
        desc: "Our story, mission and values",
      },
      {
        label: "Industries",
        href: "/industries",
        icon: Building2,
        desc: "Sectors we specialise in",
      },
      {
        label: "Our Clients",
        href: "/clients",
        icon: UserCircle2,
        desc: "Trusted by 300+ organisations",
      },
    ],
  },
  {label:"Mass Recruitment Campaign",
    href:"/services/mass"
  },
  { label: "Global Network", href: "/networks" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const stats = [
  { num: "20K+", label: "Deployed" },
  { num: "300+", label: "Clients" },
  { num: "28+",  label: "Countries" },
];

// ── Hard-navigate helper (forces full reload + hash scroll) ──────
function hardNavigate(url) {
  const target = new URL(url, window.location.origin);
  const isSamePath = target.pathname === window.location.pathname;

  if (isSamePath && target.hash) {
    sessionStorage.setItem("__scrollToHash", target.hash);
    window.location.href = url;
    window.location.reload();
  } else {
    window.location.href = url;
  }
}

// ── Component ────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  // Track which mobile accordion is open by label (supports multiple dropdowns)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const [pageLoading, setPageLoading]       = useState(false);

  const certBarRef      = useRef(null);
  const navbarRef       = useRef(null);
  const dropdownTimeout = useRef(null);

  const [certBarHeight, setCertBarHeight] = useState(0);
  const [navbarHeight,  setNavbarHeight]  = useState(0);

  // ── Scroll progress bar ────────────────────────────────────────
  // useScroll tracks how far the user has scrolled the page (0 → 1).
  // useTransform maps that 0–1 range to a CSS scaleX value (0 → 1)
  // which we apply to a fixed-width bar at the bottom of the navbar.
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // ── Scrolled shadow state ──────────────────────────────────────
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // ── Active page detection ──────────────────────────────────────
  const getActivePage = () => {
    const path = window.location.pathname;
    const matched = navLinks.find((link) => {
      if (link.href === "/") return path === "/";
      return path.startsWith(link.href) && link.href !== "#services";
    });
    return matched?.label ?? "";
  };
  const [activePage, setActivePage] = useState(getActivePage);

  // ── Restore hash scroll after same-path reload ─────────────────
  useEffect(() => {
    const hash = sessionStorage.getItem("__scrollToHash");
    if (hash) {
      sessionStorage.removeItem("__scrollToHash");
      const id = hash.replace("#", "");
      const attempt = (retries = 8) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (retries > 0) {
          setTimeout(() => attempt(retries - 1), 120);
        }
      };
      setTimeout(() => attempt(), 200);
    }
  }, []);

  // ── Measure cert-bar + navbar height for mobile panel offset ──
  useEffect(() => {
    const measure = () => {
      if (certBarRef.current) setCertBarHeight(certBarRef.current.offsetHeight);
      if (navbarRef.current)  setNavbarHeight(navbarRef.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (certBarRef.current) ro.observe(certBarRef.current);
    if (navbarRef.current)  ro.observe(navbarRef.current);
    return () => ro.disconnect();
  }, []);

  // ── Active page on browser back/forward ───────────────────────
  useEffect(() => {
    const onPop = () => setActivePage(getActivePage());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // ── Close mobile menu on desktop resize ───────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Lock body scroll while mobile menu is open ────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Desktop dropdown hover helpers ────────────────────────────
  const handleMouseEnter = (label) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  // ── Navigate with a brief loader flash ────────────────────────
  const navigateWithLoader = (url) => {
    setPageLoading(true);
    setTimeout(() => hardNavigate(url), 300);
  };

  // ── Toggle a mobile accordion (close if same, open if different)
  const toggleMobileDropdown = (label) => {
    setMobileOpenDropdown((prev) => (prev === label ? null : label));
  };

  const totalHeaderHeight = certBarHeight + navbarHeight;

  return (
    <>
      {/* Spacer so page content starts below the fixed header */}
      <div style={{ height: totalHeaderHeight }} aria-hidden="true" />

      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">

        {/* ── Certification bar ─────────────────────────────────── */}
        <div ref={certBarRef} className="bg-white border-b border-gray-100 flex-shrink-0">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-between py-[6px] sm:py-[7px] gap-y-[2px]">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] sm:text-[12px] font-semibold text-brand-primary">
                <span className="flex items-center gap-1">
                  <span className="text-brand-primary font-bold">✓</span>
                  Licensed by Ministry of Labor Qatar Government MOL:618
                </span>
                <span className="hidden xs:flex items-center gap-1">
                  <span className="text-brand-primary font-bold">✓</span>
                  ISO 9000 Certified
                </span>
              </div>
              <div className="hidden md:flex items-center text-[11px] sm:text-[12px] font-semibold text-brand-primary">
                Qatar · Nepal · International Recruitment
              </div>
            </div>
          </div>
        </div>

        {/* ── Main navbar ───────────────────────────────────────── */}
        <motion.header
          ref={navbarRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`flex-shrink-0 transition-all duration-500 relative ${
            scrolled
              ? "bg-white/96 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
              : "bg-white/95 backdrop-blur-md"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="flex items-center justify-between h-[60px] sm:h-[68px] lg:h-[72px] gap-2 md:gap-4">

              {/* Logo */}
              <a href="/" className="flex items-center flex-shrink-0">
                <img
                  src={logo}
                  alt="Asliya Manpower Supply Logo"
                  className="h-8 sm:h-10 md:h-11 lg:h-12 xl:h-14 w-auto object-contain transition-all duration-300"
                />
              </a>

              {/* License badge — desktop only */}
              <div className="hidden xl:flex items-center gap-[6px] bg-[#eef4ff] border border-[rgba(21,72,149,0.15)] rounded-full px-3 py-[5px] flex-shrink-0">
                <span className="relative flex h-[7px] w-[7px]">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-green-500" />
                </span>
                <span className="text-[11px] font-semibold text-[#154895] tracking-wide whitespace-nowrap">
                  License No: 618
                </span>
              </div>

              {/* ── Desktop nav ─────────────────────────────────── */}
              <nav className="hidden lg:flex items-center lg:gap-0 xl:gap-1">
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.children && handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      href={link.href}
                      onClick={() => setTimeout(() => setActivePage(getActivePage()), 0)}
                      className={`relative flex items-center gap-[3px] lg:px-[9px] xl:px-[12px] py-[6px] lg:text-[12.5px] xl:text-[13.5px] font-semibold rounded-[8px] transition-all duration-200 whitespace-nowrap ${
                        activePage === link.label
                          ? "text-[#154895] bg-[rgba(21,72,149,0.07)]"
                          : "text-gray-600 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.05)]"
                      }`}
                    >
                      {link.label}
                      {link.children && (
                        <ChevronDown
                          size={11}
                          strokeWidth={2.5}
                          className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`}
                        />
                      )}
                      {/* Animated active underline dot */}
                      {activePage === link.label && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[12px] h-[2px] rounded-full bg-[#154895]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>

                    {/* Desktop dropdown panel */}
                    <AnimatePresence>
                      {link.children && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          onMouseEnter={() => handleMouseEnter(link.label)}
                          onMouseLeave={handleMouseLeave}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[260px] bg-white rounded-[16px] border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.1)] overflow-hidden z-50"
                        >
                          {/* Dropdown header label */}
                          <div className="px-4 pt-3 pb-2 border-b border-gray-50">
                            <p className="text-[10px] font-bold text-gray-400 tracking-[0.1em] uppercase">
                              {link.label === "Services" ? "What we offer" : link.label}
                            </p>
                          </div>

                          {/* Dropdown items */}
                          <div className="p-2">
                            {link.children.map((child, ci) => (
                              <motion.a
                                key={child.label}
                                href={child.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveDropdown(null);
                                  navigateWithLoader(child.href);
                                }}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: ci * 0.04, duration: 0.2 }}
                                className="flex items-center gap-3 px-3 py-[9px] rounded-[10px] group/item hover:bg-[rgba(21,72,149,0.06)] transition-colors duration-150"
                              >
                                <div className="w-[32px] h-[32px] rounded-[8px] bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-[#154895] group-hover/item:text-white transition-all duration-200 flex-shrink-0">
                                  <child.icon size={15} strokeWidth={2} />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-[13px] font-semibold text-gray-700 group-hover/item:text-[#154895] transition-colors duration-150 leading-none mb-[4px] truncate">
                                    {child.label}
                                  </div>
                                  {child.desc && (
                                    <div className="text-[11px] text-gray-400 truncate">
                                      {child.desc}
                                    </div>
                                  )}
                                </div>
                                <ArrowRight
                                  size={12}
                                  className="ml-auto text-gray-300 group-hover/item:text-[#154895] group-hover/item:translate-x-[2px] transition-all duration-200 flex-shrink-0"
                                />
                              </motion.a>
                            ))}
                          </div>

                          {/* Footer CTA — "View all services" only for Services dropdown */}
                          {link.label === "Services" && (
                            <a
                              href="/services"
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveDropdown(null);
                                navigateWithLoader("/services");
                              }}
                              className="px-4 py-3 bg-[#f8faff] border-t border-gray-100 flex items-center justify-between group/footer hover:bg-[#f2f6ff] transition-colors"
                            >
                              <span className="text-[11px] text-gray-500 font-semibold group-hover/footer:text-[#154895]">
                                View all services
                              </span>
                              <ArrowRight size={12} className="text-[#154895] group-hover/footer:translate-x-1 transition-transform" />
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* ── Desktop CTA buttons ─────────────────────────── */}
              <div className="hidden lg:flex items-center lg:gap-2 xl:gap-3 flex-shrink-0">
                <a
                  href="tel:+97444434386"
                  className="flex items-center gap-[6px] lg:text-[12px] xl:text-[13px] font-bold text-gray-600 hover:text-[#154895] transition-colors duration-200 px-2 xl:px-3 py-2 rounded-[8px] hover:bg-[rgba(21,72,149,0.05)] whitespace-nowrap"
                >
                  <Phone size={13} strokeWidth={2.5} className="text-[#154895]" />
                  <span className="hidden xl:inline">+974 4443 4386</span>
                  <span className="xl:hidden">Call Us</span>
                </a>

                <a
                  href="#vacancy"
                  className="group relative flex items-center gap-1.5 bg-[#154895] hover:bg-[#1a58b8] text-white lg:text-[12px] xl:text-[13px] font-bold lg:px-4 xl:px-5 py-[9px] rounded-[9px] overflow-hidden transition-all duration-250 shadow-[0_2px_10px_rgba(21,72,149,0.25)] hover:shadow-[0_4px_18px_rgba(21,72,149,0.35)] hover:-translate-y-[1px] active:translate-y-0 whitespace-nowrap"
                >
                  {/* Shimmer sweep on hover */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[120%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                  Submit Vacancy
                  <ArrowRight size={13} className="group-hover:translate-x-[3px] transition-transform duration-200 flex-shrink-0" />
                </a>
              </div>

              {/* ── Mobile hamburger ───────────────────────────── */}
              <button
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
              </button>
            </div>
          </div>

          {/* ── Scroll progress bar (brand-primary #154895) ───────
              scaleX is driven by scrollYProgress (0→1) via useTransform.
              The bar is hidden (opacity 0) until the user starts scrolling. */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] w-full bg-[#154895] origin-left"
            style={{ scaleX, opacity: scrolled ? 1 : 0 }}
          />
        </motion.header>
      </div>

      {/* ── Mobile menu panel ─────────────────────────────────────── */}
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

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ top: totalHeaderHeight + 8 }}
              className="fixed inset-x-3 z-50 bg-white rounded-[18px] border border-gray-100 shadow-[0_12px_48px_rgba(0,0,0,0.14)] overflow-hidden lg:hidden"
            >
              {/* Stats strip */}
              <div className="flex items-center justify-around bg-[#f4f8ff] border-b border-[rgba(21,72,149,0.1)] px-4 py-3">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-[16px] font-bold text-[#154895] leading-none">{s.num}</div>
                    <div className="text-[10px] text-gray-400 font-semibold mt-[3px] uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Nav links */}
              <nav className="px-3 pt-3 pb-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {link.children ? (
                      <>
                        {/* Accordion toggle button */}
                        <button
                          onClick={() => toggleMobileDropdown(link.label)}
                          className="w-full flex items-center justify-between px-4 py-3 text-[14px] font-semibold text-gray-700 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.05)] rounded-[10px] transition-all duration-200"
                        >
                          {link.label}
                          <ChevronDown
                            size={14}
                            className={`text-gray-400 transition-transform duration-250 ${
                              mobileOpenDropdown === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Accordion body — animated height */}
                        <AnimatePresence>
                          {mobileOpenDropdown === link.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 pl-3 border-l-2 border-[rgba(21,72,149,0.15)] mb-1">
                                {link.children.map((child) => (
                                  <a
                                    key={child.label}
                                    href={child.href}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setMobileOpen(false);
                                      navigateWithLoader(child.href);
                                    }}
                                    className="flex items-center gap-3 px-3 py-[9px] text-[13px] font-medium text-gray-600 hover:text-[#154895] hover:bg-[rgba(21,72,149,0.04)] rounded-[8px] transition-all duration-150"
                                  >
                                    <child.icon size={14} className="text-gray-400 flex-shrink-0" />
                                    {child.label}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      /* Plain link */
                      <a
                        href={link.href}
                        onClick={() => {
                          setTimeout(() => setActivePage(getActivePage()), 0);
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

              {/* Bottom CTA strip */}
              <div className="px-3 pb-4 pt-2 border-t border-gray-50 flex flex-col gap-2">
                <a
                  href="tel:+97444434386"
                  className="flex items-center justify-center gap-2 py-[11px] text-[13px] font-bold text-gray-600 border border-gray-200 rounded-[10px] hover:border-[#154895] hover:text-[#154895] transition-all duration-200"
                >
                  <Phone size={14} className="text-[#154895]" />
                  +974 4443 4386
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="#vacancy"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-[11px] text-[13px] font-bold text-white bg-[#154895] rounded-[10px] hover:bg-[#1a58b8] transition-colors duration-200 shadow-[0_2px_10px_rgba(21,72,149,0.25)]"
                  >
                    <FileText size={14} />
                    Hire Talent
                  </a>
                  <a
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-[11px] text-[13px] font-bold text-[#154895] border border-[rgba(21,72,149,0.3)] rounded-[10px] hover:bg-[rgba(21,72,149,0.05)] transition-all duration-200"
                  >
                    Contact Us
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