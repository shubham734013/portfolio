import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ExternalLink, GitBranch, CheckCircle2, Clock, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#141413]/70 backdrop-blur-none"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="bg-[#F6F3EC] border border-[#141413] w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col justify-between shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Monograph Header */}
            <div className="border-b border-[#DCD7CD] p-4 sm:p-6 flex items-start justify-between bg-[#EFECE4]">
              <div>
                <div className="font-mono text-xs text-[#8A867E] mb-1">
                  [ {project.index} ] · {project.category}
                </div>
                <h2 id="modal-project-title" className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413]">
                  {project.title}
                </h2>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                aria-label="Close project inspection modal"
                className="p-2 border border-[#DCD7CD] bg-[#F6F3EC] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Overview & Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 space-y-3">
                  <h3 className="font-mono text-xs uppercase text-[#8A867E] tracking-wider">
                    System Overview
                  </h3>
                  <p className="text-sm leading-relaxed text-[#141413] font-normal">
                    {project.description}
                  </p>
                  <div className="p-3 bg-[#EFECE4] border border-[#DCD7CD] space-y-1">
                    <div className="font-mono text-xs font-semibold text-[#141413] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D84A27]" />
                      Architectural Pattern
                    </div>
                    <div className="font-mono text-xs text-[#575550]">
                      {project.architectureOverview}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-3">
                  <h3 className="font-mono text-xs uppercase text-[#8A867E] tracking-wider">
                    System Metadata
                  </h3>
                  <div className="border border-[#DCD7CD] divide-y divide-[#DCD7CD] text-xs font-mono">
                    <div className="p-2 flex justify-between">
                      <span className="text-[#8A867E]">STATUS</span>
                      <span
                        className={`font-semibold ${
                          project.statusColor === 'olive' ? 'text-[#3F5E45]' : 'text-[#C87D20]'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="p-2 flex justify-between">
                      <span className="text-[#8A867E]">ENGINEER</span>
                      <span className="text-[#141413]">Shubham Vaishnav</span>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <span className="text-[#8A867E]">CORE STACK</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 bg-[#EFECE4] border border-[#DCD7CD] text-[11px] text-[#141413]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {project.repoUrl && (
                    <motion.a
                      href={project.repoUrl}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <GitBranch className="w-4 h-4" />
                      View GitHub Repository ↗
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Swiper Feature Breakdown Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase text-[#8A867E] tracking-wider">
                    Module Breakdown & Implementation Matrix
                  </h3>
                  <div className="text-xs font-mono text-[#8A867E]">
                    Swipe or Drag to Inspect Modules →
                  </div>
                </div>

                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={16}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  pagination={{ clickable: true }}
                  touchStartPreventDefault={false}
                  className="pb-10"
                >
                  {project.verifiedFeatures.map((feat, idx) => (
                    <SwiperSlide key={feat.title}>
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="p-4 bg-[#EFECE4] border border-[#DCD7CD] h-full min-h-[160px] flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs text-[#8A867E]">0{idx + 1}</span>
                            <span
                              className={`font-mono text-[10px] px-1.5 py-0.5 border ${
                                feat.status === 'Implemented'
                                  ? 'border-[#3F5E45] text-[#3F5E45] bg-[#3F5E45]/10'
                                  : 'border-[#C87D20] text-[#C87D20] bg-[#C87D20]/10'
                              }`}
                            >
                              {feat.status === 'Implemented' ? 'Implemented' : 'In Development'}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-[#141413] mb-1.5">{feat.title}</h4>
                          <p className="text-xs text-[#575550] leading-relaxed">
                            {feat.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#DCD7CD] mt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#8A867E]">
                          {feat.status === 'Implemented' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-[#3F5E45]" />
                              Verified Functional
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-[#C87D20]" />
                              Active Sprint Phase
                            </>
                          )}
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Key Engineering Highlights */}
              <div className="space-y-2 border-t border-[#DCD7CD] pt-4">
                <h3 className="font-mono text-xs uppercase text-[#8A867E] tracking-wider">
                  Engineering Rigor & Verification Points
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {project.keyHighlights.map((hl, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 p-2 bg-[#EFECE4] border border-[#DCD7CD]"
                    >
                      <span className="text-[#D84A27] font-mono font-bold">»</span>
                      <span className="text-[#141413]">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#DCD7CD] p-4 bg-[#EFECE4] flex items-center justify-between">
              <div className="font-mono text-xs text-[#8A867E]">
                PRESS [ESC] OR CLICK OUTSIDE TO CLOSE
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="px-4 py-1.5 bg-[#141413] text-[#F6F3EC] text-xs font-mono hover:bg-[#D84A27] transition-colors"
              >
                Close Inspector
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
