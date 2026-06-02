'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BookMeetingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-brand-void text-brand-white selection:bg-brand-magenta selection:text-brand-white">
      {/* Very simple Nav for the booking page */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 mix-blend-difference">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-tighter uppercase select-none hover:opacity-80 transition-opacity"
          >
            YEEZUS
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full text-[13px] font-sans font-medium tracking-[0.02em] border border-white/20 bg-white/[0.04] backdrop-blur-md text-white/80 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Back to site
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-8 md:px-16 max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-16 min-h-screen items-center">
        {/* Left column: Text & Trust */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
            Let's build <br />
            <span className="text-white/40">your future.</span>
          </h1>
          <p className="text-lg text-white/60 max-w-md font-light mb-12">
            Schedule a brief discovery call with our team to discuss your project, 
            timeline, and how we can engineer a permanent solution for your business.
          </p>
          
          <div className="space-y-6">
            <div className="p-6 border border-white/10 rounded-2xl bg-white/[0.02]">
              <h3 className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-2">Email</h3>
              <a href="mailto:yeezus196@gmail.com" className="text-lg hover:text-white/80 transition-colors">
                yeezus196@gmail.com
              </a>
            </div>
            <div className="p-6 border border-white/10 rounded-2xl bg-white/[0.02]">
              <h3 className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-2">WhatsApp</h3>
              <a href="https://wa.me/923342276722" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-white/80 transition-colors">
                +92 334 2276722
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right column: Calendly Embed Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-[1.5] bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden min-h-[600px] w-full flex items-center justify-center relative"
        >
          {mounted ? (
            <div className="w-full h-full p-2 absolute inset-0">
               {/* 
                 Replace the URL below with your actual Calendly/Cal.com embed URL. 
                 Example: https://calendly.com/your-name/30min 
               */}
              <iframe 
                src="https://calendly.com/" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                title="Schedule a meeting"
                className="rounded-2xl"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
          ) : (
            <div className="animate-pulse text-white/30 uppercase tracking-widest text-sm font-semibold">
              Loading Calendar...
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
