import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
import { useThemed, Box } from 'restyler';
import { LayoutContainer } from './LayoutContainer';
import { LayoutContext } from './LayoutContext';

export const LayoutFooter = () => {
  const ThemedLayoutFooterAnchor = useThemed('a', 'layout.footer.anchor');
  const ThemedLayoutFooter = useThemed('div', 'layout.footer');
  const { logoSrc } = useContext(LayoutContext);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <ThemedLayoutFooter>
      <LayoutContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
          <ThemedLayoutFooterAnchor
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            © 2006 — {currentYear}
          </ThemedLayoutFooterAnchor>
        </Box>
      </LayoutContainer>
    </ThemedLayoutFooter>
  );
};

LayoutFooter.displayName = 'LayoutFooter';
