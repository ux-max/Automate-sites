const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/sections.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// We need to find all sections with category 'Header' and add a hamburger element.
// And tag their 'Links' and 'Buttons' containers with mobileMenu: true.

// 1. Identify Header sections (they usually start with { id: 'nav-...')
const sections = content.split('  { id:');

const updatedSections = sections.map(section => {
  if (section.includes("category: 'Header'")) {
    // Inject hamburger element into elements array
    // The elements array usually looks like: elements: [ ... ]
    
    // Also tag containers (except the first logo one typically) with mobileMenu: true
    // A simple way is to find el('container', '', { ... }, { children: [ ... ] })
    // and if it's not the logo one, add mobileMenu: true to its props.
    
    // Find the elements array
    const elementsMatch = section.match(/elements: \[([\s\S]*?)\]\s+\}/);
    if (elementsMatch) {
      let elementsContent = elementsMatch[1];
      
      // Add hamburger at the end of elements
      const hamburger = `\n        el('hamburger', '', { display: 'none', mobileStyles: { display: 'flex' } }, { hidden: { desktop: true, tablet: true, mobile: false } }),`;
      
      // Find all containers and tag them (heuristic: containers after the first one are usually menu items)
      // Actually, better to target specifically the containers that have multiple links.
      
      // Let's use a simpler heuristic: find el('container', '', { ...gap: '32px'... }) or similar
      // Or just tag ALL containers except the first one.
      
      let containerCount = 0;
      elementsContent = elementsContent.replace(/el\('container', '', \{([\s\S]*?)\}, \{/g, (match, styles) => {
        containerCount++;
        if (containerCount > 1) {
          // Add mobileMenu: true to props
          return `el('container', '', {${styles}}, { mobileMenu: true,`;
        }
        return match;
      });
      
      const newElementsContent = elementsContent + hamburger;
      section = section.replace(elementsMatch[1], newElementsContent);
    }
  }
  return section;
});

content = updatedSections.join('  { id:');
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully injected hamburger menus into Headers.');
