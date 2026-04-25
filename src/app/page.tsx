'use client';

import { useState } from 'react';
import LaunchSequence from '@/components/LaunchSequence';
import Navigation from '@/components/Navigation';
import ScrollytellingSequence from '@/components/ScrollytellingSequence';
import Hero from '@/components/Hero';
import CoreServices from '@/components/CoreServices';
import PeripheralSystems from '@/components/PeripheralSystems';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="relative w-full min-h-screen bg-brand-void text-brand-white selection:bg-brand-magenta selection:text-brand-white">
      <LaunchSequence />
      <Navigation />
      
      {/* The cinematic image sequence section */}
      <ScrollytellingSequence />
      
      {/* Rest of the page content */}
      <div className="relative z-20 bg-brand-void">
        <Hero onContactClick={openModal} />
        <CoreServices onOrderClick={openModal} />
        <PeripheralSystems onOrderClick={openModal} />
        <Footer />
      </div>

      {/* Global Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
