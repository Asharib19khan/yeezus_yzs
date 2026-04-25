'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import LeatherGasShader from './LeatherGasShader';

// ─────────────────────────────────────────────
// DATA
import { SERVICES } from '@/data/services';

// ─────────────────────────────────────────────
// CARD & CANVAS DIMENSIONS
// Cards are 480 × 300 px (scaled up 15-20%)
// Canvas is 3600x3600 for a massive 360-degree spread.
// ─────────────────────────────────────────────
const CARD_W = 480;
const CARD_H = 300;
const CANVAS_W = 3600;
const CANVAS_H = 3600;

const CX = CANVAS_W / 2 - CARD_W / 2;
const CY = CANVAS_H / 2 - CARD_H / 2;

// 360-Degree Radial Layout from exact dead-center
const CARD_PLACEMENTS: { x: number; y: number }[] = [
  { x: CX,              y: CY },              // 01 Center
  { x: CX + 600,        y: CY - 350 },        // 02 Top Right
  { x: CX - 650,        y: CY - 200 },        // 03 Top Left
  { x: CX + 200,        y: CY + 500 },        // 04 Bottom Center-Right
  { x: CX - 550,        y: CY + 450 },        // 05 Bottom Left
  { x: CX + 750,        y: CY + 250 },        // 06 Middle Right
  { x: CX - 250,        y: CY - 600 },        // 07 Top Center-Left
];

// ─────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────
interface CoreServicesProps {
  onOrderClick: () => void;
}



