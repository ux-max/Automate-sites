import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Page } from './builderStore';

export interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  pages: Page[];
  bannerEmoji?: string;
}

interface ProjectsState {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) => set((state) => ({ 
        projects: [project, ...state.projects] 
      })),
      removeProject: (id) => set((state) => ({ 
        projects: state.projects.filter(p => p.id !== id) 
      })),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
    }),
    {
      name: 'automate-projects-storage',
    }
  )
);
