'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import LeatherGasShader from './LeatherGasShader';

// ─── Data ──────────────────────────────────────────────────────────────────────
const PERIPHERALS = [
  {
    id: 'A',
    title: '[ VISUAL CREATIVE STUDIO ]',
    desc: 'Picture Design & Editing, Canva Design, and Basic Branding Kits.',
    accent: 'from-violet-900/60 via-fuchsia-900/40 to-slate-900/80',
    glyphColor: 'text-fuchsia-300/70',
  },
  {
    id: 'B',
    title: '[ DIGITAL ASSETS & DECK ]',
    desc: 'Thumbnails, Posters, Social Media/IG Stories, PowerPoint, and Word.',
    accent: 'from-blue-900/60 via-indigo-900/40 to-slate-900/80',
    glyphColor: 'text-blue-300/70',
  },
  {
    id: 'C',
    title: '[ SEARCH & CONTENT OPS ]',
    desc: 'SEO Basics, Keyword Research, and Content Formatting.',
    accent: 'from-emerald-900/60 via-teal-900/40 to-slate-900/80',
    glyphColor: 'text-emerald-300/70',
  },
  {
    id: 'D',
    title: '[ DATA & VIRTUAL ADMIN ]',
    desc: 'Data Entry, Web Research, File Conversion (PDF ↔ Word/Excel), and Copy-Paste.',
    accent: 'from-amber-900/60 via-orange-900/40 to-slate-900/80',
    glyphColor: 'text-amber-300/70',
  },
  {
    id: 'E',
    title: '[ CLIENT & E-COM OPS ]',
    desc: 'Product Listing (Amazon/Daraz), Chat/Customer Support, and Email Handling.',
    accent: 'from-rose-900/60 via-pink-900/40 to-slate-900/80',
    glyphColor: 'text-rose-300/70',
  },
];

// ─── FourPointStar Glyph (matches reference image) ───────────────────────────
function FourPointStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" />
    </svg>
  );
}

// ─── Orbital Card ─────────────────────────────────────────────────────────────
// Mirrors the reference: soft rounded corners, gradient header block, bold title,
// muted description, thin border — adapted to dark brutalist palette.
interface OrbitalCardProps {
  sys: (typeof PERIPHERALS)[number];
  orbitAngleDeg: number; // live rotating angle in degrees
  radius: number;
  onOrderClick: () => void;
}

