import React from 'react'
import { motion } from 'framer-motion'

export const CVRegistrationCTA = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container-fluid max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-primary opacity-90" />
          <div className="absolute inset-0 bg-gradient-glow opacity-40" />

          {/* Content */}
          <div className="relative z-10 p-12 lg:p-16 text-center text-white max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-6"
            >
              Ready to Find Your Dream Job?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/90 mb-8 leading-relaxed"
            >
              Join thousands of professionals who've landed their perfect role through our platform. Upload your CV and let our AI match you with opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="btn text-lg px-8 bg-white text-primary-800 hover:bg-neutral-100 font-semibold">
                Register Your CV
              </button>
              <button className="btn text-lg px-8 border-2 border-white text-white hover:bg-white/10">
                Learn More
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm text-white/80 mt-8"
            >
              ✓ Free CV upload • ✓ AI matching • ✓ Instant notifications
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const EmployerCTA = () => {
  return (
    <section className="py-24 px-4 bg-gradient-subtle">
      <div className="container-fluid max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-primary-600 uppercase tracking-wider block mb-3"
            >
              For Employers
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
            >
              Hire Top Talent in Days, Not Months
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-600 mb-8 leading-relaxed"
            >
              Our platform simplifies recruitment with AI-powered candidate matching, reducing your hiring timeline while ensuring top quality hires.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-8"
            >
              {[
                'Access 50,000+ vetted candidates',
                'AI-powered candidate screening',
                'Average placement in 14 days',
                'Dedicated account manager',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-primary-600 text-xl">✓</span>
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="btn btn-primary text-lg"
            >
              Post a Job Now
            </motion.button>
          </div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Cards */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ delay: i * 0.2, duration: 4, repeat: Infinity }}
                  className="absolute card p-6 w-80 bg-white shadow-card"
                  style={{
                    top: `${i * 80}px`,
                    left: `${i * 20}px`,
                    zIndex: 3 - i,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full" />
                    <div>
                      <p className="font-semibold text-neutral-900">Candidate #{i + 1}</p>
                      <p className="text-xs text-neutral-500">Match: 98%</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-neutral-200 rounded-full w-3/4" />
                    <div className="h-2 bg-neutral-200 rounded-full w-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export const ContactCTA = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container-fluid max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Get in Touch</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mt-3">
            Let's Work Together
          </h2>
          <p className="text-lg text-neutral-600 mt-4">
            Have questions? Our team is here to help you find the perfect talent.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="card p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Message
            </label>
            <textarea
              placeholder="Tell us about your recruitment needs..."
              rows="5"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full justify-center text-lg"
          >
            Send Message
          </button>

          <p className="text-sm text-neutral-500 text-center mt-4">
            We'll get back to you within 24 hours.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
