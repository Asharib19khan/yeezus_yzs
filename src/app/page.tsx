'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ImmersiveProof from '@/components/ImmersiveProof';
import CoreServices from '@/components/CoreServices';
import FinalConversion from '@/components/FinalConversion';
import CaseStudies from '@/components/CaseStudies';
import Footer from '@/components/Footer';
import TopMusicBar from '@/components/TopMusicBar';
import EmailGate from '@/components/EmailGate';

export default function Home() {
  const [isGateOpen, setIsGateOpen] = useState(true);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isSplashFading, setIsSplashFading] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Force scroll to top on load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const fadeTimer = window.setTimeout(() => {
      setIsSplashFading(true);
      setIsContentVisible(true);
    }, 1800);

    const hideTimer = window.setTimeout(() => {
      setIsSplashVisible(false);
    }, 2600);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-brand-void text-brand-white selection:bg-brand-magenta selection:text-brand-white">
      <TopMusicBar isVisible={!isGateOpen} />
      
      {/* ── EMAIL GATE (Z=90) ── */}
      {isGateOpen && <EmailGate onClose={() => setIsGateOpen(false)} />}

      <Navigation isVisible={!isGateOpen} />
      
      {/* Rest of the page content — overflow-x:clip here only, never on ancestors of sticky */}
      <div className={`relative z-20 bg-brand-void [overflow-x:clip] transition-opacity duration-1000 ease-out ${isContentVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Hero />
        <ImmersiveProof />
        <CoreServices />
        <FinalConversion />
        <CaseStudies />
        <Footer />
      </div>

      {isSplashVisible && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white text-black transition-all duration-1000 ease-in-out ${
            isSplashFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="text-center px-6">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight uppercase">YEEZUS</h1>
          </div>
        </div>
      )}
    </main>
  );
}
