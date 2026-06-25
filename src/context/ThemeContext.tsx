import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { ThemeMode } from '@/types';

export const defaultPalettes = [
  { name: 'Rose Pink', accent1: '#E91E8C', accent2: '#FF6EC7' },
  { name: 'Electric Blue', accent1: '#4F6BFF', accent2: '#8B5CF6' },
  { name: 'Crimson Red', accent1: '#FF3366', accent2: '#FF6B35' },
  { name: 'Emerald Green', accent1: '#10B981', accent2: '#06B6D4' },
  { name: 'Amber Gold', accent1: '#F59E0B', accent2: '#EF4444' },
  { name: 'Violet Purple', accent1: '#A855F7', accent2: '#EC4899' },
  { name: 'Ocean Teal', accent1: '#0EA5E9', accent2: '#14B8A6' },
  { name: 'Sunset Orange', accent1: '#F97316', accent2: '#E11D48' },
  { name: 'Neon Lime', accent1: '#84CC16', accent2: '#22D3EE' },
];

interface ThemeContextType {
  mode: ThemeMode;
  palette: number;
  isDark: boolean;
  customAccent1: string;
  customAccent2: string;
  isCustom: boolean;
  setMode: (mode: ThemeMode) => void;
  setPalette: (index: number) => void;
  setCustomColors: (a1: string, a2: string) => void;
  toggleMode: () => void;
  applyCustomColors: (a1: string, a2: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [palette, setPaletteState] = useState(0);
  const [customAccent1, setCustomAccent1] = useState('#E91E8C');
  const [customAccent2, setCustomAccent2] = useState('#FF6EC7');
  const [isCustom, setIsCustom] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('drp-mode') as ThemeMode | null;
    const savedPalette = localStorage.getItem('drp-palette');
    const savedCustom1 = localStorage.getItem('drp-custom1');
    const savedCustom2 = localStorage.getItem('drp-custom2');
    const savedIsCustom = localStorage.getItem('drp-iscustom');

    if (savedMode) setModeState(savedMode);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) setModeState('light');
    if (savedPalette !== null) setPaletteState(Number(savedPalette));
    if (savedCustom1) setCustomAccent1(savedCustom1);
    if (savedCustom2) setCustomAccent2(savedCustom2);
    if (savedIsCustom) setIsCustom(savedIsCustom === 'true');
  }, []);

  const getColors = useCallback(() => {
    if (isCustom) return { a1: customAccent1, a2: customAccent2 };
    const p = defaultPalettes[palette];
    return { a1: p.accent1, a2: p.accent2 };
  }, [isCustom, palette, customAccent1, customAccent2]);

  const applyTheme = useCallback(() => {
    const root = document.documentElement;
    const { a1, a2 } = getColors();

    if (mode === 'dark') {
      root.style.setProperty('--bg-primary', '#07070B');
      root.style.setProperty('--bg-secondary', '#0E0E14');
      root.style.setProperty('--bg-tertiary', '#16161F');
      root.style.setProperty('--bg-card', '#12121A');
      root.style.setProperty('--text-primary', '#FFFFFF');
      root.style.setProperty('--text-secondary', '#C8C8D4');
      root.style.setProperty('--text-muted', '#7A7A8A');
      root.style.setProperty('--border-subtle', 'rgba(255,255,255,0.07)');
      root.style.setProperty('--border-active', 'rgba(255,255,255,0.18)');
    } else {
      root.style.setProperty('--bg-primary', '#FAFAFB');
      root.style.setProperty('--bg-secondary', '#FFFFFF');
      root.style.setProperty('--bg-tertiary', '#F0F0F5');
      root.style.setProperty('--bg-card', '#FFFFFF');
      root.style.setProperty('--text-primary', '#0A0A0F');
      root.style.setProperty('--text-secondary', '#3D3D4D');
      root.style.setProperty('--text-muted', '#6E6E80');
      root.style.setProperty('--border-subtle', 'rgba(0,0,0,0.07)');
      root.style.setProperty('--border-active', 'rgba(0,0,0,0.15)');
    }

    root.style.setProperty('--accent-1', a1);
    root.style.setProperty('--accent-2', a2);
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${a1}, ${a2})`);
    root.style.setProperty('--accent-glow', `${a1}59`);
    root.style.setProperty('--accent-subtle', `${a1}1A`);
    root.style.setProperty('--accent-border', `${a1}80`);
    root.style.setProperty('--glow-tl', `${a1}26`);
    root.style.setProperty('--glow-tr', `${a2}1E`);
    root.style.setProperty('--glow-bl', `${a1}18`);
    root.style.setProperty('--glow-br', `${a2}12`);
  }, [mode, getColors]);

  useEffect(() => {
    if (mounted) applyTheme();
  }, [mode, palette, mounted, isCustom, customAccent1, customAccent2, applyTheme]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    localStorage.setItem('drp-mode', m);
  }, []);

  const setPalette = useCallback((idx: number) => {
    setIsCustom(false);
    setPaletteState(idx);
    localStorage.setItem('drp-palette', String(idx));
    localStorage.setItem('drp-iscustom', 'false');
  }, []);

  const setCustomColors = useCallback((a1: string, a2: string) => {
    setCustomAccent1(a1);
    setCustomAccent2(a2);
  }, []);

  const applyCustomColors = useCallback((a1: string, a2: string) => {
    setIsCustom(true);
    setCustomAccent1(a1);
    setCustomAccent2(a2);
    localStorage.setItem('drp-custom1', a1);
    localStorage.setItem('drp-custom2', a2);
    localStorage.setItem('drp-iscustom', 'true');
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        palette,
        isDark: mode === 'dark',
        customAccent1,
        customAccent2,
        isCustom,
        setMode,
        setPalette,
        setCustomColors,
        toggleMode,
        applyCustomColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be within ThemeProvider');
  return ctx;
}
