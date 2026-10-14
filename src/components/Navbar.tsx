import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenConfigurator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConfigurator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          AURA PRO
        </a>

        {/* Zone 2: 4–5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-neutral-400">
          <a
            href="#visao-geral"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Visão Geral
          </a>
          <a
            href="#design"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Design & Matéria
          </a>
          <a
            href="#soundstage"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Áudio 360°
          </a>
          <a
            href="#inovacoes"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Inovações
          </a>
          <a
            href="#especificacoes"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Especificações
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenConfigurator}
            className="px-5 py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-colors tracking-tight whitespace-nowrap shrink-0"
          >
            Comprar · R$ 4.499
          </button>

          {/* Mobile minimal toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xs font-medium uppercase tracking-wider text-neutral-400 hover:text-white px-2 py-1"
            aria-label="Menu"
          >
            {mobileMenuOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4">
          <a
            href="#visao-geral"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Visão Geral
          </a>
          <a
            href="#design"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Design & Matéria
          </a>
          <a
            href="#soundstage"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Áudio 360°
          </a>
          <a
            href="#inovacoes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Inovações
          </a>
          <a
            href="#especificacoes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white"
          >
            Especificações
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
            >
              Configurar Unidade
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
