import React, { useState } from 'react';
import { DevUpdate } from '../types';
import { Wrench, Calendar, Tag, ChevronRight, User, X } from 'lucide-react';

interface Props {
  updates: DevUpdate[];
}

export const UpdatesSection: React.FC<Props> = ({ updates }) => {
  const [selectedUpdate, setSelectedUpdate] = useState<DevUpdate | null>(null);

  return (
    <section id="updates" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-neutral-800 pb-6">
        <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-1 flex items-center space-x-2">
          <Wrench className="w-4 h-4 text-cyan-400" />
          <span>LATEST NEWS & ANNOUNCEMENTS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight flex items-center space-x-3">
          <span>KIMS Gaming Hub – Latest Updates</span>
          <span className="text-cyan-400">🛠️</span>
        </h2>
        <p className="text-neutral-400 font-sans mt-2 max-w-2xl text-sm sm:text-base">
          Development news, technical updates, graphics engine improvements, and game release announcements from Simon Kimutai Ronoh Yegon. Follow our indie game development journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {updates.map((update) => (
          <div
            key={update.id}
            className="bg-neutral-900/80 border border-neutral-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                <img
                  src={update.image}
                  alt={update.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-neutral-950/90 border border-neutral-700 text-neutral-300 px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{update.date}</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {update.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold font-mono text-white leading-snug hover:text-cyan-300 transition-colors">
                  {update.title}
                </h3>

                <p className="text-neutral-300 text-sm font-sans line-clamp-3 leading-relaxed">
                  {update.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedUpdate(update)}
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors border border-neutral-700 cursor-pointer"
              >
                <span>READ FULL UPDATE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULL UPDATE READ MODAL */}
      {selectedUpdate && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-neutral-950 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 space-y-6 text-white shadow-[0_0_60px_rgba(6,182,212,0.3)] my-auto">
            <button
              onClick={() => setSelectedUpdate(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-cyan-400" />
            </button>

            <div className="space-y-2">
              <div className="text-xs font-mono text-cyan-400 flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedUpdate.date}</span>
                <span>•</span>
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>Posted by {selectedUpdate.author}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {selectedUpdate.title}
              </h2>
            </div>

            <div className="rounded-xl overflow-hidden h-64 bg-neutral-900 border border-neutral-800">
              <img
                src={selectedUpdate.image}
                alt={selectedUpdate.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-neutral-200 font-sans leading-relaxed text-base whitespace-pre-line">
              {selectedUpdate.content || selectedUpdate.description}
            </div>

            <div className="pt-4 border-t border-neutral-800 flex justify-end font-mono">
              <button
                onClick={() => setSelectedUpdate(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer"
              >
                CLOSE LOG
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
