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
export interface LayoutNavigationItemProps extends AnchorProps {
  id: string;
  icon?: (props: IconProps) => JSX.Element;
}

export const LayoutNavigationItem = forwardRef<
  HTMLAnchorElement,
  LayoutNavigationItemProps
>(({ children, onClick, icon: Icon, id, ...rest }, ref) => {
  const { activeId } = useContext(NavigationContext);
  const isActive = useMemo(() => id === activeId, [id, activeId]);
  return (
    <Anchor
      ref={ref}
      sx={{
        display: 'flex',
        px: 4,
        ...(Icon
          ? { minHeight: 3, fontSize: 2 }
          : { fontSize: 1, minHeight: 2 }),
        fontWeight: 400,
        color: 'onBackground',
        alignItems: 'center',
        '&:hover, &:focus, &:focus-visible': {
          color: 'accentOnSurface',
        },
        ...(isActive && {
          color: 'accentOnSurface',
        }),
      }}
      variant="pure"
      {...rest}
    >
      {Icon && (
        <Box sx={{ minWidth: '22px', mr: 3 }}>
          <Icon size={22} />
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
