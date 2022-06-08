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
      sx={{
        display: 'flex',
        px: 4,
        minHeight: '40px',
        fontWeight: 400,
        color: 'onBackground',
        alignItems: 'center',
        '&:hover, &:focus, &:focus-visible': {
          color: 'primary',
        },
        ...(isActive && {
          color: 'primary',
        }),
      }}
      variant="pure"
      onClick={handleClick}
      {...rest}
    >
      {icon && (
        <Box sx={{ minWidth: '22px', mr: 3 }}>
          {(() => {
            const Icon = icon;
            return <Icon size={22} />;
          })()}
        </Box>
      )}
      <Box
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </Box>
    </Anchor>
  );
});
