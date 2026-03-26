'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sun, Moon, Plus, Search, Zap, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBuilderStore } from '@/store/builderStore';
import { useProjectsStore } from '@/store/projectsStore';
import { useProjectStore } from '@/store/projectStore';
import { templates } from '@/data/templates';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const router = useRouter();
  const { createNewProject, importTemplate, loadProject, themeMode, toggleThemeMode } = useBuilderStore();
  const { projects } = useProjectsStore();
  const { setProjectName } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleStartBlank = () => {
    createNewProject();
    setProjectName('Untitled Website');
    router.push('/builder');
  };

  const handleStartTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      importTemplate(template.pages);
      setProjectName(`${template.name} Site`);
      router.push('/builder');
    }
  };

  const handleOpenProject = (project: any) => {
    loadProject(project.pages);
    setProjectName(project.name);
    router.push('/builder');
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeTab === 'all' || t.category.toLowerCase() === activeTab.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="dashboard-root" style={{ 
      minHeight: '100vh', 
      background: themeMode === 'light' ? `
        radial-gradient(at 0% 0%, rgba(165, 243, 252, 0.5) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(192, 132, 252, 0.5) 0px, transparent 50%),
        radial-gradient(at 50% 100%, rgba(255, 255, 255, 0.8) 0px, transparent 50%),
        var(--bg-primary)
      ` : `
        radial-gradient(at 0% 0%, rgba(14, 165, 233, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
        var(--bg-primary)
      `,
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      transition: 'background 0.3s ease'
    }}>
      {/* Nav */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
        background: themeMode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(10, 10, 15, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '18px' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '8px', 
              background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Zap size={18} color="white" />
            </div>
            <span>Automate</span>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: 'var(--text-tertiary)' }}>
            <Link href="/dashboard" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Projects</Link>
            <Link href="#" className="nav-link">Templates</Link>
            <Link href="#" className="nav-link">Team</Link>
            <Link href="#" className="nav-link">Resources</Link>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} size={16} />
            <input 
              type="text" 
              placeholder="Search templates..." 
              style={{ 
                background: 'var(--surface-glass)', border: '1px solid var(--border-subtle)',
                borderRadius: '999px', padding: '8px 16px 8px 40px', fontSize: '14px',
                color: 'var(--text-primary)', outline: 'none', width: '260px',
                transition: 'all 0.2s'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={toggleThemeMode}
            style={{ 
              background: 'var(--surface-glass)', border: '1px solid var(--border-subtle)',
              borderRadius: '50%', width: '36px', height: '36px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            {themeMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #d946ef)' }} />
        </div>
      </nav>

      <main style={{ paddingTop: '96px', paddingBottom: '80px', paddingLeft: '32px', paddingRight: '32px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>Create your next project</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Choose a professional template or start fresh with a blank canvas.</p>
        </div>

        <motion.div 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Start Blank */}
          <motion.div variants={itemVariants} onClick={handleStartBlank} style={{ cursor: 'pointer' }}>
            <div className="card-preview" style={{ 
              aspectRatio: '16/10', background: 'var(--bg-secondary)', borderRadius: '16px',
              border: '2px dashed var(--border-default)', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '16px', transition: 'all 0.2s'
            }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)'
              }}>
                <Plus size={24} />
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Blank Website</span>
            </div>
            <div style={{ marginTop: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600 }}>New Project</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Start from scratch</p>
            </div>
          </motion.div>

          {/* AI Generator */}
          <motion.div 
            variants={itemVariants} 
            onClick={() => router.push('/ai-generator')} 
            style={{ cursor: 'pointer' }}
          >
            <div className="card-preview" style={{ 
              aspectRatio: '16/10', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(217, 70, 239, 0.1))', 
              borderRadius: '16px', border: '2px solid rgba(139, 92, 246, 0.3)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              justifyContent: 'center', gap: '16px', transition: 'all 0.2s',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
              }}>
                <Zap size={24} fill="white" />
              </div>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Generate with AI</span>
              <div style={{ 
                position: 'absolute', top: '12px', right: '12px', 
                background: 'var(--primary-500)', color: 'white', 
                padding: '2px 8px', borderRadius: '4px', fontSize: '10px', 
                fontWeight: 'bold', textTransform: 'uppercase' 
              }}>New</div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600 }}>AI Website Builder</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Generate from a prompt</p>
            </div>
          </motion.div>

          {/* Templates */}
          {filteredTemplates.map((template) => (
            <motion.div key={template.id} variants={itemVariants} onClick={() => handleStartTemplate(template.id)} style={{ cursor: 'pointer' }}>
              <div className="card-preview" style={{ 
                aspectRatio: '16/10', background: 'var(--bg-secondary)', borderRadius: '16px',
                border: '1px solid var(--border-subtle)', overflow: 'hidden', position: 'relative'
              }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', background: 'var(--bg-tertiary)' }}>
                  <img 
                    src={template.preview} 
                    alt={template.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80'; }}
                  />
                </div>
                <div style={{ 
                  position: 'absolute', inset: 0, background: 'rgba(59, 130, 246, 0.1)', 
                  opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} className="hover-overlay">
                  <div style={{ background: 'white', color: 'black', padding: '8px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>Use Template</div>
                </div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{template.name}</h3>
                  <span style={{ fontSize: '10px', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', opacity: 0.7 }}>{template.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Existing Projects */}
        {projects.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>My Websites</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => handleOpenProject(project)}
                  style={{ 
                    background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px',
                    border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '16px',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  className="project-card"
                >
                  <div style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    {project.bannerEmoji || '🌐'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{project.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Edited {new Date(project.lastModified).toLocaleDateString()}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete logic can be added here if needed
                    }}
                    style={{ border: 'none', background: 'transparent', color: 'var(--text-tertiary)', cursor: 'pointer' }}
                  >
                    <MoreVertical size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        .card-preview:hover {
          border-color: var(--primary-500) !important;
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .project-card:hover {
          border-color: var(--primary-500) !important;
          background: var(--bg-tertiary) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .card-preview:hover .hover-overlay {
          opacity: 1 !important;
        }
        .nav-link:hover {
          color: var(--text-primary) !important;
        }
      `}</style>
    </div>
  );
}
