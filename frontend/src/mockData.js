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

import arp from "./assets/clientslogo/arp.png";
import cer from "./assets/clientslogo/cer.png";
import akh from "./assets/clientslogo/akh.png";
import dal from "./assets/clientslogo/dal.png";
import ram from "./assets/clientslogo/ram.png";
import drc from "./assets/clientslogo/drc.png";
import ams from "./assets/clientslogo/ams.png";
import asf from "./assets/clientslogo/asf.png";
import qit from "./assets/clientslogo/qit.png";
import naa from "./assets/clientslogo/naa.png";
import eus from "./assets/clientslogo/eus.png";
import tlv from "./assets/clientslogo/tlv.png";
import gas from "./assets/clientslogo/gas.png";
import mil from "./assets/clientslogo/mil.svg";
import mow from "./assets/clientslogo/mow.svg";
import but from  "./assets/clientslogo/but.svg";
import sno from  "./assets/clientslogo/sno.svg";
import mec from  "./assets/clientslogo/mec.svg";
import maz from  "./assets/clientslogo/maz.png";

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
  // {
  //   name: "Al Rayyan Projects Management",
  //   abbr: "ARP",
  //   industry: "Holding Group",
  //   sector: "GOVERNMENT",
  //   workers: "250+",
  //   website: "",
  //   logo: arp,
  //   color: "linear-gradient(135deg, #1a3c8f, #0f256b)",
  // },
  {
    name: "Certis Security",
    abbr: "CER",
    industry: "Security Services",
    sector: "PRIVATE",
    workers: "150+",
    website: "https://www.certisgroup.com/qa/",
    logo: cer,
    color: "linear-gradient(135deg, #4b4b4b, #2a2a2a)",
  },
  {
    name: "Al Khebra Holding",
    abbr: "AKH",
    industry: "Holding Group",
    sector: "PRIVATE",
    workers: "200+",
    website: "https://alkhebradriving.com",
    logo: akh,
    color: "linear-gradient(135deg, #7b2d8b, #5a2068)",
  },
  // {
  //   name: "Dallah Holding",
  //   abbr: "DAL",
  //   industry: "Holding Group",
  //   sector: "PRIVATE",
  //   workers: "50+",
  //   website: "https://www.dallahholding.com",
  //   logo: dal,
  //   color: "linear-gradient(135deg, #1f36c7, #1528a0)",
  // },
  {
    name: "Ramaco",
    abbr: "RAM",
    industry: "Construction",
    sector: "PRIVATE",
    workers: "3000+",
    website: "https://ramaco-qatar.net",
    logo: ram,
    color: "linear-gradient(135deg, #e62224, #b01a1c)",
  },
  // {
  //   name: "Draieh Contracting",
  //   abbr: "DRC",
  //   industry: "Construction",
  //   sector: "PRIVATE",
  //   workers: "100+",
  //   website: "https://draieh.com",
  //   logo: drc,
  //   color: "linear-gradient(135deg, #e62224, #a01618)",
  // },
  {
    name: "Al Misnad Services",
    abbr: "AMS",
    industry: "Facility Management",
    sector: "PRIVATE",
    workers: "200+",
    website: "http://www.almisnadservices.com/?bsg_team=abdulla-misnad",
    logo: ams,
    color: "linear-gradient(135deg, #006837, #004d29)",
  },
  {
    name: "Assiyana FM",
    abbr: "ASF",
    industry: "Facility Management",
    sector: "PRIVATE",
    workers: "300+",
    website: "https://www.assiyana.com/en/Home",
    logo: asf,
    color: "linear-gradient(135deg, #006b6b, #004d4d)",
  },
  {
    name: "Qitico – Qatar International Trading",
    abbr: "QIT",
    industry: "Facility Management",
    sector: "PRIVATE",
    workers: "100+",
    website: "https://qiti.co",
    logo: qit,
    color: "linear-gradient(135deg, #00857a, #005f57)",
  },
  {
    name: "NAAAS Holding",
    abbr: "NAA",
    industry: "Holding Group",
    sector: "PRIVATE",
    workers: "250+",
    website: "https://naaasholdinggroup.com",
    logo: naa,
    color: "linear-gradient(135deg, #1a3c8f, #102966)",
  },
  {
    name: "European Security",
    abbr: "EUS",
    industry: "Security Services",
    sector: "PRIVATE",
    workers: "200+",
    website: "https://egssco.com",
    logo: eus,
    color: "linear-gradient(135deg, #5a5a5a, #333333)",
  },
  {
    name: "That's Living",
    abbr: "TLV",
    industry: "Factory",
    sector: "PRIVATE",
    workers: "100+",
    website: "https://qa.thatsliving.com/?_rb=f&t-p-c=QA&t-p-l=en&_s=_s-c-u&t-p-r=",
    logo: tlv,
    color: "linear-gradient(135deg, #c8102e, #8b0b1f)",
  },
  {
    name: "GASCO",
    abbr: "GAS",
    industry: "Group",
    sector: "PRIVATE",
    workers: "250+",
    website: "https://gascoqatar.com",
    logo: gas,
    color: "linear-gradient(135deg, #006b4f, #00493a)",
  },
    {
    name: "Milaha",
    abbr: "MIL",
    industry: "Land and Marine",
    sector: "GOVERNMENT",
    workers: "300+",
    website: "https://www.milaha.com/en/node/4",
    logo: mil,
    color: "linear-gradient(135deg, #5a5a5a, #333333)",
  },
   {
    name: "Moswalat",
    abbr: "MOW",
    industry: "Holding Group",
    sector: "GOVERNMENT",
    workers: "400+",
    website: "https://www.mowasalat.com",
    logo: mow,
    color: "linear-gradient(135deg, #1a3c8f, #102966))",
  },
   {
    name: "BUTEC-Qatar",
    abbr: "BUT",
    industry: "Construction",
    sector: "PRIVATE",
    workers: "300+",
    website: "https://www.butec.com",
    logo: but,
    color: "linear-gradient(135deg, #1a3c8f, #102966))",
  },
  {
    name: "SNOONU",
    abbr: "SNO",
    industry: "Delivery",
    sector: "PRIVATE",
    workers: "100+",
    website: "https://snoonu.com",
    logo: sno,
    color: "linear-gradient(135deg, #c8102e, #8b0b1f)",
  },
   {
    name: "MECC - Middle East Cleaning Co.",
    abbr: "GAS",
    industry: "Facility Management",
    sector: "PRIVATE",
    workers: "250+",
    website: "https://mecc.qa",
    logo: mec,
    color: "linear-gradient(135deg, #006b4f, #00493a)",
  },
  
];

