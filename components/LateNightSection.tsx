"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Stars, Clock, Sparkles, MessageSquareHeart, CheckCheck } from "lucide-react";

export default function LateNightSection() {
  const [showSecretNote, setShowSecretNote] = useState(false);

  return (
    <section
      id="late-night"
      className="relative min-h-[90vh] w-full py-32 bg-[#04060e] overflow-hidden flex flex-col items-center justify-center px-6 film-grain select-none"
    >
      {/* Deep Midnight Blue Moonlight Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#101b42]/40 via-[#0a1128]/20 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Starlight Points */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-ping" />
        <div className="absolute top-36 right-1/3 w-1 h-1 bg-gold-soft/80 rounded-full animate-pulse" />
        <div className="absolute bottom-24 left-1/3 w-2 h-2 bg-blue-300/40 rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-1/4 w-1.5 h-1.5 bg-white/70 rounded-full animate-ping" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center gap-10">
        {/* Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-400/25 text-xs uppercase tracking-[0.28em] text-blue-200/90 font-sans"
        >
          <Moon className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
          <span>2:30 AM • The Quiet Hours</span>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cream font-light leading-tight">
            Some conversations <br />
            <span className="italic text-blue-200 font-normal">
              should have ended hours ago.
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light max-w-lg mx-auto leading-relaxed tracking-wider">
            Looking at the clock at 2:30 AM, saying <span className="text-zinc-200 italic">&ldquo;bas paanch minute aur&rdquo;</span>, and laughing at things nobody else would ever understand.
          </p>
        </motion.div>

        {/* Simulated Midnight Chat Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-[#090e1f]/80 border border-blue-500/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col gap-4 text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-blue-400/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-soft/20 border border-rose-soft/30 flex items-center justify-center font-serif text-rose-soft font-semibold">
                S
              </div>
              <div>
                <div className="text-sm font-medium text-cream flex items-center gap-1.5">
                  <span>Sakshi ❤️</span>
                  <Stars className="w-3 h-3 text-gold-soft" />
                </div>
                <div className="text-[10px] text-emerald-400 font-sans flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>online in our little universe</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-sans text-zinc-500">
              <Clock className="w-3 h-3" />
              <span>02:47 AM</span>
            </div>
          </div>

          {/* Incoming Message from Sakshi */}
          <div className="flex flex-col items-start gap-1 max-w-[85%]">
            <div className="p-3.5 rounded-2xl rounded-tl-sm bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
              So jao na Aditya, kal subah jaldi uthna hai... Par tumhara mann nahi hai na abhi? 🙈
            </div>
            <span className="text-[9px] text-zinc-500 px-1">02:48 AM</span>
          </div>

          {/* Outgoing Message from Aditya */}
          <div className="flex flex-col items-end gap-1 max-w-[85%] self-end">
            <div className="p-3.5 rounded-2xl rounded-tr-sm bg-rose-soft/25 border border-rose-soft/40 text-xs sm:text-sm text-cream leading-relaxed font-sans">
              Bilkul nahi. Pure din mein sirf yahi waqt toh hota hai jo sirf hamara hota hai. 💖
            </div>
            <div className="flex items-center gap-1 text-[9px] text-blue-300/60 px-1">
              <span>02:49 AM</span>
              <CheckCheck className="w-3 h-3 text-blue-400" />
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <button
            onClick={() => setShowSecretNote(!showSecretNote)}
            className="mt-2 w-full py-2.5 px-4 rounded-xl bg-blue-950/60 hover:bg-blue-900/50 border border-blue-400/30 text-xs font-sans text-blue-200 tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-soft" />
            <span>{showSecretNote ? "Hide midnight thought" : "Read my midnight thought for you ✨"}</span>
          </button>

          {/* Secret Note Reveal */}
          <AnimatePresence>
            {showSecretNote && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-purple-950/60 border border-blue-300/30 text-xs font-serif italic text-cream leading-relaxed mt-1">
                  &ldquo;If I had to stay up all night just to hear you smile through the phone, Sakshi, I would do it every single time without a second thought.&rdquo;
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Poetic Under-text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif italic text-base sm:text-lg text-zinc-300 font-light max-w-lg leading-relaxed"
        >
          &ldquo;And honestly... I never wanted those calls to end. Because in those quiet hours, the whole world was asleep, and you were my entire universe.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
