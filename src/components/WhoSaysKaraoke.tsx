import React, { useEffect, useRef } from 'react';
import { Disc, Music, Sparkles } from 'lucide-react';
import { SectionAudioBar } from './SectionAudioBar';

interface WhoSaysKaraokeProps {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  onTogglePlay: () => void;
  onVolumeChange: (vol: number) => void;
  onSeek: (time: number) => void;
}

interface LyricLine {
  id: number;
  start: number;
  end: number;
  textEn: string;
  textEs: string;
}

const LYRICS: LyricLine[] = [
  {
    id: 1,
    start: 0.0,
    end: 5.2,
    textEn: "Na-na-na-na, na-na-na-na, na-na-na-na-na",
    textEs: "Na-na-na-na...",
  },
  {
    id: 2,
    start: 5.2,
    end: 10.0,
    textEn: "I'm no beauty queen, I'm just beautiful me",
    textEs: "«No soy una reina de belleza, solo soy una hermosa versión de mí»",
  },
  {
    id: 3,
    start: 10.0,
    end: 14.7,
    textEn: "Na-na-na-na, na-na-na-na, na-na-na-na-na",
    textEs: "Na-na-na-na...",
  },
  {
    id: 4,
    start: 14.7,
    end: 19.5,
    textEn: "You've got every right to a beautiful life, come on!",
    textEs: "«Tienes todo el derecho a una vida hermosa, ¡vamos!»",
  },
  {
    id: 5,
    start: 19.5,
    end: 23.1,
    textEn: "Who says? Who says you're not perfect?",
    textEs: "«¿Quién dice? ¿Quién dice que no eres perfecta?»",
  },
  {
    id: 6,
    start: 23.1,
    end: 25.5,
    textEn: "Who says you're not worth it?",
    textEs: "«¿Quién dice que no lo vales?»",
  },
  {
    id: 7,
    start: 25.5,
    end: 29.0,
    textEn: "Who says you're the only one that's hurtin'?",
    textEs: "«¿Quién dice que eres la única que sufre?»",
  },
  {
    id: 8,
    start: 29.0,
    end: 32.6,
    textEn: "Trust me, that's the price of beauty",
    textEs: "«Créeme, ese es el precio de la belleza»",
  },
  {
    id: 9,
    start: 32.6,
    end: 35.0,
    textEn: "Who says you're not pretty?",
    textEs: "«¿Quién dice que no eres linda?»",
  },
  {
    id: 10,
    start: 35.0,
    end: 37.6,
    textEn: "Who says you're not beautiful?",
    textEs: "«¿Quién dice que no eres hermosa?»",
  },
  {
    id: 11,
    start: 37.6,
    end: 42.8,
    textEn: "Who says?",
    textEs: "«¿Quién lo dice?»",
  },
];

