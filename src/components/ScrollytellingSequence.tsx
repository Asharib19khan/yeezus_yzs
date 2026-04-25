'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 80;
const DIR_PATH = '/yeezus_intro2/';

export default function ScrollytellingSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Framer Motion scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to frame index (0 to FRAME_COUNT - 1)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Centralized drawing function
  const drawFrame = (index: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (img && img.complete && img.naturalWidth > 0) {
      // Use native device pixel ratio for the perfect balance of extreme quality and 120fps smoothness
      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = canvasRef.current.width / dpr;
      const canvasHeight = canvasRef.current.height / dpr;
      
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const canvasAspectRatio = canvasWidth / canvasHeight;
      const imageAspectRatio = img.naturalWidth / img.naturalHeight;
      let renderableWidth, renderableHeight, xStart, yStart;

      if (imageAspectRatio < canvasAspectRatio) {
        renderableWidth = canvasWidth;
        renderableHeight = img.naturalHeight * (renderableWidth / img.naturalWidth);
        xStart = 0;
        yStart = (canvasHeight - renderableHeight) / 2;
      } else {
        renderableHeight = canvasHeight;
        renderableWidth = img.naturalWidth * (renderableHeight / img.naturalHeight);
        yStart = 0;
        xStart = (canvasWidth - renderableWidth) / 2;
      }
      
      // Draw the image without heavy canvas-level filters to guarantee 0 latency and 0 stutter
      ctx.drawImage(img, xStart * dpr, yStart * dpr, renderableWidth * dpr, renderableHeight * dpr);
    }
  };

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `${DIR_PATH}Walk_to_center_202604251228_${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        // Immediately draw the first frame when it loads so there's zero delay
        if (i === 0 && frameIndex.get() === 0) {
          drawFrame(0);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
      };
      
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
    setImages(loadedImages);
  }, []);

  // Scrub through the sequence
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const currentIndex = Math.min(Math.floor(latest), FRAME_COUNT - 1);
    drawFrame(currentIndex);
  });

  // Resize canvas handler to support high DPI (Ultra HD)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Use native DPR to ensure the hardware doesn't throttle
      const dpr = window.devicePixelRatio || 1;
      // Set actual physical size
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Set logical CSS size to scale it perfectly down, creating ultra-sharp aliasing
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Force CSS to use high-quality rendering algorithms
      canvas.style.imageRendering = 'high-quality';

      // Optional: Turn off image smoothing if you want pixel perfect sharp edges,
      // but typically you want it on for photography. We'll set it to high quality.
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Opacity blending at the end of the scroll (fade out sequence)
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-brand-void">
      {/* Sticky container for the visuals */}
      <motion.div 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden"
        style={{ opacity }}
      >
        
        {/* The Image Sequence Canvas - Filters applied via CSS for zero-latency GPU hardware acceleration */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-10 contrast-[1.05] saturate-[1.05]"
        />


      </motion.div>
    </div>
  );
}

