import React from 'react';
import { Gamepad2, Lightbulb, Flame, Rocket, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreGames: () => void;
  onShareIdea: () => void;
  gameCount: number;
}

export const HeroSection: React.FC<HeroProps> = ({ onExploreGames, onShareIdea, gameCount }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-neutral-950 py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
      {/* ANIMATED BACKGROUND GRADIENT & GRID */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* NEON GLOW ORBS */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
        {/* CREATOR BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-cyan-500/30 text-cyan-300 text-xs md:text-sm font-mono shadow-[0_0_20px_rgba(6,182,212,0.15)]"
        >
          <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
          <span>Created, developed and powered by</span>
          <span className="font-bold text-white underline decoration-cyan-400 decoration-2">
            Simon Kimutai Ronoh Yegon 🇰🇪
          </span>
        </motion.div>

        {/* MAIN HEADLINE & LOGO BRAND */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-mono text-white leading-tight">
            <span className="block text-2xl sm:text-3xl text-cyan-400 uppercase tracking-[0.3em] font-semibold mb-2">
              KIMS GEEKED GAMING HUB
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
              WHERE IDEAS BECOME GAMES.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 font-sans leading-relaxed pt-2">
            Welcome to <strong className="text-cyan-300">KIMS GEEKED GAMING HUB</strong> — an independent game-development platform created by <strong className="text-purple-300">Simon Kimutai Ronoh Yegon</strong> from Kenya. Discover my games, follow my development journey, and share ideas that could inspire the next project.
          </p>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={onExploreGames}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-3 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-400/40 cursor-pointer"
          >
            <Gamepad2 className="w-5 h-5 text-cyan-200" />
            <span>EXPLORE MY GAMES</span>
            <ChevronRight className="w-4 h-4 text-cyan-300" />
          </button>

          <button
            onClick={onShareIdea}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900/90 text-neutral-200 hover:text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-3 border border-purple-500/40 hover:border-purple-400 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span>SHARE AN IDEA</span>
          </button>
        </motion.div>

        {/* STATS HIGHLIGHT TICKER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md">
            <div className="text-2xl font-mono font-bold text-cyan-400">{gameCount}+</div>
            <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Projects</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md">
            <div className="text-2xl font-mono font-bold text-purple-400">KENYA 🇰🇪</div>
            <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Origin</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md">
            <div className="text-2xl font-mono font-bold text-pink-400">100% INDIE</div>
            <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Development</div>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md">
            <div className="text-2xl font-mono font-bold text-yellow-400">GEEKED</div>
            <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Vision</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
