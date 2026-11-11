"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Sun } from "lucide-react";
import { coupleConfig } from "@/config/couple";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-28 bg-[#090206] overflow-hidden border-t border-baby-pink/20 px-6 film-grain select-none">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(248,200,220,0.14)_0%,transparent_60%] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-10">
        {/* Sparkle Header */}
        <div className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.25em] text-baby-pink font-sans">
          <Sun className="w-3.5 h-3.5 text-champagne-gold animate-spin" />
          <span>🌅 The Next Chapter</span>
        </div>

        {/* Poetic Message */}
        <div className="space-y-4 max-w-xl">
          <h3 className="font-serif text-3xl sm:text-5xl text-warm-cream font-light leading-tight">
            This story <br />
            <span className="italic text-baby-pink font-normal text-shimmer">
              isn&apos;t finished.
            </span>
          </h3>

          <p className="font-serif italic text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            There are still mornings we haven&apos;t woken up to. <br />
            Places we haven&apos;t explored. <br />
            Photos we haven&apos;t taken. <br />
            Jokes we haven&apos;t laughed at. <br />
            Memories we haven&apos;t made.
          </p>

          <p className="font-serif text-xl sm:text-2xl text-baby-pink font-light pt-2">
            &ldquo;And I&apos;m excited to discover them with you.&rdquo;
          </p>
        </div>

        {/* Animated Couple Name Signature */}
        <div className="flex items-center gap-3 text-2xl sm:text-4xl font-serif text-warm-cream tracking-wider pt-2">
          <span>{coupleConfig.person1}</span>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <Heart className="w-6 h-6 text-deep-rose fill-deep-rose shadow-[0_0_15px_rgba(184,79,114,0.8)]" />
          </motion.div>
          <span>{coupleConfig.person2}</span>
        </div>

        <div className="font-sans text-xs tracking-[0.3em] uppercase text-champagne-gold">
          {coupleConfig.title}
        </div>

        {/* Divider */}
        <div className="w-20 h-[1px] bg-baby-pink/25" />

        {/* Attribution and Copyright */}
        <div className="flex flex-col gap-1.5 text-[10px] sm:text-xs tracking-[0.25em] text-zinc-400 font-light font-sans uppercase">
          <span>A Private Adventure Created For Sakshi ❤️</span>
          <span className="text-[9px] opacity-60">
            &copy; {currentYear} &bull; Our Little Universe &bull; Always &amp; Forever
          </span>
        </div>
      </div>
    </footer>
  );
}
