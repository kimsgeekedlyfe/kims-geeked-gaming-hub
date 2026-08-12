import React, { useState } from 'react';
import { Menu, X, Gamepad2, ShieldCheck, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCreatorAuth: () => void;
  isCreatorLoggedIn: boolean;
  onCreatorLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreatorAuth,
  isCreatorLoggedIn,
  onCreatorLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'games', label: 'My Games' },
    { id: 'coming-soon', label: 'Coming Soon' },
    { id: 'updates', label: 'Updates' },
    { id: 'about', label: 'About' },
    { id: 'idea', label: 'Share an Idea' },
    { id: 'connect', label: 'Connect' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/85 backdrop-blur-xl border-b border-cyan-500/20 text-white transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* BRAND LOGO */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-600 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-lg md:text-xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 group-hover:from-white group-hover:to-cyan-400 transition-all">
              KIMS GEEKED
            </div>
            <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-cyan-400/90 font-mono flex items-center space-x-1">
              <span>GAMING HUB</span>
              <span className="text-[8px] px-1 rounded bg-purple-950 text-purple-300 border border-purple-800/50">
                🇰🇪
              </span>
            </div>
          </div>
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono text-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg transition-all duration-200 relative font-medium tracking-wide ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS (Discrete Creator Portal Trigger) */}
        <div className="flex items-center space-x-3">
          {isCreatorLoggedIn ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleNavClick('creator')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-all border ${
                  activeTab === 'creator'
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                    : 'bg-purple-950/80 text-purple-200 border-purple-600/50 hover:bg-purple-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-300 animate-pulse" />
                <span>CREATOR DASHBOARD</span>
              </button>
              <button
                onClick={onCreatorLogout}
                className="text-neutral-400 hover:text-red-400 text-xs font-mono underline px-2 py-1"
                title="Log out of Creator Session"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenCreatorAuth}
              className="p-2 text-neutral-400 hover:text-cyan-400 hover:bg-neutral-900 rounded-lg transition-colors group relative"
              title="Creator Login (Simon Kimutai Ronoh Yegon)"
              aria-label="Creator Portal Login"
            >
              <Lock className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
            </button>
          )}

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 border-b border-cyan-500/30 px-4 py-4 space-y-2 font-mono text-sm backdrop-blur-2xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />}
              </button>
            );
          })}
          {isCreatorLoggedIn && (
            <button
              onClick={() => handleNavClick('creator')}
              className="w-full text-left px-4 py-3 rounded-xl bg-purple-950/80 text-purple-200 border border-purple-500/50 font-bold flex items-center space-x-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              <span>CREATOR DASHBOARD</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
