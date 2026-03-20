import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, businessName } = await req.json();

    const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';
    const keyLast4 = key ? `...${key.slice(-4)}` : 'MISSING';
    console.log(`[STDOUT] Generating with key: ${keyLast4}`);

    if (!key || key === 'your_api_key_here') {
      return NextResponse.json({ error: 'Gemini API Key is not configured correctly. Please replace the placeholder in .env.local with your real key.' }, { status: 400 });
    }

    // Initialize SDK INSIDE the request to ensure latest Env Vars
    const genAI = new GoogleGenerativeAI(key);

    const systemPrompt = `
      You are an expert AI Website Builder. Your goal is to generate a high-quality website structure in JSON format based on a business name and a user prompt.
      
      BUSINESS NAME: "${businessName}"
      USER PROMPT: "${prompt}"

      STRICT OUTPUT FORMAT:
      You must return a JSON object that matches this structure:
      {
        "pages": [
          {
            "id": "page-home",
            "name": "Home",
            "path": "/",
            "sections": [
              {
                "id": "gen-0",
                "name": "Navigation",
                "styles": { "display": "flex", "justifyContent": "space-between", "padding": "20px 32px", "backgroundColor": "var(--theme-background)", "borderBottom": "1px solid var(--theme-border)", "position": "sticky", "top": "0", "zIndex": "100" },
                "elements": [
                  { "type": "heading", "content": "${businessName}", "styles": { "fontSize": "24px", "fontWeight": "900", "color": "var(--theme-primary)" } },
                  { "type": "container", "styles": { "display": "flex", "gap": "32px" }, "children": [
                    { "type": "text", "content": "Features", "styles": { "fontWeight": "600" } },
                    { "type": "text", "content": "About", "styles": { "fontWeight": "600" } },
                    { "type": "button", "content": "Contact", "styles": { "backgroundColor": "var(--theme-primary)", "color": "#fff", "padding": "8px 20px", "borderRadius": "6px" } }
                  ]}
                ]
              },
              {
                "id": "gen-1",
                "name": "Hero Section",
                "styles": { "padding": "120px 32px", "textAlign": "center", "backgroundColor": "var(--theme-background)" },
                "elements": [
                  { "type": "heading", "content": "Personalized compelling headline...", "styles": { "fontSize": "64px", "fontWeight": "800", "marginBottom": "24px" } },
                  { "type": "text", "content": "Supporting description based on prompt...", "styles": { "fontSize": "20px", "color": "var(--theme-text-secondary)", "maxWidth": "700px", "margin": "0 auto 40px" } },
                  { "type": "button", "content": "Primary Action", "styles": { "padding": "16px 40px", "fontSize": "18px", "backgroundColor": "var(--theme-primary)", "color": "#fff" } }
                ]
              }
              // ... add 3-5 more sections (Features, Portfolio/Team, Testimonials, CTA, Footer)
            ],
            "seo": { "title": "...", "description": "..." }
          }
        ]
      }

      AVAILABLE ELEMENT TYPES: 'heading', 'text', 'button', 'image', 'container', 'video', 'form'.
      
      GUIDELINES:
      - Be creative and specific to the business type.
      - Use professional copy based on the prompt.
      - Ensure the layout flows logically.
      - For background colors, use CSS variables: var(--theme-background), var(--theme-surface), var(--theme-primary).
      - Use 'display': 'grid' or 'flex' in container styles for multi-column layouts like features or team grids.
      - FOR IMAGES: Use high-quality placeholders from Unsplash (e.g., https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000). Ensure the theme of the image matches the business.
      - Return ONLY the JSON object. No markdown, no triple backticks, JUST the raw JSON string.
    `;

    let result;
    const modelConfigs = [
      { name: 'gemini-1.5-flash', version: 'v1beta' },
      { name: 'gemini-1.5-flash', version: 'v1' },
      { name: 'gemini-2.0-flash-exp', version: 'v1beta' },
      { name: 'gemini-1.5-pro', version: 'v1beta' },
      { name: 'gemini-1.0-pro', version: 'v1' },
      { name: 'gemini-pro', version: 'v1' },
    ];
    
    let lastError = null;

    for (const config of modelConfigs) {
      try {
        console.log(`[STDOUT] Attempting Config: ${config.name} (${config.version})`);
        const model = genAI.getGenerativeModel(
          { model: config.name },
          { apiVersion: config.version as any }
        );
        result = await model.generateContent(systemPrompt);
        if (result) {
          console.log(`[STDOUT] SUCCESS: Generated with ${config.name} (${config.version})`);
          break;
        }
      } catch (err: any) {
        console.warn(`[STDOUT] FAILED: ${config.name} (${config.version}) -> ${err.message}`);
        lastError = err;
      }
    }

    if (!result) {
      throw lastError || new Error('All Gemini model variations failed. Please check your API key permissions.');
    }
    
    const responseText = result.response.text();
    
    // Clean up response if AI included markdown backticks
    const cleanedJson = responseText.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleanedJson);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[STDOUT] FINAL API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate website' }, { status: 500 });
  }
}
