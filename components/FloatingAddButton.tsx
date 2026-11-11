"use client";

import { Plus, Heart } from "lucide-react";

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full glass-wine border border-rose-dark/30 text-rose-light hover:text-zinc-100 shadow-[0_8px_25px_rgba(214,60,94,0.3)] hover:shadow-[0_8px_35px_rgba(214,60,94,0.5)] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
        aria-label="Add Our Memory"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Heart className="w-5 h-5 text-rose fill-rose/20 group-hover:scale-110 transition-transform" />
          <Plus className="absolute w-3 h-3 text-white font-bold" />
        </div>
        <span className="font-sans text-xs tracking-wider uppercase font-semibold pr-1">
          Add Memory 💖
        </span>
      </button>
    </div>
  );
}
