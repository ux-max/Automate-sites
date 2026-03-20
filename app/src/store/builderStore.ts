import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// ===== TYPES =====
export type DeviceView = 'desktop' | 'tablet' | 'mobile';
export type ElementType = 'text' | 'heading' | 'image' | 'button' | 'form' | 'video' | 'container' | 'columns' | 'divider' | 'spacer' | 'icon' | 'list';

export interface ElementStyles {
  // Layout
  width?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  maxWidth?: string;
  minWidth?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
  flex?: string;
  gap?: string;
  gridTemplateColumns?: string;

  // Spacing
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;

  // Typography
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;
  textDecoration?: string;
  textTransform?: string;
  fontStyle?: string;
  color?: string;

  // Background
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;

  // Border
  borderWidth?: string;
  borderTopWidth?: string;
  borderRightWidth?: string;
  borderBottomWidth?: string;
  borderLeftWidth?: string;
  borderStyle?: string;
  borderTopStyle?: string;
  borderRightStyle?: string;
  borderBottomStyle?: string;
  borderLeftStyle?: string;
  borderColor?: string;
  borderTopColor?: string;
  borderRightColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRadius?: string;

  // Shadow
  boxShadow?: string;

  // Other
  opacity?: string;
  overflow?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number | string;
  objectFit?: string;
  pointerEvents?: string;
  cursor?: string;
  transition?: string;
  backdropFilter?: string;
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  content: string;
  styles: ElementStyles;
  tabletStyles?: Partial<ElementStyles>;
  mobileStyles?: Partial<ElementStyles>;
  children?: CanvasElement[];
  props?: Record<string, unknown>;
  hidden?: {
    desktop?: boolean;
    tablet?: boolean;
    mobile?: boolean;
  };
}

export interface PageSection {
  id: string;
  name: string;
  elements: CanvasElement[];
  styles?: ElementStyles;
}

export interface Page {
  id: string;
  name: string;
  path: string;
  sections: PageSection[];
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    keywords?: string;
    noIndex?: boolean;
  };
}

// ===== HISTORY FOR UNDO/REDO =====
interface HistoryEntry {
  pages: Page[];
  activePageId: string;
}

// ===== STORE =====
interface BuilderState {
  // Pages
  pages: Page[];
  activePageId: string;
  
  // Selection
  selectedElementId: string | null;
  hoveredElementId: string | null;
  
  // Device
  deviceView: DeviceView;
  
  // Sidebar
  activePanel: string | null;
  
  // Theme Mode (Builder UI)
  themeMode: 'dark' | 'light';
  
  // History
  history: HistoryEntry[];
  historyIndex: number;
  
  // Actions - Pages
  addPage: (name: string, path: string) => void;
  deletePage: (pageId: string) => void;
  duplicatePage: (pageId: string) => void;
  setActivePage: (pageId: string) => void;
  updatePageSeo: (pageId: string, seo: Page['seo']) => void;
  createNewProject: () => void;
  
  // Actions - Sections
  addSection: (pageId: string, sectionData?: Partial<PageSection>) => void;
  deleteSection: (pageId: string, sectionId: string) => void;
  
