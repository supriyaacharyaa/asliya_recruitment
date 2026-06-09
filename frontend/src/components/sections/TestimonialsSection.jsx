import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/70 backdrop-blur-md border border-[#154895]/8 rounded-3xl p-7 sm:p-8 shadow-lg shadow-[#154895]/3 relative flex flex-col justify-between h-full transition-all duration-300 hover:border-[#154895]/20 hover:shadow-xl"
    >
      <div>
        {/* Top Header Utilities */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-1">
            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="w-10 h-10 bg-[#154895]/6 rounded-xl flex items-center justify-center flex-shrink-0">
            <Quote size={18} className="text-[#154895]/50 transform rotate-180" />
          </div>
        </div>

        {/* Review Text */}
        <p className="text-gray-600 leading-relaxed text-[14.5px] mb-8 italic">
          "{testimonial.review}"
        </p>
      </div>

      {/* Profile Identity Details */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#154895] to-[#0d3270] flex items-center justify-center shadow-sm flex-shrink-0">
          <span className="text-white font-serif font-bold text-base">
            {testimonial.name ? testimonial.name.charAt(0) : "A"}
          </span>
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-gray-900 text-sm truncate">{testimonial.name}</h4>
          <p className="text-[11.5px] text-[#154895] font-semibold truncate">{testimonial.designation}</p>
          <p className="text-[11px] text-gray-400 truncate">{testimonial.company}</p>
        </div>
      </div>

      {/* Discrete Brand Color Indicator line */}
      <span className="absolute bottom-0 left-8 right-8 h-[2.5px] bg-gradient-to-r from-[#154895]/40 via-[#1a5ab8]/40 to-transparent rounded-full" />
    </motion.div>
  );
}

export default function TestimonialsSection({ testimonials = [] }) {
  const [currentPage, setCurrentPage] = useState(0);

  // Responsive logic directly handled through Tailwind Grid, layout counts:
  const cardsPerPage = 3; 
  const totalPages = testimonials.length > 0 ? Math.ceil(testimonials.length / cardsPerPage) : 1;

  // Safe Slide Control Utilities
  const handleNext = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Safe Auto-Play Interval Engine (Clears correctly to prevent timeline racing)
  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [totalPages, handleNext, currentPage]); // Added currentPage to reset timer on manual click

  if (!testimonials || testimonials.length === 0) return null;

  // Segmenting the viewport dataset array safely
  const startIndex = currentPage * cardsPerPage;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + cardsPerPage);

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#f4f8ff] via-white to-[#f4f8ff] overflow-hidden">
      <Container>
        <SectionHeading
          tag="Testimonials"
          title="What Our Partners Say"
          subtitle="Real verification feedback from enterprise corporations and international workforces placed through Asliya's network."
        />

        <div className="mt-14 max-w-6xl mx-auto">
          {/* Card Sliding Window Box */}
          <div className="min-h-[320px] relative">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentPage}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
              >
                {visibleTestimonials.map((t, i) => (
                  <TestimonialCard key={t.id || `${t.name}-${i}`} testimonial={t} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Controls Interface Layout */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-5 mt-12">
              <button
                onClick={handlePrev}
                aria-label="Previous Page"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center shadow-sm text-gray-400 hover:text-[#154895] hover:border-[#154895]/30 hover:shadow-md active:scale-95 transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dynamic Tracking Bullets */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={`transition-all duration-300 rounded-full h-2.5 ${
                      i === currentPage
                        ? "w-7 bg-[#154895]"
                        : "w-2.5 bg-gray-300/80 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next Page"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center shadow-sm text-gray-400 hover:text-[#154895] hover:border-[#154895]/30 hover:shadow-md active:scale-95 transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}