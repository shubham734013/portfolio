import React from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/projects';
import { ResQPreviewCanvas } from './previews/ResQPreviewCanvas';
import { GymPreviewCanvas } from './previews/GymPreviewCanvas';
import { GitBranch, Layers, ArrowUpRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { RollingIndex } from './RollingIndex';

interface SelectedWorkProps {
  onInspectProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onInspectProject }) => {
  const resq = PROJECTS[0];
  const gym = PROJECTS[1];

  return (
    <section id="work" className="py-16 md:py-24 border-b border-[#DCD7CD] bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Index Header */}
        <div className="border-b border-[#DCD7CD] pb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <RollingIndex numberStr="01" />
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413] tracking-tight">
              SELECTED WORK & ARCHITECTURAL SYSTEMS
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8A867E]">
            ASYMMETRIC GALLERY · 2 VERIFIED SYSTEMS · NO STATIC MOCKUPS
          </div>
        </div>

        {/* Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card 01: ResQ 2.0 (7 Columns Large Monograph Card with Spring Lift) */}
          <motion.div
            id="resq-2"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="lg:col-span-7 bg-[#EFECE4] border border-[#141413] p-5 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow space-y-6"
          >
            {/* Monograph Top Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#8A867E] gap-2 border-b border-[#DCD7CD] pb-3">
                <span className="text-[#141413] font-semibold">{resq.index}</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3F5E45] inline-block"></span>
                  <span className="text-[#3F5E45] font-semibold">{resq.status}</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-[#8A867E] uppercase mb-1">
                  {resq.category}
                </div>
                <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413]">
                  {resq.title}
                </h3>
              </div>

              <p className="text-sm text-[#575550] leading-relaxed">
                {resq.description}
              </p>
            </div>

            {/* Interactive Canvas Embedded in Card */}
            <div className="w-full">
              <div className="text-[10px] font-mono text-[#8A867E] mb-1.5 flex items-center justify-between">
                <span>INTERACTIVE SCHEMATIC // LIVE CLIENT PREVIEW</span>
                <span className="text-[#D84A27] font-semibold">TRY TAPPING HOSPITALS & SOS TRIGGER</span>
              </div>
              <ResQPreviewCanvas />
            </div>

            {/* Verified Capabilities Strip */}
            <div className="space-y-2 border-t border-[#DCD7CD] pt-4">
              <div className="text-[11px] font-mono text-[#8A867E] uppercase">
                Verified Capabilities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {resq.verifiedFeatures.map((feat) => (
                  <motion.div
                    key={feat.title}
                    whileHover={{ scale: 1.01 }}
                    className="p-2 bg-[#F6F3EC] border border-[#DCD7CD] flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3F5E45] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#141413] text-[11px]">{feat.title}</div>
                      <div className="text-[10px] text-[#575550] line-clamp-1">{feat.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Card Actions */}
            <div className="border-t border-[#DCD7CD] pt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {resq.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-[#F6F3EC] border border-[#DCD7CD] text-[#141413]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => onInspectProject(resq)}
                  className="px-3.5 py-2 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                </motion.button>

                {resq.repoUrl && (
                  <motion.a
                    href={resq.repoUrl}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[#141413] bg-[#F6F3EC] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors"
                    title="View GitHub Repository"
                    aria-label="View ResQ 2.0 GitHub Repository"
                  >
                    <GitBranch className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Card 02: Gym Management SaaS (5 Columns Offset Card with Spring Lift) */}
          <motion.div
            id="gym-management-saas"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="lg:col-span-5 bg-[#EFECE4] border border-[#141413] p-5 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow space-y-6"
          >
            {/* Monograph Top Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#8A867E] gap-2 border-b border-[#DCD7CD] pb-3">
                <span className="text-[#141413] font-semibold">{gym.index}</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#C87D20] inline-block"></span>
                  <span className="text-[#C87D20] font-semibold">{gym.status}</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-[#8A867E] uppercase mb-1">
                  {gym.category}
                </div>
                <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413]">
                  {gym.title}
                </h3>
              </div>

              <p className="text-sm text-[#575550] leading-relaxed">
                {gym.description}
              </p>
            </div>

            {/* Interactive Canvas Embedded in Card */}
            <div className="w-full">
              <div className="text-[10px] font-mono text-[#8A867E] mb-1.5 flex items-center justify-between">
                <span>INTERACTIVE SCHEMATIC // OPERATIONS PREVIEW</span>
                <span className="text-[#C87D20] font-semibold">TOGGLE TABS & SCAN PASS</span>
              </div>
              <GymPreviewCanvas />
            </div>

            {/* Honest Implementation Matrix */}
            <div className="space-y-2 border-t border-[#DCD7CD] pt-4">
              <div className="text-[11px] font-mono text-[#8A867E] uppercase flex justify-between">
                <span>Implementation Matrix</span>
                <span className="text-[10px]">Active vs In-Progress</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {gym.verifiedFeatures.map((feat) => (
                  <motion.div
                    key={feat.title}
                    whileHover={{ x: 2 }}
                    className="p-1.5 bg-[#F6F3EC] border border-[#DCD7CD] flex items-center justify-between"
                  >
                    <span className="text-[#141413] font-medium text-[11px]">{feat.title}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 border ${
                        feat.status === 'Implemented'
                          ? 'border-[#3F5E45] text-[#3F5E45]'
                          : 'border-[#C87D20] text-[#C87D20]'
                      }`}
                    >
                      {feat.status === 'Implemented' ? 'Active Workflow' : 'In Development'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Card Actions */}
            <div className="border-t border-[#DCD7CD] pt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {gym.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-[#F6F3EC] border border-[#DCD7CD] text-[#141413]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => onInspectProject(gym)}
                  className="px-3.5 py-2 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Workflows</span>
                </motion.button>

                {gym.repoUrl && (
                  <motion.a
                    href={gym.repoUrl}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[#141413] bg-[#F6F3EC] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors"
                    title="View GitHub Repository"
                    aria-label="View Gym SaaS GitHub Repository"
                  >
                    <GitBranch className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Blueprint Slot 03: Next System in Research */}
        <motion.div
          whileHover={{ y: -2 }}
          className="border border-dashed border-[#8A867E] bg-[#EFECE4]/50 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="font-mono text-xs text-[#8A867E]">
              [ 03 // ARCHITECTURAL PIPELINE ]
            </div>
            <h3 className="font-syne text-xl sm:text-2xl font-bold text-[#141413]">
              Next System In Research & Prototyping
            </h3>
            <p className="text-sm text-[#575550]">
              Exploring distributed telemetry, event-driven message architectures, and automated testing pipelines. Interested in collaborating or discussing full-stack engineering opportunities?
            </p>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-3 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] text-xs font-mono uppercase tracking-wider font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>Collaborate on Next Build</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
