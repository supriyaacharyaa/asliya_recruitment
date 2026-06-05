import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const LatestJobsSection = () => {
  const jobs = [
    {
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Global',
      location: 'San Francisco, CA',
      salary: '$180K - $220K',
      type: 'Full-time',
      skills: ['React', 'Node.js', 'AWS'],
    },
    {
      title: 'Product Manager',
      company: 'InnovateLabs',
      location: 'New York, NY',
      salary: '$150K - $190K',
      type: 'Full-time',
      skills: ['Product Strategy', 'Analytics', 'Leadership'],
    },
    {
      title: 'Data Scientist',
      company: 'FinanceHub',
      location: 'Chicago, IL',
      salary: '$160K - $200K',
      type: 'Full-time',
      skills: ['Python', 'ML', 'Statistics'],
    },
    {
      title: 'DevOps Engineer',
      company: 'HealthTech Inc',
      location: 'Austin, TX',
      salary: '$140K - $180K',
      type: 'Full-time',
      skills: ['Kubernetes', 'Docker', 'AWS'],
    },
    {
      title: 'UX/UI Designer',
      company: 'RetailGiant',
      location: 'Los Angeles, CA',
      salary: '$130K - $170K',
      type: 'Full-time',
      skills: ['Figma', 'Design System', 'Prototyping'],
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container-fluid max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Opportunities</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mt-3">Latest Jobs</h2>
          </div>
          <button className="btn btn-secondary hidden md:inline-flex">
            View All Positions
          </button>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {jobs.map((job, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-6 h-full flex flex-col"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-neutral-900 flex-1">{job.title}</h3>
                    <span className="badge">{job.type}</span>
                  </div>
                  <p className="text-sm text-primary-600 font-semibold">{job.company}</p>
                </div>

                <p className="text-sm text-neutral-600 mb-4">{job.location}</p>

                <p className="text-lg font-bold text-neutral-900 mb-4">{job.salary}</p>

                <div className="flex flex-wrap gap-2 mb-6 flex-1">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="btn btn-primary w-full justify-center">Apply Now</button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center md:hidden mt-8">
          <button className="btn btn-secondary">View All Positions</button>
        </div>
      </div>
    </section>
  )
}

export const BlogSection = () => {
  const blogs = [
    {
      title: '2024 Tech Hiring Trends',
      category: 'Industry Insights',
      date: 'Mar 15, 2024',
      excerpt: 'Discover the latest hiring trends shaping the tech industry in 2024.',
      image: '📊',
      readTime: '5 min',
    },
    {
      title: 'How to Ace Your Next Interview',
      category: 'Career Tips',
      date: 'Mar 10, 2024',
      excerpt: 'Expert tips and tricks to help you prepare for and ace your next job interview.',
      image: '🎯',
      readTime: '7 min',
    },
    {
      title: 'Remote Work: The Future of Work',
      category: 'Future of Work',
      date: 'Mar 5, 2024',
      excerpt: 'Exploring how remote work is reshaping workplace culture and productivity.',
      image: '🏠',
      readTime: '6 min',
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-subtle">
      <div className="container-fluid max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Resources</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mt-3">Latest Insights</h2>
          </div>
          <button className="btn btn-secondary hidden md:inline-flex">
            Read All Articles
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card overflow-hidden hover:shadow-elevated transition-shadow flex flex-col"
            >
              <div className="bg-gradient-primary/10 h-48 flex items-center justify-center text-6xl">
                {blog.image}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-semibold text-primary-600 uppercase">
                    {blog.category}
                  </span>
                  <span className="text-xs text-neutral-500">{blog.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2">{blog.title}</h3>
                <p className="text-neutral-600 text-sm mb-4 flex-1">{blog.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-200 pt-4">
                  <time>{blog.date}</time>
                  <span>→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center md:hidden mt-8">
          <button className="btn btn-secondary">Read All Articles</button>
        </div>
      </div>
    </section>
  )
}
