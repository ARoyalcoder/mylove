"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

const effects = [
  { word: "Calm", subtitle: "Like coming home after a storm" },
  { word: "Happy", subtitle: "For no particular reason other than your text" },
  { word: "Excited", subtitle: "Just waiting for your name to appear on screen" },
  { word: "Safe", subtitle: "Like I can be completely myself with you" },
  { word: "Smiling", subtitle: "Catching myself smiling at my phone in public" },
  { word: "Thinking", subtitle: "Replaying the things you said earlier" },
  { word: "Missing", subtitle: "Even when you just left a few minutes ago" },
  { word: "Falling", subtitle: "Deeper than I ever thought I could fall" },
];

export default function DescribeYou() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="effect-on-me"
      className="relative min-h-[90vh] w-full flex items-center justify-center bg-[#070105] overflow-hidden py-32 px-6 film-grain select-none"
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(169,30,69,0.18)_0%,transparent_65%] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-rose-soft/30 text-xs uppercase tracking-[0.25em] text-blush font-sans mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-soft" />
          <span>An Honest Confession</span>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream font-light leading-tight mb-4"
        >
          You have a <br />
          <span className="italic text-rose-soft font-normal text-shimmer">
            strange effect on me.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-md mx-auto leading-relaxed tracking-wider mb-14"
        >
          Whenever I am with you, or thinking of you, Sakshi, you leave me feeling...
        </motion.p>

        {/* Interactive Words Cloud / Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl mb-16"
        >
          {effects.map((item, index) => {
            const isHovered = activeIndex === index;
            return (
              <motion.button
                key={index}
                variants={wordVariants}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative px-5 sm:px-7 py-3 rounded-full text-base sm:text-xl font-serif tracking-wide transition-all duration-300 backdrop-blur-md cursor-pointer ${
                  isHovered
                    ? "bg-rose-soft text-white scale-105 shadow-[0_0_25px_rgba(233,91,122,0.6)] border border-blush"
                    : "glass text-cream/90 hover:text-white border border-rose-soft/20 hover:border-rose-soft/50"
                }`}
              >
                <span>{item.word}.</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active Word Subtitle Display */}
        <div className="h-10 mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeIndex !== null ? (
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-serif italic text-sm sm:text-base text-blush tracking-wider"
              >
                &ldquo;{effects[activeIndex].subtitle}&rdquo;
              </motion.p>
            ) : (
              <p className="font-sans text-xs text-zinc-500 tracking-widest uppercase">
                Tap any word to see why
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Climax Ending Calligraphy Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col items-center gap-3 mt-4 pt-8 border-t border-rose-soft/15 w-full max-w-lg"
        >
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-zinc-400">
            And at the end of every day...
          </span>
          <div className="font-script text-4xl sm:text-6xl text-rose-soft filter drop-shadow-[0_0_12px_rgba(233,91,122,0.4)]">
            Mostly... falling for you.
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Heart className="w-4 h-4 text-rose-soft fill-rose-soft animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-soft font-sans font-medium">
              Always &amp; Only Sakshi
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
