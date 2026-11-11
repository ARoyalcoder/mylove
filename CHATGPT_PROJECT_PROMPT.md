# "Our Little Universe ❤️" — Sakshi & Aditya (Full Project Bundle)

> **Prompt for ChatGPT**:
> *"I have an existing premium romantic Next.js 16 website dedicated to my love, Sakshi & Aditya. Below is the complete project architecture, technical stack, configuration, and all source code files. Please review it and suggest or implement advanced features (such as voice notes, interactive love quiz, anniversary countdown, romantic interactive games, or audio love letters) while preserving the elegant Apple-style aesthetics."*

---

## 1. Tech Stack & Design System

* **Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript)
* **Styling**: Tailwind CSS v4 with custom CSS variables in `app/globals.css`
* **Animations**: Framer Motion (`framer-motion`), Canvas Confetti (`canvas-confetti`)
* **Icons**: Lucide React (`lucide-react`)
* **Palette**: Midnight Black (`#060608`), Wine (`#480516`), Burgundy (`#6e0d25`), Rose (`#d63c5e`), Soft Rose Light (`#ff758f`), Subtle Gold (`#d4af37`)
* **Typography**: Cormorant Garamond (luxury serif headings), Plus Jakarta Sans (modern sans body), Alex Brush (handwritten cursive script for signatures)

---

## 2. Directory Structure

```text
d:/love/
├── app/
│   ├── api/
│   │   └── memories/
│   │       └── route.ts         # API for uploading & saving photos, videos & notes
│   ├── globals.css              # Tailwind v4 theme, glassmorphism, animations
│   ├── layout.tsx               # Google fonts configuration and metadata
│   └── page.tsx                 # Master page coordinating all sections
├── components/
│   ├── AddMemoryModal.tsx       # Modal allowing Sakshi & Aditya to upload photo/video/text
│   ├── LivingScrapbook.tsx      # Dynamic scrapbook grid with video player & photo lightbox
│   ├── FloatingAddButton.tsx    # Bottom-left floating quick-add button
│   ├── LandingScreen.tsx        # Cinematic Apple-style entry gate with "Begin Our Story"
│   ├── Hero.tsx                 # Full-screen romantic hero with pulsing heart & scroll cues
│   ├── FloatingNav.tsx          # Glassmorphism navbar with mobile menu
│   ├── BackgroundEffects.tsx    # Canvas particles: stars, bokeh, floating hearts, mouse parallax
│   ├── MusicPlayer.tsx          # Floating romantic audio player (starts paused)
│   ├── MemoryTimeline.tsx       # Vertical interactive timeline of relationship chapters
│   ├── MemoryGallery.tsx        # Masonry photo gallery with full-screen lightbox
│   ├── ShayariSection.tsx       # Original Hindi/Hinglish romantic shayari cards
│   ├── ReasonsSection.tsx       # "Sakshi, Tum Itni Special Kyun Ho?" reason cards
│   ├── HeartInteraction.tsx     # Tap-to-expand glowing heart with confetti & promise reveal
│   ├── DescribeYou.tsx          # Staggered text reveal: "Beautiful. Kind. Special. Simply Sakshi."
│   ├── MemoryCounter.tsx        # Number countups morphing into ∞ and ❤️ symbols
│   ├── QuoteCard.tsx            # Auto-advancing romantic quote slideshow
│   ├── FutureMemories.tsx       # "The Story Isn't Finished..." upcoming chapters
│   ├── LoveLetter.tsx           # Handwritten parchment letter from Aditya with cursive sign-off
│   └── Footer.tsx               # Closing romantic tag and credits
├── config/
│   └── couple.ts                # Central configuration for names, shayari, quotes, timeline
├── data/
│   └── memories.json            # JSON storage for custom-added photos, videos, and notes
├── public/
│   ├── memories/                # Timeline & gallery demo images
│   ├── music/                   # our-song.wav (or custom MP3)
│   └── uploads/                 # Storage for photos/videos uploaded via the UI
├── package.json
└── tsconfig.json
```

---

## 3. Configuration & Entry Files

### `package.json`
```json
{
  "name": "love",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@types/canvas-confetti": "^1.9.0",
    "canvas-confetti": "^1.9.4",
    "framer-motion": "^13.0.0",
    "lucide-react": "^1.30.0",
    "next": "16.3.0",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### `config/couple.ts`
```typescript
export interface CoupleConfig {
  person1: string;
  person2: string;
  title: string;
  subtitle: string;
  openingQuote: string;
  musicPath: string;
}

