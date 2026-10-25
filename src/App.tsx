import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { TechStackMatrix } from './components/TechStackMatrix';
import { AboutSection } from './components/AboutSection';
import { ExperienceLedger } from './components/ExperienceLedger';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('work');
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'stack', 'about', 'journey', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#141413] flex flex-col font-sans selection:bg-[#D84A27] selection:text-[#F6F3EC]">
      <CustomCursor />
      <Navigation activeSection={activeSection} />

      <main className="flex-1">
        <Hero onSelectProject={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />
        <SelectedWork onInspectProject={(project) => setInspectingProject(project)} />
        <TechStackMatrix />
        <AboutSection />
        <ExperienceLedger />
        <CertificatesSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Interactive Swiper Feature Modal */}
      <ProjectDetailModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />
    </div>
  );
}
