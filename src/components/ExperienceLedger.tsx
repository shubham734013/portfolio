import React, { useState } from 'react';
import { EXPERIENCES } from '../data/experiences';
import { ChevronDown, ChevronUp, Calendar, MapPin, Building, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RollingIndex } from './RollingIndex';

export const ExperienceLedger: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('jecrc-btech');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="journey" className="py-16 md:py-24 border-b border-[#DCD7CD] bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-[#DCD7CD] pb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <RollingIndex numberStr="04" />
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413] tracking-tight">
              JOURNEY & EXPERIENCE LEDGER
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8A867E]">
            CHRONOLOGICAL CATALOG · VERIFIED MILESTONES · JECRC · XEBIA · ADOBE
          </div>
        </div>

        {/* Chronological Exhibition Catalog Table */}
        <div className="border border-[#141413] divide-y divide-[#DCD7CD] bg-[#EFECE4]">
          {/* Table Header Row (Desktop) */}
          <div className="hidden md:grid grid-cols-12 p-4 text-xs font-mono font-semibold text-[#8A867E] bg-[#E4DFC8] border-b border-[#DCD7CD]">
            <div className="col-span-2">TIMELINE</div>
            <div className="col-span-4">ROLE & MILESTONE</div>
            <div className="col-span-3">ORGANIZATION / LOCATION</div>
            <div className="col-span-3 text-right">STATUS / ACTIONS</div>
          </div>

          {/* Table Rows */}
          {EXPERIENCES.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="transition-colors hover:bg-[#F6F3EC]"
              >
                {/* Main Row Summary */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 sm:p-5 cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-3 items-center group"
                >
                  {/* Timeline */}
                  <div className="md:col-span-2 font-mono text-xs text-[#8A867E] flex items-center gap-1.5">
                    <span className="text-[#D84A27] font-bold">0{index + 1}</span>
                    <span>{item.timeline.split('—')[0].trim()}</span>
                  </div>

                  {/* Role */}
                  <div className="md:col-span-4">
                    <h3 className="font-syne text-base sm:text-lg font-bold text-[#141413] group-hover:text-[#D84A27] transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-xs text-[#575550] md:hidden font-mono mt-0.5">
                      {item.organization} · {item.timeline}
                    </div>
                  </div>

                  {/* Organization & Location */}
                  <div className="md:col-span-3 font-mono text-xs text-[#575550]">
                    <div className="font-semibold text-[#141413]">{item.organization}</div>
                    <div className="text-[#8A867E] text-[11px]">{item.location}</div>
                  </div>

                  {/* Status & Disclosure Button */}
                  <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 font-mono text-xs">
                    <span className="text-[11px] px-2 py-0.5 border border-[#DCD7CD] bg-[#F6F3EC] text-[#141413]">
                      {item.statusTag}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      aria-expanded={isExpanded}
                      aria-label={`Toggle details for ${item.role}`}
                      className="p-1 border border-[#DCD7CD] bg-[#F6F3EC] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Expanded Ledger Details Drawer with AnimatePresence */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="overflow-hidden border-t border-[#DCD7CD] bg-[#F6F3EC]/90"
                    >
                      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-7 space-y-3">
                          <p className="text-xs sm:text-sm text-[#141413] leading-relaxed">
                            {item.description}
                          </p>
                          <div className="space-y-1.5 pt-1">
                            <div className="font-mono text-xs uppercase text-[#8A867E]">
                              Core Activities & Outcomes:
                            </div>
                            <ul className="space-y-1 text-xs text-[#575550]">
                              {item.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#D84A27] font-mono font-bold">●</span>
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="md:col-span-5 space-y-3">
                          <div className="font-mono text-xs uppercase text-[#8A867E]">
                            Domains & Competencies Applied:
                          </div>
                          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                            {item.technologies?.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-[#EFECE4] border border-[#DCD7CD] text-[#141413] text-[11px]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="p-3 bg-[#EFECE4] border border-[#DCD7CD] text-[11px] font-mono text-[#575550]">
                            Full academic and milestone ledger verified under JECRC University computer science department guidelines.
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
