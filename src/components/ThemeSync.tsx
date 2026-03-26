'use client';

import { useEffect, useState } from 'react';
import { useBuilderStore } from '@/store/builderStore';

export default function ThemeSync() {
  const themeMode = useBuilderStore(state => state.themeMode);
  const [mounted, setMounted] = useState(false);

  // Only apply theme changes after initial mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (themeMode === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [themeMode, mounted]);

  return null;
}


