import { useState, useEffect } from 'react';

interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

const breakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < breakpoints.md;
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg;
  const isDesktop = windowSize.width >= breakpoints.lg;
  
  const isSmUp = windowSize.width >= breakpoints.sm;
  const isMdUp = windowSize.width >= breakpoints.md;
  const isLgUp = windowSize.width >= breakpoints.lg;
  const isXlUp = windowSize.width >= breakpoints.xl;
  const is2XlUp = windowSize.width >= breakpoints['2xl'];

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    is2XlUp,
    breakpoints,
  };
};