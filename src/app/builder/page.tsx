'use client';

import { useBuilderStore } from '@/store/builderStore';
import { useProjectStore } from '@/store/projectStore';
import BuilderTopbar from '@/components/Builder/BuilderTopbar';
import SideRail from '@/components/Builder/SideRail';
import Canvas from '@/components/Builder/Canvas';
import PropertiesPanel from '@/components/Builder/PropertiesPanel';
import SidePanelManager from '@/components/Panels/SidePanelManager';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function BuilderPage() {
  const saveHistory = useBuilderStore(s => s.saveHistory);
  const themeMode = useBuilderStore(s => s.themeMode);

  useEffect(() => {
    saveHistory();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          useBuilderStore.getState().redo();
        } else {
          useBuilderStore.getState().undo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveHistory]);

  return (
    <div className="builder-container">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            fontSize: '13px',
          },
        }}
      />
      <BuilderTopbar />
      <div className="builder-body">
        <SideRail />
        <SidePanelManager />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}
