import React from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface SectionAudioBarProps {
  title: string;
  artist?: string;
  isPlaying: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (newVol: number) => void;
  theme?: 'dota' | 'minki';
}

export const SectionAudioBar: React.FC<SectionAudioBarProps> = ({
  title,
  artist,
  isPlaying,
  volume,
  onTogglePlay,
  onVolumeChange,
  theme = 'minki',
}) => {
  const isDota = theme === 'dota';

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-md shadow-md border transition-all ${
        isDota
          ? 'bg-[#18191E]/90 border-[#3E3835] text-[#F2EBDD]'
          : 'bg-white/90 border-[#E5D8C1] text-[#302622]'
      }`}
    >
      {/* Icono animado de música */}
      <div
        className={`p-2 rounded-xl flex items-center justify-center ${
          isDota ? 'bg-red-950/60 text-[#E4B343]' : 'bg-[#722F3D]/10 text-[#722F3D]'
        }`}
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
      </div>

      {/* Título de la pista */}
      <div className="text-left pr-2">
        <p className="text-xs font-bold font-serif leading-tight">{title}</p>
        {artist && (
          <p className="text-[10px] text-neutral-400 font-sans leading-none mt-0.5">
            {artist}
          </p>
        )}
      </div>

      {/* Botón Play / Pause */}
      <button
        onClick={onTogglePlay}
        className={`p-2 rounded-xl transition-all cursor-pointer ${
          isDota
            ? 'bg-[#2A1819] hover:bg-[#3D2224] text-[#E4B343] border border-[#C29336]/40'
            : 'bg-[#722F3D] hover:bg-[#541F2B] text-white'
        }`}
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>

      {/* Control de volumen */}
      <div className="flex items-center gap-2 pl-1 border-l border-neutral-200/40">
        <button
          onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
          className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
        >
          {volume === 0 ? (
            <VolumeX className="w-4 h-4 text-rose-500" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-16 sm:w-20 h-1.5 rounded-lg appearance-none bg-neutral-300 dark:bg-neutral-700 accent-[#722F3D] cursor-pointer"
        />
        <span className="text-[10px] font-mono opacity-60 w-7 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};
