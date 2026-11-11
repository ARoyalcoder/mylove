"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart, Pause, Play } from "lucide-react";

export default function OneSecondSection() {
  const [isHolding, setIsHolding] = useState(false);

  return (
    <section
      id="one-second"
      className="relative min-h-screen w-full py-32 bg-[#030104] overflow-hidden flex flex-col items-center justify-center px-6 film-grain select-none"
    >
      {/* Cinematic Deep Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(66,8,21,0.35)_0%,rgba(3,1,4,0.95)_70%]" />

      {/* Floating ambient glow that intensifies on hold */}
      <motion.div
        animate={{
          scale: isHolding ? 1.4 : 1,
          opacity: isHolding ? 0.6 : 0.25,
        }}
        transition={{ duration: 0.8 }}
        className="absolute w-[600px] h-[600px] rounded-full bg-rose-soft/30 blur-[160px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-10">
        {/* Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-rose-soft/30 text-xs uppercase tracking-[0.28em] text-blush font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-soft" />
          <span>A Timeless Moment</span>
        </motion.div>

        {/* Cinematic Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream font-light leading-tight">
            If I could keep <br />
            <span className="italic text-rose-soft font-normal text-shimmer">
              just one second...
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-md mx-auto leading-relaxed tracking-wider">
            I&apos;d probably keep this one.
          </p>
        </motion.div>

        {/* Hero Photo Card with Focus & Hold Interaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          className="group relative cursor-pointer rounded-3xl overflow-hidden p-2 sm:p-3 bg-gradient-to-b from-rose-soft/20 via-burgundy/40 to-black/80 border border-rose-soft/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-w-xl w-full"
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950">
            <Image
              src="/memories/memory-3.png"
              alt="Sakshi and Aditya One Second Moment"
              fill
              className={`object-cover transition-all duration-1000 ${
                isHolding ? "scale-105 brightness-110 filter-none" : "scale-100 brightness-95"
              }`}
              priority={false}
            />

            {/* Dark glass romantic overlay on hover/hold */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${
                isHolding ? "opacity-40" : "opacity-70"
              }`}
            />

            {/* Hold Indicator Badge */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-rose-soft/30 text-[10px] tracking-widest uppercase font-sans text-cream/90 backdrop-blur-md">
              {isHolding ? (
                <>
                  <Pause className="w-3 h-3 text-gold-soft animate-pulse" />
                  <span>Second Frozen</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-rose-soft" />
                  <span>Press &amp; Hold to Freeze</span>
                </>
              )}
            </div>

            {/* In-photo romantic text bottom overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 z-20 text-left flex flex-col gap-1">
              <span className="text-[10px] font-sans tracking-[0.25em] text-gold-soft uppercase">
                Aditya × Sakshi • The Golden Frame
              </span>
              <p className="font-serif italic text-base sm:text-lg text-cream/95 font-light leading-snug">
                &ldquo;Not because it was extraordinary to anyone else, but because for that single heartbeat, the whole universe paused.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>

        {/* Poetic Under-text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="max-w-lg space-y-4"
        >
          <p className="font-serif text-lg sm:text-xl text-zinc-300 font-light italic leading-relaxed">
            Just you, your eyes smiling, and the world finally making complete and effortless sense.
          </p>
          <div className="flex items-center justify-center gap-2 text-rose-soft/70">
            <span className="h-[1px] w-8 bg-rose-soft/40" />
            <Heart className="w-3.5 h-3.5 fill-rose-soft/50 animate-pulse" />
            <span className="h-[1px] w-8 bg-rose-soft/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
