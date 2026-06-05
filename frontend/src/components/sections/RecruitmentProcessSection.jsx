import { motion } from "framer-motion";
import { ClipboardList, Search, UserCheck, MessageSquare, CheckSquare, HeartHandshake } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Requirement Analysis",
    description: "We conduct in-depth consultation to understand your job roles, skills needed, culture fit, and timelines.",
  },
  {
    icon: Search,
    step: "02",
    title: "Candidate Sourcing",
    description: "Leveraging our vast database and active networks to identify the best-matched candidates.",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Screening & Vetting",
    description: "Rigorous background checks, skills assessments, and reference verification for every shortlisted candidate.",
  },
  {
    icon: MessageSquare,
    step: "04",
    title: "Interviews",
    description: "We coordinate and facilitate structured interview rounds between clients and top candidates.",
  },
  {
    icon: CheckSquare,
    step: "05",
    title: "Placement",
    description: "Seamless onboarding support including documentation, visa processing, and relocation assistance.",
  },
  {
    icon: HeartHandshake,
    step: "06",
    title: "Follow-Up",
    description: "Post-placement monitoring to ensure long-term success for both employers and candidates.",
  },
];

export default function RecruitmentProcessSection() {
  return (
    <section className="py-28 bg-[#f8f9fc] overflow-hidden">
      <Container>
        <SectionHeading
          tag="How We Work"
          title="Our Recruitment Process"
          subtitle="A proven, transparent 6-step process designed for speed, quality, and lasting results."
        />

        <div className="relative mt-20">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-[#154895]/0 via-[#154895]/30 to-[#154895]/0 origin-left"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-24 h-24 bg-white rounded-2xl border-2 border-gray-200 group-hover:border-[#154895]/40 shadow-lg group-hover:shadow-[#154895]/15 group-hover:shadow-xl flex flex-col items-center justify-center transition-all duration-400 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#154895] to-[#0d3270] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <Icon size={22} className="text-[#154895] group-hover:text-white relative z-10 transition-colors duration-400 mb-1" />
                      <span className="text-xs font-black text-gray-300 group-hover:text-white/70 relative z-10 transition-colors duration-400">
                        {step.step}
                      </span>
                    </motion.div>
                    {/* Connector dot */}
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#154895]/30 rounded-full last:hidden" />
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-[#154895] transition-colors duration-300 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
        >
          <p className="text-gray-500 mb-4">
            Average time-to-fill: <span className="font-bold text-[#154895]">7–14 business days</span>
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <span>✓ No hidden fees</span>
            <span>✓ Replacement guarantee</span>
            <span>✓ Dedicated account manager</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
