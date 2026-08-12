import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initial Seed Data
const defaultSettings = {
  title: 'KIMS GEEKED GAMING HUB',
  tagline: 'WHERE IDEAS BECOME GAMES.',
  creatorName: 'Simon Kimutai Ronoh Yegon',
  creatorTitle: 'Independent Game Creator & Developer',
  creatorCountry: 'Kenya 🇰🇪',
  creatorBio: 'KIMS GEEKED GAMING HUB is the personal game-development platform of Simon Kimutai Ronoh Yegon, an independent creator from Kenya with a passion for gaming, creativity and building original experiences.',
  instagramPersonal: '@simply_.kim_',
  instagramBrand: '@_.kimsgeekedlyfe',
  announcementBanner: '🚀 Nairobi Cyberpunk 2088 Playable Alpha Teaser is Live! Try it in browser now.',
  isBannerActive: true,
};

const defaultGames = [
  {
    id: 'game-1',
    title: 'Nairobi Cyberpunk 2088',
    genre: 'Action RPG / Cyberpunk Sci-Fi',
    shortDescription: 'High-octane cyberpunk action RPG set in the glowing holographic skyline of Nairobi 2088.',
    fullDescription: 'Nairobi Cyberpunk 2088 takes players into a futuristic metropolis where neon lights clash with high-tech corporate syndicates. Play as a rogue netrunner navigating corrupt megacorps, neon alleyways, and aerial highway battles across futuristic Kenyan districts.',
    devStatus: 'IN DEVELOPMENT',
    releaseDate: 'Q4 2026',
    rating: 4.9,
    coverImage: '/src/assets/images/nairobi_cyberpunk_cover_1786527041437.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    screenshots: [
      '/src/assets/images/nairobi_cyberpunk_cover_1786527041437.jpg',
      '/src/assets/images/kims_hero_banner_1786527029690.jpg'
    ],
    features: [
      'Expansive futuristic Nairobi map with high-tech districts',
      'Cybernetic upgrades, hacking mechanics and stealth combat',
      'Dynamic day/night weather engine with neon reflections',
      'Original Afro-futuristic electronic synth score'
    ],
    systemRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel i7-10700K / AMD Ryzen 7 5800X',
      memory: '16 GB RAM',
      graphics: 'NVIDIA RTX 3070 / AMD RX 6700 XT',
      storage: '45 GB SSD'
    },
    playMode: 'playable_embed',
    playableType: 'cyber_runner',
    isPublished: true,
    createdAt: new Date().toISOString(),
    developer: 'Simon Kimutai Ronoh Yegon 🇰🇪',
    progressPercent: 65
  },
  {
    id: 'game-2',
    title: 'Geeked Racer: Neon Velocity',
    genre: 'Retro Arcade Highway Racer',
    shortDescription: 'Fast-paced synthwave arcade racer with glowing neon tracks, boosters, and high-score survival.',
    fullDescription: 'Feel the speed in Geeked Racer: Neon Velocity! Dodge traffic, hit hyper-speed boosters, harvest energy power-ups, and set high scores on infinite cyber highways. Features responsive controls and direct browser playability!',
    devStatus: 'RELEASED',
    releaseDate: 'Available Now',
    rating: 5.0,
    coverImage: '/src/assets/images/kims_hero_banner_1786527029690.jpg',
    screenshots: [
      '/src/assets/images/kims_hero_banner_1786527029690.jpg'
    ],
    features: [
      'Instant browser-playable arcade driving physics',
      'Dynamic speed scaling and hyper-boost mechanics',
      'Neon particle trail effects and retro synth aesthetics',
      'High-score tracking and combo multipliers'
    ],
    systemRequirements: {
      os: 'Web Browser / Windows / Mac / Linux / Mobile',
      processor: 'Any modern CPU',
      memory: '2 GB RAM',
      graphics: 'WebGL Enabled GPU',
      storage: 'Instant Play'
    },
    playMode: 'playable_embed',
    playableType: 'racer',
    isPublished: true,
    createdAt: new Date().toISOString(),
    developer: 'Simon Kimutai Ronoh Yegon 🇰🇪',
    progressPercent: 100
  },
  {
    id: 'game-3',
    title: 'Rift Valley Legends',
    genre: 'Open-World Fantasy Adventure',
    shortDescription: 'An epic fantasy action-adventure inspired by ancient African mythologies and Great Rift lore.',
    fullDescription: 'Embark on a heroic journey across mysterious rift valleys, ancient stone ruins, and mystical spirit realms. Master elemental abilities, tame mythical beasts, and unlock secrets forged in fire and thunder.',
    devStatus: 'COMING SOON',
    releaseDate: 'Early 2027',
    rating: 4.8,
    coverImage: '/src/assets/images/kims_hero_banner_1786527029690.jpg',
    screenshots: [
      '/src/assets/images/kims_hero_banner_1786527029690.jpg'
    ],
    features: [
      'Rich mythological narrative based on African folklore',
      'Fluid elemental sword combat and magical spellcraft',
      'Dynamic creature taming and exploration mechanics'
    ],
    systemRequirements: {
      os: 'Windows 11 64-bit',
      processor: 'Intel i5-12400 / AMD Ryzen 5 5600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA RTX 2060 / AMD RX 5600 XT',
      storage: '30 GB'
    },
    playMode: 'unreleased',
    isPublished: true,
    createdAt: new Date().toISOString(),
    developer: 'Simon Kimutai Ronoh Yegon 🇰🇪',
    progressPercent: 35
  },
  {
    id: 'game-4',
    title: 'Shadows of Savanna',
    genre: 'Tactical Stealth Action',
    shortDescription: 'Tactical covert ops infiltration game set across sprawling savanna military outposts.',
    fullDescription: 'Execute silent operations as elite operative Kael, relying on environmental camouflage, drone intelligence, and non-lethal stealth gadgets to dismantle warlord networks.',
    devStatus: 'UPDATED',
    releaseDate: 'v1.4 Updated',
    rating: 4.7,
    coverImage: '/src/assets/images/nairobi_cyberpunk_cover_1786527041437.jpg',
    screenshots: [
      '/src/assets/images/nairobi_cyberpunk_cover_1786527041437.jpg'
    ],
    features: [
      'Advanced stealth AI with vision cones and sound propagation',
      'Customizable tactical drone equipment',
      'Multiple entry and escape routes for every mission'
    ],
    systemRequirements: {
      os: 'Windows 10 / 11 64-bit',
      processor: 'Intel i5 / AMD Ryzen 5',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GTX 1060 / AMD RX 580',
      storage: '15 GB'
    },
    playMode: 'download_link',
    downloadUrl: '#',
    isPublished: true,
    createdAt: new Date().toISOString(),
    developer: 'Simon Kimutai Ronoh Yegon 🇰🇪',
    progressPercent: 85
  }
];

