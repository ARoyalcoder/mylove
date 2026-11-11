"use client";

import { motion } from "framer-motion";
import { BookMemory } from "@/lib/love-book/bookData";
import { formatPageNumber, getDefaultQuote, getMoodEmoji } from "@/lib/love-book/memoryToPage";
import { Heart, MapPin, Calendar } from "lucide-react";

// ──────────────────────────────────────────────────
// PHOTO MEMORY PAGE
// ──────────────────────────────────────────────────
export function PhotoMemoryPage({ memory }: { memory: BookMemory }) {
  const quote = getDefaultQuote(memory);
  const moodEmoji = getMoodEmoji(memory.aiMood);

  return (
    <div className="w-full h-full flex flex-col" style={{ fontFamily: "var(--font-cormorant), serif" }}>
      {/* Page header */}
      <PageHeader memory={memory} />

      {/* Photo */}
      <div className="flex-1 relative overflow-hidden mx-4 rounded-md" style={{ minHeight: 0 }}>
        {memory.mediaUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={memory.mediaUrl}
            alt={memory.title}
            className="w-full h-full object-cover"
            style={{ borderRadius: "4px" }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(248,200,220,0.15)" }}
          >
            <span style={{ fontSize: "4rem" }}>📷</span>
          </div>
        )}
        {/* Film-grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Quote */}
      <div className="px-4 py-3 text-center">
        <p
          className="italic"
          style={{
            fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)",
            color: "#8B3A5A",
            lineHeight: 1.6,
          }}
        >
          {moodEmoji} &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Description */}
      {memory.description && (
        <div className="px-5 pb-2">
          <p
            style={{
              fontSize: "clamp(0.65rem, 2vw, 0.78rem)",
              color: "#6B4155",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            {memory.description}
          </p>
        </div>
      )}

      <PageFooter memory={memory} />
    </div>
  );
}

// ──────────────────────────────────────────────────
// VIDEO MEMORY PAGE
// ──────────────────────────────────────────────────
export function VideoMemoryPage({ memory }: { memory: BookMemory }) {
  const quote = getDefaultQuote(memory);

  return (
    <div className="w-full h-full flex flex-col" style={{ fontFamily: "var(--font-cormorant), serif" }}>
      <PageHeader memory={memory} />

      <div className="flex-1 relative overflow-hidden mx-4 rounded-md" style={{ minHeight: 0 }}>
        {memory.mediaUrl ? (
          <video
            src={memory.mediaUrl}
            className="w-full h-full object-cover"
            controls
            playsInline
            style={{ borderRadius: "4px" }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(248,200,220,0.15)" }}
          >
            <span style={{ fontSize: "4rem" }}>🎥</span>
          </div>
        )}
      </div>

      <div className="px-4 py-3 text-center">
        <p
          className="italic"
          style={{
            fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)",
            color: "#8B3A5A",
            lineHeight: 1.6,
          }}
        >
          🎬 &ldquo;{quote}&rdquo;
        </p>
      </div>

      {memory.description && (
        <div className="px-5 pb-2">
          <p style={{ fontSize: "clamp(0.65rem, 2vw, 0.78rem)", color: "#6B4155", lineHeight: 1.6, fontStyle: "italic" }}>
            {memory.description}
          </p>
        </div>
      )}

      <PageFooter memory={memory} />
    </div>
  );
}

// ──────────────────────────────────────────────────
// TEXT / HEART NOTE PAGE
// ──────────────────────────────────────────────────
export function HeartNotePage({ memory }: { memory: BookMemory }) {
  const quote = getDefaultQuote(memory);

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        fontFamily: "var(--font-cormorant), serif",
        background: "linear-gradient(145deg, #FFF8F5 0%, #FFF0F5 100%)",
      }}
    >
      <PageHeader memory={memory} />

      {/* Parchment-style note body */}
      <div
        className="flex-1 mx-4 my-2 rounded-md flex flex-col items-center justify-center p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFFBF8 0%, #FFF0F0 100%)",
          border: "1px solid rgba(216,181,106,0.3)",
          boxShadow: "inset 0 0 20px rgba(184,79,114,0.05)",
        }}
      >
        {/* Decorative lines (like notebook paper) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              height: "1px",
              background: "rgba(216,181,106,0.12)",
              top: `${12 + i * 12}%`,
            }}
          />
        ))}

        {/* Heart ornament */}
        <Heart size={24} fill="rgba(184,79,114,0.3)" stroke="rgba(184,79,114,0.5)" className="mb-4" />

        {/* Note text */}
        <p
          className="relative text-center italic leading-relaxed"
          style={{
            fontFamily: "var(--font-alex-brush), cursive",
            fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
            color: "#5A1830",
            lineHeight: 1.8,
            maxWidth: "85%",
          }}
        >
          {memory.description || memory.title}
        </p>

        {/* Author */}
        <p
          className="mt-4 text-center"
          style={{
            fontSize: "0.7rem",
            color: "#B84F72",
            letterSpacing: "0.12em",
          }}
        >
          — {memory.author}
        </p>
      </div>

      {/* AI Quote */}
      <div className="px-4 py-2 text-center">
        <p
          className="italic"
          style={{ fontSize: "clamp(0.65rem, 2vw, 0.78rem)", color: "#8B3A5A", lineHeight: 1.6 }}
        >
          💌 &ldquo;{quote}&rdquo;
        </p>
      </div>

      <PageFooter memory={memory} />
    </div>
  );
}

