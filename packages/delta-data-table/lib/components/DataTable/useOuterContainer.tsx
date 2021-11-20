import { jsx } from '@theme-ui/core';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useSharedRef } from 'restyler';

export const useOuterContainer = () => {
  const [scrollbarHeight, setScrollbarHeight] = useState(0);
  const Container = useMemo(
    () =>
      forwardRef<HTMLDivElement, any>(({ style, ...rest }, ref) => {
        const [shouldHideVerticalScroll, setShouldHideVerticalScroll] =
          useState(false);
        const [element, setElement] = useState<HTMLDivElement | null>(null);
        const sharedRef = useSharedRef<HTMLDivElement>(null, [ref, setElement]);
        useEffect(() => {
          if (!element) {
            return;
          }
          setShouldHideVerticalScroll(
            element.scrollHeight - element.offsetHeight < 2
          );
          setScrollbarHeight(element.offsetHeight - element.clientHeight);
        }, [element]);
        return (
          <div
            ref={sharedRef}
            style={{
              ...style,
              overflowY: shouldHideVerticalScroll ? 'hidden' : undefined
            }}
            {...rest}
          />
        );
      }),
    []
  );
  return [Container, scrollbarHeight] as const;
};
