import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, Compass, Sparkles, Heart, RotateCcw, ZoomIn, X } from 'lucide-react';
import { WhoSaysKaraoke } from './WhoSaysKaraoke';

interface BeyondTheScreenProps {
  graduationPhotoUrl?: string;
  isMusicPlaying: boolean;
  musicVolume: number;
  currentTime: number;
  onToggleMusic: () => void;
  onMusicVolumeChange: (vol: number) => void;
  onSeek: (time: number) => void;
}

interface FlipCard {
  id: string;
  icon: React.ReactNode;
  tag: string;
  frontTitle: string;
  phrase: string;
  note: string;
  borderFront: string;
  bgBack: string;
  borderBack: string;
  accentText: string;
}

export const BeyondTheScreen: React.FC<BeyondTheScreenProps> = ({
  graduationPhotoUrl,
  isMusicPlaying,
  musicVolume,
  currentTime,
  onToggleMusic,
  onMusicVolumeChange,
  onSeek,
}) => {
  const photoSrc = graduationPhotoUrl || '/graduacion.jpg';
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const cards: FlipCard[] = [
    {
      id: 'proceso',
      icon: <Compass className="w-5 h-5 text-[#C29336]" />,
      tag: 'Paciencia',
      frontTitle: 'Tu Propio Ritmo',
      phrase: 'Confía en tu proceso.',
      note: 'Cada etapa tiene su momento. Lo que estás construyendo con constancia y dedicación tiene raíces firmes.',
      borderFront: 'border-[#E5D8C1]',
      bgBack: 'bg-gradient-to-br from-[#FFFDF8] via-[#FFF8EF] to-[#FEF3E2]',
      borderBack: 'border-[#C29336]/60',
      accentText: 'text-[#C29336]',
    },
    {
      id: 'hoy',
      icon: <Sparkles className="w-5 h-5 text-[#722F3D]" />,
      tag: 'Calma',
      frontTitle: 'Un Día a la Vez',
      phrase: 'No tienes que tener todo resuelto hoy.',
      note: 'Basta con dar el paso de hoy. La calma y la amabilidad contigo misma también son una forma de valentía.',
      borderFront: 'border-[#E5D8C1]',
      bgBack: 'bg-gradient-to-br from-[#FFFDF8] via-[#FCF3F5] to-[#F9E9EC]',
      borderBack: 'border-[#722F3D]/50',
      accentText: 'text-[#722F3D]',
    },
    {
      id: 'logros',
      icon: <Award className="w-5 h-5 text-amber-700" />,
      tag: 'Reconocimiento',
      frontTitle: 'Cada Paso Suma',
      phrase: 'Celebra también tus pequeños logros.',
      note: 'Las victorias cotidianas, los días difíciles superados y las sonrisas en directo merecen el mismo aplauso.',
      borderFront: 'border-[#E5D8C1]',
      bgBack: 'bg-gradient-to-br from-[#FFFDF8] via-[#FEF8ED] to-[#FDF0D5]',
      borderBack: 'border-amber-500/60',
      accentText: 'text-amber-800',
    },
    {
      id: 'esencia',
      icon: <Heart className="w-5 h-5 text-[#722F3D]" />,
      tag: 'Bienestar',
      frontTitle: 'Tu Esencia',
      phrase: 'Tu valor no depende de la prisa del mundo.',
      note: 'Descansar, respirar y cuidar de tu paz mental también es avanzar con el corazón pleno.',
      borderFront: 'border-[#E5D8C1]',
      bgBack: 'bg-gradient-to-br from-[#FFFDF8] via-[#F4F8F5] to-[#E9F3EB]',
      borderBack: 'border-emerald-600/50',
      accentText: 'text-emerald-800',
    },
  ];

  return (
    <section id="beyond-the-screen" className="py-20 px-4 max-w-5xl mx-auto">
      {/* Encabezado: solo 'Detrás de la pantalla' */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#302622] tracking-tight">
          Detrás de la pantalla
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-scrapbook border border-[#F2EBDD] relative overflow-visible"
      >
        <div className="washi-tape"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Marco de fotografía de Graduación */}
          <div className="md:col-span-5 flex justify-center">
            <div
              onClick={() => setIsPhotoOpen(true)}
              className="relative bg-[#FAF7F2] p-4 rounded-2xl shadow-md border border-[#E5D8C1] transform rotate-[-2deg] hover:rotate-0 transition-all max-w-xs w-full cursor-pointer group"
              title="Haz clic para ver la fotografía completa"
            >
              <div className="washi-tape"></div>

              <div className="aspect-[4/5] bg-[#E5D8C1] rounded-xl overflow-hidden relative shadow-inner flex items-center justify-center">
                <img
                  src={photoSrc}
                  alt="Graduación y Colegiatura de Fiorela"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />

                {/* Botón de lupa al pasar el cursor */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3 text-center flex items-center justify-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#722F3D]" />
                <span className="font-serif text-sm font-semibold text-[#722F3D]">
                  Psicóloga Colegiada
                </span>
              </div>
            </div>
          </div>

          {/* Reconocimiento y Mensaje Dedicado */}
          <div className="md:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#722F3D]/10 text-xs font-semibold text-[#722F3D]">
              <Award className="w-3.5 h-3.5" />
              <span>PSICOLOGÍA Y NUEVOS HORIZONTES</span>
            </div>

            {/* Tarjeta del mensaje destacado con el sticker de Minki */}
            <div className="relative bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E5D8C1] shadow-sm">
              <div className="washi-tape"></div>

              {/* Sticker de Minki en la esquina de la tarjeta */}
              <div className="absolute -top-7 -right-4 z-10 pointer-events-none">
                <img
                  src="/minki/emote_parado.png"
                  alt="Minki"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md transform rotate-6"
                  title="Minki"
                />
              </div>

              <p className="font-serif text-base sm:text-lg md:text-xl text-[#302622] leading-relaxed italic pr-4">
                «Además de ser una streamer que nos regala momentos divertidos y especiales, también eres una profesional en Psicología, con sueños, metas y un camino lleno de oportunidades por delante. Que nunca pierdas esa esencia que te hace única y que sigas cosechando muchos éxitos tanto dentro como fuera de las transmisiones.»
              </p>
            </div>
          </div>
        </div>

        {/* Sección de las 4 Tarjetas Interactivas con Frases */}
        <div className="mt-12 pt-8 border-t border-[#E5D8C1]/70">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#722F3D] bg-[#722F3D]/10 px-3 py-1 rounded-full border border-[#722F3D]/20">
              Recordatorios para el camino
            </span>
            <p className="text-xs text-neutral-500 font-serif italic mt-2">
              Haz clic en cada tarjeta para voltearla y descubrir su mensaje
            </p>
          </div>

          {/* Grilla de 4 Tarjetas con Efecto Flip 3D */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {cards.map((card) => {
              const isFlipped = Boolean(flippedCards[card.id]);

              return (
                <div
                  key={card.id}
                  onClick={() => toggleCard(card.id)}
                  className="perspective-1000 h-64 cursor-pointer group"
                  title="Toca para voltear"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : 'group-hover:scale-[1.02]'
                    }`}
                  >
                    {/* FRENTE DE LA TARJETA */}
                    <div
                      className={`absolute inset-0 backface-hidden bg-white p-5 rounded-2xl shadow-sm border ${card.borderFront} flex flex-col justify-between items-center text-center`}
                    >
                      <div className="washi-tape"></div>

                      <div className="w-full flex justify-between items-center pt-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                          {card.tag}
                        </span>
                        <RotateCcw className="w-3.5 h-3.5 text-neutral-300 group-hover:rotate-180 transition-transform duration-500" />
                      </div>

                      <div className="flex flex-col items-center my-auto">
                        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5D8C1] shadow-inner mb-3">
                          {card.icon}
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#302622]">
                          {card.frontTitle}
                        </h4>
                      </div>

                      <div className="w-full pt-2 border-t border-neutral-100 text-[11px] text-[#722F3D] font-medium flex items-center justify-center gap-1">
                        <span>Toca para voltear</span>
                      </div>
                    </div>

                    {/* DORSO DE LA TARJETA (FRASE + REFLEXIÓN) */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 ${card.bgBack} p-5 rounded-2xl shadow-md border-2 ${card.borderBack} flex flex-col justify-between text-center`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 bg-white/70 px-2 py-0.5 rounded border border-neutral-200">
                          {card.tag}
                        </span>
                        <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                      </div>

                      <div className="my-auto px-1 space-y-2.5">
                        <p className={`font-serif text-base sm:text-lg font-bold ${card.accentText} leading-snug drop-shadow-sm`}>
                          «{card.phrase}»
                        </p>
                        <p className="text-xs text-neutral-600 font-serif leading-relaxed">
                          {card.note}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-black/5 text-[10px] text-neutral-400 font-mono flex items-center justify-center gap-1">
                        <span>Haz clic para volver a girar</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sección de Canción y Letra Sincronizada: Selena Gomez - Who Says */}
        <WhoSaysKaraoke
          isPlaying={isMusicPlaying}
          volume={musicVolume}
          currentTime={currentTime}
          onTogglePlay={onToggleMusic}
          onVolumeChange={onMusicVolumeChange}
          onSeek={onSeek}
        />
      </motion.div>

      {/* Modal Lightbox para ver la Fotografía Completa */}
      <AnimatePresence>
        {isPhotoOpen && (
          <div
            onClick={() => setIsPhotoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-5 shadow-2xl border border-neutral-200 cursor-default"
            >
              <button
                onClick={() => setIsPhotoOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[75vh] rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                <img
                  src={photoSrc}
                  alt="Graduación y Colegiatura de Fiorela"
                  className="max-w-full max-h-[75vh] object-contain"
                />
              </div>

              <div className="mt-4 text-center">
                <h4 className="font-serif text-lg font-bold text-[#302622]">
                  Psicóloga Colegiada
                </h4>
                <p className="text-xs text-neutral-500 font-serif italic mt-0.5">
                  Un logro que conmemora el esfuerzo, la constancia y el orgullo de esta etapa.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
