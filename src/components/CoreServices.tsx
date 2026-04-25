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
// ─────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    title: '[ AI & MACHINE LEARNING ]',
    desc: 'RAG Systems, AI/ML Infrastructure, Custom Model Training.',
    index: '01',
    tag: 'INTELLIGENCE',
  },
  {
    id: 2,
    title: '[ SYSTEMIC BACKEND & DB ]',
    desc: 'Python, C++, C#, SQL, NoSQL, MariaDB, and Access Architectures.',
    index: '02',
    tag: 'ARCHITECTURE',
  },
  {
    id: 3,
    title: '[ FULL-STACK & WEB ENG ]',
    desc: 'React, JavaScript, HTML5/CSS3, Landing Pages, and Responsive Web Design.',
    index: '03',
    tag: 'ENGINEERING',
  },
  {
    id: 4,
    title: '[ NATIVE APP ECOSYSTEMS ]',
    desc: 'Flutter, Android App Development, and High-Performance Mobile UI.',
    index: '04',
    tag: 'DEPLOYMENT',
  },
  {
    id: 5,
    title: '[ ELITE SECURITY & DEBUG ]',
    desc: 'Ethical Hacking, App Debugging, and System Fortification.',
    index: '05',
    tag: 'SECURITY',
  },
  {
    id: 6,
    title: '[ 3D & BRUTALIST UI ]',
    desc: '3D Figure Designing, Website Customization, and UI Implementation.',
    index: '06',
    tag: 'DESIGN',
  },
  {
    id: 7,
    title: '[ HARDWARE & IOT LOGIC ]',
    desc: 'Arduino-Based Projects and Embedded System Engineering.',
    index: '07',
    tag: 'HARDWARE',
  },
];

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
}: {
  service: (typeof SERVICES)[0];
  placement: { x: number; y: number };
  onOrderClick: () => void;
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
        className="relative flex flex-col justify-between bg-[#090909] border border-white/5 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden transition-all duration-500 group-hover:border-white/30"
        style={{ minHeight: CARD_H }}
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

          {/* Title */}
          <h3 className="font-heading font-black text-[17px] text-white/90 tracking-widest uppercase leading-tight mb-4 group-hover:text-white transition-colors duration-300">
            {service.title}
          </h3>

          {/* Divider */}
          <div className="w-8 h-px bg-white/15 mb-4 group-hover:w-16 group-hover:bg-brand-magenta/50 transition-all duration-400" />

          {/* Description */}
          <p className="text-white/40 font-sans text-[13px] leading-relaxed group-hover:text-white/60 transition-colors duration-300">
            {service.desc}
          </p>
        </div>

        {/* CTA */}
        <div className="px-8 pb-8 pt-4">
          <button
            onClick={handleClick}
            className="w-full py-[11px] border border-white/15 text-white/35 font-heading font-bold text-[11px] tracking-[0.3em] uppercase
                       hover:bg-white hover:text-brand-void hover:border-white hover:tracking-[0.35em]
                       transition-all duration-300 cursor-pointer"
          >
            [ PLACE YOUR ORDER ]
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

  return (
    <section className="relative w-full bg-brand-void py-24 z-20">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-heading text-brand-slate tracking-widest uppercase">
            CORE SERVICES
          </h2>
          <span className="hidden md:block font-mono text-[11px] tracking-[0.3em] text-white/20 uppercase">
            PROTOCOL MATRIX / 07
          </span>
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
            {SERVICES.map((svc, idx) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                placement={CARD_PLACEMENTS[idx]}
                onOrderClick={onOrderClick}
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
