import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, MessageCircle } from 'lucide-react';
import { SectionAudioBar } from './SectionAudioBar';

interface HeroData {
  id: string;
  name: string;
  videoUrl: string;
  accentColor: string;
  voiceLine: string;
  dialogue: string;
}

interface GamerCardProps {
  isMusicPlaying: boolean;
  musicVolume: number;
  onToggleMusic: () => void;
  onMusicVolumeChange: (vol: number) => void;
}

export const GamerCard: React.FC<GamerCardProps> = ({
  isMusicPlaying,
  musicVolume,
  onToggleMusic,
  onMusicVolumeChange,
}) => {
  const [flippedHeroes, setFlippedHeroes] = useState<Record<string, boolean>>({});
  const [lastFlippedHero, setLastFlippedHero] = useState<string | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const heroes: HeroData[] = [
    {
      id: 'skywrath',
      name: 'Skywrath Mage',
      videoUrl: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/skywrath_mage.webm',
      accentColor: 'border-amber-500/70 shadow-amber-500/30',
      voiceLine: '"From the Ghastly Eyrie I can see a promising future!"',
      dialogue: 'Desde las alturas del Nido Fantasmal contemplo tu ascenso. No existe conjuro celestial más certero que tu lealtad y apoyo en cada partida. ¡Que tu vigésimo sexto año vuele más alto que cualquier cometa arcano!',
    },
    {
      id: 'lich',
      name: 'Lich',
      videoUrl: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/lich.webm',
      accentColor: 'border-cyan-500/70 shadow-cyan-500/30',
      voiceLine: '"Stay frosty!"',
      dialogue: 'El hielo eterno conserva lo valioso y congela las derrotas en el olvido. Que el frío implacable de tus cadenas guíe a tus aliados hacia otro año de victorias gloriosas.',
    },
    {
      id: 'mars',
      name: 'Mars',
      videoUrl: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/mars.webm',
      accentColor: 'border-red-600/70 shadow-red-600/30',
      voiceLine: '"Fight me! Together we shall conquer all!"',
      dialogue: '¡JAJAJA! ¡Que retumben los tambores de la Arena de Sangre! Quien defiende la primera línea con orgullo y corazón merece un festejo legendario. ¡Por tus 26 años de pura tenacidad!',
    },
    {
      id: 'ancient_apparition',
      name: 'Ancient Apparition',
      videoUrl: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/ancient_apparition.webm',
      accentColor: 'border-sky-500/70 shadow-sky-500/30',
      voiceLine: '"The cold winds blow in your favor."',
      dialogue: 'El cero absoluto del cosmos rinde homenaje a tu temple. Cada vórtice y cada apoyo tuyo marca la diferencia cuando el equipo más lo necesita. ¡Una felicitación gélida pero llena de aprecio!',
    },
    {
      id: 'necrolyte',
      name: 'Necrophos',
      videoUrl: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/necrolyte.webm',
      accentColor: 'border-emerald-600/70 shadow-emerald-600/30',
      voiceLine: '"To your health!"',
      dialogue: 'El heraldo de las plagas se inclina ante ti. En los viejos tiempos aleroifnecro era el estandarte que sembraba el caos en la senda. Que tu aura putrefacta preserve tu salud y guíe a tu equipo hacia el trono enemigo.',
    },
  ];

  const handleCardClick = (hero: HeroData) => {
    const isCurrentlyFlipped = Boolean(flippedHeroes[hero.id]);

    setFlippedHeroes((prev) => ({
      ...prev,
      [hero.id]: !isCurrentlyFlipped,
    }));

    if (!isCurrentlyFlipped) {
      setLastFlippedHero(hero.id);

      try {
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
        }
        const audio = new Audio(`/audio/heroes/${hero.id}.mp3`);
        audio.volume = 0.55;
        currentAudioRef.current = audio;
        audio.play().catch(() => {});
      } catch (e) {}
    } else {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
    }
  };

  const selectedHeroData = heroes.find((h) => h.id === lastFlippedHero);

  return (
    <section id="her-world" className="py-20 px-4 max-w-6xl mx-auto text-[#F2EBDD] relative">
      {/* Título Oficial DOTA 2 */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img
            src="/dota2_logo_red.svg"
            alt="Logo oficial de Dota 2"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_0_18px_rgba(226,36,21,0.85)]"
          />
          <h2 className="font-serif text-4xl sm:text-6xl font-black tracking-widest uppercase text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
            DOTA 2
          </h2>
        </div>

        {/* Reproductor de audio de la sección Dota 2 */}
        <div className="flex justify-center mt-3">
          <SectionAudioBar
            title="DotA"
            artist="Basshunter (Vi sitter i Ventrilo...)"
            isPlaying={isMusicPlaying}
            volume={musicVolume}
            onTogglePlay={onToggleMusic}
            onVolumeChange={onMusicVolumeChange}
            theme="dota"
          />
        </div>
      </div>

      {/* Contenedor Principal estilo Dota 2 Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#15161A] rounded-2xl border-2 border-[#38332E] shadow-[0_0_40px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden"
      >
        {/* Fila de Medallas con sus fotos de perfil y decoradas con stickers de Minki */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 pb-8 border-b border-[#2C2D35]">
          {/* Cuenta Inmortal con su foto con Minki + Sticker Minki Bandido */}
          <div className="relative group">
            <div className="flex items-center gap-4 bg-black/60 p-4 rounded-2xl border border-[#C29336]/40 shadow-md">
              <div className="relative">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]">
                  <img
                    src="/avatar_immortal.png"
                    alt="Avatar Cuenta Inmortal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/rank_immortal.png"
                  alt="Medalla Inmortal"
                  className="w-14 h-14 object-contain filter drop-shadow-[0_0_10px_rgba(228,179,67,0.7)]"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-[#E4B343]" />
                    <span className="text-xs font-bold text-[#E4B343] uppercase tracking-wider">Inmortal</span>
                  </div>
                  <span className="block text-[11px] text-neutral-300 font-medium">Cuenta Principal</span>
                  <span className="inline-block text-[10px] font-mono text-[#D32F2F] bg-[#D32F2F]/10 px-2 py-0.5 rounded border border-[#D32F2F]/30 mt-0.5">
                    (100% boosteada con cariño)
                  </span>
                </div>
              </div>
            </div>

            {/* Sticker de Minki Bandido asomándose en la medalla Inmortal */}
            <img
              src="/minki/emote_bandido.png"
              alt="Minki Bandido"
              className="absolute -top-6 -right-5 w-14 h-14 object-contain pointer-events-none drop-shadow-md group-hover:scale-110 transition-transform"
              title="Minki supervisando el boost"
            />
          </div>

          {/* Cuenta Leyenda con su foto con lentes + Sticker Minki Pipipi */}
          <div className="relative group">
            <div className="flex items-center gap-4 bg-black/60 p-4 rounded-2xl border border-cyan-500/40 shadow-md">
              <div className="relative">
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-neutral-600 shadow-md">
                  <img
                    src="/avatar_legend.png"
                    alt="Avatar Cuenta Leyenda"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src="/rank_legend.png"
                  alt="Medalla Leyenda"
                  className="w-14 h-14 object-contain filter drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Leyenda</span>
                  </div>
                  <span className="block text-[11px] text-neutral-300 font-medium">Cuenta Secundaria</span>
                  <span className="inline-block text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 mt-0.5">
                    (Tu cuenta real :v)
                  </span>
                </div>
              </div>
            </div>

            {/* Sticker de Minki Pipipi asomándose en la cuenta Leyenda */}
            <img
              src="/minki/emote_pipipi.png"
              alt="Minki Pipipi"
              className="absolute -top-6 -right-5 w-14 h-14 object-contain pointer-events-none drop-shadow-md group-hover:scale-110 transition-transform"
              title="Pipipi"
            />
          </div>
        </div>

        {/* Galería de Cartas de Héroes */}
        <div className="mt-8">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#C29336]">
                Algunos de los Héroes que te han acompañado en tus partidas
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Pulsa sobre cada carta para voltearla y escuchar la voz del héroe
              </p>
            </div>

            {/* Sticker de Minki parado en el draft */}
            <div className="self-start sm:self-center flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-xl border border-[#C29336]/30 shadow-sm">
              <img
                src="/minki/emote_parado.png"
                alt="Minki en el draft"
                className="w-7 h-7 object-contain drop-shadow"
              />
              <span className="text-[11px] font-sans text-amber-200/90 font-medium">
                Minki en el draft
              </span>
            </div>
          </div>

          {/* Grilla de Cartas con Efecto Flip 3D */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {heroes.map((hero) => {
              const isRevealed = Boolean(flippedHeroes[hero.id]);

              return (
                <div
                  key={hero.id}
                  onClick={() => handleCardClick(hero)}
                  className="perspective-1000 aspect-[3/4.2] cursor-pointer group"
                  title="Haz clic para voltear la carta"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                      isRevealed ? 'rotate-y-180' : 'group-hover:scale-[1.03]'
                    }`}
                  >
                    {/* Reverso de la carta: Carta morada de Crownfall */}
                    <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-purple-500/80 shadow-[0_0_18px_rgba(168,85,247,0.45)] bg-[#1a0f28]">
                      <img
                        src="/crownfall_card_back.svg"
                        alt="Reverso de carta Crownfall"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Frente de la carta: Retrato en movimiento oficial de Valve + Solo el nombre */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden border-2 border-[#C29336] bg-[#1C1D22] shadow-[0_0_20px_rgba(228,179,67,0.4)]">
                      <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <video
                          src={hero.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover object-top scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      </div>

                      {/* Solo se muestra el nombre del héroe al voltear la carta */}
                      <div className="absolute bottom-0 inset-x-0 p-2 text-center bg-black/85 backdrop-blur-sm border-t border-white/10">
                        <p className="font-serif text-xs font-bold text-[#E4B343]">
                          {hero.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cuadro de Diálogo y Voz Oficial en Inglés */}
          <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-[#201D1B] via-[#2A2422] to-[#201D1B] border border-[#52443C] min-h-[110px] flex items-start gap-4 shadow-inner">
            <div className="p-3 rounded-lg bg-black/60 border border-[#C29336]/40 shrink-0 mt-0.5">
              <MessageCircle className="w-5 h-5 text-[#E4B343]" />
            </div>

            <div className="flex-1 w-full">
              {selectedHeroData && Boolean(flippedHeroes[selectedHeroData.id]) ? (
                <div>
                  <div className="mb-2">
                    <p className="text-xs font-bold text-[#E4B343] uppercase tracking-wider">
                      {selectedHeroData.name}:
                    </p>
                  </div>

                  <p className="font-serif text-xs sm:text-sm text-white italic leading-relaxed">
                    "{selectedHeroData.dialogue}"
                  </p>
                </div>
              ) : (
                <div className="flex items-center h-full">
                  <p className="text-xs text-neutral-400 italic">
                    Pulsa sobre cualquiera de las cartas moradas para voltear al héroe y reproducir su línea de voz.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
