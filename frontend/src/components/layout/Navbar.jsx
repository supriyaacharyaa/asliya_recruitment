import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import Button from "../ui/Button";
import logo from "../../assets/logo.png";

const navLinks = [
  { label: "Home", href: "#" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Domestic Recruitment", href: "/services" },
      { label: "Overseas Recruitment", href: "#" },
      { label: "Executive Search", href: "#" },
      { label: "Mass Recruitment", href: "#" },
      { label: "Temporary Staffing", href: "#" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xl shadow-gray-900/5 border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            {/* <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-sm">RM</span>
              </div>
              <div>
                <div className="font-black text-gray-900 text-lg leading-none">RecruitMax</div>
                <div className="text-[10px] text-[#154895] font-semibold tracking-widest uppercase">
                  Global Manpower
                </div>
              </div>
            </a> */}
           



{/* Logo */}
<a href="/" className="flex items-center">
  <img
    src={logo}
    alt="Company Logo"
    className="h-14 w-auto object-contain"
  />
</a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#154895] rounded-xl hover:bg-[#154895]/5 transition-all duration-200"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={13} className="text-gray-400" />}
                  </a>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-900/10 overflow-hidden p-2"
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#154895] hover:bg-[#154895]/5 rounded-xl transition-all duration-200 font-medium"
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
                href="tel:+1234567890"
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#154895] transition-colors duration-200 px-3 py-2"
              >
                <Phone size={14} />
                +1 234 567 890
              </a>
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#154895] hover:bg-[#154895]/5 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                <Button variant="primary" className="flex-1">
                  Hire Talent
                </Button>
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
