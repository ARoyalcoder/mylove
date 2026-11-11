"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lock, Unlock, Moon, Sparkles, Heart, X, Mail, Compass, Star, Flower } from "lucide-react";

interface SecretRoomsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: "letter" | "midnight" | "garden";
}

export default function SecretRoomsModal({ isOpen, onClose, initialRoom = "letter" }: SecretRoomsModalProps) {
  const [activeRoom, setActiveRoom] = useState<"letter" | "midnight" | "garden">(initialRoom);
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const [gardenFoundItem, setGardenFoundItem] = useState<string | null>(null);

  const gardenItems = [
    {
      id: "rose",
      name: "Enchanted Pink Rose",
      icon: "🌹",
      message: "Just like a rose among thorns, you bring pure softness and color into everything I do.",
    },
    {
      id: "butterfly",
      name: "Golden Wing Butterfly",
      icon: "🦋",
      message: "The way you laugh makes my heart take flight every single time.",
    },
    {
      id: "letter",
      name: "Tucked Garden Note",
      icon: "💌",
      message: "I prayed for happiness, and the universe gave me you.",
    },
    {
      id: "star",
      name: "Fallen Wishing Star",
      icon: "⭐",
      message: "My only wish is for a thousand more ordinary days filled with your laughter.",
    },
    {
      id: "heart",
      name: "Parchment Heart",
      icon: "❤️",
      message: "Forever is a long time, but with you it still feels too short.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-[#250D18] via-[#170510] to-[#0B0307] border-2 border-baby-pink/30 p-6 sm:p-10 shadow-[0_25px_80px_rgba(248,200,220,0.4)] z-10 max-h-[92vh] overflow-y-auto text-warm-cream"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full glass border border-baby-pink/30 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Room Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pb-6 border-b border-baby-pink/20">
              <button
                onClick={() => setActiveRoom("letter")}
                className={`py-2 px-4 rounded-full text-xs font-sans uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                  activeRoom === "letter"
                    ? "bg-baby-pink text-wine font-medium shadow-[0_0_15px_rgba(248,200,220,0.6)]"
                    : "glass text-zinc-400 hover:text-white"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>🔐 Secret Letter Room</span>
              </button>

              <button
                onClick={() => setActiveRoom("midnight")}
                className={`py-2 px-4 rounded-full text-xs font-sans uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                  activeRoom === "midnight"
                    ? "bg-baby-pink text-wine font-medium shadow-[0_0_15px_rgba(248,200,220,0.6)]"
                    : "glass text-zinc-400 hover:text-white"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>🌙 Midnight Room</span>
              </button>

              <button
                onClick={() => setActiveRoom("garden")}
                className={`py-2 px-4 rounded-full text-xs font-sans uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                  activeRoom === "garden"
                    ? "bg-baby-pink text-wine font-medium shadow-[0_0_15px_rgba(248,200,220,0.6)]"
                    : "glass text-zinc-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>🌸 Pink Garden</span>
              </button>
            </div>

            {/* ROOM 1: SECRET LETTER ROOM */}
            {activeRoom === "letter" && (
              <div className="pt-6 space-y-6 text-center">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-sans tracking-[0.3em] text-champagne-gold">
                    Private &amp; Sealed
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-warm-cream">
                    A letter I never want you to forget.
                  </h3>
                </div>

                {!isLetterOpened ? (
                  <div className="py-8 flex flex-col items-center gap-5">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsLetterOpened(true)}
                      className="w-64 h-44 rounded-3xl bg-gradient-to-br from-[#3D1426] to-[#1F0713] border-2 border-baby-pink/40 p-6 flex flex-col items-center justify-between shadow-[0_15px_40px_rgba(248,200,220,0.3)] cursor-pointer relative group"
                    >
                      <div className="w-12 h-12 rounded-full bg-deep-rose flex items-center justify-center text-white shadow-lg">
                        <Heart className="w-6 h-6 fill-white heart-beat-pulse" />
                      </div>
                      <div className="text-xs uppercase font-sans tracking-[0.25em] text-baby-pink">
                        For Sakshi ❤️
                      </div>
                      <div className="text-xs font-serif italic text-champagne-gold">
                        Tap wax seal to open letter 💌
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 sm:p-9 rounded-3xl glass-parchment text-left space-y-4 shadow-2xl relative border-2 border-champagne-gold/40"
                  >
                    <button
                      onClick={() => setIsLetterOpened(false)}
                      className="absolute top-4 right-4 text-xs font-sans text-wine/60 hover:text-wine uppercase tracking-widest cursor-pointer"
                    >
                      Fold Back ✕
                    </button>

                    <h4 className="font-serif text-2xl text-wine font-medium">
                      Sakshi, meri jaan,
                    </h4>

                    <div className="font-serif italic text-base sm:text-lg text-wine/90 leading-relaxed space-y-3">
                      <p>
                        There are moments when I look at you and wonder how someone so gentle, so genuine, and so radiant ended up in my life.
                      </p>
                      <p>
                        You don&apos;t just make my days happier — you make my entire world softer. When you smile at me, every doubt disappears. When you hold my hand, every road feels easy.
                      </p>
                      <p>
                        Thank you for loving me. Thank you for building this little universe with me. Whatever comes next, my heart is completely yours.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-wine/20 flex flex-col items-start gap-1">
                      <span className="text-xs uppercase font-sans tracking-widest text-wine/70">
                        Forever Yours,
                      </span>
                      <span className="font-script text-4xl text-deep-rose">
                        — Aditya ❤️
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* ROOM 2: MIDNIGHT ROOM */}
            {activeRoom === "midnight" && (
              <div className="pt-6 space-y-6 text-center">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-sans tracking-[0.3em] text-champagne-gold">
                    Chapter • Midnight Rose
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-warm-cream">
                    🌙 For The Nights When You Can&apos;t Sleep
                  </h3>
                  <p className="font-serif italic text-sm sm:text-base text-baby-pink/90">
                    &ldquo;Some conversations just feel better after midnight.&rdquo;
                  </p>
                </div>

                <div className="relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-baby-pink/30 shadow-inner">
                  <Image
                    src="/adventures/adventure_midnight_stars.jpg"
                    alt="Midnight Moonlit Window"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0307] via-transparent to-transparent" />
                  <div className="absolute bottom-6 inset-x-6 text-center space-y-2">
                    <p className="font-serif text-lg sm:text-xl italic text-warm-cream leading-relaxed">
                      &ldquo;When the city is quiet, and the stars come out, I look at the moon and thank the stars for you.&rdquo;
                    </p>
                    <div className="text-[11px] font-sans tracking-widest uppercase text-champagne-gold">
                      Aditya &bull; 02:30 AM Thoughts
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ROOM 3: PINK GARDEN */}
            {activeRoom === "garden" && (
              <div className="pt-6 space-y-6 text-center">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-sans tracking-[0.3em] text-champagne-gold">
                    Interactive Secret Garden
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-warm-cream">
                    🌸 The Hidden Pink Garden
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300">
                    Tap any of the 5 hidden charms in the garden to reveal a romantic blessing.
                  </p>
                </div>

                {/* 5 Hidden Charms */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                  {gardenItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setGardenFoundItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 cursor-pointer ${
                        gardenFoundItem === item.id
                          ? "bg-baby-pink text-wine border-white scale-105 shadow-[0_0_20px_rgba(248,200,220,0.7)]"
                          : "glass-wine text-warm-cream border-baby-pink/20 hover:border-baby-pink"
                      }`}
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-[11px] font-sans font-medium text-center">{item.name}</span>
                    </button>
                  ))}
                </div>

                {/* Revealed Charm Message */}
                {gardenFoundItem && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl glass-wine border border-baby-pink/30 text-center max-w-lg mx-auto space-y-2 shadow-lg"
                  >
                    <div className="text-xs uppercase font-sans tracking-widest text-champagne-gold">
                      Secret Garden Discovery
                    </div>
                    <p className="font-serif italic text-base sm:text-lg text-baby-pink leading-relaxed">
                      &ldquo;{gardenItems.find((i) => i.id === gardenFoundItem)?.message}&rdquo;
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
