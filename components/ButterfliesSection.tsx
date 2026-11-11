"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X, Check } from "lucide-react";
import { butterflySecrets, ButterflySecret } from "@/lib/adventures/adventureData";

interface Butterfly {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  wingAngle: number;
  wingSpeed: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  secretId: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  isPetal?: boolean;
}

export default function ButterfliesSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSecret, setActiveSecret] = useState<ButterflySecret | null>(null);
  const [foundSecrets, setFoundSecrets] = useState<number[]>([]);
  const butterfliesRef = useRef<Butterfly[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let butterflies: Butterfly[] = [];
    let lightParticles: Particle[] = [];
    const colors = ["#F8C8DC", "#FFDDE8", "#E98AA8", "#D8B56A", "#FFF8F5"];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn butterfly helper
    const spawnButterfly = (x: number, y: number, secretId?: number) => {
      if (butterflies.length > 20) return;
      const b: Butterfly = {
        id: Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -(Math.random() * 1.4 + 0.6),
        size: Math.random() * 9 + 9,
        wingAngle: 0,
        wingSpeed: Math.random() * 0.22 + 0.16,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 120 + 90,
        secretId: secretId ?? Math.floor(Math.random() * butterflySecrets.length) + 1,
      };
      butterflies.push(b);
      butterfliesRef.current = butterflies;
    };

    // Spawn light particle / rose petal
    const spawnParticle = (x: number, y: number, isPetal = false) => {
      if (lightParticles.length > 50) return;
      lightParticles.push({
        x: x + (Math.random() - 0.5) * 24,
        y: y + (Math.random() - 0.5) * 24,
        vx: (Math.random() - 0.5) * 0.9,
        vy: -(Math.random() * 1.1 + 0.3),
        size: isPetal ? Math.random() * 4 + 3 : Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.9,
        isPetal,
      });
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
        if (Math.random() > 0.4) {
          spawnButterfly(x, y);
        }
        for (let i = 0; i < 2; i++) {
          spawnParticle(x, y, Math.random() > 0.6);
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Click/Touch on a butterfly to reveal secret
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if user tapped near any butterfly
      const hit = butterflies.find((b) => {
        const dx = b.x - clickX;
        const dy = b.y - clickY;
        return Math.sqrt(dx * dx + dy * dy) < b.size * 3.5;
      });

      if (hit) {
        const sec = butterflySecrets.find((s) => s.id === hit.secretId) || butterflySecrets[0];
        setActiveSecret(sec);
        setFoundSecrets((prev) => (prev.includes(sec.id) ? prev : [...prev, sec.id]));
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("click", handleCanvasClick);

    // Draw butterfly with wing flaps
    const drawButterfly = (b: Butterfly) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = Math.max(0, b.alpha);

      // Flapping wing scale
      const flap = Math.sin(b.wingAngle);

      // Left wing
      ctx.save();
      ctx.scale(flap, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-b.size * 1.3, -b.size * 1.2, -b.size * 1.6, b.size * 0.4, 0, b.size * 0.7);
      ctx.fillStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // Right wing
      ctx.save();
      ctx.scale(-flap, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-b.size * 1.3, -b.size * 1.2, -b.size * 1.6, b.size * 0.4, 0, b.size * 0.7);
      ctx.fillStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // Delicate body
      ctx.beginPath();
      ctx.ellipse(0, b.size * 0.2, 1.3, b.size * 0.45, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 248, 245, 0.9)";
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ambient butterflies if few
      if (butterflies.length < 4 && Math.random() < 0.04) {
        spawnButterfly(
          Math.random() * canvas.width,
          canvas.height - Math.random() * (canvas.height * 0.45)
        );
      }

      // Update & Draw butterflies
      for (let i = butterflies.length - 1; i >= 0; i--) {
        const b = butterflies[i];
        b.x += b.vx + Math.sin(b.life * 0.08) * 0.6;
        b.y += b.vy;
        b.wingAngle += b.wingSpeed;
        b.life++;

        if (b.life > b.maxLife * 0.7) {
          b.alpha -= 0.02;
        }

        if (b.life >= b.maxLife || b.alpha <= 0) {
          butterflies.splice(i, 1);
        } else {
          drawButterfly(b);
        }
      }

      // Update & Draw light trail particles & petals
      for (let i = lightParticles.length - 1; i >= 0; i--) {
        const p = lightParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.018;

        if (p.alpha <= 0) {
          lightParticles.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="butterflies"
      ref={containerRef}
      className="relative min-h-screen w-full py-32 bg-[#0E0309] overflow-hidden flex flex-col items-center justify-center px-6 film-grain select-none"
    >
      {/* Background Soft Baby Pink Atmosphere */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(248,200,220,0.22)_0%,transparent_65%] pointer-events-none" />

      {/* Interactive Butterfly Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair z-10"
        title="Tap or click on any butterfly to catch a secret message"
      />

      <div className="max-w-3xl mx-auto relative z-20 flex flex-col items-center text-center gap-10 pointer-events-none">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.28em] text-soft-blush font-sans pointer-events-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-gold animate-pulse" />
          <span>Chapter 02 • That Butterfly Feeling</span>
        </motion.div>

        {/* Section 9 Headings */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-warm-cream font-light leading-tight tracking-wide">
            🦋 Remember <br />
            <span className="italic text-baby-pink font-normal text-shimmer">
              That Feeling?
            </span>
          </h2>
          <p className="font-serif italic text-base sm:text-xl text-soft-blush/90 font-light max-w-lg mx-auto leading-relaxed">
            &ldquo;That strange little feeling... when someone slowly becomes your favourite person.&rdquo;
          </p>
        </motion.div>

        {/* Interactive Tap Prompt & Discovery Tracker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <div className="py-2.5 px-6 rounded-full glass-pink border border-baby-pink/30 text-xs uppercase tracking-[0.25em] text-baby-pink flex items-center gap-2 shadow-[0_0_20px_rgba(248,200,220,0.3)]">
            <Heart className="w-3.5 h-3.5 text-deep-rose fill-deep-rose animate-ping" />
            <span>Tap any butterfly to catch a secret</span>
          </div>

          <div className="py-2 px-4 rounded-full glass border border-white/10 text-[11px] font-sans text-champagne-gold flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Found: {foundSecrets.length} of {butterflySecrets.length}</span>
          </div>
        </motion.div>

        {/* The Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-4 p-8 sm:p-10 rounded-3xl glass-wine max-w-xl border border-baby-pink/25 shadow-[0_15px_40px_rgba(37,13,24,0.6)] pointer-events-auto"
        >
          <p className="font-serif text-lg sm:text-xl text-warm-cream font-light leading-relaxed italic">
            &ldquo;Maybe that&apos;s where our adventure really began. With a little nervous flutter and a feeling that would last forever.&rdquo;
          </p>
          <div className="w-12 h-[1px] bg-baby-pink/40 mx-auto mt-6" />
        </motion.div>
      </div>

      {/* Secret Message Revealed Modal */}
      <AnimatePresence>
        {activeSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSecret(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#250D18] via-[#1B0511] to-[#0E0309] border border-baby-pink/40 shadow-[0_20px_60px_rgba(248,200,220,0.4)] text-center space-y-4"
            >
              <button
                onClick={() => setActiveSecret(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-baby-pink/20 flex items-center justify-center mx-auto text-2xl border border-baby-pink/40">
                🦋
              </div>

              <div className="text-[10px] uppercase font-sans tracking-[0.25em] text-champagne-gold">
                You Found A Little Piece Of Our Story
              </div>

              <h3 className="font-serif text-2xl text-warm-cream font-medium">
                {activeSecret.title}
              </h3>

              <p className="font-serif italic text-base sm:text-lg text-baby-pink/90 leading-relaxed pt-2">
                &ldquo;{activeSecret.message}&rdquo;
              </p>

              {activeSecret.hindiTranslation && (
                <div className="text-xs font-serif italic text-zinc-400 border-t border-baby-pink/15 pt-3">
                  {activeSecret.hindiTranslation}
                </div>
              )}

              <div className="pt-2 text-[11px] font-sans tracking-widest uppercase text-champagne-gold">
                Sakshi × Aditya ❤️
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
