"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart } from "lucide-react";

interface BookCoverProps {
  totalMemories: number;
  totalPages: number;
  onOpen: () => void;
}

export default function BookCover({ totalMemories, totalPages, onOpen }: BookCoverProps) {
  return (
    <motion.div
      className="relative w-full flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Book wrapper */}
      <div className="relative select-none">
        {/* Spine shadow layers */}
        <div
          className="absolute left-0 top-2 w-6 h-full rounded-l-sm"
          style={{
            background: "linear-gradient(to right, #8B3A5A, #B84F72)",
            boxShadow: "-4px 0 12px rgba(0,0,0,0.4)",
            zIndex: 1,
          }}
        />
        {/* Page stack effect */}
        {[4, 3, 2, 1].map((i) => (
          <div
            key={i}
            className="absolute top-0 left-0 w-full h-full rounded-r-lg"
            style={{
              background: "#FFF8F5",
              transform: `translateX(${i * 1.5}px)`,
              zIndex: i,
              boxShadow: "1px 0 3px rgba(0,0,0,0.08)",
            }}
          />
        ))}

        {/* Main cover */}
        <motion.div
          className="relative rounded-r-lg overflow-hidden cursor-pointer"
          style={{
            width: "min(340px, 85vw)",
            height: "min(480px, 70vh)",
            background: "linear-gradient(145deg, #B84F72 0%, #8B2252 40%, #5A1830 100%)",
            zIndex: 10,
            boxShadow: "6px 8px 32px rgba(90,24,48,0.5), 2px 2px 8px rgba(0,0,0,0.3)",
          }}
          whileHover={{ scale: 1.02, rotateY: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpen}
        >
          {/* Gold border */}
          <div
            className="absolute inset-3 rounded-r-md pointer-events-none"
            style={{ border: "1.5px solid rgba(216,181,106,0.5)" }}
          />
          <div
            className="absolute inset-5 rounded-r-md pointer-events-none"
            style={{ border: "0.5px solid rgba(216,181,106,0.3)" }}
          />

          {/* Texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.02) 2px,rgba(255,255,255,0.02) 4px)",
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full px-8 text-center gap-4">
            {/* Decorative top ornament */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-12" style={{ background: "rgba(216,181,106,0.6)" }} />
              <span style={{ color: "rgba(216,181,106,0.8)", fontSize: "10px" }}>✦</span>
              <div className="h-px w-12" style={{ background: "rgba(216,181,106,0.6)" }} />
            </div>

            {/* Title */}
            <h1
              className="font-serif"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                color: "#FFF8F5",
                letterSpacing: "0.05em",
                lineHeight: 1.2,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              Our Little
              <br />
              Universe
            </h1>

            {/* Heart */}
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            >
              <Heart
                size={36}
                fill="rgba(248,200,220,0.9)"
                stroke="rgba(248,200,220,0.6)"
              />
            </motion.div>

            {/* Couple names */}
            <p
              style={{
                fontFamily: "var(--font-alex-brush), cursive",
                fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                color: "rgba(248,200,220,0.95)",
                letterSpacing: "0.04em",
              }}
            >
              Sakshi × Aditya
            </p>

            {/* Tagline */}
            <p
              className="italic"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)",
                color: "rgba(255,221,232,0.7)",
                lineHeight: 1.5,
              }}
            >
              &ldquo;A story we&rsquo;re still writing...&rdquo;
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-2">
              <div className="text-center">
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.4rem",
                    color: "rgba(216,181,106,0.9)",
                    fontWeight: 600,
                  }}
                >
                  {totalMemories}
                </p>
                <p
                  style={{ fontSize: "0.6rem", color: "rgba(255,221,232,0.6)", letterSpacing: "0.1em" }}
                >
                  MEMORIES
                </p>
              </div>
              <div
                className="self-stretch"
                style={{ width: "1px", background: "rgba(216,181,106,0.3)" }}
              />
              <div className="text-center">
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.4rem",
                    color: "rgba(216,181,106,0.9)",
                    fontWeight: 600,
                  }}
                >
                  {totalPages}
                </p>
                <p
                  style={{ fontSize: "0.6rem", color: "rgba(255,221,232,0.6)", letterSpacing: "0.1em" }}
                >
                  PAGES
                </p>
              </div>
            </div>

            {/* Decorative bottom ornament */}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-px w-12" style={{ background: "rgba(216,181,106,0.6)" }} />
              <span style={{ color: "rgba(216,181,106,0.8)", fontSize: "10px" }}>✦</span>
              <div className="h-px w-12" style={{ background: "rgba(216,181,106,0.6)" }} />
            </div>

            {/* Open CTA */}
            <motion.button
              className="mt-2 flex items-center gap-2 px-6 py-2 rounded-full"
              style={{
                background: "rgba(248,200,220,0.15)",
                border: "1px solid rgba(248,200,220,0.4)",
                color: "#FFF8F5",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
              }}
              whileHover={{ background: "rgba(248,200,220,0.25)" }}
            >
              <BookOpen size={14} />
              OPEN OUR STORY
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(184,79,114,0.25) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 0,
        }}
      />
    </motion.div>
  );
}
