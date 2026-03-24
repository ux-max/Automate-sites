const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/sections.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = [
  {
    id: 'nav-standard-pro',
    target: `el('heading', 'BRAND', { fontSize: '24px', fontWeight: '900', color: 'var(--theme-primary)' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '12px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '40px', height: '40px', objectFit: 'contain' }), el('heading', 'BRAND', { fontSize: '22px', fontWeight: '900', color: 'var(--theme-primary)' }) ] }),`
  },
  {
    id: 'nav-centered-logo',
    target: `el('heading', 'AUTOMATE', { fontSize: '28px', fontWeight: '900', marginBottom: '24px', letterSpacing: '4px' }),`,
    replacement: `el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '24px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '50px', height: '50px', objectFit: 'contain' }), el('heading', 'AUTOMATE', { fontSize: '24px', fontWeight: '900', letterSpacing: '4px' }) ] }),`
  },
  {
    id: 'nav-glass-sticky',
    target: `el('heading', '✨', { fontSize: '24px' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '10px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '32px', height: '32px', objectFit: 'contain' }), el('heading', 'Prism', { fontSize: '18px', fontWeight: '700' }) ] }),`
  },
  {
    id: 'nav-minimalist-split',
    target: `el('heading', 'Studio.', { fontSize: '32px', fontWeight: '300' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '12px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '40px', height: '40px', objectFit: 'contain' }), el('heading', 'Studio.', { fontSize: '28px', fontWeight: '300' }) ] }),`
  },
  {
    id: 'nav-ecommerce-full',
    target: `el('heading', 'MERCADO', { fontSize: '32px', fontWeight: '900', textAlign: 'center', flex: '1' }),`,
    replacement: `el('container', '', { flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '40px', height: '40px', objectFit: 'contain' }), el('heading', 'MERCADO', { fontSize: '28px', fontWeight: '900' }) ] }),`
  },
  {
    id: 'nav-utility-bar',
    target: `el('heading', 'CORP_GLOBE', { fontWeight: '800', color: 'var(--theme-primary)' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '10px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '36px', height: '36px', objectFit: 'contain' }), el('heading', 'CORP_GLOBE', { fontSize: '18px', fontWeight: '800', color: 'var(--theme-primary)' }) ] }),`
  },
  {
    id: 'nav-dark-minimal',
    target: `el('heading', 'NOVA', { fontSize: '24px', fontWeight: '800', letterSpacing: '2px' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '12px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '32px', height: '32px', objectFit: 'contain' }), el('heading', 'NOVA', { fontSize: '22px', fontWeight: '800', letterSpacing: '2px' }) ] }),`
  },
  {
    id: 'nav-app-style',
    target: `el('heading', 'Dashboard', { fontSize: '18px', fontWeight: '700' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '10px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '28px', height: '28px', objectFit: 'contain' }), el('heading', 'Dashboard', { fontSize: '18px', fontWeight: '700' }) ] }),`
  },
  {
    id: 'nav-side-logo-split',
    target: `el('heading', 'FOLD', { fontWeight: '900' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '10px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '36px', height: '36px', objectFit: 'contain' }), el('heading', 'FOLD', { fontSize: '20px', fontWeight: '900' }) ] }),`
  },
  {
    id: 'nav-centered-split',
    target: `el('heading', 'ARKIVE', { fontSize: '24px', fontWeight: '900' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '12px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '36px', height: '36px', objectFit: 'contain' }), el('heading', 'ARKIVE', { fontSize: '22px', fontWeight: '900' }) ] }),`
  },
  {
    id: 'footer-multi-column',
    target: `el('heading', 'AUTOMATE', { fontSize: '24px', fontWeight: '900', color: 'var(--theme-primary)', marginBottom: '16px' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '32px', height: '32px', objectFit: 'contain' }), el('heading', 'AUTOMATE', { fontSize: '20px', fontWeight: '900', color: 'var(--theme-primary)' }) ] }),`
  },
  {
    id: 'footer-simple-row',
    target: `el('heading', 'AUTOMATE', { fontSize: '18px', fontWeight: '900' }),`,
    replacement: `el('container', '', { display: 'flex', alignItems: 'center', gap: '8px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '24px', height: '24px', objectFit: 'contain' }), el('heading', 'AUTOMATE', { fontSize: '16px', fontWeight: '900' }) ] }),`
  },
  {
    id: 'foot-brand-focus',
    target: `el('heading', 'AUTOMATE', { fontSize: '32px', fontWeight: '900', letterSpacing: '4px', marginBottom: '32px' }),`,
    replacement: `el('container', '', { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '32px' }, { children: [ el('image', 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?w=100&q=80', { width: '60px', height: '60px', objectFit: 'contain' }), el('heading', 'AUTOMATE', { fontSize: '28px', fontWeight: '900', letterSpacing: '4px' }) ] }),`
  }
];

replacements.forEach(r => {
  if (content.includes(r.target)) {
    content = content.replace(r.target, r.replacement);
    console.log(`Updated section: ${r.id}`);
  } else {
    console.warn(`Could not find target for section: ${r.id}`);
  }
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Finished updating logo headers and footers.');
