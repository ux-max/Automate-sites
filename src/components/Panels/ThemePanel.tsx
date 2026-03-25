'use client';

import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { useBuilderStore } from '@/store/builderStore';
import { templates } from '@/data/templates';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ThemePanel() {
  const { themes, activeThemeId, setActiveTheme } = useThemeStore();
  const { importTemplate } = useBuilderStore();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div>
      <div className="sidebar-section-title" style={{ marginBottom: '12px' }}>Themes</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
        {themes.map(theme => (
          <div
            key={theme.id}
            className="template-card"
            onClick={() => { setActiveTheme(theme.id); toast.success(`Theme "${theme.name}" applied`); }}
            style={{ border: activeThemeId === theme.id ? '2px solid var(--primary-500)' : undefined }}
          >
            <div className="preview" style={{ height: '80px', background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` }}>
              {activeThemeId === theme.id && <Check size={24} color="white" />}
            </div>
            <div className="info">
              <h4>{theme.name}</h4>
              <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                {Object.values(theme.colors).slice(0, 5).map((c, i) => (
                  <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: c, border: '1px solid var(--border-subtle)' }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divider" style={{ margin: '24px 0' }} />

      <div className="sidebar-section-title" style={{ marginBottom: '12px' }}>Templates</div>
      
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backgroundColor: activeCategory === cat ? 'var(--primary-500, #3b82f6)' : 'var(--bg-tertiary)',
              color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
              border: activeCategory === cat ? 'none' : '1px solid var(--border-subtle)',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="template-grid">
        {filteredTemplates.map(template => (
          <div key={template.id} className="template-card" onClick={() => { importTemplate(template.pages); toast.success(`Template "${template.name}" imported`); }}>
            <div className="preview" style={{ padding: 0, overflow: 'hidden', height: '140px' }}>
              <img src={template.preview} alt={template.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80'; }} />
            </div>
            <div className="info">
              <h4>{template.name}</h4>
              <p>{template.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
