import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DesignMaterialSection } from './components/DesignMaterialSection';
import { PinnedShowcaseSection } from './components/PinnedShowcaseSection';
import { SpatialAudioDemo } from './components/SpatialAudioDemo';
import { InnovationsSection } from './components/InnovationsSection';
import { TechSpecsSection } from './components/TechSpecsSection';
import { ConfiguratorModal } from './components/ConfiguratorModal';
import { Footer } from './components/Footer';
import { Colorway } from './types';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeColor, setActiveColor] = useState<Colorway>('space-black');
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  // Dynamic Background Color Transitions driven by ScrollTrigger
  useEffect(() => {
    const colorStages = [
      { trigger: '#visao-geral', bg: '#000000' },
      { trigger: '#design', bg: '#FFFFFF' },
      { trigger: '#pinned-stage', bg: '#0A0A0C' },
      { trigger: '#soundstage', bg: '#121214' },
      { trigger: '#inovacoes', bg: '#F5F5F7' },
      { trigger: '#especificacoes', bg: '#FFFFFF' },
      { trigger: 'footer', bg: '#000000' },
    ];

    const triggers: ScrollTrigger[] = [];

    colorStages.forEach(({ trigger, bg }) => {
      const el = document.querySelector(trigger);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          gsap.to(document.body, {
            backgroundColor: bg,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
        onEnterBack: () => {
          gsap.to(document.body, {
            backgroundColor: bg,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden transition-colors duration-500">
      {/* Top Bar Navigation */}
      <Navbar onOpenConfigurator={() => setIsConfiguratorOpen(true)} />

      {/* Main Single-Page Content with GSAP ScrollTrigger Orchestration */}
      <main>
        {/* Section 1: #000000 - Hero Section with Stagger Metrics */}
        <HeroSection onOpenConfigurator={() => setIsConfiguratorOpen(true)} />

        {/* Section 2: #FFFFFF - Design, Materials & Ergonomics */}
        <DesignMaterialSection />

        {/* Section 3: #0A0A0C - Pinning / Sticky 200vh Scrollytelling Stage */}
        <div id="pinned-stage">
          <PinnedShowcaseSection />
        </div>

        {/* Section 4: #121214 - Interactive 360° Spatial Audio Soundstage Studio */}
        <SpatialAudioDemo />

        {/* Section 5: #F5F5F7 - Inventions & Architecture with Stagger Reveals */}
        <InnovationsSection />

        {/* Section 6: #FFFFFF - Rigorous Technical Specs Table */}
        <TechSpecsSection />
      </main>

      {/* Section 7: #000000 - Monumental Closing Callout & Quiet Footnotes */}
      <Footer onOpenConfigurator={() => setIsConfiguratorOpen(true)} />

      {/* Interactive Configurator & Pre-Order Drawer */}
      <ConfiguratorModal
        isOpen={isConfiguratorOpen}
        onClose={() => setIsConfiguratorOpen(false)}
        selectedColor={activeColor}
        onColorChange={setActiveColor}
      />
    </div>
  );
}
