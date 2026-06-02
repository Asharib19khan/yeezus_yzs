'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  layoutId: string;
}

export default function BookMeetingModal({ isOpen, onClose, layoutId }: BookMeetingModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="bam-backdrop"
            className="fixed inset-0 z-[998] bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none px-4">
            <motion.div
              layoutId={layoutId}
              className="pointer-events-auto w-full md:w-[680px] rounded-3xl overflow-hidden relative"
              style={{
                boxShadow: '0 40px 120px rgba(0,0,0,0.95)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* ── Deep black animated background ─────────────────── */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {/* True black base */}
                <div className="absolute inset-0" style={{ background: '#080808' }} />

                {/* Drift blob 1 — dark charcoal */}
                <motion.div
                  className="absolute inset-[-40%]"
                  style={{
                    background:
                      'radial-gradient(ellipse 75% 55% at 25% 55%, rgba(30,30,30,0.9) 0%, transparent 70%)',
                  }}
                  animate={{ x: ['0%', '10%', '0%'], y: ['0%', '7%', '0%'] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Drift blob 2 — slightly lighter */}
                <motion.div
                  className="absolute inset-[-40%]"
                  style={{
                    background:
                      'radial-gradient(ellipse 65% 50% at 75% 35%, rgba(20,20,20,0.85) 0%, transparent 65%)',
                  }}
                  animate={{ x: ['0%', '-8%', '0%'], y: ['0%', '-5%', '0%'] }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Drift blob 3 — subtle silver shimmer */}
                <motion.div
                  className="absolute inset-[-40%]"
                  style={{
                    background:
                      'radial-gradient(ellipse 55% 45% at 55% 75%, rgba(255,255,255,0.02) 0%, transparent 60%)',
                  }}
                  animate={{ x: ['0%', '5%', '-4%', '0%'], y: ['0%', '-8%', '3%', '0%'] }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Noise grain */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                  backgroundSize: '256px 256px',
                }}
              />

              {/* Top border line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12">

                {/* Close */}
                <motion.button
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center border border-white/10 rounded-full text-white/30 text-xs hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all duration-200"
                >
                  ✕
                </motion.button>

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-heading font-black text-4xl md:text-5xl uppercase leading-[0.9] tracking-tight text-white mb-3">
                    Believe on Actions<br />over Words?
                  </h2>
                  <p className="font-sans text-base font-semibold text-white/70 tracking-wide mb-10">
                    Book a meeting with us.
                  </p>
                </motion.div>

                <div className="w-full h-px bg-white/[0.08] mb-8" />

                {/* Comm Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href="mailto:yeezus196@gmail.com"
                    className="group flex flex-col gap-1.5 p-5 border border-white/[0.08] rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
                  >
                    <span className="font-sans font-semibold text-[11px] tracking-[0.12em] text-white/40 uppercase">
                      Email us
                    </span>
                    <span className="font-sans text-[13px] text-white/65 group-hover:text-white transition-colors duration-200 break-all">
                      yeezus196@gmail.com
                    </span>
                  </a>

                  <a
                    href="https://wa.me/923342276722"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1.5 p-5 border border-white/[0.08] rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
                  >
                    <span className="font-sans font-semibold text-[11px] tracking-[0.12em] text-white/40 uppercase">
                      WhatsApp
                    </span>
                    <span className="font-sans text-[13px] text-white/65 group-hover:text-white transition-colors duration-200">
                      +92 334 2276722
                    </span>
                  </a>
                </motion.div>

                {/* LinkedIn */}
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-sans text-[11px] tracking-[0.12em] text-white/35 uppercase font-semibold mb-1">
                    Connect with us on LinkedIn
                  </p>
                  {[
                    { name: 'Avisha Rizwan', href: 'https://www.linkedin.com/in/avisha-rizwan/' },
                    { name: 'Asharib Khan', href: 'https://www.linkedin.com/in/asharib-khan-435230301/' },
                  ].map((a) => (
                    <a
                      key={a.name}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between px-6 py-4 border border-white/[0.08] rounded-xl bg-white/[0.04] hover:bg-white hover:border-white transition-all duration-300"
                    >
                      <span className="font-sans font-semibold text-[14px] text-white/80 group-hover:text-black transition-colors duration-300">
                        {a.name}
                      </span>
                      <span className="font-sans text-sm text-white/25 group-hover:text-black group-hover:translate-x-1 transition-all duration-300">
                        →
                      </span>
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
