'use client';

import { useBuilderStore } from '@/store/builderStore';
import { Trash2 } from 'lucide-react';

export default function PropertiesPanel() {
  const { selectedElementId, pages, activePageId, updateElement, deleteElement, getSelectedElement } = useBuilderStore();
  const selected = getSelectedElement();

  if (!selected) {
    return (
      <div className="properties-panel">
        <div className="properties-header"><h3>Properties</h3></div>
        <div className="properties-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', textAlign: 'center', padding: '24px' }}>
          Select an element on the canvas to edit its properties
        </div>
      </div>
    );
  }

  const { element, sectionId } = selected;

  const updateStyle = (key: string, value: string) => {
    updateElement(activePageId, sectionId, element.id, {
      styles: { ...element.styles, [key]: value },
    });
  };

  const updateContent = (content: string) => {
    updateElement(activePageId, sectionId, element.id, { content });
  };

  return (
    <div className="properties-panel">
      <div className="properties-header">
        <h3>Properties</h3>
        <button className="btn btn-danger btn-sm" onClick={() => deleteElement(activePageId, sectionId, element.id)}>
          <Trash2 size={12} /> Delete
        </button>
      </div>
      <div className="properties-content">
        {/* Content */}
        {['text', 'heading', 'button', 'list'].includes(element.type) && (
          <div className="property-group">
            <div className="property-group-title">Content</div>
            {element.type === 'list' ? (
              <textarea className="textarea" value={element.content} onChange={e => updateContent(e.target.value)} rows={4} placeholder="One item per line" />
            ) : (
              <input className="input" value={element.content} onChange={e => updateContent(e.target.value)} />
            )}
          </div>
        )}

        {element.type === 'image' && (
          <div className="property-group">
            <div className="property-group-title">Image URL</div>
            <input className="input" value={element.content} onChange={e => updateContent(e.target.value)} placeholder="https://..." />
          </div>
        )}

        {element.type === 'video' && (
          <div className="property-group">
            <div className="property-group-title">Video Embed URL</div>
            <input className="input" value={element.content} onChange={e => updateContent(e.target.value)} placeholder="https://youtube.com/embed/..." />
          </div>
        )}

        {/* Typography */}
        {['text', 'heading', 'button', 'list'].includes(element.type) && (
          <div className="property-group">
            <div className="property-group-title">Typography</div>
            <div className="property-row">
              <label>Size</label>
              <input className="input input-sm" value={element.styles.fontSize || ''} onChange={e => updateStyle('fontSize', e.target.value)} placeholder="16px" />
            </div>
            <div className="property-row">
              <label>Weight</label>
              <select className="input input-sm" value={element.styles.fontWeight || '400'} onChange={e => updateStyle('fontWeight', e.target.value)}>
                <option value="300">Light</option>
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="600">Semibold</option>
                <option value="700">Bold</option>
                <option value="800">Extra Bold</option>
              </select>
            </div>
            <div className="property-row">
              <label>Color</label>
              <div className="color-picker-wrapper">
                <div className="color-swatch">
                  <input type="color" value={element.styles.color || '#000000'} onChange={e => updateStyle('color', e.target.value)} />
                </div>
                <input className="input input-sm" value={element.styles.color || ''} onChange={e => updateStyle('color', e.target.value)} />
              </div>
            </div>
            <div className="property-row">
              <label>Align</label>
              <select className="input input-sm" value={element.styles.textAlign || 'left'} onChange={e => updateStyle('textAlign', e.target.value)}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div className="property-row">
              <label>Height</label>
              <input className="input input-sm" value={element.styles.lineHeight || ''} onChange={e => updateStyle('lineHeight', e.target.value)} placeholder="1.6" />
            </div>
          </div>
        )}

        {/* Size */}
        <div className="property-group">
          <div className="property-group-title">Size</div>
          <div className="property-row">
            <label>Width</label>
            <input className="input input-sm" value={element.styles.width || ''} onChange={e => updateStyle('width', e.target.value)} placeholder="auto" />
          </div>
          <div className="property-row">
            <label>Height</label>
            <input className="input input-sm" value={element.styles.height || ''} onChange={e => updateStyle('height', e.target.value)} placeholder="auto" />
          </div>
          <div className="property-row">
            <label>Max W</label>
            <input className="input input-sm" value={element.styles.maxWidth || ''} onChange={e => updateStyle('maxWidth', e.target.value)} placeholder="none" />
          </div>
        </div>

        {/* Background */}
        <div className="property-group">
          <div className="property-group-title">Background</div>
          <div className="property-row">
            <label>Color</label>
            <div className="color-picker-wrapper">
              <div className="color-swatch">
                <input type="color" value={element.styles.backgroundColor || '#ffffff'} onChange={e => updateStyle('backgroundColor', e.target.value)} />
              </div>
              <input className="input input-sm" value={element.styles.backgroundColor || ''} onChange={e => updateStyle('backgroundColor', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div className="property-group">
          <div className="property-group-title">Spacing</div>
          <div className="property-row"><label>Padding</label><input className="input input-sm" value={element.styles.padding || ''} onChange={e => updateStyle('padding', e.target.value)} placeholder="0px" /></div>
          <div className="property-row"><label>Margin</label><input className="input input-sm" value={element.styles.margin || ''} onChange={e => updateStyle('margin', e.target.value)} placeholder="0px" /></div>
        </div>

        {/* Border */}
        <div className="property-group">
          <div className="property-group-title">Border</div>
          <div className="property-row"><label>Radius</label><input className="input input-sm" value={element.styles.borderRadius || ''} onChange={e => updateStyle('borderRadius', e.target.value)} placeholder="0px" /></div>
          <div className="property-row"><label>Width</label><input className="input input-sm" value={element.styles.borderWidth || ''} onChange={e => updateStyle('borderWidth', e.target.value)} placeholder="0px" /></div>
          <div className="property-row">
            <label>Color</label>
            <div className="color-picker-wrapper">
              <div className="color-swatch">
                <input type="color" value={element.styles.borderColor || '#e2e8f0'} onChange={e => updateStyle('borderColor', e.target.value)} />
              </div>
              <input className="input input-sm" value={element.styles.borderColor || ''} onChange={e => updateStyle('borderColor', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div className="property-group">
          <div className="property-group-title">Effects</div>
          <div className="property-row"><label>Shadow</label>
            <select className="input input-sm" value={element.styles.boxShadow || 'none'} onChange={e => updateStyle('boxShadow', e.target.value)}>
              <option value="none">None</option>
              <option value="0 1px 3px rgba(0,0,0,0.12)">Small</option>
              <option value="0 4px 12px rgba(0,0,0,0.15)">Medium</option>
              <option value="0 10px 30px rgba(0,0,0,0.2)">Large</option>
              <option value="0 20px 60px rgba(0,0,0,0.3)">XL</option>
            </select>
          </div>
          <div className="property-row"><label>Opacity</label><input className="input input-sm" type="number" min="0" max="1" step="0.1" value={element.styles.opacity || '1'} onChange={e => updateStyle('opacity', e.target.value)} /></div>
        </div>

        {/* Layout (for containers/columns) */}
        {['container', 'columns'].includes(element.type) && (
          <div className="property-group">
            <div className="property-group-title">Layout</div>
            <div className="property-row"><label>Display</label>
              <select className="input input-sm" value={element.styles.display || 'block'} onChange={e => updateStyle('display', e.target.value)}>
                <option value="block">Block</option>
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
              </select>
            </div>
            {element.styles.display === 'grid' && (
              <div className="property-row"><label>Columns</label><input className="input input-sm" value={element.styles.gridTemplateColumns || ''} onChange={e => updateStyle('gridTemplateColumns', e.target.value)} placeholder="repeat(2, 1fr)" /></div>
            )}
            <div className="property-row"><label>Gap</label><input className="input input-sm" value={element.styles.gap || ''} onChange={e => updateStyle('gap', e.target.value)} placeholder="16px" /></div>
          </div>
        )}
      </div>
    </div>
  );
}
