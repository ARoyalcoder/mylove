"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart, X, ZoomIn } from "lucide-react";
import { roomHotspots, RoomHotspot } from "@/lib/adventures/adventureData";

export default function LittleThingsRoom() {
  const [selectedHotspot, setSelectedHotspot] = useState<RoomHotspot | null>(null);

  return (
    <section
      id="memory-room"
      className="relative min-h-screen w-full py-32 bg-[#0B0307] text-warm-cream overflow-hidden px-4 sm:px-6 film-grain select-none"
    >
      {/* Ambient background warmth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-baby-pink/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center gap-12">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.28em] text-baby-pink font-sans"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne-gold animate-pulse" />
            <span>Chapter 05 • Exploring The Memory Room</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-warm-cream font-light leading-tight"
          >
            Little Things <br />
            <span className="italic text-baby-pink font-normal text-shimmer">
              Hidden In Our Room
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-zinc-300 font-light max-w-md leading-relaxed tracking-wider"
          >
            Explore our cozy corner. Tap on the framed picture, letters, flowers, fairy lights, or lamp to discover what they hold.
          </motion.p>
        </div>

        {/* The Interactive Room Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full rounded-3xl overflow-hidden p-3 sm:p-5 bg-gradient-to-b from-[#250D18]/80 via-[#1A0510] to-[#0B0307] border-2 border-baby-pink/30 shadow-[0_25px_70px_rgba(184,79,114,0.3)]"
        >
          <div className="relative w-full aspect-[16/9] min-h-[350px] sm:min-h-[480px] md:min-h-[580px] rounded-2xl overflow-hidden">
            <Image
              src="/adventures/adventure_memory_room.jpg"
              alt="Interactive Memory Room"
              fill
              className="object-cover"
              priority
            />

            {/* Ambient soft glow filter */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0307]/50 via-transparent to-transparent pointer-events-none" />

            {/* Clickable Hotspots */}
            {roomHotspots.map((spot) => (
              <div
                key={spot.id}
                style={{
                  left: `${spot.xPercent}%`,
                  top: `${spot.yPercent}%`,
                }}
                onClick={() => setSelectedHotspot(spot)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                {/* Pulsing Beacon Ring */}
                <span className="absolute -inset-2 rounded-full bg-baby-pink/50 animate-ping" />
                <span className="absolute -inset-4 rounded-full bg-soft-blush/25 animate-pulse" />

                {/* Hotspot Button */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-pink border-2 border-white flex items-center justify-center text-lg sm:text-xl shadow-[0_0_20px_rgba(248,200,220,0.9)] bg-gradient-to-tr from-deep-rose/80 to-baby-pink/90 text-white"
                >
                  <span>{spot.icon}</span>
                </motion.div>

                {/* Hover Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-full bg-black/85 text-warm-cream border border-baby-pink/50 text-[10px] sm:text-xs font-serif tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                  {spot.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Helper Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-sans text-baby-pink tracking-wider">
            {roomHotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setSelectedHotspot(spot)}
                className="px-3.5 py-1.5 rounded-full glass border border-baby-pink/20 hover:border-baby-pink text-warm-cream/90 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{spot.icon}</span>
                <span>{spot.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hotspot Reveal Modal */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHotspot(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.88, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#250D18] via-[#1A0510] to-[#0B0307] border border-baby-pink/40 shadow-[0_25px_70px_rgba(248,200,220,0.4)] text-left space-y-5"
            >
              <button
                onClick={() => setSelectedHotspot(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-baby-pink/20 border border-baby-pink/40 flex items-center justify-center text-2xl">
                  {selectedHotspot.icon}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-sans tracking-[0.25em] text-champagne-gold">
                    Secret In The Memory Room
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-warm-cream font-medium">
                    {selectedHotspot.revealTitle}
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-wine border border-baby-pink/20">
                <p className="font-serif italic text-base sm:text-lg text-baby-pink leading-relaxed">
                  &ldquo;{selectedHotspot.revealQuote}&rdquo;
                </p>
              </div>

              <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {selectedHotspot.revealStory}
              </p>

              <div className="pt-3 border-t border-baby-pink/15 flex items-center justify-between text-xs font-sans tracking-widest text-zinc-400 uppercase">
                <span>Little Things • Forever Noticed</span>
                <Heart className="w-4 h-4 text-baby-pink fill-baby-pink" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
