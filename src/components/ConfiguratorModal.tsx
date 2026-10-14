import React, { useState } from 'react';
import { Colorway } from '../types';

interface ConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColor: Colorway;
  onColorChange: (color: Colorway) => void;
}

const COLORWAYS: { id: Colorway; name: string; hex: string; note: string }[] = [
  { id: 'space-black', name: 'Space Black', hex: '#111115', note: 'Titânio escovado com deposição física de vapor em carbono' },
  { id: 'titanium-silver', name: 'Natural Titanium', hex: '#a3a3a3', note: 'Liga aeroespacial virgem com acabamento micro-jateado' },
  { id: 'deep-aurora', name: 'Deep Aurora', hex: '#4f46e5', note: 'Anodização eletrolítica em espectro violeta profundo' },
];

export const ConfiguratorModal: React.FC<ConfiguratorModalProps> = ({
  isOpen,
  onClose,
  selectedColor,
  onColorChange,
}) => {
  const [engraving, setEngraving] = useState('');
  const [caseOption, setCaseOption] = useState<'standard' | 'power-pro'>('standard');
  const [auraCare, setAuraCare] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const basePrice = 4499;
  const caseAddon = caseOption === 'power-pro' ? 499 : 0;
  const auraCareAddon = auraCare ? 399 : 0;
  const totalPrice = basePrice + caseAddon + auraCareAddon;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomCode);
    setOrderConfirmed(true);
  };

  const handleReset = () => {
    setOrderConfirmed(false);
    setEngraving('');
    setCaseOption('standard');
    setAuraCare(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#0a0a0c] border border-white/15 text-white shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block">
              Configurador Oficial
            </span>
            <span className="text-xl font-bold tracking-tight text-white">
              AURA Pro Personalizado
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white px-3 py-1 border border-white/20 hover:border-white transition-colors"
          >
            Fechar
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation State - Pure Minimalist Typography */
          <div className="p-8 sm:p-14 text-center">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-4">
              Reserva Confirmada com Prioridade
            </span>
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Seu AURA Pro foi agendado.
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed">
              Sua unidade entrará na linha de usinagem e calibração acústica de precisão. O envio prioritário ocorrerá com rastreamento expresso.
            </p>

            <div className="max-w-md mx-auto border-t border-b border-white/10 py-6 text-left space-y-3 font-mono text-xs mb-10">
              <div className="flex justify-between text-neutral-400">
                <span>Número do Pedido:</span>
                <span className="text-white font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Acabamento:</span>
                <span className="text-white">
                  {COLORWAYS.find((c) => c.id === selectedColor)?.name}
                </span>
              </div>
              {engraving && (
                <div className="flex justify-between text-neutral-400">
                  <span>Gravação Laser:</span>
                  <span className="text-white font-bold">"{engraving}"</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Estojo:</span>
                <span className="text-white">
                  {caseOption === 'power-pro' ? 'Smart Case Power+ 5000mAh' : 'Smart Case Titânio Padrão'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Garantia:</span>
                <span className="text-white">
                  {auraCare ? 'AURA Care+ (2 anos)' : 'Garantia Limitada (1 ano)'}
                </span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                <span>Total:</span>
                <span className="tabular-nums">R$ {totalPrice.toLocaleString('pt-BR')},00</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
              >
                Voltar à Página Principal
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-4 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white border border-white/10 hover:border-white transition-colors"
              >
                Configurar Outro Fone
              </button>
            </div>
          </div>
        ) : (
          /* Configuration Flow */
          <form onSubmit={handleCheckout} className="p-6 sm:p-10 space-y-10">
            {/* 1. Finish Selection */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                <span>01. Acabamento em Titânio</span>
                <span className="text-white font-bold">
                  {COLORWAYS.find((c) => c.id === selectedColor)?.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {COLORWAYS.map((c) => {
                  const isSelected = selectedColor === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => onColorChange(c.id)}
                      className={`p-4 border text-left transition-all ${
                        isSelected
                          ? 'border-white bg-white/10 text-white'
                          : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/40 block mb-3"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="text-sm font-bold text-white mb-1">
                        {c.name}
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-snug">
                        {c.note}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Free Personal Laser Engraving */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                <span>02. Gravação a Laser Personalizada</span>
                <span className="text-white font-bold">Inclusa</span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Grave seu nome ou assinatura técnica no arco superior de titânio (até 16 caracteres).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <input
                  type="text"
                  maxLength={16}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="EX: MAESTRO / SEU NOME"
                  className="sm:col-span-8 bg-black border border-white/20 focus:border-white focus:outline-none px-4 py-3 text-xs font-mono tracking-widest text-white uppercase placeholder-neutral-600"
                />

                <div className="sm:col-span-4 h-11 border border-white/30 bg-neutral-900 flex items-center justify-center font-mono text-xs tracking-widest uppercase text-white/90">
                  {engraving ? engraving : 'AURA · 2026'}
                </div>
              </div>
            </div>

            {/* 3. Case Option */}
            <div className="border-t border-white/10 pt-8">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                03. Estojo de Carga
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCaseOption('standard')}
                  className={`p-4 border text-left transition-all ${
                    caseOption === 'standard'
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                    <span>Smart Case Titânio</span>
                    <span className="font-mono">Incluso</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Modo ultra-hibernação de retenção de carga por 18 meses e Qi2.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCaseOption('power-pro')}
                  className={`p-4 border text-left transition-all ${
                    caseOption === 'power-pro'
                      ? 'border-white bg-white/10 text-white'
                      : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                    <span>Smart Case Power+ 5000mAh</span>
                    <span className="font-mono text-white">+ R$ 499</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Bateria integrada para recarregar o fone por até 96 horas longe da tomada.
                  </p>
                </button>
              </div>
            </div>

            {/* 4. AURA Care+ Protection */}
            <div className="border-t border-white/10 pt-8">
              <label className="flex items-start gap-4 p-5 border border-white/15 hover:border-white/30 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={auraCare}
                  onChange={(e) => setAuraCare(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded-none border-white/30 text-white focus:ring-0 bg-black"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>AURA Care+ (2 Anos de Cobertura Integral)</span>
                    <span className="font-mono tabular-nums">+ R$ 399</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Substituição imediata de componentes acústicos desgastados, reparos sem taxa de franquia e suporte técnico direto com engenheiros de áudio.
                  </p>
                </div>
              </label>
            </div>

            {/* Total & Action */}
            <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Valor Total com Tributos e Frete Expresso
                </span>
                <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tighter text-white tabular-nums">
                  R$ {totalPrice.toLocaleString('pt-BR')},00
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
              >
                Confirmar Reserva de Pré-venda
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
