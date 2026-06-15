import { useState } from "react";
import {
  Phone, Mail, MapPin,
  Linkedin, Facebook, Instagram,
  ArrowRight, ChevronRight, Send,
  FileText, HelpCircle, Download, BookOpen,
  Award,
} from "lucide-react";
import logo from "../../assets/logo.png";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Global Network", href: "/networks" },
  
    { label: "Mass Recruitment Campaigns", href: "/mass-recruitment" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Local Recruitment", href: "/services/local" },
    { label: "Domestic Recruitment", href: "/services/domestic" },
    { label: "Overseas Recruitment", href: "/services/overseas" },
    { label: "On-Site Recruitment", href: "/services/onsite" },
    { label: "Campaigns", href: "/services/campaigns" },
  ],
  Resources: [
    { label: "Blog / Insights", href: "/blog" },
    { label: "FAQs", href: "/faq" },
    { label: "Download Our Profile", href: "/downloads/profile" },
    { label: "Service Guide", href: "/downloads/service-guide" },
    { label: "Our Clients", href: "/clients" },
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
  {
    // WhatsApp icon via SVG since lucide doesn't have it
    Icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: "https://wa.me/97444434386",
    label: "WhatsApp",
    hoverColor: "hover:bg-[#25D366] hover:border-[#25D366] hover:text-white",
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

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "License & Certifications", href: "/licenses" },
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
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]
        gap-10 sm:gap-x-8 sm:gap-y-10 lg:gap-12">

        {/* Brand column */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col">
          <img
            src={logo}
            alt="Asliya Manpower Supply"
            className="h-14 sm:h-16 w-auto object-contain object-left mb-5"
          />

          <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
            Your trusted recruitment partner since 2018 — connecting top talent
            with leading employers across Qatar and beyond.
          </p>

          <ul className="flex flex-col gap-3 mb-7">
            {contactItems.map(({ Icon, text, href, ariaLabel, alignTop }) => (
              <li key={ariaLabel}>
                
                 <a href={href}
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
              
              <a  key={label}
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
                  
                  <a  href={link.href}
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

        <div className="text-center sm:text-left">
          <p>© 2018–{new Date().getFullYear()} Asliya Manpower Supply W.L.L. All rights reserved.</p>
          <p className="mt-0.5 flex items-center gap-1.5 justify-center sm:justify-start">
            <Award size={12} className="text-blue-700" />
            Licensed by Ministry of Labor, Qatar (License #618)
          </p>
          <p className="mt-0.5">
            Designed by{" "}
            <span className="text-blue-700 font-semibold">Sandesh Innovations</span>
          </p>
        </div>

        <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-center">
          {legalLinks.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-slate-300 transition-colors duration-200">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}