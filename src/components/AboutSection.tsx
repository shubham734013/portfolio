import React from 'react';
import { PROFILE_DATA } from '../data/profile';
import { MapPin, GraduationCap, Compass, Terminal, Shield, ArrowUpRight } from 'lucide-react';
import { RollingIndex } from './RollingIndex';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-[#DCD7CD] bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-[#DCD7CD] pb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <RollingIndex numberStr="03" />
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413] tracking-tight">
              ABOUT & CORE ENGINEERING PRINCIPLES
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8A867E]">
            EDITORIAL PROFILE · JAIPUR, INDIA · CLASS OF 2028
          </div>
        </div>

        {/* 2-Column Magazine Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Lead Prose & Identity Card */}
          <div className="lg:col-span-6 space-y-6">
            <blockquote className="font-serif-display text-2xl sm:text-3xl text-[#141413] leading-snug italic border-l-2 border-[#D84A27] pl-5 py-1">
              "{PROFILE_DATA.leadBio}"
            </blockquote>

            <p className="text-sm text-[#575550] leading-relaxed">
              Based at <strong className="text-[#141413] font-semibold">JECRC University</strong> in Jaipur, Rajasthan, I focus on software development that bridges clean frontend interactions with sturdy backend data models. Rather than chasing superficial design trends, I adhere to Swiss editorial principles: rigorous structural hairlines, type hierarchy, and zero gradient filler.
            </p>

            {/* Architectural Identity Card & Monogram (SV // 2028) */}
            <div className="bg-[#EFECE4] border border-[#141413] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCD7CD]">
                <div className="font-mono text-xs font-semibold text-[#141413]">
                  ENGINEER IDENTIFICATION CARD
                </div>
                <div className="font-mono text-[10px] text-[#3F5E45] bg-[#3F5E45]/10 px-2 py-0.5 border border-[#3F5E45]">
                  STUDENT ID: JECRC // CSE
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Visual Avatar / Monogram */}
                <div className="sm:col-span-4 flex justify-center">
                  {PROFILE_DATA.avatarUrl ? (
                    <img
                      src={PROFILE_DATA.avatarUrl}
                      alt={PROFILE_DATA.name}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 object-cover border border-[#141413]"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-[#141413] text-[#F6F3EC] flex flex-col items-center justify-center p-2 border border-[#141413] shadow-inner">
                      <span className="font-syne font-extrabold text-2xl tracking-tighter text-[#D84A27]">
                        SV
                      </span>
                      <span className="font-mono text-[9px] text-[#8A867E] tracking-widest mt-1">
                        EST. 2028
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="sm:col-span-8 font-mono text-xs space-y-1.5">
                  <div className="font-bold text-sm text-[#141413] font-sans">
                    {PROFILE_DATA.name}
                  </div>
                  <div className="text-[#575550] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#D84A27]" />
                    <span>B.Tech CSE · JECRC University '28</span>
                  </div>
                  <div className="text-[#575550] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D84A27]" />
                    <span>Jaipur, Rajasthan ({PROFILE_DATA.coordinates})</span>
                  </div>
                  <div className="text-[11px] text-[#3F5E45] font-semibold pt-1">
                    ● {PROFILE_DATA.availability}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles & Focus Areas */}
          <div className="lg:col-span-6 space-y-4">
            <div className="font-mono text-xs text-[#8A867E] uppercase tracking-wider pb-1 border-b border-[#DCD7CD]">
              Engineering Principles
            </div>

            <div className="space-y-4">
              {PROFILE_DATA.corePrinciples.map((principle) => (
                <div
                  key={principle.index}
                  className="bg-[#EFECE4] border border-[#DCD7CD] p-5 space-y-2 hover:border-[#141413] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#D84A27]">
                      {principle.index} // PHILOSOPHY
                    </span>
                    <span className="font-mono text-[10px] text-[#8A867E]">
                      SYSTEM DISCIPLINE
                    </span>
                  </div>
                  <h3 className="font-syne text-lg font-bold text-[#141413]">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#575550] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote Callout */}
            <div className="p-4 bg-[#141413] text-[#F6F3EC] font-mono text-xs flex items-center justify-between">
              <div>
                <span className="text-[#D84A27] font-bold">NOTE: </span>
                <span>Zero superficial AI gradients. Every pixel serves utility.</span>
              </div>
              <a
                href="#contact"
                className="text-[#D84A27] hover:underline flex items-center gap-1"
              >
                <span>Discuss</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