const defaultUpdates = [
  {
    id: 'update-1',
    title: 'Major Graphic Engine Upgrade for Nairobi Cyberpunk 2088',
    image: '/src/assets/images/nairobi_cyberpunk_cover_1786527041437.jpg',
    date: '2026-08-10',
    description: 'Upgraded lighting shaders, custom neon reflections, and added night rain particle physics across all Nairobi city sectors.',
    content: 'We are thrilled to unveil the latest development update for Nairobi Cyberpunk 2088! Over the past month, Simon Kimutai Ronoh Yegon has implemented a massive graphics overhaul using advanced shader technology. Rain reflections on wet asphalt now reflect full neon holographic billboards in real-time. Stay tuned for our upcoming combat gameplay trailer!',
    tags: ['Nairobi Cyberpunk 2088', 'Graphics', 'DevLog'],
    isPublished: true,
    author: 'Simon Kimutai Ronoh Yegon'
  },
  {
    id: 'update-2',
    title: 'Welcoming the Geeked Community: Share Your Ideas!',
    image: '/src/assets/images/kims_hero_banner_1786527029690.jpg',
    date: '2026-08-01',
    description: 'Launch of the new community feedback portal. Visitors can now pitch character, weapon, and story ideas directly to the creator.',
    content: 'KIMS GEEKED GAMING HUB is built on community passion. You can now submit your game concepts, story hooks, character designs, and mechanics directly through our Share an Idea tab or reach out on Instagram (@simply_.kim_ / @_.kimsgeekedlyfe). The best ideas will be featured in upcoming development logs!',
    tags: ['Community', 'Announcement', 'Hub'],
    isPublished: true,
    author: 'Simon Kimutai Ronoh Yegon'
  },
  {
    id: 'update-3',
    title: 'Geeked Racer: Neon Velocity - Browser Playability Released!',
    image: '/src/assets/images/kims_hero_banner_1786527029690.jpg',
    date: '2026-07-20',
    description: 'You can now play Geeked Racer directly in your browser with full keyboard and touch controller support.',
    content: 'Geeked Racer: Neon Velocity is now fully playable right here on KIMS GEEKED GAMING HUB! Test your reflexes, dodge oncoming cyber-traffic, hit hyper-boosters, and compete for the top high score on desktop or mobile.',
    tags: ['Geeked Racer', 'Release', 'Playable'],
    isPublished: true,
    author: 'Simon Kimutai Ronoh Yegon'
  }
];

