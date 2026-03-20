'use client';

import { useBuilderStore } from '@/store/builderStore';
import { sectionLibrary, SectionLibraryItem } from '@/data/sections';
import { LayoutTemplate, PlusCircle } from 'lucide-react';

export default function SectionsPanel() {
  const { addSection, activePageId } = useBuilderStore();

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
                >
                  <div className="section-item-preview">
                    <LayoutTemplate size={24} className="text-muted" />
                  </div>
                  <div className="section-item-info">
                    <span className="section-item-name">{section.name}</span>
                    <PlusCircle size={16} className="section-item-add" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
