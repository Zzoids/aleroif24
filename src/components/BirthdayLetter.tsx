import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Sparkles, Heart, X, ZoomIn, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionAudioBar } from './SectionAudioBar';

interface ZingPhoto {
  id: string;
  url: string;
  title: string;
  rotation: string;
}

interface BirthdayLetterProps {
  isMusicPlaying?: boolean;
  musicVolume?: number;
  onToggleMusic?: () => void;
  onMusicVolumeChange?: (vol: number) => void;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({
  isMusicPlaying = false,
  musicVolume = 0.5,
  onToggleMusic,
  onMusicVolumeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ZingPhoto | null>(null);

  const handleToggle = () => {
    if (!isOpen) {
      confetti({
        particleCount: 110,
        spread: 95,
        origin: { y: 0.7 },
        colors: ['#722F3D', '#E4B343', '#F2EBDD', '#C29336', '#FFFFFF'],
      });
    }
    setIsOpen(!isOpen);
  };

  // Fotografías de zings compartidos alrededor de la carta (sin texto debajo)
  const leftZings: ZingPhoto[] = [
    {
      id: 'zing-red',
      url: '/letter/zing_red_hoodie.jpg',
      title: 'Zing con capucha roja',
      rotation: '-rotate-3 hover:rotate-0',
    },
    {
      id: 'zing-glasses',
      url: '/letter/zing_glasses_claw.jpg',
      title: 'Zing con coletas y lentes',
      rotation: 'rotate-2 hover:rotate-0',
    },
    {
      id: 'zing-pink-ears',
      url: '/letter/zing_cat_ears_pink.jpg',
      title: 'Zing con orejitas y vestido rosa',
      rotation: '-rotate-2 hover:rotate-0',
    },
  ];

  const rightZings: ZingPhoto[] = [
    {
      id: 'zing-sweater',
      url: '/letter/zing_white_sweater.jpg',
      title: 'Zing con suéter blanco',
      rotation: 'rotate-3 hover:rotate-0',
    },
    {
      id: 'zing-green',
      url: '/letter/zing_ears_green_shirt.jpg',
      title: 'Zing orejitas fluffy y polo verde',
      rotation: '-rotate-2 hover:rotate-0',
    },
    {
      id: 'zing-white-tshirt',
      url: '/letter/zing_ears_white_tshirt.jpg',
      title: 'Zing con orejitas y polo blanco',
      rotation: 'rotate-2 hover:rotate-0',
    },
  ];

  const partyTogetherZing: ZingPhoto = {
    id: 'party-together',
    url: '/letter/zing_party_duck_cat.jpg',
    title: 'Victoria en Party Animals',
    rotation: '-rotate-1 hover:rotate-0',
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative">
      {/* Encabezado de la sección (Sin texto de Sección 5) */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#302622] mt-1 flex items-center justify-center gap-2">
          <span>Carta de Cumpleaños</span>
          <Mail className="w-7 h-7 text-[#722F3D]" />
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto">
          Unas palabras dedicadas para conmemorar tus 26 años, rodeadas de recuerdos y zings en directo.
        </p>

        {/* Reproductor de audio de la sección Carta: Color Esperanza */}
        {onToggleMusic && onMusicVolumeChange && (
          <div className="mt-5 flex justify-center">
            <SectionAudioBar
              title="Color Esperanza"
              artist="Diego Torres (Saber que se puede...)"
              isPlaying={isMusicPlaying}
              volume={musicVolume}
              onTogglePlay={onToggleMusic}
              onVolumeChange={onMusicVolumeChange}
              theme="minki"
            />
          </div>
        )}
      </div>

      {/* Disposición en 3 columnas: Zings Izquierda | Carta Central | Zings Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================= */}
        {/* COLUMNA IZQUIERDA: 3 Zings Polaroids (Sin texto debajo)   */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 flex flex-row flex-wrap lg:flex-col justify-center items-center gap-6 order-2 lg:order-1">
          {leftZings.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`bg-white p-3 rounded-2xl shadow-scrapbook border border-[#E5D8C1] cursor-pointer transition-all duration-300 relative max-w-[240px] w-full ${photo.rotation}`}
            >
              <div className="washi-tape"></div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 relative group shadow-inner">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* COLUMNA CENTRAL: Sobre Interactivo & Carta Desplegada     */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2 w-full">
          {/* Sobre interactivo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggle}
            className="cursor-pointer relative max-w-lg w-full bg-gradient-to-br from-[#722F3D] to-[#541F2B] text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#8F3E4E] text-center overflow-visible transition-all select-none"
          >
            {/* Sello de lacre dorado con inicial */}
            <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-gradient-to-br from-[#E4B343] to-[#C29336] text-[#302622] flex items-center justify-center font-serif font-black text-base shadow-lg border-2 border-white/40">
              Z
            </div>

            {/* Sticker de Minki asomándose desde el sobre */}
            <img
              src="/minki/emote_platita.png"
              alt="Minki con regalo"
              className="absolute -bottom-5 -left-4 w-16 h-16 object-contain drop-shadow pointer-events-none transform -rotate-12"
              title="Minki"
            />

            <div className="flex flex-col items-center">
              {isOpen ? (
                <MailOpen className="w-16 h-16 text-[#F2EBDD] mb-3 animate-pulse" />
              ) : (
                <Mail className="w-16 h-16 text-[#F2EBDD] mb-3" />
              )}

              <h3 className="font-serif text-2xl font-bold text-[#F2EBDD]">
                Para: Fiorela (Aleroif24)
              </h3>
              <p className="text-xs text-white/80 mt-1 font-mono">
                24 de noviembre de 2026 - Nivel 26
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium backdrop-blur-sm transition-colors border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#E4B343]" />
                <span>{isOpen ? 'Plegar carta' : 'Abrir carta de cumpleaños'}</span>
              </span>
            </div>
          </motion.div>

          {/* Carta desplegada: todo el texto alineado a la izquierda */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -25 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -25 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-8 max-w-xl sm:max-w-2xl w-full"
              >
                <div className="bg-[#FFFDF8] p-6 sm:p-11 rounded-3xl shadow-scrapbook border-2 border-[#E5D8C1] relative overflow-hidden text-left">
                  {/* Washi tape superior */}
                  <div className="washi-tape"></div>

                  {/* Clip dorado en la esquina superior izquierda */}
                  <div className="absolute top-2 left-6 pointer-events-none select-none z-10">
                    <svg width="24" height="48" viewBox="0 0 24 48" fill="none" className="drop-shadow-sm">
                      <rect x="7" y="2" width="10" height="36" rx="5" stroke="#C29336" strokeWidth="2.5" fill="none" />
                      <path d="M7 16V6C7 4.34315 8.34315 3 10 3H14C15.6569 3 17 4.34315 17 6V38C17 41.3137 14.3137 44 11 44C7.68629 44 5 41.3137 5 38V12" stroke="#E4B343" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Sello postal conmemorativo en la esquina superior derecha */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 border-2 border-dashed border-[#722F3D]/40 bg-[#FAF5EC] p-2 rounded-lg shadow-sm text-center transform rotate-3 select-none pointer-events-none">
                    <div className="flex items-center justify-center gap-1 text-[8px] font-mono uppercase text-[#722F3D] font-bold">
                      <Sparkles className="w-2.5 h-2.5 text-[#C29336]" />
                      <span>24 NOV 2026</span>
                    </div>
                    <div className="text-[11px] font-serif font-black text-[#722F3D] tracking-wider">
                      ALEROIF24
                    </div>
                    <div className="text-[7px] font-sans text-neutral-400 tracking-widest mt-0.5">
                      ★ SPECIAL DELIVERY ★
                    </div>
                  </div>

                  {/* Esquinas ornamentales vintage */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C29336]/60 rounded-tl pointer-events-none"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C29336]/60 rounded-tr pointer-events-none"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C29336]/60 rounded-bl pointer-events-none"></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C29336]/60 rounded-br pointer-events-none"></div>

                  {/* Encabezado interno de la carta (alineado a la izquierda) */}
                  <div className="pt-2 pb-5 border-b border-[#F2EBDD] text-left">
                    <div className="inline-flex items-center gap-2 text-xs font-serif text-[#C29336] uppercase tracking-widest mb-1">
                      <Star className="w-3.5 h-3.5 fill-[#C29336]" />
                      <span>Edición Especial de Cumpleaños</span>
                    </div>
                    <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#722F3D]">
                      ¡Felices 26 Años, Fiorela!
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-[#722F3D]">
                      <Heart className="w-4 h-4 text-[#722F3D] fill-[#722F3D]/20" />
                      <span className="w-16 h-px bg-[#C29336]/50"></span>
                    </div>
                  </div>

                  {/* Cuerpo de la carta: Todo alineado por la izquierda y sin badges adicionales */}
                  <div className="py-6 space-y-4 text-sm sm:text-base text-[#302622] leading-relaxed font-serif text-left">
                    <p className="font-bold text-xl sm:text-2xl text-[#722F3D]">
                      Fiorelaaaaa:
                    </p>

                    <p>
                      Esta carta la escribo para desearte un muy feliz cumpleaños. Espero que tengas un día muy lindo y que disfrutes mucho de esta fecha tan especial para ti.
                    </p>

                    <p>
                      Te conocí a inicios de febrero gracias a TikTok, aunque empecé a frecuentar tu comunidad aproximadamente entre junio y julio jeje. Todo el tiempo que he pasado en ella ha sido una experiencia muy divertida y entretenida. Tus ocurrencias y las interacciones con el chat siempre me sacaban una sonrisa.
                    </p>

                    <p>
                      Algo que también me atrapó de tus directos fue la música que ponían. Varias de esas canciones hacía tiempo que no las escuchaba, así que me dio bastante nostalgia recordarlas y, al mismo tiempo, felicidad al encontrar a más personas que también escuchaban canciones que a mí me gustaban.
                    </p>

                    <p>
                      Aunque, siendo sincero, en parte también me quedé por la sub que regaló zjuphx :v. Quería aprovechar los beneficios de la sub y usar los emoticons premium del canal xD.
                    </p>

                    <p>
                      Pero, muy aparte de eso, me alegra mucho haberte conocido y haber podido formar parte de tu comunidad. Es bonito encontrar un espacio donde hay personas que te quieren, te apoyan y comparten gratos momentos contigo. Eres una persona que nos saca una sonrisa cada vez que llegamos y te vemos cantando canciones, haciendo tus jugadas proplayer (sobre todo con tu Mars :v) o incluso cuando simplemente podemos platicar e interactuar contigo en los streams y las partidas.
                    </p>

                    <p>
                      También quiero agradecerte porque, a pesar de que hay días en los que no estás al 100 %, de todos modos te animas a pasar un tiempo con nosotros en las transmisiones. Quizás no te des cuenta, pero seguramente alegras muchas noches a tus queridos y fieles espectadores.
                    </p>

                    <p>
                      Te deseo lo mejor en esta nueva etapa de tu vida. Espero que todo te vaya muy bien y que, poco a poco, cada día puedas acercarte más a tus metas y sueños. Que nunca te falten motivos para sonreír, personas que te quieran y momentos bonitos que recordar.
                    </p>

                    <p className="font-semibold text-base sm:text-lg text-[#722F3D] pt-2">
                      ¡Feliz cumpleaños, Fiorela, alias Aleroif24! Que la pases muy bonito el día de hoy y que este fin de semana disfrutes lo más que puedas. ¡Un fuerte abrazo!
                    </p>

                    {/* Frase final solicitada por el usuario */}
                    <div className="pt-4 pb-1 border-t border-[#F2EBDD]/80">
                      <p className="font-serif italic text-base sm:text-lg text-[#722F3D] leading-relaxed">
                        Que la vie te sourie toujours.
                      </p>
                      <p className="font-serif italic text-base sm:text-lg text-[#722F3D] leading-relaxed">
                        Que la vida siempre te sonría.
                      </p>
                    </div>
                  </div>

                  {/* Pie de la carta con firma, fecha, sello y sticker de Minki */}
                  <div className="pt-6 border-t border-[#F2EBDD] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E4B343] to-[#C29336] shadow-md border-2 border-white flex items-center justify-center font-serif font-black text-white text-base select-none">
                        Z
                      </div>
                      <div>
                        <span className="italic font-serif block text-[11px] text-neutral-400">Fecha de entrega</span>
                        <span className="font-serif font-bold text-neutral-700">24 de noviembre de 2026</span>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="text-xs text-neutral-400 italic">Con aprecio sincero,</p>
                        <p className="font-serif font-bold text-lg text-[#722F3D] mt-0.5 tracking-wide">
                          Zzoids
                        </p>
                      </div>
                      <img
                        src="/minki/emote_feliz.png"
                        alt="Minki Feliz"
                        className="w-12 h-12 object-contain drop-shadow"
                        title="Minki festejando con nosotros"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fotografía Destacada de Party Animals (Sin texto debajo) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setSelectedPhoto(partyTogetherZing)}
            className={`mt-10 bg-white p-3.5 sm:p-5 rounded-3xl shadow-scrapbook border-2 border-[#C29336]/40 cursor-pointer hover:shadow-xl transition-all duration-300 max-w-xl w-full text-center relative group ${partyTogetherZing.rotation}`}
          >
            <div className="washi-tape"></div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 relative shadow-inner">
              <img
                src={partyTogetherZing.url}
                alt={partyTogetherZing.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* COLUMNA DERECHA: 3 Zings Polaroids (Sin texto debajo)     */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 flex flex-row flex-wrap lg:flex-col justify-center items-center gap-6 order-3">
          {rightZings.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`bg-white p-3 rounded-2xl shadow-scrapbook border border-[#E5D8C1] cursor-pointer transition-all duration-300 relative max-w-[240px] w-full ${photo.rotation}`}
            >
              <div className="washi-tape"></div>
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 relative group shadow-inner">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox para ampliar cualquiera de las fotos */}
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
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>

              <div className="mt-4 text-center">
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#302622]">
                  {selectedPhoto.title}
                </h4>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
