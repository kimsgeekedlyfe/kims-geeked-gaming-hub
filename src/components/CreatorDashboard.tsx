import React, { useState } from 'react';
import { Game, DevUpdate, CommunityIdea, SiteSettings, DevStatus, PlayableType } from '../types';
import {
  Gamepad2,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Settings,
  MessageSquare,
  Wrench,
  BarChart3,
  CheckCircle,
  Save,
  Clock,
  Layers,
  Upload,
  Image,
  Tag,
  Search,
  Check,
  Star
} from 'lucide-react';

interface Props {
  games: Game[];
  updates: DevUpdate[];
  ideas: CommunityIdea[];
  settings: SiteSettings;
  onSaveGame: (game: Partial<Game>) => Promise<void>;
  onDeleteGame: (id: string) => Promise<void>;
  onSaveUpdate: (update: Partial<DevUpdate>) => Promise<void>;
  onDeleteUpdate: (id: string) => Promise<void>;
  onUpdateIdeaStatus: (id: string, status: 'new' | 'reviewed' | 'saved' | 'archived', creatorNotes?: string) => Promise<void>;
  onDeleteIdea: (id: string) => Promise<void>;
  onSaveSettings: (settings: Partial<SiteSettings>) => Promise<void>;
}

export const CreatorDashboard: React.FC<Props> = ({
  games,
  updates,
  ideas,
  settings,
  onSaveGame,
  onDeleteGame,
  onSaveUpdate,
  onDeleteUpdate,
  onUpdateIdeaStatus,
  onDeleteIdea,
  onSaveSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'updates' | 'ideas' | 'settings'>('overview');

  // GAME FORM STATE
  const [editingGame, setEditingGame] = useState<Partial<Game> | null>(null);
  const [isGameFormOpen, setIsGameFormOpen] = useState(false);

  // UPDATE FORM STATE
  const [editingUpdate, setEditingUpdate] = useState<Partial<DevUpdate> | null>(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  // SETTINGS FORM STATE
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(settings);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState(false);

  // PRESET IMAGE SUGGESTIONS
  const presetCovers = [
    '/src/assets/images/nairobi_cyberpunk_cover_1786527041437.jpg',
    '/src/assets/images/kims_hero_banner_1786527029690.jpg',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
  ];

  // OVERVIEW METRICS
  const publishedCount = games.filter((g) => g.isPublished).length;
  const devCount = games.filter((g) => g.devStatus === 'IN DEVELOPMENT').length;
  const comingSoonCount = games.filter((g) => g.devStatus === 'COMING SOON').length;
  const newIdeasCount = ideas.filter((i) => i.status === 'new').length;

  // HANDLERS FOR GAME
  const handleOpenNewGame = () => {
    setEditingGame({
      title: '',
      genre: 'Action RPG / Sci-Fi',
      shortDescription: '',
      fullDescription: '',
      devStatus: 'IN DEVELOPMENT',
      releaseDate: 'Coming Soon',
      coverImage: presetCovers[0],
      isPublished: true,
      playMode: 'playable_embed',
      playableType: 'cyber_runner',
      features: ['High-tech cyberpunk gameplay', 'Kenyan afro-futuristic theme'],
      systemRequirements: {
        os: 'Windows 10/11 64-bit',
        processor: 'Multi-core Processor',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GTX / AMD Radeon',
        storage: '15 GB'
      }
    });
    setIsGameFormOpen(true);
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setIsGameFormOpen(true);
  };

  const handleSaveGameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGame || !editingGame.title) return;
    await onSaveGame(editingGame);
    setIsGameFormOpen(false);
    setEditingGame(null);
  };

  // HANDLERS FOR DEV UPDATE
  const handleOpenNewUpdate = () => {
    setEditingUpdate({
      title: '',
      image: presetCovers[1],
      date: new Date().toISOString().split('T')[0],
      description: '',
      content: '',
      tags: ['DevLog', 'KIMS GEEKED'],
      isPublished: true,
      author: 'Simon Kimutai Ronoh Yegon'
    });
    setIsUpdateFormOpen(true);
  };

  const handleSaveUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUpdate || !editingUpdate.title) return;
    await onSaveUpdate(editingUpdate);
    setIsUpdateFormOpen(false);
    setEditingUpdate(null);
  };

  // HANDLER FOR SETTINGS
  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveSettings(siteSettings);
    setSettingsSavedMessage(true);
    setTimeout(() => setSettingsSavedMessage(false), 4000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* HEADER SPECIFIED FOR CREATOR DASHBOARD */}
      <div className="bg-gradient-to-r from-purple-900/80 via-neutral-900 to-cyan-950/80 border border-purple-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950 border border-purple-500/50 text-purple-300 font-mono text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>PRIVATE CREATOR PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
            CREATOR DASHBOARD
          </h1>
          <p className="text-sm font-mono text-cyan-300 mt-1">
            Authorized: <strong>Simon Kimutai Ronoh Yegon 🇰🇪</strong>
          </p>
        </div>

        {/* DASHBOARD TAB CONTROLS */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-lg'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('games')}
            className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'games'
                ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-lg'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Game Manager ({games.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'updates'
                ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-lg'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Dev Updates ({updates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ideas')}
            className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 relative ${
              activeTab === 'ideas'
                ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-lg'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Community Ideas ({ideas.length})</span>
            {newIdeasCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute top-1 right-1" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'settings'
                ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-lg'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg">
              <div className="text-3xl font-extrabold text-cyan-400">{games.length}</div>
              <div className="text-xs text-neutral-400 uppercase mt-1">Total Games</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg">
              <div className="text-3xl font-extrabold text-emerald-400">{publishedCount}</div>
              <div className="text-xs text-neutral-400 uppercase mt-1">Published</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg">
              <div className="text-3xl font-extrabold text-purple-400">{devCount}</div>
              <div className="text-xs text-neutral-400 uppercase mt-1">In Development</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg">
              <div className="text-3xl font-extrabold text-pink-400">{comingSoonCount}</div>
              <div className="text-xs text-neutral-400 uppercase mt-1">Coming Soon</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg">
              <div className="text-3xl font-extrabold text-yellow-400">{updates.length}</div>
              <div className="text-xs text-neutral-400 uppercase mt-1">Dev Updates</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg">
              <div className="text-3xl font-extrabold text-cyan-300">{ideas.length}</div>
              <div className="text-xs text-neutral-400 uppercase mt-1">Ideas Received</div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
            <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Studio Management Shortcuts</span>
            </h3>
            <div className="flex flex-wrap gap-4 font-mono text-xs">
              <button
                onClick={handleOpenNewGame}
                className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center space-x-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD NEW GAME</span>
              </button>
              <button
                onClick={handleOpenNewUpdate}
                className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center space-x-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>+ POST DEV UPDATE</span>
              </button>
              <button
                onClick={() => setActiveTab('ideas')}
                className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold flex items-center space-x-2 cursor-pointer border border-neutral-700"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>REVIEW COMMUNITY IDEAS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: GAME MANAGER */}
      {activeTab === 'games' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center font-mono">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
              GAME MANAGER CATALOGUE
            </h3>
            <button
              onClick={handleOpenNewGame}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs tracking-wider uppercase flex items-center space-x-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ ADD NEW GAME</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-neutral-800"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      {game.devStatus}
                    </span>
                    <h4 className="text-lg font-bold font-mono text-white mt-1">{game.title}</h4>
                    <p className="text-xs text-cyan-400 font-mono">{game.genre}</p>
                    <p className="text-xs text-neutral-400 line-clamp-1 font-sans mt-1">
                      {game.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSaveGame({ ...game, isPublished: !game.isPublished })}
                      className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 font-bold ${
                        game.isPublished
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {game.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{game.isPublished ? 'PUBLISHED' : 'UNPUBLISHED'}</span>
                    </button>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditGame(game)}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-cyan-300 border border-neutral-700 cursor-pointer"
                      title="Edit Game"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteGame(game.id)}
                      className="p-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 cursor-pointer"
                      title="Delete Game"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GAME EDIT MODAL FORM */}
      {isGameFormOpen && editingGame && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white space-y-6 my-auto max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center font-mono border-b border-neutral-800 pb-3">
              <h3 className="text-xl font-bold text-cyan-300">
                {editingGame.id ? 'EDIT GAME SPECIFICATIONS' : 'ADD NEW GAME TO HUB'}
              </h3>
              <button
                onClick={() => setIsGameFormOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGameSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-neutral-300 font-bold uppercase">Game Title *</label>
                <input
                  type="text"
                  required
                  value={editingGame.title || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-bold uppercase">Genre *</label>
                  <input
                    type="text"
                    required
                    value={editingGame.genre || ''}
                    onChange={(e) => setEditingGame({ ...editingGame, genre: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-bold uppercase">Dev Status *</label>
                  <select
                    value={editingGame.devStatus || 'IN DEVELOPMENT'}
                    onChange={(e) =>
                      setEditingGame({ ...editingGame, devStatus: e.target.value as DevStatus })
                    }
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                  >
                    <option value="IN DEVELOPMENT">IN DEVELOPMENT</option>
                    <option value="COMING SOON">COMING SOON</option>
                    <option value="RELEASED">RELEASED</option>
                    <option value="UPDATED">UPDATED</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-bold uppercase">Short Description *</label>
                <input
                  type="text"
                  required
                  value={editingGame.shortDescription || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, shortDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-bold uppercase">Full Description</label>
                <textarea
                  rows={3}
                  value={editingGame.fullDescription || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, fullDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-sans text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-bold uppercase">Cover Image URL / Preset</label>
                <input
                  type="text"
                  value={editingGame.coverImage || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, coverImage: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                />
                <div className="flex space-x-2 pt-2">
                  {presetCovers.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingGame({ ...editingGame, coverImage: img })}
                      className="w-12 h-10 rounded border border-neutral-700 overflow-hidden"
                    >
                      <img src={img} alt="Preset" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-bold uppercase">Target Release Date</label>
                  <input
                    type="text"
                    value={editingGame.releaseDate || ''}
                    onChange={(e) => setEditingGame({ ...editingGame, releaseDate: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-bold uppercase">Play Mode</label>
                  <select
                    value={editingGame.playMode || 'playable_embed'}
                    onChange={(e) =>
                      setEditingGame({ ...editingGame, playMode: e.target.value as any })
                    }
                    className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                  >
                    <option value="playable_embed">Interactive Browser Playable Demo</option>
                    <option value="download_link">External Download Link</option>
                    <option value="unreleased">Unreleased / Teaser Only</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsGameFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center space-x-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE GAME</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION 3: DEV UPDATES MANAGER */}
      {activeTab === 'updates' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center font-mono">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">
              DEVELOPMENT UPDATES MANAGER
            </h3>
            <button
              onClick={handleOpenNewUpdate}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase flex items-center space-x-2 shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ POST DEV UPDATE</span>
            </button>
          </div>

          <div className="space-y-4">
            {updates.map((update) => (
              <div
                key={update.id}
                className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={update.image}
                    alt={update.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-800"
                  />
                  <div>
                    <div className="text-[10px] text-cyan-400">{update.date}</div>
                    <h4 className="text-base font-bold text-white mt-0.5">{update.title}</h4>
                    <p className="text-neutral-400 font-sans line-clamp-1 text-xs">{update.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => onDeleteUpdate(update.id)}
                    className="p-2 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 cursor-pointer"
                    title="Delete Update"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UPDATE FORM MODAL */}
      {isUpdateFormOpen && editingUpdate && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-950 border border-purple-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full text-white space-y-6 my-auto shadow-2xl">
            <div className="flex justify-between items-center font-mono border-b border-neutral-800 pb-3">
              <h3 className="text-xl font-bold text-purple-300">CREATE DEV LOG UPDATE</h3>
              <button onClick={() => setIsUpdateFormOpen(false)} className="text-neutral-400">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUpdateSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-neutral-300 font-bold uppercase">Update Title *</label>
                <input
                  type="text"
                  required
                  value={editingUpdate.title || ''}
                  onChange={(e) => setEditingUpdate({ ...editingUpdate, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-bold uppercase">Short Summary *</label>
                <input
                  type="text"
                  required
                  value={editingUpdate.description || ''}
                  onChange={(e) => setEditingUpdate({ ...editingUpdate, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-bold uppercase">Full Content / Dev Log</label>
                <textarea
                  rows={4}
                  value={editingUpdate.content || ''}
                  onChange={(e) => setEditingUpdate({ ...editingUpdate, content: e.target.value })}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-sans text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsUpdateFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>PUBLISH UPDATE</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION 4: COMMUNITY IDEAS MANAGER */}
      {activeTab === 'ideas' && (
        <div className="space-y-6">
          <h3 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
            COMMUNITY IDEAS & FEEDBACK PORTAL
          </h3>

          <div className="space-y-4">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 font-mono text-xs"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded bg-purple-950 text-purple-300 font-bold border border-purple-800">
                      {idea.category.toUpperCase()}
                    </span>
                    <span className="text-neutral-400">By: <strong className="text-white">{idea.authorName}</strong></span>
                    {idea.authorContact && (
                      <span className="text-cyan-400">({idea.authorContact})</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-1 rounded font-bold uppercase ${
                        idea.status === 'saved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : idea.status === 'reviewed'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          : 'bg-yellow-950 text-yellow-300 border border-yellow-800'
                      }`}
                    >
                      STATUS: {idea.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">{idea.title}</h4>
                  <p className="text-neutral-300 font-sans text-sm mt-1 leading-relaxed">
                    {idea.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onUpdateIdeaStatus(idea.id, 'saved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 font-bold cursor-pointer"
                    >
                      ★ SAVE IDEA
                    </button>
                    <button
                      onClick={() => onUpdateIdeaStatus(idea.id, 'reviewed')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-bold cursor-pointer"
                    >
                      ✓ MARK REVIEWED
                    </button>
                  </div>

                  <button
                    onClick={() => onDeleteIdea(idea.id)}
                    className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 cursor-pointer"
                    title="Delete Idea"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: WEBSITE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-3xl">
          <h3 className="text-xl font-mono font-bold text-white uppercase tracking-wider">
            GLOBAL WEBSITE SETTINGS
          </h3>

          {settingsSavedMessage && (
            <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>SETTINGS SAVED SUCCESSFULLY!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettingsSubmit} className="space-y-6 font-mono text-xs">
            <div className="space-y-2">
              <label className="text-neutral-300 font-bold uppercase block">Website Tagline</label>
              <input
                type="text"
                value={siteSettings.tagline}
                onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-neutral-300 font-bold uppercase block">Announcement Banner Text</label>
              <input
                type="text"
                value={siteSettings.announcementBanner}
                onChange={(e) => setSiteSettings({ ...siteSettings, announcementBanner: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-neutral-300 font-bold uppercase block">Personal Instagram</label>
                <input
                  type="text"
                  value={siteSettings.instagramPersonal}
                  onChange={(e) => setSiteSettings({ ...siteSettings, instagramPersonal: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-neutral-300 font-bold uppercase block">Brand Instagram</label>
                <input
                  type="text"
                  value={siteSettings.instagramBrand}
                  onChange={(e) => setSiteSettings({ ...siteSettings, instagramBrand: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs tracking-wider uppercase flex items-center space-x-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>SAVE ALL SETTINGS</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
