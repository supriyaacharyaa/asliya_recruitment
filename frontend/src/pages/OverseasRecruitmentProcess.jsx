import { motion } from 'framer-motion';
import { Phone, Users, CheckCircle, Plane, ShieldCheck, TrendingUp, Award, Target, Landmark } from 'lucide-react';

const stats = [
  { label: "Successful Placements", value: "20,000+" },
  { label: "Global Source Countries", value: "28+" },
  { label: "Average Deployment", value: "25-30 Days" }
];

export default function OverseasRecruitmentFull() {
  return (
    <div className="bg-white">
    
      {/* ── Hero Section ── */}
      <section className="py-20 bg-gray-50 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold mb-6 text-slate-900"
        >
          Overseas Recruitment Excellence
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Scale your local workforce with elite global talent in 25–30 days. Asliya Manpower Supply manages compliant, rapid mass-mobilization under Ministry of Labor Qatar License #618.
        </p>
      </section>

      {/* ── Core Statistics ── */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 px-4 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-3xl sm:text-4xl font-black text-blue-600">{s.value}</div>
              <div className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Competitive Edge Section ── */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">The Asliya Advantage</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Landmark,
              title: "Full Regulatory Compliance", 
              desc: "100% compliant under Qatar Labor Law, Ministry of Labor License #618, and fully approved by the Supreme Committee." 
            },
            { 
              icon: Users,
              title: "Vetted Mass Recruitment", 
              desc: "Deploy certified workforce cohorts from 100 to over 4,000 workers, strictly pre-screened through thorough practical trade testing." 
            },
            { 
              icon: Plane,
              title: "End-to-End Mobilization", 
              desc: "Complete command of source-country networks, visa documentation, medical clearances, and swift deployment logistics." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -8 }} 
              className="p-8 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-200"
            >
              <item.icon className="text-blue-600 mb-4" size={32} />
              <h3 className="font-bold text-xl mb-2 text-slate-900">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Call To Action Section ── */}
      <section className="py-20 bg-slate-900 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(21,72,149,0.2),transparent)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Stop Recruiting Slowly. Start Mobilizing Smart.</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto text-base">
            Partner with Qatar's trusted manpower supplier for construction, hospitality, and heavy industry corporate hiring campaigns.
          </p>
          <a 
            href="/request-quote"
            className="inline-block bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-blue-900/40"
          >
            Get A Custom Proposal
          </a>
        </div>
      </section>
    </div>
  );
}