"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Video, Image as ImageIcon, FileText, MapPin, Calendar, Trash2, Sparkles, X, ZoomIn, Compass } from "lucide-react";

export interface CustomMemory {
  id: string;
  title: string;
  date: string;
  location?: string;
  type: "photo" | "video" | "text";
  mediaUrl?: string;
  description: string;
  author: string;
  createdAt: string;
}

interface LivingScrapbookProps {
  onOpenAddModal: () => void;
  newMemoryTrigger?: CustomMemory | null;
}

export default function LivingScrapbook({ onOpenAddModal, newMemoryTrigger }: LivingScrapbookProps) {
  const [memories, setMemories] = useState<CustomMemory[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "photo" | "video" | "text">("all");
  const [selectedMemory, setSelectedMemory] = useState<CustomMemory | null>(null);

  // Load memories from API + localStorage
  useEffect(() => {
    async function fetchMemories() {
      try {
        const res = await fetch("/api/memories");
        let serverMemories: CustomMemory[] = [];
        if (res.ok) {
          const data = await res.json();
          serverMemories = data.memories || [];
        }

        // Merge with any cached localStorage items
        const localCached = localStorage.getItem("our_universe_memories");
        const localMemories: CustomMemory[] = localCached ? JSON.parse(localCached) : [];

        // Combine unique by ID
        const map = new Map<string, CustomMemory>();
        [...localMemories, ...serverMemories].forEach((m) => {
          if (m && m.id) {
            map.set(m.id, m);
          }
        });

        const combined = Array.from(map.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMemories(combined);
      } catch (err) {
        console.error("Error loading memories:", err);
      }
    }

    fetchMemories();
  }, []);

  // When a new memory is passed from modal, append it at the front
  useEffect(() => {
    if (newMemoryTrigger) {
      setMemories((prev) => {
        const exists = prev.some((m) => m.id === newMemoryTrigger.id);
        if (exists) return prev;
        return [newMemoryTrigger, ...prev];
      });
    }
  }, [newMemoryTrigger]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to remove this memory from our little universe?")) return;

    try {
      await fetch(`/api/memories?id=${id}`, { method: "DELETE" });

      const localCached = localStorage.getItem("our_universe_memories");
      if (localCached) {
        const list: CustomMemory[] = JSON.parse(localCached);
        const filtered = list.filter((m) => m.id !== id);
        localStorage.setItem("our_universe_memories", JSON.stringify(filtered));
      }

      setMemories((prev) => prev.filter((m) => m.id !== id));
      if (selectedMemory?.id === id) {
        setSelectedMemory(null);
      }
    } catch (err) {
      console.error("Failed to delete memory:", err);
    }
  };

  const filteredMemories = memories.filter((m) => {
    if (activeFilter === "all") return true;
    return m.type === activeFilter;
  });

  return (
    <section id="scrapbook" className="relative w-full py-32 bg-[#0B0307] overflow-hidden px-6 film-grain select-none">
      {/* Ambient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[550px] h-[550px] bg-baby-pink/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-deep-rose/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading & Add Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-14">
          <div className="text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.28em] text-baby-pink font-sans w-fit mx-auto md:mx-0">
              <Compass className="w-3.5 h-3.5 text-champagne-gold animate-spin" />
              <span>Chapter 04 • Memory Adventure</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-warm-cream leading-tight">
              Every memory is another little place <br className="hidden sm:inline" />
              <span className="italic text-baby-pink font-normal text-shimmer">
                we&apos;ve been together.
              </span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 max-w-lg font-light leading-relaxed tracking-wider">
              Real moments, real smiles, real feelings. Every photo and note you save becomes an eternal landmark in our love adventure.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="group px-7 py-4 rounded-full bg-gradient-to-r from-deep-rose via-rose to-baby-pink border border-soft-blush/40 text-xs sm:text-sm uppercase tracking-widest text-white font-medium cursor-pointer shadow-[0_10px_35px_rgba(184,79,114,0.5)] hover:shadow-[0_15px_45px_rgba(248,200,220,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 shrink-0"
          >
            <Plus className="w-4 h-4 text-champagne-gold group-hover:rotate-90 transition-transform duration-300" />
            <span>Add to Our Adventure 💖</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-12">
          {[
            { id: "all", label: "All Adventures", icon: Heart },
            { id: "photo", label: "Photos 📸", icon: ImageIcon },
            { id: "video", label: "Videos 🎥", icon: Video },
            { id: "text", label: "Heart Notes 💌", icon: FileText },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as "all" | "photo" | "video" | "text")}
                className={`py-2 px-4 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-baby-pink/25 text-warm-cream border border-baby-pink shadow-[0_0_20px_rgba(248,200,220,0.3)] font-medium"
                    : "glass text-zinc-400 hover:text-warm-cream border border-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-70">
                  ({memories.filter((m) => (tab.id === "all" ? true : m.type === tab.id)).length})
                </span>
              </button>
            );
          })}
        </div>

        {/* Memories Grid as Adventure Cards */}
        {filteredMemories.length === 0 ? (
          <div className="glass-wine rounded-3xl p-12 text-center flex flex-col items-center gap-4 max-w-md mx-auto my-12 border border-baby-pink/20 shadow-[0_15px_40px_rgba(37,13,24,0.6)]">
            <div className="w-14 h-14 rounded-full bg-baby-pink/15 flex items-center justify-center text-baby-pink">
              <Heart className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl text-warm-cream font-light">No memories saved here yet</h3>
            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              Sakshi, tap the button below to add your favorite picture, video clip, or note!
            </p>
            <button
              onClick={onOpenAddModal}
              className="mt-2 text-xs uppercase tracking-widest text-baby-pink hover:text-soft-blush underline cursor-pointer"
            >
              + Save Our First Adventure Memory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories.map((item, index) => {
              const chapterNum = String(memories.length - index).padStart(3, "0");
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  onClick={() => setSelectedMemory(item)}
                  className="group rounded-3xl overflow-hidden bg-zinc-950/70 border border-baby-pink/20 backdrop-blur-md flex flex-col justify-between hover:border-baby-pink/50 hover:shadow-[0_15px_40px_rgba(248,200,220,0.25)] transition-all duration-400 cursor-pointer"
                >
                  {/* Media Section */}
                  {item.type === "photo" && item.mediaUrl && (
                    <div className="relative w-full h-64 bg-zinc-900 overflow-hidden group/img">
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                      />
                      {/* Adventure Chapter Badge */}
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/80 border border-baby-pink/40 text-[10px] uppercase font-sans tracking-widest text-baby-pink backdrop-blur-md">
                        🗺️ Chapter {chapterNum}
                      </div>

                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <div className="w-11 h-11 rounded-full glass-pink flex items-center justify-center shadow-lg">
                          <ZoomIn className="w-5 h-5 text-baby-pink" />
                        </div>
                      </div>
                    </div>
                  )}

                  {item.type === "video" && item.mediaUrl && (
                    <div className="relative w-full h-64 bg-black flex items-center justify-center overflow-hidden">
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/80 border border-baby-pink/40 text-[10px] uppercase font-sans tracking-widest text-baby-pink backdrop-blur-md">
                        🎥 Chapter {chapterNum}
                      </div>
                      <video
                        src={item.mediaUrl}
                        controls
                        preload="metadata"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {item.type === "text" && (
                    <div className="relative w-full h-44 bg-gradient-to-br from-[#250D18] to-[#12030B] p-6 flex flex-col justify-between border-b border-baby-pink/15">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-sans tracking-widest text-champagne-gold">
                          💌 Chapter {chapterNum}
                        </span>
                        <Heart className="w-4 h-4 text-baby-pink fill-baby-pink/30 animate-pulse" />
                      </div>
                      <p className="font-serif italic text-base text-baby-pink line-clamp-3 leading-relaxed">
                        &ldquo;{item.description || item.title}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
                    <div className="space-y-3">
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-baby-pink/15 text-baby-pink border border-baby-pink/30 font-medium">
                          {item.author}
                        </span>
                        <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] font-sans">
                          <Calendar className="w-3 h-3 text-champagne-gold" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-2xl text-warm-cream font-medium group-hover:text-baby-pink transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Location */}
                      {item.location && (
                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-sans">
                          <MapPin className="w-3.5 h-3.5 text-deep-rose" />
                          <span>{item.location}</span>
                        </div>
                      )}

                      {/* Story */}
                      {item.description && (
                        <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line italic line-clamp-2 pt-1">
                          &ldquo;{item.description}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-baby-pink/15 flex items-center justify-between text-[11px] text-zinc-400 font-sans tracking-wider uppercase">
                      <span className="text-champagne-gold">A moment worth keeping</span>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="text-zinc-500 hover:text-baby-pink p-1 transition-colors cursor-pointer"
                        title="Delete memory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 17: Floating Forward Memory Reveal Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.88, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#250D18] via-[#16040F] to-[#0B0307] border-2 border-baby-pink/40 p-6 sm:p-9 shadow-[0_25px_80px_rgba(248,200,220,0.4)] flex flex-col gap-6 cursor-default text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full glass border border-baby-pink/30 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Memory Media Sharp Display */}
              {selectedMemory.type === "photo" && selectedMemory.mediaUrl && (
                <div className="relative w-full aspect-[4/3] max-h-[50vh] rounded-2xl overflow-hidden bg-black border border-baby-pink/25">
                  <img
                    src={selectedMemory.mediaUrl}
                    alt={selectedMemory.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {selectedMemory.type === "video" && selectedMemory.mediaUrl && (
                <div className="relative w-full aspect-[16/9] max-h-[50vh] rounded-2xl overflow-hidden bg-black border border-baby-pink/25">
                  <video
                    src={selectedMemory.mediaUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Details & Romantic AI Observation */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase font-sans tracking-[0.25em] text-champagne-gold">
                    Chapter Memory • {selectedMemory.author}
                  </span>
                  <Heart className="w-4 h-4 text-baby-pink fill-baby-pink animate-pulse" />
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-warm-cream font-light">
                  {selectedMemory.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-champagne-gold" />
                    <span>{selectedMemory.date}</span>
                  </div>
                  {selectedMemory.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-deep-rose" />
                      <span>{selectedMemory.location}</span>
                    </div>
                  )}
                </div>

                {selectedMemory.description && (
                  <div className="p-5 rounded-2xl glass-wine border border-baby-pink/25 mt-2">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-baby-pink block mb-1">
                      ✨ What I Remember About This Moment
                    </span>
                    <p className="font-serif italic text-base sm:text-lg text-warm-cream/95 leading-relaxed whitespace-pre-line">
                      &ldquo;{selectedMemory.description}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
