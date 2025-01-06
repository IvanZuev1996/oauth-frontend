import { useEffect, useState } from 'react';

type Breakpoints = 'sm' | 'md' | 'lg';

const SM_BREAKPOINT = 640;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;

const breakPointsMap: Record<Breakpoints, number> = {
  sm: SM_BREAKPOINT,
  md: MD_BREAKPOINT,
  lg: LG_BREAKPOINT,
};

export function useIsMobile(size: Breakpoints = 'md') {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const breakpoint = breakPointsMap[size];

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < breakpoint);
    return () => mql.removeEventListener('change', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !!isMobile;
}
