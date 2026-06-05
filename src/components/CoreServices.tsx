'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  useMotionValue,
} from 'framer-motion';
import { useInView } from 'motion/react';
import { useRouter } from 'next/navigation';
import type { IconType } from 'react-icons';
import {
  FaArrowRight,
  FaBullhorn,
  FaChartPie,
  FaCode,
  FaCut,
  FaFilter,
  FaLaptop,
  FaMicrochip,
  FaMobileAlt,
  FaPaintBrush,
  FaPenNib,
  FaPlay,
  FaProjectDiagram,
  FaRobot,
  FaSearch,
  FaSeedling,
  FaThLarge,
  FaUser,
  FaVideo,
} from 'react-icons/fa';
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

const SERVICE_CATEGORIES = [
  {
    title: 'Product & AI',
    label: 'SYSTEM 01',
    ids: [1, 2, 3, 4, 7],
    accent: 'from-brand-magenta/45 via-blue-500/25 to-white/5',
  },
  {
    title: 'Growth',
    label: 'SYSTEM 02',
    ids: [10, 12],
    accent: 'from-blue-500/45 via-cyan-300/20 to-white/5',
  },
  {
    title: 'Creative',
    label: 'SYSTEM 03',
    ids: [6, 8, 9],
    accent: 'from-brand-magenta/50 via-fuchsia-400/20 to-white/5',
  },
  {
    title: 'Data & Intelligence',
    label: 'SYSTEM 04',
    ids: [5, 11],
    accent: 'from-violet-500/35 via-blue-500/25 to-white/5',
  },
];

