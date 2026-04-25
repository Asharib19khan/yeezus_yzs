'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EmailGate({ onClose }: { onClose?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;
    setIsSubmitting(true);

    const { error } = await supabase
      .from('logins')
      .insert({ email: email.trim() });

    if (error) {
      console.error('Supabase insert error:', error.message);
    }

    // Always proceed to site regardless of DB outcome
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 800);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Aggressively hide all scrollbars globally while this gate is active */}
          <style dangerouslySetInnerHTML={{ __html: `
            html, body { 
              overflow: hidden !important; 
              scrollbar-width: none !important;
              -ms-overflow-style: none !important;
            }
            ::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
              opacity: 0 !important;
            }
          `}} />
          
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed -inset-10 z-[90] flex items-center justify-center bg-black/60"
          style={{
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md px-8 flex flex-col items-center text-center"
          >
            <div className="flex flex-col items-start self-start mb-8">
              <span className="text-sm font-light uppercase tracking-[0.4em] text-white/50 mb-1">
                Greetings,
              </span>
              <span className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                YOU.
              </span>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
              <div className="w-full relative group">
                {/* Glow effect behind input */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative w-full bg-black/50 border border-white/20 rounded-full py-4 px-6 text-center text-white placeholder:text-white/30 outline-none focus:border-white/60 transition-colors duration-300 font-sans text-lg shadow-2xl"
                />
              </div>

              <p className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
                For our records only. <br/>We do not send spam or newsletters.
              </p>

              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="group relative overflow-hidden rounded-full px-12 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
              >
                {/* Button Shine Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 20%, rgba(0,0,0,0.1) 50%, transparent 80%)',
                  }}
                  animate={isSubmitting ? { x: ['-100%', '200%'] } : { x: '-100%' }}
                  transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                />
                <span className="relative z-10">
                  {isSubmitting ? 'VERIFYING...' : 'YEEZUS'}
                </span>
              </button>
            </form>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
