import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
import { useThemed, Box } from 'restyler';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';

export const LayoutFooter = () => {
  const ThemedLayoutFooter = useThemed('div', 'layout.footer');
  const ThemedLayoutFooterContent = useThemed('div', 'layout.footer.content');
  const ThemedLayoutFooterAnchor = useThemed('a', 'layout.footer.anchor');
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const defaultLeft = useMemo(
    () => (
      <ThemedLayoutFooterAnchor
        href="http://www.deltasolutions.ru"
        sx={{ display: 'flex', alignItems: 'top' }}
      >
        {logoSrc && (
          <img
            src={logoSrc}
            sx={{
              width: '1.3em',
              height: '1.3em',
              marginRight: '0.4rem'
            }}
          />
        )}
        <Box>DELTA Solutions</Box>
      </ThemedLayoutFooterAnchor>
    ),
    []
  );
  const defaultRight = useMemo(
    () => (
      <ThemedLayoutFooterAnchor
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        © 2006 — {currentYear}
      </ThemedLayoutFooterAnchor>
    ),
    []
  );
  const { footer: { left = defaultLeft, right = defaultRight } = {}, logoSrc } =
    useContext(LayoutContext);
  return (
    <ThemedLayoutFooter>
      <LayoutContainer>
        <ThemedLayoutFooterContent
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {left}
          {right}
        </ThemedLayoutFooterContent>
      </LayoutContainer>
    </ThemedLayoutFooter>
  );
};

LayoutFooter.displayName = 'LayoutFooter';