export const WhoSaysKaraoke: React.FC<WhoSaysKaraokeProps> = ({
  isPlaying,
  volume,
  currentTime,
  onTogglePlay,
  onVolumeChange,
  onSeek,
}) => {
  // Encontrar la línea activa exacta según el segundo actual
  const activeLineIndex = LYRICS.findIndex(
    (line) => currentTime >= line.start && currentTime < line.end
  );

  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll exclusivamente INTERNO dentro del cuadro de texto.
  // IMPORTANTE: Se usa container.scrollTo en lugar de scrollIntoView para evitar
  // que la ventana completa de la página se mueva o arrastre al usuario.
  useEffect(() => {
    if (!lyricsContainerRef.current || !activeLineRef.current) return;
    const container = lyricsContainerRef.current;
    const activeEl = activeLineRef.current;

    // Calcular la posición relativa dentro del contenedor con scroll
    const relativeTop = activeEl.offsetTop - container.offsetTop;
    const targetScrollTop = relativeTop - container.clientHeight / 2 + activeEl.clientHeight / 2;

    container.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: 'smooth',
    });
  }, [activeLineIndex]);

  return (
    <div className="mt-14 pt-10 border-t border-[#E5D8C1]/70">
      {/* Frase introductoria solicitada por el usuario */}
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#722F3D] italic tracking-tight drop-shadow-sm">
          «Hay algo que quiero que recuerdes...»
        </h3>
        <p className="text-xs text-neutral-500 font-serif italic mt-2">
          La canción y las palabras que mereces tener siempre presente
        </p>

        {/* Barra de control de audio de la sección */}
        <div className="mt-4 flex justify-center">
          <SectionAudioBar
            title="Who Says"
            artist="Selena Gomez & The Scene"
            isPlaying={isPlaying}
            volume={volume}
            onTogglePlay={onTogglePlay}
            onVolumeChange={onVolumeChange}
            theme="minki"
          />
        </div>
      </div>

      {/* Contenedor principal estilo cabina acústica con tocadiscos y letra sincronizada */}
      <div className="relative bg-[#141519] text-[#F2EBDD] rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.4)] border-2 border-[#38332E] overflow-hidden">
        {/* Esquinas ornamentales estilo refinado */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#C29336]"></div>
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#C29336]"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#C29336]"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#C29336]"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* COLUMNA IZQUIERDA: Disco de vinilo giratorio con la cara de Selena Gomez */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Resplandor ambiental que pulsa con la música */}
              <div
                className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-1000 ${
                  isPlaying ? 'bg-[#C29336]/25 opacity-100' : 'opacity-0'
                }`}
              ></div>

              {/* Vinilo giratorio */}
              <div
                className="relative w-full h-full rounded-full bg-[#0e0e11] flex items-center justify-center transition-transform"
                style={{
                  boxShadow:
                    '0 0 0 3px #1f1f23, 0 0 0 7px #151518, 0 0 0 12px #26262c, 0 0 0 16px #18181b, 0 12px 30px rgba(0,0,0,0.85)',
                  animation: 'spin 5s linear infinite',
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                {/* Ranuras del vinilo */}
                <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none"></div>
                <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none"></div>
                <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none"></div>

                {/* Centro del disco con la fotografía de Selena Gomez */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#C29336] shadow-md flex items-center justify-center bg-black">
                  <img
                    src="/selena_vinyl.jpg"
                    alt="Selena Gomez - Who Says"
                    className="w-full h-full object-cover"
                  />
                  {/* Orificio central del tocadiscos */}
                  <div className="absolute w-4 h-4 rounded-full bg-[#111215] border border-white/60 shadow-inner"></div>
                </div>
              </div>
            </div>

            {/* Ficha técnica de la canción */}
            <div className="mt-4">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#E4B343] font-bold">
                <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
                <span>Who Says</span>
              </div>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                Selena Gomez & The Scene
              </p>
              <span className="inline-block mt-1 text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
                Segmento oficial (0:33 - 1:15)
              </span>
            </div>
          </div>

          {/* COLUMNA DERECHA: Letra sincronizada en tiempo real */}
          <div className="md:col-span-7">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#E4B343]" />
                <span className="text-xs font-bold tracking-wider uppercase text-neutral-300">
                  Letra Sincronizada
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                Toca cualquier línea para saltar a ella
              </span>
            </div>

            {/* Lista de versos con contenedor de scroll aislado */}
            <div
              ref={lyricsContainerRef}
              className="space-y-2 max-h-80 sm:max-h-96 overflow-y-auto pr-2 scrollbar-thin relative"
            >
              {LYRICS.map((line, idx) => {
                const isActive = idx === activeLineIndex;

                return (
                  <div
                    key={line.id}
                    ref={isActive ? activeLineRef : null}
                    onClick={() => onSeek(line.start)}
                    className={`cursor-pointer p-2.5 sm:p-3 rounded-xl transition-all duration-300 flex items-start justify-between gap-3 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#C29336]/25 via-[#722F3D]/20 to-transparent border-l-4 border-[#E4B343] shadow-[0_0_15px_rgba(228,179,67,0.15)] translate-x-1'
                        : 'opacity-50 hover:opacity-90 hover:bg-white/5'
                    }`}
                    title="Haz clic para escuchar desde aquí"
                  >
                    <div className="space-y-0.5">
                      {/* Texto en inglés original */}
                      <p
                        className={`font-serif text-sm sm:text-base leading-snug transition-colors ${
                          isActive
                            ? 'font-bold text-[#E4B343] drop-shadow-[0_0_8px_rgba(228,179,67,0.5)]'
                            : 'text-neutral-200'
                        }`}
                      >
                        {line.textEn}
                      </p>

                      {/* Traducción al español */}
                      <p
                        className={`font-serif text-xs italic transition-colors ${
                          isActive ? 'text-amber-100 font-medium' : 'text-neutral-400'
                        }`}
                      >
                        {line.textEs}
                      </p>
                    </div>

                    {/* Indicador luminoso de la línea activa */}
                    {isActive && (
                      <div className="shrink-0 mt-1">
                        <Sparkles className="w-4 h-4 text-[#E4B343] animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
