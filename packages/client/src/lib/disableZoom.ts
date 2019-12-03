import { useEffect } from 'react';

// Prevent zooming
export const useDisableZoom = (sel: string = '#app') => {
  useEffect(() => {
    const disable = (e: Event) => {
      e.preventDefault();
      return false;
    };
    const ele = document.querySelector(sel)!;
    ele.addEventListener('touchmove', disable);
    return () => ele.removeEventListener('touchmove', disable);
  }, []);
};