const SERVICE_LIST_GROUPS: {
  title: string;
  items: {
    title: string;
    desc: string;
    Icon: IconType;
    glow: string;
  }[];
}[] = [
  {
    title: 'Growth',
    items: [
      {
        title: 'Paid Social',
        desc: 'Acquisition and retargeting across Meta, TikTok, Snapchat, Reddit, X, LinkedIn, and more.',
        Icon: FaBullhorn,
        glow: 'from-amber-300/20 via-white/5 to-transparent',
      },
      {
        title: 'Paid Search',
        desc: 'Search, Shopping, YouTube, and Performance Max on proven structures.',
        Icon: FaSearch,
        glow: 'from-zinc-300/16 via-white/5 to-transparent',
      },
      {
        title: 'App Marketing',
        desc: 'Apple Search Ads, Google App Campaigns, and in-app network campaigns for efficient UA.',
        Icon: FaMobileAlt,
        glow: 'from-blue-500/22 via-white/5 to-transparent',
      },
      {
        title: 'Display & Programmatic',
        desc: 'Programmatic display, OOH/DOOH, and cross-network campaigns at scale.',
        Icon: FaThLarge,
        glow: 'from-cyan-300/18 via-white/5 to-transparent',
      },
      {
        title: 'Influencer Marketing',
        desc: 'Creator sourcing, negotiation, and campaign management.',
        Icon: FaUser,
        glow: 'from-orange-400/18 via-white/5 to-transparent',
      },
      {
        title: 'Clipping',
        desc: 'Long-form content repurposed into short-form for TikTok, Reels, and Shorts.',
        Icon: FaCut,
        glow: 'from-rose-300/16 via-white/5 to-transparent',
      },
      {
        title: 'Organic Social',
        desc: 'Content calendars, community, and platform-native strategy.',
        Icon: FaBullhorn,
        glow: 'from-brand-magenta/22 via-white/5 to-transparent',
      },
      {
        title: 'Growth Strategy',
        desc: 'Go-to-market planning, channel strategy, and growth roadmaps backed by data.',
        Icon: FaSeedling,
        glow: 'from-emerald-400/18 via-white/5 to-transparent',
      },
    ],
  },
  {
    title: 'Creative',
    items: [
      {
        title: 'Ad Creative',
        desc: 'Performance-tested ad creative, landing pages, and campaign assets at volume.',
        Icon: FaPlay,
        glow: 'from-emerald-400/22 via-white/5 to-transparent',
      },
      {
        title: 'Production & Shoots',
        desc: 'Photo, video, and commercial production from concept through final delivery.',
        Icon: FaVideo,
        glow: 'from-zinc-300/14 via-white/5 to-transparent',
      },
      {
        title: 'Branding & Identity',
        desc: 'Logo, visual identity, brand guidelines, and design systems built from scratch.',
        Icon: FaPaintBrush,
        glow: 'from-orange-400/18 via-white/5 to-transparent',
      },
      {
        title: 'SEO & AI Search',
        desc: 'Organic visibility across Google, ChatGPT, Perplexity, and AI-powered search.',
        Icon: FaSearch,
        glow: 'from-slate-300/16 via-white/5 to-transparent',
      },
      {
        title: 'Content Marketing',
        desc: 'Blog posts, whitepapers, and thought leadership for growth.',
        Icon: FaPenNib,
        glow: 'from-emerald-300/16 via-white/5 to-transparent',
      },
    ],
  },
  {
    title: 'Product & AI',
    items: [
      {
        title: 'Product Design',
        desc: 'UX/UI for apps, websites, and platforms designed for conversion and retention.',
        Icon: FaLaptop,
        glow: 'from-amber-300/16 via-white/5 to-transparent',
      },
      {
        title: 'Web Development',
        desc: 'Marketing sites, landing pages, and web apps built for speed and conversion.',
        Icon: FaCode,
        glow: 'from-violet-400/18 via-white/5 to-transparent',
      },
      {
        title: 'App Development',
        desc: 'iOS, Android, and cross-platform apps from concept through App Store launch.',
        Icon: FaMobileAlt,
        glow: 'from-orange-400/16 via-white/5 to-transparent',
      },
      {
        title: 'AI Consulting',
        desc: 'Workflow audits, opportunity mapping, and a prioritized AI adoption roadmap.',
        Icon: FaRobot,
        glow: 'from-violet-500/22 via-white/5 to-transparent',
      },
      {
        title: 'Custom AI Products',
        desc: 'Internal copilots, automation pipelines, and custom AI tools for your team.',
        Icon: FaMicrochip,
        glow: 'from-purple-500/22 via-white/5 to-transparent',
      },
    ],
  },
  {
    title: 'Data & Intelligence',
    items: [
      {
        title: 'Data Analytics',
        desc: 'Custom dashboards, BI integrations, and reporting you can act on.',
        Icon: FaChartPie,
        glow: 'from-fuchsia-400/16 via-white/5 to-transparent',
      },
      {
        title: 'Data Attribution',
        desc: 'Multi-touch attribution and conversion tracking across every channel and platform.',
        Icon: FaProjectDiagram,
        glow: 'from-lime-400/18 via-white/5 to-transparent',
      },
      {
        title: 'CRO & Testing',
        desc: 'A/B testing, funnel optimization, and conversion lifts from click to close.',
        Icon: FaFilter,
        glow: 'from-blue-500/20 via-white/5 to-transparent',
      },
    ],
  },
];

// ─────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────
interface SpecialTextProps {
  children: string;
  speed?: number;
  delay?: number;
  className?: string;
  inView?: boolean;
  once?: boolean;
}

const RANDOM_CHARS = '_!X$0-+*#';

function getRandomChar(prevChar?: string): string {
  let char: string;
  do {
    char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
  } while (char === prevChar);
  return char;
}

