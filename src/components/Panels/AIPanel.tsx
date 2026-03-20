'use client';

import { useState } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AIPanel() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const suggestions = [
    "A modern hero section for a SaaS startup with dark mode",
    "A 3-column pricing table with a highlighted 'Pro' tier",
    "A minimalist portfolio gallery for a photographer",
    "Write compelling copy for a fitness app landing page"
  ];

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt('');
      toast.success('AI generation complete! Check your canvas.');
      // In a real app we'd parse the AI response into our internal state structure
    }, 2000);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '32px', padding: '24px 0' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '50%', 
          background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
        }}>
          <Bot size={32} color="white" />
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Build Faster with Automate AI</h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '300px', margin: '0 auto' }}>
          Describe what you want to build, and our AI will generate the layout, styling, and copy instantly.
        </p>
      </div>

      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <textarea 
          className="textarea" 
          placeholder="E.g., Generate a contact section with a form on the left and company address on the right..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={4}
          style={{ paddingRight: '48px', fontSize: '14px' }}
        />
        <button 
          className="btn btn-primary btn-icon" 
          onClick={handleGenerate}
          disabled={!prompt || isGenerating}
          style={{ position: 'absolute', bottom: '12px', right: '12px', borderRadius: '50%' }}
        >
          {isGenerating ? <Sparkles size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </div>

      <div>
        <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
          Try these prompts
        </h4>
        <div className="ai-suggestions">
          {suggestions.map((s, i) => (
            <div key={i} className="ai-suggestion" onClick={() => setPrompt(s)}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
