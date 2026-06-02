'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import LeatherGasShader from './LeatherGasShader';
import BookMeetingModal from './BookMeeting';
import SearchBar from './SearchBar';

const MORPH_ID = 'bam-morph-surface';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 35 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left - r.width / 2) * 0.15);
    mouseY.set((e.clientY - r.top - r.height / 2) * 0.15);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Nav "Book a Meeting" button opens this modal
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('hero-open-book-meeting', handler);
    return () => window.removeEventListener('hero-open-book-meeting', handler);
  }, []);

  return (
    <>
      <section className="relative w-full min-h-screen flex items-center bg-brand-void z-20 px-8 md:px-16 py-24">
        <div className="max-w-screen-xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-14"
          >
            {/* ── Row 1: Headline left + Button right ─────────────────── */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              {/* Headline */}
              <h1 className="text-7xl md:text-[clamp(5rem,9vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-tighter text-white flex-shrink-0">
                EVERYTHING <br />
                ELSE IS A <br />
                <span className="relative inline-block mt-2 md:mt-4">
                  <span className="absolute inset-0 z-0 overflow-hidden rounded-sm">
                    <LeatherGasShader />
                  </span>
                  <span className="relative z-10 bg-brand-void text-white mix-blend-darken block px-1 -mx-1">
                    DRAFT.
                  </span>
                </span>
              </h1>

              {/* ── Button & Search Container ─────────────────────── */}
              <div className="flex flex-col items-end justify-center flex-1 w-full max-w-[280px]">
                <AnimatePresence>
                  {!isOpen && (
                    <motion.div
                      layoutId={MORPH_ID}
                      ref={btnRef}
                      style={{ x: springX, y: springY }}
                      onMouseMove={onMouseMove}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={onMouseLeave}
                      onClick={() => setIsOpen(true)}
                      className="cursor-pointer select-none w-full flex justify-end"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.88 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Outer glow — only on hover */}
                      <motion.div
                        className="absolute -inset-3 rounded-full pointer-events-none"
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          background: isHovered
                            ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)'
                            : 'none',
                        }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Pill */}
                      <div
                        className="relative overflow-hidden rounded-full"
                        style={{
                          padding: '1px',
                          background: isHovered
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                          transition: 'background 0.4s ease',
                        }}
                      >
                        <div
                          className="relative overflow-hidden rounded-full flex items-center gap-3 px-11 py-6"
                          style={{
                            background: isHovered
                              ? 'rgba(255,255,255,1)'
                              : 'rgba(10,10,10,0.85)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            transition: 'background 0.45s cubic-bezier(0.76,0,0.24,1)',
                          }}
                        >
                          {/* Shimmer streak on hover */}
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background:
                                'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.35) 50%, transparent 80%)',
                            }}
                            animate={isHovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                          />

                          {/* Text */}
                          <motion.span
                            className="relative z-10 text-[17px] font-sans font-medium tracking-[0.01em] whitespace-nowrap"
                            animate={{
                              color: isHovered ? '#000000' : 'rgba(255,255,255,0.90)',
                            }}
                            transition={{ duration: 0.35 }}
                          >
                            Book a Meeting
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Search Bar directly beneath the button */}
                <div className="w-full flex justify-end">
                  <SearchBar />
                </div>
              </div>
            </div>

            {/* ── Row 2: Body copy ─────────────────────────────────────── */}
            <div className="max-w-xl">
              <p className="text-base md:text-lg font-sans font-light tracking-wide text-white/45 leading-relaxed">
                You build the future; we make it permanent. We refine your complexity into pure,
                powerful logic so you can stop managing the &quot;how&quot; and start owning the
                &quot;what.&quot; The standard for your success has been reset.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <BookMeetingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        layoutId={MORPH_ID}
      />
    </>
  );
}