function SpecialText({
  children,
  speed = 20,
  delay = 0,
  className = '',
  inView = false,
  once = true,
}: SpecialTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once, margin: '-100px' });
  const shouldAnimate = inView ? isInView : true;
  const text = children;
  const [displayText, setDisplayText] = useState<string>(' '.repeat(text.length));

  useEffect(() => {
    if (!shouldAnimate) return;

    let phase: 'phase1' | 'phase2' = 'phase1';
    let step = 0;
    let intervalId: number | null = null;

    const runPhase1 = () => {
      const maxSteps = text.length * 2;
      const currentLength = Math.min(step + 1, text.length);
      const chars: string[] = [];

      for (let i = 0; i < currentLength; i++) {
        const prevChar = i > 0 ? chars[i - 1] : undefined;
        chars.push(getRandomChar(prevChar));
      }

      for (let i = currentLength; i < text.length; i++) {
        chars.push('\u00A0');
      }

      setDisplayText(chars.join(''));

      if (step < maxSteps - 1) {
        step += 1;
      } else {
        phase = 'phase2';
        step = 0;
      }
    };

    const runPhase2 = () => {
      const revealedCount = Math.floor(step / 2);
      const chars: string[] = [];

      for (let i = 0; i < revealedCount && i < text.length; i++) {
        chars.push(text[i]);
      }

      if (revealedCount < text.length) {
        chars.push(step % 2 === 0 ? '_' : getRandomChar());
      }

      for (let i = chars.length; i < text.length; i++) {
        chars.push(getRandomChar());
      }

      setDisplayText(chars.join(''));

      if (step < text.length * 2 - 1) {
        step += 1;
      } else {
        setDisplayText(text);
        if (intervalId !== null) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
      }
    };

    const startTimeoutId = window.setTimeout(() => {
      setDisplayText(' '.repeat(text.length));
      intervalId = window.setInterval(() => {
        if (phase === 'phase1') {
          runPhase1();
        } else {
          runPhase2();
        }
      }, speed);
    }, delay * 1000);

    return () => {
      window.clearTimeout(startTimeoutId);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [delay, shouldAnimate, speed, text]);

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-pre font-heading font-black ${className}`}
    >
      {displayText}
    </span>
  );
}



// ─────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────
function ServiceCard({
  service,
  placement,
  highlighted,
}: {
  service: (typeof SERVICES)[0];
  placement: { x: number; y: number };
  highlighted?: boolean;
}) {
  const router = useRouter();
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
      router.push('/book');
    },
    [router]
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
            Get started
          </button>
        </div>

        {/* Bottom left accent dot */}
        <div className="absolute bottom-3 left-5 w-[5px] h-[5px] rounded-full bg-white/10 group-hover:bg-brand-magenta/60 transition-colors duration-500" />
      </div>
    </motion.div>
  );
}

function CategoryPanel({
  category,
  highlightedId,
}: {
  category: (typeof SERVICE_CATEGORIES)[number];
  highlightedId: number | null;
}) {
  const router = useRouter();
  const services = category.ids
    .map((id) => SERVICES.find((service) => service.id === id))
    .filter((service): service is (typeof SERVICES)[number] => Boolean(service));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#080808] min-h-[520px]"
    >
      <div className={`absolute inset-x-0 top-0 h-44 bg-gradient-to-br ${category.accent} opacity-70`} />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="relative flex h-full flex-col p-5 md:p-6">
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] tracking-[0.38em] text-white/30 uppercase">
              {category.label}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta/70 shadow-[0_0_18px_rgba(255,0,136,0.8)]" />
          </div>
          <h3 className="font-heading text-3xl md:text-4xl font-black uppercase leading-none tracking-tight text-white">
            {category.title}
          </h3>
        </div>

        <div className="flex flex-1 flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {services.map((service) => {
            const highlighted = highlightedId === service.id;
            return (
              <button
                key={`${category.title}-${service.id}`}
                onClick={() => router.push('/book')}
                className="group/item relative flex flex-col gap-3 px-0 py-5 text-left transition-colors hover:bg-white/[0.035] md:min-h-[126px]"
              >
                <div
                  className="absolute inset-y-4 left-0 w-px bg-brand-magenta opacity-0 transition-opacity group-hover/item:opacity-70"
                  style={{
                    opacity: highlighted ? 1 : undefined,
                    boxShadow: highlighted ? '0 0 24px rgba(255,0,136,0.75)' : undefined,
                  }}
                />
                <div className="flex items-start justify-between gap-5 pl-4">
                  <div>
                    <span className="mb-2 block font-mono text-[9px] tracking-[0.34em] text-brand-magenta/70 uppercase">
                      {service.tag}
                    </span>
                    <span className="block font-heading text-base md:text-lg font-black uppercase tracking-[0.04em] text-white/90 transition-colors group-hover/item:text-white">
                      {service.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/18">
                    {service.index}
                  </span>
                </div>
                <p className="pl-4 pr-3 font-sans text-sm leading-relaxed text-white/42 transition-colors group-hover/item:text-white/65">
                  {service.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
function ListedServiceCard({
  item,
}: {
  item: (typeof SERVICE_LIST_GROUPS)[number]['items'][number];
}) {
  const router = useRouter();
  const Icon = item.Icon;

  return (
    <motion.button
      type="button"
      onClick={() => router.push('/book')}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[98px] w-full items-center gap-5 overflow-hidden rounded-[12px] border border-white/[0.07] bg-[#12161c]/88 px-5 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/35 hover:bg-[#171c23]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-80 transition-opacity duration-300 group-hover:opacity-100`} />
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-black/25 text-[22px] text-white/72 shadow-[0_14px_36px_rgba(0,0,0,0.3)]">
        <Icon />
      </div>
      <div className="relative min-w-0">
        <h4 className="font-heading text-base font-black uppercase tracking-tight text-white/90">
          {item.title}
        </h4>
        <p className="mt-1 max-w-[34rem] font-sans text-[12px] font-semibold leading-relaxed text-white/42">
          {item.desc}
        </p>
      </div>
    </motion.button>
  );
}

