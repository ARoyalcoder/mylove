// ============================================================
// Love Book — Type Definitions & Data Interfaces
// ============================================================

export interface BookMemory {
  // Core memory fields (always present)
  id: string;
  title: string;
  date: string;
  location: string;
  type: "photo" | "video" | "text";
  mediaUrl: string;
  description: string;
  author: string;
  createdAt: string;

  // Love Book fields (added when memory is created or backfilled)
  pageNumber?: number;       // Permanent page # (never changes after assignment)
  chapterId?: string;        // e.g., "chapter-1"
  isFavorite?: boolean;      // Bookmark / heart
  isDeleted?: boolean;       // Soft-delete — shows tombstone page
  aiQuote?: string;          // AI-generated romantic quote
  aiTitle?: string;          // AI-generated poetic title override
  aiMood?: string;           // e.g., "golden", "tender", "playful"
  aiSummary?: string;        // Short atmospheric description
  aiTags?: string[];         // e.g., ["sunset", "smile", "first meeting"]
}

export interface LoveBookChapter {
  id: string;                 // "chapter-1", "chapter-2", etc.
  number: number;             // 1, 2, 3 …
  title: string;              // Romantic chapter name
  subtitle: string;           // Short poetic line
  artworkUrl?: string;        // Atmospheric chapter-cover image
  memories: BookMemory[];     // 6–10 memories per chapter
  startPage: number;          // Page number of first memory in chapter
  endPage: number;            // Page number of last memory in chapter
}

export interface LoveBook {
  chapters: LoveBookChapter[];
  totalPages: number;
  totalMemories: number;
  blankPages: number;         // How many "future" blank pages to append
}

// How many memories per chapter
export const CHAPTER_SIZE = 8;

// How many blank future-pages to show at the end
export const BLANK_FUTURE_PAGES = 3;

// Romantic chapter names — cycle if more chapters than entries
export const CHAPTER_NAMES: { title: string; subtitle: string }[] = [
  {
    title: "Chapter I — The Beginning",
    subtitle: "Where it all started to feel like magic...",
  },
  {
    title: "Chapter II — Little Moments",
    subtitle: "The quiet ones that meant everything.",
  },
  {
    title: "Chapter III — Falling Deeper",
    subtitle: "When ordinary days became extraordinary.",
  },
  {
    title: "Chapter IV — Our Secret World",
    subtitle: "A universe of two.",
  },
  {
    title: "Chapter V — Written in the Stars",
    subtitle: "Some things were always meant to be.",
  },
  {
    title: "Chapter VI — Love in Every Corner",
    subtitle: "Even the smallest things carry your name.",
  },
  {
    title: "Chapter VII — The Golden Hours",
    subtitle: "Moments that glitter in memory.",
  },
  {
    title: "Chapter VIII — Still Falling",
    subtitle: "Every day, a little more.",
  },
  {
    title: "Chapter IX — Endlessly",
    subtitle: "A love with no last page.",
  },
  {
    title: "Chapter X — The Story Continues",
    subtitle: "The best chapters are still being written.",
  },
];

// Chapter artwork images (generated, atmospheric — no real people)
export const CHAPTER_ARTWORKS: string[] = [
  "/adventures/adventure_fantasy_map.jpg",
  "/adventures/adventure_memory_room.jpg",
  "/adventures/adventure_midnight_stars.jpg",
  "/adventures/adventure_future_road.jpg",
  "/adventures/hero_pink_sunrise.jpg",
];
