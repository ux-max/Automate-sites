'use client';

import { useBuilderStore, CanvasElement, PageSection } from '@/store/builderStore';
import { useThemeStore } from '@/store/themeStore';
import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const getEmbedUrl = (url: string) => {
  if (!url) return '';
  let embedUrl = url;
  if (url.includes('youtube.com/watch?v=')) {
    embedUrl = url.replace('watch?v=', 'embed/');
  } else if (url.includes('youtu.be/')) {
    embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/');
  }
  
  if (embedUrl.includes('youtube.com/embed/')) {
    const separator = embedUrl.includes('?') ? '&' : '?';
    embedUrl = `${embedUrl}${separator}autoplay=1&mute=1&loop=1&controls=0&modestbranding=1`;
    const videoIdMatch = embedUrl.match(/\/embed\/([^/?]+)/);
    if (videoIdMatch) {
      embedUrl = `${embedUrl}&playlist=${videoIdMatch[1]}`;
    }
  }
  return embedUrl;
};

const formatStyle = (style: any): React.CSSProperties => {
  if (!style) return {};
  const s = getThemedStyle(style);
  const formatted: any = {};
  
  const unitNeeded = [
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'fontSize', 'borderRadius', 'borderWidth', 'gap', 'width', 'height', 'maxWidth', 'minHeight',
    'top', 'right', 'bottom', 'left'
  ];

  Object.keys(s).forEach(key => {
    let val = s[key];
    if (unitNeeded.includes(key) && val && !isNaN(Number(val)) && typeof val !== 'number') {
      formatted[key] = `${val}px`;
    } else if (unitNeeded.includes(key) && typeof val === 'number') {
      formatted[key] = `${val}px`;
    } else {
      formatted[key] = val;
    }
  });

  return formatted;
};

