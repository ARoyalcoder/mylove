"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, Compass } from "lucide-react";
import { coupleConfig } from "@/config/couple";

export default function Hero() {
  const handleScrollToMap = () => {
    const target = document.querySelector("#adventures-map") || document.querySelector("#butterflies");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="beginning"
      className="relative min-h-screen w-full flex items-center justify-center bg-[#0B0307] text-warm-cream overflow-hidden px-6 film-grain select-none"
    >
      {/* Ambient baby pink and champagne warmth */}
      <div className="absolute top-[20%] left-[25%] w-[400px] md:w-[650px] h-[400px] md:h-[650px] bg-baby-pink/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[20%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-deep-rose/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Starlight Accents */}
      <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-champagne-gold rounded-full animate-ping opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-soft-blush rounded-full animate-pulse opacity-50 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl flex flex-col items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Chapter Pill */}
          <div className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-baby-pink font-sans">
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold animate-spin" />
            <span>Chapter 01 • The Beginning</span>
          </div>

          {/* Welcome Text */}
          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warm-cream font-light tracking-wide leading-tight">
              Welcome to <br />
              <span className="italic text-baby-pink font-normal text-shimmer">
                our little world.
              </span>
            </h2>

            <div className="font-serif text-xl sm:text-2xl text-soft-blush/90 tracking-widest font-light flex items-center justify-center gap-3 pt-1">
              <span>{coupleConfig.person1}</span>
              <Heart className="w-4 h-4 text-deep-rose fill-deep-rose heart-beat-pulse" />
              <span>{coupleConfig.person2}</span>
            </div>
          </div>

          {/* Section 6 Poetic Manifesto */}
          <div className="p-8 sm:p-10 rounded-3xl glass-wine border border-baby-pink/20 max-w-xl text-center space-y-4 shadow-[0_15px_40px_rgba(37,13,24,0.6)]">
            <p className="font-serif text-xl sm:text-2xl text-warm-cream font-light italic leading-relaxed">
              &ldquo;There are no rules here.&rdquo;
            </p>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed tracking-wider">
              Only memories, little adventures, unexpected smiles, and you.
            </p>
            <div className="w-12 h-[1px] bg-baby-pink/30 mx-auto" />
            <div className="text-xs uppercase tracking-[0.25em] text-champagne-gold font-sans font-medium">
              Made with endless love for Sakshi ❤️
            </div>
          </div>
        </motion.div>

        {/* Action Button: ✨ Start Exploring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <button
            onClick={handleScrollToMap}
            className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-deep-rose via-rose to-baby-pink text-white text-xs sm:text-sm uppercase tracking-[0.25em] font-medium cursor-pointer shadow-[0_10px_35px_rgba(184,79,114,0.45)] hover:shadow-[0_15px_45px_rgba(248,200,220,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-soft-blush/40"
          >
            <Compass className="w-4 h-4 text-champagne-gold group-hover:rotate-45 transition-transform duration-500" />
            <span>✨ Start Exploring Our Map</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