export const coupleConfig: CoupleConfig = {
  person1: "Sakshi",
  person2: "Aditya",
  title: "Our Little Universe",
  subtitle: "Sakshi × Aditya",
  openingQuote: "Some people become a beautiful chapter in your life. Some become the reason you keep writing the story.",
  musicPath: "/music/our-song.wav",
};

export const shayariList = [
  {
    text: "Tum mile toh laga,\njaise khamoshi ko bhi ek awaaz mil gayi,\naur meri adhuri si duniya ko\nek khoobsurat wajah mil gayi."
  },
  {
    text: "Teri muskurahat ka zikr kya karun,\nwoh pal bhi khoobsurat ho jaata hai\njismein tum bas ek baar muskura do."
  },
  {
    text: "Zindagi se zyada kuch nahi maanga tha,\nbas ek aisa insaan chahiye tha\njiske saath waqt guzarna\nwaqt barbaad karna na lage."
  },
  {
    text: "Har yaad mein tera naam sa milta hai,\nhar khushi mein tera ehsaas milta hai,\npata nahi kya rishta hai tumse,\npar dil ko sukoon sirf tumse milta hai."
  }
];

export const reasonsList = [
  {
    iconName: "Smile",
    title: "Your Smile",
    description: "Some smiles are beautiful. Yours has a way of making an ordinary day feel a little better."
  },
  {
    iconName: "Heart",
    title: "Your Kindness",
    description: "The soft, genuine way you care for people and things around you. It makes the world feel gentler."
  },
  {
    iconName: "MessageCircle",
    title: "Your Way of Understanding",
    description: "I don't need to explain myself to you. You read between the lines and hear what I don't say."
  },
  {
    iconName: "Sparkles",
    title: "The Little Things You Do",
    description: "The small gestures, your laughter, your expressions — things you don't even notice, but make my day."
  },
  {
    iconName: "Compass",
    title: "Making Ordinary Moments Memorable",
    description: "A simple walk, a random conversation, or just sitting in silence becomes a core memory when it's with you."
  },
  {
    iconName: "Eye",
    title: "The Comfort of Talking to You",
    description: "No filters, no judgments. Just pure comfort, where I can share my deepest thoughts and silliest jokes."
  },
  {
    iconName: "Gift",
    title: "Your Presence",
    description: "Just knowing that you are in my life makes it infinitely richer. You are my peaceful harbor."
  }
];

export const timelineEvents = [
  {
    chapter: "Chapter 01",
    date: "The Beginning",
    title: "The First Connection",
    description: "Every beautiful story starts with a moment that seemed ordinary at the time, but changed everything.",
    image: "/memories/memory-1.png"
  },
  {
    chapter: "Chapter 02",
    date: "Getting Closer",
    title: "Late Night Conversations",
    description: "Some conversations slowly become memories you never want to forget. Finding comfort in our shared laughter.",
    image: "/memories/memory-2.png"
  },
  {
    chapter: "Chapter 03",
    date: "The Little Moments",
    title: "Beautiful Realizations",
    description: "Sometimes the smallest moments become the biggest memories. Realizing you are the person I always want by my side.",
    image: "/memories/memory-3.png"
  },
  {
    chapter: "Chapter 04",
    date: "Today",
    title: "Writing Our Own Story",
    description: "And somehow, the story is still being written, growing warmer, deeper, and more beautiful with each passing day.",
    image: "/memories/memory-4.png"
  }
];

export const galleryImages = [
  { src: "/memories/gallery-1.png", caption: "The silent warmth of your smile." },
  { src: "/memories/gallery-2.png", caption: "The simple conversations that stay in my heart." },
  { src: "/memories/gallery-3.png", caption: "A thousand feelings, one beautiful face." },
  { src: "/memories/gallery-4.png", caption: "The comfort of knowing you're right here." },
  { src: "/memories/gallery-5.png", caption: "Your laughter that makes everything feel perfect." },
  { src: "/memories/gallery-6.png", caption: "Every day is beautiful, but days with you are magic." }
];

export const romanticQuotes = [
  "You don't have to make every day perfect. Sometimes your presence is enough to make it beautiful.",
  "If memories were stars, I'd never run out of light.",
  "Some people enter your life quietly and somehow become your favorite part of it.",
  "Home isn't always a place. Sometimes it's a person who makes you feel understood.",
  "Among all the ordinary moments of life, somehow you became my favorite one."
];

