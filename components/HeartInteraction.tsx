"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function HeartInteraction() {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleHeartClick = () => {
    setIsRevealed(true);

    // Trigger romantic confetti blast
    const end = Date.now() + 1.5 * 1000;
    const colors = ["#d63c5e", "#ff758f", "#6e0d25", "#d4af37"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section className="relative w-full py-24 bg-midnight overflow-hidden px-6">
      {/* Background radial highlight - gets larger and brighter on reveal */}
      <div
        className={`absolute inset-0 bg-radial-[circle_at_center,rgba(214,60,94,0.12)_0%,transparent_50%] pointer-events-none transition-opacity duration-1000 ${
          isRevealed ? "opacity-100 scale-125" : "opacity-50"
        }`}
      />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center gap-12">
        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-rose tracking-[0.25em] text-[10px] md:text-xs uppercase font-medium">
            A small promise
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-zinc-100 mt-1">
            One Little Thing...
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-rose to-transparent mt-4" />
        </div>

        {/* Clickable Heart Container */}
        <div className="relative flex flex-col items-center min-h-[360px] justify-center w-full">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="heart-trigger"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Pulsing button */}
                <button
                  onClick={handleHeartClick}
                  className="w-24 h-24 rounded-full bg-rose/10 flex items-center justify-center border border-rose/30 shadow-[0_0_30px_rgba(214,60,94,0.3)] cursor-pointer hover:bg-rose/25 hover:border-rose/60 hover:shadow-[0_0_50px_rgba(214,60,94,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none group heart-glow-pulse"
                  aria-label="Tap the heart"
                >
                  <Heart className="w-10 h-10 text-rose fill-rose/20 group-hover:fill-rose/50 transition-colors duration-300" />
                </button>
                <span className="text-xs uppercase tracking-[0.35em] text-zinc-400 animate-pulse">
                  Tap the heart
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="message-reveal"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="glass-wine rounded-3xl p-8 md:p-12 max-w-xl border border-rose-dark/30 shadow-[0_15px_40px_rgba(214,60,94,0.1)] flex flex-col items-center gap-6"
              >
                <Heart className="w-8 h-8 text-rose fill-rose animate-[pulseGlow_1.5s_infinite_ease-in-out]" />
                
                <p className="font-serif text-xl md:text-2xl text-zinc-100 font-light leading-relaxed italic">
                  &ldquo;Sakshi, no matter how many memories we make, I hope we always keep making new ones.&rdquo;
                </p>
                
                <div className="w-12 h-[1px] bg-rose-dark/30" />
                
                <span className="text-[10px] uppercase tracking-widest text-rose-light">
                  Our Promise
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
