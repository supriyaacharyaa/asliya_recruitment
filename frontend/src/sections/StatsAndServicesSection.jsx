import React from 'react'
import { motion } from 'framer-motion'
import CountUp from "react-countup";

export const StatsSection = () => {
  const stats = [
    { label: 'Placements Made', value: 15000, suffix: '+' },
    { label: 'Active Candidates', value: 50000, suffix: '+' },
    { label: 'Trusted Companies', value: 500, suffix: '+' },
    { label: 'Success Rate', value: 98, suffix: '%' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container-fluid max-w-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center">
              <div className="mb-3">
                <p className="text-4xl lg:text-5xl font-bold text-primary-800">
                  <CountUp end={stat.value} duration={2.5} separator="," />
                  <span>{stat.suffix}</span>
                </p>
              </div>
              <p className="text-neutral-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export const ServicesSection = () => {
  const services = [
    {
      icon: '👥',
      title: 'Talent Acquisition',
      description: 'Strategic recruitment solutions tailored to your specific industry and role requirements.',
    },
    {
      icon: '🔍',
      title: 'Candidate Screening',
      description: 'AI-powered screening process to identify the best-fit candidates for your positions.',
    },
    {
      icon: '📊',
      title: 'Market Intelligence',
      description: 'Gain insights into salary trends, skills demand, and talent availability in your sector.',
    },
    {
      icon: '🤝',
      title: 'Employer Branding',
      description: 'Enhance your company\'s reputation to attract top-tier talent in your industry.',
    },
    {
      icon: '🎓',
      title: 'Training & Development',
      description: 'Upskill your team with our comprehensive training and professional development programs.',
    },
    {
      icon: '📈',
      title: 'Career Growth',
      description: 'Career path planning and mentorship to help candidates excel in their roles.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -8, transition: { duration: 0.3 } },
  }

  return (
    <section className="py-24 px-4 bg-gradient-subtle">
      <div className="container-fluid max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Our Services</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mt-3 max-w-2xl mx-auto">
            Comprehensive Recruitment Solutions
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="card p-8 hover:shadow-elevated"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{service.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