// ── Testimonials ──────────────────────────────────────────────────────────────
export const testimonialsData = [
  {
    name: "Sami Kayed Mohammad Hindawa",
    designation: "General Manager",
    company: "Al Misnad Services",
    review:
      "Asliya Manpower Supply has consistently demonstrated the ability to manage high-volume recruitment campaigns and mobilize workers from various African and Asian countries within demanding timeframes.",
    rating: 5,
  },
  {
    name: "Ahmed Abdrabbo",
    designation: "General Manager",
    company: "Draieh Contracting",
    review:
      "Asliya Manpower Supply continues to support our current projects, and we look forward to maintaining our ongoing business relationship with them.",
    rating: 5,
  },
  {
    name: "Antonie Ready",
    designation: "Manager",
    company: "BUTEC Qatar",
    review:
      "We are happy to work with Asliya Manpower Supply and confidently recommend their services to any organization requiring bulk manpower recruitment.",
    rating: 5,
  },
  {
    name: "European Guarding Security Services",
    designation: "",
    company: "European Guarding Security Services",
    review:
      "This recognition is awarded in recognition of exceptional dedication, professionalism and unwavering commitment to providing excellent manpower supply services.",
    rating: 5,
  },
  {
    name: "Sajimon Sebastian",
    designation: "HR & Admin Manager",
    company: "GASCO",
    review:
      "We confidently recommend their services to other organizations.",
    rating: 5,
  },
];
