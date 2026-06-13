'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmailGate({ onClose }: { onClose?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(0);

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

  useEffect(() => {
    // Show "HELLO," initially (step 0).
    // After 1.5s, show "YOU." (step 1).
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 1500);

    // After 3.5s total, hide the gate and proceed.
    const timer2 = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 800);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onClose]);

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
              <div className="flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-sm font-light uppercase tracking-[0.4em] text-white/50 mb-2"
                >
                  HELLO,
                </motion.span>
                
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none"
                    >
                      YOU.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
