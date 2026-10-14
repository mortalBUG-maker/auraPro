import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SPECS_LIST = [
  { label: 'Transdutor Acústico', aura: 'Planar Magnético Proprietário 40mm (Neodímio N52)', industry: 'Dinâmico padrão 40mm (Neodímio N40)' },
  { label: 'Resposta de Frequência', aura: '4 Hz – 48.000 Hz (Hi-Res Audio Certified)', industry: '20 Hz – 20.000 Hz' },
  { label: 'Distorção Harmônica (THD)', aura: '< 0.0008% @ 1kHz, 100dB SPL', industry: '~ 0.1% – 0.5%' },
  { label: 'Processador de Sinal', aura: 'Neural H3 Bionic (16 núcleos dedicados)', industry: 'DSP estéreo convencional' },
  { label: 'Cancelamento Ativo (ANC)', aura: 'Cancelamento Quântico 3.0 (-45dB) com 8 microfones', industry: 'ANC padrão (-28dB a -35dB)' },
  { label: 'Latência em Modo Estúdio', aura: '4ms (Ultra-Wideband 2.4GHz sem compressão)', industry: '40ms a 120ms (Bluetooth tradicional)' },
  { label: 'Autonomia com ANC Ativado', aura: '48 Horas contínuas (Células Silício-Carbono)', industry: '20 a 30 Horas' },
  { label: 'Recarga Rápida', aura: '10 minutos de carga = 6 horas de áudio', industry: '15 minutos = 2 a 3 horas' },
  { label: 'Estrutura e Acabamento', aura: 'Titânio Aeroespacial Grau 5 forjado a laser', industry: 'Alumínio comum e policarbonato' },
  { label: 'Massa Craniana Balanceada', aura: '285 gramas com suspensão craniana zero-pressão', industry: '380 a 410 gramas' },
];

export const TechSpecsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'box'>('matrix');
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const boxGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 80 },
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

      if (tableBodyRef.current) {
        const rows = tableBodyRef.current.children;
        gsap.fromTo(
          rows,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tableBodyRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      id="especificacoes"
      ref={sectionRef}
      className="py-36 sm:py-44 bg-white text-[#0a0a0a] border-t border-black/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-black/10 pb-10"
        >
          <div>
            <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase mb-4">
              Especificações Técnicas
            </p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0a0a0a]">
              Rigor métrico e comparativo.
            </h2>
          </div>

          {/* Minimalist Tab Selector - Pure Typography */}
          <div className="flex items-center gap-8 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`pb-2 border-b transition-colors cursor-pointer ${
                activeTab === 'matrix'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-400 hover:text-black'
              }`}
            >
              Ficha Técnica Comparativa
            </button>
            <button
              onClick={() => setActiveTab('box')}
              className={`pb-2 border-b transition-colors cursor-pointer ${
                activeTab === 'box'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-400 hover:text-black'
              }`}
            >
              Conteúdo da Embalagem
            </button>
          </div>
        </div>

        {/* Tab 1: Pure Typography Table with Hairlines & Stagger */}
        {activeTab === 'matrix' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/15 text-xs font-mono uppercase tracking-wider text-neutral-400">
                  <th className="py-5 pr-8 font-normal w-1/3">Parâmetro de Engenharia</th>
                  <th className="py-5 px-8 font-bold text-black w-1/3">AURA Pro</th>
                  <th className="py-5 pl-8 font-normal w-1/3">Padrão de Mercado Premium</th>
                </tr>
              </thead>
              <tbody ref={tableBodyRef} className="divide-y divide-black/10 text-xs sm:text-sm">
                {SPECS_LIST.map((spec, i) => (
                  <tr key={i} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-6 pr-8 font-medium text-neutral-600">
                      {spec.label}
                    </td>
                    <td className="py-6 px-8 font-bold text-[#0a0a0a]">
                      {spec.aura}
                    </td>
                    <td className="py-6 pl-8 text-neutral-500">
                      {spec.industry}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Tab 2: What's in the Box - Open Editorial Layout */
          <div
            ref={boxGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-black/10 pt-10"
          >
            <div>
              <span className="text-xs font-mono text-neutral-400 block mb-2">01 / DISPOSITIVO</span>
              <h4 className="text-lg font-bold text-black mb-2">Headset AURA Pro</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Fone de ouvido em titânio Grau 5 com almofadas magnéticas de espuma acústica de memória e haste de alívio de tensão craniana.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-400 block mb-2">02 / ENERGIA</span>
              <h4 className="text-lg font-bold text-black mb-2">Smart Case em Titânio</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Estojo forjado com ultra-hibernação de energia magnética e compatibilidade com bases de indução sem fios Qi2.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-400 block mb-2">03 / CABO DIGITAL</span>
              <h4 className="text-lg font-bold text-black mb-2">Cabo USB-C Trançado (1.8m)</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Condutores de cobre livre de oxigênio blindados para áudio sem perdas 192kHz/32-bit e recarga ultra-rápida Power Delivery.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-400 block mb-2">04 / ESTÚDIO</span>
              <h4 className="text-lg font-bold text-black mb-2">Kit Analógico Profissional</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Cabo analógico 3.5mm trançado e adaptador de rosca de alta precisão P10 de 6.3mm banhado a ouro 24k.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
