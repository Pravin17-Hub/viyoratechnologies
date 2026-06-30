"use client";

import React, { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  targetX: number;
  targetY: number;
}

export function GoogleFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let blobs: Blob[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    // Setup premium brand colors matching MAK and Obsidian themes
    const colors = [
      "rgba(251, 191, 36, 0.35)", // Liquid Gold
      "rgba(217, 119, 6, 0.3)",   // Amber Gold
      "rgba(88, 28, 135, 0.45)",  // Deep Purple
      "rgba(112, 26, 117, 0.4)",  // Plum/Burgundy
      "rgba(79, 70, 229, 0.25)",  // Indigo
    ];

    const initBlobs = () => {
      blobs = [];
      const numBlobs = 6;
      for (let i = 0; i < numBlobs; i++) {
        const radius = Math.random() * (canvas.width * 0.3) + canvas.width * 0.25;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        blobs.push({
          x,
          y,
          vx: (Math.random() * 0.8 - 0.4) * 0.8,
          vy: (Math.random() * 0.8 - 0.4) * 0.8,
          radius,
          color: colors[i % colors.length],
          targetX: x,
          targetY: y,
        });
      }
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initBlobs();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";

      // Apply blur filter on context for smooth gradient merging
      ctx.filter = "blur(80px)";

      blobs.forEach((blob) => {
        // Slow float
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Interaction with mouse: gently pull blobs towards the mouse when active
        if (mouse.active) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 400) {
            blob.x += (dx / dist) * 0.4;
            blob.y += (dy / dist) * 0.4;
          }
        }

        // Boundary constraint
        if (blob.x < -blob.radius) {
          blob.x = canvas.width + blob.radius;
        } else if (blob.x > canvas.width + blob.radius) {
          blob.x = -blob.radius;
        }

        if (blob.y < -blob.radius) {
          blob.y = canvas.height + blob.radius;
        } else if (blob.y > canvas.height + blob.radius) {
          blob.y = -blob.radius;
        }

        // Draw smooth blob gradient
        const grad = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        grad.addColorStop(0, blob.color);
        grad.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, "0.15)"));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 mix-blend-screen"
        style={{ filter: "brightness(0.9) contrast(1.1)" }}
      />
    </div>
  );
}
