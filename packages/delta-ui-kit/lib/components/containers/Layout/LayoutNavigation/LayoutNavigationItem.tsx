import { jsx } from '@theme-ui/core';
import {
  ComponentType,
  forwardRef,
  HTMLAttributes,
  useContext,
  useMemo,
} from 'react';
import { Anchor, AnchorProps } from '../../../Anchor';
import { Box } from '../../Box';
import { NavigationContext } from './LayoutNavigation';

export interface LayoutNavigationItemProps
  extends Omit<AnchorProps, 'onClick'> {
  id: string;
  icon?: ComponentType<HTMLAttributes<Element>>;
  onClick?: () => void;
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
        py: '0.60rem',
        px: '1.35rem',
        position: 'relative',
        fontSize: 2,
        fontWeight: 'light',
        letterSpacing: '0.04em',
        cursor: 'pointer',
        userSelect: 'none',
        '&, &:hover, &:active, &:focus-visible': {
          color: 'accentOnContext',
        },
        ...(active
          ? { '&:before': getAccentBlockStyle(1) }
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
        }}
      >
        {Icon && (
          <Icon
            sx={{
              width: '1.55em',
              height: '1.55em',
              my: '-0.5em',
              mr: '0.5em',
              verticalAlign: 'middle',
            }}
          />
        )}
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
    backgroundColor: 'accentContext',
    opacity,
  } as const);
