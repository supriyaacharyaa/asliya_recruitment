import { motion } from "framer-motion";
import { Shield, Award, ThumbsUp } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function ClientsSection({ clients }) {
  return (
    <section className="py-28 bg-[#f8f9fc]">
      <Container>
        <SectionHeading
          tag="Our Clients"
          title="Trusted by Industry Leaders"
          subtitle="We are proud to partner with some of the most respected brands across the globe."
        />

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mt-10 mb-16"
        >
          {[
            { icon: Shield, label: "100% Verified Partners" },
            { icon: Award, label: "Award-Winning Service" },
            { icon: ThumbsUp, label: "97% Client Retention Rate" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 bg-white rounded-full px-5 py-2.5 border border-gray-200 shadow-sm"
            >
              <Icon size={15} className="text-[#154895]" />
              <span className="text-sm font-semibold text-gray-600">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Client logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center gap-3 cursor-default hover:border-[#154895]/20 hover:shadow-lg hover:shadow-[#154895]/8 transition-all duration-400"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{ background: client.color || "linear-gradient(135deg, #154895, #0d3270)" }}
              >
                {client.abbr}
              </div>
              <span className="text-xs font-semibold text-gray-500 group-hover:text-[#154895] transition-colors duration-300 text-center leading-tight">
                {client.name}
              </span>
              {client.industry && (
                <span className="text-[10px] text-gray-300 uppercase tracking-wider">{client.industry}</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-sm text-gray-400 mt-10"
        >
          And 270+ more companies across 15+ industries worldwide
        </motion.p>
      </Container>
    </section>
  );
}
