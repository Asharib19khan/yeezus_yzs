'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, Service } from '@/data/services';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Service[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // "Dumb words" mapping for common generic terms
  const searchSynonyms: Record<string, string[]> = {
    'website': ['web', 'react', 'landing page'],
    'app': ['mobile', 'native', 'flutter', 'android'],
    'database': ['backend', 'sql', 'nosql', 'mariadb'],
    'hack': ['security', 'ethical hacking', 'debug'],
    'server': ['backend', 'architecture', 'infrastructure'],
    'design': ['ui', '3d', 'brutalist'],
    'management': ['product', 'agile', 'strategy']
  };

  const expandQuery = (q: string) => {
    let expanded = q.toLowerCase();
    for (const [key, synonyms] of Object.entries(searchSynonyms)) {
      if (expanded.includes(key)) {
        expanded += ' ' + synonyms.join(' ');
      }
    }
    return expanded;
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = expandQuery(query).split(' ').filter(Boolean);
    
    const matched = SERVICES.filter((service) => {
      const targetText = `${service.title} ${service.desc} ${service.tag}`.toLowerCase();
      return searchTerms.some((term) => targetText.includes(term));
    });

    setResults(matched);
  }, [query]);

  const handleSelect = (service: Service) => {
    setIsFocused(false);
    setQuery('');

    // Fire a global event — CoreServices and PeripheralSystems will respond
    window.dispatchEvent(
      new CustomEvent('highlight-service', {
        detail: { id: service.id, section: service.section },
      })
    );
  };

  return (
    <div ref={containerRef} className="relative mt-4 flex justify-center z-50">
      <motion.div
        animate={{
          width: isFocused ? '100%' : '180px',
          maxWidth: isFocused ? '400px' : '280px'
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div 
          className={`relative overflow-hidden rounded-full border transition-colors duration-300 ${
            isFocused ? 'border-white/30 bg-black/80' : 'border-white/15 bg-white/[0.04]'
          }`}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <input
            type="text"
            placeholder={isFocused ? "Search systems, apps, design..." : "Search..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full bg-transparent text-white/90 text-[13px] font-sans font-medium placeholder:text-white/30 outline-none py-3 pl-11 pr-4"
          />
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {isFocused && query.trim() && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-full bg-[#080808] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                backdropFilter: 'blur(24px)',
              }}
            >
              {results.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                  {results.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleSelect(service)}
                      className="w-full flex flex-col text-left p-3 hover:bg-white/[0.06] rounded-xl transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[9px] tracking-widest text-brand-magenta/80 uppercase">
                          {service.tag}
                        </span>
                      </div>
                      <span className="font-sans text-[13px] font-medium text-white/90 group-hover:text-white mb-1">
                        {service.title}
                      </span>
                      <span className="font-sans text-[11px] text-white/40 line-clamp-1">
                        {service.desc}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="font-sans text-[13px] text-white/40">No systems found matching your query.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
