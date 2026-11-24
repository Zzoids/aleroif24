import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { GamerCard } from './components/GamerCard';
import { MinkiCorner } from './components/MinkiCorner';
import { BeyondTheScreen } from './components/BeyondTheScreen';
import { BirthdayCommunity } from './components/BirthdayCommunity';
import { BirthdayLetter } from './components/BirthdayLetter';
import { PasswordGate } from './components/PasswordGate';
import { Heart, Sparkles, Lock } from 'lucide-react';

export function App() {
  const [isPasswordUnlocked, setIsPasswordUnlocked] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('aleroif24_auth') === 'true';
  });
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Estados de audio por sección
  // 1. Dota 2 Theme
  const [isDotaPlaying, setIsDotaPlaying] = useState(false);
  const [dotaVolume, setDotaVolume] = useState(0.35);

  // 2. Minki ("Miel" - Lauri Garcia)
  const [isMinkiPlaying, setIsMinkiPlaying] = useState(false);
  const [minkiVolume, setMinkiVolume] = useState(0.45);

  // 3. Detrás de la pantalla ("Who Says" - Selena Gomez)
  const [isSelenaPlaying, setIsSelenaPlaying] = useState(false);
  const [selenaVolume, setSelenaVolume] = useState(0.45);
  const [selenaCurrentTime, setSelenaCurrentTime] = useState(0);

  // 4. Feliz Cumpleaños ("Cumpleaños Feliz" - Versión Original)
  const [isBirthdayPlaying, setIsBirthdayPlaying] = useState(false);
  const [birthdayVolume, setBirthdayVolume] = useState(0.5);

  // 5. Carta de Cumpleaños ("Color Esperanza" - Diego Torres)
  const [isLetterPlaying, setIsLetterPlaying] = useState(false);
  const [letterVolume, setLetterVolume] = useState(0.5);

  // Referencias a los reproductores de audio
  const dotaAudioRef = useRef<HTMLAudioElement | null>(null);
  const minkiAudioRef = useRef<HTMLAudioElement | null>(null);
  const selenaAudioRef = useRef<HTMLAudioElement | null>(null);
  const birthdayAudioRef = useRef<HTMLAudioElement | null>(null);
  const letterAudioRef = useRef<HTMLAudioElement | null>(null);

  // Banderas para recordar si el usuario pausó manualmente la música en esa sección
  const dotaUserPausedRef = useRef(false);
  const minkiUserPausedRef = useRef(false);
  const selenaUserPausedRef = useRef(false);
  const birthdayUserPausedRef = useRef(false);
  const letterUserPausedRef = useRef(false);

  // Control del retraso de 3 segundos al presionar "Aceptar" en Hero
  const dotaDelayActiveRef = useRef(false);
  const dotaInitialTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inicializar elementos de audio HTML
  useEffect(() => {
    const dotaAudio = new Audio('/audio/dota_theme.webm');
    dotaAudio.loop = true;
    dotaAudio.volume = dotaVolume;
    dotaAudioRef.current = dotaAudio;

    const minkiAudio = new Audio('/audio/miel.webm');
    minkiAudio.loop = true;
    minkiAudio.volume = minkiVolume;
    minkiAudioRef.current = minkiAudio;

    const selenaAudio = new Audio('/audio/who_says_loop.webm');
    selenaAudio.loop = true;
    selenaAudio.volume = selenaVolume;
    selenaAudio.ontimeupdate = () => {
      setSelenaCurrentTime(selenaAudio.currentTime);
    };
    selenaAudioRef.current = selenaAudio;

    const birthdayAudio = new Audio('/audio/cumpleanos_feliz.mp3');
    birthdayAudio.loop = true;
    birthdayAudio.volume = birthdayVolume;
    birthdayAudioRef.current = birthdayAudio;

    const letterAudio = new Audio('/audio/color_esperanza.mp3');
    letterAudio.loop = true;
    letterAudio.volume = letterVolume;
    letterAudioRef.current = letterAudio;

    return () => {
      if (dotaInitialTimeoutRef.current) {
        clearTimeout(dotaInitialTimeoutRef.current);
      }
      dotaAudio.pause();
      minkiAudio.pause();
      selenaAudio.pause();
      birthdayAudio.pause();
      letterAudio.pause();
    };
  }, []);

  // Manejador del botón "Subir de Nivel" en Hero
  const handleLevelUp = () => {
    setIsUnlocked(true);
    dotaUserPausedRef.current = false;
    minkiUserPausedRef.current = false;
    selenaUserPausedRef.current = false;
    birthdayUserPausedRef.current = false;
    letterUserPausedRef.current = false;

    // Scroll suave a la sección Dota 2
    setTimeout(() => {
      const element = document.getElementById('her-world');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);

    // Iniciar la primera canción (Dota) exactamente 3 segundos (3000ms) después de dar click en Aceptar
    dotaDelayActiveRef.current = true;
    if (dotaInitialTimeoutRef.current) {
      clearTimeout(dotaInitialTimeoutRef.current);
    }
    dotaInitialTimeoutRef.current = setTimeout(() => {
      dotaDelayActiveRef.current = false;
      dotaInitialTimeoutRef.current = null;
      if (dotaAudioRef.current && !dotaUserPausedRef.current) {
        dotaAudioRef.current.play().then(() => {
          setIsDotaPlaying(true);
        }).catch(() => {
          // Si el navegador requiere interacción adicional
        });
      }
    }, 3000);
  };

  // Controles manuales para la música de Dota
  const handleToggleDotaMusic = () => {
    if (!dotaAudioRef.current) return;

    if (dotaInitialTimeoutRef.current) {
      clearTimeout(dotaInitialTimeoutRef.current);
      dotaInitialTimeoutRef.current = null;
    }
    dotaDelayActiveRef.current = false;

    if (isDotaPlaying) {
      dotaAudioRef.current.pause();
      setIsDotaPlaying(false);
      dotaUserPausedRef.current = true;
    } else {
      // Pausar las otras canciones si estuvieran sonando
      if (minkiAudioRef.current) {
        minkiAudioRef.current.pause();
        setIsMinkiPlaying(false);
      }
      if (selenaAudioRef.current) {
        selenaAudioRef.current.pause();
        setIsSelenaPlaying(false);
      }
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.pause();
        setIsBirthdayPlaying(false);
      }
      if (letterAudioRef.current) {
        letterAudioRef.current.pause();
        setIsLetterPlaying(false);
      }
      dotaAudioRef.current.play().then(() => {
        setIsDotaPlaying(true);
        dotaUserPausedRef.current = false;
      }).catch(() => {});
    }
  };

  const handleDotaVolumeChange = (vol: number) => {
    setDotaVolume(vol);
    if (dotaAudioRef.current) {
      dotaAudioRef.current.volume = vol;
    }
  };

  // Controles manuales para la música de Minki (Miel - Lauri Garcia)
  const handleToggleMinkiMusic = () => {
    if (!minkiAudioRef.current) return;

    if (isMinkiPlaying) {
      minkiAudioRef.current.pause();
      setIsMinkiPlaying(false);
      minkiUserPausedRef.current = true;
    } else {
      // Pausar las otras canciones
      if (dotaAudioRef.current) {
        dotaAudioRef.current.pause();
        setIsDotaPlaying(false);
      }
      if (selenaAudioRef.current) {
        selenaAudioRef.current.pause();
        setIsSelenaPlaying(false);
      }
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.pause();
        setIsBirthdayPlaying(false);
      }
      if (letterAudioRef.current) {
        letterAudioRef.current.pause();
        setIsLetterPlaying(false);
      }
      minkiAudioRef.current.play().then(() => {
        setIsMinkiPlaying(true);
        minkiUserPausedRef.current = false;
      }).catch(() => {});
    }
  };

  const handleMinkiVolumeChange = (vol: number) => {
    setMinkiVolume(vol);
    if (minkiAudioRef.current) {
      minkiAudioRef.current.volume = vol;
    }
  };

  // Controles manuales para la música de Selena Gomez (Who Says)
  const handleToggleSelenaMusic = () => {
    if (!selenaAudioRef.current) return;

    if (isSelenaPlaying) {
      selenaAudioRef.current.pause();
      setIsSelenaPlaying(false);
      selenaUserPausedRef.current = true;
    } else {
      // Pausar las otras canciones
      if (dotaAudioRef.current) {
        dotaAudioRef.current.pause();
        setIsDotaPlaying(false);
      }
      if (minkiAudioRef.current) {
        minkiAudioRef.current.pause();
        setIsMinkiPlaying(false);
      }
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.pause();
        setIsBirthdayPlaying(false);
      }
      if (letterAudioRef.current) {
        letterAudioRef.current.pause();
        setIsLetterPlaying(false);
      }
      selenaAudioRef.current.play().then(() => {
        setIsSelenaPlaying(true);
        selenaUserPausedRef.current = false;
      }).catch(() => {});
    }
  };

  const handleSelenaVolumeChange = (vol: number) => {
    setSelenaVolume(vol);
    if (selenaAudioRef.current) {
      selenaAudioRef.current.volume = vol;
    }
  };

  // Controles manuales para la música de Feliz Cumpleaños
  const handleToggleBirthdayMusic = () => {
    if (!birthdayAudioRef.current) return;

    if (isBirthdayPlaying) {
      birthdayAudioRef.current.pause();
      setIsBirthdayPlaying(false);
      birthdayUserPausedRef.current = true;
    } else {
      // Pausar las otras canciones
      if (dotaAudioRef.current) {
        dotaAudioRef.current.pause();
        setIsDotaPlaying(false);
      }
      if (minkiAudioRef.current) {
        minkiAudioRef.current.pause();
        setIsMinkiPlaying(false);
      }
      if (selenaAudioRef.current) {
        selenaAudioRef.current.pause();
        setIsSelenaPlaying(false);
      }
      if (letterAudioRef.current) {
        letterAudioRef.current.pause();
        setIsLetterPlaying(false);
      }
      birthdayAudioRef.current.play().then(() => {
        setIsBirthdayPlaying(true);
        birthdayUserPausedRef.current = false;
      }).catch(() => {});
    }
  };

  const handleBirthdayVolumeChange = (vol: number) => {
    setBirthdayVolume(vol);
    if (birthdayAudioRef.current) {
      birthdayAudioRef.current.volume = vol;
    }
  };

  // Controles manuales para la música de la Carta (Color Esperanza - Diego Torres)
  const handleToggleLetterMusic = () => {
    if (!letterAudioRef.current) return;

    if (isLetterPlaying) {
      letterAudioRef.current.pause();
      setIsLetterPlaying(false);
      letterUserPausedRef.current = true;
    } else {
      // Pausar las otras canciones
      if (dotaAudioRef.current) {
        dotaAudioRef.current.pause();
        setIsDotaPlaying(false);
      }
      if (minkiAudioRef.current) {
        minkiAudioRef.current.pause();
        setIsMinkiPlaying(false);
      }
      if (selenaAudioRef.current) {
        selenaAudioRef.current.pause();
        setIsSelenaPlaying(false);
      }
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.pause();
        setIsBirthdayPlaying(false);
      }
      letterAudioRef.current.play().then(() => {
        setIsLetterPlaying(true);
        letterUserPausedRef.current = false;
      }).catch(() => {});
    }
  };

  const handleLetterVolumeChange = (vol: number) => {
    setLetterVolume(vol);
    if (letterAudioRef.current) {
      letterAudioRef.current.volume = vol;
    }
  };

  const handleSelenaSeek = (time: number) => {
    if (selenaAudioRef.current) {
      selenaAudioRef.current.currentTime = time;
      setSelenaCurrentTime(time);
    }
  };

  // Observer inteligente: Cambia de música entre Dota, Minki, Selena y Feliz Cumpleaños al scrollear
  // Si sales de una sección se pausa en su segundo exacto; si regresas, continúa desde donde quedó
  useEffect(() => {
    if (!isUnlocked) return;

    const handleScroll = () => {
      const dotaElement = document.getElementById('her-world');
      const minkiElement = document.getElementById('minki');
      const beyondElement = document.getElementById('beyond-the-screen');
      const birthdayElement = document.getElementById('birthday-community');
      const letterElement = document.getElementById('birthday-letter');

      if (!dotaElement || !minkiElement || !beyondElement || !birthdayElement || !letterElement) return;

      const dotaRect = dotaElement.getBoundingClientRect();
      const minkiRect = minkiElement.getBoundingClientRect();
      const beyondRect = beyondElement.getBoundingClientRect();
      const birthdayRect = birthdayElement.getBoundingClientRect();
      const letterRect = letterElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Porcentaje visible de cada sección en el viewport
      const dotaVisible = Math.max(0, Math.min(dotaRect.bottom, windowHeight) - Math.max(dotaRect.top, 0));
      const minkiVisible = Math.max(0, Math.min(minkiRect.bottom, windowHeight) - Math.max(minkiRect.top, 0));
      const beyondVisible = Math.max(0, Math.min(beyondRect.bottom, windowHeight) - Math.max(beyondRect.top, 0));
      const birthdayVisible = Math.max(0, Math.min(birthdayRect.bottom, windowHeight) - Math.max(birthdayRect.top, 0));
      const letterVisible = Math.max(0, Math.min(letterRect.bottom, windowHeight) - Math.max(letterRect.top, 0));

      const dotaRatio = dotaVisible / Math.min(dotaRect.height, windowHeight);
      const minkiRatio = minkiVisible / Math.min(minkiRect.height, windowHeight);
      const beyondRatio = beyondVisible / Math.min(beyondRect.height, windowHeight);
      const birthdayRatio = birthdayVisible / Math.min(birthdayRect.height, windowHeight);
      const letterRatio = letterVisible / Math.min(letterRect.height, windowHeight);

      if (letterRatio > 0.28 && letterRatio >= birthdayRatio && letterRatio >= beyondRatio && letterRatio >= minkiRatio && letterRatio >= dotaRatio) {
        // En la sección de la Carta: Pausar las demás y reproducir Color Esperanza
        if (dotaInitialTimeoutRef.current) {
          clearTimeout(dotaInitialTimeoutRef.current);
          dotaInitialTimeoutRef.current = null;
        }
        dotaDelayActiveRef.current = false;

        if (dotaAudioRef.current && !dotaAudioRef.current.paused) {
          dotaAudioRef.current.pause();
          setIsDotaPlaying(false);
        }
        if (minkiAudioRef.current && !minkiAudioRef.current.paused) {
          minkiAudioRef.current.pause();
          setIsMinkiPlaying(false);
        }
        if (selenaAudioRef.current && !selenaAudioRef.current.paused) {
          selenaAudioRef.current.pause();
          setIsSelenaPlaying(false);
        }
        if (birthdayAudioRef.current && !birthdayAudioRef.current.paused) {
          birthdayAudioRef.current.pause();
          setIsBirthdayPlaying(false);
        }
        if (letterAudioRef.current && !letterUserPausedRef.current && letterAudioRef.current.paused) {
          letterAudioRef.current.play().then(() => {
            setIsLetterPlaying(true);
          }).catch(() => {});
        }
      } else if (birthdayRatio > 0.28 && birthdayRatio >= beyondRatio && birthdayRatio >= minkiRatio && birthdayRatio >= dotaRatio && birthdayRatio >= letterRatio) {
        // En la sección de Feliz Cumpleaños: Pausar Dota, Minki, Selena y Carta, reanudar Cumpleaños Feliz
        if (dotaInitialTimeoutRef.current) {
          clearTimeout(dotaInitialTimeoutRef.current);
          dotaInitialTimeoutRef.current = null;
        }
        dotaDelayActiveRef.current = false;

        if (dotaAudioRef.current && !dotaAudioRef.current.paused) {
          dotaAudioRef.current.pause();
          setIsDotaPlaying(false);
        }
        if (minkiAudioRef.current && !minkiAudioRef.current.paused) {
          minkiAudioRef.current.pause();
          setIsMinkiPlaying(false);
        }
        if (selenaAudioRef.current && !selenaAudioRef.current.paused) {
          selenaAudioRef.current.pause();
          setIsSelenaPlaying(false);
        }
        if (letterAudioRef.current && !letterAudioRef.current.paused) {
          letterAudioRef.current.pause();
          setIsLetterPlaying(false);
        }
        if (birthdayAudioRef.current && !birthdayUserPausedRef.current && birthdayAudioRef.current.paused) {
          birthdayAudioRef.current.play().then(() => {
            setIsBirthdayPlaying(true);
          }).catch(() => {});
        }
      } else if (beyondRatio > 0.28 && beyondRatio >= minkiRatio && beyondRatio >= dotaRatio && beyondRatio >= birthdayRatio && beyondRatio >= letterRatio) {
        // En la sección 'Detrás de la pantalla': Pausar Dota, Minki, Cumpleaños y Carta, reanudar Who Says
        if (dotaInitialTimeoutRef.current) {
          clearTimeout(dotaInitialTimeoutRef.current);
          dotaInitialTimeoutRef.current = null;
        }
        dotaDelayActiveRef.current = false;

        if (dotaAudioRef.current && !dotaAudioRef.current.paused) {
          dotaAudioRef.current.pause();
          setIsDotaPlaying(false);
        }
        if (minkiAudioRef.current && !minkiAudioRef.current.paused) {
          minkiAudioRef.current.pause();
          setIsMinkiPlaying(false);
        }
        if (birthdayAudioRef.current && !birthdayAudioRef.current.paused) {
          birthdayAudioRef.current.pause();
          setIsBirthdayPlaying(false);
        }
        if (letterAudioRef.current && !letterAudioRef.current.paused) {
          letterAudioRef.current.pause();
          setIsLetterPlaying(false);
        }
        if (selenaAudioRef.current && !selenaUserPausedRef.current && selenaAudioRef.current.paused) {
          selenaAudioRef.current.play().then(() => {
            setIsSelenaPlaying(true);
          }).catch(() => {});
        }
      } else if (minkiRatio > 0.28 && minkiRatio >= beyondRatio && minkiRatio >= dotaRatio && minkiRatio >= birthdayRatio && minkiRatio >= letterRatio) {
        // En la sección de Minki: Pausar Dota, Selena, Cumpleaños y Carta, reanudar Miel
        if (dotaInitialTimeoutRef.current) {
          clearTimeout(dotaInitialTimeoutRef.current);
          dotaInitialTimeoutRef.current = null;
        }
        dotaDelayActiveRef.current = false;

        if (dotaAudioRef.current && !dotaAudioRef.current.paused) {
          dotaAudioRef.current.pause();
          setIsDotaPlaying(false);
        }
        if (selenaAudioRef.current && !selenaAudioRef.current.paused) {
          selenaAudioRef.current.pause();
          setIsSelenaPlaying(false);
        }
        if (birthdayAudioRef.current && !birthdayAudioRef.current.paused) {
          birthdayAudioRef.current.pause();
          setIsBirthdayPlaying(false);
        }
        if (letterAudioRef.current && !letterAudioRef.current.paused) {
          letterAudioRef.current.pause();
          setIsLetterPlaying(false);
        }
        if (minkiAudioRef.current && !minkiUserPausedRef.current && minkiAudioRef.current.paused) {
          minkiAudioRef.current.play().then(() => {
            setIsMinkiPlaying(true);
          }).catch(() => {});
        }
      } else if (dotaRatio > 0.28) {
        // En la sección de Dota 2: Pausar Miel, Selena, Cumpleaños y Carta, reanudar Dota Theme (si no está activo el delay inicial de 3s)
        if (minkiAudioRef.current && !minkiAudioRef.current.paused) {
          minkiAudioRef.current.pause();
          setIsMinkiPlaying(false);
        }
        if (selenaAudioRef.current && !selenaAudioRef.current.paused) {
          selenaAudioRef.current.pause();
          setIsSelenaPlaying(false);
        }
        if (birthdayAudioRef.current && !birthdayAudioRef.current.paused) {
          birthdayAudioRef.current.pause();
          setIsBirthdayPlaying(false);
        }
        if (letterAudioRef.current && !letterAudioRef.current.paused) {
          letterAudioRef.current.pause();
          setIsLetterPlaying(false);
        }
        if (!dotaDelayActiveRef.current && dotaAudioRef.current && !dotaUserPausedRef.current && dotaAudioRef.current.paused) {
          dotaAudioRef.current.play().then(() => {
            setIsDotaPlaying(true);
          }).catch(() => {});
        }
      } else {
        // Fuera de estas secciones: Pausar todas conservando su currentTime
        if (dotaAudioRef.current && !dotaAudioRef.current.paused) {
          dotaAudioRef.current.pause();
          setIsDotaPlaying(false);
        }
        if (minkiAudioRef.current && !minkiAudioRef.current.paused) {
          minkiAudioRef.current.pause();
          setIsMinkiPlaying(false);
        }
        if (selenaAudioRef.current && !selenaAudioRef.current.paused) {
          selenaAudioRef.current.pause();
          setIsSelenaPlaying(false);
        }
        if (birthdayAudioRef.current && !birthdayAudioRef.current.paused) {
          birthdayAudioRef.current.pause();
          setIsBirthdayPlaying(false);
        }
        if (letterAudioRef.current && !letterAudioRef.current.paused) {
          letterAudioRef.current.pause();
          setIsLetterPlaying(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isUnlocked]);

  if (!isPasswordUnlocked) {
    return <PasswordGate onUnlock={() => setIsPasswordUnlocked(true)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#111215] text-[#F2EBDD] font-sans selection:bg-[#722F3D] selection:text-white"
    >
      {/* Barra de navegación superior fija */}
      <header className="sticky top-0 z-40 bg-[#141519]/90 backdrop-blur-md border-b border-[#2C2D35] px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-lg text-[#E4B343]">Aleroif24</span>
        </div>

        <nav className="flex items-center gap-4 text-xs">
          {isUnlocked && (
            <>
              <a
                href="#her-world"
                className="hidden md:inline-block text-neutral-300 hover:text-[#E4B343] transition-colors"
              >
                Dota 2
              </a>
              <a
                href="#minki"
                className="hidden md:inline-block text-neutral-300 hover:text-[#E4B343] transition-colors"
              >
                Minki
              </a>
              <a
                href="#beyond-the-screen"
                className="hidden md:inline-block text-neutral-300 hover:text-[#E4B343] transition-colors"
              >
                Vocación
              </a>
              <a
                href="#birthday-community"
                className="hidden md:inline-block text-neutral-300 hover:text-[#E4B343] transition-colors"
              >
                Comunidad ✦ 26
              </a>
              <a
                href="#birthday-letter"
                className="hidden md:inline-block text-neutral-300 hover:text-[#E4B343] transition-colors"
              >
                Carta
              </a>
            </>
          )}

          <button
            onClick={() => {
              sessionStorage.removeItem('aleroif24_auth');
              setIsPasswordUnlocked(false);
            }}
            title="Bloquear página"
            className="text-neutral-400 hover:text-[#E4B343] transition-colors p-1.5 rounded-lg hover:bg-white/5 flex items-center gap-1.5 text-xs ml-2 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bloquear</span>
          </button>
        </nav>
      </header>

      <main className="relative">
        {/* Portada / Hero: Siempre visible primero */}
        <Hero onLevelUp={handleLevelUp} isUnlocked={isUnlocked} />

        {/* Las demás secciones permanecen ocultas hasta pulsar 'Aceptar' */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Sección 01: Dota 2 */}
              <div className="bg-[#121316] border-b border-[#2C2D35]">
                <GamerCard
                  isMusicPlaying={isDotaPlaying}
                  musicVolume={dotaVolume}
                  onToggleMusic={handleToggleDotaMusic}
                  onMusicVolumeChange={handleDotaVolumeChange}
                />
              </div>

              {/* Fondo cálido scrapbook para las secciones personales */}
              <div className="bg-[#FAF7F2] text-[#29201F]">
                {/* Sección 02: El Rincón de Minki */}
                <div id="minki" className="border-b border-[#F2EBDD]">
                  <MinkiCorner
                    isMusicPlaying={isMinkiPlaying}
                    musicVolume={minkiVolume}
                    onToggleMusic={handleToggleMinkiMusic}
                    onMusicVolumeChange={handleMinkiVolumeChange}
                  />
                </div>

                {/* Sección 03: Detrás de la pantalla (Vocación & Who Says) */}
                <div className="border-b border-[#F2EBDD]">
                  <BeyondTheScreen
                    isMusicPlaying={isSelenaPlaying}
                    musicVolume={selenaVolume}
                    currentTime={selenaCurrentTime}
                    onToggleMusic={handleToggleSelenaMusic}
                    onMusicVolumeChange={handleSelenaVolumeChange}
                    onSeek={handleSelenaSeek}
                  />
                </div>

                {/* Sección 04: ¡Feliz Cumpleaños & Comunidad Discord! */}
                <div id="birthday-community" className="border-b border-[#F2EBDD]">
                  <BirthdayCommunity
                    isMusicPlaying={isBirthdayPlaying}
                    musicVolume={birthdayVolume}
                    onToggleMusic={handleToggleBirthdayMusic}
                    onMusicVolumeChange={handleBirthdayVolumeChange}
                  />
                </div>

                {/* Sección 05: Carta de Cumpleaños */}
                <div id="birthday-letter">
                  <BirthdayLetter
                    isMusicPlaying={isLetterPlaying}
                    musicVolume={letterVolume}
                    onToggleMusic={handleToggleLetterMusic}
                    onMusicVolumeChange={handleLetterVolumeChange}
                  />
                </div>

                {/* Pie de página con créditos */}
                <footer className="border-t border-[#E5D8C1] bg-white py-12 px-4 text-center">
                  <div className="max-w-2xl mx-auto space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-serif text-[#722F3D]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C29336]" />
                      <span className="font-bold tracking-wider">ALEROIF24 · NIVEL 26</span>
                    </div>

                    <p className="text-xs text-neutral-500">
                      Diseñado con dedicación para conmemorar el 24 de noviembre de 2026.
                    </p>

                    <div className="pt-2 flex items-center justify-center gap-1 text-[11px] text-neutral-500">
                      <span>Creado por</span>
                      <span className="font-semibold text-[#722F3D]">Zzoids</span>
                      <span>para Fiorela</span>
                      <Heart className="w-3 h-3 text-[#722F3D] fill-[#722F3D]/20 inline ml-1" />
                    </div>
                  </div>
                </footer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

export default App;
