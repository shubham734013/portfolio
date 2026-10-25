import React, { useState } from 'react';
import { ArrowDown, MessageSquare, Terminal, Server, Code2, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_DATA } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { MarqueeTicker } from './MarqueeTicker';

interface HeroProps {
  onSelectProject?: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProject }) => {
  const [activeLedgerTab, setActiveLedgerTab] = useState<'works' | 'telemetry'>('works');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section className="relative border-b border-[#DCD7CD] bg-[#F6F3EC] overflow-hidden">
      {/* Top Monospace Metadata Hairline Bar */}
      <div className="border-b border-[#DCD7CD] bg-[#EFECE4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#575550] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#D84A27] inline-block animate-ping"></span>
            <span>
              FULL-STACK DEVELOPER · JAIPUR, INDIA ({PROFILE_DATA.coordinates})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>B.TECH CSE · JECRC UNIVERSITY '28</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-[#3F5E45] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#3F5E45] rounded-full inline-block"></span>
              AVAILABLE FOR SPRINT 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero Split View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          {/* Left Column (Editorial Typography & Intent) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Section Index Marker */}
            <motion.div variants={itemVariants} className="font-mono text-xs text-[#8A867E] flex items-center gap-2">
              <span className="text-[#D84A27] font-bold">[ 00 ]</span>
              <span>INDEX & PROLOGUE</span>
            </motion.div>

            {/* Editorial Main Headline with Spring Reveal */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-syne font-extrabold text-[#141413] leading-[1.08] tracking-tight"
            >
              I build <span className="font-serif-display italic font-normal text-[#141413]">digital experiences</span> that work{' '}
              <span className="text-[#D84A27] underline decoration-[#D84A27] decoration-2 underline-offset-4 inline-block hover:scale-[1.02] transition-transform origin-left">
                beautifully.
              </span>
            </motion.h1>

            {/* Editorial Supporting Lead Prose */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#575550] leading-relaxed max-w-2xl font-normal"
            >
              I'm <strong className="font-semibold text-[#141413]">Shubham Vaishnav</strong>, a Computer Science student at JECRC University building full-stack web applications, resilient APIs, and thoughtful interfaces where engineering rigor meets art direction.
            </motion.p>

            {/* Action Buttons with Spring Micro-Interactions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <motion.a
                href="#work"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="px-5 py-3 bg-[#D84A27] hover:bg-[#B83B1C] text-[#F6F3EC] text-xs font-mono uppercase tracking-wider font-semibold transition-colors inline-flex items-center gap-2 shadow-xs group"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="px-5 py-3 border border-[#141413] bg-transparent hover:bg-[#EFECE4] text-[#141413] text-xs font-mono uppercase tracking-wider font-semibold transition-colors inline-flex items-center gap-2"
              >
                <span>Initiate Conversation</span>
                <MessageSquare className="w-3.5 h-3.5" />
              </motion.a>
            </motion.div>

            {/* Architectural Trust Indicators (Unboxed Clean Metadata) */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-[#DCD7CD] flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#8A867E]"
            >
              <span>Verified Systems Engineering</span>
              <span aria-hidden="true">·</span>
              <span>REST Client-Server</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Gradient Philosophy</span>
            </motion.div>
          </div>

          {/* Right Column: "The Live System Index" Tactile Blueprint Widget */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="bg-[#EFECE4] border border-[#141413] shadow-md relative overflow-hidden">
              {/* Blueprint Top Frame Bar */}
              <div className="bg-[#141413] text-[#F6F3EC] px-4 py-2.5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#D84A27]" />
                  <span className="font-semibold tracking-wider">SYSTEM BLUEPRINT // V26</span>
                </div>

                {/* Animated Layout Slider for Tabs */}
                <div className="flex items-center gap-1 bg-[#1C1B19] p-0.5 border border-[#2C2B28]">
                  <button
                    type="button"
                    onClick={() => setActiveLedgerTab('works')}
                    className={`relative px-2 py-0.5 text-[10px] font-mono transition-colors z-10 ${
                      activeLedgerTab === 'works'
                        ? 'text-[#F6F3EC] font-bold'
                        : 'text-[#8A867E] hover:text-[#F6F3EC]'
                    }`}
                  >
                    {activeLedgerTab === 'works' && (
                      <motion.span
                        layoutId="activeHeroTabSlider"
                        className="absolute inset-0 bg-[#D84A27] -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                    WORKS
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLedgerTab('telemetry')}
                    className={`relative px-2 py-0.5 text-[10px] font-mono transition-colors z-10 ${
                      activeLedgerTab === 'telemetry'
                        ? 'text-[#F6F3EC] font-bold'
                        : 'text-[#8A867E] hover:text-[#F6F3EC]'
                    }`}
                  >
                    {activeLedgerTab === 'telemetry' && (
                      <motion.span
                        layoutId="activeHeroTabSlider"
                        className="absolute inset-0 bg-[#D84A27] -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                    TELEMETRY
                  </button>
                </div>
              </div>

              {/* Tab 1: Works Index */}
              <AnimatePresence mode="wait">
                {activeLedgerTab === 'works' ? (
                  <motion.div
                    key="works"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 sm:p-5 space-y-3 font-mono text-xs"
                  >
                    <div className="text-[11px] text-[#8A867E] uppercase pb-1 border-b border-[#DCD7CD] flex justify-between">
                      <span>Curated Project Catalog</span>
                      <span>Status / Verification</span>
                    </div>

                    <div className="space-y-2">
                      {PROJECTS.map((proj) => (
                        <motion.a
                          key={proj.id}
                          href={`#${proj.id}`}
                          whileHover={{ x: 3 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          onMouseEnter={() => setHoveredProject(proj.id)}
                          onMouseLeave={() => setHoveredProject(null)}
                          className={`block p-3 border transition-colors ${
                            hoveredProject === proj.id
                              ? 'border-[#141413] bg-[#F6F3EC]'
                              : 'border-[#DCD7CD] bg-[#F6F3EC]/70 hover:bg-[#F6F3EC]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm text-[#141413]">{proj.title}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 border ${
                                proj.statusColor === 'olive'
                                ? 'border-[#3F5E45] text-[#3F5E45] bg-[#3F5E45]/10'
                                : 'border-[#C87D20] text-[#C87D20] bg-[#C87D20]/10'
                              }`}
                            >
                              {proj.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#575550] line-clamp-1">
                            {proj.oneLiner}
                          </div>
                          <div className="mt-2 pt-2 border-t border-[#DCD7CD] flex items-center justify-between text-[10px] text-[#8A867E]">
                            <span>{proj.technologies.slice(0, 3).join(' · ')}</span>
                            <span className="text-[#D84A27] font-semibold">View Schematic →</span>
                          </div>
                        </motion.a>
                      ))}

                      {/* Next System Slot */}
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.01 }}
                        className="block p-2.5 border border-dashed border-[#8A867E] bg-transparent hover:bg-[#F6F3EC] transition-colors"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#575550] font-semibold">03 // Next System In Research</span>
                          <span className="text-[#D84A27] font-semibold">Collaborate ↗</span>
                        </div>
                      </motion.a>
                    </div>
                  </motion.div>
                ) : (
                  /* Tab 2: System Telemetry */
                  <motion.div
                    key="telemetry"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 sm:p-5 space-y-3 font-mono text-xs"
                  >
                    <div className="text-[11px] text-[#8A867E] uppercase pb-1 border-b border-[#DCD7CD]">
                      Runtime Environment & Stack Ledger
                    </div>

                    <div className="border border-[#DCD7CD] divide-y divide-[#DCD7CD] bg-[#F6F3EC]">
                      <div className="p-2.5 flex justify-between">
                        <span className="text-[#8A867E]">CORE STACK</span>
                        <span className="font-semibold text-[#141413] text-right">
                          React · Node · MongoDB · REST
                        </span>
                      </div>
                      <div className="p-2.5 flex justify-between">
                        <span className="text-[#8A867E]">DSA FOUNDATION</span>
                        <span className="text-[#141413]">C, C++, Python</span>
                      </div>
                      <div className="p-2.5 flex justify-between">
                        <span className="text-[#8A867E]">ARCHITECTURE</span>
                        <span className="text-[#141413]">Client-Server REST</span>
                      </div>
                      <div className="p-2.5 flex justify-between">
                        <span className="text-[#8A867E]">LOCATION</span>
                        <span className="text-[#141413]">Jaipur (26.91° N, 75.78° E)</span>
                      </div>
                      <div className="p-2.5 flex justify-between">
                        <span className="text-[#8A867E]">BUILD STATUS</span>
                        <span className="text-[#3F5E45] font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#3F5E45] rounded-full inline-block animate-pulse"></span>
                          Ready for Engineering Roles
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#141413] text-[#F6F3EC] text-[11px] space-y-1">
                      <div className="text-[#D84A27] font-semibold">ENGINEERING STATEMENT:</div>
                      <div className="text-[#DCD7CD]">
                        Rigorous adherence to clean client-server boundaries, type-safe data schemas, and zero decorative visual noise.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Blueprint Footer Coordinate Strip */}
              <div className="border-t border-[#DCD7CD] px-4 py-2 bg-[#EFECE4] flex items-center justify-between text-[10px] font-mono text-[#8A867E]">
                <span className="flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#D84A27]" />
                  JAIPUR HUB · RAJASTHAN
                </span>
                <span>JECRC '28</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Lovable-Style Monograph Marquee Ticker */}
      <MarqueeTicker />
    </section>
  );
};
