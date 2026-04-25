'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LaunchSequence() {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Lock scroll when video is playing
    if (isPlaying) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup in case component unmounts unexpectedly
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          className="fixed inset-0 w-full h-full z-[100] bg-brand-void pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }} // Smoother custom cubic-bezier
          style={{ willChange: 'opacity', WebkitTransform: 'translateZ(0)' }}
        >
          <video
            src="/start.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            className="w-full h-full object-cover pointer-events-none"
            style={{ 
              willChange: 'transform',
              WebkitTransform: 'scale(1.09) translateZ(0)',
              transform: 'scale(1.09) translateZ(0)',
              transformOrigin: 'center center',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              WebkitPerspective: 1000,
              perspective: 1000
            }}
            onEnded={() => setIsPlaying(false)}
            onError={() => setIsPlaying(false)} // Fallback in case video fails
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
