import { useState } from "react";
import {
  Phone, Mail, MapPin,
  Linkedin, Twitter, Facebook, Instagram,
  ArrowRight, ChevronRight, Send,
} from "lucide-react";
import logo from "../../assets/logo.png";

const footerLinks = {
  Services: [
    { label: "Domestic Recruitment", href: "/services" },
    { label: "Overseas Recruitment", href: "/services" },
    { label: "Executive Search", href: "/services" },
    { label: "Mass Recruitment", href: "/services" },
    { label: "Temporary Staffing", href: "/services" },
    { label: "Local Staffing", href: "/services" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Clients", href: "/clients" },
    { label: "News & Blog", href: "/blog" },
    { label: "Industries", href: "/industries" },
    { label: "Contact", href: "/contact" },
  ],
  Industries: [
    { label: "Construction", href: "/industries/construction" },
    { label: "Hospitality", href: "/industries/hospitality" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Manufacturing", href: "/industries/manufacturing" },
    { label: "IT & Technology", href: "/industries/technology" },
    { label: "Security Services", href: "/industries/security" },
  ],
};

const socials = [
  {
    Icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    hoverColor: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white",
  },
  {
    Icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter / X",
    hoverColor: "hover:bg-[#1D9BF0] hover:border-[#1D9BF0] hover:text-white",
  },
  {
    Icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
    hoverColor: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
  },
  {
    Icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
    hoverColor: "hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white",
  },
];

const contactItems = [
  {
    Icon: Phone,
    text: "+974 4443 4386",
    href: "tel:+97444434386",
    ariaLabel: "Call us",
  },
  {
    Icon: Mail,
    text: "info@asliyarecruitment.com",
    href: "mailto:info@asliyarecruitment.com",
    ariaLabel: "Email us",
  },
  {
    Icon: MapPin,
    text: "Muntaaza Trading, Doha, Qatar",
    href: "https://maps.google.com/?q=Muntaaza+Trading+Doha+Qatar",
    ariaLabel: "View on map",
    alignTop: true,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer
      className="font-[Plus_Jakarta_Sans,sans-serif]"
      style={{ background: "#0A0F1E", color: "#94A3B8" }}
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

      {/* Newsletter strip */}
      <div className="border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10
          flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-blue-700/30 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Send size={15} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[15px] font-extrabold text-white leading-tight">
                Stay in the loop
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Recruitment insights · Job alerts · Industry news
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full sm:w-auto sm:max-w-md gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
            <button
              type="submit"
              className="shrink-0 flex items-center gap-2 bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white text-sm font-bold px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              {subscribed ? "Done ✓" : <><span>Subscribe</span><ArrowRight size={14} className="hidden sm:block" /></>}
            </button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.9fr_1fr_1fr_1fr]
        gap-10 sm:gap-x-8 sm:gap-y-10 lg:gap-12">

        {/* Brand column — spans full width on mobile & tablet, single col on desktop */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col">
          <img
            src={logo}
            alt="Asliya Recruitment"
            className="h-14 sm:h-16 w-auto object-contain object-left mb-5"
          />

          <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
            Your trusted recruitment partner since 2014 — connecting top talent
            with leading employers across Qatar and beyond.
          </p>

          <ul className="flex flex-col gap-3 mb-7">
            {contactItems.map(({ Icon, text, href, ariaLabel, alignTop }) => (
              <li key={ariaLabel}>
                <a
                  href={href}
                  aria-label={ariaLabel}
                  target={href.startsWith("https://maps") ? "_blank" : undefined}
                  rel={href.startsWith("https://maps") ? "noopener noreferrer" : undefined}
                  className="group inline-flex gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <span
                    className={`shrink-0 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
                      group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all duration-200
                      ${alignTop ? "mt-0.5" : ""}`}
                  >
                    <Icon size={13} className="text-slate-400 group-hover:text-blue-400 transition-colors duration-200" />
                  </span>
                  <span className="break-all sm:break-normal">{text}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {socials.map(({ Icon, href, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10
                  text-slate-400 transition-all duration-200 ${hoverColor}`}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <p className="text-[10.5px] font-bold tracking-[2px] uppercase text-white mb-5">
              {title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-white transition-colors duration-200"
                  >
                    <ChevronRight
                      size={11}
                      className="text-blue-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px mx-4 sm:mx-6 bg-white/[0.07]" />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5
        flex flex-col sm:flex-row items-center justify-between gap-3
        text-[12.5px] text-slate-600">
        <p>© {new Date().getFullYear()} Asliya Recruitment. All rights reserved. Licensed by Ministry of Labor, Qatar (License #618)</p>
      
        <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-center">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <a key={item} href="#" className="hover:text-slate-300 transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}