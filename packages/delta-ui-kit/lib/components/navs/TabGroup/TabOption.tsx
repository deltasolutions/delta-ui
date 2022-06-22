import { jsx } from '@theme-ui/core';
import { rgba } from 'polished';
import { forwardRef, useCallback, useContext } from 'react';
import { useDeltaTheme } from '../../../hooks';
import { Anchor, AnchorProps } from '../../Anchor';
import { TabContext } from './TabContext';

export interface TabOptionProps extends Omit<AnchorProps, 'variant'> {
  id: string;
  variant?: 'layout';
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
          variant === 'layout'
            ? {
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
                      backgroundColor: 'accentBackground',
                      color: 'accentOnBackground',
                    }
                  : {
                      backgroundColor: rgba(colors.accentBackground, 0.5),
                      color: 'onBackground',
                      '&:hover, &:focus-visible': {
                        backgroundColor: 'accentBackground',
                        color: 'accentOnBackground',
                      },
                    }),
              }
            : {
                display: 'block',
                fontSize: 2,
                padding: '8px 12px',
                borderRadius: 5,
                ...(active
                  ? {
                      backgroundColor: 'accentOnContext',
                      color: '#000000',
                      '&:hover, &:focus-visible, &:active': {
                        color: '#000000',
                      },
                    }
                  : {
                      backgroundColor: 'rgba(255, 255, 255, 0.07)',
                      color: 'accentOnContext',
                      '&:hover, &:active, &:focus-visible': {
                        backgroundColor: 'rgba(255, 255, 255, 0.09)',
                      },
                    }),
              }
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
