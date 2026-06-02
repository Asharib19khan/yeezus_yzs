'use client';

import { useEffect, useState } from 'react';
import LaunchSequence from '@/components/LaunchSequence';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BrandsWeServe from '@/components/BrandsWeServe';
import ImmersiveProof from '@/components/ImmersiveProof';
import CoreServices from '@/components/CoreServices';
import PeripheralSystems from '@/components/PeripheralSystems';
import FinalConversion from '@/components/FinalConversion';
import CaseStudies from '@/components/CaseStudies';
import Footer from '@/components/Footer';
import TopMusicBar from '@/components/TopMusicBar';
import EmailGate from '@/components/EmailGate';

export default function Home() {
  const [isGateOpen, setIsGateOpen] = useState(true);

  // Force scroll to top on load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-brand-void text-brand-white selection:bg-brand-magenta selection:text-brand-white">
      <TopMusicBar isVisible={!isGateOpen} />
      <LaunchSequence />
      
      {/* ── EMAIL GATE (Z=90) ── */}
      {isGateOpen && <EmailGate onClose={() => setIsGateOpen(false)} />}

      <Navigation isVisible={!isGateOpen} />
      
      {/* Rest of the page content — overflow-x:clip here only, never on ancestors of sticky */}
      <div className="relative z-20 bg-brand-void [overflow-x:clip]">
        <Hero />
        <ImmersiveProof />
        <CoreServices />
        <PeripheralSystems />
        <FinalConversion />
        <CaseStudies />
        <Footer />
      </div>
    </main>
  );
}
