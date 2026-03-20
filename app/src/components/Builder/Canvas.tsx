'use client';

import { useBuilderStore, CanvasElement, PageSection } from '@/store/builderStore';
import { useThemeStore } from '@/store/themeStore';
import { Monitor, Tablet, Smartphone, Plus, Trash2, GripVertical } from 'lucide-react';
import { useCallback } from 'react';

const getThemedStyle = (style: any) => {
  if (!style) return style;
  const s = { ...style };
  // Only remap legacy hard-coded text/primary colors, 
  // but do NOT remap backgrounds — section definitions use explicit backgrounds intentionally
  if (s.color === '#0f172a') s.color = 'var(--theme-heading)';
  if (s.color === '#475569' || s.color === '#64748b') s.color = 'var(--theme-text)';
  if (s.backgroundColor === '#3b82f6' || s.backgroundColor === '#1e40af') s.backgroundColor = 'var(--theme-primary)';
  return s;
};

function RenderElement({ element, sectionId, pageId }: { element: CanvasElement; sectionId: string; pageId: string }) {
  const { selectElement, selectedElementId, hoveredElementId, hoverElement, deleteElement } = useBuilderStore();
  const theme = useThemeStore(s => s.themes.find(t => t.id === s.activeThemeId) || s.themes[0]);
  const isSelected = selectedElementId === element.id;
  const isHovered = hoveredElementId === element.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  const renderContent = () => {
    const elStyle = getThemedStyle(element.styles) as React.CSSProperties;
    
    switch (element.type) {
      case 'heading':
        return <h2 style={{ margin: 0, fontFamily: 'var(--theme-font-heading)', color: 'var(--theme-heading)', ...elStyle }} suppressContentEditableWarning contentEditable>{element.content}</h2>;
      case 'text':
        return <p style={{ margin: 0, fontFamily: 'var(--theme-font-body)', color: 'var(--theme-text)', ...elStyle }} suppressContentEditableWarning contentEditable>{element.content}</p>;
      case 'button':
        return <button style={{ cursor: 'pointer', border: 'none', backgroundColor: 'var(--theme-primary)', color: 'white', fontFamily: 'var(--theme-font-body)', borderRadius: 'var(--theme-radius)', ...elStyle }}>{element.content}</button>;
      case 'image':
        return (
          <div style={{ ...elStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px' }}>
            {element.content ? <img src={element.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: elStyle.borderRadius }} /> : '🖼 Image Placeholder'}
          </div>
        );
      case 'video':
        return (
          <div style={{ ...elStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            {element.content ? (
              <iframe src={element.content} style={{ width: '100%', height: '100%', border: 'none', borderRadius: elStyle.borderRadius }} allowFullScreen />
            ) : '🎬 Video Placeholder'}
          </div>
        );
      case 'container':
        return <div style={{ ...elStyle }}>{element.children?.map(c => (
          <RenderElement key={c.id} element={c} sectionId={sectionId} pageId={pageId} />
        )) || <span style={{ color: '#94a3b8', fontSize: '13px' }}>Drop elements here</span>}</div>;
      case 'columns':
        return (
          <div style={{ ...elStyle }}>
            {(element.props?.children as { title: string; desc: string }[])?.map((col, i) => (
              <div key={i} style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>{col.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{col.desc}</p>
              </div>
            )) || (
              <>
                <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #e2e8f0', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Column 1</div>
                <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #e2e8f0', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Column 2</div>
              </>
            )}
          </div>
        );
      case 'form':
        return (
          <div style={{ ...elStyle }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Name</label>
              <input type="text" placeholder="Enter your name" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} readOnly />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Email</label>
              <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} readOnly />
            </div>
            <button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>Submit</button>
          </div>
        );
      case 'divider':
        return <hr style={{ border: 'none', borderTop: `\${elStyle.borderWidth || '1px'} \${elStyle.borderStyle || 'solid'} \${elStyle.borderColor || '#e2e8f0'}`, margin: elStyle.margin }} />;
      case 'spacer':
        return <div style={{ height: elStyle.height || '48px' }} />;
      case 'list':
        return (
          <ul style={{ ...elStyle, margin: 0, listStyleType: 'disc' }}>
            {element.content.split('\\n').map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      default:
        return <div>{element.content}</div>;
    }
  };

  return (
    <div
      className={`canvas-element ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => hoverElement(element.id)}
      onMouseLeave={() => hoverElement(null)}
      style={{ position: 'relative' }}
    >
      <span className="element-label">{element.type}</span>
      {renderContent()}
    </div>
  );
}

function RenderSection({ section, pageId }: { section: PageSection; pageId: string }) {
  const { addSection, deleteSection, selectElement, addElement } = useBuilderStore();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer.getData('elementType');
    if (data) {
      try {
        const def = JSON.parse(data);
        addElement(pageId, section.id, { type: def.type, content: def.defaultContent, styles: { ...def.defaultStyles } });
      } catch {}
    }
  }, [pageId, section.id, addElement]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drop-target');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('drop-target');
  };

  return (
    <div
      className="canvas-section"
      style={getThemedStyle(section.styles) as React.CSSProperties}
      onClick={(e) => { e.stopPropagation(); selectElement(null); }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {section.elements.length === 0 ? (
        <div className="drop-placeholder">
          <Plus size={16} style={{ marginRight: '8px' }} /> Drop elements here or click from the sidebar
        </div>
      ) : (
        section.elements.map(el => (
          <RenderElement key={el.id} element={el} sectionId={section.id} pageId={pageId} />
        ))
      )}
    </div>
  );
}

export default function Canvas() {
  const { pages, activePageId, deviceView, setDeviceView, addSection, selectElement } = useBuilderStore();
  const theme = useThemeStore(s => s.themes.find(t => t.id === s.activeThemeId) || s.themes[0]);
  const page = pages.find(p => p.id === activePageId);

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
    <div className="canvas-area">
      <div className="canvas-toolbar">
        <div className="device-toggle">
          <button className={`device-btn ${deviceView === 'desktop' ? 'active' : ''}`} onClick={() => setDeviceView('desktop')}>
            <Monitor size={14} /> Desktop
          </button>
          <button className={`device-btn ${deviceView === 'tablet' ? 'active' : ''}`} onClick={() => setDeviceView('tablet')}>
            <Tablet size={14} /> Tablet
          </button>
          <button className={`device-btn ${deviceView === 'mobile' ? 'active' : ''}`} onClick={() => setDeviceView('mobile')}>
            <Smartphone size={14} /> Mobile
          </button>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => addSection(activePageId)}>
          <Plus size={14} /> Add Section
        </button>
      </div>
      <div className="canvas-wrapper" onClick={() => selectElement(null)}>
        <div 
          className={`canvas-frame ${deviceView}`}
          style={{ 
            ...themeVars,
            background: 'var(--theme-background)',
            color: 'var(--theme-text)',
            fontFamily: 'var(--theme-font-body)',
            minHeight: '100%',
          }}
        >
          {page?.sections.map(section => (
            <RenderSection key={section.id} section={section} pageId={activePageId} />
          ))}
          {(!page?.sections || page.sections.length === 0) && (
            <div className="canvas-empty">
              <LayoutGridIcon />
              <p>Your canvas is empty</p>
              <span>Add a section or drag elements from the sidebar</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LayoutGridIcon() {
  return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
}
