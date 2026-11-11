"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function OneMoreThing() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative min-h-[85vh] w-full py-32 bg-gradient-to-b from-[#0B0307] via-[#1D0613] to-[#0B0307] overflow-hidden flex flex-col items-center justify-center px-6 film-grain select-none">
      {/* Background Soft Rose Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(248,200,220,0.14)_0%,transparent_65%] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-2xl mx-auto relative z-10 text-center flex flex-col items-center gap-8"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.28em] text-baby-pink font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold animate-pulse" />
          <span>Before You Leave...</span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-serif italic text-2xl sm:text-3xl text-soft-blush/80 font-light"
        >
          There&apos;s one more thing.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="p-8 sm:p-12 rounded-3xl glass-wine border border-baby-pink/25 shadow-[0_20px_50px_rgba(37,13,24,0.6)] space-y-6"
        >
          <p className="font-serif text-xl sm:text-2xl text-warm-cream font-light leading-relaxed">
            &ldquo;No matter how many new adventures we create... <br className="hidden sm:inline" />
            I hope we never stop being curious about each other.&rdquo;
          </p>

          <div className="w-12 h-[1px] bg-baby-pink/30 mx-auto" />

          <p className="font-serif italic text-lg sm:text-xl text-baby-pink font-light leading-relaxed">
            Because falling in love is beautiful... <br />
            but discovering you again and again might be even more beautiful.
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-champagne-gold">
            <Heart className="w-4 h-4 fill-current heart-beat-pulse text-deep-rose" />
            <span className="font-sans text-xs tracking-widest uppercase">
              Always &bull; Aditya
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
