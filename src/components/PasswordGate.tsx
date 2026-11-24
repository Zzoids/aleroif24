import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PasswordGateProps {
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim() === 'minki1234') {
      setIsSuccess(true);
      setError(null);
      sessionStorage.setItem('aleroif24_auth', 'true');

      // Efecto festivo de confeti al desbloquear
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#E4B343', '#722F3D', '#FAF7F2', '#38B2AC'],
        });
      } catch {
        // En caso de que falle la animación de confeti
      }

      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setError('Contraseña incorrecta. Por favor inténtalo de nuevo.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  // Seleccionar emote de Minki según el estado
  const minkiEmote = isSuccess
    ? '/minki/emote_feliz.png'
    : error
    ? '/minki/emote_pipipi.png'
    : '/minki/emote_bandido.png';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111215] text-[#F2EBDD] overflow-hidden select-none">
      {/* Luces y ambientación de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#722F3D]/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#E4B343]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1a1b22]/50 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: shake ? [-10, 10, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{
          duration: shake ? 0.4 : 0.5,
          ease: 'easeOut',
        }}
        className="relative max-w-md w-full bg-[#18191E]/95 border border-[#2C2D35] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl z-10"
      >
        {/* Adorno superior de luz */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#E4B343] to-transparent" />

        <div className="flex flex-col items-center text-center">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4B343]/10 border border-[#E4B343]/30 text-[#E4B343] text-[11px] font-bold tracking-widest uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aleroif24 · Nivel 26</span>
          </div>

          {/* Emote de Minki */}
          <motion.div
            key={minkiEmote}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative mb-4"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#242630] to-[#141519] border border-[#3A3C48] flex items-center justify-center p-2 shadow-inner group">
              <img
                src={minkiEmote}
                alt="Minki Guardián"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#202129] border border-[#3A3C48] text-[#E4B343]">
              {isSuccess ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4" />}
            </div>
          </motion.div>

          {/* Título */}
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Acceso Protegido
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xs">
            Ingresa la contraseña para entrar al contenido especial.
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                autoFocus
                placeholder="Escribe la contraseña..."
                className={`w-full bg-[#121316] text-[#F2EBDD] placeholder-neutral-500 text-sm rounded-xl px-4 py-3.5 pr-11 border outline-none transition-all ${
                  error
                    ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                    : 'border-[#2C2D35] focus:border-[#E4B343]/60 focus:ring-2 focus:ring-[#E4B343]/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors p-1"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Mensaje de error si la contraseña falla */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center justify-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-lg"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón de ingresar */}
            <button
              type="submit"
              disabled={isSuccess || !password.trim()}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                isSuccess
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-gradient-to-r from-[#C29336] via-[#E4B343] to-[#C29336] hover:brightness-110 active:scale-[0.99] text-[#141519] shadow-[#E4B343]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100'
              }`}
            >
              {isSuccess ? (
                <>
                  <Unlock className="w-4 h-4 animate-bounce" />
                  <span>¡Bienvenida! Desbloqueando...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          {/* Pista amistosa */}
          <div className="mt-5 pt-4 border-t border-[#2C2D35]/80 w-full text-center">
            <p className="text-[11px] text-neutral-400">
              💡 <span className="text-neutral-300 font-medium">Pista:</span> El nombre de tu gatito consentido + números
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
