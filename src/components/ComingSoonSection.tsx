import React from 'react';
import { Game } from '../types';
import { Rocket, Clock, Calendar, User, Code, Layers, Sparkles } from 'lucide-react';

interface Props {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export const ComingSoonSection: React.FC<Props> = ({ games, onSelectGame }) => {
  const comingSoonGames = games.filter(
    (g) => g.devStatus === 'COMING SOON' || g.devStatus === 'IN DEVELOPMENT'
  );

  return (
    <section id="coming-soon" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-neutral-800 pb-6">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-purple-400 mb-1 flex items-center space-x-2">
          <Rocket className="w-4 h-4 text-purple-400 animate-bounce" />
          <span>INDEPENDENT DEVELOPMENT PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight flex items-center space-x-3">
          <span>COMING SOON</span>
          <span className="text-purple-400">🚀</span>
        </h2>
        <p className="text-neutral-400 font-sans mt-2 max-w-2xl text-sm sm:text-base">
          Explore upcoming independent game projects currently crafted in the development studio by Simon Kimutai Ronoh Yegon.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {comingSoonGames.map((project) => {
          const progress = project.progressPercent || 50;
          return (
            <div
              key={project.id}
              className="bg-neutral-900/90 border border-purple-500/30 hover:border-purple-400 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* PROJECT ARTWORK */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                  <div className="absolute top-4 left-4 bg-purple-950/90 border border-purple-500/50 text-purple-300 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
                    {project.devStatus}
                  </div>
                </div>

                {/* CONTENT SPEC */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1 font-mono text-xs">
                    <div className="text-purple-400 font-extrabold uppercase tracking-wider">
                      PROJECT: {project.title.toUpperCase()}
                    </div>
                    <div className="text-neutral-300 flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>STATUS: <strong className="text-cyan-300">{project.devStatus}</strong></span>
                    </div>
                    <div className="text-neutral-300 flex items-center space-x-2">
                      <User className="w-3.5 h-3.5 text-pink-400" />
                      <span>DEVELOPER: <strong className="text-white">SIMON KIMUTAI RONOH YEGON 🇰🇪</strong></span>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* DEVELOPMENT PROGRESS INDICATOR BAR */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-400 flex items-center space-x-1">
                        <Code className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Development Progress:</span>
                      </span>
                      <span className="text-cyan-300 font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-neutral-950 border border-neutral-800 overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_#06b6d4]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER ACTION */}
              <div className="p-6 pt-0 border-t border-neutral-800/60 mt-4">
                <button
                  onClick={() => onSelectGame(project)}
                  className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono font-bold text-xs tracking-wider uppercase border border-neutral-700 hover:border-purple-500/50 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>VIEW PROJECT SPECS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
