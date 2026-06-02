'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalConversion() {
  return (
    <section className="relative w-full py-32 bg-brand-void flex items-center justify-center z-20 border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-[5rem] font-black uppercase leading-[0.9] tracking-tighter text-white mb-10"
        >
          Ready to scale? <br />
          <span className="text-white/40">Don't wait.</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link 
            href="/book"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:bg-white/90 transition-all active:scale-95"
          >
            Start your growth today
          </Link>
          <Link 
            href="/book"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold tracking-wide hover:bg-white/10 transition-all active:scale-95"
          >
            Work with us
          </Link>
        </motion.div>

        {/* Re-use logos in final conversion as requested */}
        <div className="mt-24">
          <p className="text-xs font-semibold tracking-[0.15em] text-white/30 uppercase mb-8">
            Join these amazing brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale scale-75 md:scale-100">
            {['Brand A', 'Brand B', 'Brand C', 'Brand D'].map((logo, i) => (
               <span key={i} className="text-lg md:text-xl font-bold uppercase tracking-widest text-white">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
