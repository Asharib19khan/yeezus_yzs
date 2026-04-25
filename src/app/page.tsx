'use client';

import { useEffect, useState } from 'react';
import LaunchSequence from '@/components/LaunchSequence';
import Navigation from '@/components/Navigation';
import ScrollytellingSequence from '@/components/ScrollytellingSequence';
import Hero from '@/components/Hero';
import CoreServices from '@/components/CoreServices';
import PeripheralSystems from '@/components/PeripheralSystems';
import Footer from '@/components/Footer';
import TopMusicBar from '@/components/TopMusicBar';
import EmailGate from '@/components/EmailGate';

export default function Home() {
  const [isGateOpen, setIsGateOpen] = useState(true);

  const openModal = () => {
    window.dispatchEvent(new CustomEvent('hero-open-book-meeting'));
  };

  // Force scroll to top on load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Listen for the nav "Book a Meeting" button
  useEffect(() => {
    const handler = () => {
      // Scroll to top first so the Hero button morph looks correct
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Small delay so scroll completes before event bubbles to Hero
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('hero-open-book-meeting'));
      }, 400);
    };
    window.addEventListener('open-book-meeting', handler);
    return () => window.removeEventListener('open-book-meeting', handler);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-brand-void text-brand-white selection:bg-brand-magenta selection:text-brand-white">
      <TopMusicBar isVisible={!isGateOpen} />
      <LaunchSequence />
      
      {/* ── EMAIL GATE (Z=90) ── */}
      {isGateOpen && <EmailGate onClose={() => setIsGateOpen(false)} />}

      <Navigation isVisible={!isGateOpen} />
      
      {/* The cinematic image sequence section */}
      <ScrollytellingSequence />
      
      {/* Rest of the page content — overflow-x:clip here only, never on ancestors of sticky */}
      <div className="relative z-20 bg-brand-void [overflow-x:clip]">
        <Hero />
        <CoreServices onOrderClick={openModal} />
        <PeripheralSystems onOrderClick={openModal} />
        <Footer />
      </div>
    </main>
  );
}
