"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { romanticQuotes } from "@/config/couple";

export default function QuoteCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % romanticQuotes.length);
    }, 6000); // Cycle every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="quotes" className="relative w-full py-24 bg-midnight overflow-hidden px-6">
      {/* Background ambient circular glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(110,13,37,0.12)_0%,transparent_50%] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-10">
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-rose tracking-[0.25em] text-[10px] md:text-xs uppercase font-medium">
            Thoughts for you
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-zinc-100 mt-1">
            For You ❤️
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-rose to-transparent mt-4" />
        </div>

        {/* Carousel Container */}
        <div className="relative w-full min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-center max-w-2xl px-6 flex flex-col items-center gap-6"
            >
              {/* Quote Mark Icon */}
              <Quote className="w-8 h-8 text-rose-light opacity-30 rotate-180" />

              {/* Quote text */}
              <blockquote className="font-serif text-xl md:text-3xl text-zinc-200 font-light leading-relaxed italic tracking-wide">
                &ldquo;{romanticQuotes[currentIndex]}&rdquo;
              </blockquote>

              <div className="w-6 h-[0.5px] bg-rose-dark/30" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {romanticQuotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-8 h-2 rounded-full cursor-pointer focus:outline-none relative bg-zinc-800"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <motion.div
                  layoutId="activeQuoteBar"
                  className="absolute inset-0 bg-rose-light rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