// ──────────────────────────────────────────────────
// DELETED TOMBSTONE PAGE
// ──────────────────────────────────────────────────
export function DeletedPage({ pageNumber }: { pageNumber?: number }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        fontFamily: "var(--font-cormorant), serif",
        background: "linear-gradient(145deg, #FFF8F5 0%, #FFF0F5 100%)",
      }}
    >
      <p style={{ fontSize: "2.5rem", opacity: 0.3 }}>📄</p>
      {pageNumber && (
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#B84F72", opacity: 0.5 }}>
          PAGE {formatPageNumber(pageNumber)}
        </p>
      )}
      <p
        className="italic text-center"
        style={{ fontSize: "0.9rem", color: "#8B3A5A", opacity: 0.5, maxWidth: "70%" }}
      >
        A page that once held a memory...
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────────
// BLANK FUTURE PAGE
// ──────────────────────────────────────────────────
export function BlankFuturePage({ futureIndex }: { futureIndex: number }) {
  const prompts = [
    "This page is waiting for a memory...",
    "Something beautiful will live here soon.",
    "A story not yet told.",
  ];
  const prompt = prompts[futureIndex % prompts.length];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4"
      style={{
        fontFamily: "var(--font-cormorant), serif",
        background: "linear-gradient(145deg, #FFF8F5 0%, #FFF0F5 100%)",
      }}
    >
      {/* Decorative ruled lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="w-3/4"
          style={{
            height: "1px",
            background: i === 11 ? "transparent" : "rgba(216,181,106,0.2)",
          }}
        />
      ))}

      {/* Center message */}
      <div className="absolute flex flex-col items-center gap-2">
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Heart size={28} fill="rgba(248,200,220,0.5)" stroke="rgba(184,79,114,0.4)" />
        </motion.div>
        <p
          className="italic text-center"
          style={{
            fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)",
            color: "#B84F72",
            opacity: 0.6,
            maxWidth: "70%",
            lineHeight: 1.7,
          }}
        >
          {prompt}
        </p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// SHARED: Page Header
// ──────────────────────────────────────────────────
function PageHeader({ memory }: { memory: BookMemory }) {
  return (
    <div
      className="flex items-center justify-between px-5 pt-4 pb-2"
      style={{ borderBottom: "1px solid rgba(216,181,106,0.2)" }}
    >
      <span
        style={{
          fontSize: "clamp(0.55rem, 1.8vw, 0.7rem)",
          letterSpacing: "0.12em",
          color: "#B84F72",
          opacity: 0.7,
        }}
      >
        {memory.pageNumber ? formatPageNumber(memory.pageNumber, "label").toUpperCase() : ""}
      </span>
      <h3
        className="text-center flex-1 px-2"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(0.75rem, 2.8vw, 0.95rem)",
          color: "#5A1830",
          fontWeight: 600,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {memory.aiTitle || memory.title}
      </h3>
      <Heart
        size={12}
        fill={memory.isFavorite ? "#B84F72" : "transparent"}
        stroke="#B84F72"
        style={{ opacity: memory.isFavorite ? 1 : 0.4, flexShrink: 0 }}
      />
    </div>
  );
}

// ──────────────────────────────────────────────────
// SHARED: Page Footer
// ──────────────────────────────────────────────────
function PageFooter({ memory }: { memory: BookMemory }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-2 mt-auto"
      style={{ borderTop: "1px solid rgba(216,181,106,0.2)" }}
    >
      <div className="flex items-center gap-1">
        <Calendar size={9} style={{ color: "#B84F72", opacity: 0.6 }} />
        <span style={{ fontSize: "0.6rem", color: "#8B3A5A", opacity: 0.7 }}>{memory.date}</span>
      </div>
      {memory.location && (
        <div className="flex items-center gap-1">
          <MapPin size={9} style={{ color: "#B84F72", opacity: 0.6 }} />
          <span style={{ fontSize: "0.6rem", color: "#8B3A5A", opacity: 0.7 }}>{memory.location}</span>
        </div>
      )}
      <span style={{ fontSize: "0.6rem", color: "#B84F72", opacity: 0.6 }}>
        {memory.author}
      </span>
    </div>
  );
}
