'use client';

import Link from 'next/link';
import { useBuilderStore } from '@/store/builderStore';
import { useProjectStore } from '@/store/projectStore';
import { useProjectsStore } from '@/store/projectsStore';
import {
  Zap, Undo2, Redo2, Eye, Download, Settings, Sun, Moon,
  ChevronLeft, Save, Rocket
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BuilderTopbar() {
  const router = useRouter();
  const { undo, redo, history, historyIndex, setActivePanel, themeMode, toggleThemeMode, saveHistory, pages } = useBuilderStore();
  const { projectName, setProjectName, isPublished, setPublished } = useProjectStore();
  const { addProject, updateProject, projects } = useProjectsStore();

  useEffect(() => {
    document.body.className = themeMode === 'light' ? 'light-mode' : '';
  }, [themeMode]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleSave = (shouldExit = false) => {
    saveHistory();
    
    // Check if project already exists in projectsStore (using name as proxy or add a real ID)
    const existingProject = projects.find(p => p.name === projectName);
    
    if (existingProject) {
      updateProject(existingProject.id, { 
        pages: JSON.parse(JSON.stringify(pages)),
        lastModified: new Date().toISOString() 
      });
    } else {
      addProject({
        id: Date.now().toString(),
        name: projectName,
        description: 'Modified in Builder',
        lastModified: new Date().toISOString(),
        pages: JSON.parse(JSON.stringify(pages)),
        bannerEmoji: '🌐'
      });
    }

    toast.success('Project saved successfully');
    
    if (shouldExit) {
      router.push('/dashboard');
    }
  };

  const handleExit = () => {
    handleSave(true);
  };

  return (
    <div className="builder-topbar">
      <div className="topbar-left">
        <button className="btn btn-ghost btn-sm" onClick={handleExit} style={{ marginRight: '8px' }}>
          <ChevronLeft size={16} /> Exit
        </button>
        <Link href="/dashboard" className="topbar-logo">
          <div className="logo-icon"><Zap size={14} color="white" /></div>
          Automate
        </Link>
        <input
          className="input input-sm"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          style={{ width: '160px', background: 'transparent', border: '1px solid transparent' }}
          onFocus={e => (e.target.style.borderColor = 'var(--border-default)')}
          onBlur={e => (e.target.style.borderColor = 'transparent')}
        />
      </div>

      <div className="topbar-center">
        <button className="btn btn-ghost btn-icon" onClick={undo} disabled={historyIndex <= 0} title="Undo (Ctrl+Z)">
          <Undo2 size={16} />
        </button>
        <button className="btn btn-ghost btn-icon" onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo (Ctrl+Shift+Z)">
          <Redo2 size={16} />
        </button>
      </div>

      <div className="topbar-right">
        <button className="btn btn-ghost btn-icon" onClick={toggleThemeMode} title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => window.open('/preview', '_blank')}>
          <Eye size={14} /> Preview
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => setActivePanel('settings')}>
          <Settings size={14} />
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleSave(false)}>
          <Save size={14} /> Save
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setPublished(true);
            toast.success('Website published successfully!');
          }}
        >
          <Rocket size={14} /> {isPublished ? 'Published' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
