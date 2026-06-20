"use client";

import React, { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button clicked and dragging
      handleMove(e.clientX);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center px-2">
        <span className="text-sm font-bold text-red-500 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          Legacy Infrastructure
        </span>
        <span className="text-xs text-slate-400 font-semibold italic">Drag or click to slide</span>
        <span className="text-sm font-bold text-emerald-500 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          Viyora Edge Migration
        </span>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={handleClick}
        className="relative w-full h-[380px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 select-none cursor-ew-resize bg-slate-950 shadow-2xl"
      >
        {/* BEFORE LAYER (Red monolithic stack, fully visible by default) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-950/40 via-slate-950 to-slate-900 flex flex-col justify-center p-8 sm:p-12">
          <div className="max-w-[80%] flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                Legacy Stack
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">Monolithic Server Farm</h3>
              <p className="text-sm text-slate-450 mt-2 max-w-md">
                Manual scaling, centralized databases, frequent lockups, and high maintenance costs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-4 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-red-400">Response Latency</span>
                <span className="text-2xl font-black text-white mt-1">4.8s</span>
              </div>
              <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-4 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-red-400">Monthly Hosting</span>
                <span className="text-2xl font-black text-white mt-1">$12,400</span>
              </div>
              <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-4 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-red-400">Security Scans</span>
                <span className="text-2xl font-black text-white mt-1">14 CVEs</span>
              </div>
              <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-4 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-red-400">System Uptime</span>
                <span className="text-2xl font-black text-white mt-1">98.40%</span>
              </div>
            </div>
          </div>
        </div>

        {/* AFTER LAYER (Emerald serverless microservices, clip-pathed dynamically) */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 flex flex-col justify-center p-8 sm:p-12 transition-all duration-75"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          {/* Shift text to right to align inside clean area */}
          <div className="ml-auto w-full max-w-[80%] flex flex-col items-end text-right gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Viyora Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">Edge Serverless Clusters</h3>
              <p className="text-sm text-slate-450 mt-2 max-w-md ml-auto">
                Autoscaling nodes, globally-replicated databases, zero downtime deployments, and automated testing.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Response Latency</span>
                <span className="text-2xl font-black text-white mt-1">0.4s</span>
              </div>
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Monthly Hosting</span>
                <span className="text-2xl font-black text-white mt-1">$3,200</span>
              </div>
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Security Scans</span>
                <span className="text-2xl font-black text-white mt-1">0 CVEs</span>
              </div>
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 flex flex-col items-end">
                <span className="text-[10px] uppercase font-bold text-emerald-400">System Uptime</span>
                <span className="text-2xl font-black text-white mt-1">99.999%</span>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDER BAR HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-indigo-500 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-indigo-400 bg-slate-900 flex items-center justify-center shadow-xl text-indigo-400">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
