"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, CheckCircle2 } from "lucide-react";

const affirmations = [
  "I'd still want to know your name.",
  "Still want to hear all your stories.",
  "Still wait for your unexpected smile.",
  "Still try silly ways to make you laugh.",
  "Still stay up past 2 AM just to talk.",
  "Still want to build a little universe with you.",
];

export default function ChooseYouSection() {
  return (
    <section
      id="choose-you"
      className="relative min-h-[90vh] w-full py-32 bg-[#060105] overflow-hidden flex flex-col items-center justify-center px-6 film-grain select-none"
    >
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-rose/25 via-burgundy/30 to-gold-soft/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center gap-12">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-rose-soft/30 text-xs uppercase tracking-[0.28em] text-blush font-sans"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-soft" />
          <span>Without Hesitation</span>
        </motion.div>

        {/* Big Romantic Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream font-light leading-tight">
            If I met you again, <br />
            <span className="italic text-rose-soft font-normal text-shimmer">
              for the first time...
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-md mx-auto leading-relaxed tracking-wider">
            In any lifetime, in any universe, in any room full of people.
          </p>
        </motion.div>

        {/* Affirmations List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left">
          {affirmations.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="p-4 sm:p-5 rounded-2xl glass-wine border border-rose-soft/20 flex items-center gap-3 group hover:border-rose-soft/45 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-rose-soft/20 flex items-center justify-center text-rose-soft shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="font-serif text-sm sm:text-base text-cream/90 group-hover:text-white transition-colors">
                {line}
              </span>
            </motion.div>
          ))}
        </div>

        {/* The Climax Statement Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-burgundy/80 via-black/80 to-zinc-950/90 border border-gold-soft/30 shadow-[0_20px_50px_rgba(216,182,106,0.15)] max-w-xl text-center flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-rose-soft/20 border border-rose-soft/30 flex items-center justify-center text-rose-soft">
            <Heart className="w-6 h-6 fill-rose-soft animate-ping" />
          </div>

          <p className="font-serif text-xl sm:text-2xl text-cream font-light italic leading-relaxed">
            &ldquo;I&apos;d still choose the beginning. <br />
            Because it led me straight to you.&rdquo;
          </p>

          <div className="w-16 h-[1px] bg-rose-soft/30 my-2" />

          <div className="font-script text-3xl sm:text-4xl text-gold-soft">
            Sakshi × Aditya ❤️
          </div>
        </motion.div>
      </div>
    </section>
  );
}
