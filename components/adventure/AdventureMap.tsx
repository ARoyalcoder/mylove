"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Compass, Sparkles, MapPin, ArrowRight, Heart } from "lucide-react";
import { mapDestinations, AdventureDestination } from "@/lib/adventures/adventureData";

export default function AdventureMap() {
  const [selectedDestination, setSelectedDestination] = useState<AdventureDestination>(mapDestinations[0]);

  const handleGoToChapter = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="adventures-map"
      className="relative min-h-screen w-full py-32 bg-[#0B0307] text-warm-cream overflow-hidden px-4 sm:px-6 film-grain select-none"
    >
      {/* Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-baby-pink/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center gap-12">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.28em] text-baby-pink font-sans"
          >
            <Compass className="w-3.5 h-3.5 text-champagne-gold animate-spin" />
            <span>Interactive Love Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-warm-cream font-light leading-tight"
          >
            Our Love <br />
            <span className="italic text-baby-pink font-normal text-shimmer">
              Adventure Map
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-zinc-300 font-light max-w-lg leading-relaxed tracking-wider"
          >
            Every chapter of our story is a magical destination. Tap any landmark to travel to that part of our universe.
          </motion.p>
        </div>

        {/* The Illustrated Fantasy Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="relative w-full rounded-3xl overflow-hidden p-3 sm:p-5 bg-gradient-to-b from-deep-rose/30 via-[#250D18]/80 to-[#0B0307] border-2 border-baby-pink/30 shadow-[0_25px_70px_rgba(184,79,114,0.35)]"
        >
          {/* Map Image Base */}
          <div className="relative w-full aspect-[16/9] min-h-[340px] sm:min-h-[460px] md:min-h-[580px] rounded-2xl overflow-hidden shadow-inner">
            <Image
              src="/adventures/adventure_fantasy_map.jpg"
              alt="Illustrated Love Adventure Map"
              fill
              className="object-cover"
              priority
            />

            {/* Subtle vintage parchment warmth overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#250D18]/60 via-transparent to-transparent pointer-events-none" />

            {/* Interactive Destination Pins on the Map */}
            {mapDestinations.map((dest) => {
              const isSelected = selectedDestination.id === dest.id;
              return (
                <div
                  key={dest.id}
                  style={{
                    left: `${dest.xPercent}%`,
                    top: `${dest.yPercent}%`,
                  }}
                  onClick={() => setSelectedDestination(dest)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                >
                  {/* Pin Glow Aura */}
                  <div
                    className={`absolute -inset-3 rounded-full transition-all duration-500 pointer-events-none ${
                      isSelected
                        ? "bg-baby-pink/40 blur-md scale-150 animate-pulse"
                        : "bg-transparent group-hover:bg-baby-pink/25 group-hover:blur-sm"
                    }`}
                  />

                  {/* Pin Icon Bubble */}
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-base sm:text-xl border transition-all duration-300 shadow-lg ${
                      isSelected
                        ? "bg-gradient-to-br from-deep-rose to-baby-pink border-white text-white scale-110 shadow-[0_0_20px_rgba(248,200,220,0.9)]"
                        : "bg-[#FFF8F5]/90 border-champagne-gold/70 text-wine hover:border-baby-pink"
                    }`}
                  >
                    <span>{dest.icon}</span>
                  </motion.div>

                  {/* Destination Label Pill on Hover or Selection */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-full whitespace-nowrap text-[10px] sm:text-xs font-serif tracking-wider shadow-md pointer-events-none transition-all duration-300 ${
                      isSelected
                        ? "bg-[#5A1830] text-warm-cream border border-baby-pink opacity-100 scale-100"
                        : "bg-[#FFF8F5]/95 text-wine border border-champagne-gold/40 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
                    }`}
                  >
                    {dest.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Landmark Preview Card */}
          <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl glass-wine border border-baby-pink/25 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-baby-pink/20 border border-baby-pink/40 flex items-center justify-center text-2xl shrink-0">
                {selectedDestination.icon}
              </div>
              <div>
                <div className="text-[10px] font-sans tracking-[0.25em] text-champagne-gold uppercase">
                  {selectedDestination.chapter}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-warm-cream font-medium">
                  {selectedDestination.title}
                </h3>
                <p className="font-sans text-xs text-zinc-300 font-light mt-0.5">
                  {selectedDestination.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleGoToChapter(selectedDestination.anchor)}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-deep-rose to-rose text-white text-xs sm:text-sm uppercase tracking-widest font-medium cursor-pointer shadow-[0_8px_25px_rgba(184,79,114,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 border border-baby-pink/40 shrink-0"
            >
              <span>Travel To Destination</span>
              <ArrowRight className="w-4 h-4 text-champagne-gold" />
            </button>
          </div>
        </motion.div>

        {/* Quick Chapter Selector Carousel for Touch Devices */}
        <div className="w-full flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar pt-2">
          {mapDestinations.map((dest) => {
            const isSelected = selectedDestination.id === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => {
                  setSelectedDestination(dest);
                  handleGoToChapter(dest.anchor);
                }}
                className={`px-4 py-2.5 rounded-2xl shrink-0 text-xs font-serif tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? "bg-baby-pink/25 text-warm-cream border-baby-pink shadow-[0_0_15px_rgba(248,200,220,0.3)]"
                    : "glass text-zinc-400 border-white/5 hover:text-warm-cream hover:border-baby-pink/30"
                }`}
              >
                <span>{dest.icon}</span>
                <span className="font-sans uppercase text-[10px] tracking-widest">{dest.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
