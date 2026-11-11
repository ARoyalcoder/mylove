// ============================================================
// Love Book — Chapter Generator
// Groups memories into chapters and assigns page numbers
// ============================================================

import {
  BookMemory,
  LoveBook,
  LoveBookChapter,
  CHAPTER_NAMES,
  CHAPTER_ARTWORKS,
  CHAPTER_SIZE,
  BLANK_FUTURE_PAGES,
} from "./bookData";

/**
 * Takes an array of raw memories (sorted oldest→newest) and groups them
 * into chapters. Assigns pageNumbers if they are missing (backfill).
 */
export function generateBook(rawMemories: BookMemory[]): LoveBook {
  if (!rawMemories || rawMemories.length === 0) {
    return { chapters: [], totalPages: 0, totalMemories: 0, blankPages: BLANK_FUTURE_PAGES };
  }

  // Sort: oldest first so page 1 is the earliest memory
  const sorted = [...rawMemories].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Assign sequential pageNumbers (backfill if missing)
  let nextPage = 1;
  const withPages: BookMemory[] = sorted.map((m) => {
    if (m.pageNumber) {
      // Keep existing number; advance cursor if needed
      if (m.pageNumber >= nextPage) nextPage = m.pageNumber + 1;
      return m;
    }
    const assigned = { ...m, pageNumber: nextPage };
    nextPage++;
    return assigned;
  });

  // Group into chapters
  const chapters: LoveBookChapter[] = [];
  let chapterIndex = 0;

  for (let i = 0; i < withPages.length; i += CHAPTER_SIZE) {
    const slice = withPages.slice(i, i + CHAPTER_SIZE);
    const nameEntry = CHAPTER_NAMES[chapterIndex % CHAPTER_NAMES.length];
    const artworkUrl = CHAPTER_ARTWORKS[chapterIndex % CHAPTER_ARTWORKS.length];

    const startPage = slice[0].pageNumber ?? i + 1;
    const endPage = slice[slice.length - 1].pageNumber ?? i + slice.length;

    chapters.push({
      id: `chapter-${chapterIndex + 1}`,
      number: chapterIndex + 1,
      title: nameEntry.title,
      subtitle: nameEntry.subtitle,
      artworkUrl,
      memories: slice,
      startPage,
      endPage,
    });

    chapterIndex++;
  }

  const totalMemories = withPages.length;
  const totalPages = withPages.reduce((max, m) => Math.max(max, m.pageNumber ?? 0), 0);

  return {
    chapters,
    totalPages,
    totalMemories,
    blankPages: BLANK_FUTURE_PAGES,
  };
}

/**
 * Assigns a chapterId and pageNumber to a NEW memory being added.
 * Call this in the API route before saving.
 */
export function assignBookFields(
  existingMemories: BookMemory[],
  newMemory: BookMemory
): BookMemory {
  const currentCount = existingMemories.filter((m) => !m.isDeleted).length;
  const pageNumber = currentCount + 1;
  const chapterNumber = Math.ceil(pageNumber / CHAPTER_SIZE);
  const chapterId = `chapter-${chapterNumber}`;

  return {
    ...newMemory,
    pageNumber,
    chapterId,
    isFavorite: false,
  };
}

/**
 * Returns all memories as a flat array sorted by pageNumber ascending.
 */
export function getPagesSorted(memories: BookMemory[]): BookMemory[] {
  return [...memories].sort((a, b) => (a.pageNumber ?? 999) - (b.pageNumber ?? 999));
}
