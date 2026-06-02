'use client';

import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';
import AnimatedShaderHero from '@/components/ui/animated-shader-hero';
import BrandsWeServe from './BrandsWeServe';

export default function Hero() {
  const router = useRouter();

  return (
    <div className="relative w-full h-screen">
      <AnimatedShaderHero
        headline={{
          line1: "EVERYTHING ELSE",
          line2: "IS A DRAFT."
        }}
        subtitle="Full-stack growth, creative, product, and AI. Delivering for startups and global brands."
        buttons={{
          primary: {
            text: "Book a call",
            onClick: () => router.push('/book')
          }
        }}
      >
        <div className="w-full max-w-[280px]">
          <SearchBar />
        </div>
      </AnimatedShaderHero>

      {/* Embedded Marquee at the bottom of the Hero */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <BrandsWeServe />
      </div>
    </div>
  );
}