function PreviewElement({ element, device, isMenuOpen, toggleMenu }: { element: CanvasElement; device: 'desktop' | 'tablet' | 'mobile'; isMenuOpen?: boolean; toggleMenu?: () => void }) {
  // Merge device-specific styles
  const mergedStyles = useMemo(() => {
    const baseFields = element.styles || {};
    const tabletFields = element.tabletStyles || {};
    const mobileFields = element.mobileStyles || {};

    if (device === 'mobile') {
      return { ...baseFields, ...tabletFields, ...mobileFields };
    }
    if (device === 'tablet') {
      return { ...baseFields, ...tabletFields };
    }
    return baseFields;
  }, [element, device]);

  const elStyle = formatStyle(mergedStyles);
  
  const visibilityClass = [
    element.hidden?.desktop ? 'hide-desktop' : '',
    element.hidden?.tablet ? 'hide-tablet' : '',
    element.hidden?.mobile ? 'hide-mobile' : '',
  ].filter(Boolean).join(' ');

  const elementClassName = [
    element.props?.mobileMenu ? 'mobile-menu-content' : '',
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    switch (element.type) {
      case 'heading':
        return <h2 onClick={(e) => { if (element.props?.link) { e.stopPropagation(); window.location.href = element.props.link as string; } }} style={{ margin: 0, fontFamily: 'var(--theme-font-heading)', color: 'var(--theme-heading)', cursor: element.props?.link ? 'pointer' : 'inherit', ...elStyle }} title={element.props?.link ? `Redirects to: ${element.props.link}` : ''}>{element.content}</h2>;
      case 'text':
        return <p onClick={(e) => { if (element.props?.link) { e.stopPropagation(); window.location.href = element.props.link as string; } }} style={{ margin: 0, fontFamily: 'var(--theme-font-body)', color: 'var(--theme-text)', cursor: element.props?.link ? 'pointer' : 'inherit', ...elStyle }} title={element.props?.link ? `Redirects to: ${element.props.link}` : ''}>{element.content}</p>;
      case 'button':
        return (
          <button onClick={(e) => { if (element.props?.link) { e.stopPropagation(); window.location.href = element.props.link as string; } }} style={{ cursor: 'pointer', border: 'none', backgroundColor: 'var(--theme-primary)', color: 'white', fontFamily: 'var(--theme-font-body)', borderRadius: 'var(--theme-radius)', ...elStyle }} title={element.props?.link ? `Redirects to: ${element.props.link}` : ''}>
            {element.content}
          </button>
        );
      case 'image':
        return (
          <div onClick={(e) => { if (element.props?.link) { e.stopPropagation(); window.location.href = element.props.link as string; } }} style={{ cursor: element.props?.link ? 'pointer' : 'inherit', ...elStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px' }} title={element.props?.link ? `Redirects to: ${element.props.link}` : ''}>
            {element.content ? <img src={element.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: elStyle.borderRadius }} /> : '🖼 Image Placeholder'}
          </div>
        );
      case 'icon':
        return (
          <div style={{ ...elStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {element.content}
          </div>
        );
      case 'video':
        const videoSrc = getEmbedUrl(element.content);
        return (
          <div style={{ ...elStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', overflow: 'hidden' }}>
            {element.content ? (
              <iframe 
                src={videoSrc} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  border: 'none', 
                  borderRadius: elStyle.borderRadius,
                  pointerEvents: 'none',
                  position: elStyle.position === 'absolute' ? 'absolute' : 'relative',
                  top: 0,
                  left: 0,
                  objectFit: 'cover'
                }} 
                allow="autoplay; fullscreen" 
              />
            ) : '🎬 Video Placeholder'}
          </div>
        );
      case 'container':
        const maxLinks = element.props?.maxVisibleLinks ? parseInt(element.props.maxVisibleLinks, 10) : 0;
        const hasDropdown = maxLinks > 0 && element.children && element.children.length > maxLinks;

        return (
          <div style={{ ...elStyle, flexWrap: 'wrap' }} className={elementClassName}>
            {hasDropdown && element.children ? (
              <>
                {element.children.slice(0, maxLinks).map(c => (
                  <PreviewElement key={c.id} element={c} device={device} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                ))}
                <div className="nav-dropdown" style={{ display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}>
                  <span style={{ 
                    padding: '0 12px', 
                    fontWeight: '600', 
                    color: 'var(--theme-text)', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%'
                  }}>More ▼</span>
                  <div className="nav-dropdown-content">
                    {element.children.slice(maxLinks).map(c => (
                      <PreviewElement key={c.id} element={c} device={device} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                    ))}
                  </div>
                </div>
              </>
            ) : element.children && element.children.length > 0 ? (
              element.children.map(c => <PreviewElement key={c.id} element={c} device={device} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />)
            ) : (
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>Drop elements here</span>
            )}
          </div>
        );
      case 'columns':
        return (
          <div style={{ ...elStyle }}>
            {(element.props?.children as { title: string; desc: string }[])?.map((col, i) => (
              <div key={i} style={{ padding: '24px', backgroundColor: 'var(--theme-surface)', borderRadius: '12px', border: '1px solid var(--theme-border)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--theme-heading)', marginBottom: '8px' }}>{col.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--theme-text)', lineHeight: '1.6', margin: 0 }}>{col.desc}</p>
              </div>
            )) || (
              <>
                <div style={{ padding: '24px', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px dashed var(--theme-border)', textAlign: 'center', color: 'var(--theme-text-secondary)', fontSize: '13px' }}>Column 1</div>
                <div style={{ padding: '24px', backgroundColor: 'var(--theme-surface)', borderRadius: '8px', border: '1px dashed var(--theme-border)', textAlign: 'center', color: 'var(--theme-text-secondary)', fontSize: '13px' }}>Column 2</div>
              </>
            )}
          </div>
        );
      case 'form':
        const buttonText = element.content || 'Submit';
        const fields = (element.props?.fields as { label: string; placeholder: string; type: string }[]) || [
          { label: 'Name', placeholder: 'Enter your name', type: 'text' },
          { label: 'Email', placeholder: 'Enter your email', type: 'email' }
        ];
        return (
          <div style={{ ...elStyle }}>
            {fields.map((field, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--theme-text)', marginBottom: '4px' }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--theme-border)', borderRadius: '8px', fontSize: '14px', backgroundColor: 'var(--theme-background)', color: 'var(--theme-text)' }} readOnly />
              </div>
            ))}
            <button style={{ backgroundColor: 'var(--theme-primary)', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>{buttonText}</button>
          </div>
        );
      case 'divider':
        return <hr style={{ border: 'none', borderTop: `${elStyle.borderWidth || '1px'} ${elStyle.borderStyle || 'solid'} ${elStyle.borderColor || 'var(--theme-border)'}`, ...elStyle }} />;
      case 'spacer':
        return <div style={{ height: '48px', ...elStyle }} />;
      case 'list':
        return (
          <ul style={{ ...elStyle, margin: 0, listStyleType: 'disc', paddingLeft: '24px' }} className={elementClassName}>
            {element.content.split('\n').map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      case 'hamburger':
        return (
          <div 
            className="hamburger-toggle" 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', ...elStyle }}
            onClick={(e) => { e.stopPropagation(); toggleMenu?.(); }}
          >
            <div style={{ fontSize: '24px' }}>{isMenuOpen ? '✕' : '☰'}</div>
          </div>
        );
      default:
        return <div style={elStyle}>{element.content}</div>;
    }
  };

  return (
    <div className={`canvas-element ${visibilityClass} ${elementClassName}`}>
      {renderContent()}
    </div>
  );
}

const animationVariants: Record<string, { initial: any; animate: any }> = {
  none: { initial: {}, animate: {} },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  slideUp: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
  slideDown: { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 } },
  slideLeft: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  slideRight: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  scaleUp: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
  zoomIn: { initial: { opacity: 0, scale: 1.2 }, animate: { opacity: 1, scale: 1 } },
  blurIn: { initial: { opacity: 0, filter: 'blur(10px)' }, animate: { opacity: 1, filter: 'blur(0px)' } },
};

export default function PreviewPage() {
  const { pages, activePageId } = useBuilderStore();
  const theme = useThemeStore(s => s.themes.find(t => t.id === s.activeThemeId) || s.themes[0]);
  const page = pages.find(p => p.id === activePageId);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSectionMenu = (sectionId: string) => {
    setOpenMenus(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setDevice('mobile');
      else if (window.innerWidth <= 1024) setDevice('tablet');
      else setDevice('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themeVars = useMemo(() => ({
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
  } as React.CSSProperties), [theme]);

  if (!page) return <div style={{ padding: '40px', textAlign: 'center' }}>No page content found.</div>;

  return (
    <div className="responsive-render preview-mode" style={{ ...themeVars, minHeight: '100vh', background: 'var(--theme-background)', color: 'var(--theme-text)', fontFamily: 'var(--theme-font-body)' }}>
      {page.sections.map(s => {
        const anim = animationVariants[s.styles?.animationType || 'none'] || animationVariants.none;
        return (
          <motion.section 
            key={s.id} 
            id={s.id}
            className={`canvas-section ${openMenus[s.id] && device === 'mobile' ? 'is-mobile-menu-open' : ''}`}
            style={{ position: 'relative', zIndex: openMenus[s.id] ? 1000 : 'auto', ...formatStyle(s.styles) }}
            initial={anim.initial}
            animate={anim.animate}
            transition={{ 
              delay: Number(s.styles?.animationDelay) || 0, 
              duration: Number(s.styles?.animationDuration) || 0.5,
              ease: 'easeOut'
            }}
          >
            {device !== 'mobile' ? (
              s.elements.map(e => (
                <PreviewElement 
                  key={e.id} 
                  element={e} 
                  device={device} 
                  isMenuOpen={!!openMenus[s.id]}
                  toggleMenu={() => toggleSectionMenu(s.id)}
                />
              ))
            ) : (
              <>
                {/* Regular elements (not mobile menu items) */}
                {s.elements.filter(e => !e.props?.mobileMenu && e.type !== 'hamburger').map(e => (
                  <PreviewElement 
                    key={e.id} 
                    element={e} 
                    device={device} 
                    isMenuOpen={!!openMenus[s.id]}
                    toggleMenu={() => toggleSectionMenu(s.id)}
                  />
                ))}
                
                {/* Explicit Hamburger Toggle */}
                {s.elements.filter(e => e.type === 'hamburger').map(e => (
                  <PreviewElement 
                    key={e.id} 
                    element={e} 
                    device={device} 
                    isMenuOpen={!!openMenus[s.id]}
                    toggleMenu={() => toggleSectionMenu(s.id)}
                  />
                ))}

                {/* Mobile Menu Wrapper */}
                {openMenus[s.id] && (
                  <div className="mobile-menu-wrapper">
                    {s.elements.filter(e => e.props?.mobileMenu).map(e => (
                      <PreviewElement 
                        key={e.id} 
                        element={e} 
                        device={device} 
                        isMenuOpen={true}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.section>
        );
      })}
    </div>
  );
}