function OrbitalCard({ sys, orbitAngleDeg, radius, onOrderClick }: OrbitalCardProps) {
  // Convert to radians and offset by -90° so card A starts at the top
  const angleRad = ((orbitAngleDeg - 90) * Math.PI) / 180;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 20,
      }}
      whileHover={{ scale: 1.04, zIndex: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/*
        ── CARD ANATOMY (from reference image) ──────────────────────────────
        • bg: near-black with ultra-low white tint → bg-[#111111]/90
        • backdrop-blur: xl  (frosted over shader)
        • border: 1px, white/8  (ultra-thin glass hairline)
        • border-radius: rounded-[20px]  (matches ref's soft corners ~18-22px)
        • shadow: heavy black drop to float above background
        • width: 260px  (tight, portrait-ish — matches ref proportions)
        ─────────────────────────────────────────────────────────────────────
      */}
      <div
        className="
          group w-[260px] flex flex-col overflow-hidden cursor-default
          bg-[#111111]/90 backdrop-blur-xl
          border border-white/[0.08]
          rounded-[20px]
          shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_0_0.5px_rgba(255,255,255,0.04)]
          transition-all duration-500
          hover:border-white/[0.18] hover:shadow-[0_32px_80px_rgba(0,0,0,0.85),0_0_0_0.5px_rgba(255,255,255,0.1)]
        "
      >
        {/*
          ── HEADER GRADIENT BLOCK ───────────────────────────────────────────
          Reference: upper ~45% of card = a soft mesh gradient with star glyph
          → bg-gradient matching each card's accent palette
          → inner rounded to match outer card radius minus border offset
          → star glyph centered, same as reference's 4-pointed diamond
        */}
        <div
          className={`
            relative w-full aspect-[4/3] bg-gradient-to-br ${sys.accent}
            rounded-t-[19px] flex items-center justify-center overflow-hidden
          `}
        >
          {/* Noise texture overlay for the matte/grain feel of ref image */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
              backgroundSize: '256px 256px',
            }}
          />

          {/* Radial glow behind the star */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full blur-2xl opacity-30 bg-current ${sys.glyphColor}`} />
          </div>

          {/* 4-pointed star — identical geometry to reference's diamond glyph */}
          <FourPointStar className={`relative z-10 w-8 h-8 ${sys.glyphColor}`} />

          {/* Card ID badge — top-left corner label */}
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.25em] text-white/20 uppercase font-heading">
            SYS.{sys.id}
          </span>
        </div>

        {/*
          ── TEXT BODY ────────────────────────────────────────────────────────
          Reference: p-5 internal, name in large bold, subtitle in smaller muted
          → We mirror: p-5, title in tracking-tight font-black, desc in white/40
        */}
        <div className="flex flex-col flex-1 p-5 pt-4">
          {/* Title — matches reference's large bold name treatment */}
          <h3
            className="
              font-heading font-black text-[11px] tracking-[0.12em]
              text-white/90 uppercase leading-snug mb-2
              group-hover:text-white transition-colors duration-300
            "
          >
            {sys.title}
          </h3>

          {/* Divider — ultra-thin white/10 line (not in ref but reinforces brutalist grid) */}
          <div className="w-full h-px bg-white/[0.06] mb-3" />

          {/* Description — matches ref's small muted subtitle */}
          <p
            className="
              font-sans text-[11px] leading-relaxed text-white/40
              group-hover:text-white/60 transition-colors duration-300 flex-1
            "
          >
            {sys.desc}
          </p>

          {/*
            ── CTA BUTTON ───────────────────────────────────────────────────
            Sits flush at card bottom. Thin border, no fill by default.
            On hover: inverts to white background with dark text.
            Matches the reference's bottom-of-card action placement.
          */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOrderClick();
            }}
            className="
              mt-4 w-full py-2.5
              border border-white/[0.1]
              rounded-[8px]
              font-heading font-bold text-[9px] tracking-[0.25em] uppercase
              text-white/50
              transition-all duration-300
              hover:bg-white hover:text-brand-void hover:border-white hover:text-opacity-100
              group-hover:border-white/[0.2] group-hover:text-white/70
            "
          >
            [ PLACE YOUR ORDER ]
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Orbital Ring SVG track ───────────────────────────────────────────────────
function OrbitalRingTrack({ radius, opacity = 0.06 }: { radius: number; opacity?: number }) {
  const size = radius * 2 + 2; // +2 for stroke
  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <circle
        cx={radius + 1}
        cy={radius + 1}
        r={radius}
        fill="none"
        stroke={`rgba(255,255,255,${opacity})`}
        strokeWidth="1"
        strokeDasharray="4 8"
      />
    </svg>
  );
}

// ─── Connector Tether ─────────────────────────────────────────────────────────
// Draws a radial line from center to each card anchor — matches ORBIT-5-01-LITE tether geometry
function TetherLines({ radius, angleDeg }: { radius: number; angleDeg: number }) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  const ex = Math.cos(angleRad) * radius;
  const ey = Math.sin(angleRad) * radius;
  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: radius * 2 + 2,
        height: radius * 2 + 2,
        overflow: 'visible',
      }}
    >
      <line
        x1={radius + 1}
        y1={radius + 1}
        x2={radius + 1 + ex}
        y2={radius + 1 + ey}
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
      />
      {/* Anchor dot at card position */}
      <circle
        cx={radius + 1 + ex}
        cy={radius + 1 + ey}
        r="3"
        fill="rgba(255,255,255,0.15)"
      />
    </svg>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
interface PeripheralSystemsProps {
  onOrderClick: () => void;
}

export default function PeripheralSystems({ onOrderClick }: PeripheralSystemsProps) {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(380);
  const rotationRef = useRef(0);
  const [rotateDeg, setRotateDeg] = useState(0);
  const isPaused = useRef(false);

  // Responsive radius calculation
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const maxRadius = 380;
      const calculated = Math.min(window.innerWidth * 0.33, maxRadius);
      setRadius(Math.max(calculated, 170));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth continuous rotation — 1 full revolution per 60 seconds
  useAnimationFrame((_, delta) => {
    if (!isPaused.current) {
      rotationRef.current = (rotationRef.current + (delta / 60000) * 360) % 360;
      setRotateDeg(rotationRef.current);
    }
  });

  if (!mounted) return null;

  const innerTrackRadius = radius * 0.18; // small inner decorative ring
  const midTrackRadius = radius * 0.55;   // mid marker ring (ORBIT-5-01-LITE style)

  return (
    <section
      className="relative w-full bg-brand-void border-t border-white/5 overflow-hidden z-20"
      style={{ minHeight: '100vh' }}
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      {/* ── Shader Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 opacity-80">
        <LeatherGasShader />
      </div>

      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center pt-24 pb-8 pointer-events-none">
        <p className="font-heading text-[10px] tracking-[0.6em] text-white/25 uppercase mb-3">
          — MODULE 04 —
        </p>
        <h2 className="font-heading font-black text-3xl md:text-5xl tracking-tight text-white/90 uppercase">
          Peripheral Systems
        </h2>
        <div className="mt-4 w-16 h-px bg-white/10" />
        <p className="mt-4 font-sans text-sm text-white/30 tracking-wider max-w-xs text-center">
          Five operational nodes. Hover to pause orbit.
        </p>
      </div>

      {/* ── Orbital Stage ─────────────────────────────────────────────── */}
      <div
        className="relative mx-auto"
        style={{
          width: radius * 2 + 300,
          height: radius * 2 + 300,
          maxWidth: '100vw',
        }}
      >
        {/* ── Decorative concentric rings (ORBIT-5-01-LITE wireframes) ── */}
        <OrbitalRingTrack radius={innerTrackRadius} opacity={0.12} />
        <OrbitalRingTrack radius={midTrackRadius} opacity={0.05} />
        <OrbitalRingTrack radius={radius} opacity={0.08} />
        <OrbitalRingTrack radius={radius * 1.05} opacity={0.03} />

        {/* ── Center focal node ─────────────────────────────────────────── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Pulsing halo */}
            <motion.div
              className="absolute w-24 h-24 rounded-full border border-white/[0.06]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-16 h-16 rounded-full border border-white/[0.08]"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            {/* Center glyph */}
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.04] backdrop-blur-sm">
              <FourPointStar className="w-3 h-3 text-white/60" />
            </div>
          </div>
          <span className="mt-3 font-heading text-[9px] tracking-[0.5em] text-white/30 uppercase">
            PERIPHERAL.SYS
          </span>
        </div>

        {/* ── Tether lines (rotated with orbit) ───────────────────────── */}
        {PERIPHERALS.map((sys, idx) => {
          const baseAngle = (idx * 360) / PERIPHERALS.length;
          const liveAngle = baseAngle + rotateDeg;
          return (
            <TetherLines key={`tether-${sys.id}`} radius={radius} angleDeg={liveAngle} />
          );
        })}

        {/* ── Orbital Cards ────────────────────────────────────────────── */}
        {PERIPHERALS.map((sys, idx) => {
          const baseAngle = (idx * 360) / PERIPHERALS.length;
          const liveAngle = baseAngle + rotateDeg;
          return (
            <OrbitalCard
              key={sys.id}
              sys={sys}
              orbitAngleDeg={liveAngle}
              radius={radius}
              onOrderClick={onOrderClick}
            />
          );
        })}
      </div>

      {/* ── Bottom fade ───────────────────────────────────────────────── */}
      <div className="relative z-10 h-24 pointer-events-none" />
    </section>
  );
}
