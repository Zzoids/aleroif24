import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onLevelUp: () => void;
  isUnlocked: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onLevelUp, isUnlocked }) => {
  const [displayName, setDisplayName] = useState<'Aleroif24' | 'Fiorela'>('Aleroif24');
  const [hasLeveledUp, setHasLeveledUp] = useState(false);
  const matchConfirmRef = useRef<HTMLAudioElement | null>(null);

  const toggleName = () => {
    setDisplayName((prev) => (prev === 'Aleroif24' ? 'Fiorela' : 'Aleroif24'));
  };

  const handleLevelUpClick = () => {
    setHasLeveledUp(true);

    // Sonido de confirmación de partida a volumen bajo (0.25)
    if (matchConfirmRef.current) {
      matchConfirmRef.current.volume = 0.25;
      matchConfirmRef.current.currentTime = 0;
      matchConfirmRef.current.play().catch(() => {});
    }

    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#28a745', '#00ff44', '#C29336', '#E4B343', '#FFFFFF'],
    });

    onLevelUp();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-[#0a0b0d] via-[#121316] to-[#0e0f12] text-[#F2EBDD] border-b border-[#2C2D35]">
      {/* Audio oficial precargado */}
      <audio ref={matchConfirmRef} src="/dota_match_found.mp3" preload="auto" />

      {/* Resplandor ambiental verde volumétrico estilo Dota 2 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#28a745]/15 via-transparent to-transparent pointer-events-none"></div>

      {/* Tarjeta Central */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-2xl w-full bg-[#15161b]/95 backdrop-blur-md rounded-2xl border-2 border-[#38332E] shadow-[0_0_50px_rgba(0,0,0,0.85)] p-6 sm:p-10 text-center"
      >
        {/* Esquinas metálicas estilo Dota */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#C29336]"></div>
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#C29336]"></div>
        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#C29336]"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#C29336]"></div>

        {/* Sticker decorativo de Minki celebrando el Nivel 26 */}
        <div className="hidden sm:block absolute -top-10 -right-8 pointer-events-none z-20 group">
          <img
            src="/minki/emote_platita.png"
            alt="Minki con platita celebrando"
            className="w-20 h-20 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] transform rotate-12 hover:rotate-0 transition-transform"
            title="¡Minki celebrando el Nivel 26!"
          />
        </div>

        {/* Badge completo de Kick oficial */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-block p-1 rounded-2xl bg-black/70 border border-[#3E3835] shadow-lg">
            <img
              src="/aleroif-kick.png"
              alt="Aleroif24 Kick Oficial"
              className="h-16 sm:h-20 object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Título Interactivo (Alternar entre Aleroif24 y Fiorela) */}
        <div className="mb-3">
          <button
            onClick={toggleName}
            className="group inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#C29336] transition-colors mb-2 cursor-pointer"
            title="Haz clic para alternar entre Aleroif24 y Fiorela"
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Haz clic para alternar</span>
          </button>

          <div>
            <AnimatePresence mode="wait">
              <motion.h1
                key={displayName}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2 }}
                onClick={toggleName}
                className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white hover:text-[#E4B343] transition-colors cursor-pointer select-none drop-shadow-[0_2px_15px_rgba(228,179,67,0.4)]"
              >
                {displayName}
              </motion.h1>
            </AnimatePresence>
          </div>
        </div>

        {/* Frase solicitada por el usuario */}
        <p className="mt-4 mb-8 text-sm sm:text-base text-neutral-200 font-serif italic max-w-lg mx-auto leading-relaxed">
          «Un pequeño homenaje a ti, a tus streams y a todos esos momentos que merecen ser recordados».
        </p>

        {/* Diálogo idéntico a Dota 2: YOUR GAME IS READY / ALL PICK / ACCEPT */}
        <div className="relative inline-block max-w-md w-full mx-auto">
          {/* Resplandor verde de humo y luces volumétricas alrededor del cuadro */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#28a745]/30 via-[#00ff44]/25 to-[#28a745]/30 blur-xl opacity-80 rounded-2xl pointer-events-none"></div>

          <div className="relative rounded-xl p-6 bg-[#181d20] border border-[#2d3a35] shadow-[0_10px_40px_rgba(0,0,0,0.9)] text-center">
            {/* Texto superior fino en mayúsculas estilo Dota */}
            <div className="text-[11px] font-sans tracking-[0.25em] text-neutral-300 uppercase mb-1">
              TU PARTIDA ESTÁ LISTA
            </div>

            {/* Subtítulo grande estilo ALL PICK */}
            <div className="text-xl sm:text-2xl font-sans font-bold tracking-widest text-white uppercase mb-5">
              NIVEL 26
            </div>

            {/* Botón ACEPTAR con estilo biselado y textura metálica idéntica a la imagen */}
            <button
              onClick={handleLevelUpClick}
              className="w-full relative py-4 px-8 rounded bg-gradient-to-b from-[#2e6d59] via-[#245847] to-[#183a2f] hover:from-[#3ca081] hover:to-[#225746] active:scale-[0.99] text-white font-sans font-bold text-lg sm:text-xl tracking-widest uppercase border-t border-[#4dbb96] border-x border-b border-[#1b3d32] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_20px_rgba(0,0,0,0.6)] transition-all cursor-pointer select-none"
            >
              <span>{isUnlocked || hasLeveledUp ? '¡NIVEL 26 CONFIRMADO!' : 'ACEPTAR'}</span>
            </button>

            {/* Texto inferior derecho decorativo estilo Dota */}
            <div className="mt-3 text-right">
              <span className="text-[10px] text-neutral-400 font-sans opacity-70">
                Rechazar partida
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
