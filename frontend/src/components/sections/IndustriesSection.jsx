import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function IndustriesSection({ industries }) {
  return (
    <section className="py-28 bg-white">
      <Container>
        <SectionHeading
          tag="Industries"
          title="Industries We Serve"
          subtitle="Deep specialization across the sectors that power the global economy."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gray-50 border border-gray-100 rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#154895]/20 hover:shadow-2xl hover:shadow-[#154895]/10"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#154895]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#154895] to-[#0d3270] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-[#154895]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon size={24} className="text-white" />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#154895] transition-colors duration-300">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{industry.description}</p>

                  {industry.roles && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {industry.roles.slice(0, 2).map((role) => (
                        <span
                          key={role}
                          className="text-xs bg-[#154895]/8 text-[#154895] px-2.5 py-1 rounded-full font-medium"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Glow effect */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#154895]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
