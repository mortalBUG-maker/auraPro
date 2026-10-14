import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const InnovationsSection: React.FC = () => {
  const [fastChargeSimulated, setFastChargeSimulated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const feature3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal headline block
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Feature 1: Planar Magnetic Driver
      if (feature1Ref.current) {
        gsap.fromTo(
          feature1Ref.current.children,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: feature1Ref.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Feature 2: Neural H3 Core & 48h Battery (Stagger across the 2 cols)
      if (feature2Ref.current) {
        gsap.fromTo(
          feature2Ref.current.children,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: feature2Ref.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Feature 3: Smart Power Case
      if (feature3Ref.current) {
        gsap.fromTo(
          feature3Ref.current.children,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: feature3Ref.current,
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
      id="inovacoes"
      ref={sectionRef}
      className="py-36 sm:py-44 bg-[#F5F5F7] text-[#111111] border-t border-black/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Headline */}
        <div ref={headerRef} className="max-w-5xl mb-28">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase mb-6">
            Inovações e Arquitetura Acústica
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-[#111111] text-balance">
            Revolução de silício, cobre e titânio.
          </h2>
          <p className="mt-8 text-xl sm:text-2xl text-neutral-600 font-normal leading-relaxed max-w-3xl text-balance">
            Quatro inovações proprietárias convergem no AURA Pro para criar uma experiência sensorial incomparável.
          </p>
        </div>

        {/* Feature 1: Planar Magnetic Driver Macro Showcase (Open Layout, Full-Bleed) */}
        <div
          ref={feature1Ref}
          className="border-t border-black/15 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
              Inovação 01 / Transdutor
            </span>
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
              Transdutor Planar Magnético de 40mm
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed">
              Diferente de cones dinâmicos convencionais que flexionam sob transientes agressivos, nossa membrana planar ultrafina de poliimida oscila uniformemente entre duas matrizes paralelas de ímãs de neodímio N52.
            </p>
            <div className="pt-4 border-t border-black/10 flex items-baseline gap-6">
              <div>
                <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tighter tabular-nums text-[#111111]">
                  4Hz - 48kHz
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-1">
                  Alcance Espectral Integral
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200">
              <img
                src="/src/assets/images/aura_driver_exploded_1792004530770.jpg"
                alt="Vista explodida de alta precisão do driver planar magnético AURA"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <span>Diafragma com condutores gravados a laser</span>
              <span>Distorção Harmônica &lt; 0.0008%</span>
            </div>
          </div>
        </div>

        {/* Feature 2: Neural H3 Core & 48h Battery (Open 2-Column Split with Stagger) */}
        <div
          ref={feature2Ref}
          className="border-t border-black/15 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left Column: Neural H3 Core */}
          <div className="space-y-6">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
              Inovação 02 / Silício
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              Processador H3 Bionic Neural Core
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed">
              Dezesseis núcleos neurais realizam calibrações de pressão acústica e cálculo binaural tridimensional em tempo real, sem depender de processamento em nuvem ou latência de smartphone.
            </p>

            <div className="pt-6 border-t border-black/10">
              <div className="text-5xl sm:text-7xl font-bold font-mono tracking-tighter tabular-nums text-[#111111]">
                48 Bilhões
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-2">
                Operações neurais por segundo em cada concha
              </div>
            </div>
          </div>

          {/* Right Column: 48h Endurance & Fast Charge */}
          <div className="space-y-6">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
              Inovação 03 / Energia
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              Autonomia Contínua de 48 Horas
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed">
              Células de ânodo em silício-carbono garantem o dobro de densidade de bateria no mesmo volume físico, fornecendo 48 horas ininterruptas de áudio lossless com cancelamento quântico ligado.
            </p>

            {/* Interactive Fast Charge Simulation Bar */}
            <div className="pt-6 border-t border-black/10">
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-5xl sm:text-7xl font-bold font-mono tracking-tighter tabular-nums text-[#111111]">
                  {fastChargeSimulated ? '+6h' : '10 min'}
                </div>
                <button
                  onClick={() => setFastChargeSimulated(!fastChargeSimulated)}
                  className="text-xs font-mono uppercase tracking-wider text-neutral-700 underline hover:text-black cursor-pointer"
                >
                  {fastChargeSimulated ? 'Redefinir' : 'Simular Recarga'}
                </button>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                10 minutos de recarga USB-C PD fornecem 6 horas de reprodução
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Smart Power Case (Open Layout, Full-Bleed) */}
        <div
          id="acessorios"
          ref={feature3Ref}
          className="border-t border-black/15 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200">
              <img
                src="/src/assets/images/aura_smart_case_1792004550948.jpg"
                alt="Estojo inteligente em titânio usinado para fone AURA Pro"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <span>Smart Power Case em Titânio Forjado</span>
              <span>Indução Magnética Qi2 + USB-C Lossless</span>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">
              Inovação 04 / Estojo
            </span>
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
              Estojo Inteligente em Titânio Usinado
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed">
              Ao repousar o headset no estojo inteligente, atuadores magnéticos ativam instantaneamente o estado de ultra-hibernação de energia, retendo a carga por até 18 meses. Suporta indução Qi2 e áudio digital sem perdas direto para computadores de estúdio.
            </p>

            <div className="pt-4 border-t border-black/10 grid grid-cols-2 gap-6 text-xs font-mono uppercase tracking-wider text-neutral-500">
              <div>
                <span className="text-2xl font-bold font-mono tracking-tight text-[#111111] block mb-1">
                  18 Meses
                </span>
                <span>Retenção de Carga</span>
              </div>
              <div>
                <span className="text-2xl font-bold font-mono tracking-tight text-[#111111] block mb-1">
                  Qi2 + USB-C
                </span>
                <span>Carregamento Duplo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
