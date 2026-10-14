import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const DesignMaterialSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal headline block on scroll
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Video reveal & parallax scale
      if (videoWrapperRef.current && videoRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoWrapperRef.current,
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(
          videoRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: videoWrapperRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Stagger reveal on the 3 editorial points
      if (pointsListRef.current) {
        const points = pointsListRef.current.children;
        gsap.fromTo(
          points,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pointsListRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="design"
      ref={sectionRef}
      className="py-36 sm:py-44 bg-white text-[#0a0a0a] border-t border-black/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Headline Block */}
        <div ref={headlineRef} className="max-w-5xl mb-24">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase mb-6">
            Morfologia e Materialidade
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-[#0a0a0a] text-balance">
            Forjado no limite absoluto da física dos materiais.
          </h2>
          <p className="mt-8 text-xl sm:text-2xl text-neutral-600 font-normal leading-relaxed max-w-3xl text-balance">
            Cada concha acústica é usinada a partir de uma barra maciça de titânio aeroespacial. Uma liga criada para suportar as tensões de naves espaciais, agora aplicada para neutralizar qualquer microvibração mecânica indesejada.
          </p>
        </div>

        {/* Large Architectural Split Layout - Open, No Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Left Column: Architectural Video with Parallax Scale */}
          <div ref={videoWrapperRef} className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-neutral-100">
              <video
                ref={videoRef}
                src="https://files.catbox.moe/oez0ik.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center will-change-transform"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <span>Cinematografia Arquitetônica</span>
              <span>Estrutura Craniana Balanceada · 285g</span>
            </div>
          </div>

          {/* Right Column: Editorial Points with GSAP Stagger */}
          <div ref={pointsListRef} className="lg:col-span-5 space-y-16">
            <div className="border-t border-black/10 pt-6">
              <span className="text-xs font-mono text-neutral-400 block mb-2">01 / ESTRUTURA</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a] mb-3">
                Titânio Grau 5 Aeroespacial
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Mais rígido que o aço inoxidável e 45% mais leve que o alumínio estrutural tradicional. A concha acústica elimina ressonâncias antes que interfiram na onda sonora.
              </p>
            </div>

            <div className="border-t border-black/10 pt-6">
              <span className="text-xs font-mono text-neutral-400 block mb-2">02 / ERGONOMIA</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a] mb-3">
                Malha com Memória de Tensão
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                O arco superior utiliza tecido elastomérico respirável de tensão distribuída. A pressão de fixação é equalizada em toda a extensão da cabeça, resultando em sensação de gravidade zero.
              </p>
            </div>

            <div className="border-t border-black/10 pt-6">
              <span className="text-xs font-mono text-neutral-400 block mb-2">03 / ISOLAMENTO</span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0a0a0a] mb-3">
                Almofadas com Acoplamento Magnético
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Espuma acústica viscoelástica de densidade sob medida que molda perfeitamente o contorno auricular, criando uma câmara hermética para graves profundos e troca instantânea sem ferramentas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
