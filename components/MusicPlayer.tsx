"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Music4, Volume2, VolumeX } from "lucide-react";
import { coupleConfig } from "@/config/couple";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate audio in useEffect to avoid SSR errors
    audioRef.current = new Audio(coupleConfig.musicPath);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Set moderate volume

    // Clean up audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      triggerToast();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        triggerToast();
      }).catch((err) => {
        console.warn("Playback blocked by browser policy:", err);
      });
    }
  };

  const triggerToast = () => {
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Toast popup */}
      <div
        className={`glass px-4 py-2 rounded-full text-xs font-sans tracking-wide text-rose-light border border-rose-dark/30 transition-all duration-500 ease-out transform ${
          showToast
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        {isPlaying ? "♪ Playing: Our Song" : "Music Paused"}
      </div>

      {/* Control Button */}
      <button
        onClick={togglePlayback}
        className={`relative w-12 h-12 flex items-center justify-center rounded-full glass border border-rose-dark/20 text-rose hover:text-rose-light shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-1 focus:ring-rose-light/50 ${
          isPlaying ? "border-rose/50" : ""
        }`}
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {/* Glow backdrop when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-rose/10 animate-ping opacity-75 pointer-events-none" />
        )}

        {/* Music Icons */}
        <div className={`transition-all duration-300 ${isPlaying ? "rotate-12 scale-110" : ""}`}>
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-rose-light animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-zinc-400 group-hover:text-rose" />
          )}
        </div>

        {/* Floating musical note elements when active */}
        {isPlaying && (
          <>
            <Music className="absolute w-3 h-3 text-rose-light opacity-0 animate-[floatNote_2.5s_infinite_ease-out] -top-1 left-2 pointer-events-none" />
            <Music4 className="absolute w-3 h-3 text-rose opacity-0 animate-[floatNote_2s_infinite_ease-out_0.5s] -top-2 right-2 pointer-events-none" />
          </>
        )}
      </button>

      {/* Styled animation keyframes specifically for music notes */}
      <style jsx global>{`
        @keyframes floatNote {
          0% {
            transform: translateY(10px) translateX(0) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          30% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-25px) translateX(8px) scale(1) rotate(15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
