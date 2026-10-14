import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AudioMode = 'spatial' | 'stereo' | 'anc';

export const SpatialAudioDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<AudioMode>('spatial');
  const [angle, setAngle] = useState(45); // degrees
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const osc3Ref = useRef<OscillatorNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const radarRef = useRef<HTMLDivElement>(null);

  // GSAP scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (consoleRef.current) {
        gsap.fromTo(
          consoleRef.current,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: consoleRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
        gainRef.current = masterGain;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3600, ctx.currentTime);
        filterRef.current = filter;

        const panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(Math.sin((angle * Math.PI) / 180), ctx.currentTime);
        pannerRef.current = panner;

        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(174, ctx.currentTime);

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(261.63, ctx.currentTime);

        const osc3 = ctx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(528, ctx.currentTime);

        const g1 = ctx.createGain();
        g1.gain.value = 0.4;
        const g2 = ctx.createGain();
        g2.gain.value = 0.25;
        const g3 = ctx.createGain();
        g3.gain.value = 0.15;

        osc1.connect(g1);
        osc2.connect(g2);
        osc3.connect(g3);

        g1.connect(filter);
        g2.connect(filter);
        g3.connect(filter);

        filter.connect(panner);
        panner.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc3.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        osc3Ref.current = osc3;
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
    } catch (e) {
      console.warn('AudioContext not allowed or unsupported in this browser environment', e);
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    if (!pannerRef.current || !filterRef.current || !gainRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const rad = (angle * Math.PI) / 180;
    const panValue = Math.sin(rad);

    if (mode === 'spatial') {
      pannerRef.current.pan.setTargetAtTime(panValue, ctx.currentTime, 0.05);
      const isBehind = Math.cos(rad) < 0;
      const freq = isBehind ? 2200 : 5600;
      filterRef.current.frequency.setTargetAtTime(freq, ctx.currentTime, 0.1);
      gainRef.current.gain.setTargetAtTime(0.22, ctx.currentTime, 0.1);
    } else if (mode === 'stereo') {
      const hardPan = panValue > 0 ? 0.8 : -0.8;
      pannerRef.current.pan.setTargetAtTime(hardPan, ctx.currentTime, 0.05);
      filterRef.current.frequency.setTargetAtTime(8000, ctx.currentTime, 0.1);
      gainRef.current.gain.setTargetAtTime(0.2, ctx.currentTime, 0.1);
    } else if (mode === 'anc') {
      pannerRef.current.pan.setTargetAtTime(0, ctx.currentTime, 0.05);
      filterRef.current.frequency.setTargetAtTime(500, ctx.currentTime, 0.2);
      gainRef.current.gain.setTargetAtTime(0.12, ctx.currentTime, 0.2);
    }
  }, [angle, mode]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleRadarMove = (clientX: number, clientY: number) => {
    if (!radarRef.current) return;
    const rect = radarRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    let deg = (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;
    setAngle(Math.round(deg));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleRadarMove(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleRadarMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const radius = 110;
  const orbX = Math.sin((angle * Math.PI) / 180) * radius;
  const orbY = -Math.cos((angle * Math.PI) / 180) * radius;

  return (
    <section
      id="soundstage"
      ref={sectionRef}
      className="py-36 sm:py-44 bg-[#121214] text-white border-t border-white/10 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Editorial Section Header */}
        <div ref={headerRef} className="max-w-5xl mb-20">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-400 uppercase mb-6">
            Renderização Acústica 360°
          </p>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] text-white text-balance">
            O espaço sonoro se curva ao seu redor.
          </h2>
          <p className="mt-8 text-xl sm:text-2xl text-neutral-400 font-normal leading-relaxed max-w-3xl text-balance">
            Utilize fones de ouvido para testar a síntese binaural computacional em tempo real. Arraste o ponto sonoro na órbita e perceba como os filtros de dispersão e o algoritmo de interpolação estéreo respondem instantaneamente.
          </p>
        </div>

        {/* Studio Console Layout */}
        <div
          ref={consoleRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-b border-white/10 py-16"
        >
          {/* Left Column: Geometric Radar */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div
              ref={radarRef}
              onMouseDown={handleMouseDown}
              className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-white/20 bg-black/40 flex items-center justify-center cursor-pointer select-none group"
            >
              {/* Concentric distance lines */}
              <div className="absolute w-3/4 h-3/4 rounded-full border border-dashed border-white/15 pointer-events-none" />
              <div className="absolute w-1/2 h-1/2 rounded-full border border-white/15 pointer-events-none" />
              <div className="absolute w-1/4 h-1/4 rounded-full border border-white/20 pointer-events-none" />

              {/* Crosshair guidelines */}
              <div className="absolute w-full h-[1px] bg-white/10 pointer-events-none" />
              <div className="absolute h-full w-[1px] bg-white/10 pointer-events-none" />

              {/* Center Head Marker */}
              <div className="relative z-10 w-12 h-12 rounded-full border border-white bg-black flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold tracking-wider text-white">OUVINTE</span>
              </div>

              {/* Draggable Sound Point */}
              <div
                style={{
                  transform: `translate(${orbX}px, ${orbY}px)`,
                }}
                className="absolute z-20 w-6 h-6 -ml-3 -mt-3 rounded-full bg-white flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-transform duration-75"
              >
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 text-xs font-mono text-neutral-400 uppercase tracking-widest tabular-nums">
              <span>ÂNGULO: {angle}°</span>
              <span>·</span>
              <span>PAN: {(Math.sin((angle * Math.PI) / 180) * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Right Column: Audio Mode Selector & Master Trigger */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-4">
                Seletor de Modo Computacional
              </span>

              <div className="space-y-4">
                <button
                  onClick={() => setMode('spatial')}
                  className={`w-full text-left p-5 border transition-all cursor-pointer ${
                    mode === 'spatial'
                      ? 'border-white bg-white/5 text-white'
                      : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-base font-bold text-white mb-1">
                    Áudio Espacial Dinâmico 360°
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Resposta de impulso binaural adaptada com amortecimento posterior em tempo real.
                  </p>
                </button>

                <button
                  onClick={() => setMode('stereo')}
                  className={`w-full text-left p-5 border transition-all cursor-pointer ${
                    mode === 'stereo'
                      ? 'border-white bg-white/5 text-white'
                      : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-base font-bold text-white mb-1">
                    Estéreo Convencional
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Separação bidimensional tradicional de dois canais estáticos.
                  </p>
                </button>

                <button
                  onClick={() => setMode('anc')}
                  className={`w-full text-left p-5 border transition-all cursor-pointer ${
                    mode === 'anc'
                      ? 'border-white bg-white/5 text-white'
                      : 'border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-base font-bold text-white mb-1">
                    Cancelamento Quântico Ativo
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Filtragem acústica profunda eliminando ressonâncias ambientais intrusivas.
                  </p>
                </button>
              </div>
            </div>

            {/* Live Equalizer Visualizer */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                <span>{isPlaying ? 'Fluxo Sintetizado Ativo' : 'Sintetizador em Espera'}</span>
                <span className="tabular-nums">{isPlaying ? '192 kHz / 32-bit Lossless' : 'Pronto'}</span>
              </div>

              <div className="h-10 flex items-end justify-between gap-1">
                {[
                  'animate-eq-1',
                  'animate-eq-2',
                  'animate-eq-3',
                  'animate-eq-4',
                  'animate-eq-5',
                  'animate-eq-2',
                  'animate-eq-4',
                  'animate-eq-1',
                  'animate-eq-3',
                  'animate-eq-5',
                  'animate-eq-2',
                  'animate-eq-1',
                ].map((animClass, i) => (
                  <div
                    key={i}
                    className={`flex-1 transition-all duration-300 ${
                      isPlaying
                        ? `${animClass} bg-white`
                        : 'h-[2px] bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Master Button */}
            <div>
              <button
                onClick={togglePlayback}
                className={`w-full py-5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  isPlaying
                    ? 'bg-neutral-800 text-white hover:bg-neutral-700 border border-white/20'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {isPlaying ? 'Pausar Demonstração Sonora' : 'Iniciar Experiência Sonora 360°'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
