"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import FeatureSection from "@/components/ui/stack-feature-section";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { MagneticText } from "@/components/ui/morphing-cursor";
import Link from "next/link";

export default function ImmersiveProof() {
  return (
    <section className="relative w-full bg-brand-void z-20 overflow-hidden">
      <div className="flex flex-col overflow-hidden pb-[40px] pt-[80px] md:pt-[120px] -mt-10 md:-mt-20">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl md:text-5xl font-semibold text-white/90">
                Unleash the power of <br />
                <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-white tracking-tighter">
                  Growth with AI
                </span>
              </h1>
            </>
          }
        >
          {/* Bento Grid */}
          <div className="h-full w-full bg-[#050505] p-4 md:p-5 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 overflow-y-auto no-scrollbar">

            {/* Card 1 — We Become Your Team (Orbit Animation) */}
            <div className="col-span-1 bg-[#0d0d0d] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[200px] hover:border-white/15 transition-colors relative overflow-hidden group">
              <div className="relative z-10 flex flex-col justify-end h-full">
                <div className="flex-1 overflow-hidden">
                  <FeatureSection />
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">We Become Your Team</h3>
                  <p className="text-xs text-white/40 leading-relaxed">We embed directly into your operations, learn your business, and execute alongside your people. Agency expertise with the context of an internal team.</p>
                </div>
              </div>
            </div>

            {/* Card 2 — Better Call Yeezus (CPU Architecture) */}
            <div className="col-span-1 bg-[#0d0d0d] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[200px] hover:border-white/15 transition-colors relative overflow-hidden">
              <div className="flex-1 flex items-center justify-center overflow-hidden opacity-80">
                <CpuArchitecture
                  className="text-white/30 w-full h-full"
                  text="YZS"
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Better Call Yeezus</h3>
                <p className="text-xs text-white/40 leading-relaxed">Frontend, dashboards, automation, or AI-powered features — pick one or get all of it. One point of contact, always.</p>
              </div>
            </div>

            {/* Card 3 — Magnetic Text (Morphing Cursor) */}
            <div className="col-span-1 bg-[#0d0d0d] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[200px] hover:border-white/15 transition-colors relative overflow-hidden">
              <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-hidden">
                <MagneticText text="CREATE" hoverText="ELEVATE" className="text-white" />
                <MagneticText text="GROW" hoverText="SCALE" className="text-white/50" />
              </div>
              <div className="mt-3">
                <p className="text-xs text-white/30 italic text-center">Hover to interact</p>
              </div>
            </div>

            {/* Card 4 — Wide: Stats + CTA */}
            <div className="col-span-1 md:col-span-2 bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-white/15 transition-colors relative overflow-hidden">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">100%</div>
                  <div className="text-xs text-white/30 uppercase tracking-widest mt-0.5">Retention Rate</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">3x</div>
                  <div className="text-xs text-white/30 uppercase tracking-widest mt-0.5">Avg. Growth</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">7-Day</div>
                  <div className="text-xs text-white/30 uppercase tracking-widest mt-0.5">Turnaround</div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-widest">One Partner. Every Function.</h3>
                  <p className="text-xs text-white/40 leading-relaxed max-w-sm mt-1">Media, creative, product, AI, and analytics. Engage us for a single capability or the full growth operation.</p>
                </div>
                <Link href="/book" className="flex-shrink-0 ml-4 px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/90 transition-colors">
                  Start Now →
                </Link>
              </div>
            </div>

            {/* Card 5 — Slim: Quick trust signal */}
            <div className="col-span-1 bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-white/15 transition-colors relative overflow-hidden">
              <div className="flex-1 flex flex-col justify-center gap-2">
                {[
                  "Full-stack delivery ✓",
                  "AI-native workflow ✓",
                  "No ramp-up period ✓",
                  "Real outcomes ✓",
                ].map((item, i) => (
                  <div key={i} className="text-sm text-white/60 font-medium">{item}</div>
                ))}
              </div>
              <div className="mt-3 text-xs text-white/20 uppercase tracking-widest">Been there. Built that.</div>
            </div>

          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
