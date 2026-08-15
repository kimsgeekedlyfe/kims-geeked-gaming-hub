import React, { useState, useEffect } from 'react';
import { Game, DevUpdate, CommunityIdea, SiteSettings, IdeaCategory } from './types';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GamesSection } from './components/GamesSection';
import { GameDetailModal } from './components/GameDetailModal';
import { PlayableGameContainer } from './components/PlayableGameContainer';
import { ComingSoonSection } from './components/ComingSoonSection';
import { UpdatesSection } from './components/UpdatesSection';
import { ShareIdeaSection } from './components/ShareIdeaSection';
import { MeetCreatorSection } from './components/MeetCreatorSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CreatorDashboard } from './components/CreatorDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [games, setGames] = useState<Game[]>([]);
  const [updates, setUpdates] = useState<DevUpdate[]>([]);
  const [ideas, setIdeas] = useState<CommunityIdea[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    title: 'KIMS GEEKED GAMING HUB',
    tagline: 'WHERE IDEAS BECOME GAMES.',
    creatorName: 'Simon Kimutai Ronoh Yegon',
    creatorTitle: 'Independent Game Creator',
    creatorCountry: 'Kenya 🇰🇪',
    creatorBio: 'KIMS GEEKED GAMING HUB is the personal game-development platform of Simon Kimutai Ronoh Yegon...',
    instagramPersonal: '@simply_.kim_',
    instagramBrand: '@_.kimsgeekedlyfe',
    announcementBanner: '🚀 Nairobi Cyberpunk 2088 Playable Alpha Teaser is Live! Try it in browser now.',
    isBannerActive: true,
  });

  const [selectedGameForModal, setSelectedGameForModal] = useState<Game | null>(null);
  const [activePlayableGame, setActivePlayableGame] = useState<Game | null>(null);

  // AUTH STATE
  const [isCreatorLoggedIn, setIsCreatorLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('geeked_creator_token');
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isBannerActive, setIsBannerActive] = useState<boolean>(true);

  // FETCH DATA FROM SERVER
  const fetchData = async () => {
    try {
      const headers: Record<string, string> = {};
      const token = localStorage.getItem('geeked_creator_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Settings
      const setRes = await fetch('/api/settings');
      if (setRes.ok) {
        const setData = await setRes.json();
        setSettings(setData);
      }

      // Games
      const gamesRes = await fetch('/api/games', { headers });
      if (gamesRes.ok) {
        const gamesData = await gamesRes.json();
        setGames(gamesData);
      }

      // Updates
      const updRes = await fetch('/api/updates', { headers });
      if (updRes.ok) {
        const updData = await updRes.json();
        setUpdates(updData);
      }

      // Ideas (If creator logged in)
      if (token) {
        const ideasRes = await fetch('/api/ideas', { headers });
        if (ideasRes.ok) {
          const ideasData = await ideasRes.json();
          setIdeas(ideasData);
        }
      }
    } catch (err) {
      console.error('Error fetching data from API:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isCreatorLoggedIn]);

  // LOGIN HANDLER
  const handleCreatorLogin = async (passcode: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('geeked_creator_token', data.token);
        setIsCreatorLoggedIn(true);
        setActiveTab('creator');
        return true;
      }
    } catch (err) {
      console.error('Login error:', err);
    }
    return false;
  };

  const handleCreatorLogout = () => {
    localStorage.removeItem('geeked_creator_token');
    setIsCreatorLoggedIn(false);
    if (activeTab === 'creator') setActiveTab('home');
  };

  // API MUTATION HANDLERS
  const getAuthHeaders = () => {
    const token = localStorage.getItem('geeked_creator_token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`,
    };
  };

  const handleSaveGame = async (gameData: Partial<Game>) => {
    const isEdit = !!gameData.id;
    const url = isEdit ? `/api/games/${gameData.id}` : '/api/games';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(gameData),
    });

    if (res.ok) {
      await fetchData();
    }
  };

  const handleDeleteGame = async (id: string) => {
    const res = await fetch(`/api/games/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      await fetchData();
    }
  };

  const handleSaveUpdate = async (updateData: Partial<DevUpdate>) => {
    const isEdit = !!updateData.id;
    const url = isEdit ? `/api/updates/${updateData.id}` : '/api/updates';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    if (res.ok) {
      await fetchData();
    }
  };

  const handleDeleteUpdate = async (id: string) => {
    const res = await fetch(`/api/updates/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      await fetchData();
    }
  };

  const handleSubmitIdea = async (idea: {
    title: string;
    category: IdeaCategory;
    description: string;
    authorName: string;
    authorContact: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(idea),
      });
      return res.ok;
    } catch (err) {
      console.error('Submit idea error:', err);
      return false;
    }
  };

  const handlePolishIdeaWithAI = async (rawIdea: string, category: IdeaCategory): Promise<string> => {
    try {
      const res = await fetch('/api/gemini/enhance-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawIdea, category }),
      });
      const data = await res.json();
      return data.enhancedText || rawIdea;
    } catch (err) {
      console.error('Gemini polish error:', err);
      return rawIdea;
    }
  };

  const handleUpdateIdeaStatus = async (
    id: string,
    status: 'new' | 'reviewed' | 'saved' | 'archived',
    creatorNotes?: string
  ) => {
    const res = await fetch(`/api/ideas/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, creatorNotes }),
    });
    if (res.ok) {
      await fetchData();
    }
  };

  const handleDeleteIdea = async (id: string) => {
    const res = await fetch(`/api/ideas/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      await fetchData();
    }
  };

  const handleSaveSettings = async (settingsData: Partial<SiteSettings>) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settingsData),
    });
    if (res.ok) {
      await fetchData();
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-neutral-950 text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* ANNOUNCEMENT TOP BANNER */}
      <AnnouncementBanner
        text={settings.announcementBanner}
        isActive={isBannerActive && settings.isBannerActive}
        onDismiss={() => setIsBannerActive(false)}
      />

      {/* TOP NAVIGATION */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreatorAuth={() => setIsAuthModalOpen(true)}
        isCreatorLoggedIn={isCreatorLoggedIn}
        onCreatorLogout={handleCreatorLogout}
      />

      {/* MAIN VIEW CONTENT */}
      <main>
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreGames={() => {
                setActiveTab('games');
                const el = document.getElementById('games');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onShareIdea={() => {
                setActiveTab('idea');
                const el = document.getElementById('idea');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              gameCount={games.length}
            />

            {/* QUICK DIRECT PLAY CONTAINER IF DEMO ACTIVE */}
            {activePlayableGame && activePlayableGame.playableType && (
              <div className="max-w-4xl mx-auto px-4 pt-8">
                <PlayableGameContainer
                  playableType={activePlayableGame.playableType}
                  gameTitle={activePlayableGame.title}
                  onClose={() => setActivePlayableGame(null)}
                />
              </div>
            )}

            <GamesSection
              games={games}
              onSelectGame={(game) => setSelectedGameForModal(game)}
              onPlayDirect={(game) => setActivePlayableGame(game)}
            />

            <ComingSoonSection
              games={games}
              onSelectGame={(game) => setSelectedGameForModal(game)}
            />

            <UpdatesSection updates={updates} />

            <ShareIdeaSection
              onSubmitIdea={handleSubmitIdea}
              onPolishIdeaWithAI={handlePolishIdeaWithAI}
            />

            <MeetCreatorSection />
          </>
        )}

        {activeTab === 'games' && (
          <div className="pt-8">
            {activePlayableGame && activePlayableGame.playableType && (
              <div className="max-w-4xl mx-auto px-4 pb-8">
                <PlayableGameContainer
                  playableType={activePlayableGame.playableType}
                  gameTitle={activePlayableGame.title}
                  onClose={() => setActivePlayableGame(null)}
                />
              </div>
            )}
            <GamesSection
              games={games}
              onSelectGame={(game) => setSelectedGameForModal(game)}
              onPlayDirect={(game) => setActivePlayableGame(game)}
            />
          </div>
        )}

        {activeTab === 'coming-soon' && (
          <div className="pt-8">
            <ComingSoonSection
              games={games}
              onSelectGame={(game) => setSelectedGameForModal(game)}
            />
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="pt-8">
            <UpdatesSection updates={updates} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-8">
            <MeetCreatorSection />
          </div>
        )}

        {activeTab === 'idea' && (
          <div className="pt-8">
            <ShareIdeaSection
              onSubmitIdea={handleSubmitIdea}
              onPolishIdeaWithAI={handlePolishIdeaWithAI}
            />
          </div>
        )}

        {activeTab === 'connect' && (
          <div className="pt-8 max-w-4xl mx-auto px-4 pb-12 space-y-8">
            <ShareIdeaSection
              onSubmitIdea={handleSubmitIdea}
              onPolishIdeaWithAI={handlePolishIdeaWithAI}
            />
            <MeetCreatorSection />
          </div>
        )}

        {/* PRIVATE CREATOR DASHBOARD VIEW */}
        {activeTab === 'creator' && isCreatorLoggedIn && (
          <CreatorDashboard
            games={games}
            updates={updates}
            ideas={ideas}
            settings={settings}
            onSaveGame={handleSaveGame}
            onDeleteGame={handleDeleteGame}
            onSaveUpdate={handleSaveUpdate}
            onDeleteUpdate={handleDeleteUpdate}
            onUpdateIdeaStatus={handleUpdateIdeaStatus}
            onDeleteIdea={handleDeleteIdea}
            onSaveSettings={handleSaveSettings}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onNavClick={setActiveTab}
        onOpenCreatorAuth={() => setIsAuthModalOpen(true)}
        isCreatorLoggedIn={isCreatorLoggedIn}
      />

      {/* GAME DETAILS MODAL */}
      <GameDetailModal
        game={selectedGameForModal}
        onClose={() => setSelectedGameForModal(null)}
      />

      {/* AUTH MODAL FOR SIMON KIMUTAI RONOH YEGON */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleCreatorLogin}
      />
    </div>
  );
}
