'use client';

import { useBuilderStore, CanvasElement, PageSection } from '@/store/builderStore';
import { useThemeStore } from '@/store/themeStore';
import { Monitor, Tablet, Smartphone, Plus, Trash2, GripVertical, Settings } from 'lucide-react';
import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const getThemedStyle = (style: any) => {
  if (!style) return style;
  const s = { ...style };
  if (s.color === '#0f172a') s.color = 'var(--theme-heading)';
  if (s.color === '#475569' || s.color === '#64748b') s.color = 'var(--theme-text)';
  if (s.backgroundColor === '#3b82f6' || s.backgroundColor === '#1e40af') s.backgroundColor = 'var(--theme-primary)';
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
  
  // Add parameters for background-video like behavior if it's a YouTube link
  if (embedUrl.includes('youtube.com/embed/')) {
    const separator = embedUrl.includes('?') ? '&' : '?';
    // mute=1 is required for autoplay in most browsers
    embedUrl = `${embedUrl}${separator}autoplay=1&mute=1&loop=1&controls=0&modestbranding=1`;
    // For loop to work, we also need the playlist parameter with the same video ID
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

function RenderElement({ element, sectionId, pageId, isMenuOpen, toggleMenu }: { element: CanvasElement; sectionId: string; pageId: string; isMenuOpen?: boolean; toggleMenu?: () => void }) {
  const { selectElement, selectedElementId, hoveredElementId, hoverElement } = useBuilderStore();
  const isSelected = selectedElementId === element.id;
  const isHovered = hoveredElementId === element.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: element.id,
    data: {
      type: 'element',
      sectionId,
      elementId: element.id
    }
  });

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  // Merge device-specific styles
  const { deviceView } = useBuilderStore();
  const mergedStyles = useMemo(() => {
    const baseFields = element.styles || {};
    const tabletFields = element.tabletStyles || {};
    const mobileFields = element.mobileStyles || {};

    if (deviceView === 'mobile') {
      return { ...baseFields, ...tabletFields, ...mobileFields };
    }
    if (deviceView === 'tablet') {
      return { ...baseFields, ...tabletFields };
    }
    return baseFields;
  }, [element, deviceView]);

  const elStyle = formatStyle(mergedStyles);

  const visibilityClass = [
    element.hidden?.desktop ? 'hide-desktop' : '',
    element.hidden?.tablet ? 'hide-tablet' : '',
    element.hidden?.mobile ? 'hide-mobile' : '',
  ].filter(Boolean).join(' ');

  const elementClassName = [
    element.props?.mobileMenu ? 'mobile-menu-content' : '',
    visibilityClass,
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    
    switch (element.type) {
      case 'heading':
        return (
          <h2 
            style={{ fontFamily: 'var(--theme-font-heading)', color: 'var(--theme-heading)', margin: 0, cursor: element.props?.link ? 'pointer' : 'inherit', ...elStyle }} 
            suppressContentEditableWarning 
            contentEditable 
            title={element.props?.link ? `Redirects to: ${element.props.link}` : ''}
          >
            {element.content}
          </h2>
        );
      case 'text':
        return (
          <p 
            style={{ fontFamily: 'var(--theme-font-body)', color: 'var(--theme-text)', margin: 0, cursor: element.props?.link ? 'pointer' : 'inherit', ...elStyle }} 
            suppressContentEditableWarning 
            contentEditable 
            title={element.props?.link ? `Redirects to: ${element.props.link}` : ''}
          >
            {element.content}
          </p>
        );
      case 'button':
        return (
          <button 
            style={{ cursor: 'pointer', border: 'none', backgroundColor: 'var(--theme-primary)', color: 'white', fontFamily: 'var(--theme-font-body)', borderRadius: 'var(--theme-radius)', ...elStyle }}
            title={element.props?.link ? `Redirects to: ${element.props.link}` : ''}
          >
            {element.content}
          </button>
        );
      case 'image':
        return (
          <div style={{ ...elStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px' }}>
            {element.content ? <img src={element.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: elStyle.borderRadius }} /> : '🖼 Image Placeholder'}
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
                  pointerEvents: 'none', // Allow clicking through background video to select section
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
        return (
          <div style={{ ...elStyle, flexWrap: 'wrap' }}>
            <SortableContext 
              items={element.children?.map(c => c.id) || []}
              strategy={rectSortingStrategy}
            >
              {element.children?.map(c => (
                <RenderElement key={c.id} element={c} sectionId={sectionId} pageId={pageId} />
              )) || <span style={{ color: '#94a3b8', fontSize: '13px' }}>Drop elements here</span>}
            </SortableContext>
          </div>
        );
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
        return <hr style={{ border: 'none', borderTop: `${elStyle.borderWidth || '1px'} ${elStyle.borderStyle || 'solid'} ${elStyle.borderColor || '#e2e8f0'}`, ...elStyle }} />;
      case 'spacer':
        return <div style={{ height: '48px', ...elStyle }} />;
      case 'icon':
        return <div style={{ ...elStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{element.content}</div>;
      case 'list':
        return (
          <ul style={{ ...elStyle, margin: 0, listStyleType: 'disc' }} className={elementClassName}>
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
        return <div>{element.content}</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={sortableStyle}
      className={`canvas-element ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => hoverElement(element.id)}
      onMouseLeave={() => hoverElement(null)}
    >
      <div className="element-controls">
        <div className="drag-handle" {...attributes} {...listeners} style={{ padding: '4px 8px', cursor: 'grab' }}>
          <GripVertical size={14} />
        </div>
        <span className="element-label" style={{ fontWeight: '600' }}>{element.type}</span>
      </div>
      <div className={elementClassName}>
        {renderContent()}
      </div>
    </div>
  );
}

function RenderSection({ section, pageId }: { section: PageSection; pageId: string }) {
  const { addElement, selectElement, selectSection, deleteSection, selectedSectionId, deviceView } = useBuilderStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isSelected = selectedSectionId === section.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: section.id,
    data: {
      type: 'section',
      sectionId: section.id
    }
  });

  const sectionStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 100 : 'auto',
    ...formatStyle(section.styles)
  };

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

  const anim = animationVariants[section.styles?.animationType || 'none'] || animationVariants.none;

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
    <motion.div
      ref={setNodeRef}
      style={sectionStyle}
      initial={anim.initial}
      animate={anim.animate}
      transition={{ 
        delay: Number(section.styles?.animationDelay) || 0, 
        duration: Number(section.styles?.animationDuration) || 0.5,
        ease: 'easeOut'
      }}
      className={`canvas-section ${isSelected ? 'selected' : ''} ${isMobileMenuOpen && deviceView === 'mobile' ? 'is-mobile-menu-open' : ''}`}
      onClick={(e) => { e.stopPropagation(); selectSection(section.id); }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="section-controls">
        <div className="section-drag-handle" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </div>
        <div className="section-actions">
          <button className="section-action-btn" onClick={(e) => { e.stopPropagation(); deleteSection(pageId, section.id); }}>
            <Trash2 size={14} />
          </button>
          <button className="section-action-btn" onClick={(e) => { e.stopPropagation(); selectSection(section.id); }}>
            <Settings size={14} />
          </button>
        </div>
      </div>
      
      {section.elements.length === 0 ? (
        <div className="drop-placeholder">
          <Plus size={16} style={{ marginRight: '8px' }} /> Drop elements here or click from the sidebar
        </div>
      ) : (
        <SortableContext 
          items={section.elements.map(el => el.id)}
          strategy={rectSortingStrategy}
        >
          {section.elements.map(el => (
            <RenderElement 
              key={el.id} 
              element={el} 
              sectionId={section.id} 
              pageId={pageId} 
              isMenuOpen={isMobileMenuOpen}
              toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          ))}
        </SortableContext>
      )}
    </motion.div>
  );
}

export default function Canvas() {
  const { 
    pages, 
    activePageId, 
    deviceView, 
    setDeviceView, 
    addSection, 
    selectElement,
    moveSection,
    moveElement
  } = useBuilderStore();
  
  const theme = useThemeStore(s => s.themes.find(t => t.id === s.activeThemeId) || s.themes[0]);
  const page = pages.find(p => p.id === activePageId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over?.data.current;

    if (activeData?.type === 'section') {
      const oldIndex = page?.sections.findIndex(s => s.id === active.id) ?? -1;
      // If dropping over a section, use its index. If dropping over an element, find its section's index.
      let newIndex = -1;
      if (overData?.type === 'section') {
        newIndex = page?.sections.findIndex(s => s.id === over.id) ?? -1;
      } else if (overData?.type === 'element') {
        newIndex = page?.sections.findIndex(s => s.id === overData.sectionId) ?? -1;
      }
      
      if (oldIndex !== -1 && newIndex !== -1) {
        moveSection(activePageId, oldIndex, newIndex);
      }
    } else if (activeData?.type === 'element') {
      moveElement(activePageId, active.id.toString(), over.id.toString());
    }
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const sectionDataRaw = e.dataTransfer.getData('sectionData');
    if (!sectionDataRaw) return;

    try {
      const sectionData = JSON.parse(sectionDataRaw);
      
      // Calculate insert index based on drop Y position
      const canvasFrame = e.currentTarget.getBoundingClientRect();
      const dropY = e.clientY - canvasFrame.top;
      
      const sectionElements = Array.from(e.currentTarget.querySelectorAll('.canvas-section'));
      let insertIndex = page?.sections.length || 0;
      
      for (let i = 0; i < sectionElements.length; i++) {
        const rect = sectionElements[i].getBoundingClientRect();
        const centerY = rect.top - canvasFrame.top + rect.height / 2;
        if (dropY < centerY) {
          insertIndex = i;
          break;
        }
      }

      addSection(activePageId, sectionData, insertIndex);
      toast.success('Section added');
    } catch (err) {
      console.error('Failed to parse section data', err);
    }
  };

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
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div 
          className="canvas-wrapper" 
          onClick={() => selectElement(null)}
          onDragOver={handleCanvasDragOver}
          onDrop={handleCanvasDrop}
        >
          <div 
            className={`canvas-frame responsive-render ${deviceView}`}
            style={{ 
              ...themeVars,
              background: 'var(--theme-background)',
              color: 'var(--theme-text)',
              fontFamily: 'var(--theme-font-body)',
              minHeight: '100%',
              paddingBottom: '100px', // Extra space at bottom
            }}
          >
            <SortableContext 
              items={page?.sections.map(s => s.id) || []}
              strategy={verticalListSortingStrategy}
            >
              {page?.sections.map(section => (
                <RenderSection 
                  key={`${section.id}-${section.styles?.animationType || 'none'}-${section.styles?.animationDelay || 0}-${section.styles?.animationDuration || 0}`} 
                  section={section} 
                  pageId={activePageId} 
                />
              ))}
            </SortableContext>

            {(!page || !page.sections || page.sections.length === 0) && (
              <div className="canvas-empty">
                <LayoutGridIcon />
                <p>Your canvas is empty</p>
                <span>Add a section or drag elements from the sidebar</span>
              </div>
            )}
          </div>
        </div>
      </DndContext>
    </div>
  );
}

function LayoutGridIcon() {
  return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
}
