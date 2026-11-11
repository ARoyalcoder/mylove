"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, Sparkles, X } from "lucide-react";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const playEnvelopeChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // AudioContext could be blocked; continue silently
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      playEnvelopeChime();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section
      id="love-letter"
      className="relative min-h-screen w-full py-32 bg-[#0B0307] overflow-hidden flex flex-col items-center justify-center px-6 film-grain select-none"
    >
      {/* Background warm gold and baby pink glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(248,200,220,0.18)_0%,rgba(90,24,48,0.25)_50%,transparent_75%] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center gap-10 w-full">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.28em] text-baby-pink font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
          <span>Chapter 08 • Handwritten Letter</span>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warm-cream font-light leading-tight">
            💌 Something I Wanted <br />
            <span className="italic text-baby-pink font-normal text-shimmer">
              To Tell You
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light max-w-md mx-auto leading-relaxed tracking-wider">
            Some thoughts are too soft to say out loud. Open it whenever you are ready.
          </p>
        </motion.div>

        {/* Interactive Sealed Envelope (When Closed) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6 mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleToggle}
              className="group relative w-72 sm:w-88 h-48 sm:h-56 rounded-3xl bg-gradient-to-br from-[#3D1426] via-[#250D18] to-[#12030B] border-2 border-baby-pink/40 p-6 flex flex-col justify-between items-center shadow-[0_20px_60px_rgba(248,200,220,0.35)] cursor-pointer transition-all duration-500 hover:border-champagne-gold"
            >
              {/* Envelope flap triangle overlay */}
              <div className="absolute top-0 inset-x-0 h-1/2 border-b border-baby-pink/20 bg-wine/30 rounded-t-3xl [clip-path:polygon(0_0,100%_0,50%_100%)] pointer-events-none" />

              {/* Wax Seal in Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-deep-rose to-baby-pink border-2 border-white shadow-[0_0_25px_rgba(248,200,220,0.8)] flex items-center justify-center text-white z-10 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 fill-white heart-beat-pulse" />
              </div>

              {/* Envelope Address */}
              <div className="z-10 text-[11px] font-sans tracking-[0.25em] text-soft-blush uppercase font-medium">
                For Sakshi ❤️
              </div>

              <div className="z-10 text-xs font-serif italic text-champagne-gold group-hover:text-warm-cream">
                Click wax seal to break &amp; unfold
              </div>
            </motion.button>

            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-sans">
              Private • Sealed with Love
            </span>
          </motion.div>
        )}

        {/* Unfolded Letter on Warm Cream Paper with Gold Edges */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative w-full max-w-2xl rounded-3xl p-8 sm:p-14 glass-parchment border-2 border-champagne-gold/60 shadow-[0_25px_80px_rgba(248,200,220,0.5)] text-left flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-wine/10 hover:bg-wine/20 text-wine transition-colors cursor-pointer"
                title="Fold letter back"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Salutation */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-deep-rose text-xs uppercase font-sans tracking-[0.25em] font-medium">
                  <Mail className="w-3.5 h-3.5" />
                  <span>A Letter to You</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-wine font-light">
                  Dearest Sakshi,
                </h3>
              </div>

              {/* Letter Content */}
              <div className="space-y-4 font-serif text-base sm:text-lg text-wine/90 font-normal leading-relaxed italic">
                <p>
                  Some people are remembered because of the moments they created. Some are remembered because of the way they made you feel.
                </p>
                <p>
                  You are both, and so much more.
                </p>
                <p>
                  Whenever I look at you, or hear your laughter, I am reminded of how lucky I am that out of billions of people in this world, my universe crossed paths with yours. You make every simple conversation feel special, and every ordinary day feel like something worth remembering.
                </p>
                <p>
                  Thank you for being my favorite notification, my late-night comfort, and my everyday dream.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-6 border-t border-wine/15 flex flex-col items-start gap-1">
                <span className="font-sans text-xs tracking-widest text-wine/70 uppercase">
                  Forever Yours,
                </span>
                <span className="font-script text-4xl sm:text-5xl text-deep-rose filter drop-shadow-[0_0_10px_rgba(184,79,114,0.3)]">
                  Aditya ❤️
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
