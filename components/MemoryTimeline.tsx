"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { timelineEvents } from "@/config/couple";

export default function MemoryTimeline() {
  return (
    <section id="story" className="relative w-full py-24 bg-midnight overflow-hidden px-6">
      {/* Background gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-wine-dark/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-burgundy/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center gap-2 mb-20">
          <span className="text-rose tracking-[0.25em] text-[10px] md:text-xs uppercase font-medium">
            Our beautiful timeline
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-zinc-100 mt-1">
            Our Story
          </h2>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-rose to-transparent mt-4" />
        </div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical Timeline Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-rose/40 via-burgundy/30 to-transparent -translate-x-1/2" />

          {/* Events */}
          <div className="space-y-16 md:space-y-24">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline central node marker */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-8 h-8 rounded-full bg-midnight border border-rose flex items-center justify-center shadow-[0_0_12px_rgba(214,60,94,0.4)]"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose fill-rose/20" />
                    </motion.div>
                  </div>

                  {/* Card Section */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      className="glass glass-wine-hover rounded-3xl p-6 md:p-8 flex flex-col gap-5 relative"
                    >
                      {/* Image container */}
                      <div className="relative w-full h-[200px] md:h-[260px] rounded-2xl overflow-hidden group">
                        {/* NOTE FOR DEVELOPERS: You can swap image paths in config/couple.ts and place your photos under public/memories/ */}
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-w-768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority={index === 0}
                        />
                        {/* Top-left Chapter bubble */}
                        <div className="absolute top-4 left-4 bg-midnight/80 backdrop-blur-md px-3 py-1 rounded-full border border-rose-dark/20">
                          <span className="text-[10px] uppercase tracking-widest text-rose-light font-medium">
                            {event.chapter}
                          </span>
                        </div>
                      </div>

                      {/* Header/Date info */}
                      <div className="flex flex-col gap-1">
                        <span className="text-rose-light text-xs tracking-wider font-semibold uppercase">
                          {event.date}
                        </span>
                        <h3 className="font-serif text-xl md:text-2xl text-zinc-100 font-semibold">
                          {event.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for layout mapping on Desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