export const futureChapters = [
  {
    title: "More Laughs",
    description: "More moments that make us laugh for no reason, finding happiness in the simplest things."
  },
  {
    title: "More Memories",
    description: "More little moments worth remembering, captured in the scrapbooks of our hearts."
  },
  {
    title: "More Chapters",
    description: "Because the best stories are never finished too early, and ours has so much left to say."
  }
];

export const loveLetter = {
  heading: "A Few Words From Aditya",
  paragraphs: [
    "Sakshi,",
    "Some people are remembered because of the moments they created. Some are remembered because of the way they made you feel.",
    "You are a little bit of both.",
    "Thank you for being a beautiful part of my memories. And if life keeps giving us new chapters, I hope some of my favorite pages continue to have your name on them."
  ],
  signature: "— Aditya ❤️"
};
```

### `app/globals.css`
```css
@import "tailwindcss";

@theme {
  --color-midnight: #060608;
  --color-wine-dark: #2a0008;
  --color-wine: #480516;
  --color-burgundy: #6e0d25;
  --color-rose-dark: #a81836;
  --color-rose: #d63c5e;
  --color-rose-light: #ff758f;
  --color-gold: #d4af37;
  --color-gold-light: #f3e5ab;

  --font-serif: var(--font-cormorant), serif;
  --font-sans: var(--font-jakarta), sans-serif;
  --font-script: var(--font-alex), cursive;
}

:root {
  --background: #060608;
  --foreground: #f5f3f4;
}

html {
  scroll-behavior: smooth;
  background-color: #060608;
  color: #f5f3f4;
}

body {
  background: #060608;
  color: #f5f3f4;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #060608;
}
::-webkit-scrollbar-thumb {
  background: #2a0008;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #480516;
}

.glass {
  background: rgba(6, 6, 8, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-wine {
  background: rgba(42, 0, 8, 0.35);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(214, 60, 94, 0.15);
}

.glass-wine-hover {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-wine-hover:hover {
  background: rgba(72, 5, 22, 0.45);
  border-color: rgba(255, 117, 143, 0.3);
  box-shadow: 0 0 30px rgba(214, 60, 94, 0.15);
  transform: translateY(-4px);
}

.handwritten {
  font-family: var(--font-alex), cursive;
}

@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 5px rgba(214, 60, 94, 0.5));
  }
  50% {
    transform: scale(1.08);
    filter: drop-shadow(0 0 20px rgba(255, 117, 143, 0.9));
  }
}

.heart-glow-pulse {
  animation: pulseGlow 2.5s infinite ease-in-out;
}

@keyframes floatStar {
  0%, 100% { transform: translateY(0px) opacity(0.3); }
  50% { transform: translateY(-10px) opacity(0.8); }
}

.star-float {
  animation: floatStar 4s infinite ease-in-out;
}

