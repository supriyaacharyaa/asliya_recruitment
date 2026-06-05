import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export const HeroSection = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.2
      ).fromTo(
        ctaRef.current?.querySelectorAll('button'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        0.4
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container-fluid max-w-content relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div className="space-y-8">
            <div ref={titleRef}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-tight">
                Connect Top{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Talent
                </span>{' '}
                with Your Team
              </h1>
            </div>

            <div ref={subtitleRef} className="space-y-4">
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                Discover exceptional professionals across industries. Our AI-powered recruitment platform connects you with vetted candidates ready to transform your organization.
              </p>
              <p className="text-base text-neutral-500">
                Trusted by 500+ companies worldwide | 50,000+ qualified candidates
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn btn-primary text-lg">
                Find Top Talent
              </button>
              <button className="btn btn-ghost text-lg">
                Register Your CV
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-neutral-200">
              <div>
                <p className="text-3xl font-bold text-primary-800">50K+</p>
                <p className="text-sm text-neutral-600">Active Candidates</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-800">500+</p>
                <p className="text-sm text-neutral-600">Trusted Companies</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-800">98%</p>
                <p className="text-sm text-neutral-600">Placement Success</p>
              </div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Animated Gradient Orb */}
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-10 blur-2xl animate-pulse" />
              <div className="absolute inset-12 bg-gradient-accent rounded-3xl opacity-20 blur-xl animate-float" />
              
              {/* Card Stack */}
              <div className="absolute inset-0 p-8 space-y-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="card p-4 bg-white/80 backdrop-blur-sm"
                  >
                    <div className="h-3 bg-gradient-primary rounded-full w-1/3 mb-2" />
                    <div className="h-2 bg-neutral-200 rounded-full w-full" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
