import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const ClientsSection = () => {
  const clients = [
    { name: 'TechCorp Global', logo: '🏢', size: 'Enterprise' },
    { name: 'InnovateLabs', logo: '🔬', size: 'Scale-up' },
    { name: 'FinanceHub', logo: '💳', size: 'Enterprise' },
    { name: 'HealthTech Inc', logo: '🏥', size: 'Mid-Market' },
    { name: 'RetailGiant', logo: '🛍️', size: 'Enterprise' },
    { name: 'EduLearn', logo: '📖', size: 'Start-up' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Trusted By</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mt-3">
            500+ Corporate Clients
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card p-6 flex flex-col items-center justify-center text-center hover:shadow-elevated transition-shadow"
            >
              <div className="text-5xl mb-3">{client.logo}</div>
              <p className="font-semibold text-neutral-900">{client.name}</p>
              <p className="text-xs text-neutral-500 mt-1">{client.size}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'TechCorp Global',
      image: '👩‍💼',
      text: 'Exceptional service! They found us the perfect CTO within 2 weeks. The quality of candidates exceeded our expectations.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      company: 'InnovateLabs',
      image: '👨‍💻',
      text: 'Best recruitment partner we\'ve worked with. Their AI matching is incredibly accurate. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emma Williams',
      role: 'Hiring Manager',
      company: 'FinanceHub',
      image: '👩‍🔬',
      text: 'Outstanding support and professionalism. They understand our industry like no one else. 10/10!',
      rating: 5,
    },
    {
      name: 'David Martinez',
      role: 'COO',
      company: 'HealthTech Inc',
      image: '👨‍⚕️',
      text: 'Transformed our hiring process. Saved us months of recruitment time and found A-level talent.',
      rating: 5,
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-subtle">
      <div className="container-fluid max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mt-3">
            Loved by Industry Leaders
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8 h-full flex flex-col justify-between"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-lg">
                        ⭐
                      </span>
                    ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-700 mb-6 flex-1 text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="border-t border-neutral-200 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div>
                      <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                      <p className="text-sm text-neutral-600">{testimonial.role}</p>
                      <p className="text-xs text-neutral-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
