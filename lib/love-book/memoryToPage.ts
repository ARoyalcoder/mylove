// ============================================================
// Love Book — Memory → Page Descriptor
// ============================================================

import { BookMemory } from "./bookData";

export type PageType =
  | "cover"
  | "opening"
  | "table-of-contents"
  | "chapter-opener"
  | "photo-memory"
  | "video-memory"
  | "text-memory"
  | "blank-future"
  | "deleted-tombstone";

export interface PageDescriptor {
  pageType: PageType;
  pageNumber?: number;
  memory?: BookMemory;
  chapterNumber?: number;
  chapterTitle?: string;
  chapterSubtitle?: string;
  chapterArtwork?: string;
}

/**
 * Given a memory, returns the correct PageType based on its content.
 */
export function getPageType(memory: BookMemory): PageType {
  if (memory.isDeleted) return "deleted-tombstone";
  if (memory.type === "photo") return "photo-memory";
  if (memory.type === "video") return "video-memory";
  return "text-memory";
}

/**
 * Returns a formatted page number label — "Page 001", "001", etc.
 */
export function formatPageNumber(n: number, style: "label" | "short" = "short"): string {
  const padded = String(n).padStart(3, "0");
  return style === "label" ? `Page ${padded}` : padded;
}

/**
 * Returns a romantic mood label from aiMood or a default
 */
export function getMoodEmoji(mood?: string): string {
  const map: Record<string, string> = {
    golden: "🌅",
    tender: "🌸",
    playful: "🦋",
    midnight: "🌙",
    dreamy: "✨",
    warm: "☀️",
    nostalgic: "📷",
    electric: "⚡",
    peaceful: "🕊️",
    joyful: "💛",
  };
  if (!mood) return "💖";
  return map[mood.toLowerCase()] ?? "💖";
}

/**
 * Returns a default romantic quote for memories that don't have an aiQuote yet.
 */
export function getDefaultQuote(memory: BookMemory): string {
  const defaults = [
    "Some moments are too beautiful for words.",
    "In every ordinary day, we find extraordinary love.",
    "This memory lives in our hearts forever.",
    "Every story has a beginning — this was one of ours.",
    "The best moments are the ones we almost didn't capture.",
    "Love is made of little things, just like this.",
    "A page written in the language of the heart.",
    "We don't take pictures to prove it happened. We take them to feel it again.",
  ];
  const index = (memory.pageNumber ?? 1) % defaults.length;
  return memory.aiQuote || defaults[index];
}
