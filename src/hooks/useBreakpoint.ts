'use client';

import { useEffect, useState } from 'react';

const breakpoints = {
  mobile: '767px',
  tablet: {
    min: '768px',
    max: '1032px',
  },
  laptop: {
    min: '1033px',
    max: '1280px',
  },
  desktop: {
    min: '1281px',
    max: '1440px',
  },
  wideScreen: '1441px',
  ultraWideScreen: '1513px',
};

export interface UseBreakpointProps {
  windowWidth: number;
  breakpoints: typeof breakpoints;
  currentBreakpoint: string;
}

const useBreakpoint = (): UseBreakpointProps => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('unknown');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateWindowWidth = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setCurrentBreakpoint(getCurrentBreakpoint(width));
    };

    const getCurrentBreakpoint = (width: number): string => {
      if (width >= parseInt(breakpoints.wideScreen)) {
        return 'ultra wide screen';
      }
      if (width >= parseInt(breakpoints.wideScreen)) {
        return 'wide screen';
      }
      if (
        width >= parseInt(breakpoints.desktop.min) &&
        width <= parseInt(breakpoints.desktop.max)
      ) {
        return 'desktop';
      }
      if (
        width >= parseInt(breakpoints.laptop.min) &&
        width <= parseInt(breakpoints.laptop.max)
      ) {
        return 'laptop';
      }
      if (
        width >= parseInt(breakpoints.tablet.min) &&
        width <= parseInt(breakpoints.tablet.max)
      ) {
        return 'tablet';
      }
      if (width <= parseInt(breakpoints.mobile)) {
        return 'mobile';
      }

      return 'unknown';
    };

    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  return {
    windowWidth,
    breakpoints,
    currentBreakpoint,
  };
};

export default useBreakpoint;
