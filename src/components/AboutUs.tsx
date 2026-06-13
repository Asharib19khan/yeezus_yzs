'use client';

import { useRef } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { useInView } from "framer-motion";

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-brand-void z-20">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex flex-col mb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            About Us
          </h2>
          <p className="text-white/50 mt-4 max-w-md">
            The architects behind the systems that deliver exponential growth and permanent results.
          </p>
        </div>

        <Card 
          ref={containerRef}
          className="w-full h-[75vh] min-h-[600px] bg-black/[0.96] border-white/10 relative overflow-hidden rounded-3xl"
        >
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          {/* Spline Background taking the entire card space */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            {isInView && (
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            )}
          </div>

          {/* Foreground content: Names arranged perfectly on both sides */}
          <div className="relative z-10 flex flex-col md:flex-row h-full w-full pointer-events-none">
            
            {/* Left side: Avisha */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-start text-left pointer-events-auto">
              <div className="mb-2 inline-block font-mono text-xs tracking-[0.4em] text-pink-500 uppercase">
                Co-Founder
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 uppercase tracking-tight">
                Avisha<br/>Rizwan
              </h3>
              <p className="mt-4 text-neutral-400 max-w-xs font-mono text-sm uppercase tracking-widest">
                NED University
              </p>
            </div>

            {/* Middle Spacer to let robot be visible without overlapping text too much */}
            <div className="hidden md:block flex-[1.5] lg:flex-[2]"></div>

            {/* Right side: Asharib */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-end text-right pointer-events-auto">
              <div className="mb-2 inline-block font-mono text-xs tracking-[0.4em] text-pink-500 uppercase">
                Co-Founder
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 uppercase tracking-tight">
                Asharib<br/>Khan
              </h3>
              <p className="mt-4 text-neutral-400 max-w-xs font-mono text-sm uppercase tracking-widest">
                FAST NUCES
              </p>
            </div>

          </div>
        </Card>
      </div>
    </section>
  );
}
