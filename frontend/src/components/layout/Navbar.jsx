import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Button from "../ui/Button";
import logo from "../../assets/logo.png";

import {
  Globe,
  Briefcase,
  Users,
  ShieldCheck,
  Zap,
  FileText,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Domestic Recruitment",
        href: "/services",
        icon: Zap,
        desc: "Qatar to Qatar talent mobility",
      },
      {
        label: "Overseas Recruitment",
        href: "/services",
        icon: Globe,
        desc: "From 28+ approved source nations",
      },
      {
        label: "Local Supply",
        href: "/services",
        icon: Briefcase,
        desc: "Qatar local talent acquisition",
      },
      {
        label: "Mass Recruitment",
        href: "/services",
        icon: Users,
        desc: "Large-scale corporate campaigns",
      },
      {
        label: "Executive Search",
        href: "/services",
        icon: ShieldCheck,
        desc: "Ministry of Labor compliant tracking",
      },
      {
        label: "Temporary Staffing",
        href: "/services",
        icon: FileText,
        desc: "Flexible workforce solutions",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Clients", href: "/clients" },
  {label:"Global Network", href: "/networks"},
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [certBarHeight, setCertBarHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const certBar = document.getElementById("cert-bar");
    if (!certBar) return;
    const update = () => setCertBarHeight(certBar.offsetHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      {/* Top Certification Bar */}
      <div
        id="cert-bar"
        className="fixed top-0 left-0 right-0 z-[60] bg-white text-brand-secondary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-15">
          <div className="flex flex-col sm:flex-row items-center justify-between py-2 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span>✓ Licensed by Ministry of Labor Qatar</span>
              <span>✓ ISO 9000 Certified</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span>Qatar | Nepal | International Recruitment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ top: certBarHeight }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img
                src={logo}
                alt="Company Logo"
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#154895] rounded-xl hover:bg-[#154895]/5"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={13} />}
                  </a>

                  {/* Desktop dropdown unchanged */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden p-2"
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#154895] hover:bg-[#154895]/5 rounded-xl"
                          >
                            {child.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+9744443438"
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#154895]"
              >
                <Phone size={14} />
                +974 4443 4386
              </a>
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ top: certBarHeight + 64 }}
            className="fixed inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {/* Main link */}
                  <div className="flex items-center justify-between">
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#154895] rounded-xl"
                    >
                      {link.label}
                    </a>

                    {/* Dropdown toggle for Services */}
                    {link.children && (
                      <button
                        onClick={() =>
                          setMobileServiceOpen(!mobileServiceOpen)
                        }
                        className="p-2"
                      >
                        <ChevronDown
                          className={`transition-transform ${
                            mobileServiceOpen ? "rotate-180" : ""
                          }`}
                          size={18}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile dropdown */}
                  <AnimatePresence>
                    {link.children &&
                      mobileServiceOpen &&
                      link.label === "Services" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-4 border-l pl-4 space-y-2"
                        >
                          {link.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-sm text-gray-600 hover:text-[#154895]"
                            >
                              <div className="font-medium">
                                {child.label}
                              </div>
                              <div className="text-xs text-gray-400">
                                {child.desc}
                              </div>
                            </a>
                          ))}
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}

              {/* CTA */}
              <div className="mt-4 pt-4 border-t flex gap-3">
                <Button className="flex-1">Hire Talent</Button>
                <Button variant="outline" className="flex-1">
                  Find Jobs
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}