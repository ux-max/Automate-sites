'use client';

import { useBuilderStore } from '@/store/builderStore';
import { useThemeStore } from '@/store/themeStore';
import { ExternalLink } from 'lucide-react';

const getThemedStyle = (style: any) => {
  if (!style) return style;
  const s = { ...style };
  if (s.color === '#0f172a') s.color = 'var(--theme-heading)';
  if (s.color === '#475569' || s.color === '#64748b') s.color = 'var(--theme-text)';
  if (s.backgroundColor === '#3b82f6' || s.backgroundColor === '#1e40af') s.backgroundColor = 'var(--theme-primary)';
  if (s.backgroundColor === '#ffffff' || s.backgroundColor === '#f8fafc' || s.backgroundColor === '#fafafa' || s.backgroundColor === '#f9fafb') {
    s.backgroundColor = 'var(--theme-background)';
  }
  return s;
};

export default function PreviewPanel() {
  const { pages, activePageId } = useBuilderStore();
  const theme = useThemeStore(s => s.themes.find(t => t.id === s.activeThemeId) || s.themes[0]);
  const page = pages.find(p => p.id === activePageId);

  if (!page) return null;

  const themeVars = {
    '--theme-primary': theme.colors.primary,
    '--theme-secondary': theme.colors.secondary,
    '--theme-background': theme.colors.background,
    '--theme-surface': theme.colors.surface,
    '--theme-text': theme.colors.text,
    '--theme-text-secondary': theme.colors.textSecondary,
    '--theme-heading': theme.colors.heading,
    '--theme-border': theme.colors.border,
    '--theme-font-heading': theme.fonts.heading,
    '--theme-font-body': theme.fonts.body,
    '--theme-radius': theme.borderRadius,
  } as React.CSSProperties;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          This is a preview of how your website will look (Reactive Theme Enabled).
        </p>
        <button className="btn btn-secondary btn-sm" onClick={() => window.open(page.path, '_blank')}>
          <ExternalLink size={14} /> Open in new tab
        </button>
      </div>

      <div 
        className="preview-frame"
        style={{ 
          ...themeVars,
          flex: 1, 
          background: 'var(--theme-background)',
          color: 'var(--theme-text)',
          fontFamily: 'var(--theme-font-body)',
          borderRadius: '12px',
          overflowY: 'auto',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {page.sections.map(s => (
          <section key={s.id} style={getThemedStyle(s.styles) as React.CSSProperties}>
            {s.elements.map(e => {
              const elStyles = getThemedStyle(e.styles) as React.CSSProperties;
              if (e.type === 'heading') return <h2 key={e.id} style={{ margin: 0, fontFamily: 'var(--theme-font-heading)', color: 'var(--theme-heading)', ...elStyles }}>{e.content}</h2>;
              if (e.type === 'text') return <p key={e.id} style={{ margin: 0, fontFamily: 'var(--theme-font-body)', color: 'var(--theme-text)', ...elStyles }}>{e.content}</p>;
              if (e.type === 'button') return <button key={e.id} style={{ cursor: 'pointer', backgroundColor: 'var(--theme-primary)', color: 'white', border: 'none', borderRadius: 'var(--theme-radius)', fontFamily: 'var(--theme-font-body)', ...elStyles }}>{e.content}</button>;
              if (e.type === 'image') return <img key={e.id} src={e.content || 'https://via.placeholder.com/800x400'} alt="" style={elStyles} />;
              return <div key={e.id} style={elStyles}>{e.content || `[${e.type}]`}</div>;
            })}
          </section>
        ))}
      </div>
    </div>
  );
}
