"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { generateBook } from "@/lib/love-book/chapterGenerator";
import { BookMemory, LoveBook as LoveBookData, BLANK_FUTURE_PAGES } from "@/lib/love-book/bookData";
import { getPageType } from "@/lib/love-book/memoryToPage";
import BookCover from "./BookCover";
import BookChapter from "./BookChapter";
import BookNavigation, { BookOverview } from "./BookNavigation";
import {
  PhotoMemoryPage,
  VideoMemoryPage,
  HeartNotePage,
  BlankFuturePage,
  DeletedPage,
} from "./MemoryPage";

// ──────────────────────────────────────────────────
// Page Descriptor (navigation unit)
// ──────────────────────────────────────────────────
type PageKind =
  | { kind: "chapter-opener"; chapterIdx: number }
  | { kind: "memory"; memory: BookMemory }
  | { kind: "blank"; blankIndex: number }
  | { kind: "deleted"; pageNumber: number };

interface LoveBookProps {
  /** Pass a new memory here to live-inject it without refresh */
  newMemory?: BookMemory | null;
  /** External trigger to open the book */
  isOpen?: boolean;
  onClose?: () => void;
}

export default function LoveBook({ newMemory, isOpen: externalOpen, onClose }: LoveBookProps) {
  const [memories, setMemories] = useState<BookMemory[]>([]);
  const [book, setBook] = useState<LoveBookData>({ chapters: [], totalPages: 0, totalMemories: 0, blankPages: BLANK_FUTURE_PAGES });
  const [pages, setPages] = useState<PageKind[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [mode, setMode] = useState<"reading" | "overview">("reading");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const prevNewMemory = useRef<string | null>(null);

  // ── Fetch memories ──
  const fetchMemories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/memories");
      const data = await res.json();
      if (data.success) {
        setMemories(data.memories as BookMemory[]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  // ── Live-inject new memory ──
  useEffect(() => {
    if (!newMemory || newMemory.id === prevNewMemory.current) return;
    prevNewMemory.current = newMemory.id;
    setMemories((prev) => {
      const exists = prev.some((m) => m.id === newMemory.id);
      if (exists) return prev;
      return [newMemory, ...prev];
    });
  }, [newMemory]);

  // ── Rebuild book whenever memories change ──
  useEffect(() => {
    const generatedBook = generateBook(memories);
    setBook(generatedBook);

    // Build flat page array: [chapter-opener, ...memories] × chapters + blank pages
    const flat: PageKind[] = [];
    for (const chapter of generatedBook.chapters) {
      flat.push({ kind: "chapter-opener", chapterIdx: chapter.number - 1 });
      for (const m of chapter.memories) {
        if (m.isDeleted) {
          flat.push({ kind: "deleted", pageNumber: m.pageNumber ?? 0 });
        } else {
          flat.push({ kind: "memory", memory: m });
        }
      }
    }
    for (let i = 0; i < BLANK_FUTURE_PAGES; i++) {
      flat.push({ kind: "blank", blankIndex: i });
    }
    setPages(flat);
  }, [memories]);

  // ── External open trigger ──
  useEffect(() => {
    if (externalOpen !== undefined) setIsOpen(externalOpen);
  }, [externalOpen]);

  // ── Keyboard nav ──
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentPageIdx, pages.length]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentPageIdx((p) => Math.min(p + 1, pages.length - 1));
  }, [pages.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentPageIdx((p) => Math.max(p - 1, 0));
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setMode("reading");
    onClose?.();
  };

  const goToMemoryPage = (pageNumber: number) => {
    const idx = pages.findIndex(
      (p) => p.kind === "memory" && p.memory.pageNumber === pageNumber
    );
    if (idx >= 0) {
      setDirection(1);
      setCurrentPageIdx(idx);
      setMode("reading");
    }
  };

  // ── Render a page by kind ──
  const renderPage = (page: PageKind) => {
    if (page.kind === "chapter-opener") {
      return <BookChapter chapter={book.chapters[page.chapterIdx]} />;
    }
    if (page.kind === "deleted") {
      return <DeletedPage pageNumber={page.pageNumber} />;
    }
    if (page.kind === "blank") {
      return <BlankFuturePage futureIndex={page.blankIndex} />;
    }
    const { memory } = page;
    const pt = getPageType(memory);
    if (pt === "photo-memory") return <PhotoMemoryPage memory={memory} />;
    if (pt === "video-memory") return <VideoMemoryPage memory={memory} />;
    return <HeartNotePage memory={memory} />;
  };

  const currentPage = pages[currentPageIdx];
  const totalBookPages = pages.length;

  // ── Page turn animation variants ──
  const pageVariants = {
    enter: (d: number) => ({
      x: d > 0 ? "100%" : "-100%",
      opacity: 0,
      rotateY: d > 0 ? 15 : -15,
    }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (d: number) => ({
      x: d > 0 ? "-30%" : "30%",
      opacity: 0,
      rotateY: d > 0 ? -8 : 8,
    }),
  };

  const flatMemories = pages
    .filter((p): p is { kind: "memory"; memory: BookMemory } => p.kind === "memory")
    .map((p) => p.memory);

  return (
    <>
      {/* ── BOOK COVER (shown outside the modal) ── */}
      {!isOpen && (
        <BookCover
          totalMemories={book.totalMemories}
          totalPages={Math.max(book.totalPages, 1)}
          onOpen={() => setIsOpen(true)}
        />
      )}

      {/* ── BOOK MODAL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(10,3,6,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Book container */}
            <motion.div
              className="relative overflow-hidden"
              style={{
                width: "min(440px, 95vw)",
                height: "min(620px, 90vh)",
                background: "#FFF8F5",
                borderRadius: "4px 12px 12px 4px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6), 6px 0 20px rgba(0,0,0,0.3)",
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Book spine */}
              <div
                className="absolute left-0 top-0 bottom-0 w-5"
                style={{
                  background: "linear-gradient(to right, #5A1830, #B84F72)",
                  zIndex: 20,
                }}
              />

              {/* Loading state */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-30"
                  style={{ background: "rgba(255,248,245,0.8)" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    style={{ width: 28, height: 28, border: "2px solid #B84F72", borderTopColor: "transparent", borderRadius: "50%" }}
                  />
                </div>
              )}

              {/* Reading Mode: Animated page */}
              {mode === "reading" && currentPage && (
                <div className="absolute inset-0 pl-5 overflow-hidden">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={currentPageIdx}
                      custom={direction}
                      variants={pageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 280, damping: 28 },
                        opacity: { duration: 0.2 },
                        rotateY: { duration: 0.4 },
                      }}
                      className="absolute inset-0"
                      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
                    >
                      {renderPage(currentPage)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Overview Mode */}
              {mode === "overview" && (
                <div
                  className="absolute inset-0 pl-5"
                  style={{ background: "linear-gradient(145deg, #2A0D1A 0%, #5A1830 100%)" }}
                >
                  <BookOverview
                    allMemories={flatMemories}
                    onSelectMemory={goToMemoryPage}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                </div>
              )}

              {/* Navigation overlay */}
              <BookNavigation
                currentPage={currentPageIdx + 1}
                totalBookPages={totalBookPages}
                onPrev={goPrev}
                onNext={goNext}
                onClose={handleClose}
                mode={mode}
                onToggleMode={() => setMode((m) => (m === "reading" ? "overview" : "reading"))}
                onPageSelect={goToMemoryPage}
                allMemories={flatMemories}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