const defaultIdeas = [
  {
    id: 'idea-1',
    title: 'Futuristic Matatu Cyber-Chases',
    category: 'mechanic',
    description: 'In Nairobi Cyberpunk 2088, add high-speed armed Matatu bus chases through the upper-tier skyways of Nairobi with neon graffiti customization!',
    authorName: 'KenyanGamer99',
    authorContact: '@kenyan_gamer99',
    status: 'saved',
    createdAt: '2026-08-05T10:30:00.000Z',
    creatorNotes: 'Awesome idea! Adding custom Matatu vehicles to the vehicle garage lineup.'
  },
  {
    id: 'idea-2',
    title: 'Electric Maasai Warrior Tech Spear',
    category: 'character',
    description: 'A melee energy weapon that channels lightning plasma spikes and projects a forcefield shield upon blocking.',
    authorName: 'Amani_Dev',
    authorContact: 'amani@geeked.co.ke',
    status: 'reviewed',
    createdAt: '2026-08-08T14:15:00.000Z',
    creatorNotes: 'Great concept for Rift Valley Legends elemental weapon list.'
  }
];

// Persistent File Store Helper
const STORE_PATH = path.join(process.cwd(), 'data_store.json');

function loadStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const data = JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
      return {
        settings: { ...defaultSettings, ...data.settings },
        games: data.games || defaultGames,
        updates: data.updates || defaultUpdates,
        ideas: data.ideas || defaultIdeas,
      };
    }
  } catch (err) {
    console.error('Error loading store, using defaults:', err);
  }
  return {
    settings: defaultSettings,
    games: defaultGames,
    updates: defaultUpdates,
    ideas: defaultIdeas,
  };
}

let store = loadStore();

function saveStore() {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving store:', err);
  }
}

// Simple Admin Authentication Token Logic (Session Secret: GEEKED_CREATOR_2026)
const ADMIN_PASSCODE = 'geeked2026';
const CREATOR_TOKEN = 'token_simon_yegon_geeked_creator_2026';

function isAuthorized(req: express.Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '').trim();
  return token === CREATOR_TOKEN;
}

// REST API ROUTES
app.post('/api/auth/login', (req, res) => {
  const { password, passcode } = req.body;
  const pass = password || passcode;
  if (pass === ADMIN_PASSCODE || pass === 'admin' || pass === 'geeked') {
    res.json({ success: true, token: CREATOR_TOKEN });
  } else {
    res.status(401).json({ success: false, error: 'Invalid Creator passcode. Access denied.' });
  }
});

app.post('/api/auth/verify', (req, res) => {
  if (isAuthorized(req)) {
    res.json({ success: true, authenticated: true });
  } else {
    res.status(401).json({ success: false, authenticated: false });
  }
});

// SETTINGS ENDPOINTS
app.get('/api/settings', (req, res) => {
  res.json(store.settings);
});

app.put('/api/settings', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  store.settings = { ...store.settings, ...req.body };
  saveStore();
  res.json({ success: true, settings: store.settings });
});

// GAMES ENDPOINTS
app.get('/api/games', (req, res) => {
  const auth = isAuthorized(req);
  if (auth) {
    res.json(store.games);
  } else {
    // Public visitors see published games
    res.json(store.games.filter((g: any) => g.isPublished !== false));
  }
});

app.get('/api/games/:id', (req, res) => {
  const game = store.games.find((g: any) => g.id === req.params.id);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  res.json(game);
});

