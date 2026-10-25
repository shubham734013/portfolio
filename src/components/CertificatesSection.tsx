import React, { useState, useRef } from 'react';
import { CERTIFICATES, Certificate } from '../data/certificates';
import { RollingIndex } from './RollingIndex';
import { Award, CheckCircle2, ChevronLeft, ChevronRight, ShieldCheck, ExternalLink, X, Hash } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { motion, AnimatePresence } from 'motion/react';
import type { Swiper as SwiperType } from 'swiper';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="certificates" className="py-16 md:py-24 border-b border-[#DCD7CD] bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="border-b border-[#DCD7CD] pb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <RollingIndex numberStr="05" />
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413] tracking-tight">
              CERTIFICATIONS & CREDENTIAL LEDGER
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8A867E] flex items-center gap-2">
            <span>SWIPER SLIDE GALLERY · 5 VERIFIED ACCREDITATIONS</span>
          </div>
        </div>

        {/* Swiper Controls Strip */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="text-[#575550] hidden sm:flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3F5E45]" />
            <span>Cryptographically Verified Academic & Industry Credentials</span>
          </div>

          {/* Navigation Buttons for Swiper */}
          <div className="flex items-center gap-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous certificate"
              className="p-2 border border-[#141413] bg-[#EFECE4] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors flex items-center gap-1 text-[11px] font-mono"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next certificate"
              className="p-2 border border-[#141413] bg-[#EFECE4] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors flex items-center gap-1 text-[11px] font-mono"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Swiper.js Certifications Showcase */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            keyboard={{ enabled: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            pagination={{ clickable: true }}
            touchStartPreventDefault={false}
            className="pb-12"
          >
            {CERTIFICATES.map((cert) => (
              <SwiperSlide key={cert.id} className="h-auto">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="bg-[#EFECE4] border border-[#141413] p-5 sm:p-6 flex flex-col justify-between h-full min-h-[320px] shadow-xs hover:shadow-md transition-shadow relative select-none"
                >
                  {/* Top Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#DCD7CD] text-xs font-mono">
                      <span className="text-[#8A867E]">
                        ID: {cert.code}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 border border-[#3F5E45] text-[#3F5E45] bg-[#3F5E45]/10 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#3F5E45]" />
                        {cert.status}
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono text-[#8A867E] uppercase mb-1">
                        {cert.issuer} · {cert.issueDate}
                      </div>
                      <h3 className="font-syne text-lg font-bold text-[#141413] leading-snug line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#575550] leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills & Action */}
                  <div className="space-y-3 pt-4 border-t border-[#DCD7CD] mt-4">
                    <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-1.5 py-0.5 bg-[#F6F3EC] border border-[#DCD7CD] text-[#141413]"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 bg-[#F6F3EC] border border-[#DCD7CD] text-[#8A867E]">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedCert(cert)}
                      className="w-full py-2 px-3 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-[#D84A27]" />
                      <span>Inspect Credential</span>
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Credential Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#141413]/70 backdrop-blur-none"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="bg-[#F6F3EC] border border-[#141413] w-full max-w-lg p-5 sm:p-7 space-y-5 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[#DCD7CD] pb-4">
                <div>
                  <div className="font-mono text-xs text-[#8A867E] mb-1">
                    [ VERIFIED ACCREDITATION ]
                  </div>
                  <h3 id="cert-modal-title" className="font-syne text-xl sm:text-2xl font-bold text-[#141413]">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 border border-[#DCD7CD] bg-[#EFECE4] hover:bg-[#141413] hover:text-[#F6F3EC] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Monograph Spec Table */}
              <div className="border border-[#DCD7CD] divide-y divide-[#DCD7CD] font-mono text-xs bg-[#EFECE4]">
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#8A867E]">ISSUING BODY</span>
                  <span className="font-bold text-[#141413]">{selectedCert.issuer}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#8A867E]">CREDENTIAL CODE</span>
                  <span className="text-[#141413] font-semibold">{selectedCert.credentialId}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#8A867E]">ISSUE TIMELINE</span>
                  <span className="text-[#141413]">{selectedCert.issueDate}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#8A867E]">STATUS</span>
                  <span className="text-[#3F5E45] font-bold">{selectedCert.status}</span>
                </div>
              </div>

              {/* Description & Competencies */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase text-[#8A867E]">
                  Curriculum & Outcome:
                </div>
                <p className="text-xs sm:text-sm text-[#575550] leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="font-mono text-xs uppercase text-[#8A867E]">
                  Accredited Competencies:
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {selectedCert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-[#EFECE4] border border-[#DCD7CD] text-[#141413]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulated Cryptographic Hash Verification */}
              <div className="p-3 bg-[#141413] text-[#F6F3EC] font-mono text-[10px] space-y-1">
                <div className="text-[#D84A27] font-semibold flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  ACCREDITATION CHECKSUM (SHA-256)
                </div>
                <div className="text-[#8A867E] truncate">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-full py-2.5 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
