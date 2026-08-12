import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, X, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (passcode: string) => Promise<boolean>;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, onLogin }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await onLogin(passcode);
    setLoading(false);

    if (success) {
      setPasscode('');
      onClose();
    } else {
      setError('Invalid Creator Passcode. Access restricted to Simon Kimutai Ronoh Yegon.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-neutral-950 border border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-[0_0_80px_rgba(168,85,247,0.3)] my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-purple-400" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-500/50 text-purple-300 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Lock className="w-7 h-7 text-purple-300" />
          </div>
          <h2 className="text-xl font-bold font-mono text-white tracking-wide uppercase">
            CREATOR ACCESS PORTAL
          </h2>
          <p className="text-xs text-purple-300 font-mono">
            Authorized for Simon Kimutai Ronoh Yegon 🇰🇪
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="space-y-1.5">
            <label className="text-neutral-300 uppercase font-bold block">
              Enter Creator Passcode
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Passcode (Default: geeked2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'AUTHENTICATING...' : 'UNLOCK CREATOR DASHBOARD'}</span>
          </button>
        </form>

        <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 font-mono text-center">
          <span className="text-neutral-500">Default Passcode for testing: </span>
          <strong className="text-purple-300">geeked2026</strong>
        </div>
      </div>
    </div>
  );
};
