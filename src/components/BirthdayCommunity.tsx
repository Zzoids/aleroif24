import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles, PartyPopper, Users, Gamepad2, X, ZoomIn, Heart } from 'lucide-react';
import { SectionAudioBar } from './SectionAudioBar';

interface CommunityMember {
  id: string;
  name: string;
  color: string;
  status: 'online' | 'idle' | 'offline';
  role: string;
  customStatus?: string;
  avatarUrl: string;
  birthdayWish: string;
}

interface PartyAnimalPhoto {
  id: string;
  url: string;
  date: string;
  title: string;
  category: 'match' | 'action';
  highlight: string;
}

interface BirthdayCommunityProps {
  isMusicPlaying?: boolean;
  musicVolume?: number;
  onToggleMusic?: () => void;
  onMusicVolumeChange?: (vol: number) => void;
}

export const BirthdayCommunity: React.FC<BirthdayCommunityProps> = ({
  isMusicPlaying = false,
  musicVolume = 0.5,
  onToggleMusic,
  onMusicVolumeChange,
}) => {
  // Estados de la animación
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // en segundos (0 a 14)

  // Estados de la galería Party Animals
  const [selectedPhoto, setSelectedPhoto] = useState<PartyAnimalPhoto | null>(null);

  const animationDuration = 14;
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // 17 Miembros Oficiales de la Comunidad de Discord
  const communityMembers: CommunityMember[] = [
    {
      id: 'arthed29',
      name: 'arthed29',
      color: '#E04E6A',
      status: 'online',
      role: 'VIP Fam',
      avatarUrl: '/community/arthed29.png',
      birthdayWish: '¡Feliz cumpleaños Fiorela! Que nunca te falten sonrisas y partidas épicas. ✨',
    },
    {
      id: 'athem',
      name: 'Athem',
      color: '#E5B869',
      status: 'offline',
      role: 'Dota Guardian',
      avatarUrl: '/community/athem.png',
      birthdayWish: '¡Felices 26! Gracias por todos los directos y las risas en Discord.',
    },
    {
      id: 'curitaroif',
      name: 'Curitaroif',
      color: '#6888B8',
      status: 'idle',
      role: 'Comunidad Fiel',
      customStatus: '🌙 En siesta como Minki',
      avatarUrl: '/community/curitaroif.png',
      birthdayWish: '¡Un abrazo enorme de parte de Curitaroif! Que este nuevo año venga lleno de éxitos. 🎂',
    },
    {
      id: 'f3nr1r',
      name: 'F3NR1R',
      color: '#6F9EA8',
      status: 'offline',
      role: 'Shadow Squad',
      avatarUrl: '/community/f3nr1r.png',
      birthdayWish: '¡Felicidades Aleroif! Que subas a más de 10k de MMR y sigas brillando.',
    },
    {
      id: 'jared',
      name: 'Jared',
      color: '#C84D72',
      status: 'online',
      role: 'Hámster Squad',
      avatarUrl: '/community/jared.png',
      birthdayWish: '¡Feliz cumple Fiore! Eres la mejor streamer, pásala increíble hoy.',
    },
    {
      id: 'jhemshc',
      name: 'Jhemshc',
      color: '#4D7EC0',
      status: 'offline',
      role: 'Discord OG',
      avatarUrl: '/community/jhemshc.png',
      birthdayWish: '¡Muchas felicidades en tus 26 años! Siempre apoyándote desde el server.',
    },
    {
      id: 'jolsmenaqp',
      name: 'jolsmenaqp',
      color: '#D8A84E',
      status: 'online',
      role: 'Ranked Warrior',
      avatarUrl: '/community/jolsmenaqp.png',
      birthdayWish: '¡Fiorela, feliz día! Que cada partida de este año sea una victoria asegurada.',
    },
    {
      id: 'kael',
      name: 'KAEL',
      color: '#3B8B82',
      status: 'offline',
      role: 'Invoker Main',
      avatarUrl: '/community/kael.png',
      birthdayWish: '¡Feliz cumpleaños! Que tus conjuros y sueños se hagan realidad siempre.',
    },
    {
      id: 'liams',
      name: 'Liams',
      color: '#E5B869',
      status: 'offline',
      role: 'VIP Legend',
      avatarUrl: '/community/liams.png',
      birthdayWish: '¡Felices 26 Aleroif24! Te deseamos lo mejor en cada proyecto.',
    },
    {
      id: 'mapache',
      name: 'Mapache',
      color: '#6C85A8',
      status: 'idle',
      role: 'Nocturno',
      customStatus: 'non son mis amigos...',
      avatarUrl: '/community/mapache.png',
      birthdayWish: '¡Feliz cumpleee! Aunque sean horas de trasnochada, aquí estamos firmes.',
    },
    {
      id: 'el_motta',
      name: '_El Motta_',
      color: '#2C9A8B',
      status: 'online',
      role: 'Comunidad Activa',
      avatarUrl: '/community/el_motta.png',
      birthdayWish: '¡Saludos y un feliz cumpleaños enorme! A celebrar como se debe.',
    },
    {
      id: 'ryzu',
      name: 'Ryzu ⚔',
      color: '#D63E75',
      status: 'offline',
      role: 'Espadachín',
      avatarUrl: '/community/ryzu.png',
      birthdayWish: '¡Feliz cumple Fiorela! Gracias por tu buena vibra y los streams tan divertidos.',
    },
    {
      id: 'iboyshel',
      name: 'Iboyshel',
      color: '#4B7FB5',
      status: 'idle',
      role: 'Chill Vibes',
      avatarUrl: '/community/iboyshel.png',
      birthdayWish: '¡Felicidades en tu día especial! Pásala genial rodeada de la gente que te quiere.',
    },
    {
      id: 'yereborrador',
      name: 'YereBorrador',
      color: '#B8456C',
      status: 'offline',
      role: 'Comunidad VIP',
      avatarUrl: '/community/yereborrador.png',
      birthdayWish: '¡Feliz cumpleaños Aleroif! Eres un ejemplo de alegría y perseverancia.',
    },
    {
      id: 'life_is_a_dream',
      name: 'Life is but a dream',
      color: '#5E88C8',
      status: 'offline',
      role: 'Dreamer',
      avatarUrl: '/community/life_is_a_dream.png',
      birthdayWish: '«Life is but a dream» ¡Que tus sueños se cumplan en este nuevo año! Feliz cumpleaños. 🌟',
    },
    {
      id: 'zjuphx15',
      name: 'zjuphx15',
      color: '#A87BCE',
      status: 'offline',
      role: 'Party Animal',
      avatarUrl: '/community/zjuphx15.png',
      birthdayWish: '¡Feliz cumpleaños Fiorela! Que nunca falten las victorias y las buenas risas en Discord. 🎮',
    },
    {
      id: 'zzoids',
      name: 'Zzoids',
      color: '#9B78BE',
      status: 'online',
      role: 'Discord Fam',
      avatarUrl: '/community/zzoids.png',
      birthdayWish: '¡Felices 26 Aleroif! Pásala increíble en tu día, gracias por cada momento compartido. ✨',
    },
  ];

  // 11 Fotografías de Party Animals compartidas por la comunidad
  const partyPhotos: PartyAnimalPhoto[] = [
    {
      id: 'p1',
      url: '/party_animals/party_1.jpg',
      date: '22 nov. 2026',
      title: 'Victoria de Patos y Gomita',
      category: 'match',
      highlight: 'Aleroif24, arthed, JosueVar, Reymy, Ryzu, tiste, Yere, ZanyAce',
    },
    {
      id: 'p2',
      url: '/party_animals/party_2.jpg',
      date: '22 nov. 2026',
      title: '¡Todos contra todos en la arena!',
      category: 'action',
      highlight: 'Zzoids, zjuphx, Ryzu, Brayitan, iboyshel, ZanyAce',
    },
    {
      id: 'p3',
      url: '/party_animals/party_3.jpg',
      date: '22 nov. 2026',
      title: 'Rey de la Corona y los puñetazos',
      category: 'action',
      highlight: 'HarperSkr, tiste, Zzoids, zjuphx, arthed, Aleroif24',
    },
    {
      id: 'p4',
      url: '/party_animals/party_4.jpg',
      date: '22 nov. 2026',
      title: 'Modo siesta en plena batalla',
      category: 'action',
      highlight: 'Zzoids, Ryzu, Brayitan, ZanyAce, zjuphx',
    },
    {
      id: 'p5',
      url: '/party_animals/party_5.jpg',
      date: '22 nov. 2026',
      title: 'Siesta grupal tras ronda intensa',
      category: 'action',
      highlight: 'Patos con lentes y osos durmiendo juntos',
    },
    {
      id: 'p6',
      url: '/party_animals/party_6.jpg',
      date: '23 nov. 2026',
      title: 'El Tigre y la Banda de Patos',
      category: 'match',
      highlight: 'Nivel 26 alcanzado en Party Animals ✦',
    },
    {
      id: 'p7',
      url: '/party_animals/party_7.jpg',
      date: '22 nov. 2026',
      title: 'Perrito con flor y gato legendario',
      category: 'match',
      highlight: 'Último animal en pie: +1.000 puntos',
    },
    {
      id: 'p8',
      url: '/party_animals/party_8.jpg',
      date: '22 nov. 2026',
      title: 'Doble corona dorada en el podio',
      category: 'match',
      highlight: 'Nivel 25: Victoria indiscutible',
    },
    {
      id: 'p9',
      url: '/party_animals/party_9.jpg',
      date: '22 nov. 2026',
      title: 'Gomita Roja dominando la pista',
      category: 'match',
      highlight: 'Celebrando el final de mapa con coronas',
    },
    {
      id: 'p10',
      url: '/party_animals/party_10.jpg',
      date: '21 nov. 2026',
      title: 'Gorila y pato con lentes oscuros',
      category: 'match',
      highlight: 'Partida histórica del 21 de noviembre',
    },
    {
      id: 'p11',
      url: '/party_animals/party_11.jpg',
      date: '23 nov. 2026',
      title: 'Elegancia con corbata y victoria',
      category: 'match',
      highlight: 'Primera victoria del día: +2.000 puntos',
    },
  ];

  // Control del ciclo de animación con requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const updateLoop = (now: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (now - lastTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= animationDuration) {
            return 7.5; // mantiene el clímax festivo
          }
          return next;
        });
      }
      lastTimeRef.current = now;
      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Fases de la historia:
  // 0s a 3.5s: Carrera de Killua
  // 3.5s a 5.5s: El tropiezo
  // 5.5s a 7.5s: Rescate de Superhero Minki
  // 7.5s a 14s: Pastel 26, Killua & Minki y fuegos artificiales
  const phase =
    currentTime < 3.5 ? 'running' : currentTime < 5.5 ? 'trip' : currentTime < 7.5 ? 'rescue' : 'celebrate';

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleJumpTo = (seconds: number) => {
    setCurrentTime(seconds);
  };

  return (
    <section id="birthday-community" className="py-20 px-4 max-w-6xl mx-auto text-[#2C2D35] relative">
      {/* Encabezado de la Sección 04 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5D8C1]/50 border border-[#C29336]/40 text-[#722F3D] text-xs font-serif font-bold tracking-widest uppercase mb-3">
          <PartyPopper className="w-3.5 h-3.5 text-[#C29336]" />
          <span>Sección 04</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#2C2D35] tracking-tight">
          ¡Feliz Cumpleaños Fiorela! ✦ Nivel 26
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto font-serif">
          Una sorpresa especial protagonizada por Killua Zoldyck, Minki y cada uno de los miembros de tu comunidad en
          Discord que celebran este día contigo.
        </p>

        {/* Reproductor de audio de la sección Feliz Cumpleaños */}
        {onToggleMusic && onMusicVolumeChange && (
          <div className="mt-5 flex justify-center">
            <SectionAudioBar
              title="Cumpleaños Feliz"
              artist="Versión Original (Happy Birthday To You)"
              isPlaying={isMusicPlaying}
              volume={musicVolume}
              onTogglePlay={onToggleMusic}
              onVolumeChange={onMusicVolumeChange}
              theme="minki"
            />
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 1. ESCENARIO DE ANIMACIÓN PRINCIPAL (KILLUA + MINKI + 26) */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#C29336]/60 shadow-[0_15px_45px_rgba(0,0,0,0.35)] bg-gradient-to-b from-[#0B0D19] via-[#12162B] to-[#1C1F38] mb-12">
        {/* Fondo del cielo nocturno con estrellas parpadeantes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 left-10 w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
          <div className="absolute top-12 left-1/4 w-1 h-1 rounded-full bg-amber-200 animate-pulse opacity-90" />
          <div className="absolute top-8 right-1/4 w-2 h-2 rounded-full bg-cyan-300 animate-pulse opacity-80" />
          <div className="absolute top-16 right-12 w-1.5 h-1.5 rounded-full bg-pink-300 animate-ping opacity-60" />
          <div className="absolute top-28 left-1/3 w-1 h-1 rounded-full bg-purple-200 opacity-50" />
          <div className="absolute top-6 left-2/3 w-2 h-2 rounded-full bg-yellow-100 animate-pulse opacity-70" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-purple-500/15 via-pink-500/10 to-transparent blur-3xl pointer-events-none" />
        </div>

        {/* Banner de estado de la animación */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-black/50 backdrop-blur-md border-b border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-neutral-300 font-semibold tracking-wider">
              {phase === 'running' && 'ESCENA 1: Killua corriendo con el gran regalo de cumpleaños'}
              {phase === 'trip' && 'ESCENA 2: ¡Cuidado, tropiezo inminente!'}
              {phase === 'rescue' && 'ESCENA 3: ¡Super Minki con capa al rescate!'}
              {phase === 'celebrate' && 'ESCENA 4: ¡Pastel 26, Fuegos Artificiales y Celebración!'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C29336] hover:bg-[#D4A343] text-black font-bold font-serif shadow transition-all active:scale-95"
              title={isPlaying ? 'Pausar animación' : 'Continuar animación'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pausar' : 'Continuar'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-medium transition-all active:scale-95"
              title="Reiniciar animación desde el principio"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir</span>
            </button>
          </div>
        </div>

        {/* Escenario de los Personajes */}
        <div className="relative h-[340px] sm:h-[400px] w-full flex items-center justify-center overflow-hidden px-4">
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent border-t border-purple-500/20" />

          {/* ---------------------------------------------------- */}
          {/* FASE 1: KILLUA CORRIENDO CON EL REGALO (0s - 3.5s)   */}
          {/* ---------------------------------------------------- */}
          {phase === 'running' && (
            <motion.div
              key="running"
              initial={{ x: -280, opacity: 0 }}
              animate={{
                x: [-260, 20],
                opacity: [0, 1, 1],
                y: [0, -10, 0, -10, 0, -10, 0],
              }}
              transition={{
                duration: 3.5,
                ease: 'linear',
                y: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' },
              }}
              className="relative flex items-center"
            >
              {/* Killua Chibi Oficial */}
              <div className="relative">
                <img
                  src="/killua_chibi.png"
                  alt="Chibi Killua corriendo"
                  className="w-36 sm:w-44 h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Gran caja de regalo que Killua carga */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
                className="-ml-8 relative z-10"
              >
                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 border-2 border-yellow-300 shadow-[0_8px_25px_rgba(244,63,94,0.6)] text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl animate-bounce">🎁</span>
                    <span className="text-[10px] sm:text-xs font-serif font-black text-amber-200 uppercase tracking-widest mt-1">
                      Para Fiorela
                    </span>
                  </div>
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300" />
                  <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-2 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-300" />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ---------------------------------------------------- */}
          {/* FASE 2: EL TROPIEZO Y LA CAÍDA (3.5s - 5.5s)         */}
          {/* ---------------------------------------------------- */}
          {phase === 'trip' && (
            <motion.div
              key="trip"
              initial={{ x: 20, rotate: 0 }}
              animate={{
                x: [20, 60],
                rotate: [0, 32, 40],
                y: [0, 25],
              }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="relative flex items-center"
            >
              <div className="relative">
                <img
                  src="/killua_chibi.png"
                  alt="Chibi Killua tropezando"
                  className="w-36 sm:w-44 h-auto drop-shadow-[0_12px_25px_rgba(239,68,68,0.5)]"
                />
                <span className="absolute -top-4 -right-2 text-2xl animate-ping">💧</span>
                <span className="absolute -top-6 left-2 text-xl font-black text-red-500 animate-bounce">!?</span>
              </div>

              {/* El regalo volando por los aires */}
              <motion.div
                initial={{ y: 0, rotate: 0 }}
                animate={{
                  y: [-20, -110, -80],
                  x: [0, 70, 90],
                  rotate: [0, 180, 240],
                }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="absolute -top-10 left-32 z-20"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 border-2 border-yellow-300 shadow-xl text-3xl">
                  🎁
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ---------------------------------------------------- */}
          {/* FASE 3: SUPERHERO MINKI AL RESCATE (5.5s - 7.5s)     */}
          {/* ---------------------------------------------------- */}
          {phase === 'rescue' && (
            <motion.div
              key="rescue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex items-center justify-center gap-6"
            >
              {/* Killua sostenido con alivio */}
              <motion.div
                initial={{ x: -80, rotate: 20 }}
                animate={{ x: 0, rotate: 5, y: [0, -5, 0] }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative"
              >
                <img
                  src="/killua_chibi.png"
                  alt="Killua apoyado en Minki"
                  className="w-32 sm:w-40 h-auto"
                />
                <span className="absolute -top-4 right-0 px-2 py-0.5 rounded-full bg-black/60 border border-purple-400 text-purple-200 text-[10px] font-mono">
                  ¡Uff! :3
                </span>
              </motion.div>

              {/* Minki Superhéroe con Capa Roja Flotando */}
              <motion.div
                initial={{ x: 220, scale: 0.6, rotate: -20 }}
                animate={{
                  x: 0,
                  scale: 1.15,
                  rotate: [0, 4, -4, 0],
                }}
                transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
                className="relative flex flex-col items-center"
              >
                <div className="relative">
                  <img
                    src="/minki/minki_superhero.png"
                    alt="Minki Superhéroe con Capa"
                    className="w-44 sm:w-56 h-auto drop-shadow-[0_0_30px_rgba(220,38,38,0.7)]"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-40 pointer-events-none" />
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-serif font-black text-xs shadow-md tracking-wider">
                  ¡SUPERHERO MINKI AL RESCATE!
                </div>
              </motion.div>

              {/* El Regalo atrapado justo a tiempo */}
              <motion.div
                initial={{ y: -160, opacity: 0 }}
                animate={{ y: -30, opacity: 1, scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-10 flex flex-col items-center"
              >
                <div className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400 text-purple-200 text-xs font-mono font-bold animate-bounce">
                  ✨ ¡REGALO ATRAPADO INTACTO! ✨
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ---------------------------------------------------- */}
          {/* FASE 4: EL PASTEL 26, KILLUA, MINKI Y FUEGOS ARTIFICIALES */}
          {/* ---------------------------------------------------- */}
          {phase === 'celebrate' && (
            <motion.div
              key="celebrate"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
              className="relative w-full h-full flex flex-col items-center justify-end pb-4"
            >
              {/* Fuegos artificiales con nombres y carita de Minki */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {/* Cohete 1: "★ ALEROIF24 ★" */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.2, y: 120 }}
                  animate={{
                    opacity: [0, 1, 1, 0.9, 0],
                    scale: [0.2, 1.2, 1, 1.05, 0.9],
                    y: [120, -10, -20, -25, -30],
                  }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }}
                  className="absolute top-8 left-8 sm:left-16 text-center"
                >
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 text-black font-serif font-black text-xs sm:text-sm tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.9)] border border-white">
                    ★ ALEROIF24 ★
                  </div>
                  <div className="w-1 h-8 mx-auto bg-gradient-to-t from-transparent to-amber-300 opacity-60" />
                </motion.div>

                {/* Cohete 2: "✦ FIORELA ✦" */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.2, y: 140 }}
                  animate={{
                    opacity: [0, 1, 1, 0.9, 0],
                    scale: [0.2, 1.2, 1, 1.05, 0.9],
                    y: [140, 0, -15, -20, -25],
                  }}
                  transition={{ repeat: Infinity, duration: 4.5, delay: 1.5, repeatDelay: 0.8 }}
                  className="absolute top-6 right-8 sm:right-20 text-center"
                >
                  <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-300 to-purple-500 text-white font-serif font-black text-xs sm:text-sm tracking-widest shadow-[0_0_25px_rgba(244,63,94,0.9)] border border-white">
                    ✦ FIORELA ✦
                  </div>
                  <div className="w-1 h-8 mx-auto bg-gradient-to-t from-transparent to-rose-400 opacity-60" />
                </motion.div>

                {/* Cohete 3: "✨ 26 ✨" */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{
                    opacity: [0, 1, 1, 0.8, 0],
                    scale: [0.3, 1.3, 1.1, 1, 0.8],
                  }}
                  transition={{ repeat: Infinity, duration: 3.5, delay: 2.2, repeatDelay: 1.5 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 text-center"
                >
                  <div className="px-5 py-1 rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-amber-400 text-white font-serif font-black text-sm tracking-widest shadow-[0_0_30px_rgba(168,85,247,0.9)] border-2 border-white/80">
                    ✨ NIVEL 26 ✨
                  </div>
                </motion.div>

                {/* Cohete 4: Carita de Minki en fuegos artificiales */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.1, y: 100 }}
                  animate={{
                    opacity: [0, 1, 1, 0.9, 0],
                    scale: [0.1, 1.25, 1, 0.95, 0.7],
                    y: [100, -20, -35, -45, -55],
                    rotate: [0, -10, 10, -5, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 5, delay: 0.8, repeatDelay: 2 }}
                  className="absolute top-16 left-1/3 text-center"
                >
                  <div className="relative p-2 rounded-2xl bg-amber-400/20 backdrop-blur-sm border-2 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.8)]">
                    <img
                      src="/minki/emote_chavo.png"
                      alt="Fuego artificial de Minki"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                    <div className="text-[10px] font-bold text-amber-200 mt-0.5">¡Minki!</div>
                  </div>
                </motion.div>

                {/* Chispitas y confeti */}
                <div className="absolute inset-0 flex justify-around pointer-events-none opacity-70">
                  <span className="text-amber-300 text-lg animate-bounce">✦</span>
                  <span className="text-pink-400 text-sm animate-pulse">★</span>
                  <span className="text-cyan-300 text-xl animate-ping">✨</span>
                  <span className="text-purple-300 text-sm animate-bounce">✦</span>
                  <span className="text-yellow-200 text-base animate-pulse">★</span>
                </div>
              </div>

              {/* Escena central: Killua y Minki sosteniendo el pastel */}
              <div className="relative z-20 flex items-end justify-center gap-2 sm:gap-6 w-full max-w-xl">
                {/* Killua Chibi Sonriente */}
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, y: [0, -4, 0] }}
                  transition={{
                    duration: 0.5,
                    y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                  }}
                  className="relative shrink-0 flex flex-col items-center"
                >
                  <img
                    src="/killua_chibi.png"
                    alt="Chibi Killua sosteniendo el pastel"
                    className="w-24 sm:w-32 h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                  />
                  <span className="text-[11px] font-mono text-purple-200 font-bold bg-black/60 px-2 py-0.5 rounded-full border border-purple-400/40">
                    Killua :3
                  </span>
                </motion.div>

                {/* El Pastel de 3 Pisos con las Velas 2 y 6 */}
                <motion.div
                  initial={{ scale: 0.5, y: 30 }}
                  animate={{ scale: 1, y: [0, -2, 0] }}
                  transition={{
                    duration: 0.6,
                    type: 'spring',
                    bounce: 0.4,
                    y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                  }}
                  className="relative shrink-0 flex flex-col items-center"
                >
                  <img
                    src="/birthday_cake_26.svg"
                    alt="Pastel de cumpleaños de 3 pisos con velas 26"
                    className="w-44 sm:w-56 h-auto drop-shadow-[0_12px_30px_rgba(244,63,94,0.5)]"
                  />
                </motion.div>

                {/* Superhero Minki con capa al lado del pastel */}
                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, y: [0, -4, 0] }}
                  transition={{
                    duration: 0.5,
                    y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.3 },
                  }}
                  className="relative shrink-0 flex flex-col items-center"
                >
                  <img
                    src="/minki/minki_superhero.png"
                    alt="Superhero Minki junto al pastel"
                    className="w-32 sm:w-40 h-auto drop-shadow-[0_8px_16px_rgba(220,38,38,0.6)]"
                  />
                  <span className="text-[11px] font-mono text-amber-200 font-bold bg-black/60 px-2 py-0.5 rounded-full border border-amber-400/40">
                    Super Minki 🐾
                  </span>
                </motion.div>
              </div>

              {/* Felicitación Central */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-20 mt-3 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/50 text-amber-300 font-serif font-black text-xs sm:text-sm tracking-widest shadow">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                  <span>¡Pastel de 3 pisos listo para soplar las 26 velas!</span>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* BARRA DE CONTROL DE LA ANIMACIÓN                     */}
        {/* ---------------------------------------------------- */}
        <div className="relative z-30 px-6 py-4 bg-[#0F1122]/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="text-neutral-400 font-serif mr-1 text-[11px]">Saltar a escena:</span>
            <button
              onClick={() => handleJumpTo(0)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                phase === 'running'
                  ? 'bg-amber-500 text-black font-bold shadow'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              1. Carrera
            </button>
            <button
              onClick={() => handleJumpTo(3.8)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                phase === 'trip'
                  ? 'bg-red-500 text-white font-bold shadow'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              2. Tropiezo
            </button>
            <button
              onClick={() => handleJumpTo(5.8)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                phase === 'rescue'
                  ? 'bg-amber-400 text-black font-bold shadow'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              3. Rescate Minki
            </button>
            <button
              onClick={() => handleJumpTo(8.0)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                phase === 'celebrate'
                  ? 'bg-purple-500 text-white font-bold shadow'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              4. Pastel 26 & Fiesta
            </button>
          </div>

          <div className="w-full sm:w-48 flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 transition-all duration-100"
                style={{ width: `${Math.min(100, (currentTime / animationDuration) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-neutral-400">
              {currentTime.toFixed(1)}s
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ESPACIO DESTACADO: COMUNIDAD DE DISCORD               */}
      {/* ======================================================== */}
      <div className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#E5D8C1]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#722F3D] uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-[#C29336]" />
              <span>La Familia en Discord & Kick</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#2C2D35]">
              Los que Hacen Posible la Magia
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Tus seguidores y moderadores que comparten cada directo, ranked y anécdota contigo.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Y toda la comunidad que llena el chat cada día ✦</span>
          </div>
        </div>

        {/* Grilla de los Miembros de la Comunidad: Solo Foto y Nombre (Sin texto extra ni clics) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {communityMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.025 }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-[#1E1F29] border border-[#36384A] shadow-md select-none"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 bg-[#2B2D38] shrink-0">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="font-sans font-bold text-sm truncate tracking-wide"
                  style={{ color: member.color }}
                >
                  {member.name}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Tarjeta de Reconocimiento a Toda la Comunidad: Solo icono y nombre */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="flex items-center gap-3 p-3 rounded-2xl border-2 border-dashed border-[#C29336]/60 bg-gradient-to-br from-[#1E1F29] to-[#2E2034] shadow-md select-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#C29336]/20 border border-[#C29336] flex items-center justify-center shrink-0 text-[#C29336]">
              <Heart className="w-5 h-5 fill-[#C29336]/40 text-[#C29336]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-serif font-black text-amber-300 truncate">
                ✦ Y Toda la Comunidad ✦
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. GALERÍA DE PARTY ANIMALS & MOMENTOS EN COMUNIDAD      */}
      {/* ======================================================== */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1A1829] via-[#221B33] to-[#171424] border-2 border-[#C29336]/50 shadow-2xl text-white relative overflow-hidden">
        {/* Cabecera de Party Animals */}
        <div className="mb-8 pb-4 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/40 text-purple-300 text-xs font-serif font-bold uppercase tracking-wider mb-2">
            <Gamepad2 className="w-3.5 h-3.5 text-purple-300" />
            <span>Party Animals ✦ Capturas de Discord</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl font-black text-amber-200">
            Risas, Caos y Amistad en Cada Partida
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-serif max-w-2xl leading-relaxed">
            Las mejores partidas en Discord no se miden por victorias, sino por las carcajadas compartidas. Aquí
            quedan inmortalizadas las mejores noches de Party Animals.
          </p>
        </div>

        {/* Grilla de Polaroids de Party Animals: Solo las fotos limpias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partyPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.035 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer bg-[#FDFBF7] p-2.5 sm:p-3 rounded-2xl shadow-lg border border-neutral-200/80 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 relative select-none"
            >
              {/* Cinta adhesiva decorativa estilo polaroid */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-200/60 rounded-sm shadow-sm rotate-1 z-10 pointer-events-none" />

              {/* Imagen limpia */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 shadow-inner">
                <img
                  src={photo.url}
                  alt="Party Animals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal / Lightbox de la fotografía seleccionada (Limpio) */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-[#181622] rounded-3xl overflow-hidden border-2 border-[#C29336] shadow-2xl p-4 sm:p-6"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-10 cursor-pointer"
                  title="Cerrar vista previa"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src={selectedPhoto.url}
                    alt="Party Animals"
                    className="w-full max-h-[75vh] object-contain mx-auto"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