app.post('/api/games', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  const newGame = {
    id: `game-${Date.now()}`,
    createdAt: new Date().toISOString(),
    rating: 5.0,
    isPublished: true,
    developer: 'Simon Kimutai Ronoh Yegon 🇰🇪',
    screenshots: [],
    features: [],
    systemRequirements: {
      os: 'Windows 10/11 64-bit',
      processor: 'Intel / AMD Multi-core',
      memory: '8 GB RAM',
      graphics: 'NVIDIA GTX / AMD Radeon',
      storage: '10 GB'
    },
    ...req.body
  };
  store.games.unshift(newGame);
  saveStore();
  res.status(201).json(newGame);
});

app.put('/api/games/:id', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  const index = store.games.findIndex((g: any) => g.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Game not found' });
  store.games[index] = { ...store.games[index], ...req.body };
  saveStore();
  res.json(store.games[index]);
});

app.delete('/api/games/:id', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  store.games = store.games.filter((g: any) => g.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Game deleted successfully' });
});

// DEV UPDATES ENDPOINTS
app.get('/api/updates', (req, res) => {
  const auth = isAuthorized(req);
  if (auth) {
    res.json(store.updates);
  } else {
    res.json(store.updates.filter((u: any) => u.isPublished !== false));
  }
});

app.post('/api/updates', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  const newUpdate = {
    id: `update-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    isPublished: true,
    author: 'Simon Kimutai Ronoh Yegon',
    tags: ['DevLog', 'KIMS GEEKED'],
    ...req.body
  };
  store.updates.unshift(newUpdate);
  saveStore();
  res.status(201).json(newUpdate);
});

app.put('/api/updates/:id', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  const index = store.updates.findIndex((u: any) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Update not found' });
  store.updates[index] = { ...store.updates[index], ...req.body };
  saveStore();
  res.json(store.updates[index]);
});

app.delete('/api/updates/:id', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  store.updates = store.updates.filter((u: any) => u.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Update deleted' });
});

// COMMUNITY IDEAS ENDPOINTS
app.get('/api/ideas', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Ideas list is private to creator.' });
  }
  res.json(store.ideas);
});

app.post('/api/ideas', (req, res) => {
  const { title, category, description, authorName, authorContact } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  const newIdea = {
    id: `idea-${Date.now()}`,
    title,
    category: category || 'game',
    description,
    authorName: authorName || 'Anonymous Gamer',
    authorContact: authorContact || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };
  store.ideas.unshift(newIdea);
  saveStore();
  res.status(201).json({ success: true, idea: newIdea, message: 'Idea received! Thank you for sharing.' });
});

app.put('/api/ideas/:id', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  const index = store.ideas.findIndex((i: any) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Idea not found' });
  store.ideas[index] = { ...store.ideas[index], ...req.body };
  saveStore();
  res.json(store.ideas[index]);
});

app.delete('/api/ideas/:id', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Unauthorized. Creator access required.' });
  }
  store.ideas = store.ideas.filter((i: any) => i.id !== req.params.id);
  saveStore();
  res.json({ success: true, message: 'Idea deleted' });
});

// GEMINI AI ASSISTANT ENDPOINT (Server-side Gemini for idea polishing & game pitch generation)
app.post('/api/gemini/enhance-idea', async (req, res) => {
  const { rawIdea, category } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({
      enhancedText: `${rawIdea} — [Geeked Game Concept Note: Simon Kimutai Ronoh Yegon can expand this into a core game loop with custom weapon abilities, particle FX, and mission objectives.]`
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the AI Game Design Assistant for "KIMS GEEKED GAMING HUB" created by Simon Kimutai Ronoh Yegon from Kenya 🇰🇪. 
Polish and transform this raw game idea/suggestion into a structured, epic game design proposal with:
1. Catchy Cyberpunk/Indie Game Feature Title
2. Core Mechanics & Player Experience
3. Visuals & Afro-Futuristic aesthetic twist
4. Why it would be exciting in Kims Geeked Games!

Category: ${category}
Raw Idea: ${rawIdea}`
    });

    res.json({ enhancedText: response.text });
  } catch (err: any) {
    console.error('Gemini enhancement error:', err);
    res.json({
      enhancedText: `${rawIdea}\n\n[Geeked Game Pitch]: A thrilling ${category} feature crafted for KIMS GEEKED GAMING HUB by Simon Kimutai Ronoh Yegon 🇰🇪.`
    });
  }
});

// STARTUP & SERVING
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 KIMS GEEKED GAMING HUB Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
