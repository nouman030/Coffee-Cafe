"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  color: string;
}

export function SteamCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const maxParticles = 45;

    const createParticle = (): Particle => {
      const isEmber = Math.random() < 0.25;
      return {
        x: width / 2 + (Math.random() - 0.5) * 80,
        y: height * 0.75 + Math.random() * 20,
        size: isEmber ? Math.random() * 2 + 1 : Math.random() * 14 + 8,
        speedY: isEmber ? -(Math.random() * 1.5 + 0.8) : -(Math.random() * 0.9 + 0.4),
        speedX: (Math.random() - 0.5) * 0.8,
        opacity: 0,
        maxOpacity: isEmber ? 0.85 : Math.random() * 0.28 + 0.12,
        life: 0,
        maxLife: isEmber ? Math.random() * 80 + 50 : Math.random() * 140 + 90,
        color: isEmber ? "#ff5b14" : "#efe8dc",
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (particles.length < maxParticles && Math.random() < 0.4) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.speedX + Math.sin(p.life * 0.04) * 0.6;
        p.y += p.speedY;

        // Fade in and fade out curve
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.opacity = (progress / 0.2) * p.maxOpacity;
        } else {
          p.opacity = (1 - (progress - 0.2) / 0.8) * p.maxOpacity;
        }

        if (p.color === "#ff5b14") {
          // Ember particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 91, 20, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#ff5b14";
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Steam cloud puff
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * (1 + progress * 0.6));
          gradient.addColorStop(0, `rgba(239, 232, 220, ${p.opacity})`);
          gradient.addColorStop(0.5, `rgba(255, 216, 182, ${p.opacity * 0.4})`);
          gradient.addColorStop(1, "rgba(11, 10, 9, 0)");
          ctx.arc(p.x, p.y, p.size * (1 + progress * 0.6), 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
