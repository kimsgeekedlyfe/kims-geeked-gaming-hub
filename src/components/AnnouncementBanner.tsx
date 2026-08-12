import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface Props {
  text: string;
  isActive: boolean;
  onDismiss: () => void;
}

export const AnnouncementBanner: React.FC<Props> = ({ text, isActive, onDismiss }) => {
  if (!isActive || !text) return null;

  return (
    <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-blue-900/90 border-b border-purple-500/30 text-white px-4 py-2 text-xs md:text-sm font-mono flex items-center justify-between shadow-lg backdrop-blur-md relative z-50">
      <div className="flex items-center space-x-2 mx-auto truncate">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
        <span className="font-semibold text-cyan-300 uppercase tracking-wider shrink-0">[ANNOUNCEMENT]</span>
        <span className="truncate text-gray-100">{text}</span>
      </div>
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 shrink-0 ml-2"
        aria-label="Close Announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
