import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onAuthenticated: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onAuthenticated }) => {
  const [authMode, setAuthMode] = useState<'credentials' | 'magic-link'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({ type: 'success', text: '¡Bienvenida! Acceso concedido.' });
          setTimeout(() => onAuthenticated(), 800);
        }
      } catch (err: any) {
        setMessage({ type: 'error', text: err.message || 'Error al iniciar sesión' });
      }
    } else {
      // Modo local / Preview si Supabase aún no tiene credenciales en .env
      if (email.trim() || password.trim()) {
        setMessage({ type: 'success', text: 'Acceso en modo de desarrollo concedido.' });
        setTimeout(() => onAuthenticated(), 600);
      } else {
        setMessage({ type: 'error', text: 'Por favor ingresa tus datos de acceso o usa el botón de vista previa.' });
      }
    }
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({ type: 'success', text: '¡Código de acceso enviado a tu correo! Revisa tu bandeja de entrada.' });
        }
      } catch (err: any) {
        setMessage({ type: 'error', text: err.message || 'Error al enviar enlace' });
      }
    } else {
      setMessage({
        type: 'error',
        text: 'Supabase Auth requiere configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env.',
      });
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29201F]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-md w-full bg-[#FFFDF8] rounded-3xl p-8 shadow-2xl border border-[#F2EBDD]"
        >
          <div className="washi-tape"></div>

          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-2xl bg-[#722F3D]/10 text-[#722F3D] mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#302622]">
              Espacio Privado - Nivel 26
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Este sitio contiene recuerdos e imágenes privadas. Ingresa tus datos para continuar.
            </p>
          </div>

          {/* Selector de método */}
          <div className="flex rounded-xl bg-[#F2EBDD]/60 p-1 mb-6 text-xs font-medium">
            <button
              onClick={() => { setAuthMode('credentials'); setMessage(null); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'credentials' ? 'bg-white shadow text-[#722F3D] font-bold' : 'text-neutral-600'
              }`}
            >
              Usuario & Clave
            </button>
            <button
              onClick={() => { setAuthMode('magic-link'); setMessage(null); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'magic-link' ? 'bg-white shadow text-[#722F3D] font-bold' : 'text-neutral-600'
              }`}
            >
              Código al Correo
            </button>
          </div>

          {/* Formulario */}
          {authMode === 'credentials' ? (
            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Correo o Usuario
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fiorela@ejemplo.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#722F3D] focus:ring-1 focus:ring-[#722F3D]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#722F3D] focus:ring-1 focus:ring-[#722F3D]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-[#722F3D] hover:bg-[#541F2B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <span>{loading ? 'Verificando...' : 'Entrar al sitio'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Correo Electrónico Autorizado
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fiorela@ejemplo.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-[#722F3D] focus:ring-1 focus:ring-[#722F3D]"
                    required
                  />
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">
                  Se enviará un código de un solo uso o enlace directo a este correo.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-[#722F3D] hover:bg-[#541F2B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <span>{loading ? 'Enviando...' : 'Solicitar código de acceso'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Mensajes de feedback */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                message.type === 'error'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {message.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <ShieldCheck className="w-4 h-4 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Acceso para pruebas en desarrollo */}
          <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
            <button
              onClick={onAuthenticated}
              className="text-[11px] text-[#722F3D] hover:underline font-mono"
            >
              Modo Vista Previa / Explorar sin credenciales
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
