import { jsx } from '@theme-ui/core';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useSharedRef } from 'restyler';

export const useOuterContainer = () => {
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  const Container = useMemo(
    () =>
      forwardRef<HTMLDivElement, any>((props, ref) => {
        const [element, setElement] = useState<HTMLDivElement | null>(null);
        const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, setElement]);
        useEffect(() => {
          if (!element) {
            return;
          }
          const update = () => {
            setScrollbarHeight(element.offsetHeight - element.clientHeight);
          };
          update();
          const observer = new MutationObserver(update);
          observer.observe(element, {
            attributes: true,
            childList: true,
            subtree: true
          });
          return () => {
            observer.disconnect();
          };
        }, [element]);
        return <div ref={sharedRef} {...props} />;
      }),
    []
  );
  return [Container, scrollbarHeight] as const;
};
