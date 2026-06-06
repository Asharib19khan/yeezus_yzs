'use client';

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export default function AboutUs() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-brand-void z-20">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              About Us
            </h2>
            <p className="text-white/50 mt-4 max-w-md">
              The architects behind the systems that deliver exponential growth and permanent results.
            </p>
          </div>
        </div>

        <Card className="w-full min-h-[500px] bg-black/[0.96] border-white/10 relative overflow-hidden rounded-3xl">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex flex-col md:flex-row h-full min-h-[500px] relative z-10">
            {/* Left content: Avisha */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center items-start text-left">
              <div className="mb-4 inline-block font-mono text-[10px] tracking-[0.4em] text-brand-magenta/70 uppercase">
                Co-Founder
              </div>
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 uppercase tracking-tight">
                Avisha Rizwan
              </h3>
              <p className="mt-4 text-neutral-400 max-w-xs font-mono text-sm uppercase tracking-widest">
                NED University
              </p>
            </div>

            {/* Middle content: Spline 3D */}
            <div className="flex-[1.5] relative h-[300px] md:h-auto min-h-[300px]">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>

            {/* Right content: Asharib */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center items-start md:items-end text-left md:text-right">
              <div className="mb-4 inline-block font-mono text-[10px] tracking-[0.4em] text-brand-magenta/70 uppercase">
                Co-Founder
              </div>
              <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 uppercase tracking-tight">
                Asharib Khan
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
