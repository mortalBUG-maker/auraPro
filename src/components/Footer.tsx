import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onOpenConfigurator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConfigurator }) => {
  const footerRef = useRef<HTMLElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (calloutRef.current) {
        gsap.fromTo(
          calloutRef.current.children,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: calloutRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white border-t border-white/10">
      {/* Monumental Closing Callout (Apple Style) */}
      <div
        ref={calloutRef}
        className="py-36 sm:py-48 max-w-7xl mx-auto px-6 sm:px-10 text-center"
      >
        <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-500 uppercase mb-6">
          A Nova Dimensão Acústica
        </p>
        <h2 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white max-w-5xl mx-auto text-balance mb-10">
          Ouvir é crer.
        </h2>
        <p className="max-w-xl mx-auto text-base sm:text-lg text-neutral-400 font-normal leading-relaxed mb-12 text-balance">
          Entre na era do áudio computacional de precisão molecular. Reserve sua unidade forjada sob demanda com gravação a laser personalizada gratuita.
        </p>
        <button
          onClick={onOpenConfigurator}
          className="px-10 py-5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          Configurar e Comprar · R$ 4.499
        </button>
      </div>

      {/* Footnotes & Legal Transparency (Apple Style) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-16 pt-8 border-t border-white/10 text-neutral-500 text-xs">
        <div className="space-y-3 leading-relaxed border-b border-white/10 pb-8 text-[11px] text-neutral-500">
          <p>
            1. Os testes de resposta em frequência (4Hz – 48kHz) e distorção harmônica (&lt; 0.0008%) foram realizados em câmara anecoica calibrada conforme IEC 60268-7 com varredura senoidal contínua a 100dB SPL.
          </p>
          <p>
            2. A autonomia de 48 horas foi aferida durante reprodução contínua de arquivo ALAC 24-bit/192kHz a 50% de volume com Cancelamento Quântico Ativo operando continuamente em temperatura de 22°C.
          </p>
          <p>
            3. AURA Pro é manufaturado com 100% de titânio aeroespacial reciclado no headband e 100% de alumínio reciclado nos anéis internos dos transdutores. Embalagem com fibra celulósica 100% livre de plástico.
          </p>
        </div>

        {/* 3-Zone Clean Footer Contract */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-neutral-500">
          <div>
            <span className="text-white font-bold tracking-tight">AURA LABS</span>
            <span className="mx-3">·</span>
            <span>© 2026 AURA Inc. Todos os direitos reservados.</span>
          </div>

          <div className="flex flex-wrap gap-8 text-neutral-400">
            <a href="#visao-geral" className="hover:text-white transition-colors">Visão Geral</a>
            <a href="#design" className="hover:text-white transition-colors">Design</a>
            <a href="#inovacoes" className="hover:text-white transition-colors">Inovações</a>
            <a href="#soundstage" className="hover:text-white transition-colors">Áudio 360°</a>
            <a href="#especificacoes" className="hover:text-white transition-colors">Especificações</a>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span>Brasil</span>
            <span>·</span>
            <span>Privacidade</span>
            <span>·</span>
            <span>Termos de Venda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
