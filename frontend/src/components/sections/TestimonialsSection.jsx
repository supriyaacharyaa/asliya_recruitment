import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

function TestimonialCard({ testimonial, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-xl shadow-[#154895]/5 relative overflow-hidden h-full"
    >
      {/* Quote icon */}
      <div className="absolute top-6 right-6 w-12 h-12 bg-[#154895]/8 rounded-2xl flex items-center justify-center">
        <Quote size={20} className="text-[#154895]/60" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-gray-600 leading-relaxed text-base mb-8 italic">
        "{testimonial.review}"
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#154895] to-[#0d3270] flex items-center justify-center shadow-md flex-shrink-0">
          <span className="text-white font-black text-base">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
          <div className="text-xs text-[#154895] font-semibold">{testimonial.designation}</div>
          <div className="text-xs text-gray-400">{testimonial.company}</div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#154895]/30 via-[#e62224]/30 to-transparent rounded-full" />
    </motion.div>
  );
}

export default function TestimonialsSection({ testimonials }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 768) setCardsPerPage(1);
      else if (window.innerWidth < 1024) setCardsPerPage(2);
      else setCardsPerPage(3);
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const currentTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((p) => (p + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalPages]);

  return (
    <section className="py-28 bg-gradient-to-b from-[#f0f4fb] to-[#f8f9fc] overflow-hidden">
      <Container>
        <SectionHeading
          tag="Testimonials"
          title="What Our Clients Say"
          subtitle="Real stories from companies and candidates who've experienced the difference we make."
        />

        <div className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className={`grid gap-6 ${
                cardsPerPage === 1
                  ? "grid-cols-1"
                  : cardsPerPage === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              {currentTestimonials.map((t, i) => (
                <TestimonialCard key={`${t.name}-${currentPage}-${i}`} testimonial={t} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#154895]/40 hover:shadow-md transition-all duration-300 group"
            >
              <ChevronLeft size={16} className="text-gray-400 group-hover:text-[#154895] transition-colors" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentPage
                      ? "w-8 h-2.5 bg-[#154895]"
                      : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#154895]/40 hover:shadow-md transition-all duration-300 group"
            >
              <ChevronRight size={16} className="text-gray-400 group-hover:text-[#154895] transition-colors" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
