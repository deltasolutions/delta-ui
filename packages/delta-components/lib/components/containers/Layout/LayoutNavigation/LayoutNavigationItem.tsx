import { ThemeContext } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import {
  Component,
  forwardRef,
  JSXElementConstructor,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { Theme } from '../../../../defaults';
import { Anchor, AnchorProps } from '../../../Anchor';
import { Box, BoxProps } from '../../Box';
import { NavigationContext } from './LayoutNavigation';

interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export interface LayoutNavigationItemProps extends AnchorProps {
  id: string;
  icon?: (props: IconProps) => JSX.Element;
}

export const LayoutNavigationItem = forwardRef<
  HTMLAnchorElement,
  LayoutNavigationItemProps
>(({ children, onClick, href, icon, id, ...rest }, ref) => {
  const { activeId } = useContext(NavigationContext);
  const isActive = useMemo(() => id === activeId, [id, activeId]);
  const handleClick = useCallback(
    e => {
      if (!href) {
        onClick?.(e);
        e.preventDefault();
      } else {
        onClick?.(e);
      }
    },
    [href]
  );
  return (
    <Anchor
      ref={ref}
      href="#"
      variant="pure"
      onClick={handleClick}
      style={{
        ...(isActive ? {} : {}),
      }}
      sx={{
        display: 'flex',
        gap: 3,
        px: 4,
        minHeight: '40px',
        fontWeight: 500,
        color: 'onExterior',
        alignItems: 'center',
        '&:hover, &:focus, &:focus-visible': {
          color: 'onPrimary',
          backgroundColor: 'accentExterior',
        },
        // '&:active': { backgroundColor: 'rgba(255,255,255,0.1)' },
        ...(isActive && {
          color: 'onPrimary',
          backgroundColor: 'accentExterior',
        }),
      }}
      {...rest}
    >
      {icon && (
        <Box>
          {(() => {
            const Icon = icon;
            return <Icon size={22} sx={{}} />;
          })()}
        </Box>
      )}
      <Box>{children}</Box>
    </Anchor>
  );
});
