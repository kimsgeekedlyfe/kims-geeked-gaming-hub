import React, { useState } from 'react';
import { Game, DevStatus } from '../types';
import { Gamepad2, Star, Calendar, Tag, ChevronRight, Play, Search, Filter } from 'lucide-react';

interface Props {
  games: Game[];
  onSelectGame: (game: Game) => void;
  onPlayDirect?: (game: Game) => void;
}

export const GamesSection: React.FC<Props> = ({ games, onSelectGame, onPlayDirect }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'ALL', label: 'ALL GAMES' },
    { id: 'RELEASED', label: 'RELEASED' },
    { id: 'IN DEVELOPMENT', label: 'IN DEVELOPMENT' },
    { id: 'COMING SOON', label: 'COMING SOON' },
    { id: 'UPDATED', label: 'UPDATED' },
  ];

  const filteredGames = games.filter((game) => {
    const matchesStatus = selectedStatus === 'ALL' || game.devStatus === selectedStatus;
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeStyle = (status: DevStatus) => {
    switch (status) {
      case 'RELEASED':
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]';
      case 'IN DEVELOPMENT':
        return 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]';
      case 'COMING SOON':
        return 'bg-purple-950 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]';
      case 'UPDATED':
        return 'bg-pink-950 text-pink-300 border-pink-500/50 shadow-[0_0_12px_rgba(236,72,153,0.3)]';
      default:
        return 'bg-neutral-900 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <section id="games" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-neutral-800 pb-6">
        <div>
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-1 flex items-center space-x-2">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span>STUDIO CATALOGUE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight flex items-center space-x-3">
            <span>MY GAMES</span>
            <span className="text-cyan-400">🎮</span>
          </h2>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-72 font-mono">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search titles or genres..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 font-mono text-xs no-scrollbar">
        {filterTabs.map((tab) => {
          const isActive = selectedStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-4 py-2 rounded-xl border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold'
                  : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* GAMES GRID OR FALLBACK */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="group relative bg-neutral-900/80 border border-neutral-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col"
            >
              {/* GAME COVER IMAGE */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />

                {/* DEV STATUS BADGE */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider border ${getStatusBadgeStyle(
                      game.devStatus
                    )}`}
                  >
                    {game.devStatus}
                  </span>
                </div>

                {/* RATING BADGE */}
                {game.rating && (
                  <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-md border border-yellow-500/30 px-2.5 py-1 rounded-full flex items-center space-x-1 text-xs font-mono text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
                    <span>{game.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* CARD DETAILS */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{game.genre}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-neutral-300 text-sm font-sans mt-2 line-clamp-2 leading-relaxed">
                    {game.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-400">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Release: <strong className="text-neutral-200">{game.releaseDate}</strong></span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {game.playMode === 'playable_embed' && onPlayDirect && (
                      <button
                        onClick={() => onPlayDirect(game)}
                        className="px-3 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-500/40 text-xs font-mono font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                        title="Play mini game in browser"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-purple-300" />
                        <span>PLAY</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectGame(game)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono font-bold text-xs flex items-center space-x-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>VIEW GAME</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* FALLBACK EMPTY STATE AS SPECIFIED IN PROMPT */
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center max-w-2xl mx-auto space-y-4 my-8">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Gamepad2 className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-xl sm:text-2xl font-mono font-bold text-cyan-300 uppercase tracking-wide">
            "THE NEXT ADVENTURE IS CURRENTLY IN DEVELOPMENT."
          </h3>
          <p className="text-neutral-400 font-sans text-sm sm:text-base">
            Check back soon for new games from KIMS GEEKED GAMING HUB.
          </p>
        </div>
      )}
    </section>
  );
};
