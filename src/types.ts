export type DevStatus = 'IN DEVELOPMENT' | 'COMING SOON' | 'RELEASED' | 'UPDATED';

export type PlayableType = 'racer' | 'cyber_runner' | 'custom_web';

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  shortDescription: string;
  fullDescription: string;
  devStatus: DevStatus;
  releaseDate: string;
  rating?: number;
  coverImage: string;
  trailerUrl?: string;
  screenshots: string[];
  features: string[];
  systemRequirements: SystemRequirements;
  playMode: 'playable_embed' | 'download_link' | 'unreleased';
  playableType?: PlayableType;
  downloadUrl?: string;
  isPublished: boolean;
  createdAt: string;
  developer: string;
  progressPercent?: number;
}

export interface DevUpdate {
  id: string;
  title: string;
  image: string;
  date: string;
  description: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  author: string;
}

export type IdeaCategory = 'game' | 'character' | 'story' | 'mechanic' | 'mission' | 'map' | 'feature' | 'other';

export interface CommunityIdea {
  id: string;
  title: string;
  category: IdeaCategory;
  description: string;
  authorName: string;
  authorContact?: string;
  status: 'new' | 'reviewed' | 'saved' | 'archived';
  createdAt: string;
  creatorNotes?: string;
}

export interface SiteSettings {
  title: string;
  tagline: string;
  creatorName: string;
  creatorTitle: string;
  creatorCountry: string;
  creatorBio: string;
  instagramPersonal: string;
  instagramBrand: string;
  announcementBanner: string;
  isBannerActive: boolean;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}
