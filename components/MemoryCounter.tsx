"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface CounterItemProps {
  label: string;
  finalSymbol: string;
  glowColor: string;
  delay: number;
}

function CounterItem({ label, finalSymbol, glowColor, delay }: CounterItemProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [inView, setInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.2 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = 99;
    const duration = 1200; // ms
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 3;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(finalSymbol);
      } else {
        setDisplayValue(start.toString());
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [inView, finalSymbol]);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="glass rounded-3xl p-8 flex flex-col items-center justify-center min-w-[220px] text-center group border border-white/5"
    >
      {/* Symbol Display */}
      <span
        className={`font-serif text-5xl md:text-7xl font-light mb-4 block transition-all duration-500 select-none ${glowColor} ${
          displayValue === finalSymbol
            ? "scale-105 filter drop-shadow-[0_0_15px_rgba(214,60,94,0.3)] font-semibold"
            : ""
        }`}
      >
        {displayValue}
      </span>

      {/* Label */}
      <span className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
        {label}
      </span>
    </motion.div>
  );
}

export default function MemoryCounter() {
  return (
    <section className="relative w-full py-16 bg-midnight overflow-hidden px-6">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-wrap justify-center gap-8 items-center">
        <CounterItem
          label="Memories"
          finalSymbol="∞"
          glowColor="text-gold"
          delay={0}
        />
        <CounterItem
          label="Smiles"
          finalSymbol="❤️"
          glowColor="text-rose animate-pulse"
          delay={0.15}
        />
        <CounterItem
          label="Moments to Come"
          finalSymbol="∞"
          glowColor="text-rose-light"
          delay={0.3}
        />
      </div>
    </section>
  );
}
