"use client";

import { motion } from "framer-motion";
import { LoveBookChapter } from "@/lib/love-book/bookData";

interface BookChapterProps {
  chapter: LoveBookChapter;
}

export default function BookChapter({ chapter }: BookChapterProps) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #2A0D1A 0%, #5A1830 60%, #8B2252 100%)",
        fontFamily: "var(--font-cormorant), serif",
      }}
    >
      {/* Atmospheric artwork background */}
      {chapter.artworkUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chapter.artworkUrl}
            alt={chapter.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.18, mixBlendMode: "luminosity" }}
          />
        </>
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(42,13,26,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center">
        {/* Chapter number ornament */}
        <div className="flex items-center gap-3">
          <div className="h-px w-10" style={{ background: "rgba(216,181,106,0.5)" }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              border: "1.5px solid rgba(216,181,106,0.6)",
              color: "rgba(216,181,106,0.9)",
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
            }}
          >
            {String(chapter.number).padStart(2, "0")}
          </motion.div>
          <div className="h-px w-10" style={{ background: "rgba(216,181,106,0.5)" }} />
        </div>

        {/* Chapter title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(1.1rem, 4vw, 1.6rem)",
            color: "#FFF8F5",
            letterSpacing: "0.05em",
            lineHeight: 1.3,
          }}
        >
          {chapter.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="italic"
          style={{
            fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)",
            color: "rgba(255,221,232,0.7)",
            lineHeight: 1.6,
          }}
        >
          {chapter.subtitle}
        </motion.p>

        {/* Page range */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(216,181,106,0.6)",
            marginTop: "0.5rem",
          }}
        >
          PAGES {String(chapter.startPage).padStart(3, "0")} — {String(chapter.endPage).padStart(3, "0")}
        </motion.p>

        {/* Memories count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex items-center gap-2 mt-1"
        >
          <span style={{ fontSize: "0.6rem", color: "rgba(248,200,220,0.5)", letterSpacing: "0.12em" }}>
            {chapter.memories.length} {chapter.memories.length === 1 ? "MEMORY" : "MEMORIES"}
          </span>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ opacity: 0.4 }}
      >
        <div className="h-px w-16" style={{ background: "rgba(216,181,106,0.6)" }} />
        <span style={{ color: "rgba(216,181,106,0.8)", fontSize: "10px" }}>✦</span>
        <div className="h-px w-16" style={{ background: "rgba(216,181,106,0.6)" }} />
      </div>
    </div>
  );
}
