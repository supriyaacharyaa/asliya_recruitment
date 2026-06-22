import React from 'react'
import { motion } from 'framer-motion'

export const IndustriesSection = () => {
  const industries = [
    { name: 'Technology', icon: '💻' },
    { name: 'Finance', icon: '💰' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Manufacturing', icon: '🏭' },
    { name: 'Retail', icon: '🛍️' },
    { name: 'Hospitality', icon: '🏨' },
    { name: 'Education', icon: '📚' },
    { name: 'Real Estate', icon: '🏢' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container-fluid max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Expertise</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mt-3">
            Industries We Serve
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="card p-8 text-center cursor-pointer group"
            >
              <div className="text-5xl mb-3 transition-transform group-hover:scale-125">{industry.icon}</div>
              <p className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                {industry.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export const WhyChooseUsSection = () => {
  const reasons = [
    {
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match candidates with roles based on skills, experience, and cultural fit.',
      icon: '🤖',
    },
    {
      title: 'Global Network',
      description: 'Access to 50,000+ qualified candidates across 50+ countries and multiple industries.',
      icon: '🌍',
    },
    {
      title: 'Fast Placements',
      description: 'Average placement time of 14 days, 3x faster than industry standard.',
      icon: '⚡',
    },
    {
      title: '24/7 Support',
      description: 'Dedicated account managers available round the clock for your recruitment needs.',
      icon: '📞',
    },
    {
      title: 'Verified Candidates',
      description: 'All candidates go through rigorous verification and skill assessment processes.',
      icon: '✅',
    },
    {
      title: 'Success Guarantee',
      description: '90-day replacement guarantee if a candidate doesn\'t meet expectations.',
      icon: '🎯',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
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
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mt-3 max-w-2xl mx-auto">
            Excellence in Every Placement
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card p-8 border-l-4 border-primary-600 hover:shadow-elevated transition-shadow"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{reason.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
