import React, { useState } from 'react';
import { TECH_DOMAINS } from '../data/techStack';
import { Code2, Cpu, Database, Globe, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RollingIndex } from './RollingIndex';

export const TechStackMatrix: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: string;
    relatedProjects: string[];
    engineeringNote: string;
    domainName: string;
  }>({
    name: 'MongoDB',
    level: 'Document Database',
    relatedProjects: ['ResQ 2.0', 'Gym Management SaaS'],
    engineeringNote:
      'Schema modeling for medical dispatch logs in ResQ 2.0 and member subscription records in Gym SaaS, with indexing and aggregation.',
    domainName: 'Data & Persistence',
  });

  const getDomainIcon = (id: string) => {
    switch (id) {
      case 'languages':
        return <Code2 className="w-4 h-4 text-[#D84A27]" />;
      case 'frontend':
        return <Globe className="w-4 h-4 text-[#D84A27]" />;
      case 'backend':
        return <Cpu className="w-4 h-4 text-[#D84A27]" />;
      case 'data':
        return <Database className="w-4 h-4 text-[#D84A27]" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-[#D84A27]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#D84A27]" />;
    }
  };

  return (
    <section id="stack" className="py-16 md:py-24 border-b border-[#DCD7CD] bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-[#DCD7CD] pb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <RollingIndex numberStr="02" />
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413] tracking-tight">
              ARCHITECTURE & TECHNICAL STACK MATRIX
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8A867E]">
            ENGINEERING SPECIFICATION · ZERO FAKE PERCENTAGE BARS · INTERACTIVE NOTES
          </div>
        </div>

        {/* 2-Column Split: Left 5 Domains List, Right "How I Use It" Inspector Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 5 Architectural Domains (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {TECH_DOMAINS.map((domain) => (
              <div
                key={domain.id}
                className="bg-[#EFECE4] border border-[#DCD7CD] p-5 space-y-3"
              >
                {/* Domain Header */}
                <div className="flex flex-wrap items-center justify-between pb-2 border-b border-[#DCD7CD] gap-2">
                  <div className="flex items-center gap-2">
                    {getDomainIcon(domain.id)}
                    <span className="font-mono text-xs font-bold text-[#141413]">
                      {domain.number} // {domain.domainName.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#575550] hidden sm:inline">
                    {domain.summary}
                  </span>
                </div>

                {/* Skills Interactive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {domain.skills.map((skill) => {
                    const isSelected = selectedSkill.name === skill.name;
                    return (
                      <motion.button
                        key={skill.name}
                        type="button"
                        whileHover={{ scale: 1.01, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSkill({
                            ...skill,
                            domainName: domain.domainName,
                          });
                          if (window.innerWidth < 1024) {
                            const el = document.getElementById('tech-spec-inspector');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                          }
                        }}
                        className={`p-3 text-left border font-mono transition-colors flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#141413] bg-[#F6F3EC] shadow-xs ring-1 ring-[#141413]'
                            : 'border-[#DCD7CD] bg-[#F6F3EC]/50 hover:bg-[#F6F3EC]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? 'text-[#D84A27]' : 'text-[#141413]'
                            }`}
                          >
                            {skill.name}
                          </span>
                          <span className="text-[10px] text-[#8A867E]">
                            {skill.level}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-[#575550] pt-2 border-t border-[#DCD7CD]/60 mt-1">
                          <span className="truncate pr-1">
                            Used in: {skill.relatedProjects.join(' · ')}
                          </span>
                          <span className="text-[#D84A27] font-semibold shrink-0">
                            Inspect →
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: "How I Use It" Concrete Engineering Inspector (4 cols) with AnimatePresence */}
          <div id="tech-spec-inspector" className="lg:col-span-4 sticky top-24">
            <div className="bg-[#141413] text-[#F6F3EC] border border-[#141413] p-5 sm:p-6 space-y-5 shadow-md overflow-hidden">
              <div className="border-b border-[#2C2B28] pb-3">
                <div className="font-mono text-[11px] text-[#D84A27] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#D84A27] inline-block animate-ping"></span>
                  Active Engineering Spec
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedSkill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <h3 className="font-syne text-2xl font-bold text-[#F6F3EC]">
                      {selectedSkill.name}
                    </h3>
                    <div className="font-mono text-xs text-[#8A867E] mt-0.5">
                      Domain: {selectedSkill.domainName}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Concrete Engineering Application */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.name + '_desc'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-2"
                >
                  <div className="font-mono text-xs uppercase text-[#8A867E]">
                    How I Use It In Code:
                  </div>
                  <p className="text-sm font-sans text-[#EFECE4] leading-relaxed bg-[#1C1B19] p-3.5 border border-[#2C2B28]">
                    {selectedSkill.engineeringNote}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Active System Verification Mapping */}
              <div className="space-y-2 border-t border-[#2C2B28] pt-4">
                <div className="font-mono text-xs uppercase text-[#8A867E]">
                  Active System Applications:
                </div>
                <div className="space-y-1.5 font-mono text-xs">
                  {selectedSkill.relatedProjects.map((proj) => (
                    <motion.div
                      key={proj}
                      whileHover={{ x: 2 }}
                      className="p-2 bg-[#1C1B19] border border-[#2C2B28] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3F5E45]" />
                        <span className="text-[#F6F3EC] font-semibold">{proj}</span>
                      </div>
                      <span className="text-[10px] text-[#8A867E]">Verified</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Monograph Footnote */}
              <div className="border-t border-[#2C2B28] pt-3 text-[11px] font-mono text-[#8A867E]">
                SELECT ANY STACK TOKEN TO VIEW CONCRETE IMPLEMENTATION ARCHITECTURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
