import React from 'react';

interface MarqueeTickerProps {
  items?: string[];
  speed?: 'normal' | 'fast';
}

const DEFAULT_ITEMS = [
  'SELECTED SYSTEMS',
  'CLIENT-SERVER REST',
  'JAIPUR (26.9124° N, 75.7873° E)',
  'RESQ 2.0 PROTOYPE',
  'GYM OPERATIONS SAAS',
  'ZERO-GRADIENT DISCIPLINE',
  'JECRC CSE CLASS OF 2028',
  'STRICT TYPE SAFETY',
  'DOCUMENT STORE ARCHITECTURE',
  'AVAILABLE FOR SPRINT 2026',
];

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ items = DEFAULT_ITEMS }) => {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="border-y border-[#DCD7CD] bg-[#EFECE4] py-2 overflow-hidden select-none whitespace-nowrap relative flex"
      aria-hidden="true"
    >
      <div className="flex animate-marquee gap-8 items-center text-[11px] font-mono tracking-widest text-[#575550]">
        {repeated.map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="hover:text-[#D84A27] transition-colors">{text}</span>
            <span className="text-[#D84A27] font-bold">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};
