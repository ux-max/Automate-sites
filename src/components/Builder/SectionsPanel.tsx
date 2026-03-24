'use client';

import { useBuilderStore } from '@/store/builderStore';
import { sectionLibrary, SectionLibraryItem } from '@/data/sections';
import * as Icons from 'lucide-react';
import { Info, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const DynamicIcon = ({ name, size = 20, className = "" }: { name?: string; size?: number; className?: string }) => {
  const Icon = (Icons as any)[name || 'LayoutTemplate'] || Icons.LayoutTemplate;
  return <Icon size={size} className={className} />;
};

export default function SectionsPanel() {
  const { addSection, activePageId } = useBuilderStore();
  const [tooltipData, setTooltipData] = useState<{ id: string, desc: string, x: number, y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories: SectionLibraryItem['category'][] = [
    'Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'Content', 
    'Team', 'Stats', 'Logos', 'Portfolio', 'Contact', 'Footer', 'CTA', 'Services', 'Newsletter', 'Header'
  ];

  const handleAddSection = (section: SectionLibraryItem) => {
    addSection(activePageId, section.data);
  };

  return (
    <div className="sections-panel">
      <p className="sidebar-description">
        Add pre-built sections to your page. Every element is fully editable.
      </p>

      {categories.map(cat => {
        const sections = sectionLibrary.filter(s => s.category === cat);
        if (sections.length === 0) return null;

        return (
          <div className="sidebar-section" key={cat}>
            <div className="sidebar-section-title">{cat}</div>
            <div className="sections-list">
              {sections.map(section => (
                <div 
                  key={section.id} 
                  className="section-item"
                  onClick={() => handleAddSection(section)}
                  draggable
                  onDragStart={e => {
                    e.dataTransfer.setData('sectionData', JSON.stringify(section.data));
                    setTooltipData(null); // Hide tooltip on drag begin
                  }}
                >
                  <div className="section-item-preview">
                    <DynamicIcon name={section.previewIcon} size={22} className="text-secondary" />
                  </div>
                  <div className="section-item-info">
                    <div className="section-item-name-row">
                      <span className="section-item-name">{section.name}</span>
                      <div 
                        className="section-info-trigger"
                        onMouseEnter={(e) => {
                          if (!section.description) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltipData({
                            id: section.id,
                            desc: section.description,
                            x: rect.right + 12,
                            y: rect.top + (rect.height / 2)
                          });
                        }}
                        onMouseLeave={() => setTooltipData(null)}
                      >
                        <Info size={14} className="text-tertiary" />
                      </div>
                    </div>
                    <PlusCircle size={16} className="section-item-add" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {mounted && tooltipData && createPortal(
        <div 
          className="section-tooltip"
          style={{ top: tooltipData.y, left: tooltipData.x }}
        >
          <div className="tooltip-header">
            <Info size={12} />
            Benefits & Use
          </div>
          <p>{tooltipData.desc}</p>
        </div>,
        document.body
      )}
    </div>
  );
}

