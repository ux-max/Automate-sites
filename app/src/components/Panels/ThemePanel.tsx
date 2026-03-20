'use client';

import { useThemeStore } from '@/store/themeStore';
import { useBuilderStore } from '@/store/builderStore';
import { templates } from '@/data/templates';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ThemePanel() {
  const { themes, activeThemeId, setActiveTheme } = useThemeStore();
  const { importTemplate } = useBuilderStore();

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
      <div className="template-grid">
        {templates.map(template => (
          <div key={template.id} className="template-card" onClick={() => { importTemplate(template.pages); toast.success(`Template "${template.name}" imported`); }}>
            <div className="preview">{template.preview}</div>
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
