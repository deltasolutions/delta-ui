import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useSticked = <T extends HTMLElement>(stickyOffset = 0) => {
  const [element, setElement] = useState<T | null>(null);
  const [sticked, setSticked] = useState(false);
  useIsomorphicLayoutEffect(() => {
    if (!element) {
      return;
    }
    const frameOffset = window.frameElement?.getBoundingClientRect().y ?? 0;
    const observer = new IntersectionObserver(
      ([ev]) => {
        const sticked = ev.intersectionRatio < 1;
        setSticked(sticked);
      },
      {
        rootMargin: `-${stickyOffset + frameOffset + 1}px 1000px 1000px 1000px`,
        threshold: [1],
      }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return [sticked, setElement] as const;
};
