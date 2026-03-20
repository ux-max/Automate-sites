'use client';

import { useBuilderStore } from '@/store/builderStore';
import {
  LayoutGrid, FileText, Palette, Image, Search, BarChart3,
  Users, History, Plug, Bot, Code2, FormInput, Database, Settings
} from 'lucide-react';

const navItems = [
  { id: 'sections', label: 'Sections', icon: <LayoutGrid size={20} /> },
  { id: 'themes', label: 'Themes', icon: <Palette size={20} /> },
  { id: 'forms', label: 'Forms', icon: <FormInput size={20} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export default function SideRail() {
  const { activePanel, setActivePanel } = useBuilderStore();

  return (
    <div className="side-rail">
      <nav className="side-rail-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`side-rail-item \${activePanel === item.id ? 'active' : ''}`}
            onClick={() => setActivePanel(activePanel === item.id ? null : item.id)}
            title={item.label}
          >
            {item.icon}
            <span className="side-rail-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
