import React, { useState } from 'react';
import { Gamepad2, Instagram, Shield, Heart, Lock, X } from 'lucide-react';

interface Props {
  onNavClick: (tab: string) => void;
  onOpenCreatorAuth: () => void;
  isCreatorLoggedIn: boolean;
}

export const Footer: React.FC<Props> = ({ onNavClick, onOpenCreatorAuth, isCreatorLoggedIn }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer id="connect" className="bg-neutral-950 border-t border-cyan-500/20 text-white font-mono text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px]">
                <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                KIMS GEEKED GAMING HUB
              </span>
            </div>

            <p className="text-cyan-300 font-bold text-sm tracking-widest uppercase">
              "WHERE IDEAS BECOME GAMES."
            </p>

            <p className="text-neutral-400 font-sans text-xs leading-relaxed max-w-sm">
              Created, developed and powered by <strong className="text-white">Simon Kimutai Ronoh Yegon 🇰🇪</strong>. An independent game studio platform dedicated to original gaming experiences.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('games')} className="hover:text-white transition-colors cursor-pointer">
                  My Games
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('coming-soon')} className="hover:text-white transition-colors cursor-pointer">
                  Coming Soon
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Creator
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('idea')} className="hover:text-white transition-colors cursor-pointer">
                  Share an Idea
                </button>
              </li>
            </ul>
          </div>

          {/* SOCIAL INSTAGRAM & LEGAL LINKS */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-pink-400 font-bold uppercase tracking-wider text-sm">Connect / Social</h4>
            <div className="space-y-2">
              <a
                href="https://instagram.com/simply_.kim_"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 text-neutral-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram: @simply_.kim_</span>
              </a>
              <a
                href="https://instagram.com/_.kimsgeekedlyfe"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 text-neutral-300 hover:text-purple-400 transition-colors"
              >
                <Instagram className="w-4 h-4 text-purple-400" />
                <span>Instagram: @_.kimsgeekedlyfe</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-3 text-neutral-500">
              <button onClick={() => setLegalModal('privacy')} className="hover:text-neutral-300 underline cursor-pointer">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => setLegalModal('terms')} className="hover:text-neutral-300 underline cursor-pointer">
                Terms of Use
              </button>
              <span>•</span>
              {isCreatorLoggedIn ? (
                <button onClick={() => onNavClick('creator')} className="text-purple-400 hover:text-purple-300 cursor-pointer font-bold">
                  [Creator Portal]
                </button>
              ) : (
                <button onClick={onOpenCreatorAuth} className="hover:text-cyan-400 cursor-pointer flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-neutral-600" />
                  <span>Creator Portal</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* COPYRIGHT MANDATORY */}
        <div className="pt-8 border-t border-neutral-900 text-center text-neutral-500 text-[11px] leading-relaxed">
          <p>© 2026 KIMS GEEKED GAMING HUB. Created by Simon Kimutai Ronoh Yegon. All rights reserved.</p>
          <p className="mt-1 text-neutral-600">Built with passion in Kenya 🇰🇪 • Dedicated to independent game development</p>
        </div>
      </div>

      {/* LEGAL MODAL */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-lg p-6 space-y-4 text-white relative font-sans text-xs">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-mono font-bold text-cyan-300">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Use'} — KIMS GEEKED GAMING HUB
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              {legalModal === 'privacy'
                ? 'Your privacy is respected. Any community ideas or contact details submitted via KIMS GEEKED GAMING HUB are exclusively received by Simon Kimutai Ronoh Yegon for game-development feedback purposes and are never sold or shared with third parties.'
                : 'All games, assets, and branding on KIMS GEEKED GAMING HUB are created, owned, and published by Simon Kimutai Ronoh Yegon 🇰🇪. Visitors are invited to explore, test browser demos, and share ideas under fair use.'}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};
