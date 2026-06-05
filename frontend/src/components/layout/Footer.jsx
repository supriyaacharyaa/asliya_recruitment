import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from "lucide-react";
import Container from "../ui/Container";
import logo from "../../assets/logo.png"; 

const footerLinks = {
  Services: [
    "Domestic Recruitment",
    "Overseas Recruitment",
    "Executive Search",
    "Mass Recruitment",
    "Temporary Staffing",
    "Local Staffing",
  ],
  Company: ["About Us", "Our Team", "Careers", "News & Blog", "CSR", "Contact"],
  Industries: [
    "Construction",
    "Hospitality",
    "Healthcare",
    "Manufacturing",
    "IT & Technology",
    "Security Services",
  ],
};

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Newsletter strip */}
      <div className="border-b border-gray-800">
        <Container className="py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-1">Stay Updated</h3>
              <p className="text-gray-400 text-sm">Get the latest recruitment insights and job opportunities.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#154895] transition-colors duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#154895] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1256b8] transition-colors duration-200 flex items-center gap-2"
              >
                Subscribe <ArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main footer */}
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2">
            {/* <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">RM</span>
              </div>
              <div>
                <div className="font-black text-white text-lg leading-none">RecruitMax</div>
                <div className="text-[10px] text-[#154895] font-semibold tracking-widest uppercase">
                  Global Manpower
                </div>
              </div>
            </div> */}


<div className="mb-6">
  <img
    src={logo}
    alt="Company Logo"
    className="h-16 w-auto object-contain"
  />
</div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted recruitment partner for domestic, overseas, and mass hiring solutions since 2014.
            </p>
            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                <Phone size={14} className="text-[#154895]" /> +1 234 567 890
              </a>
              <a href="mailto:info@recruitmax.com" className="flex items-center gap-3 hover:text-white transition-colors duration-200">
                <Mail size={14} className="text-[#154895]" /> info@recruitmax.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-[#154895] mt-0.5 flex-shrink-0" />
                123 Business Tower, Suite 400, New York, NY 10001
              </div>
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-[#154895] rounded-xl flex items-center justify-center transition-all duration-300 group"
                >
                  <Icon size={15} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© {new Date().getFullYear()} RecruitMax Global Manpower. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
