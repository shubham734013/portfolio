import React from 'react';
import { ArrowUp, GitBranch, Linkedin, Mail, Compass } from 'lucide-react';
import { PROFILE_DATA } from '../data/profile';

import { LiveClock } from './LiveClock';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141413] text-[#F6F3EC] border-t border-[#141413] py-12 md:py-16 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Row: Large Typographic Sign-off */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2C2B28] pb-8 gap-6">
          <div className="space-y-2">
            <div className="text-[11px] text-[#D84A27] uppercase tracking-wider flex items-center gap-3">
              <span>ENGINEERING MONOGRAPH // EDITION 2026</span>
              <span>·</span>
              <LiveClock className="text-[#3F5E45] font-semibold" />
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F6F3EC]">
              SHUBHAM VAISHNAV
            </h2>
            <div className="text-xs text-[#8A867E]">
              B.Tech Computer Science & Engineering · JECRC University, Jaipur (26.9124° N, 75.7873° E)
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="px-4 py-2 border border-[#2C2B28] hover:border-[#D84A27] text-[#F6F3EC] hover:text-[#D84A27] transition-colors flex items-center gap-2 self-start md:self-end"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Middle Row: Links and Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-2">
            <div className="text-[#8A867E] uppercase text-[10px]">
              ENGINEERING INTEGRITY
            </div>
            <p className="font-sans text-xs text-[#DCD7CD] leading-relaxed">
              Designed and built as an editorial publication and architectural portfolio. No gradients, no glassmorphism, zero fake percentage metrics, and real working client-server APIs.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="text-[#8A867E] uppercase text-[10px]">NAVIGATION INDEX</div>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="#work" className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors">
                  01 // Selected Work
                </a>
              </li>
              <li>
                <a href="#stack" className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors">
                  02 // Architecture & Stack
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors">
                  03 // About & Principles
                </a>
              </li>
              <li>
                <a href="#journey" className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors">
                  04 // Journey Ledger
                </a>
              </li>
              <li>
                <a href="#certificates" className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors">
                  05 // Certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors">
                  06 // Initiate Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2">
            <div className="text-[#8A867E] uppercase text-[10px]">VERIFIED CHANNELS</div>
            <div className="flex flex-col gap-2">
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors flex items-center gap-2"
              >
                <GitBranch className="w-3.5 h-3.5 text-[#D84A27]" />
                <span>GitHub // @shubhamvaishnav</span>
              </a>
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#D84A27]" />
                <span>LinkedIn // Shubham Vaishnav</span>
              </a>
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="text-[#DCD7CD] hover:text-[#D84A27] transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#D84A27]" />
                <span>Email // {PROFILE_DATA.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="border-t border-[#2C2B28] pt-6 flex flex-wrap items-center justify-between text-[#8A867E] text-[11px] gap-2">
          <div>
            © 2026 {PROFILE_DATA.name}. Built with React, TypeScript, Node.js & Tailwind CSS.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#3F5E45] inline-block"></span>
            <span>All systems nominal · Jaipur, IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
