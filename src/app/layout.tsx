import type { Metadata } from "next";
import "./globals.css";
import ThemeSync from "@/components/ThemeSync";

export const metadata: Metadata = {
  title: "Automate - No-Code Website Builder",
  description: "Build stunning, responsive websites in minutes. No coding required. Drag & drop, themes, templates, and AI-powered design.",
  keywords: "website builder, no-code, drag and drop, web design, responsive",
  openGraph: {
    title: "Automate - No-Code Website Builder",
    description: "Build stunning, responsive websites in minutes with our modern drag & drop builder.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stateStr = localStorage.getItem('automate-builder-storage');
                if (stateStr) {
                  var state = JSON.parse(stateStr);
                  if (state && state.state && state.state.themeMode === 'light') {
                    document.documentElement.classList.add('light-mode');
                  }
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
