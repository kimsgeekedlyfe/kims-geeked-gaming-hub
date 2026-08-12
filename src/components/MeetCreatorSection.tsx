import React from 'react';
import { User, Flag, Gamepad2, Award, Code, Compass, Sparkles, Instagram } from 'lucide-react';

export const MeetCreatorSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-neutral-900/80 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* CREATOR AVATAR / ARTWORK */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-cyan-400/50 bg-neutral-950 shadow-2xl">
                <img
                  src="/src/assets/images/simon_yegon_avatar_1786527054027.jpg"
                  alt="Simon Kimutai Ronoh Yegon"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 p-2.5 rounded-xl text-center font-mono text-xs text-cyan-300">
                  <span className="font-bold text-white">SIMON KIMUTAI RONOH YEGON</span>
                  <div className="text-[10px] text-neutral-400">KENYA 🇰🇪 INDIE DEVELOPER</div>
                </div>
              </div>
            </div>
          </div>

          {/* CREATOR BIO SPECIFIED IN PROMPT */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-1 flex items-center space-x-2">
                <User className="w-4 h-4 text-cyan-400" />
                <span>INDEPENDENT GAME STUDIO CREATOR</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                MEET THE CREATOR
              </h2>
            </div>

            <div className="space-y-2 font-mono">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400">
                SIMON KIMUTAI RONOH YEGON
              </div>
              <div className="text-sm font-bold text-cyan-300 uppercase tracking-widest flex items-center space-x-2">
                <span>Independent Game Creator</span>
                <span>•</span>
                <span>Kenya 🇰🇪</span>
              </div>
            </div>

            <p className="text-neutral-300 font-sans text-base sm:text-lg leading-relaxed">
              <strong>KIMS GEEKED GAMING HUB</strong> is the personal game-development platform of <strong>Simon Kimutai Ronoh Yegon</strong>, an independent creator from Kenya with a passion for gaming, creativity and building original experiences.
            </p>

            <p className="text-neutral-400 font-sans text-sm sm:text-base leading-relaxed">
              The goal is to create games, experiment with new ideas, share projects and build a community around gaming and creativity.
            </p>

            {/* MANDATORY KEY SPECIFICATIONS FROM PROMPT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 flex items-center space-x-3">
                <Flag className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <div className="text-neutral-500 text-[10px] uppercase">COUNTRY</div>
                  <div className="text-white font-bold text-sm">Kenya 🇰🇪</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 flex items-center space-x-3">
                <User className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-neutral-500 text-[10px] uppercase">CREATOR</div>
                  <div className="text-white font-bold text-sm">Simon Kimutai Ronoh Yegon</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 flex items-center space-x-3">
                <Gamepad2 className="w-5 h-5 text-purple-400 shrink-0" />
                <div>
                  <div className="text-neutral-500 text-[10px] uppercase">BRAND</div>
                  <div className="text-white font-bold text-sm">KIMS GEEKED GAMING HUB</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 flex items-center space-x-3">
                <Compass className="w-5 h-5 text-yellow-400 shrink-0" />
                <div>
                  <div className="text-neutral-500 text-[10px] uppercase">FOCUS</div>
                  <div className="text-white font-bold text-sm">Game Development & Gaming</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
<section id="about" className="py-20 px-10 about-section">
  <img src="./simon.png" alt="Simon Kimutai Ronoh Yegon" className="creator-photo" />
  <div>
    <h2>Meet the Creator</h2>
    <p>Simon Kimutai Ronoh Yegon, Indie Developer from Kenya...</p>
  </div>
</section>
