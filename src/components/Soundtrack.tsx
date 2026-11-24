import React from 'react';
import { motion } from 'framer-motion';
import { Music, Disc, ExternalLink, Headphones, Sparkles, Waves, Radio, Flame } from 'lucide-react';

export const Soundtrack: React.FC = () => {
  const artists = [
    {
      name: 'Selena Gomez',
      tag: 'Voz & Canciones Favoritas',
      description: 'Melodías pop emotivas y personales que forman parte de su día a día.',
      color: 'from-rose-900/20 to-wine/20 border-rose-800/30',
      badgeColor: 'bg-rose-900/10 text-rose-800 border-rose-300',
      spotifyQuery: 'Selena+Gomez',
      icon: <Sparkles className="w-5 h-5 text-rose-600" />,
    },
    {
      name: 'Rels B',
      tag: 'Sonido Urbano & Relajado',
      description: 'Ritmos fluidos y letras envolventes ideales para cualquier hora.',
      color: 'from-amber-900/20 to-orange-900/20 border-amber-800/30',
      badgeColor: 'bg-amber-900/10 text-amber-800 border-amber-300',
      spotifyQuery: 'Rels+B',
      icon: <Waves className="w-5 h-5 text-amber-600" />,
    },
    {
      name: 'Grupo Frontera',
      tag: 'Cumbia & Emoción',
      description: 'Temas para cantar, celebrar y conectar con la música que despierta recuerdos.',
      color: 'from-emerald-900/20 to-teal-900/20 border-emerald-800/30',
      badgeColor: 'bg-emerald-900/10 text-emerald-800 border-emerald-300',
      spotifyQuery: 'Grupo+Frontera',
      icon: <Radio className="w-5 h-5 text-emerald-600" />,
    },
    {
      name: 'Reguetón Clásico',
      tag: 'Éxitos de la Época Dorada',
      description: 'Los temas clásicos que levantan el ánimo y animan cualquier encuentro.',
      color: 'from-indigo-900/20 to-purple-900/20 border-indigo-800/30',
      badgeColor: 'bg-indigo-900/10 text-indigo-800 border-indigo-300',
      spotifyQuery: 'Reggaeton+Clasico',
      icon: <Flame className="w-5 h-5 text-orange-600" />,
    },
  ];

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12 relative">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#722F3D]">Sección 04</span>
        <div className="relative inline-flex items-center justify-center gap-2 mt-1">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#302622] flex items-center gap-2">
            <span>La Banda Sonora</span>
            <Music className="w-6 h-6 text-[#722F3D]" />
          </h2>

          {/* Sticker de Minki feliz disfrutando la música */}
          <div className="hidden sm:block absolute -top-8 -right-14 pointer-events-none">
            <img
              src="/minki/emote_feliz.png"
              alt="Minki Feliz con la música"
              className="w-12 h-12 object-contain drop-shadow transform rotate-12"
              title="Minki disfrutando la música"
            />
          </div>
        </div>
        <p className="text-sm text-neutral-600 mt-2 max-w-lg mx-auto">
          Música y canciones que acompañan sus partidas, momentos de estudio y directos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {artists.map((artist, idx) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`relative bg-white rounded-2xl p-5 shadow-scrapbook border ${artist.color} flex flex-col justify-between group hover:-translate-y-1.5 transition-all`}
          >
            <div className="washi-tape"></div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                  {artist.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${artist.badgeColor}`}>
                  {artist.tag}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#302622] group-hover:text-[#722F3D] transition-colors">
                {artist.name}
              </h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                {artist.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                <Disc className="w-3.5 h-3.5 text-neutral-400 animate-spin-slow" />
                <span>Spotify</span>
              </span>
              <a
                href={`https://open.spotify.com/search/${artist.spotifyQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#722F3D] hover:underline"
              >
                <span>Escuchar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-neutral-500 flex items-center justify-center gap-1.5">
          <Headphones className="w-3.5 h-3.5 text-[#722F3D]" />
          <span>Sin reproducción automática intrusiva. Enlaces oficiales para escuchar cuando lo desees.</span>
        </p>
      </div>
    </section>
  );
};
