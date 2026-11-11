"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { shayariList } from "@/config/couple";

export default function ShayariSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="shayari" className="relative w-full py-24 bg-midnight overflow-hidden px-6">
      {/* Ambient background blur */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-wine-dark/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center gap-16">
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="text-rose tracking-[0.25em] text-[10px] md:text-xs uppercase font-medium">
            Some words for you
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-zinc-100 mt-1">
            Kuch Alfaaz Tumhare Naam...
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-rose to-transparent mt-4" />
        </div>

        {/* Shayari Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {shayariList.map((shayari, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass-wine glass-wine-hover rounded-3xl p-8 md:p-10 relative flex flex-col justify-between min-h-[220px]"
            >
              {/* Gold Quote Icon decoration */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-10 h-10 text-rose" />
              </div>

              {/* Shayari Text */}
              <p className="font-serif text-lg md:text-xl text-zinc-200 leading-relaxed font-light whitespace-pre-line tracking-wide italic">
                &ldquo;{shayari.text}&rdquo;
              </p>

              {/* Decorative bottom corner border */}
              <div className="flex items-center gap-2 mt-6">
                <div className="w-6 h-[1px] bg-rose/40" />
                <span className="text-[10px] uppercase tracking-widest text-rose-light opacity-80">
                  {`Dil Se #${index + 1}`}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
