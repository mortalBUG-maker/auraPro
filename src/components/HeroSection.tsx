import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenConfigurator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConfigurator,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline on mount
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.7'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.7'
        )
        .fromTo(
          imageContainerRef.current,
          { opacity: 0, scale: 0.92, y: 60 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power2.out' },
          '-=0.8'
        );

      // Stagger animation for bottom proof metrics triggered on scroll
      if (metricsRef.current) {
        const metricItems = metricsRef.current.children;
        gsap.fromTo(
          metricItems,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visao-geral"
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-24 flex flex-col justify-between bg-black text-white overflow-hidden"
    >
      {/* Top Editorial Kicker & Monumental Headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full text-center">
        {/* Zero-emoji, zero-pill pure typography kicker */}
        <p
          ref={kickerRef}
          className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-400 uppercase mb-8"
        >
          Titânio Grau 5 · Transdutor Planar 40mm · H3 Bionic Neural
        </p>

        {/* Massive Apple Editorial Headline */}
        <h1
          ref={headlineRef}
          style={{ fontFamily: "'Times New Roman', serif" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.95] text-white text-balance max-w-6xl mx-auto"
        >
          O som na sua forma <br />
          <span className="text-neutral-400">mais pura e visceral.</span>
        </h1>

        {/* Clean Editorial Paragraph */}
        <p
          ref={descRef}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-xl text-neutral-400 font-normal leading-relaxed text-balance"
        >
          Engenharia acústica levada ao extremo. Transdutores planares magnéticos forjados em titânio e processamento neural em tempo real para uma fidelidade que redefine a física da audição humana.
        </p>

        {/* Action Controls - Pure Typography & Minimalist Buttons */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            onClick={onOpenConfigurator}
            className="w-full sm:w-auto px-9 py-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
          >
            Comprar · R$ 4.499
          </button>

          <a
            href="#soundstage"
            className="w-full sm:w-auto px-8 py-4 text-xs font-medium uppercase tracking-wider text-white border border-white/20 hover:border-white transition-colors text-center"
          >
            Experimentar Áudio 360°
          </a>
        </div>
      </div>

      {/* Central Product Showcase - Free-floating in open negative space */}
      <div
        ref={imageContainerRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 my-12 flex flex-col items-center"
      >
        <div className="relative w-full aspect-[16/10] max-h-[580px] overflow-hidden">
          <video
            src="https://files.catbox.moe/tmmhz7.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Massive Proof Numerals Strip - GSAP Stagger Reveal */}
      <div
        ref={metricsRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-12 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <div>
          <div className="text-3xl sm:text-5xl font-bold font-mono tracking-tighter text-white tabular-nums">
            4Hz - 48kHz
          </div>
          <p className="text-xs font-mono tracking-wider uppercase text-neutral-400 mt-2">
            Resposta de Frequência
          </p>
        </div>

        <div>
          <div className="text-3xl sm:text-5xl font-bold font-mono tracking-tighter text-white tabular-nums">
            &lt; 0.0008%
          </div>
          <p className="text-xs font-mono tracking-wider uppercase text-neutral-400 mt-2">
            Distorção Harmônica Total
          </p>
        </div>

        <div>
          <div className="text-3xl sm:text-5xl font-bold font-mono tracking-tighter text-white tabular-nums">
            48 Horas
          </div>
          <p className="text-xs font-mono tracking-wider uppercase text-neutral-400 mt-2">
            Autonomia Contínua com ANC
          </p>
        </div>

        <div>
          <div className="text-3xl sm:text-5xl font-bold font-mono tracking-tighter text-white tabular-nums">
            48.000x/s
          </div>
          <p className="text-xs font-mono tracking-wider uppercase text-neutral-400 mt-2">
            Ajustes Acústicos Neurais
          </p>
        </div>
      </div>
    </section>
  );
};
