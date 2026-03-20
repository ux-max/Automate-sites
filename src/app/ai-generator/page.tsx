'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Zap, ArrowLeft, Sparkles, Send, CheckCircle2, 
  Globe, Layout, Palette, Type, Rocket, Edit3, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore, Page, PageSection, CanvasElement } from '@/store/builderStore';
import { useThemeStore } from '@/store/themeStore';
import { useProjectsStore } from '@/store/projectsStore';
import { sectionLibrary, SectionLibraryItem } from '@/data/sections';
import toast from 'react-hot-toast';

// Simplified renderer for AI Preview
const getThemedStyle = (style: any) => {
  if (!style) return style;
  const s = { ...style };
  if (s.color === '#0f172a') s.color = 'var(--theme-heading)';
  if (s.color === '#475569' || s.color === '#64748b') s.color = 'var(--theme-text)';
  if (s.backgroundColor === '#3b82f6' || s.backgroundColor === '#1e40af') s.backgroundColor = 'var(--theme-primary)';
  return s;
};

const AIPreviewElement = ({ element }: { element: CanvasElement }) => {
  const elStyle = getThemedStyle(element.styles) as React.CSSProperties;
  
  switch (element.type) {
    case 'heading':
      return <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--theme-font-heading)', color: 'var(--theme-heading)', ...elStyle, margin: 0 }}>{element.content}</h2>;
    case 'text':
      return <p style={{ fontSize: '0.9rem', lineHeight: 1.6, fontFamily: 'var(--theme-font-body)', color: 'var(--theme-text)', ...elStyle, margin: 0 }}>{element.content}</p>;
    case 'button':
      return <button style={{ padding: '10px 20px', border: 'none', borderRadius: 'var(--theme-radius)', background: 'var(--theme-primary)', color: 'white', fontWeight: 600, ...elStyle, cursor: 'default' }}>{element.content}</button>;
    case 'image':
      return (
        <div style={{ ...elStyle, overflow: 'hidden', background: 'var(--theme-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
          {element.content ? <img src={element.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>🖼 Image</span>}
        </div>
      );
    case 'container':
      return (
        <div style={{ ...elStyle }}>
          {element.children?.map((c, i) => <AIPreviewElement key={i} element={c} />)}
        </div>
      );
    case 'columns':
      return (
        <div style={{ ...elStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {(element.props?.children as any[])?.map((col, i) => (
            <div key={i} style={{ padding: '20px', background: 'var(--theme-surface)', borderRadius: 'var(--theme-radius)', border: '1px solid var(--theme-border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--theme-heading)', marginBottom: '8px' }}>{col.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--theme-text)', margin: 0 }}>{col.desc}</p>
            </div>
          ))}
        </div>
      );
    case 'list':
      return (
        <ul style={{ ...elStyle, paddingLeft: '20px', color: 'var(--theme-text)' }}>
          {element.content.split('\n').map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    default:
      return <div style={elStyle}>{element.content}</div>;
  }
};

const AIPreviewSection = ({ section }: { section: PageSection }) => {
  if (!section) return null;
  return (
    <div style={{ ...getThemedStyle(section.styles || {}), position: 'relative' }}>
      {section.elements?.map((el, i) => (
        <AIPreviewElement key={i} element={el} />
      ))}
    </div>
  );
};

export default function AIGeneratorPage() {
  const router = useRouter();
  const { importTemplate, themeMode } = useBuilderStore();
  const { addProject } = useProjectsStore();
  const { themes, activeThemeId, setActiveTheme } = useThemeStore();

  const [prompt, setPrompt] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedPages, setGeneratedPages] = useState<Page[] | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const theme = themes.find(t => t.id === activeThemeId) || themes[0];
  const themeVars = {
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
  } as React.CSSProperties;

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    { label: 'Analysing Prompt', icon: <Send size={16} /> },
    { label: 'Selecting Layout', icon: <Layout size={16} /> },
    { label: 'Designing Brand', icon: <Palette size={16} /> },
    { label: 'Optimizing Copy', icon: <Type size={16} /> },
    { label: 'Finalizing', icon: <CheckCircle2 size={16} /> },
  ];

  const handleGenerate = async () => {
    if (!prompt || !businessName) {
      toast.error('Please provide a business name and description.');
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);

    try {
      // Step 0: Analyzing
      setGenerationStep(0);
      await new Promise(r => setTimeout(r, 1500));

      // Step 1: Selecting Layout (Calling API)
      setGenerationStep(1);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, businessName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate website');
      }

      const data = await response.json();

      // Step 2 & 3: Fast simulation for brand/copy (Real data already processed)
      setGenerationStep(2);
      await new Promise(r => setTimeout(r, 1000));
      setGenerationStep(3);
      await new Promise(r => setTimeout(r, 1000));
      
      // Step 4: Finalizing
      setGenerationStep(4);
      await new Promise(r => setTimeout(r, 800));

      if (data && data.pages) {
        setGeneratedPages(data.pages);
        toast.success('Your custom website is ready!');
      } else {
        throw new Error('Invalid response from AI model');
      }
    } catch (error: any) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditInCanvas = () => {
    if (!generatedPages) return;
    importTemplate(generatedPages);
    router.push('/builder');
  };

  const handleDirectPublish = () => {
    if (!generatedPages) return;
    addProject({
      id: Date.now().toString(),
      name: businessName,
      description: 'Generated by AI',
      lastModified: new Date().toISOString(),
      pages: generatedPages,
      bannerEmoji: '✨'
    });
    toast.success('Website published! Redirecting to dashboard...');
    setTimeout(() => router.push('/dashboard'), 1500);
  };

  if (!mounted) return null;

  return (
    <div className={`generator-root ${themeMode === 'light' ? 'light-mode' : ''}`} style={{ 
      height: '100vh', display: 'flex', flexDirection: 'column',
      background: 'var(--bg-primary)', color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      position: 'relative'
    }}>
      {/* Top Bar */}
      <header style={{ 
        height: '64px', borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', background: 'var(--bg-secondary)', flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => router.push('/dashboard')}
            style={{ 
              background: 'transparent', border: 'none', color: 'var(--text-secondary)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <div style={{ width: '1px', height: '20px', background: 'var(--border-subtle)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <Zap size={18} color="var(--primary-500)" fill="var(--primary-500)" />
            <span>AI Website Generator</span>
          </div>
        </div>

        {generatedPages && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleEditInCanvas}>
              <Edit3 size={14} /> Edit in Canvas
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleDirectPublish}>
              <Rocket size={14} /> Direct Publish
            </button>
          </div>
        )}
      </header>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Side: Input Form */}
        <aside style={{ 
          width: '400px', borderRight: '1px solid var(--border-subtle)',
          padding: '32px', display: 'flex', flexDirection: 'column',
          background: 'var(--bg-secondary)', overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Let's build your dream website</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Our AI will craft a professional layout and copy tailored to your needs.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px', opacity: 0.6 }}>Business Name</label>
              <input 
                className="input" 
                placeholder="e.g. Acme SaaS Solutions" 
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px', opacity: 0.6 }}>What does your business do?</label>
              <textarea 
                className="textarea" 
                placeholder="Describe your goals, services, and target audience..." 
                rows={6}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                style={{ resize: 'none' }}
              />
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt || !businessName}
              style={{ padding: '16px', fontSize: '16px', borderRadius: '12px', gap: '10px' }}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Generate Website
                </>
              )}
            </button>

            {isGenerating && (
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {steps.map((step, i) => (
                    <div key={i} style={{ 
                      display: 'flex', alignItems: 'center', gap: '12px',
                      opacity: i === generationStep ? 1 : i < generationStep ? 0.5 : 0.2,
                      transition: 'all 0.3s'
                    }}>
                      <div style={{ 
                        width: '24px', height: '24px', borderRadius: '50%',
                        background: i <= generationStep ? 'var(--primary-500)' : 'var(--bg-tertiary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                      }}>
                        {i < generationStep ? <CheckCircle2 size={14} /> : step.icon}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: i === generationStep ? '600' : '400' }}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Right Side: Preview */}
        <main style={{ flex: 1, padding: '40px', background: 'var(--bg-primary)', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          {!generatedPages && !isGenerating && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              style={{ 
                margin: 'auto', textAlign: 'center', maxWidth: '400px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'
              }}
            >
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '24px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)'
              }}>
                <Globe size={40} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Ready to Generate</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Enter your business details on the left to see the magic happen.</p>
              </div>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ margin: 'auto', width: '100%', maxWidth: '800px' }}
            >
              <div style={{ height: '500px', background: 'var(--bg-secondary)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', border: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
                <div className="shimmer" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                <div className="ai-pulse" style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary-500)', opacity: 0.1, animation: 'pulse-glow 2s infinite' }} />
                <Sparkles size={48} color="var(--primary-500)" className="animate-pulse" />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontWeight: '600', marginBottom: '4px' }}>{steps[generationStep].label}...</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>This usually takes less than 10 seconds</p>
                </div>
              </div>
            </motion.div>
          )}

          {generatedPages && !isGenerating && (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ width: '100%', maxWidth: '1000px', paddingBottom: '100px' }}
            >
              <div className="preview-container" style={{ 
                ...themeVars,
                background: 'var(--theme-background)',
                color: 'var(--theme-text)',
                fontFamily: 'var(--theme-font-body)',
                borderRadius: '16px', overflow: 'hidden', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' 
              }}>
                {generatedPages[0].sections.map((section, i) => (
                  <AIPreviewSection key={i} section={section} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </main>
      </div>

      <style>{`
        .ai-suggestion {
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        .ai-suggestion:hover {
          background: var(--bg-elevated);
          border-color: var(--border-subtle);
          color: var(--primary-400);
        }
        .preview-container {
          transform-origin: top center;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