  // Actions - Elements
  addElement: (pageId: string, sectionId: string, element: Omit<CanvasElement, 'id'>) => void;
  updateElement: (pageId: string, sectionId: string, elementId: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (pageId: string, sectionId: string, elementId: string) => void;
  moveElement: (pageId: string, sectionId: string, fromIndex: number, toIndex: number) => void;
  
  // Actions - Selection
  selectElement: (elementId: string | null) => void;
  hoverElement: (elementId: string | null) => void;
  
  // Actions - Device
  setDeviceView: (view: DeviceView) => void;
  
  // Actions - Sidebar
  setActivePanel: (panel: string | null) => void;
  
  // Actions - Theme Mode
  toggleThemeMode: () => void;
  
  // Actions - History
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  
  // Actions - Import template
  importTemplate: (pages: Page[]) => void;
  
  // Getters
  getActivePage: () => Page | undefined;
  getSelectedElement: () => { element: CanvasElement; sectionId: string } | null;
}

const createDefaultPage = (): Page => ({
  id: uuidv4(),
  name: 'Home',
  path: '/',
  sections: [
    {
      id: uuidv4(),
      name: 'Hero Section',
      elements: [],
      styles: {
        padding: '64px 32px',
        minHeight: '400px',
        backgroundColor: 'var(--theme-background)',
      },
    },
  ],
  seo: {
    title: 'My Website',
    description: 'Built with Automate Website Builder',
  },
});

import { persist } from 'zustand/middleware';

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => {
      const defaultPage = createDefaultPage();
      
      return {
        // State
        pages: [defaultPage],
        activePageId: defaultPage.id,
        selectedElementId: null,
        hoveredElementId: null,
        deviceView: 'desktop',
        activePanel: 'elements',
        isDragging: false,
        themeMode: 'dark',
        history: [],
        historyIndex: -1,
        
        // Pages
        addPage: (name: string, path: string) => {
          const newPage: Page = {
            id: uuidv4(),
            name,
            path,
            sections: [
              {
                id: uuidv4(),
                name: 'Main Section',
                elements: [],
                styles: { padding: '64px 32px', minHeight: '400px', backgroundColor: 'var(--theme-background)' },
              },
            ],
            seo: { title: name, description: '' },
          };
          set((state: BuilderState) => ({ pages: [...state.pages, newPage] }));
          get().saveHistory();
        },
        
        deletePage: (pageId: string) => {
          set((state: BuilderState) => {
            const filtered = state.pages.filter((p: Page) => p.id !== pageId);
            if (filtered.length === 0) return state;
            const newActiveId = state.activePageId === pageId ? filtered[0].id : state.activePageId;
            return { pages: filtered, activePageId: newActiveId };
          });
          get().saveHistory();
        },
        
        duplicatePage: (pageId: string) => {
          set((state: BuilderState) => {
            const page = state.pages.find((p: Page) => p.id === pageId);
            if (!page) return state;
            const dup: Page = {
              ...JSON.parse(JSON.stringify(page)),
              id: uuidv4(),
              name: `${page.name} (Copy)`,
              path: `${page.path}-copy`,
            };
            // regenerate IDs
            dup.sections = dup.sections.map((s: PageSection) => ({
              ...s,
              id: uuidv4(),
              elements: s.elements.map((e: CanvasElement) => ({ ...e, id: uuidv4() })),
            }));
            return { pages: [...state.pages, dup] };
          });
          get().saveHistory();
        },
        
        setActivePage: (pageId: string) => set({ activePageId: pageId, selectedElementId: null }),
        
        updatePageSeo: (pageId: string, seo: Partial<Page['seo']>) => {
          set((state: BuilderState) => ({
            pages: state.pages.map((p: Page) => p.id === pageId ? { ...p, seo: { ...p.seo, ...seo } } : p)
          }));
        },
        
        createNewProject: () => {
          const defaultPage = createDefaultPage();
          set({ pages: [defaultPage], activePageId: defaultPage.id, selectedElementId: null });
          get().saveHistory();
        },
        
        // Sections
        addSection: (pageId: string, sectionData?: Partial<PageSection>) => {
          const generateIds = (els: CanvasElement[]): CanvasElement[] => {
            return els.map(el => ({
              ...el,
              id: uuidv4(),
              children: el.children ? generateIds(el.children) : undefined
            }));
          };

          const newSection: PageSection = {
            id: uuidv4(),
            name: sectionData?.name || 'New Section',
            elements: sectionData?.elements ? generateIds(sectionData.elements) : [],
            styles: sectionData?.styles || { padding: '48px 32px', minHeight: '200px', backgroundColor: 'var(--theme-background)' },
          };

          set((state: BuilderState) => ({
            pages: state.pages.map((p: Page) =>
              p.id === pageId ? { ...p, sections: [...p.sections, newSection] } : p
            ),
          }));
          get().saveHistory();
        },
        
        deleteSection: (pageId: string, sectionId: string) => {
          set((state: BuilderState) => ({
            pages: state.pages.map((p: Page) =>
              p.id === pageId
                ? { ...p, sections: p.sections.filter((s: PageSection) => s.id !== sectionId) }
                : p
            ),
          }));
          get().saveHistory();
        },
        
        // Elements
        addElement: (pageId: string, sectionId: string, element: Omit<CanvasElement, 'id'>) => {
          const newElement: CanvasElement = { ...element, id: uuidv4() };
          set((state: BuilderState) => ({
            pages: state.pages.map((p: Page) =>
              p.id === pageId
                ? {
                  ...p,
                  sections: p.sections.map((s: PageSection) =>
                    s.id === sectionId
                      ? { ...s, elements: [...s.elements, newElement] }
                      : s
                  ),
                }
                : p
            ),
          }));
          get().saveHistory();
        },
        
        updateElement: (pageId: string, sectionId: string, elementId: string, updates: Partial<CanvasElement>) => {
          const updateRecursive = (els: CanvasElement[]): CanvasElement[] =>
            els.map((e: CanvasElement) =>
              e.id === elementId
                ? { ...e, ...updates }
                : e.children
                  ? { ...e, children: updateRecursive(e.children) }
                  : e
            );
          set((state: BuilderState) => ({
            pages: state.pages.map((p: Page) =>
              p.id === pageId
                ? {
                  ...p,
                  sections: p.sections.map((s: PageSection) =>
                    s.id === sectionId
                      ? { ...s, elements: updateRecursive(s.elements) }
                      : s
                  ),
                }
                : p
            ),
          }));
        },
        
        deleteElement: (pageId: string, sectionId: string, elementId: string) => {
          const deleteRecursive = (els: CanvasElement[]): CanvasElement[] =>
            els
              .filter((e: CanvasElement) => e.id !== elementId)
              .map((e: CanvasElement) =>
                e.children
                  ? { ...e, children: deleteRecursive(e.children) }
                  : e
              );
          set((state: BuilderState) => ({
            pages: state.pages.map((p: Page) =>
              p.id === pageId
                ? {
                  ...p,
                  sections: p.sections.map((s: PageSection) =>
                    s.id === sectionId
                      ? { ...s, elements: deleteRecursive(s.elements) }
                      : s
                  ),
                }
                : p
            ),
          }));
          get().saveHistory();
        },
        
        moveElement: (pageId: string, sectionId: string, fromIndex: number, toIndex: number) => {
          set((state: BuilderState) => ({
            pages: state.pages.map((p: Page) =>
              p.id === pageId
                ? {
                  ...p,
                  sections: state.pages.find((pg: Page) => pg.id === pageId)?.sections.map((s: PageSection) => {
                    if (s.id !== sectionId) return s;
                    const els = [...s.elements];
                    const [moved] = els.splice(fromIndex, 1);
                    els.splice(toIndex, 0, moved);
                    return { ...s, elements: els };
                  }) || [],
                }
                : p
            ),
          }));
          get().saveHistory();
        },
        
        // Selection
        selectElement: (elementId: string | null) => set({ selectedElementId: elementId }),
        hoverElement: (elementId: string | null) => set({ hoveredElementId: elementId }),
        
        // Device
        setDeviceView: (view: DeviceView) => set({ deviceView: view }),
        
        // Sidebar
        setActivePanel: (panel: string | null) => set({ activePanel: panel }),
        
        // Theme Mode
        toggleThemeMode: () => set((state: BuilderState) => ({ themeMode: state.themeMode === 'dark' ? 'light' : 'dark' })),
        
        // History
        undo: () => {
          set((state: BuilderState) => {
            if (state.historyIndex <= 0) return state;
            const newIndex = state.historyIndex - 1;
            const entry = state.history[newIndex];
            return {
              historyIndex: newIndex,
              pages: JSON.parse(JSON.stringify(entry.pages)),
              activePageId: entry.activePageId,
            };
          });
        },
        
        redo: () => {
          set((state: BuilderState) => {
            if (state.historyIndex >= state.history.length - 1) return state;
            const newIndex = state.historyIndex + 1;
            const entry = state.history[newIndex];
            return {
              historyIndex: newIndex,
              pages: JSON.parse(JSON.stringify(entry.pages)),
              activePageId: entry.activePageId,
            };
          });
        },
        
        saveHistory: () => {
          set((state: BuilderState) => {
            const entry: HistoryEntry = {
              pages: JSON.parse(JSON.stringify(state.pages)),
              activePageId: state.activePageId,
            };
            const newHistory = state.history.slice(0, state.historyIndex + 1);
            newHistory.push(entry);
            // Keep max 50 entries
            if (newHistory.length > 50) newHistory.shift();
            return {
              history: newHistory,
              historyIndex: newHistory.length - 1,
            };
          });
        },
        
        // Import template
        importTemplate: (pages: Page[]) => {
          get().saveHistory();
          set({ pages, activePageId: pages[0]?.id || '' });
        },
        
        // Getters
        getActivePage: () => {
          const state = get();
          return state.pages.find((p: Page) => p.id === state.activePageId);
        },
        
        getSelectedElement: () => {
          const state = get();
          if (!state.selectedElementId) return null;
          const page = state.pages.find((p: Page) => p.id === state.activePageId);
          if (!page) return null;
          const findRecursive = (els: CanvasElement[]): CanvasElement | null => {
            for (const e of els) {
              if (e.id === state.selectedElementId) return e;
              if (e.children) {
                const found = findRecursive(e.children);
                if (found) return found;
              }
            }
            return null;
          };
          for (const section of page.sections) {
            const element = findRecursive(section.elements);
            if (element) return { element, sectionId: section.id };
          }
          return null;
        },
      };
    },
    {
      name: 'automate-builder-storage',
      partialize: (state: any) => ({ 
        pages: state.pages, 
        activePageId: state.activePageId, 
        themeMode: state.themeMode 
      }),
    }
  )
);
