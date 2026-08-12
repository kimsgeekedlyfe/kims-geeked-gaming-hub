import React, { useState } from 'react';
import { Game } from '../types';
import { PlayableGameContainer } from './PlayableGameContainer';
import { X, Calendar, Tag, User, Monitor, Play, Download, Sparkles, CheckCircle2, Video, Images, Cpu, ShieldAlert } from 'lucide-react';

interface Props {
  game: Game | null;
  onClose: () => void;
}

export const GameDetailModal: React.FC<Props> = ({ game, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'play' | 'specs' | 'gallery'>('overview');
  const [activeImage, setActiveImage] = useState<string>('');

  if (!game) return null;

  const currentCover = activeImage || game.coverImage;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-cyan-500/30 rounded-2xl md:rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden text-white my-auto max-h-[92vh] flex flex-col">
        {/* TOP BAR / CLOSE BUTTON */}
        <div className="bg-neutral-900/90 px-6 py-4 border-b border-neutral-800 flex items-center justify-between shrink-0 font-mono">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs tracking-wider uppercase font-bold">
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">{game.genre}</span>
            <span className="text-neutral-500">•</span>
            <span>STATUS: {game.devStatus}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-cyan-400" />
          </button>
        </div>

        {/* MODAL CONTENT SCROLLABLE */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
          {/* COVER & HEADER HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 h-64 sm:h-80 group shadow-2xl">
                <img
                  src={currentCover}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              </div>

              {/* SCREENSHOT THUMBNAILS */}
              {game.screenshots && game.screenshots.length > 0 && (
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  <button
                    onClick={() => setActiveImage(game.coverImage)}
                    className={`h-16 w-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      currentCover === game.coverImage ? 'border-cyan-400 scale-105' : 'border-neutral-800 opacity-60'
                    }`}
                  >
                    <img src={game.coverImage} alt="Cover" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                  {game.screenshots.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`h-16 w-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        currentCover === img ? 'border-cyan-400 scale-105' : 'border-neutral-800 opacity-60'
                      }`}
                    >
                      <img src={img} alt={`Screenshot ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* TITLE & QUICK INFO SIDEBAR */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                  {game.title}
                </h1>
                <div className="flex items-center space-x-2 text-sm font-mono text-cyan-300 mt-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>Developer: <strong className="text-white">Simon Kimutai Ronoh Yegon 🇰🇪</strong></span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 font-mono text-xs space-y-2.5">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Release Status:</span>
                  <span className="text-cyan-400 font-bold">{game.devStatus}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Target Launch:</span>
                  <span className="text-white font-bold">{game.releaseDate}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Studio Origin:</span>
                  <span className="text-emerald-400 font-bold">Kenya 🇰🇪</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Play Mode:</span>
                  <span className="text-purple-300 font-bold uppercase">{game.playMode.replace('_', ' ')}</span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-2">
                {game.playMode === 'playable_embed' ? (
                  <button
                    onClick={() => setActiveTab('play')}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 text-white font-mono font-bold text-base tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>PLAY NOW IN BROWSER</span>
                  </button>
                ) : game.playMode === 'download_link' ? (
                  <a
                    href={game.downloadUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-mono font-bold text-base tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>DOWNLOAD GAME</span>
                  </a>
                ) : (
                  <div className="w-full py-4 rounded-xl bg-neutral-900 border border-purple-500/40 text-purple-300 font-mono font-bold text-base tracking-wider uppercase flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                    <span>COMING SOON</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DETAIL TABS */}
          <div className="border-b border-neutral-800 flex space-x-4 font-mono text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Overview & Features
            </button>
            {game.playMode === 'playable_embed' && (
              <button
                onClick={() => setActiveTab('play')}
                className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === 'play'
                    ? 'border-emerald-400 text-emerald-300 font-bold'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Play className="w-4 h-4 text-emerald-400 fill-current" />
                <span>Play Demo</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              System Requirements
            </button>
          </div>

          {/* TAB CONTENTS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">About {game.title}</h3>
                <p className="text-neutral-300 font-sans leading-relaxed text-base">
                  {game.fullDescription || game.shortDescription}
                </p>
              </div>

              {/* GAME FEATURES */}
              {game.features && game.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold font-mono text-cyan-300 mb-3 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Key Features</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {game.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-start space-x-3 text-sm text-neutral-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'play' && game.playableType && (
            <PlayableGameContainer
              playableType={game.playableType}
              gameTitle={game.title}
            />
          )}

          {activeTab === 'specs' && game.systemRequirements && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-mono text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>System Requirements</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-neutral-500 uppercase mb-1">OS</div>
                  <div className="text-white font-bold">{game.systemRequirements.os}</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-neutral-500 uppercase mb-1">Processor</div>
                  <div className="text-white font-bold">{game.systemRequirements.processor}</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-neutral-500 uppercase mb-1">Memory</div>
                  <div className="text-white font-bold">{game.systemRequirements.memory}</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-neutral-500 uppercase mb-1">Graphics</div>
                  <div className="text-white font-bold">{game.systemRequirements.graphics}</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div className="text-neutral-500 uppercase mb-1">Storage</div>
                  <div className="text-white font-bold">{game.systemRequirements.storage}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
