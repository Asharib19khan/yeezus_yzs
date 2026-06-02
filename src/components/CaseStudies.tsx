'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CaseStudies() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-brand-void z-20">
      <div className="max-w-screen-xl mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Case Studies
            </h2>
            <p className="text-white/50 mt-4 max-w-md">
              Proof that our systems deliver exponential growth and permanent results.
            </p>
          </div>
          <Link 
            href="/book"
            className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-semibold tracking-wide hover:bg-white/10 transition-all active:scale-95 text-center"
          >
            Get in touch
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Placeholder Case Study Cards */}
          {[1, 2].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-video bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 flex flex-col justify-end hover:bg-white/[0.04] transition-colors group cursor-pointer"
            >
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white/80 transition-colors">
                Project Name {i}
              </h3>
              <p className="text-white/40">Short description of the problem solved.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
