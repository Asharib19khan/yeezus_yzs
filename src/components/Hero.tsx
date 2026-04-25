'use client';

import { motion } from 'framer-motion';
import LeatherGasShader from './LeatherGasShader';

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-brand-void z-20 px-8 py-24">
      <div className="max-w-screen-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-12"
        >
          <h1 className="text-7xl md:text-9xl font-extrabold uppercase leading-[0.85] tracking-tighter text-brand-white">
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
          
          <div className="max-w-2xl">
            <h2 className="text-lg md:text-xl font-sans font-light tracking-wide text-brand-slate leading-relaxed">
              You build the future; we make it permanent. We refine your complexity into pure, powerful logic so you can stop managing the "how" and start owning the "what." The standard for your success has been reset.
            </h2>
          </div>

          <motion.button
            onClick={onContactClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 px-12 py-6 bg-transparent border-2 border-brand-white text-brand-white font-heading font-bold text-xl uppercase tracking-widest hover:bg-brand-white hover:text-brand-void transition-colors duration-300"
          >
            [ CONTACT US ]
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
