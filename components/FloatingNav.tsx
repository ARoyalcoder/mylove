"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { coupleConfig } from "@/config/couple";

export interface FloatingNavProps {
  onOpenSecrets?: () => void;
}

const navItems = [
  { label: "🌸 Beginning", href: "#beginning" },
  { label: "🦋 Discover", href: "#butterflies" },
  { label: "🗺️ Adventures", href: "#adventures-map" },
  { label: "📸 Memories", href: "#scrapbook" },
  { label: "💌 Letters", href: "#love-letter" },
  { label: "🔐 Secrets", href: "secrets" },
  { label: "🌅 Future", href: "#future-adventures" },
  { label: "📖 Our Story", href: "#love-story" },
  { label: "❤️ Us", href: "#choose-you" },
];

export default function FloatingNav({ onOpenSecrets }: FloatingNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beginning");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }

      const scrollPosition = window.scrollY + 250;
      for (const item of navItems) {
        if (item.href.startsWith("#")) {
          const el = document.querySelector(item.href);
          if (el) {
            const top = (el as HTMLElement).offsetTop;
            const height = (el as HTMLElement).offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(item.href.replace("#", ""));
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === "secrets") {
      onOpenSecrets?.();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-5xl glass rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.7)] border border-baby-pink/30 backdrop-blur-xl bg-[#0B0307]/85"
        >
          {/* Logo / Initials */}
          <a
            href="#beginning"
            onClick={(e) => handleLinkClick(e, "#beginning")}
            className="flex items-center gap-1.5 font-serif font-medium text-warm-cream hover:text-baby-pink transition-colors group pl-1"
          >
            <span>{coupleConfig.person1[0]}</span>
            <Heart className="w-3.5 h-3.5 text-deep-rose fill-deep-rose/40 group-hover:scale-125 transition-transform heart-beat-pulse" />
            <span>{coupleConfig.person2[0]}</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => {
              const itemID = item.href.replace("#", "");
              const isActive = activeSection === itemID;
              return (
                <button
                  key={item.label}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`relative text-[11px] tracking-widest uppercase transition-all px-2.5 py-1 font-sans cursor-pointer ${
                    isActive
                      ? "text-baby-pink font-semibold"
                      : "text-zinc-400 hover:text-warm-cream"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeRomanticNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-deep-rose to-baby-pink rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-zinc-300 hover:text-baby-pink p-1 cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-baby-pink" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-14 left-0 right-0 glass-wine rounded-3xl p-4 flex flex-col items-center gap-2 border border-baby-pink/30 shadow-[0_20px_45px_rgba(0,0,0,0.85)] lg:hidden bg-[#0B0307]/95"
              >
                {navItems.map((item) => {
                  const itemID = item.href.replace("#", "");
                  const isActive = activeSection === itemID;
                  return (
                    <button
                      key={item.label}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className={`text-xs tracking-wider uppercase font-sans transition-colors py-2 w-full text-center rounded-xl cursor-pointer ${
                        isActive
                          ? "text-baby-pink bg-baby-pink/15 font-semibold"
                          : "text-zinc-300 hover:text-warm-cream"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
