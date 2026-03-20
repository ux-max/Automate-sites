import { create } from 'zustand';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}

export interface ProjectVersion {
  id: string;
  name: string;
  timestamp: string;
  description: string;
}

export interface AnalyticsData {
  date: string;
  pageViews: number;
  visitors: number;
  bounceRate: number;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, string>;
  timestamp: string;
}

export interface CMSCollection {
  id: string;
  name: string;
  slug: string;
  fields: { name: string; type: string; required: boolean }[];
  items: Record<string, unknown>[];
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'file';
  size: number;
  uploadedAt: string;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  description: string;
  connected: boolean;
  config?: Record<string, string>;
}

interface ProjectState {
  // Project
  projectName: string;
  projectUrl: string;
  isPublished: boolean;
  
  // Team
  teamMembers: TeamMember[];
  
  // Versions
  versions: ProjectVersion[];
  
  // Analytics
  analyticsData: AnalyticsData[];
  
  // Forms
  formSubmissions: FormSubmission[];
  
  // CMS
  collections: CMSCollection[];
  
  // Media
  mediaAssets: MediaAsset[];
  
  // Integrations
  integrations: Integration[];
  
  // Actions
  setProjectName: (name: string) => void;
  setPublished: (published: boolean) => void;
  
  // Team actions
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  removeTeamMember: (id: string) => void;
  
  // Version actions
  saveVersion: (name: string, description: string) => void;
  
  // Media actions
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => void;
  removeMediaAsset: (id: string) => void;
  
  // CMS actions
  addCollection: (collection: Omit<CMSCollection, 'id' | 'items'>) => void;
  addCollectionItem: (collectionId: string, item: Record<string, unknown>) => void;
  
  // Integration actions
  toggleIntegration: (id: string) => void;
}

const mockAnalytics: AnalyticsData[] = [
  { date: '2026-03-13', pageViews: 245, visitors: 180, bounceRate: 42 },
  { date: '2026-03-14', pageViews: 312, visitors: 225, bounceRate: 38 },
  { date: '2026-03-15', pageViews: 287, visitors: 198, bounceRate: 45 },
  { date: '2026-03-16', pageViews: 356, visitors: 267, bounceRate: 35 },
  { date: '2026-03-17', pageViews: 421, visitors: 310, bounceRate: 32 },
  { date: '2026-03-18', pageViews: 395, visitors: 285, bounceRate: 37 },
  { date: '2026-03-19', pageViews: 468, visitors: 342, bounceRate: 30 },
];

const defaultIntegrations: Integration[] = [
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    icon: '📊',
    description: 'Track website traffic and user behavior',
    connected: false,
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    icon: '📧',
    description: 'Email marketing and newsletter management',
    connected: false,
  },
  {
    id: 'google-search-console',
    name: 'Search Console',
    icon: '🔍',
    description: 'Monitor search performance and indexing',
    connected: false,
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    icon: '🔥',
    description: 'Heatmaps and user session recordings',
    connected: false,
  },
];

export const useProjectStore = create<ProjectState>((set) => ({
  projectName: 'My Website',
  projectUrl: 'my-website',
  isPublished: false,
  teamMembers: [
    { id: '1', name: 'You', email: 'you@example.com', role: 'admin' },
  ],
  versions: [
    { id: '1', name: 'Initial version', timestamp: new Date().toISOString(), description: 'Project created' },
  ],
  analyticsData: mockAnalytics,
  formSubmissions: [],
  collections: [
    {
      id: 'blog',
      name: 'Blog Posts',
      slug: 'blog',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richtext', required: true },
        { name: 'author', type: 'text', required: false },
        { name: 'publishDate', type: 'date', required: true },
      ],
      items: [
        { title: 'Getting Started', content: 'Welcome to our blog...', author: 'Admin', publishDate: '2026-03-19' },
      ],
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      slug: 'portfolio',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'image', required: false },
        { name: 'link', type: 'url', required: false },
      ],
      items: [],
    },
  ],
  mediaAssets: [],
  integrations: defaultIntegrations,
  
  setProjectName: (name: string) => set({ projectName: name }),
  setPublished: (published: boolean) => set({ isPublished: published }),
  
  addTeamMember: (member: Omit<TeamMember, 'id'>) => {
    set(state => ({
      teamMembers: [...state.teamMembers, { ...member, id: Date.now().toString() }],
    }));
  },
  
  removeTeamMember: (id: string) => {
    set(state => ({
      teamMembers: state.teamMembers.filter(m => m.id !== id),
    }));
  },
  
  saveVersion: (name: string, description: string) => {
    set(state => ({
      versions: [
        {
          id: Date.now().toString(),
          name,
          timestamp: new Date().toISOString(),
          description,
        },
        ...state.versions,
      ],
    }));
  },
  
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt'>) => {
    set(state => ({
      mediaAssets: [
        ...state.mediaAssets,
        { ...asset, id: Date.now().toString(), uploadedAt: new Date().toISOString() },
      ],
    }));
  },
  
  removeMediaAsset: (id: string) => {
    set(state => ({
      mediaAssets: state.mediaAssets.filter(a => a.id !== id),
    }));
  },
  
  addCollection: (collection: Omit<CMSCollection, 'id' | 'items'>) => {
    set(state => ({
      collections: [...state.collections, { ...collection, id: Date.now().toString(), items: [] }],
    }));
  },
  
  addCollectionItem: (collectionId: string, item: Record<string, unknown>) => {
    set(state => ({
      collections: state.collections.map(c =>
        c.id === collectionId ? { ...c, items: [...c.items, item] } : c
      ),
    }));
  },
  
  toggleIntegration: (id: string) => {
    set(state => ({
      integrations: state.integrations.map(i =>
        i.id === id ? { ...i, connected: !i.connected } : i
      ),
    }));
  },
}));
