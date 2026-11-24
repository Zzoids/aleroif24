import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Flower2, Coffee, Wine, MessageSquareQuote, Zap, RotateCcw } from 'lucide-react';

interface CardData {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  frontText: string;
  backTitle: string;
  backText: string;
  color: string;
}

export const LittleThings: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const cards: CardData[] = [
    {
      id: 'destinos',
      title: 'Corea y Oxapampa',
      category: 'Viajes y Destinos',
      icon: <Compass className="w-6 h-6 text-emerald-700" />,
      frontText: 'Dos lugares especiales en el mapa de deseos y planes por cumplir.',
      backTitle: 'Nuevos Horizontes',
      backText: 'Desde la naturaleza y tranquilidad de Oxapampa hasta las calles y series de Corea. Viajar es sumar memorias inolvidables.',
      color: 'border-emerald-200 bg-emerald-50/40',
    },
    {
      id: 'hunter',
      title: 'Killua Zoldyck',
      category: 'Hunter x Hunter',
      icon: <Zap className="w-6 h-6 text-sky-600" />,
      frontText: 'El personaje de cabello blanco y relámpagos que destaca por su destreza.',
      backTitle: 'Velocidad del Rayo',
      backText: 'Leal, veloz e ingenioso. De los mejores personajes del anime, digno de lucir con orgullo en un polo.',
      color: 'border-sky-200 bg-sky-50/40',
    },
    {
      id: 'bubbletea',
      title: 'Maracumango',
      category: 'Bebida Favorita',
      icon: <Coffee className="w-6 h-6 text-amber-600" />,
      frontText: 'La combinación perfecta de maracuyá y mango en bubble tea.',
      backTitle: 'Sabor Cítrico y Dulce',
      backText: 'Refrescante y equilibrado. El acompañamiento ideal para una tarde tranquila o un stream prolongado.',
      color: 'border-amber-200 bg-amber-50/40',
    },
    {
      id: 'tulipanes',
      title: 'Tulipanes',
      category: 'Flores y Detalles',
      icon: <Flower2 className="w-6 h-6 text-rose-600" />,
      frontText: 'Elegancia natural sin estridencias, delicados y expresivos.',
      backTitle: 'Belleza Sutil',
      backText: 'Flores que transmiten aprecio sincero, calidez y buen gusto en cada uno de sus pétalos.',
      color: 'border-rose-200 bg-rose-50/40',
    },
    {
      id: 'vino',
      title: 'Copa de Vino',
      category: 'Brindis de Celebración',
      icon: <Wine className="w-6 h-6 text-[#722F3D]" />,
      frontText: 'Un buen vino tinto o borgoña para brindar por los 26 años.',
      backTitle: 'Salud por tus 26',
      backText: 'Una copa para conmemorar los logros alcanzados y dar la bienvenida a todas las aventuras venideras.',
      color: 'border-[#722F3D]/30 bg-[#722F3D]/5',
    },
    {
      id: 'frances',
      title: 'En Français',
      category: 'Detalle Especial',
      icon: <MessageSquareQuote className="w-6 h-6 text-indigo-600" />,
      frontText: 'Un pequeño toque en francés pensado para este aniversario.',
      backTitle: 'Joyeux Anniversaire',
      backText: '"Que cette nouvelle année t\'apporte joie, sérénité et succès dans chaque partie et chaque projet." (¡Feliz cumpleaños!)',
      color: 'border-indigo-200 bg-indigo-50/40',
    },
  ];

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#722F3D]">Sección 05</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#302622] mt-1 flex items-center justify-center gap-2">
          <span>Pequeños Detalles</span>
          <Sparkles className="w-5 h-5 text-[#C29336]" />
        </h2>
        <p className="text-sm text-neutral-600 mt-2 max-w-lg mx-auto">
          Gustos y preferencias descubiertas en estos meses. Pulsa cada tarjeta para voltearla.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const isFlipped = Boolean(flippedCards[card.id]);

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="perspective-1000 h-60 cursor-pointer"
              onClick={() => toggleFlip(card.id)}
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Frente */}
                <div className={`absolute inset-0 backface-hidden bg-white rounded-2xl p-6 shadow-scrapbook border ${card.color} flex flex-col justify-between overflow-visible relative`}>
                  <div className="washi-tape"></div>

                  {/* Stickers decorativos de Minki en tarjetas específicas */}
                  {card.id === 'hunter' && (
                    <img
                      src="/minki/emote_chavo.png"
                      alt="Minki con gorrito"
                      className="absolute -top-4 -right-4 w-12 h-12 object-contain drop-shadow pointer-events-none transform rotate-12"
                      title="Minki fan del anime"
                    />
                  )}
                  {card.id === 'bubbletea' && (
                    <img
                      src="/minki/emote_bandido.png"
                      alt="Minki con bubble tea"
                      className="absolute -top-4 -right-4 w-11 h-11 object-contain drop-shadow pointer-events-none"
                      title="Minki vigilando el bubble tea"
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-white shadow-sm border border-neutral-100">
                        {card.icon}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        {card.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#302622] mt-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      {card.frontText}
                    </p>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-medium text-right flex items-center justify-end gap-1">
                    <span>Toca para voltear</span>
                    <RotateCcw className="w-3 h-3" />
                  </div>
                </div>

                {/* Reverso */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#302622] text-[#F2EBDD] rounded-2xl p-6 shadow-scrapbook border border-[#44352f] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#E4B343] font-semibold">
                      {card.category}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mt-1">
                      {card.backTitle}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                      {card.backText}
                    </p>
                  </div>
                  <div className="text-[10px] text-[#E4B343] font-medium text-right flex items-center justify-end gap-1">
                    <span>Toca para regresar</span>
                    <RotateCcw className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
