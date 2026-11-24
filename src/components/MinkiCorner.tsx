import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cat, X, Heart, ZoomIn } from 'lucide-react';
import { SectionAudioBar } from './SectionAudioBar';

interface MinkiPhoto {
  id: string;
  src: string;
  title: string;
  note: string;
  rotation: string;
}

interface MinkiCornerProps {
  isMusicPlaying: boolean;
  musicVolume: number;
  onToggleMusic: () => void;
  onMusicVolumeChange: (vol: number) => void;
}

export const MinkiCorner: React.FC<MinkiCornerProps> = ({
  isMusicPlaying,
  musicVolume,
  onToggleMusic,
  onMusicVolumeChange,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MinkiPhoto | null>(null);

  // Fotografías organizadas según las indicaciones del usuario
  const photos: MinkiPhoto[] = [
    {
      id: 'falda',
      src: '/minki/minki_en_falda.jpg',
      title: 'En su lugar seguro.',
      note: 'El mejor apoyo moral para cualquier noche de rankeds y también para los días más difíciles.',
      rotation: '-rotate-2',
    },
    {
      id: 'abrazo',
      src: '/minki/minki_con_fiorela.jpg',
      title: 'Minki marcando territorio con su pata',
      note: 'No entregará a Fiorela tan fácilmente',
      rotation: 'rotate-2',
    },
    {
      id: 'gorrito',
      src: '/minki/minki_gorrito_real.jpg',
      title: 'Listo para mudarse a su barril',
      note: 'El icónico outfit de gorrito a cuadros y polo a rayas.',
      rotation: '-rotate-1',
    },
    {
      id: 'chambea',
      src: '/minki/minki_chambeador.jpg',
      title: 'Duerme como si chambeara',
      note: 'Agotado tras moderar las 6 horas de directo.',
      rotation: 'rotate-2',
    },
    {
      id: 'estirado',
      src: '/minki/minki_estirado_rosa.jpg',
      title: 'Todo seductor',
      note: 'Mirando a Fiorela con ojos seductores para recibir su premio.',
      rotation: '-rotate-2',
    },
    {
      id: 'panza',
      src: '/minki/minki_panza_arriba.jpg',
      title: 'Modo Felicidad',
      note: 'Sueña que le dieron un churu... ya casi puede saborearlo.',
      rotation: 'rotate-1',
    },
    {
      id: 'dientitos',
      src: '/minki/minki_dientitos.jpg',
      title: 'Apreciando a Fiorela.',
      note: 'Se quedó admirando la belleza de su dueña.',
      rotation: '-rotate-3',
    },
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Sticker decorativo flotante en la esquina de la sección */}
      <img
        src="/minki/emote_despertador.png"
        alt="Minki Despertador Decorativo"
        className="hidden md:block absolute -top-8 right-6 w-24 h-24 object-contain pointer-events-none drop-shadow-md z-10 animate-pulse"
      />

      {/* Encabezado */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#722F3D]/10 text-xs font-semibold text-[#722F3D] uppercase tracking-wider mb-3">
          <Cat className="w-4 h-4 text-[#722F3D]" />
          <span>El Guardián de las Transmisiones</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#302622] tracking-tight">
          El Rincón de Minki
        </h2>
        <p className="text-sm text-neutral-600 mt-2 max-w-lg mx-auto">
          El verdadero coprotagonista de los streams, dueño indiscutible del teclado y compañero inseparable de Fiorela.
        </p>

        {/* Reproductor de audio de la sección */}
        <div className="mt-5 flex justify-center">
          <SectionAudioBar
            title="Miel"
            artist="Lauri Garcia (Tú eres el pincel...)"
            isPlaying={isMusicPlaying}
            volume={musicVolume}
            onTogglePlay={onToggleMusic}
            onVolumeChange={onMusicVolumeChange}
            theme="minki"
          />
        </div>
      </div>

      {/* Álbum de Fotos Reales */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
          {/* Destacados principales: En su lugar seguro (primera) + Marcando territorio */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10 items-stretch">
            {/* Foto 1: En su lugar seguro (Destacada al inicio) */}
            <div
              onClick={() => setSelectedPhoto(photos[0])}
              className="md:col-span-7 bg-white p-4 sm:p-6 rounded-3xl shadow-scrapbook border border-[#E5D8C1] cursor-pointer group hover:-translate-y-1 transition-all relative overflow-hidden"
            >
              <div className="washi-tape"></div>
              <div className="aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-100 relative shadow-inner">
                <img
                  src={photos[0].src}
                  alt={photos[0].title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#302622]">
                    {photos[0].title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-serif italic mt-0.5">
                    {photos[0].note}
                  </p>
                </div>
                <span className="self-start sm:self-center text-[10px] font-sans bg-[#FAF7F2] text-[#722F3D] px-2.5 py-1 rounded-full border border-[#E5D8C1] font-semibold shrink-0">
                  Lugar Seguro
                </span>
              </div>
            </div>

            {/* Foto 2: Minki marcando territorio con su pata */}
            <div
              onClick={() => setSelectedPhoto(photos[1])}
              className="md:col-span-5 bg-white p-4 sm:p-6 rounded-3xl shadow-scrapbook border border-[#E5D8C1] cursor-pointer group hover:-translate-y-1 transition-all relative flex flex-col justify-between"
            >
              <div className="washi-tape"></div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100 relative shadow-inner">
                <img
                  src={photos[1].src}
                  alt={photos[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Sticker flotante de Minki abrazando / feliz */}
                <img
                  src="/minki/emote_feliz.png"
                  alt="Sticker Feliz"
                  className="absolute -bottom-2 -right-2 w-20 h-20 object-contain drop-shadow-lg pointer-events-none"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-base font-bold text-[#302622]">
                  {photos[1].title}
                </h3>
                <p className="text-xs text-neutral-600 font-serif italic mt-0.5">
                  {photos[1].note}
                </p>
              </div>
            </div>
          </div>

          {/* Galería Polaroid de fotos adicionales */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {photos.slice(2).map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => setSelectedPhoto(photo)}
                className={`bg-white p-3 rounded-2xl shadow-scrapbook border border-[#E5D8C1] cursor-pointer transition-all ${photo.rotation}`}
              >
                <div className="washi-tape"></div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 relative shadow-inner mb-2.5">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-serif text-xs font-bold text-[#302622] leading-tight line-clamp-1">
                  {photo.title}
                </h4>
                <p className="text-[10px] text-neutral-500 italic mt-0.5 line-clamp-2 leading-tight">
                  {photo.note}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      {/* Modal Lightbox para ver fotos en grande */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-neutral-200 cursor-default"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[70vh] rounded-2xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="mt-4 text-center">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#302622]">
                  {selectedPhoto.title}
                </h4>
                <p className="text-sm text-neutral-600 font-serif italic mt-1.5">
                  {selectedPhoto.note}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cita cálida y hermosa ampliada con tipografía destacada */}
      <div className="mt-16 max-w-3xl mx-auto px-2">
        <div className="relative bg-gradient-to-br from-[#FFFDF8] via-[#FAF6F0] to-[#FFF9F2] p-8 sm:p-12 rounded-3xl shadow-scrapbook border-2 border-[#E5D8C1] text-center overflow-visible">
          <div className="washi-tape"></div>

          {/* Sticker de Minki durmiendo plácidamente sobre la tarjeta de la frase */}
          <div className="absolute -top-7 -right-5 pointer-events-none group">
            <img
              src="/minki/emote_despertador.png"
              alt="Minki descansando"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md transform rotate-6"
              title="Minki durmiendo feliz"
            />
          </div>

          {/* Esquinas ornamentales sutiles */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#C29336]/60"></div>
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#C29336]/60"></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#C29336]/60"></div>

          <div className="relative z-10 space-y-3">
            <span className="block font-serif text-4xl sm:text-5xl text-[#C29336] leading-none select-none opacity-80">
              «
            </span>

            <p className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic text-[#541F2B] leading-relaxed max-w-2xl mx-auto px-4 tracking-wide drop-shadow-sm">
              Hay compañeros que no necesitan hablar para convertirse en la mejor compañía de cada partida.
            </p>

            <span className="block font-serif text-4xl sm:text-5xl text-[#C29336] leading-none select-none opacity-80">
              »
            </span>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-500 font-serif">
              <Heart className="w-4 h-4 fill-[#722F3D]/25 text-[#722F3D]" />
              <span className="font-semibold text-[#722F3D]">Minki</span>
              <span className="opacity-40">•</span>
              <span className="italic">El apoyo más fiel de Fiorela en cada ranked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
