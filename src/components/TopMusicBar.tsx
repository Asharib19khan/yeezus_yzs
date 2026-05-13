'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLIST = [
  { title: "DAFT PUNK - ONE MORE TIME", src: "/audio/Daft Punk - One More Time.mp3" },
  { title: "FRANK OCEAN - PINK + WHITE", src: "/audio/Frank Ocean - Pink + White.mp3" },
  { title: "KANYE WEST - FLASHING LIGHTS", src: "/audio/Kanye West - Flashing Lights.mp3" },
  { title: "KANYE WEST - GOOD MORNING", src: "/audio/Kanye West - Good Morning.mp3" }
];

export default function TopMusicBar({ isVisible = true }: { isVisible?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastBackClickRef = useRef<number>(0);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Toggle play/pause
  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Audio playback failed:", err));
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    const isDoubleClick = now - lastBackClickRef.current < 400; // 400ms threshold for double click
    lastBackClickRef.current = now;

    if (isDoubleClick) {
      // Go to previous song
      setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    } else {
      // Restart current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        if (!isPlaying) {
          audioRef.current.play().catch(err => console.log(err));
          setIsPlaying(true);
        }
      }
    }
  };

  // Sync state when audio ends (auto-play next)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  // Handle track change playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload the new src
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Audio playback failed:", err));
      }
    }
  }, [currentTrackIndex, isPlaying]);

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex justify-center items-start"
    >
      {/* Hidden Audio Player */}
      <audio ref={audioRef} src={currentTrack.src} preload="none" loop={false} />
      {/* 
        We use a slightly larger invisible hover zone so the mouse doesn't 
        accidentally leave the component while it's animating/expanding 
      */}
      <div
        className="relative pt-4 pb-12 px-12 -mt-4 -mx-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            width: isHovered ? 340 : 80,
            height: isHovered ? 64 : 8,
            borderRadius: isHovered ? 20 : 9999,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1], // Custom cinematic easing
          }}
          className="relative bg-black overflow-hidden shadow-2xl flex items-center justify-center border border-white/10"
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Inner Content - Only visible when hovered */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute inset-0 flex items-center justify-between px-5"
              >
                {/* Left: Song Info */}
                <div className="flex flex-col overflow-hidden max-w-[140px]">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium">
                    Now Playing
                  </span>
                  {/* Marquee effect for long names */}
                  <div className="relative w-full overflow-hidden h-5 flex items-center">
                    <motion.div
                      animate={{ x: [0, -100, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: Math.max(8, currentTrack.title.length * 0.4),
                        ease: "linear",
                        repeatDelay: 2
                      }}
                      className="whitespace-nowrap font-sans text-sm font-semibold text-white tracking-wide flex gap-4"
                    >
                      <span>{currentTrack.title}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Right: Controls */}
                <div className="flex items-center gap-4">
                  {/* Back Button */}
                  <button onClick={handleBack} className="text-white/60 hover:text-white transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="19 20 9 12 19 4 19 20"></polygon>
                      <line x1="5" y1="19" x2="5" y2="5"></line>
                    </svg>
                  </button>

                  {/* Play/Pause Button */}
                  <button 
                    onClick={handlePlayPause}
                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                  >
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </button>

                  {/* Next Button */}
                  <button onClick={handleNext} className="text-white/60 hover:text-white transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 4 15 12 5 20 5 4"></polygon>
                      <line x1="19" y1="5" x2="19" y2="19"></line>
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