::selection {
  background: #480516;
  color: #ff758f;
}
```

### `app/layout.tsx`
```typescript
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const alex = Alex_Brush({
  variable: "--font-alex",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Our Little Universe ❤️ Sakshi & Aditya",
  description: "A private cinematic digital scrapbook and love story dedicated to Sakshi and Aditya. Two names. One beautiful collection of memories.",
  authors: [{ name: "Aditya" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${alex.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-zinc-100 bg-midnight selection:bg-wine-dark selection:text-rose-light min-h-screen">
        {children}
      </body>
    </html>
  );
}
```

### `app/page.tsx`
```typescript
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScreen from "@/components/LandingScreen";
import BackgroundEffects from "@/components/BackgroundEffects";
import FloatingNav from "@/components/FloatingNav";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingAddButton from "@/components/FloatingAddButton";
import AddMemoryModal from "@/components/AddMemoryModal";
import Hero from "@/components/Hero";
import ShayariSection from "@/components/ShayariSection";
import ReasonsSection from "@/components/ReasonsSection";
import MemoryTimeline from "@/components/MemoryTimeline";
import LivingScrapbook, { CustomMemory } from "@/components/LivingScrapbook";
import MemoryGallery from "@/components/MemoryGallery";
import QuoteCard from "@/components/QuoteCard";
import HeartInteraction from "@/components/HeartInteraction";
import DescribeYou from "@/components/DescribeYou";
import MemoryCounter from "@/components/MemoryCounter";
import FutureMemories from "@/components/FutureMemories";
import LoveLetter from "@/components/LoveLetter";
import Footer from "@/components/Footer";

export default function Home() {
  const [isStarted, setIsStarted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newlyAddedMemory, setNewlyAddedMemory] = useState<CustomMemory | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-midnight text-zinc-100 overflow-x-hidden selection:bg-wine selection:text-rose-light">
      <AnimatePresence>
        {!isStarted && (
          <LandingScreen onStart={() => setIsStarted(true)} />
        )}
      </AnimatePresence>

      <div className={`relative transition-all duration-1000 ${isStarted ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none h-screen overflow-hidden"}`}>
        <BackgroundEffects />
        <FloatingNav />
        <MusicPlayer />
        <FloatingAddButton onClick={() => setIsAddModalOpen(true)} />

        <main className="relative z-10 w-full flex flex-col">
          <Hero />
          <MemoryTimeline />
          <LivingScrapbook
            onOpenAddModal={() => setIsAddModalOpen(true)}
            newMemoryTrigger={newlyAddedMemory}
          />
          <ShayariSection />
          <ReasonsSection />
          <DescribeYou />
          <HeartInteraction />
          <MemoryGallery />
          <MemoryCounter />
          <QuoteCard />
          <FutureMemories />
          <LoveLetter />
        </main>

        <Footer />

        <AddMemoryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onMemoryAdded={(mem) => setNewlyAddedMemory(mem)}
        />
      </div>
    </div>
  );
}
```

---

## 4. Backend API Route: `app/api/memories/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const dataFilePath = path.join(dataDir, "memories.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

function getMemories() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
      return [];
    }
    const content = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Error reading memories.json:", err);
    return [];
  }
}

function saveMemories(memories: unknown[]) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(memories, null, 2));
}

export async function GET() {
  const memories = getMemories();
  return NextResponse.json({ success: true, memories });
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let date = "";
    let location = "";
    let type = "photo";
    let description = "";
    let author = "Sakshi ❤️";
    let mediaUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = (formData.get("title") as string) || "Untitled Memory";
      date = (formData.get("date") as string) || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      location = (formData.get("location") as string) || "";
      type = (formData.get("type") as string) || "photo";
      description = (formData.get("description") as string) || "";
      author = (formData.get("author") as string) || "Sakshi ❤️";
      mediaUrl = (formData.get("mediaUrl") as string) || "";

      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${Date.now()}-${cleanName}`;
        const filePath = path.join(uploadsDir, fileName);

        fs.writeFileSync(filePath, buffer);
        mediaUrl = `/uploads/${fileName}`;
      }
    } else {
      const body = await req.json();
      title = body.title || "Untitled Memory";
      date = body.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      location = body.location || "";
      type = body.type || "photo";
      description = body.description || "";
      author = body.author || "Sakshi ❤️";
      mediaUrl = body.mediaUrl || "";
    }

    const newMemory = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      date,
      location,
      type,
      mediaUrl,
      description,
      author,
      createdAt: new Date().toISOString(),
    };

    const memories = getMemories();
    memories.unshift(newMemory);
    saveMemories(memories);

    return NextResponse.json({ success: true, memory: newMemory }, { status: 201 });
  } catch (err) {
    console.error("Failed to add memory:", err);
    return NextResponse.json({ success: false, error: "Failed to save memory" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

    const memories = getMemories();
    const updated = memories.filter((m: { id: string }) => m.id !== id);
    saveMemories(updated);

    return NextResponse.json({ success: true, message: "Memory deleted successfully" });
  } catch (err) {
    console.error("Failed to delete memory:", err);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
```

---

## 5. Potential Enhancements You Can Ask ChatGPT To Build Next

1. **Voice Notes / Audio Love Letters**: Allow Sakshi to record a 30-second audio note directly from her microphone and attach it to any memory card.
2. **Anniversary / Love Countdown Clock**: An animated widget counting days, hours, and seconds since you two first met or till your next special anniversary.
3. **Interactive Couples Quiz**: *"How well do you know Aditya?"* or *"Guess our memory!"* with sweet rewards and custom love badges.
4. **Secret Passcode Lock**: A romantic vintage lock screen where entering her favorite anniversary date unlocks a hidden surprise section.
5. **Interactive Love Map**: A dark-mode Leaflet/Mapbox map pin-pointing all places you two visited together with popup memories.
