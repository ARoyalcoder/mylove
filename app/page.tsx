"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScreen from "@/components/LandingScreen";
import BackgroundEffects from "@/components/BackgroundEffects";
import FloatingNav from "@/components/FloatingNav";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingAddButton from "@/components/FloatingAddButton";
import AddMemoryModal from "@/components/AddMemoryModal";
import Hero from "@/components/Hero";
import AdventureMap from "@/components/adventure/AdventureMap";
import ButterfliesSection from "@/components/ButterfliesSection";
import ReasonsSection from "@/components/ReasonsSection";
import LittleThingsRoom from "@/components/adventure/LittleThingsRoom";
import OneSecondSection from "@/components/OneSecondSection";
import MemoryTimeline from "@/components/MemoryTimeline";
import LivingScrapbook, { CustomMemory } from "@/components/LivingScrapbook";
import MemoryGallery from "@/components/MemoryGallery";
import LateNightSection from "@/components/LateNightSection";
import DescribeYou from "@/components/DescribeYou";
import FutureAdventure from "@/components/adventure/FutureAdventure";
import ShayariSection from "@/components/ShayariSection";
import QuoteCard from "@/components/QuoteCard";
import HeartInteraction from "@/components/HeartInteraction";
import LoveLetter from "@/components/LoveLetter";
import ChooseYouSection from "@/components/ChooseYouSection";
import OneMoreThing from "@/components/adventure/OneMoreThing";
import MemoryCounter from "@/components/MemoryCounter";
import FutureMemories from "@/components/FutureMemories";
import Footer from "@/components/Footer";
import SecretRoomsModal from "@/components/adventure/SecretRoomsModal";
import LoveBook from "@/components/love-book/LoveBook";
import BookCoverSection from "@/components/love-book/BookCoverSection";
import type { BookMemory } from "@/lib/love-book/bookData";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSecretsModalOpen, setIsSecretsModalOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [newlyAddedMemory, setNewlyAddedMemory] = useState<CustomMemory | null>(null);
  const [newBookMemory, setNewBookMemory] = useState<BookMemory | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-[#0B0307] text-warm-cream overflow-x-hidden selection:bg-deep-rose selection:text-white">
      {/* 1. Gate Screen: Soft Baby Pink Sunrise with Glowing Portal Transition */}
      <AnimatePresence>
        {!isStarted && (
          <LandingScreen onStart={() => setIsStarted(true)} />
        )}
      </AnimatePresence>

      {/* 2. Main Page Experience (Mounted always, revealed on portal exit) */}
      <div
        className={`relative transition-all duration-1000 ${
          isStarted
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none h-screen overflow-hidden"
        }`}
      >
        {/* Dynamic Multi-Atmosphere Particles & Soft Baby Pink Light Backdrop */}
        <BackgroundEffects />

        {/* Floating Utilities */}
        <FloatingNav onOpenSecrets={() => setIsSecretsModalOpen(true)} />
        <MusicPlayer />
        <FloatingAddButton onClick={() => setIsAddModalOpen(true)} />

        {/* 📖 Floating "Our Love Book" button */}
        <motion.button
          className="fixed z-40 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm"
          style={{
            bottom: "5.5rem",
            right: "1.25rem",
            background: "linear-gradient(135deg, rgba(90,24,48,0.95) 0%, rgba(184,79,114,0.95) 100%)",
            border: "1px solid rgba(216,181,106,0.4)",
            color: "#FFF8F5",
            boxShadow: "0 4px 20px rgba(90,24,48,0.5)",
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.8rem",
            letterSpacing: "0.06em",
            backdropFilter: "blur(12px)",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 6px 28px rgba(90,24,48,0.7)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsBookOpen(true)}
          title="Open Our Love Story Book"
        >
          <span>📖</span>
          <span>Our Story</span>
        </motion.button>

        {/* Narrative Adventure Flow:
            🌸 The Beginning
                 ↓
            🗺️ Our Love Adventure Map
                 ↓
            🦋 The Butterfly Chapter (Tap-to-catch secrets)
                 ↓
            💗 Discovering Her (Interactive observation cards)
                 ↓
            🕯️ The Memory Room (Clickable room objects)
                 ↓
            📸 Memory Adventure (Living Scrapbook with chapter stamps)
                 ↓
            ⏳ If I Could Keep One Second
                 ↓
            📖 Our Journey Timeline & Captured Light Gallery
                 ↓
            🌙 Late Night Talks (2:30 AM Room)
                 ↓
            ✨ You Have A Strange Effect On Me
                 ↓
            🌅 Future Adventures (Adventures we haven't had yet + Pick Next Adventure)
                 ↓
            💌 Something I Wanted To Tell You (Wax-sealed physical letter)
                 ↓
            ❤️ I'd Still Choose You
                 ↓
            ✨ One More Thing...
                 ↓
            🌅 The Next Chapter (Finale & Footer)
        */}
        <main className="relative z-10 w-full flex flex-col">
          {/* Chapter 01: The Beginning */}
          <Hero />

          {/* Major Feature: Illustrated Fantasy Love Adventure Map */}
          <AdventureMap />

          {/* Chapter 02: That Butterfly Feeling (Interactive Canvas & Secret Catch) */}
          <ButterfliesSection />

          {/* Chapter 03: I Keep Discovering You (Interactive Observation Cards) */}
          <ReasonsSection />

          {/* Chapter 05: The Memory Room (Clickable room objects: photo, letter, rose, lamp, star) */}
          <LittleThingsRoom />

          {/* Chapter 04: Memory Adventure (Living Scrapbook with real photos, videos & notes) */}
          <LivingScrapbook
            onOpenAddModal={() => setIsAddModalOpen(true)}
            newMemoryTrigger={newlyAddedMemory}
          />

          {/* One Second Moment (Press & hold time freeze) */}
          <OneSecondSection />

          {/* Journey Chapters & Gallery */}
          <MemoryTimeline />
          <MemoryGallery />

          {/* Chapter 06: Late Night Talks (2:30 AM Quiet Hours) */}
          <LateNightSection />

          {/* You Have A Strange Effect On Me */}
          <DescribeYou />

          {/* Chapter 07: Future Adventures (Pick Our Next Adventure) */}
          <FutureAdventure />

          {/* Shayari & Romantic Quotes */}
          <ShayariSection />
          <QuoteCard />

          {/* Heart Interaction Promise */}
          <HeartInteraction />

          {/* Chapter 08: Wax-Sealed Handwritten Love Letter on Warm Cream Paper */}
          <LoveLetter />

          {/* Emotional Climax: I'd Still Choose You */}
          <ChooseYouSection />

          {/* Pre-Finale: One More Thing */}
          <OneMoreThing />

          {/* Milestone Counters & Future Dreams */}
          <MemoryCounter />
          <FutureMemories />

          {/* 📖 Our Love Story — Living Book Section */}
          <section
            id="love-story"
            className="relative w-full py-24 flex flex-col items-center gap-10"
          >
            {/* Section heading */}
            <div className="text-center px-6">
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
                  letterSpacing: "0.3em",
                  color: "rgba(184,79,114,0.7)",
                  marginBottom: "0.75rem",
                }}
              >
                ✦ OUR LIVING MEMORY BOOK ✦
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  color: "#FFF8F5",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                  lineHeight: 1.15,
                }}
              >
                📖 Our Love Story
              </h2>
              <p
                className="italic mt-3"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                  color: "rgba(255,221,232,0.6)",
                }}
              >
                A story we&rsquo;re still writing...
              </p>
            </div>

            {/* Book Cover — clicking opens the shared LoveBook modal */}
            <BookCoverSection onOpen={() => setIsBookOpen(true)} />
          </section>
        </main>

        {/* Finale: 🌅 The Next Chapter */}
        <Footer />

        {/* Modals */}
        <AddMemoryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onMemoryAdded={(mem) => {
            setNewlyAddedMemory(mem);
            // Also live-inject into the Love Book
            setNewBookMemory(mem as unknown as BookMemory);
          }}
        />

        <SecretRoomsModal
          isOpen={isSecretsModalOpen}
          onClose={() => setIsSecretsModalOpen(false)}
        />

        {/* 📖 Love Book Modal */}
        <LoveBook
          isOpen={isBookOpen}
          onClose={() => setIsBookOpen(false)}
          newMemory={newBookMemory}
        />
      </div>
    </div>
  );
}
