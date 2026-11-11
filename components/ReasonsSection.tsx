"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Smile, Eye, MessageCircle, Volume2, Compass, X } from "lucide-react";

interface DiscoveryItem {
  number: string;
  tag: string;
  title: string;
  hindiTitle: string;
  description: string;
  deepSecret: string;
  icon: typeof Sparkles;
}

const discoveries: DiscoveryItem[] = [
  {
    number: "01",
    tag: "A Small Wonder",
    title: "Your Smile",
    hindiTitle: "Tumhari Wo Muskaan",
    description:
      "The way you smile without even realizing someone is watching. It doesn't ask for attention, yet it completely steals mine every single time.",
    deepSecret:
      "I don't think you realize how much I notice your smile. Even when you're looking down at your cup of tea or laughing at your own joke, you illuminate everything around you.",
    icon: Smile,
  },
  {
    number: "02",
    tag: "Silent Details",
    title: "Your Little Habits",
    hindiTitle: "Tumhari Chhoti Chhoti Adatein",
    description:
      "It's the little habits you probably don't even know I remember. The gentle tilt of your head when you concentrate and the way you adjust your hair.",
    deepSecret:
      "You do a thousand small things every day that you consider normal, but to me they are the most endearing habits in the universe.",
    icon: Eye,
  },
  {
    number: "03",
    tag: "Pure Joy",
    title: "Your Laugh",
    hindiTitle: "Tumhari Khilkhilati Hansi",
    description:
      "The sound that instantly turns any ordinary room into my favorite place. It's spontaneous, genuine, and impossibly infectious.",
    deepSecret:
      "Whenever you laugh until your eyes crinkle, my day feels entirely worthwhile. I promise to keep giving you reasons to laugh like that.",
    icon: Sparkles,
  },
  {
    number: "04",
    tag: "Gentle Soul",
    title: "Your Kindness",
    hindiTitle: "Tumhari Narmi",
    description:
      "The soft, genuine way you care for people and things around you. It makes the world feel like a much gentler, warmer place.",
    deepSecret:
      "Your heart has a softness that is rare in this world. Being near you inspires me to be a gentler, more compassionate human being.",
    icon: Heart,
  },
  {
    number: "05",
    tag: "Sweet Solace",
    title: "Your Random Thoughts",
    hindiTitle: "Tumhari Ajeeb Baatein",
    description:
      "The unexpected observations and hilarious questions that pop into your mind in the middle of a quiet afternoon.",
    deepSecret:
      "I love hearing how your mind works. Every random theory, silly story, and sudden question makes me fall for your intellect and innocence.",
    icon: MessageCircle,
  },
  {
    number: "06",
    tag: "Safe Harbor",
    title: "The Way You Care",
    hindiTitle: "Tumhara Fikr Karna",
    description:
      "Being loved by you feels like exhaling after holding my breath all day. No pretense, no effort. Just you, me, and pure comfort.",
    deepSecret:
      "The quiet check-ins, asking if I ate, making sure I rested. The tenderness with which you care for me is the greatest gift of my life.",
    icon: Compass,
  },
];

export default function ReasonsSection() {
  const [openedCard, setOpenedCard] = useState<DiscoveryItem | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="discovering-her"
      className="relative w-full py-32 bg-[#0B0307] overflow-hidden px-6 film-grain select-none"
    >
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[550px] h-[550px] bg-baby-pink/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-deep-rose/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center gap-16">
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
            <span>Chapter 03 • I Keep Discovering You</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-warm-cream leading-tight"
          >
            Every single day, <br />
            <span className="italic text-baby-pink font-normal text-shimmer">
              I learn something new to love.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-zinc-300 font-light max-w-lg leading-relaxed tracking-wider"
          >
            I don&apos;t think you realize how much I notice the little things about you, Sakshi. Tap any card to reveal what I see.
          </motion.p>
        </div>

        {/* Discovery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {discoveries.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                onClick={() => setOpenedCard(item)}
                className="group relative rounded-3xl p-8 bg-zinc-950/70 border border-baby-pink/20 backdrop-blur-md overflow-hidden flex flex-col justify-between gap-6 transition-all duration-500 hover:border-baby-pink/50 hover:shadow-[0_15px_40px_rgba(248,200,220,0.25)] cursor-pointer"
              >
                {/* Top Row: Number & Icon */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="font-serif text-2xl font-light text-champagne-gold tracking-wider">
                    {item.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-deep-rose/30 border border-baby-pink/30 flex items-center justify-center text-baby-pink group-hover:scale-110 group-hover:border-baby-pink group-hover:text-soft-blush transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Middle Content */}
                <div className="relative z-10 space-y-2">
                  <div className="text-[10px] uppercase font-sans tracking-[0.25em] text-baby-pink font-medium">
                    {item.tag}
                  </div>
                  <h3 className="font-serif text-2xl text-warm-cream font-medium group-hover:text-baby-pink transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="text-xs font-serif italic text-champagne-gold/90">
                    {item.hindiTitle}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Indicator */}
                <div className="relative z-10 pt-3 border-t border-baby-pink/15 flex items-center justify-between text-[11px] text-zinc-400 font-sans tracking-widest uppercase">
                  <span>Tap to open note</span>
                  <Heart className="w-3.5 h-3.5 text-deep-rose group-hover:text-baby-pink group-hover:scale-125 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Expanded Discovery Modal */}
      <AnimatePresence>
        {openedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenedCard(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#250D18] via-[#1A0510] to-[#0B0307] border border-baby-pink/40 shadow-[0_25px_60px_rgba(248,200,220,0.35)] text-left space-y-4"
            >
              <button
                onClick={() => setOpenedCard(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase font-sans tracking-[0.25em] text-champagne-gold">
                <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
                <span>What I Notice About You</span>
              </div>

              <h3 className="font-serif text-3xl text-warm-cream font-light">
                {openedCard.title}
              </h3>
              <div className="font-serif italic text-sm text-baby-pink">
                {openedCard.hindiTitle}
              </div>

              <div className="py-2">
                <p className="font-serif italic text-lg sm:text-xl text-warm-cream/95 leading-relaxed">
                  &ldquo;{openedCard.deepSecret}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-baby-pink/20 flex items-center justify-between text-xs font-sans tracking-widest text-zinc-400 uppercase">
                <span>Aditya&apos;s Quiet Observation</span>
                <Heart className="w-4 h-4 text-baby-pink fill-baby-pink" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
