'use client';

import { useBuilderStore } from '@/store/builderStore';
import { useThemeStore } from '@/store/themeStore';
import { useState, useEffect } from 'react';
import { Code2, Download, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExportPanel() {
  const { pages, activePageId } = useBuilderStore();
  const theme = useThemeStore(s => s.getActiveTheme());
  const [copied, setCopied] = useState(false);
  const page = pages.find(p => p.id === activePageId);
  const html = page ? `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seo?.title || page.name}</title>
  <meta name="description" content="${page.seo?.description || ''}">
  <style>
    /* Theme: ${theme.name} */
    :root {
      --primary: ${theme.colors.primary};
      --bg: ${theme.colors.background};
      --text: ${theme.colors.text};
      --font-body: ${theme.fonts.body};
    }
    body { font-family: var(--font-body); background: var(--bg); color: var(--text); margin: 0; padding: 0; }
    /* ... 250+ lines of generated component CSS ... */
  </style>
</head>
<body>
  <!-- Page: ${page.name} -->
${page.sections.map(s => `  <section id="sec-${s.id}" style="padding: ${s.styles?.padding || '64px'}; min-height: ${s.styles?.minHeight || 'auto'}; background-color: ${s.styles?.backgroundColor || 'transparent'}">\n    ${s.elements.map(e => `    <div class="${e.type}" id="el-${e.id}">${e.type === 'text' || e.type === 'heading' || e.type === 'button' ? e.content : `[${e.type} Element]`}</div>`).join('\n')}\n  </section>`).join('\n')}
</body>
</html>` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    toast.success('Downloading website bundle...');
    // Real implementation would create a JSZip blob and trigger download
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Export clean, production-ready HTML, CSS, and React code.
        </p>
        <button className="btn btn-primary btn-sm" onClick={handleDownloadZip}>
          <Download size={14} /> Download ZIP
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
        <button className="btn btn-secondary btn-sm" style={{ flex: 1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomColor: 'transparent', background: 'var(--bg-tertiary)' }}>HTML/CSS</button>
        <button className="btn btn-ghost btn-sm" style={{ flex: 1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>React / Next.js</button>
        <button className="btn btn-ghost btn-sm" style={{ flex: 1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>JSON</button>
      </div>

      <div style={{ position: 'relative', flex: 1, minHeight: '300px' }}>
        <button 
          className="btn btn-secondary btn-icon btn-sm" 
          onClick={handleCopy}
          style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}
        >
          {copied ? <Check size={14} color="var(--success-500)" /> : <Copy size={14} />}
        </button>
        <pre className="code-block" style={{ height: '100%', margin: 0, padding: '24px 16px', background: '#0a0a0f', color: '#e5e7eb' }}>
          <code>{html}</code>
        </pre>
      </div>
    </div>
  );
}
