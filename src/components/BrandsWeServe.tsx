'use client';

import Image from 'next/image';

const logos = [
  { name: 'Metasoft', src: '/MetaSoft.png', width: 45, height: 45 },
  { name: 'REEN', src: '/reen.png', width: 45, height: 45 }
];

export default function BrandsWeServe() {
  // Generate a reliable number of logos to ensure the screen is filled
  const logoSet = Array(8).fill(logos).flat();

  return (
    <div className="w-full py-5 relative overflow-hidden bg-brand-void/50 backdrop-blur-md border-t border-white/[0.03]">
      <div className="w-full flex items-center px-4 md:px-8">
        
        {/* Fixed "Our Clients" Heading on the left */}
        <div className="relative z-10 bg-brand-void/80 px-4 py-1 rounded-full border border-white/5 mr-8 flex-shrink-0 backdrop-blur-lg">
          <p className="text-xs font-sans font-semibold tracking-[0.2em] text-white/60 uppercase whitespace-nowrap">
            Our Clients
          </p>
        </div>

        {/* Infinite Marquee Container */}
        <div className="flex-1 relative overflow-hidden mask-edges flex items-center">
          <div className="marquee-track flex w-max min-w-max">
            
            {/* Set 1 */}
            <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24 min-w-max">
              {logoSet.map((logo, i) => (
                <div key={i} className="flex items-center gap-4 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <Image 
                    src={logo.src} 
                    alt={logo.name} 
                    width={logo.width} 
                    height={logo.height} 
                    className="object-contain"
                  />
                  <span className="text-lg md:text-xl font-extrabold uppercase tracking-[0.15em] text-white">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Set 2 (Identical Clone for seamless loop) */}
            <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24 min-w-max">
              {logoSet.map((logo, i) => (
                <div key={`clone-${i}`} className="flex items-center gap-4 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <Image 
                    src={logo.src} 
                    alt={logo.name} 
                    width={logo.width} 
                    height={logo.height} 
                    className="object-contain"
                  />
                  <span className="text-lg md:text-xl font-extrabold uppercase tracking-[0.15em] text-white">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-edges {
          -webkit-mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
          mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
        }

        .marquee-track {
          animation: marquee-scroll 35s linear infinite;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
