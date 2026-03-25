'use client';

import { useBuilderStore } from '@/store/builderStore';
import { Trash2, Copy } from 'lucide-react';

export default function PropertiesPanel() {
  const { 
    selectedElementId, 
    selectedSectionId,
    activePageId, 
    updateElement, 
    duplicateElement,
    deleteElement, 
    updateSection,
    deleteSection,
    getSelectedElement,
    getSelectedSection,
    pages
  } = useBuilderStore();
  
  const activePage = pages.find(p => p.id === activePageId);
  
  const selectedEl = getSelectedElement();
  const selectedSec = getSelectedSection();

  if (!selectedEl && !selectedSec) {
    return (
      <div className="properties-panel">
        <div className="properties-header"><h3>Properties</h3></div>
        <div className="properties-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', textAlign: 'center', padding: '24px' }}>
          Select an element or section on the canvas to edit its properties
        </div>
      </div>
    );
  }

  // Section Properties
  if (selectedSec && !selectedEl) {
    const updateSecStyle = (key: string, value: string) => {
      updateSection(activePageId, selectedSec.id, {
        styles: { ...selectedSec.styles, [key]: value },
      });
    };

    const findImagesRecursively = (elements: any[]): any[] => {
      let images: any[] = [];
      elements.forEach(el => {
        if (el.type === 'image') images.push(el);
        if (el.children) images = [...images, ...findImagesRecursively(el.children)];
      });
      return images;
    };

    const findFormsRecursively = (elements: any[]): any[] => {
      let forms: any[] = [];
      elements.forEach(el => {
        if (el.type === 'form') forms.push(el);
        if (el.children) forms = [...forms, ...findFormsRecursively(el.children)];
      });
      return forms;
    };

    const sectionImages = findImagesRecursively(selectedSec.elements);
    const sectionForms = findFormsRecursively(selectedSec.elements);

    const findNavContainerRecursively = (elements: any[]): any | null => {
      for (const el of elements) {
        if (el.type === 'container' && el.props?.mobileMenu) return el;
        if (el.children) {
          const found = findNavContainerRecursively(el.children);
          if (found) return found;
        }
      }
      return null;
    };
    const navContainer = findNavContainerRecursively(selectedSec.elements);
    const isNavbar = selectedSec.elements.some(el => {
      if (el.type === 'hamburger') return true;
      if (el.children) {
        const hasHam = (els: any[]): boolean => els.some(e => e.type === 'hamburger' || (e.children && hasHam(e.children)));
        return hasHam(el.children);
      }
      return false;
    });

    return (
      <div className="properties-panel">
        <div className="properties-header">
          <h3>Section: {selectedSec.name}</h3>
          <button className="btn btn-danger btn-sm" onClick={() => deleteSection(activePageId, selectedSec.id)}>
            <Trash2 size={12} /> Delete
          </button>
        </div>
        <div className="properties-content">
          <div className="property-group">
            <div className="property-group-title">Layout</div>
            <div className="property-row">
              <label>Name</label>
              <input className="input" value={selectedSec.name} onChange={e => updateSection(activePageId, selectedSec.id, { name: e.target.value })} />
            </div>
            <div className="property-row">
              <label>Min Height</label>
              <input className="input input-sm" value={selectedSec.styles?.minHeight || ''} onChange={e => updateSecStyle('minHeight', e.target.value)} placeholder="auto" />
            </div>
            {/* Special Case: Video Hero Background */}
            {selectedSec.elements.find(el => el.type === 'video') && (
              <div className="property-row">
                <label>Video URL</label>
                <input 
                  className="input input-sm" 
                  value={selectedSec.elements.find(el => el.type === 'video')?.content || ''} 
                  onChange={e => {
                    const videoEl = selectedSec.elements.find(el => el.type === 'video');
                    if (videoEl) {
                      updateElement(activePageId, selectedSec.id, videoEl.id, { content: e.target.value });
                    }
                  }} 
                  placeholder="https://youtube.com/embed/..." 
                />
              </div>
            )}
            
            {sectionImages.length > 0 && (
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div className="property-group-title" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                  Member / Section Images ({sectionImages.length})
                </div>
                {sectionImages.map((img, idx) => (
                  <div key={img.id} className="property-row" style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                      <img src={img.content} style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-subtle)' }} />
                      <input 
                        className="input input-sm" 
                        value={img.content} 
                        onChange={e => updateElement(activePageId, selectedSec.id, img.id, { content: e.target.value })}
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sectionForms.length > 0 && (
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div className="property-group-title" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                  Form Settings ({sectionForms.length})
                </div>
                {sectionForms.map((form) => (
                  <div key={form.id} className="property-row" style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px' }}>Button Text</label>
                    <input 
                      className="input input-sm" 
                      value={form.content || 'Submit'} 
                      onChange={e => updateElement(activePageId, selectedSec.id, form.id, { content: e.target.value })}
                      placeholder="Submit Button Text"
                    />
                  </div>
                ))}
              </div>
            )}

            {isNavbar && navContainer && (
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <div className="property-group-title" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                  Navigation Dropdown
                </div>
                <div className="property-row">
                  <label style={{ fontSize: '12px' }}>Visible Links Limit</label>
                  <input 
                    type="number" 
                    className="input input-sm" 
                    value={navContainer.props?.maxVisibleLinks || ''} 
                    onChange={e => updateElement(activePageId, selectedSec.id, navContainer.id, { props: { ...navContainer.props, maxVisibleLinks: e.target.value } })}
                    placeholder="Show all links (e.g. 3)" 
                    min="0"
                  />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '8px', lineHeight: '1.4' }}>
                  Set a limit to automatically group remaining links into a "More ▼" dropdown menu.
                </div>
              </div>
            )}
          </div>

          <div className="property-group">
            <div className="property-group-title">Animations</div>
            <div className="property-row">
              <label>Entrance</label>
              <select className="input input-sm" value={selectedSec.styles?.animationType || 'none'} onChange={e => updateSecStyle('animationType', e.target.value)}>
                <option value="none">None</option>
                <option value="fade">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="slideDown">Slide Down</option>
                <option value="slideLeft">Slide Left</option>
                <option value="slideRight">Slide Right</option>
                <option value="scaleUp">Scale Up</option>
                <option value="zoomIn">Zoom In</option>
                <option value="blurIn">Blur In</option>
              </select>
            </div>
            {selectedSec.styles?.animationType !== 'none' && (
              <>
                <div className="property-row">
                  <label>Delay (s)</label>
                  <input type="number" step="0.1" min="0" className="input input-sm" value={selectedSec.styles?.animationDelay || 0} onChange={e => updateSecStyle('animationDelay', e.target.value)} />
                </div>
                <div className="property-row">
                  <label>Duration (s)</label>
                  <input type="number" step="0.1" min="0.1" className="input input-sm" value={selectedSec.styles?.animationDuration || 0.5} onChange={e => updateSecStyle('animationDuration', e.target.value)} />
                </div>
              </>
            )}
          </div>

          <div className="property-group">
            <div className="property-group-title">Spacing</div>
            <div className="property-label-row">
              <label>Padding</label>
            </div>
            <div className="property-grid-4">
              <div className="property-input-stack">
                <input className="input input-xs" value={selectedSec.styles?.paddingTop || ''} onChange={e => updateSecStyle('paddingTop', e.target.value)} placeholder="T" />
                <span>Top</span>
              </div>
              <div className="property-input-stack">
                <input className="input input-xs" value={selectedSec.styles?.paddingRight || ''} onChange={e => updateSecStyle('paddingRight', e.target.value)} placeholder="R" />
                <span>Right</span>
              </div>
              <div className="property-input-stack">
                <input className="input input-xs" value={selectedSec.styles?.paddingBottom || ''} onChange={e => updateSecStyle('paddingBottom', e.target.value)} placeholder="B" />
                <span>Bottom</span>
              </div>
              <div className="property-input-stack">
                <input className="input input-xs" value={selectedSec.styles?.paddingLeft || ''} onChange={e => updateSecStyle('paddingLeft', e.target.value)} placeholder="L" />
                <span>Left</span>
              </div>
            </div>
            <div className="property-row mt-2">
              <label>All</label>
              <input className="input input-sm" value={selectedSec.styles?.padding || ''} onChange={e => updateSecStyle('padding', e.target.value)} placeholder="64px 32px" />
            </div>

            <div className="property-label-row mt-3">
              <label>Margin</label>
            </div>
            <div className="property-grid-4">
              <div className="property-input-stack">
                <input className="input input-xs" value={selectedSec.styles?.marginTop || ''} onChange={e => updateSecStyle('marginTop', e.target.value)} placeholder="T" />
                <span>Top</span>
              </div>
              <div className="property-input-stack">
                <input className="input input-xs" value={selectedSec.styles?.marginRight || ''} onChange={e => updateSecStyle('marginRight', e.target.value)} placeholder="R" />
                <span>Right</span>
              </div>
              <div className="property-input-stack">
                <input className="input input-xs" value={selectedSec.styles?.marginBottom || ''} onChange={e => updateSecStyle('marginBottom', e.target.value)} placeholder="B" />
                <span>Bottom</span>
              </div>
              <div className="property-input-stack">
                <input className="input input-xs" value={selectedSec.styles?.marginLeft || ''} onChange={e => updateSecStyle('marginLeft', e.target.value)} placeholder="L" />
                <span>Left</span>
              </div>
            </div>
          </div>


          <div className="property-group">
            <div className="property-group-title">Background</div>
            <div className="property-row">
              <label>Color</label>
              <div className="color-picker-wrapper">
                <div className="color-swatch">
                  <input type="color" value={selectedSec.styles?.backgroundColor?.startsWith('var') ? '#ffffff' : (selectedSec.styles?.backgroundColor || '#ffffff')} onChange={e => updateSecStyle('backgroundColor', e.target.value)} />
                </div>
                <input className="input input-sm" value={selectedSec.styles?.backgroundColor || ''} onChange={e => updateSecStyle('backgroundColor', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Element Properties
  const { element, sectionId } = selectedEl!;

  const updateStyle = (key: string, value: string | number) => {
    updateElement(activePageId, sectionId, element.id, {
      styles: { ...element.styles, [key]: value },
    });
  };

  const updateContent = (content: string) => {
    updateElement(activePageId, sectionId, element.id, { content });
  };

  const updateProp = (key: string, value: any) => {
    updateElement(activePageId, sectionId, element.id, {
      props: { ...element.props, [key]: value },
    });
  };

  return (
    <div className="properties-panel">
      <div className="properties-header">
        <h3>{element.type} Properties</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => duplicateElement(activePageId, sectionId, element.id)}>
            <Copy size={12} /> Duplicate
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => deleteElement(activePageId, sectionId, element.id)}>
            <Trash2 size={12} /> Delete
          </button>
        </div>
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
            
            {['button', 'text', 'heading'].includes(element.type) && (() => {
              const linkValue = (element.props?.link as string) || '';
              const isSectionLink = linkValue.startsWith('#') && activePage?.sections.some(s => `#${s.id}` === linkValue);
              const linkType = isSectionLink ? 'section' : 'url';
              
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', borderTop: '1px solid var(--theme-border)', paddingTop: '16px' }}>
                  <div className="property-row">
                    <label>Link To</label>
                    <select 
                      className="input input-sm" 
                      value={linkType} 
                      onChange={e => {
                        if (e.target.value === 'section' && activePage?.sections.length) {
                          updateProp('link', `#${activePage.sections[0].id}`);
                        } else {
                          updateProp('link', '');
                        }
                      }}
                    >
                      <option value="url">External URL</option>
                      <option value="section">Page Section</option>
                    </select>
                  </div>
                  {linkType === 'section' ? (
                    <div className="property-row">
                      <label>Section</label>
                      <select 
                        className="input input-sm" 
                        value={linkValue} 
                        onChange={e => updateProp('link', e.target.value)}
                      >
                        <option value="">Select a section...</option>
                        {activePage?.sections.map(s => (
                          <option key={s.id} value={`#${s.id}`}>
                            {s.name || 'Section'}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="property-row">
                      <label>URL</label>
                      <input 
                        className="input input-sm" 
                        value={linkValue} 
                        onChange={e => updateProp('link', e.target.value)} 
                        placeholder="https://example.com"
                      />
                    </div>
                  )}
                </div>
              );
            })()}
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

        {/* Navigation Dropdown Settings */}
        {element.type === 'container' && (
          <div className="property-group">
            <div className="property-group-title">Navigation Dropdown</div>
            <div className="property-row">
              <label>Visible Links Limit</label>
              <input 
                type="number" 
                className="input input-sm" 
                value={element.props?.maxVisibleLinks || ''} 
                onChange={e => updateProp('maxVisibleLinks', e.target.value)} 
                placeholder="Show all links (e.g. 3)" 
                min="0"
              />
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
          <div className="property-label-row"><label>Padding</label></div>
          <div className="property-grid-4">
            <div className="property-input-stack">
              <input className="input input-xs" value={element.styles.paddingTop || ''} onChange={e => updateStyle('paddingTop', e.target.value)} placeholder="T" />
              <span>Top</span>
            </div>
            <div className="property-input-stack">
              <input className="input input-xs" value={element.styles.paddingRight || ''} onChange={e => updateStyle('paddingRight', e.target.value)} placeholder="R" />
              <span>Right</span>
            </div>
            <div className="property-input-stack">
              <input className="input input-xs" value={element.styles.paddingBottom || ''} onChange={e => updateStyle('paddingBottom', e.target.value)} placeholder="B" />
              <span>Bottom</span>
            </div>
            <div className="property-input-stack">
              <input className="input input-xs" value={element.styles.paddingLeft || ''} onChange={e => updateStyle('paddingLeft', e.target.value)} placeholder="L" />
              <span>Left</span>
            </div>
          </div>
          
          <div className="property-label-row mt-3"><label>Margin</label></div>
          <div className="property-grid-4">
            <div className="property-input-stack">
              <input className="input input-xs" value={element.styles.marginTop || ''} onChange={e => updateStyle('marginTop', e.target.value)} placeholder="T" />
              <span>Top</span>
            </div>
            <div className="property-input-stack">
              <input className="input input-xs" value={element.styles.marginRight || ''} onChange={e => updateStyle('marginRight', e.target.value)} placeholder="R" />
              <span>Right</span>
            </div>
            <div className="property-input-stack">
              <input className="input input-xs" value={element.styles.marginBottom || ''} onChange={e => updateStyle('marginBottom', e.target.value)} placeholder="B" />
              <span>Bottom</span>
            </div>
            <div className="property-input-stack">
              <input className="input input-xs" value={element.styles.marginLeft || ''} onChange={e => updateStyle('marginLeft', e.target.value)} placeholder="L" />
              <span>Left</span>
            </div>
          </div>
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
