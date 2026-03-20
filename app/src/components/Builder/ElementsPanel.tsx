'use client';

import { useBuilderStore, ElementType, CanvasElement } from '@/store/builderStore';
import {
  Type, Image, Square, FormInput, Video, Columns, Minus,
  MoveVertical, List, Heading, MousePointerClick
} from 'lucide-react';

interface ElementDef {
  type: ElementType;
  label: string;
  icon: React.ReactNode;
  category: string;
  defaultContent: string;
  defaultStyles: CanvasElement['styles'];
}

const elementDefs: ElementDef[] = [
  { type: 'heading', label: 'Heading', icon: <Heading size={20}/>, category: 'Basic',
    defaultContent: 'Heading Text', defaultStyles: { fontSize: '32px', fontWeight: '700', color: 'var(--theme-heading)', marginBottom: '16px', fontFamily: 'var(--theme-font-heading)' } },
  { type: 'text', label: 'Text', icon: <Type size={20}/>, category: 'Basic',
    defaultContent: 'Start typing your paragraph text here. This is a text element you can edit.', defaultStyles: { fontSize: '16px', color: 'var(--theme-text)', lineHeight: '1.7', marginBottom: '12px', fontFamily: 'var(--theme-font-body)' } },
  { type: 'image', label: 'Image', icon: <Image size={20}/>, category: 'Basic',
    defaultContent: '', defaultStyles: { width: '100%', height: '200px', backgroundColor: 'var(--theme-surface)', borderRadius: 'var(--theme-radius)', objectFit: 'cover' } },
  { type: 'button', label: 'Button', icon: <MousePointerClick size={20}/>, category: 'Basic',
    defaultContent: 'Click Me', defaultStyles: { backgroundColor: 'var(--theme-primary)', color: '#ffffff', padding: '12px 24px', borderRadius: 'var(--theme-radius)', fontSize: '15px', fontWeight: '600', display: 'inline-block', borderWidth: '0', fontFamily: 'var(--theme-font-body)' } },
  { type: 'container', label: 'Container', icon: <Square size={20}/>, category: 'Layout',
    defaultContent: '', defaultStyles: { padding: '24px', backgroundColor: 'var(--theme-background)', borderRadius: 'var(--theme-radius)', minHeight: '100px', borderWidth: '1px', borderStyle: 'dashed', borderColor: 'var(--theme-border)' } },
  { type: 'columns', label: 'Columns', icon: <Columns size={20}/>, category: 'Layout',
    defaultContent: '', defaultStyles: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' } },
  { type: 'form', label: 'Form', icon: <FormInput size={20}/>, category: 'Interactive',
    defaultContent: '', defaultStyles: { padding: '24px', backgroundColor: 'var(--theme-surface)', borderRadius: 'var(--theme-radius)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--theme-border)' } },
  { type: 'video', label: 'Video', icon: <Video size={20}/>, category: 'Media',
    defaultContent: 'https://www.youtube.com/embed/dQw4w9WgXcQ', defaultStyles: { width: '100%', height: '315px', borderRadius: 'var(--theme-radius)', backgroundColor: '#1e293b' } },
  { type: 'divider', label: 'Divider', icon: <Minus size={20}/>, category: 'Basic',
    defaultContent: '', defaultStyles: { borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--theme-border)', margin: '16px 0' } },
  { type: 'spacer', label: 'Spacer', icon: <MoveVertical size={20}/>, category: 'Layout',
    defaultContent: '', defaultStyles: { height: '48px' } },
  { type: 'list', label: 'List', icon: <List size={20}/>, category: 'Basic',
    defaultContent: 'Item 1\nItem 2\nItem 3', defaultStyles: { fontSize: '15px', color: 'var(--theme-text)', lineHeight: '2', paddingLeft: '20px', fontFamily: 'var(--theme-font-body)' } },
];

const categories = ['Basic', 'Layout', 'Interactive', 'Media'];

export default function ElementsPanel() {
  const { addElement, pages, activePageId } = useBuilderStore();

  const handleAddElement = (def: ElementDef) => {
    const page = pages.find(p => p.id === activePageId);
    if (!page || page.sections.length === 0) return;
    const sectionId = page.sections[page.sections.length - 1].id;
    addElement(activePageId, sectionId, {
      type: def.type,
      content: def.defaultContent,
      styles: { ...def.defaultStyles },
    });
  };

  return (
    <div>
      {categories.map(cat => {
        const items = elementDefs.filter(e => e.category === cat);
        if (items.length === 0) return null;
        return (
          <div className="sidebar-section" key={cat}>
            <div className="sidebar-section-title">{cat}</div>
            <div className="elements-grid">
              {items.map(def => (
                <div
                  key={def.type}
                  className="element-item"
                  onClick={() => handleAddElement(def)}
                  draggable
                  onDragStart={e => {
                    e.dataTransfer.setData('elementType', JSON.stringify(def));
                  }}
                >
                  {def.icon}
                  {def.label}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
