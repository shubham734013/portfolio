import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'work', label: '01 Work', href: '#work' },
    { id: 'stack', label: '02 Stack', href: '#stack' },
    { id: 'about', label: '03 About', href: '#about' },
    { id: 'journey', label: '04 Journey', href: '#journey' },
    { id: 'contact', label: '05 Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b border-[#DCD7CD] ${
        isScrolled ? 'bg-[#F6F3EC]/95 backdrop-blur-none shadow-xs' : 'bg-[#F6F3EC]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <motion.a
          href="#"
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-baseline gap-2 group whitespace-nowrap shrink-0"
          aria-label="Shubham Vaishnav portfolio home"
        >
          <span className="font-syne font-extrabold text-base sm:text-lg tracking-tight text-[#141413] group-hover:text-[#D84A27] transition-colors">
            SHUBHAM VAISHNAV
          </span>
          <span className="font-mono text-[11px] text-[#8A867E] hidden sm:inline">
            JAIPUR, IN
          </span>
        </motion.a>

        {/* Zone 2: Monospace Nav Links with Floating Active Slider (Desktop) */}
        <nav
          className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-[#575550]"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`transition-colors py-1 relative whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#141413] font-semibold' : 'hover:text-[#141413]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D84A27]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Status & Primary Action */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[#575550]">
            <span
              className="w-2 h-2 bg-[#3F5E45] inline-block shrink-0 animate-pulse"
              aria-hidden="true"
            ></span>
            <span className="whitespace-nowrap">OPEN TO INTERNSHIPS</span>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="px-3.5 py-2 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] text-xs font-mono font-medium uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 border border-[#DCD7CD] bg-[#EFECE4] text-[#141413] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Accessible Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="md:hidden border-t border-[#DCD7CD] bg-[#EFECE4] px-4 py-4 space-y-3 font-mono text-sm overflow-hidden"
          >
            <div className="text-[11px] text-[#8A867E] uppercase pb-1 border-b border-[#DCD7CD]">
              Navigation Index
            </div>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-1.5 transition-colors ${
                  activeSection === item.id ? 'text-[#D84A27] font-bold' : 'text-[#141413]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#DCD7CD] flex items-center justify-between text-xs text-[#575550]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#3F5E45] inline-block"></span>
                <span>Available for Roles</span>
              </div>
              <span>Jaipur · IST</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
