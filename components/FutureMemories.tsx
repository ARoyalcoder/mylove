"use client";

import { motion } from "framer-motion";
import { Sparkles, CalendarHeart, Bookmark } from "lucide-react";
import { futureChapters } from "@/config/couple";

const icons = [
  <Sparkles key="sparkles" className="w-5 h-5" />,
  <CalendarHeart key="heart" className="w-5 h-5" />,
  <Bookmark key="bookmark" className="w-5 h-5" />,
];

export default function FutureMemories() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="relative w-full py-24 bg-[#050507] overflow-hidden px-6">
      {/* Background ambient glow */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-wine-dark/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center gap-16">
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl">
          <span className="text-rose tracking-[0.25em] text-[10px] md:text-xs uppercase font-medium">
            To be continued
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-zinc-100 mt-1">
            The Story Isn&apos;t Finished...
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-rose to-transparent mt-4 mb-2" />
          <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed tracking-wide">
            These are only the memories we&apos;ve collected so far. There are still countless ordinary days waiting to become beautiful memories.
          </p>
        </div>

        {/* Future Chapters Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {futureChapters.map((chapter, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass glass-wine-hover rounded-3xl p-8 relative flex flex-col items-start gap-4 transition-all duration-300 group"
            >
              {/* Floating glow indicator */}
              <div className="absolute top-0 right-10 w-8 h-[1px] bg-rose-light/40 group-hover:w-16 transition-all duration-500" />

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-wine/30 flex items-center justify-center text-rose-light group-hover:text-rose group-hover:bg-wine/50 transition-colors duration-300">
                {icons[index % icons.length]}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg text-zinc-200 font-medium group-hover:text-rose-light transition-colors duration-300">
                {chapter.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                {chapter.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
