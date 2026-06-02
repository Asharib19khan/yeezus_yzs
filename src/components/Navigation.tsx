'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navigation({ isVisible = true }: { isVisible?: boolean }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!isVisible) return null;

  return (
    <motion.nav 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 mix-blend-difference pointer-events-none"
    >
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center pointer-events-auto">

        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="text-3xl md:text-5xl font-black tracking-tighter uppercase select-none hover:opacity-80 transition-opacity focus:outline-none"
        >
          YEEZUS
        </button>

        {/* Nav buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToServices}
            className="
              px-5 py-2.5 rounded-full
              text-[13px] font-sans font-medium tracking-[0.02em]
              border border-white/20
              bg-white/[0.04] backdrop-blur-md
              text-white/80
              hover:bg-white hover:text-black hover:border-white
              transition-all duration-300
              focus:outline-none
            "
          >
            Services
          </button>

          <Link
            href="/book"
            className="
              px-5 py-2.5 rounded-full
              text-[13px] font-sans font-medium tracking-[0.02em]
              bg-white text-black
              hover:bg-white/85
              transition-all duration-300
              focus:outline-none
            "
          >
            Book a call
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
