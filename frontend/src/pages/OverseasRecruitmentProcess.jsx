import { motion } from 'framer-motion';
import { Phone, Users, CheckCircle, Plane, ShieldCheck, TrendingUp, Award } from 'lucide-react';

const stats = [
  { label: "Placements", value: "20,000+" },
  { label: "Countries", value: "28+" },
  { label: "Deployment", value: "25-30 Days" }
];

export default function OverseasRecruitmentFull() {
  return (
    <div className="bg-white">
      {/* 1. Header Section */}
      <section className="py-20 bg-gray-50 text-center px-4">
        <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-5xl font-extrabold mb-6">
          Overseas Recruitment
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Scale your workforce in 25-40 days. Trusted by top companies. Licensed, verified, and ready to deploy.
        </p>
      </section>

      {/* 2. Stats Section (Social Proof) */}
      <section className="py-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 px-4 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-blue-600">{s.value}</div>
              <div className="text-gray-500 text-sm uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Competitive Edge (Why Us) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">The Competitive Edge</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Zero Compliance Risk", desc: "We handle labor law and visa compliance to avoid legal nightmares." },
            { title: "Quality at Scale", desc: "Deploy 100 to 4,000 workers without cutting corners." },
            { title: "Transparency", desc: "Full visa and documentation transparency with a Zero Exploitation Guarantee." }
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-8 bg-gray-50 rounded-xl">
              <ShieldCheck className="text-blue-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. The 4-Step Process (Your existing component logic) */}
      {/* (Insert your existing Process Grid here) */}

      {/* 5. Final CTA */}
      <section className="py-20 bg-blue-900 text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-6">Stop Recruiting Slowly. Start Hiring Smart.</h2>
        <button className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-lg transition-all">
          Get Started Now
        </button>
      </section>
    </div>
  );
}