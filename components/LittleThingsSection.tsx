"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircleHeart, Flame } from "lucide-react";

interface LittleThing {
  line: string;
  hindi: string;
  detail: string;
}

const littleThings: LittleThing[] = [
  {
    line: "The random conversations.",
    hindi: "Bina kisi wajah ke ghanton baatein karna.",
    detail: "Talking about everything and nothing at all, losing track of the clock.",
  },
  {
    line: "The unexpected smiles.",
    hindi: "Achanak se aane wali wo muskaan.",
    detail: "Catching you smiling across the screen or room for no particular reason.",
  },
  {
    line: "The silly inside jokes.",
    hindi: "Sirf hum dono ke wo ajeeb mazaaq.",
    detail: "Things that wouldn't make sense to anyone else in the whole world.",
  },
  {
    line: "The late-night whispers.",
    hindi: "Neend mein doobi hui dheemi aawazein.",
    detail: "When neither of us wanted to say 'goodnight' first.",
  },
  {
    line: "The moments that lasted five seconds...",
    hindi: "Wo chhota sa lamha jo poora din zehen mein raha.",
    detail: "A glance, a laugh, a gentle word — that stayed in my head all day long.",
  },
];

export default function LittleThingsSection() {
  return (
    <section
      id="little-things"
      className="relative w-full py-32 bg-[#080206] overflow-hidden px-6 film-grain select-none"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-wine/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-rose-soft/30 text-xs uppercase tracking-[0.25em] text-blush font-sans mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-soft" />
          <span>The Little Things</span>
        </motion.div>

        {/* Big Editorial Quote Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-center text-cream font-light leading-tight mb-4"
        >
          It is never <br />
          <span className="italic text-rose-soft font-normal text-shimmer">
            the big things.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-sans text-xs sm:text-sm text-zinc-400 font-light text-center max-w-md leading-relaxed tracking-wider mb-16"
        >
          It was always the small, quiet, in-between moments that made me fall completely for you, Sakshi.
        </motion.p>

        {/* Staggered Vertical Stream of Phrases */}
        <div className="w-full flex flex-col gap-6 sm:gap-8">
          {littleThings.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className={`flex flex-col ${
                  isEven ? "items-start text-left sm:pr-12" : "items-end text-right sm:pl-12"
                }`}
              >
                <div className="group relative p-6 sm:p-8 rounded-3xl bg-zinc-950/60 border border-rose-soft/15 backdrop-blur-md hover:border-rose-soft/40 hover:bg-zinc-950/80 transition-all duration-400 max-w-xl w-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(169,30,69,0.18)]">
                  {/* Subtle top indicator */}
                  <div
                    className={`flex items-center gap-2 mb-2 text-[10px] uppercase font-sans tracking-[0.2em] text-gold-soft/80 ${
                      isEven ? "justify-start" : "justify-end"
                    }`}
                  >
                    <MessageCircleHeart className="w-3.5 h-3.5 text-rose-soft" />
                    <span>Memory Note #{index + 1}</span>
                  </div>

                  {/* Main Line */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-cream font-normal group-hover:text-rose-soft transition-colors duration-300">
                    {item.line}
                  </h3>

                  {/* Hindi translation */}
                  <div className="font-serif italic text-xs sm:text-sm text-blush/80 mt-1">
                    &ldquo;{item.hindi}&rdquo;
                  </div>

                  {/* Detail */}
                  <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light mt-3 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Warm Thought */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 p-8 sm:p-10 rounded-3xl glass-wine border border-rose-soft/25 text-center max-w-xl shadow-[0_15px_40px_rgba(66,8,21,0.4)]"
        >
          <Flame className="w-6 h-6 text-gold-soft mx-auto mb-3 animate-pulse" />
          <p className="font-serif text-xl sm:text-2xl text-cream font-light italic leading-relaxed">
            &ldquo;You didn&apos;t just walk into my life. <br className="hidden sm:inline" />
            You quietly made every little corner of it beautiful.&rdquo;
          </p>
          <div className="text-xs uppercase tracking-[0.25em] text-rose-soft font-sans mt-4">
            Forever Grateful For You ❤️
          </div>
        </motion.div>
      </div>
    </section>
  );
}
