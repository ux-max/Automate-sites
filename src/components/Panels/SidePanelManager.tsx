'use client';

import { useBuilderStore } from '@/store/builderStore';
import { useProjectStore } from '@/store/projectStore';
import { X } from 'lucide-react';
import SectionsPanel from '@/components/Builder/SectionsPanel';
import PageManager from '@/components/Pages/PageManager';
import ThemePanel from '@/components/Panels/ThemePanel';
import AnalyticsPanel from '@/components/Panels/AnalyticsPanel';
import SEOPanel from '@/components/Panels/SEOPanel';
import CMSPanel from '@/components/Panels/CMSPanel';
import MediaPanel from '@/components/Panels/MediaPanel';
import TeamPanel from '@/components/Panels/TeamPanel';
import VersionPanel from '@/components/Panels/VersionPanel';
import IntegrationsPanel from '@/components/Panels/IntegrationsPanel';
import AIPanel from '@/components/Panels/AIPanel';
import ExportPanel from '@/components/Panels/ExportPanel';
import FormsPanel from '@/components/Panels/FormsPanel';
import SettingsPanel from '@/components/Panels/SettingsPanel';
import PreviewPanel from '@/components/Panels/PreviewPanel';

const panelTitles: Record<string, string> = {
  sections: 'Section Library',
  themes: 'Templates & Themes',
  media: 'Media Library',
  cms: 'Content Management',
  forms: 'Form Submissions',
  seo: 'SEO Settings',
  analytics: 'Analytics',
  team: 'Team Members',
  versions: 'Version History',
  integrations: 'Integrations',
  ai: 'AI Builder',
  export: 'Export Code',
  settings: 'Project Settings',
};

export default function SidePanelManager() {
  const { activePanel, setActivePanel } = useBuilderStore();

  if (!activePanel) return null;

  const renderPanel = () => {
    switch (activePanel) {
      case 'sections': return <SectionsPanel />;
      case 'themes': return <ThemePanel />;
      case 'media': return <MediaPanel />;
      case 'cms': return <CMSPanel />;
      case 'forms': return <FormsPanel />;
      case 'seo': return <SEOPanel />;
      case 'analytics': return <AnalyticsPanel />;
      case 'team': return <TeamPanel />;
      case 'versions': return <VersionPanel />;
      case 'integrations': return <IntegrationsPanel />;
      case 'ai': return <AIPanel />;
      case 'export': return <ExportPanel />;
      case 'settings': return <SettingsPanel />;
      default: return null;
    }
  };

  return (
    <div className="side-panel-manager">
      <div className="side-panel-header">
        <h2 className="side-panel-title">{panelTitles[activePanel] || activePanel}</h2>
        <button 
          className="btn btn-ghost btn-icon" 
          onClick={() => setActivePanel(null)}
          title="Close Panel"
        >
          <X size={18} />
        </button>
      </div>
      <div className="side-panel-content">
        {renderPanel()}
      </div>
    </div>
  );
}
