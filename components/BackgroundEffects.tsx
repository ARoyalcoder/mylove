"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
  type: "star" | "bokeh" | "dust";
}

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, rawX: -1000, rawY: -1000 });
  const [atmosphere, setAtmosphere] = useState({
    color1: "rgba(248, 200, 220, 0.22)", // Soft Baby Pink
    color2: "rgba(11, 3, 7, 1)",          // Midnight
  });

  useEffect(() => {
    // Atmosphere Shift on Scroll across Adventure Chapters
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      if (progress < 0.12) {
        // Chapter 01: Beginning → Soft Baby Pink
        setAtmosphere({
          color1: "rgba(248, 200, 220, 0.25)",
          color2: "rgba(11, 3, 7, 1)",
        });
      } else if (progress < 0.28) {
        // Chapter 02: Butterflies → Pink Garden
        setAtmosphere({
          color1: "rgba(233, 138, 168, 0.22)",
          color2: "rgba(23, 5, 16, 1)",
        });
      } else if (progress < 0.44) {
        // Chapter 03 & 04: Adventure Map & Memories → Pink + Gold
        setAtmosphere({
          color1: "rgba(216, 181, 106, 0.2)",
          color2: "rgba(18, 4, 12, 1)",
        });
      } else if (progress < 0.62) {
        // Chapter 05: Memory Room → Warm Cream & Deep Rose
        setAtmosphere({
          color1: "rgba(184, 79, 114, 0.26)",
          color2: "rgba(11, 3, 7, 1)",
        });
      } else if (progress < 0.78) {
        // Chapter 06: Late Night Talks → Midnight Rose
        setAtmosphere({
          color1: "rgba(37, 13, 24, 0.65)",
          color2: "rgba(8, 2, 6, 1)",
        });
      } else {
        // Chapter 07 & 08: Future & Finale → Sunrise Pink + Champagne Gold
        setAtmosphere({
          color1: "rgba(248, 200, 220, 0.28)",
          color2: "rgba(11, 3, 7, 1)",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = "#0B0307";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const width = canvas.width;
      const height = canvas.height;

      // Starlight Twinkles (Warm Cream and Champagne Gold)
      const starCount = Math.min(50, Math.floor(width / 30));
      for (let i = 0; i < starCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.4,
          speedY: 0,
          speedX: 0,
          opacity: Math.random() * 0.7 + 0.2,
          fadeSpeed: Math.random() * 0.008 + 0.004,
          color: Math.random() > 0.4 ? "rgba(255, 248, 245, " : "rgba(216, 181, 106, ",
          type: "star",
        });
      }

      // Soft Ambient Bokeh (Baby Pink & Rose)
      const bokehCount = Math.min(18, Math.floor(width / 75));
      const bokehColors = [
        "rgba(248, 200, 220, ",
        "rgba(255, 221, 232, ",
        "rgba(233, 138, 168, ",
        "rgba(184, 79, 114, ",
      ];
      for (let i = 0; i < bokehCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 85 + 45,
          speedY: -(Math.random() * 0.12 + 0.04),
          speedX: Math.random() * 0.08 - 0.04,
          opacity: Math.random() * 0.12 + 0.04,
          fadeSpeed: 0,
          color: bokehColors[Math.floor(Math.random() * bokehColors.length)],
          type: "bokeh",
        });
      }

      // Floating Pink Petal Dust
      const dustCount = Math.min(30, Math.floor(width / 50));
      for (let i = 0; i < dustCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 1,
          speedY: -(Math.random() * 0.25 + 0.08),
          speedX: Math.random() * 0.15 - 0.07,
          opacity: Math.random() * 0.4 + 0.1,
          fadeSpeed: 0,
          color: "rgba(248, 200, 220, ",
          type: "dust",
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0B0307";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      const parallaxX = mouseRef.current.x * 20;
      const parallaxY = mouseRef.current.y * 20;

      // Cursor Radial Glow (Soft Baby Pink Aura)
      if (mouseRef.current.rawX > 0 && mouseRef.current.rawY > 0) {
        const cursorGlow = ctx.createRadialGradient(
          mouseRef.current.rawX,
          mouseRef.current.rawY,
          0,
          mouseRef.current.rawX,
          mouseRef.current.rawY,
          240
        );
        cursorGlow.addColorStop(0, "rgba(248, 200, 220, 0.09)");
        cursorGlow.addColorStop(0.5, "rgba(233, 138, 168, 0.04)");
        cursorGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouseRef.current.rawX, mouseRef.current.rawY, 240, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Particles
      particles.forEach((p) => {
        if (p.type === "star") {
          p.opacity += p.fadeSpeed;
          if (p.opacity > 0.9 || p.opacity < 0.15) {
            p.fadeSpeed = -p.fadeSpeed;
          }
          ctx.fillStyle = `${p.color}${Math.max(0.1, p.opacity)})`;
          ctx.beginPath();
          const finalX = (p.x + parallaxX + canvas.width) % canvas.width;
          const finalY = (p.y + parallaxY + canvas.height) % canvas.height;
          ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "bokeh") {
          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y < -p.size) p.y = canvas.height + p.size;
          if (p.x < -p.size) p.x = canvas.width + p.size;
          if (p.x > canvas.width + p.size) p.x = -p.size;

          const finalX = (p.x + parallaxX * 0.4 + canvas.width) % canvas.width;
          const finalY = (p.y + parallaxY * 0.4 + canvas.height) % canvas.height;

          const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, p.size);
          gradient.addColorStop(0, `${p.color}${p.opacity})`);
          gradient.addColorStop(0.6, `${p.color}${p.opacity * 0.3})`);
          gradient.addColorStop(1, `${p.color}0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "dust") {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.y * 0.02) * 0.3;
          if (p.y < -5) {
            p.y = canvas.height + 5;
            p.x = Math.random() * canvas.width;
          }

          const finalX = (p.x + parallaxX * 0.7 + canvas.width) % canvas.width;
          const finalY = (p.y + parallaxY * 0.7 + canvas.height) % canvas.height;

          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth - 0.5;
      mouseRef.current.targetY = e.clientY / window.innerHeight - 0.5;
      mouseRef.current.rawX = e.clientX;
      mouseRef.current.rawY = e.clientY;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${atmosphere.color1} 0%, ${atmosphere.color2} 75%)`,
        }}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
    </>
  );
}
