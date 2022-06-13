import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback, useContext, useMemo } from 'react';
import { Anchor, AnchorProps } from '../../../Anchor';
import { Box } from '../../Box';
import { NavigationContext } from './LayoutNavigation';

interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export interface LayoutNavigationItemProps
  extends Omit<AnchorProps, 'onClick'> {
  id: string;
  onClick?: () => void;
  icon?: (props: IconProps) => JSX.Element;
}

export const LayoutNavigationItem = forwardRef<
  HTMLAnchorElement,
  LayoutNavigationItemProps
>(({ children, icon: Icon, id, ...rest }, ref) => {
  const { activeId } = useContext(NavigationContext);
  const isActive = useMemo(() => id === activeId, [id, activeId]);

  return (
    <Anchor
      ref={ref}
      sx={{
        position: 'relative',
        py: 2,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        fontSize: 1,
        userSelect: 'none',

        gap: 2,
        ...(isActive
          ? {
              mx: 2,
              pl: 2,
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: 'white',
              '&:active': {
                color: 'onBackground',
              },
              '&:hover, &:active, &:focus-visible': {
                color: 'white',
              },
            }
          : {
              px: 3,
              color: 'onExterior',
              '&:hover, &:active, &:focus-visible': {
                mx: 2,
                pl: 2,
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: 'white',
              },
            }),
      }}
      variant="pure"
      {...rest}
    >
      {Icon && <Icon size="1.5em" />}
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
