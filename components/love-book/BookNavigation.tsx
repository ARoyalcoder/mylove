"use client";

import { motion } from "framer-motion";
import { BookMemory } from "@/lib/love-book/bookData";
import { ChevronLeft, ChevronRight, X, Grid, BookOpen, Search, Heart } from "lucide-react";

interface BookNavigationProps {
  currentPage: number;
  totalBookPages: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
  mode: "reading" | "overview";
  onToggleMode: () => void;
  onPageSelect?: (page: number) => void;
  allMemories?: BookMemory[];
}

export default function BookNavigation({
  currentPage,
  totalBookPages,
  onPrev,
  onNext,
  onClose,
  mode,
  onToggleMode,
}: BookNavigationProps) {
  const progress = totalBookPages > 0 ? (currentPage / totalBookPages) * 100 : 0;

  return (
    <>
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          background: "linear-gradient(to bottom, rgba(42,13,26,0.9) 0%, transparent 100%)",
        }}
      >
        {/* Book title */}
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.8rem",
            color: "rgba(255,221,232,0.8)",
            letterSpacing: "0.08em",
          }}
        >
          Our Little Universe
        </span>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <motion.button
            className="p-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
            whileHover={{ background: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.92 }}
            onClick={onToggleMode}
            title={mode === "reading" ? "Overview" : "Reading mode"}
          >
            {mode === "reading" ? (
              <Grid size={14} style={{ color: "rgba(255,221,232,0.8)" }} />
            ) : (
              <BookOpen size={14} style={{ color: "rgba(255,221,232,0.8)" }} />
            )}
          </motion.button>

          <motion.button
            className="p-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
            whileHover={{ background: "rgba(184,79,114,0.3)" }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            title="Close book"
          >
            <X size={14} style={{ color: "rgba(255,221,232,0.8)" }} />
          </motion.button>
        </div>
      </div>

      {/* Bottom navigation */}
      {mode === "reading" && (
        <div
          className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-3 pt-8"
          style={{
            background:
              "linear-gradient(to top, rgba(42,13,26,0.85) 0%, transparent 100%)",
          }}
        >
          {/* Progress bar */}
          <div
            className="w-1/2 h-0.5 rounded-full mb-3 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(216,181,106,0.7)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Prev / page label / Next */}
          <div className="flex items-center gap-6">
            <motion.button
              className="p-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                opacity: currentPage <= 1 ? 0.3 : 1,
              }}
              whileHover={{ background: "rgba(255,255,255,0.18)" }}
              whileTap={{ scale: 0.9 }}
              onClick={onPrev}
              disabled={currentPage <= 1}
            >
              <ChevronLeft size={18} style={{ color: "#FFF8F5" }} />
            </motion.button>

            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.75rem",
                color: "rgba(216,181,106,0.8)",
                letterSpacing: "0.15em",
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              {String(currentPage).padStart(3, "0")} / {String(totalBookPages).padStart(3, "0")}
            </span>

            <motion.button
              className="p-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                opacity: currentPage >= totalBookPages ? 0.3 : 1,
              }}
              whileHover={{ background: "rgba(255,255,255,0.18)" }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              disabled={currentPage >= totalBookPages}
            >
              <ChevronRight size={18} style={{ color: "#FFF8F5" }} />
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}

// ──────────────────────────────────────────────────
// OVERVIEW GRID
// ──────────────────────────────────────────────────
interface BookOverviewProps {
  allMemories: BookMemory[];
  onSelectMemory: (pageNumber: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function BookOverview({
  allMemories,
  onSelectMemory,
  searchQuery,
  onSearchChange,
}: BookOverviewProps) {
  const filtered = allMemories.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      m.title.toLowerCase().includes(q) ||
      m.description?.toLowerCase().includes(q) ||
      m.location?.toLowerCase().includes(q) ||
      m.date?.toLowerCase().includes(q) ||
      m.aiMood?.toLowerCase().includes(q) ||
      m.aiTitle?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full h-full flex flex-col" style={{ fontFamily: "var(--font-cormorant), serif" }}>
      {/* Search bar */}
      <div className="px-4 pt-2 pb-3">
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Search size={13} style={{ color: "rgba(255,221,232,0.5)" }} />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,221,232,0.9)",
              fontFamily: "var(--font-cormorant), serif",
            }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((m) => (
            <motion.button
              key={m.id}
              className="relative aspect-square rounded-md overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectMemory(m.pageNumber ?? 1)}
            >
              {m.mediaUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.mediaUrl} alt={m.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ fontSize: "1.5rem" }}>
                    {m.type === "text" ? "💌" : m.type === "video" ? "🎥" : "📷"}
                  </span>
                </div>
              )}
              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-1"
                style={{
                  background: "linear-gradient(to top, rgba(42,13,26,0.8) 0%, transparent 60%)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.5rem",
                    color: "#FFF8F5",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.aiTitle || m.title}
                </p>
                {m.pageNumber && (
                  <p style={{ fontSize: "0.45rem", color: "rgba(216,181,106,0.8)" }}>
                    p.{String(m.pageNumber).padStart(3, "0")}
                  </p>
                )}
              </div>
              {/* Favorite heart */}
              {m.isFavorite && (
                <div className="absolute top-1 right-1">
                  <Heart size={8} fill="#F8C8DC" stroke="none" />
                </div>
              )}
            </motion.button>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center py-12 gap-2">
              <span style={{ fontSize: "2rem", opacity: 0.4 }}>🔍</span>
              <p
                className="italic"
                style={{ fontSize: "0.8rem", color: "rgba(255,221,232,0.5)" }}
              >
                No memories found...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