// ─────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────
function ServiceCard({
  service,
  placement,
  onOrderClick,
  highlighted,
}: {
  service: (typeof SERVICES)[0];
  placement: { x: number; y: number };
  onOrderClick: () => void;
  highlighted?: boolean;
}) {
  // Discriminate click vs drag: if pointer moves > threshold before
  // pointerup it counts as a drag and the click is suppressed.
  const DRAG_THRESHOLD = 5;
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointerDownPos.current) return;
    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);
    if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) isDragging.current = true;
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onOrderClick();
    },
    [onOrderClick]
  );

  return (
    <motion.div
      className="absolute group"
      style={{ left: placement.x, top: placement.y, width: CARD_W }}
      initial={{ opacity: 0, y: 24, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: service.id * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        handlePointerDown(e);
      }}
      onPointerMove={(e) => {
        e.stopPropagation();
        handlePointerMove(e);
      }}
    >
      {/* Card shell */}
      <div
        className="relative flex flex-col justify-between bg-[#090909] border rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-white/30"
        style={{
          minHeight: CARD_H,
          borderColor: highlighted ? 'rgba(255,0,136,0.7)' : 'rgba(255,255,255,0.05)',
          boxShadow: highlighted
            ? '0 0 40px 8px rgba(255,0,136,0.35), 0 0 80px 16px rgba(255,0,136,0.15)'
            : undefined,
        }}
      >
        {/* Top magenta accent bar — animates width on hover */}
        <div className="absolute top-0 left-0 h-[2px] w-0 bg-brand-magenta group-hover:w-full transition-all duration-500 ease-out" />

        {/* Background glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 0%, rgba(255,0,136,0.06) 0%, transparent 65%)',
          }}
        />

        {/* Corner index */}
        <span className="absolute top-5 right-5 font-mono text-[10px] tracking-[0.35em] text-white/12 select-none">
          {service.index}
        </span>

        {/* Inner content */}
        <div className="p-8 pb-4">
          {/* Category tag */}
          <span className="inline-block font-mono text-[9px] tracking-[0.4em] text-brand-magenta/70 uppercase mb-4">
            {service.tag}
          </span>

          {/* Title - expensive and modern typography */}
          <h3 className="font-sans font-light text-2xl text-white/95 tracking-wide leading-tight mb-4 group-hover:text-white transition-colors duration-300">
            {service.title}
          </h3>

          {/* Divider */}
          <div className="w-8 h-px bg-white/15 mb-4 group-hover:w-16 group-hover:bg-brand-magenta/50 transition-all duration-400" />

          {/* Description */}
          <p className="text-white/40 font-sans text-sm font-light leading-relaxed group-hover:text-white/70 transition-colors duration-300">
            {service.desc}
          </p>
        </div>

        {/* CTA - no brackets, modern */}
        <div className="px-8 pb-8 pt-4">
          <button
            onClick={handleClick}
            className="w-full py-3 border border-white/15 text-white/50 font-sans font-medium text-[13px] tracking-wide
                       hover:bg-white hover:text-brand-void hover:border-white
                       transition-all duration-300 cursor-pointer rounded-full"
          >
            Place your order
          </button>
        </div>

        {/* Bottom left accent dot */}
        <div className="absolute bottom-3 left-5 w-[5px] h-[5px] rounded-full bg-white/10 group-hover:bg-brand-magenta/60 transition-colors duration-500" />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
export default function CoreServices({ onOrderClick }: CoreServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  // Raw motion values (managed natively by framer-motion drag)
  const canvasX = useMotionValue(0);
  const canvasY = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      canvasX.set((w - CANVAS_W) / 2);
      canvasY.set((h - CANVAS_H) / 2);
    }
  }, [canvasX, canvasY]);

  // Listen for search navigation events
  useEffect(() => {
    const handler = (e: Event) => {
      const { id, section } = (e as CustomEvent).detail;
      if (section !== 'core') return;

      // Find card index (SERVICES is 0-indexed, id is 1-based)
      const cardIdx = SERVICES.findIndex((s) => s.id === id);
      if (cardIdx === -1) return;

      const placement = CARD_PLACEMENTS[cardIdx];
      if (!placement) return;

      // Scroll section into view
      const section_el = document.getElementById('services');
      if (section_el) section_el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Animate canvas so the card is centered in the viewport aperture
      setTimeout(() => {
        if (!containerRef.current) return;
        const cw = containerRef.current.clientWidth;
        const ch = containerRef.current.clientHeight;
        // Target offset: center of aperture minus card's canvas position minus half card width
        const targetX = cw / 2 - (placement.x + CARD_W / 2);
        const targetY = ch / 2 - (placement.y + CARD_H / 2);
        canvasX.set(targetX);
        canvasY.set(targetY);
      }, 400);

      // Highlight the card
      setHighlightedId(id);
      // Remove glow after 3 seconds
      setTimeout(() => setHighlightedId(null), 3000);
    };

    window.addEventListener('highlight-service', handler);
    return () => window.removeEventListener('highlight-service', handler);
  }, [canvasX, canvasY]);

  return (
    <section id="services" className="relative w-full bg-brand-void py-24 z-20">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">

        {/* SERVICES heading centered, What we do on the left */}
        <div className="relative flex items-center justify-center mb-16">
          <p className="absolute left-0 font-sans text-[11px] font-semibold tracking-[0.35em] text-white/25 uppercase">
            What we do
          </p>
          <h2 className="text-6xl md:text-8xl font-heading font-black uppercase tracking-tighter text-white leading-none">
            Services
          </h2>
        </div>

        {/* Section sub-header */}
        <div className="flex items-baseline justify-between mb-10">
          <h3 className="text-3xl md:text-5xl font-heading text-brand-slate tracking-widest uppercase">
            CORE
          </h3>
        </div>


        {/* ── 16:9 Aperture ── */}
        <div
          ref={containerRef}
          className="relative w-full bg-brand-void overflow-hidden"
          style={{
            aspectRatio: '16 / 9',
            cursor: dragging ? 'grabbing' : 'grab',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse at 50% 50%, black 50%, transparent 100%)',
          }}
        >
          {/* ── Layer 1: WebGL Leather Gas Shader ── */}
          <LeatherGasShader />

          {/* ── Layer 2: Draggable canvas ── */}
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragTransition={{
              bounceStiffness: 200,
              bounceDamping: 30,
              power: 0.3,
              timeConstant: 260,
            }}
            style={{
              x: canvasX,
              y: canvasY,
              width: CANVAS_W,
              height: CANVAS_H,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 10,
            }}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
          >
            {/* Blueprint grid */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="cs-grid"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 80 0 L 0 0 0 80"
                    fill="none"
                    stroke="rgba(255,255,255,0.025)"
                    strokeWidth="0.5"
                  />
                </pattern>
                {/* Accent cross-hairs at intersections */}
                <pattern
                  id="cs-dots"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="0" cy="0" r="1" fill="rgba(255,255,255,0.06)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cs-grid)" />
              <rect width="100%" height="100%" fill="url(#cs-dots)" />
            </svg>

            {/* Cards */}
            {SERVICES.filter(s => s.section === 'core').map((svc, idx) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                placement={CARD_PLACEMENTS[idx]}
                onOrderClick={onOrderClick}
                highlighted={highlightedId === svc.id}
              />
            ))}
          </motion.div>

          {/* ── Overlay: top-left instruction ── */}
          <div className="absolute top-4 left-5 z-20 pointer-events-none select-none flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-brand-magenta/60 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">
              DRAG TO EXPLORE PROTOCOLS
            </span>
          </div>


        </div>
      </div>
    </section>
  );
}
