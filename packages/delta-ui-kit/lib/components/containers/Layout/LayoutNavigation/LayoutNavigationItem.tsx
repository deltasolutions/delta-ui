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
  const active = useMemo(() => id === activeId, [id, activeId]);
  return (
    <Anchor
      ref={ref}
      sx={{
        py: 2,
        px: '1.35rem',
        position: 'relative',
        fontSize: 2,
        cursor: 'default',
        userSelect: 'none',
        '&, &:hover, &:active, &:focus-visible': {
          color: 'accentOnExterior',
        },
        ...(active
          ? { '&:before': getAccentBlockStyle(1.0) }
          : { '&:hover::before': getAccentBlockStyle(0.75) }),
      }}
      variant="pure"
      {...rest}
    >
      <Box
        sx={{
          zIndex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {Icon && <Icon size="1.3em" />}
        <Box
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {children}
        </Box>
      </Box>
    </Anchor>
  );
});

const getAccentBlockStyle = (opacity = 1) =>
  ({
    content: '""',
    position: 'absolute',
    display: 'block',
    top: 0,
    left: '0.8rem',
    width: 'calc(100% - 1.6rem)',
    height: '100%',
    borderRadius: 3,
    backgroundColor: 'accentExterior',
    opacity,
  } as const);
