"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart, Compass, CheckCircle2, X } from "lucide-react";
import { futureChoices, FutureAdventureChoice } from "@/lib/adventures/adventureData";

export default function FutureAdventure() {
  const [selectedChoice, setSelectedChoice] = useState<FutureAdventureChoice | null>(null);
  const [confirmedChoice, setConfirmedChoice] = useState<FutureAdventureChoice | null>(null);

  const handlePickAdventure = (choice: FutureAdventureChoice) => {
    setSelectedChoice(choice);
  };

  return (
    <section
      id="future-adventures"
      className="relative min-h-screen w-full py-32 bg-[#0B0307] text-warm-cream overflow-hidden px-4 sm:px-6 film-grain select-none"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-baby-pink/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center gap-14">
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
            <span>Chapter 07 • The Road Ahead</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-warm-cream font-light leading-tight"
          >
            Adventures We <br />
            <span className="italic text-baby-pink font-normal text-shimmer">
              Haven&apos;t Had Yet
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-zinc-300 font-light max-w-md leading-relaxed tracking-wider"
          >
            A memory we haven&apos;t made yet. Choose where you want our story to travel next, Sakshi.
          </motion.p>
        </div>

        {/* Feature Hero Card: The Coastal Road */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full rounded-3xl overflow-hidden p-3 sm:p-5 bg-gradient-to-b from-deep-rose/30 via-[#250D18]/80 to-[#0B0307] border-2 border-baby-pink/30 shadow-[0_25px_70px_rgba(184,79,114,0.3)]"
        >
          <div className="relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[420px] rounded-2xl overflow-hidden">
            <Image
              src="/adventures/adventure_future_road.jpg"
              alt="Future Road Toward Pink Sunrise"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0307]/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 inset-x-6 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-champagne-gold">
                  A Memory We Haven&apos;t Made Yet
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-warm-cream font-light">
                  The Open Road Toward Sunrise
                </h3>
                <p className="font-serif italic text-xs sm:text-base text-baby-pink/90 max-w-lg">
                  &ldquo;Somewhere by the sea, windows down, laughing about everything and nothing.&rdquo;
                </p>
              </div>

              <div className="px-4 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs font-serif tracking-widest text-warm-cream shrink-0">
                Sakshi × Aditya • Future Chapter
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Choice Grid: "Pick Our Next Adventure" */}
        <div className="w-full flex flex-col items-center gap-8 pt-4">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl text-warm-cream font-light">
              Where should our story go next?
            </h3>
            <p className="text-xs font-sans text-zinc-400 tracking-wider">
              Tap any adventure card to choose our next journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {futureChoices.map((choice) => (
              <motion.div
                key={choice.id}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                onClick={() => handlePickAdventure(choice)}
                className="group relative rounded-3xl p-7 bg-zinc-950/70 border border-baby-pink/20 backdrop-blur-md flex flex-col justify-between gap-6 hover:border-baby-pink/50 hover:shadow-[0_15px_40px_rgba(248,200,220,0.25)] transition-all duration-400 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{choice.icon}</span>
                  <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-champagne-gold">
                    {choice.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-warm-cream font-medium group-hover:text-baby-pink transition-colors">
                    {choice.title}
                  </h4>
                  <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed">
                    {choice.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-baby-pink/15 flex items-center justify-between text-xs font-sans text-baby-pink uppercase tracking-widest">
                  <span>Pick This Adventure</span>
                  <Heart className="w-3.5 h-3.5 text-deep-rose group-hover:text-baby-pink group-hover:scale-125 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Choice Preview Modal */}
      <AnimatePresence>
        {selectedChoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedChoice(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.88, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#250D18] via-[#1A0510] to-[#0B0307] border border-baby-pink/40 p-8 sm:p-10 shadow-[0_25px_70px_rgba(248,200,220,0.4)] text-left space-y-6"
            >
              <button
                onClick={() => setSelectedChoice(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedChoice.icon}</span>
                <div>
                  <div className="text-[10px] uppercase font-sans tracking-[0.25em] text-champagne-gold">
                    Our Next Journey
                  </div>
                  <h3 className="font-serif text-3xl text-warm-cream font-light">
                    {selectedChoice.title}
                  </h3>
                </div>
              </div>

              <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-baby-pink/25">
                <Image
                  src={selectedChoice.backgroundImage}
                  alt={selectedChoice.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 rounded-2xl glass-wine border border-baby-pink/20">
                <p className="font-serif italic text-base sm:text-lg text-baby-pink leading-relaxed">
                  &ldquo;Maybe one day... we&apos;ll actually be there.&rdquo;
                </p>
                <p className="font-sans text-xs text-zinc-300 font-light mt-1">
                  {selectedChoice.romanticNote}
                </p>
              </div>

              <button
                onClick={() => {
                  setConfirmedChoice(selectedChoice);
                  setSelectedChoice(null);
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-deep-rose to-rose text-white text-xs sm:text-sm uppercase tracking-widest font-medium cursor-pointer shadow-lg hover:scale-101 active:scale-99 transition-all border border-baby-pink/40 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-champagne-gold" />
                <span>Make A Wish For This Adventure ✨</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