function ServiceListGroup({ group }: { group: (typeof SERVICE_LIST_GROUPS)[number] }) {
  return (
    <div className="relative">
      <h3 className="mb-5 font-heading text-lg font-black uppercase tracking-tight text-white/82">
        {group.title}
      </h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {group.items.map((item) => (
          <ListedServiceCard key={`${group.title}-${item.title}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function CoreServices() {
  const router = useRouter();
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

  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      if (!SERVICES.some((service) => service.id === id)) return;

      const sectionEl = document.getElementById('services');
      if (sectionEl) sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setHighlightedId(id);
      setTimeout(() => setHighlightedId(null), 3000);
    };

    window.addEventListener('highlight-service', handler);
    return () => window.removeEventListener('highlight-service', handler);
  }, []);

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
    <section id="services" className="relative w-full bg-brand-void py-24 z-20 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="font-heading text-[10px] font-black tracking-tight text-sky-300">
            Yeezus
          </div>
          <h2 className="text-center font-heading font-black uppercase text-white/90 leading-none tracking-tight text-[clamp(2.3rem,4.1vw,4.8rem)]">
            <SpecialText inView speed={18} className="text-gradient-hotblue leading-[0.86] tracking-tighter">
              Full-Stack Capabilities
            </SpecialText>
          </h2>
          <button
            type="button"
            onClick={() => router.push('/book')}
            className="justify-self-end rounded-[10px] border border-sky-300/80 px-7 py-3 font-heading text-sm font-black text-white shadow-[0_0_34px_rgba(56,189,248,0.18)] transition-colors hover:bg-sky-300 hover:text-black"
          >
            <span className="inline-flex items-center gap-2">
              Get in Touch <FaArrowRight className="text-xs" />
            </span>
          </button>
        </div>

        <div className="space-y-9">
          {SERVICE_LIST_GROUPS.map((group) => (
            <ServiceListGroup key={group.title} group={group} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => router.push('/book')}
            className="rounded-[10px] border border-sky-300 px-10 py-4 font-heading text-base font-black text-white shadow-[0_0_36px_rgba(56,189,248,0.16)] transition-colors hover:bg-sky-300 hover:text-black"
          >
            <span className="inline-flex items-center gap-2">
              Work With Us <FaArrowRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <section id="services" className="relative w-full bg-brand-void py-24 z-20">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16">

        {/* Section header */}
        <div className="relative mx-auto mb-14 flex max-w-5xl flex-col items-center text-center">
          <h2 className="font-heading font-black uppercase text-white/95 leading-[0.86] tracking-tighter text-[clamp(2.2rem,7.6vw,8.5rem)]">
            <SpecialText inView speed={18} className="text-gradient-hotblue leading-[0.86] tracking-tighter">
              Full-Stack Capabilities
            </SpecialText>
          </h2>
          <div className="mt-6 h-px w-20 bg-white/10" />
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
