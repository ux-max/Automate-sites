const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/sections.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const icons = {
  'Hero': 'Sparkles',
  'Features': 'Grid',
  'Pricing': 'CreditCard',
  'Testimonials': 'MessageSquare',
  'FAQ': 'HelpCircle',
  'Content': 'FileText',
  'Team': 'Users',
  'Stats': 'BarChart',
  'Logos': 'Shield',
  'Portfolio': 'Image',
  'Contact': 'Mail',
  'Footer': 'PanelBottom',
  'CTA': 'Target',
  'Services': 'Briefcase',
  'Newsletter': 'Send',
  'Header': 'PanelTop'
};

const descriptions = {
  'Hero': 'A powerful top area to instantly capture attention.',
  'Features': 'Highlight the core features and benefits of your product.',
  'Pricing': 'Clear pricing plans to convert visitors into customers.',
  'Testimonials': 'Build trust with social proof and customer stories.',
  'FAQ': 'Answer common customer questions to reduce friction.',
  'Content': 'Clean typography blocks for your main text and narrative.',
  'Team': 'Introduce your talented team to build personal connections.',
  'Stats': 'Engaging metrics and numbers to highlight your success.',
  'Logos': 'Display your trusted partners and prominent clients.',
  'Portfolio': 'Showcase your best work and case studies.',
  'Contact': 'Easy ways for potential customers to reach your business.',
  'Footer': 'Essential navigation and copyright information for the page bottom.',
  'CTA': 'Strong calls to action to drive conversions.',
  'Services': 'Detail the specific services or solutions you offer.',
  'Newsletter': 'Forms designed specifically to capture email leads.',
  'Header': 'Top navigation bars for easy site exploration.'
};

let replacements = 0;

// Since regex can be finicky with whitespace, let's use string split and replace
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('category: \'') || line.includes('category: "')) {
    const categoryMatch = line.match(/category:\s*['"]([^'"]+)['"]/);
    if (!categoryMatch) continue;
    
    const category = categoryMatch[1];
    
    // Check if the next few lines already have previewIcon
    let hasPreviewIcon = false;
    let dataLineIdx = -1;
    for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
      if (lines[j].includes('previewIcon:')) {
        hasPreviewIcon = true;
        break;
      }
      if (lines[j].includes('data:')) {
        dataLineIdx = j;
        break;
      }
    }
    
    if (!hasPreviewIcon && dataLineIdx !== -1) {
      // We need to inject previewIcon and description right before dataLineIdx
      const icon = icons[category] || 'LayoutTemplate';
      const desc = descriptions[category] || 'A beautifully designed section for your website.';
      
      const indentMatch = lines[dataLineIdx].match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1] : '    ';
      
      lines.splice(dataLineIdx, 0, `${indent}previewIcon: '${icon}',`);
      lines.splice(dataLineIdx + 1, 0, `${indent}description: '${desc}',`);
      
      replacements++;
      i += 2; // skip the two inserted lines
    }
  }
}

content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Added icons to ${replacements} sections successfully.`);
