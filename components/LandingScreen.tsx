"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import { coupleConfig } from "@/config/couple";

interface LandingScreenProps {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  const [isEntering, setIsEntering] = useState(false);

  // Play soft portal harp chime using Web Audio API
  const playPortalSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [440, 554.37, 659.25, 880, 1108.73]; // A4, C#5, E5, A5, C#6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.85);
      });
    } catch {
      // AudioContext could be blocked; continue silently
    }
  };

  const handleEnterAdventure = () => {
    if (isEntering) return;
    setIsEntering(true);
    playPortalSound();
    // After glowing portal animation finishes, trigger onStart
    setTimeout(() => {
      onStart();
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden film-grain select-none bg-[#0B0307]"
    >
      {/* 1. Cinematic Background: AI Romantic Pink Sunrise with soft zoom on enter */}
      <motion.div
        animate={isEntering ? { scale: 1.25, filter: "blur(10px)" } : { scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <Image
          src="/adventures/hero_pink_sunrise.jpg"
          alt="Dreamy Baby Pink Sunrise Garden"
          fill
          priority
          className="object-cover opacity-65"
        />
        {/* Soft baby pink & warm cream ambient gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0307] via-[#250D18]/70 to-[#0B0307]/40" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(248,200,220,0.35)_0%,transparent_70%]" />
      </motion.div>

      {/* 2. Floating Translucent Hearts & Bokeh particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-10, 15, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[12%] text-baby-pink/40"
        >
          <Heart className="w-8 h-8 fill-current" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -15, 10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[70%] left-[80%] text-rose/35"
        >
          <Heart className="w-12 h-12 fill-current" />
        </motion.div>
        <motion.div
          animate={{ y: [-8, 12, -8], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[35%] right-[15%] text-soft-blush/40"
        >
          <Heart className="w-6 h-6 fill-current" />
        </motion.div>
      </div>

      {/* 3. Center Content */}
      <motion.div
        animate={isEntering ? { scale: 0.9, opacity: 0, y: -30 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-2xl flex flex-col items-center gap-7"
      >
        {/* Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.3em] text-soft-blush font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold animate-pulse" />
          <span>A Private Romantic Universe</span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-3"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-warm-cream leading-tight tracking-wide text-shimmer">
            {coupleConfig.title}
          </h1>

          <div className="font-serif text-2xl sm:text-3xl text-baby-pink font-light tracking-widest flex items-center justify-center gap-3">
            <span>{coupleConfig.person1}</span>
            <span className="text-deep-rose text-xl">×</span>
            <span>{coupleConfig.person2}</span>
          </div>
        </motion.div>

        {/* Dedicated Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif italic text-lg sm:text-2xl text-warm-cream/90 font-light max-w-lg leading-relaxed"
        >
          &ldquo;A little world that belongs only to us.&rdquo;
        </motion.p>

        {/* CTA Button: 💗 Enter Our Adventure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-4"
        >
          <button
            onClick={handleEnterAdventure}
            disabled={isEntering}
            className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-deep-rose via-rose to-baby-pink text-white font-medium text-sm sm:text-base tracking-[0.22em] uppercase cursor-pointer shadow-[0_10px_35px_rgba(184,79,114,0.55)] hover:shadow-[0_15px_45px_rgba(248,200,220,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-soft-blush/40"
          >
            <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform heart-beat-pulse" />
            <span>💗 Enter Our Adventure</span>
          </button>
        </motion.div>
      </motion.div>

      {/* 4. Portal Expansion Transition on Click */}
      <AnimatePresence>
        {isEntering && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 30], opacity: [0, 0.95, 1] }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            {/* Glowing Heart Portal */}
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-baby-pink via-soft-blush to-warm-cream flex items-center justify-center shadow-[0_0_120px_rgba(248,200,220,1)]">
              <Heart className="w-24 h-24 text-deep-rose fill-deep-rose" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
