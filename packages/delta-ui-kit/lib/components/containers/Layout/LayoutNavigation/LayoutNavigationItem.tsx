import { jsx } from '@theme-ui/core';
import { forwardRef, useContext, useMemo } from 'react';
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
        px: 3,
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px',
        color: 'accentOnExterior',
        userSelect: 'none',
        gap: 2,
        ml: '10px',
        mr: '4px',
        borderRadius: '5px',
        height: '28px',
        p: '0 5px 0 8px',
        cursor: 'default',
        '&:hover, &:active, &:focus-visible': {
          color: 'accentOnExterior',
        },
        ...(isActive && {
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.04)',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }),
      }}
      variant="pure"
      {...rest}
    >
      {Icon && <Icon size="1.3em" />}
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
