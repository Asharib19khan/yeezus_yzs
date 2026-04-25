'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-void/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-[90%] max-w-lg bg-brand-void border-2 border-brand-white p-8 md:p-12 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-slate hover:text-brand-white font-heading text-xl transition-colors"
            >
              [ X ]
            </button>
            
            <h2 className="text-3xl font-black font-heading tracking-widest uppercase mb-8 text-brand-white">
              INITIALIZE CONTACT
            </h2>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="font-heading text-brand-slate tracking-widest text-sm uppercase">IDENTIFIER</label>
                <input 
                  type="text" 
                  className="bg-transparent border-b border-brand-slate/30 text-brand-white py-2 focus:outline-none focus:border-brand-white transition-colors" 
                  placeholder="NAME / ALIAS"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-heading text-brand-slate tracking-widest text-sm uppercase">COMMS LINK</label>
                <input 
                  type="email" 
                  className="bg-transparent border-b border-brand-slate/30 text-brand-white py-2 focus:outline-none focus:border-brand-white transition-colors" 
                  placeholder="EMAIL"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-heading text-brand-slate tracking-widest text-sm uppercase">DIRECTIVE</label>
                <textarea 
                  rows={4}
                  className="bg-transparent border-b border-brand-slate/30 text-brand-white py-2 focus:outline-none focus:border-brand-white transition-colors resize-none" 
                  placeholder="PROJECT DETAILS"
                />
              </div>
              <button 
                type="submit"
                className="mt-6 w-full py-4 bg-brand-white text-brand-void font-heading font-black tracking-widest uppercase hover:bg-brand-magenta hover:text-brand-white transition-colors duration-300"
              >
                [ TRANSMIT ]
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
