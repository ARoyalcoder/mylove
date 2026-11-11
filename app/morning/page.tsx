"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sun, Heart, Sparkles, Coffee, Flower, CheckCircle2, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

export default function MorningPage() {
  const [isHeartFound, setIsHeartFound] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentDateStr, setCurrentDateStr] = useState("");

  useEffect(() => {
    const today = new Date();
    setCurrentDateStr(
      today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    );
  }, []);

  const handleHeartClick = () => {
    if (isHeartFound) return;
    setIsHeartFound(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#F8C8DC", "#FFDDE8", "#E98AA8", "#D8B56A"],
    });
    setTimeout(() => {
      setIsCompleted(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0307] text-warm-cream overflow-hidden flex flex-col items-center justify-between p-6 film-grain select-none">
      {/* Background AI Morning Sunrise Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/adventures/hero_pink_sunrise.jpg"
          alt="Morning Sunrise Atmosphere"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0307] via-[#250D18]/70 to-[#0B0307]/50" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(248,200,220,0.3)_0%,transparent_70%]" />
      </div>

      {/* Top Nav: Back to Universe */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between pt-4">
        <Link
          href="/"
          className="px-4 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs font-sans tracking-widest uppercase text-baby-pink flex items-center gap-2 hover:bg-baby-pink hover:text-wine transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Our Little Universe</span>
        </Link>
        <span className="text-xs font-serif italic text-champagne-gold">
          {currentDateStr}
        </span>
      </div>

      {/* Center Content: Morning Adventure */}
      <main className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center gap-8 py-12">
        {/* Morning Sun Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.3em] text-baby-pink font-sans"
        >
          <Sun className="w-4 h-4 text-champagne-gold animate-spin" />
          <span>7:00 AM • Morning Blessing</span>
        </motion.div>

        {/* Big Spiritual & Romantic Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="font-serif text-4xl sm:text-6xl text-warm-cream font-light tracking-wide leading-tight">
            RADHE RADHE, <br />
            <span className="italic text-baby-pink font-normal text-shimmer">
              MY LOVE ❤️
            </span>
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-soft-blush/90">
            A new sunrise in our little universe, just for you.
          </p>
        </motion.div>

        {/* Daily Adventure Challenge Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full p-8 sm:p-10 rounded-3xl glass-wine border-2 border-baby-pink/30 shadow-[0_20px_60px_rgba(248,200,220,0.3)] space-y-6"
        >
          {!isCompleted ? (
            <>
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-champagne-gold">
                  Today&apos;s Mini Adventure
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-warm-cream font-light">
                  Find the little heart hidden somewhere in this morning.
                </h2>
              </div>

              {/* Interactive Morning Objects to explore */}
              <div className="py-6 flex items-center justify-center gap-8">
                {/* Flower */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  className="w-16 h-16 rounded-2xl glass-pink border border-baby-pink/30 flex items-center justify-center text-3xl cursor-pointer"
                  title="Morning Rose"
                >
                  <Flower className="w-8 h-8 text-baby-pink" />
                </motion.div>

                {/* THE HIDDEN HEART */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleHeartClick}
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl cursor-pointer transition-all duration-500 ${
                    isHeartFound
                      ? "bg-deep-rose border-white text-white shadow-[0_0_30px_rgba(248,200,220,1)] scale-110"
                      : "glass-pink border-baby-pink/30 text-baby-pink/70 hover:border-baby-pink"
                  }`}
                  title="Is the heart hidden here?"
                >
                  <Heart
                    className={`w-8 h-8 ${
                      isHeartFound ? "fill-white text-white" : "text-baby-pink heart-beat-pulse"
                    }`}
                  />
                </motion.div>

                {/* Coffee */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  className="w-16 h-16 rounded-2xl glass-pink border border-baby-pink/30 flex items-center justify-center text-3xl cursor-pointer"
                  title="Morning Chai"
                >
                  <Coffee className="w-8 h-8 text-champagne-gold" />
                </motion.div>
              </div>

              <p className="text-xs font-sans text-zinc-300 font-light">
                {isHeartFound ? "✨ You found it! Opening today's secret..." : "Tap on the items above to unlock today's sweet note"}
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5"
            >
              <div className="w-12 h-12 rounded-full bg-deep-rose flex items-center justify-center mx-auto text-white shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-champagne-gold" />
              </div>

              <h2 className="font-serif text-3xl text-warm-cream font-light">
                Adventure Complete! ✨
              </h2>

              <div className="p-5 rounded-2xl glass-parchment text-left space-y-2">
                <div className="text-[10px] font-sans uppercase tracking-widest text-deep-rose font-medium">
                  Aditya&apos;s Morning Thought For Sakshi
                </div>
                <p className="font-serif italic text-base sm:text-lg text-wine leading-relaxed">
                  &ldquo;I hope today brings you unexpected reasons to smile, gentle moments of peace, and the reminder that someone loves you with all his heart.&rdquo;
                </p>
              </div>

              <div className="text-xs font-sans text-zinc-300 space-y-1">
                <p>Come back tomorrow morning.</p>
                <p className="text-baby-pink font-serif italic text-sm">
                  There&apos;s another little chapter waiting for you. ❤️
                </p>
              </div>

              <Link
                href="/"
                className="inline-block mt-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-deep-rose to-rose text-white text-xs sm:text-sm uppercase tracking-widest font-medium cursor-pointer shadow-[0_10px_30px_rgba(184,79,114,0.5)] hover:scale-105 active:scale-95 transition-all border border-baby-pink/40"
              >
                Return To Our Universe 🌸
              </Link>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Footer Quote */}
      <footer className="relative z-10 text-center text-xs font-serif italic text-zinc-400 pb-4">
        Sakshi × Aditya • Every morning is a new blessing ❤️
      </footer>
    </div>
  );
}
