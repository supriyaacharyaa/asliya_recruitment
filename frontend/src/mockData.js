import {
  HardHat,
  Hotel,
  HeartPulse,
  Factory,
  Monitor,
  Shield,
  Truck,
  ShoppingBag,
} from "lucide-react";

// ── Industries ────────────────────────────────────────────────────────────────
export const industriesData = [
  {
    icon: HardHat,
    name: "Construction",
    description: "From site workers to project managers, we staff every level of your construction team.",
    roles: ["Civil Engineers", "Site Supervisors"],
  },
  {
    icon: Hotel,
    name: "Hospitality",
    description: "Skilled front-of-house and back-of-house professionals for hotels, resorts, and restaurants.",
    roles: ["Hotel Managers", "Guest Relations"],
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "Qualified nurses, caregivers, and allied health professionals for clinics and hospitals.",
    roles: ["Registered Nurses", "Caregivers"],
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Production-line workers, quality controllers, and plant managers for manufacturing facilities.",
    roles: ["Plant Operators", "QA Engineers"],
  },
  {
    icon: Monitor,
    name: "IT & Technology",
    description: "Software developers, IT support, and tech leaders to drive your digital transformation.",
    roles: ["Full-Stack Devs", "IT Managers"],
  },
  {
    icon: Shield,
    name: "Security Services",
    description: "Trained, certified security personnel for corporate, industrial, and residential deployments.",
    roles: ["Security Guards", "CCTV Operators"],
  },
  {
    icon: Truck,
    name: "Transportation",
    description: "Licensed drivers, logistics coordinators, and fleet managers across all vehicle categories.",
    roles: ["HGV Drivers", "Fleet Managers"],
  },
  {
    icon: ShoppingBag,
    name: "Retail",
    description: "Sales associates, store managers, and visual merchandisers for retail and e-commerce brands.",
    roles: ["Store Managers", "Sales Staff"],
  },
];

// ── Clients ───────────────────────────────────────────────────────────────────
export const clientsData = [
  { name: "Marriott International", abbr: "MAR", industry: "Hospitality", color: "linear-gradient(135deg, #154895, #0d3270)" },
  { name: "Hilton Hotels", abbr: "HLT", industry: "Hospitality", color: "linear-gradient(135deg, #1a6b9a, #134f72)" },
  { name: "Samsung Group", abbr: "SAM", industry: "Technology", color: "linear-gradient(135deg, #1428a0, #0a1a6a)" },
  { name: "Hyatt Hotels", abbr: "HYT", industry: "Hospitality", color: "linear-gradient(135deg, #7b2d8b, #5a2068)" },
  { name: "Carrefour", abbr: "CAR", industry: "Retail", color: "linear-gradient(135deg, #e62224, #b01a1c)" },
  { name: "Saudi Aramco", abbr: "ARC", industry: "Energy", color: "linear-gradient(135deg, #006b4f, #004d38)" },
  { name: "Emirates Group", abbr: "EMR", industry: "Aviation", color: "linear-gradient(135deg, #e62224, #8b0000)" },
  { name: "Nestlé S.A.", abbr: "NES", industry: "FMCG", color: "linear-gradient(135deg, #c8102e, #951025)" },
  { name: "Siemens AG", abbr: "SIE", industry: "Engineering", color: "linear-gradient(135deg, #009999, #006b6b)" },
  { name: "Accor Hotels", abbr: "ACC", industry: "Hospitality", color: "linear-gradient(135deg, #c6a84b, #9a7e35)" },
  { name: "Unilever PLC", abbr: "UNI", industry: "FMCG", color: "linear-gradient(135deg, #1f36c7, #1528a0)" },
  { name: "Bosch Group", abbr: "BSH", industry: "Manufacturing", color: "linear-gradient(135deg, #e20015, #a80011)" },
  { name: "Marriott MEA", abbr: "MME", industry: "Hospitality", color: "linear-gradient(135deg, #2d4a8a, #1e3366)" },
  { name: "G4S Security", abbr: "G4S", industry: "Security", color: "linear-gradient(135deg, #4b4b4b, #2a2a2a)" },
  { name: "Sodexo", abbr: "SDX", industry: "Facilities", color: "linear-gradient(135deg, #0054a0, #003d78)" },
  { name: "Aramark Corp", abbr: "ARK", industry: "Services", color: "linear-gradient(135deg, #e62224, #a01618)" },
  { name: "ISS Group", abbr: "ISS", industry: "Facilities", color: "linear-gradient(135deg, #006837, #004d29)" },
  { name: "Transguard", abbr: "TRG", industry: "Security", color: "linear-gradient(135deg, #c8102e, #8b0b1f)" },
  { name: "Al Futtaim", abbr: "ALF", industry: "Conglomerate", color: "linear-gradient(135deg, #1a3c8f, #0f256b)" },
  { name: "Landmark Group", abbr: "LMG", industry: "Retail", color: "linear-gradient(135deg, #ff6900, #cc5200)" },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
export const testimonialsData = [
  {
    name: "Mr. Sami Kayed Mohammad Hindawa",
    designation: "General Manager",
    company: "Al Misnad Services",
    review:
     "Asliya Manpower Supply has consistently demonstrated the ability to manage high-volume recruitment campaigns and mobilize workers from various African and Asian countries within demanding timeframes." ,
    rating: 5,
  },
  {
    name: "Ahmed Abdrabbo",
    designation: "General Manager",
    company: "Draieh Contracting",
    review:
      "We've worked with many recruitment agencies, but none have matched the professionalism and reliability of Asliya Recruitment. Their compliance knowledge is second to none, especially for overseas placements.",
    rating: 5,
  },
  {
    name: "Mr. Antonie Ready",
    designation: "Plant Director",
    company: " BUTEC Qatar",
    review:
      "We are happy to work with Asliya Manpower Supply and confidently recommend their services to any organization requiring bulk manpower recruitment.",
    rating: 5,
  },
  {
    name: "Fatima Al-Zahra",
    designation: "Chief People Officer",
    company: "Accor Hotels",
    review:
      "The dedicated account manager assigned to us felt like a true extension of our HR team. Their market knowledge and candidate network in the hospitality sector is unparalleled.",
    rating: 5,
  },
  {
    name: "Michael Okafor",
    designation: "Construction Director",
    company: "Turner & Townsend",
    review:
      "We brought Asliya Recruitment in for a major infrastructure project requiring 500+ skilled tradespeople. They delivered on time, on budget, and every worker was properly certified. Outstanding execution.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    designation: "VP of Talent",
    company: "Infosys BPO",
    review:
      "Their executive search capabilities helped us find our new CTO within 3 weeks. The quality of candidates at the leadership level was truly impressive. We'll be using them for all future searches.",
    rating: 5,
  },
];
