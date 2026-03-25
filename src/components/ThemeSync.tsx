'use client';

import { useEffect } from 'react';
import { useBuilderStore } from '@/store/builderStore';

export default function ThemeSync() {
  const themeMode = useBuilderStore(state => state.themeMode);

  useEffect(() => {
    if (themeMode === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [themeMode]);

  return null;
}
