import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Users,
  Megaphone,
  Search,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const services = [
  {
    icon: Building2,
    title: "Domestic Recruitment",
    description:
      "End-to-end hiring solutions for local businesses. We source, screen, and place top talent within your country.",
    color: "from-[#154895] to-[#1e5bb8]",
    lightColor: "bg-[#154895]/8",
    iconColor: "text-[#154895]",
  },
  {
    icon: Globe,
    title: "Overseas Recruitment",
    description:
      "Skilled international manpower deployment with full documentation and visa processing support.",
    color: "from-[#e62224] to-[#c01a1c]",
    lightColor: "bg-[#e62224]/8",
    iconColor: "text-[#e62224]",
  },
  {
    icon: Users,
    title: "Local Staffing",
    description:
      "Flexible workforce solutions for businesses that need reliable staff at short or long-term notice.",
    color: "from-emerald-500 to-emerald-600",
    lightColor: "bg-emerald-500/8",
    iconColor: "text-emerald-600",
  },
  {
    icon: Megaphone,
    title: "Mass Recruitment",
    description:
      "Large-scale hiring campaigns managed efficiently — from 50 to 5000+ candidates deployed rapidly.",
    color: "from-violet-500 to-violet-600",
    lightColor: "bg-violet-500/8",
    iconColor: "text-violet-600",
  },
  {
    icon: Search,
    title: "Executive Search",
    description:
      "Senior-level and C-suite talent acquisition through our confidential, bespoke headhunting process.",
    color: "from-amber-500 to-amber-600",
    lightColor: "bg-amber-500/8",
    iconColor: "text-amber-600",
  },
  {
    icon: Clock,
    title: "Temporary Staffing",
    description:
      "On-demand temporary workers for seasonal peaks, project needs, or sudden workforce gaps.",
    color: "from-cyan-500 to-cyan-600",
    lightColor: "bg-cyan-500/8",
    iconColor: "text-cyan-600",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-28 bg-white">
      <Container>
        <SectionHeading
          tag="Our Services"
          title="Comprehensive Recruitment Solutions"
          subtitle="From executive search to mass deployment, we cover every hiring need with precision and care."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative bg-gray-50 border border-gray-100 rounded-2xl p-8 overflow-hidden cursor-pointer hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/80 transition-all duration-500"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 bg-gradient-to-br from-[#154895] to-[#e62224]" />

                <div className="relative z-10">
                  <div className={`w-14 h-14 ${service.lightColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={24} className={service.iconColor} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#154895] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{service.description}</p>

                  <div className="mt-6 flex items-center gap-2 text-[#154895] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                    Learn More
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
