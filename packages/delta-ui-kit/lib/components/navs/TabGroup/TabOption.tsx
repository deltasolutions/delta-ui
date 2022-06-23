import { jsx } from '@theme-ui/core';
import { invert, rgba, saturate } from 'polished';
import { forwardRef, useCallback, useContext } from 'react';
import { useDeltaTheme } from '../../../hooks';
import { Anchor, AnchorProps } from '../../Anchor';
import { TabContext } from './TabContext';

export interface TabOptionProps extends Omit<AnchorProps, 'variant'> {
  id: string;
  variant?: 'chip' | 'bookmark';
}

export const TabOption = forwardRef<HTMLAnchorElement, TabOptionProps>(
  ({ id, variant, children, onClick, href, ...rest }, ref) => {
    const { colors } = useDeltaTheme();
    const { activeId } = useContext(TabContext);
    const active = id === activeId;
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
        href={href ?? '#'}
        sx={
          {
            bookmark: {
              display: 'block',
              fontSize: 2,
              fontWeight: 300,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              px: 3,
              py: 2,
              ...(active
                ? {
                    backgroundColor: 'accentContext',
                    color: 'accentOnContext',
                  }
                : {
                    backgroundColor: rgba(colors.accentContext, 0.5),
                    color: 'onContext',
                    '&:hover, &:focus-visible': {
                      backgroundColor: 'accentContext',
                      color: 'accentOnContext',
                    },
                  }),
            },
            chip: {
              display: 'block',
              fontSize: 2,
              padding: ['0.5rem 0.75rem'],
              borderRadius: 5,
              ...(active
                ? {
                    backgroundColor: 'accentOnContext',
                    '&, &:hover, &:active, &:focus-visible': {
                      color: invert(colors.accentOnContext),
                    },
                  }
                : {
                    backgroundColor: 'accentContext',
                    color: 'onContext',
                    '&:hover, &:active, &:focus-visible': {
                      color: 'accentOnContext',
                    },
                  }),
            },
          }[variant ?? '']
        }
        variant="pure"
        onClick={handleClick}
        {...rest}
      >
        {children}
      </Anchor>
    );
  }
);
