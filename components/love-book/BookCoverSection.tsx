"use client";

import { useEffect, useState } from "react";
import BookCover from "@/components/love-book/BookCover";

interface BookCoverSectionProps {
  onOpen: () => void;
}

export default function BookCoverSection({ onOpen }: BookCoverSectionProps) {
  const [stats, setStats] = useState({ totalMemories: 0, totalPages: 0 });

  useEffect(() => {
    fetch("/api/memories")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const mems = data.memories as { pageNumber?: number }[];
          const totalMemories = mems.length;
          const totalPages = mems.reduce((max, m) => Math.max(max, m.pageNumber ?? 0), 0) || totalMemories;
          setStats({ totalMemories, totalPages });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <BookCover
      totalMemories={stats.totalMemories}
      totalPages={stats.totalPages}
      onOpen={onOpen}
    />
  );
}
