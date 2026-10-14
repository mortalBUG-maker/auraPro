import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PinnedShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statement1Ref = useRef<HTMLDivElement>(null);
  const statement2Ref = useRef<HTMLDivElement>(null);
  const statement3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinTargetRef.current) return;

      // Master Pinning Timeline with smooth scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: pinTargetRef.current,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Subtle video scale as user scrolls through the 200vh
      if (videoRef.current) {
        tl.fromTo(
          videoRef.current,
          { scale: 1 },
          { scale: 1.1, ease: 'none' },
          0
        );
      }

      // Statement 1: Rigidez Estrutural (0.05 -> 0.35)
      if (statement1Ref.current) {
        tl.fromTo(
          statement1Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.05
        ).to(
          statement1Ref.current,
          { opacity: 0, y: -40, duration: 0.12, ease: 'power2.in' },
          0.26
        );
      }

      // Statement 2: Transdutor Suspenso (0.38 -> 0.66)
      if (statement2Ref.current) {
        tl.fromTo(
          statement2Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.38
        ).to(
          statement2Ref.current,
          { opacity: 0, y: -40, duration: 0.12, ease: 'power2.in' },
          0.58
        );
      }

      // Statement 3: Resposta Transitória (0.68 -> 0.96)
      if (statement3Ref.current) {
        tl.fromTo(
          statement3Ref.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.68
        ).to(
          statement3Ref.current,
          { opacity: 0, y: -40, duration: 0.12, ease: 'power2.in' },
          0.88
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#0A0A0C] text-white"
    >
      {/* Pinned Viewport Container (Locks center screen) */}
      <div
        ref={pinTargetRef}
        className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      >
        {/* Subtle radial ambient spotlight */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-white/[0.04] blur-[150px] pointer-events-none" />

        {/* Central Product Video Asset with Overlaid Centered Statements */}
        <div className="relative w-full max-w-4xl aspect-[16/10] max-h-[540px] flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="https://files.catbox.moe/a20cb3.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center will-change-transform"
          />

          {/* Measured contrast scrim for text legibility */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Floating Scrollytelling Statements (Positioned exactly in the middle / center of the background video) */}
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none z-10">
            {/* Statement 1 */}
            <div
              ref={statement1Ref}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300 drop-shadow-md mb-3">
                01 / Rigidez Estrutural
              </span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-3xl">
                Titânio aeroespacial sem micro-ressonâncias.
              </h3>
            </div>

            {/* Statement 2 */}
            <div
              ref={statement2Ref}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300 drop-shadow-md mb-3">
                02 / Transdutor Suspenso
              </span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-3xl">
                Membrana planar oscilando em vácuo acústico.
              </h3>
            </div>

            {/* Statement 3 */}
            <div
              ref={statement3Ref}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
            >
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300 drop-shadow-md mb-3">
                03 / Resposta Transitória
              </span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-3xl">
                Distorção inferior a 0.0008%. Apenas a gravação original.
              </h3>
            </div>
          </div>
        </div>

        {/* Minimalist scroll hint */}
        <div className="absolute top-10 left-10 text-[11px] font-mono uppercase tracking-widest text-neutral-500">
          Experiência Cinemática · Deslize para explorar
        </div>
      </div>
    </section>
  );
};
