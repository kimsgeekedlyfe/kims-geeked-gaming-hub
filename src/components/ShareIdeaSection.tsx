import React, { useState } from 'react';
import { Lightbulb, Send, Instagram, Sparkles, Flame, CheckCircle, MessageSquare, Wand2 } from 'lucide-react';
import { IdeaCategory } from '../types';

interface Props {
  onSubmitIdea: (idea: {
    title: string;
    category: IdeaCategory;
    description: string;
    authorName: string;
    authorContact: string;
  }) => Promise<boolean>;
  onPolishIdeaWithAI?: (rawIdea: string, category: IdeaCategory) => Promise<string>;
}

export const ShareIdeaSection: React.FC<Props> = ({ onSubmitIdea, onPolishIdeaWithAI }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IdeaCategory>('game');
  const [description, setDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorContact, setAuthorContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const categories: { id: IdeaCategory; label: string }[] = [
    { id: 'game', label: '🎮 Game Idea' },
    { id: 'character', label: '👤 Character Concept' },
    { id: 'story', label: '📖 Story Idea' },
    { id: 'mechanic', label: '⚡ Gameplay Mechanic' },
    { id: 'mission', label: '🎯 Mission Idea' },
    { id: 'map', label: '🗺️ Map / Environment' },
    { id: 'feature', label: '🛠️ Feature' },
    { id: 'other', label: '💡 Feedback & General' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    const success = await onSubmitIdea({
      title,
      category,
      description,
      authorName: authorName.trim() || 'Anonymous Geeked Fan',
      authorContact: authorContact.trim(),
    });
    setIsSubmitting(false);

    if (success) {
      setSubmittedSuccess(true);
      setTitle('');
      setDescription('');
      setTimeout(() => setSubmittedSuccess(false), 6000);
    }
  };

  const handlePolish = async () => {
    if (!description.trim() || !onPolishIdeaWithAI) return;
    setIsPolishing(true);
    const polished = await onPolishIdeaWithAI(description, category);
    if (polished) {
      setDescription(polished);
    }
    setIsPolishing(false);
  };

  return (
    <section id="idea" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-neutral-900 border border-purple-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_0_60px_rgba(168,85,247,0.15)] relative overflow-hidden">
        {/* DECORATIVE LIGHTING */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          {/* HEADER SPECIFIED IN PROMPT */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono uppercase font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Lightbulb className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>COMMUNITY CO-CREATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
              SHARE YOUR IDEA <span className="text-yellow-400">💡</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 font-sans max-w-2xl mx-auto leading-relaxed">
              "Got an idea for my next game? Have a character concept, story idea, gameplay mechanic or something completely <strong className="text-cyan-300">GEEKED</strong>? Send it my way."
            </p>
          </div>

          {/* FORM & SUBMISSION PORTAL */}
          <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {submittedSuccess ? (
              <div className="p-8 text-center space-y-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-mono font-bold text-emerald-300">
                  IDEA TRANSMITTED TO SIMON YEGON! 🎮
                </h3>
                <p className="text-sm text-neutral-300 font-sans max-w-md mx-auto">
                  Thank you! Your concept has been saved in the Creator Dashboard and will be reviewed for upcoming games.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* CATEGORY SELECTOR */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-neutral-300 uppercase font-bold block">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as IdeaCategory)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* TITLE */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-neutral-300 uppercase font-bold block">
                      Idea / Concept Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Electric Cyber-Maasai Tech Spear"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* DESCRIPTION WITH AI POLISH OPTION */}
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <label className="text-neutral-300 uppercase font-bold block">
                      Description & Features *
                    </label>
                    {onPolishIdeaWithAI && (
                      <button
                        type="button"
                        onClick={handlePolish}
                        disabled={isPolishing || !description.trim()}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 hover:underline cursor-pointer disabled:opacity-50"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>{isPolishing ? 'Enhancing with AI...' : 'Polish Idea with Gemini AI'}</span>
                      </button>
                    )}
                  </div>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe how the mechanic works, the story background, or the character's abilities..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-sans text-sm leading-relaxed"
                  />
                </div>

                {/* AUTHOR DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-neutral-300 uppercase font-bold block">
                      Your Gamer Name / Handle
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CyberGamer_KE"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-neutral-300 uppercase font-bold block">
                      Instagram / Email (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. @your_instagram"
                      value={authorContact}
                      onChange={(e) => setAuthorContact(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND IDEA TO SIMON'}</span>
                </button>
              </form>
            )}
          </div>

          {/* INSTAGRAM CONNECT BUTTONS AS EXPLICITLY REQUIRED IN PROMPT */}
          <div className="space-y-6 pt-4 border-t border-neutral-800 text-center">
            <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider flex items-center justify-center space-x-2">
              <Instagram className="w-5 h-5 text-pink-400" />
              <span>DIRECT INSTAGRAM CONNECT</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* INSTAGRAM 1 */}
              <a
                href="https://instagram.com/simply_.kim_"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-pink-500/30 hover:border-pink-400 flex items-center justify-between transition-all duration-300 group shadow-lg cursor-pointer"
              >
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-400">PERSONAL</div>
                    <div className="text-sm font-mono font-bold text-white group-hover:text-pink-300">
                      @simply_.kim_
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-pink-400 bg-pink-950/80 px-3 py-1.5 rounded-lg border border-pink-800/60 group-hover:bg-pink-600 group-hover:text-white transition-all">
                  FOLLOW / CONTACT
                </span>
              </a>

              {/* INSTAGRAM 2 */}
              <a
                href="https://instagram.com/_.kimsgeekedlyfe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-purple-500/30 hover:border-purple-400 flex items-center justify-between transition-all duration-300 group shadow-lg cursor-pointer"
              >
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 p-[2px]">
                    <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-400">BRAND / LYFE</div>
                    <div className="text-sm font-mono font-bold text-white group-hover:text-purple-300">
                      @_.kimsgeekedlyfe
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/80 px-3 py-1.5 rounded-lg border border-purple-800/60 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  FOLLOW / CONTACT
                </span>
              </a>
            </div>

            {/* MANDATORY MESSAGE FROM PROMPT */}
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-300 to-cyan-400 pt-4">
              "LET'S BUILD SOMETHING GEEKED. 🎮🔥"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
