import { useState } from "react";
import {
  Phone, Mail, MapPin,
  Linkedin, Twitter, Facebook, Instagram,
  ArrowRight, ChevronRight
} from "lucide-react";
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
  { Icon: Linkedin,  href: "#", label: "LinkedIn",  color: "#0A66C2" },
  { Icon: Twitter,   href: "#", label: "Twitter",   color: "#1D9BF0" },
  { Icon: Facebook,  href: "#", label: "Facebook",  color: "#1877F2" },
  { Icon: Instagram, href: "#", label: "Instagram", color: "#E1306C" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .footer-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #0A0F1E;
    color: #94A3B8;
  }

  /* ── Newsletter strip ── */
  .nl-strip {
    border-bottom: 1px solid rgba(255,255,255,.07);
    padding: 2.5rem 2rem;
  }
  .nl-inner {
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center;
    justify-content: space-between; gap: 2rem;
    flex-wrap: wrap;
  }
  .nl-title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .nl-sub   { font-size: 13.5px; color: #64748B; }
  .nl-form  { display: flex; gap: 10px; flex: 1; max-width: 440px; min-width: 260px; }
  .nl-input {
    flex: 1; background: rgba(255,255,255,.05);
    border: 1.5px solid rgba(255,255,255,.1);
    border-radius: 10px; padding: 11px 16px;
    font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif;
    color: #fff; outline: none;
    transition: border-color .2s, background .2s;
  }
  .nl-input::placeholder { color: #475569; }
  .nl-input:focus { border-color: #1E40AF; background: rgba(255,255,255,.08); }
  .nl-btn {
    background: #1E40AF; color: #fff;
    border: none; border-radius: 10px;
    padding: 11px 22px; font-size: 14px; font-weight: 700;
    font-family: 'Plus Jakarta Sans', sans-serif;
    cursor: pointer; display: flex; align-items: center; gap: 7px;
    transition: background .2s, transform .2s, box-shadow .2s; white-space: nowrap;
  }
  .nl-btn:hover { background: #1E3A8A; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(30,64,175,.4); }
  .nl-btn:active { transform: translateY(0); }

  /* ── Main grid ── */
  .ft-main {
    max-width: 1100px; margin: 0 auto;
    padding: 4rem 2rem 3.5rem;
    display: grid;
    grid-template-columns: 1.9fr 1fr 1fr 1fr;
    gap: 3rem;
  }

  /* Brand col */
  .ft-logo { margin-bottom: 1.25rem; }
  .ft-logo img { height: 52px; width: auto; object-fit: contain; }
  .ft-tagline { font-size: 13.5px; color: #64748B; line-height: 1.75; margin-bottom: 1.5rem; max-width: 280px; }

  /* Contact items */
  .ft-contact { display: flex; flex-direction: column; gap: 12px; margin-bottom: 1.5rem; }
  .ft-contact-row {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 13.5px; color: #94A3B8;
    text-decoration: none; transition: color .2s;
  }
  .ft-contact-row:hover { color: #fff; }
  .ft-contact-icon {
    width: 30px; height: 30px; flex-shrink: 0;
    background: rgba(30,64,175,.15); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }

  /* Socials */
  .ft-socials { display: flex; gap: 8px; }
  .ft-social {
    width: 36px; height: 36px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 9px; display: flex;
    align-items: center; justify-content: center;
    transition: all .25s; text-decoration: none;
  }
  .ft-social:hover { transform: translateY(-3px); }

  /* Link columns */
  .ft-col-title {
    font-size: 11px; font-weight: 700; letter-spacing: 1.8px;
    text-transform: uppercase; color: #fff;
    margin-bottom: 1.1rem;
  }
  .ft-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .ft-link {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 13.5px; color: #64748B; text-decoration: none;
    transition: color .2s, gap .2s;
  }
  .ft-link:hover { color: #fff; gap: 8px; }
  .ft-link-arrow { opacity: 0; transition: opacity .2s; font-size: 12px; }
  .ft-link:hover .ft-link-arrow { opacity: 1; }

  /* ── Divider / bottom bar ── */
  .ft-bottom-wrap { border-top: 1px solid rgba(255,255,255,.07); }
  .ft-bottom {
    max-width: 1100px; margin: 0 auto;
    padding: 1.5rem 2rem;
    display: flex; align-items: center;
    justify-content: space-between; gap: 1rem;
    flex-wrap: wrap;
  }
  .ft-copy { font-size: 12.5px; color: #475569; }
  .ft-legal { display: flex; gap: 1.5rem; }
  .ft-legal a { font-size: 12.5px; color: #475569; text-decoration: none; transition: color .2s; }
  .ft-legal a:hover { color: #fff; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .ft-main { grid-template-columns: 1fr 1fr; }
    .ft-brand { grid-column: 1 / -1; }
  }
  @media (max-width: 560px) {
    .ft-main { grid-template-columns: 1fr; }
    .nl-inner { flex-direction: column; align-items: flex-start; }
    .ft-bottom { flex-direction: column; text-align: center; }
    .ft-legal { flex-wrap: wrap; justify-content: center; }
  }
`;

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
    <footer className="footer-root">
      <style>{CSS}</style>

      {/* ── Newsletter strip ── */}
      <div className="nl-strip">
        <div className="nl-inner">
          <div>
            <div className="nl-title">Stay Updated</div>
            <div className="nl-sub">Get the latest recruitment insights and job opportunities.</div>
          </div>
          <form className="nl-form" onSubmit={handleSubscribe}>
            <input
              className="nl-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="nl-btn" type="submit">
              {subscribed ? (
                <>Done ✓</>
              ) : (
                <>Subscribe <ArrowRight size={14} /></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="ft-main">

        {/* Brand column */}
        <div className="ft-brand">
          <div className="ft-logo">
            <img src={logo} alt="Company logo" />
          </div>
          <p className="ft-tagline">
            Your trusted recruitment partner for domestic, overseas, and mass hiring solutions since 2014.
          </p>

          {/* Contact */}
          <div className="ft-contact">
            <a href="tel:+1234567890" className="ft-contact-row">
              <div className="ft-contact-icon">
                <Phone size={14} color="#3B82F6" strokeWidth={1.8} />
              </div>
              +1 234 567 890
            </a>
            <a href="mailto:info@recruitmax.com" className="ft-contact-row">
              <div className="ft-contact-icon">
                <Mail size={14} color="#3B82F6" strokeWidth={1.8} />
              </div>
              info@recruitmax.com
            </a>
            <div className="ft-contact-row">
              <div className="ft-contact-icon" style={{ flexShrink: 0 }}>
                <MapPin size={14} color="#3B82F6" strokeWidth={1.8} />
              </div>
              123 Business Tower, Suite 400,<br />New York, NY 10001
            </div>
          </div>

          {/* Social icons */}
          <div className="ft-socials">
            {socials.map(({ Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="ft-social"
                style={{ "--hover-color": color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = color + "22";
                  e.currentTarget.style.borderColor = color + "55";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.1)";
                }}
              >
                <Icon size={15} color="#64748B" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <div className="ft-col-title">{category}</div>
            <ul className="ft-links">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="ft-link">
                    <ChevronRight size={12} className="ft-link-arrow" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom-wrap">
        <div className="ft-bottom">
          <div className="ft-copy">
            © {new Date().getFullYear()} RecruitMax Global Manpower. All rights reserved.
          </div>
          <div className="ft-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}