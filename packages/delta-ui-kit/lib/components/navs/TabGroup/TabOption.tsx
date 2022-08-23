import { jsx } from '@theme-ui/core';
import { invert, lighten, rgba, transparentize } from 'polished';
import {
  ComponentType,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useContext,
} from 'react';
import { useDeltaTheme } from '../../../hooks';
import { Anchor, AnchorProps } from '../../Anchor';
import { layoutMainNoise } from '../../containers';
import { TabContext } from './TabContext';

export interface TabOptionProps extends Omit<AnchorProps, 'variant'> {
  id: string;
  variant?: 'chip' | 'bookmark';
  icon?: ComponentType<HTMLAttributes<Element>>;
}

export const TabOption = forwardRef<HTMLAnchorElement, TabOptionProps>(
  ({ id, variant, icon: Icon, children, onClick, href, ...rest }, ref) => {
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
    const bookmarkActiveStyle = {
      backgroundColor: 'accentContext',
      color: 'accentOnContext',
      background:
        `linear-gradient(` +
        `${colors.accentBackground} 0, ` +
        `${colors.accentBackground} 40px` +
        `), ${layoutMainNoise}`,
    };
    return (
      <Anchor
        ref={ref}
        href={href ?? '#'}
        sx={
          {
            bookmark: {
              display: 'block',
              height: '35px',
              lineHeight: '35px',
              fontSize: 2,
              fontWeight: 300,
              letterSpacing: '0.04em',
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              px: '1em',
              pt: '2px',
              ...(active
                ? bookmarkActiveStyle
                : {
                    backgroundColor: rgba(colors.accentContext, 0.4),
                    color: 'onContext',
                    '&:hover, &:focus-visible': bookmarkActiveStyle,
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
        {Icon && (
          <Icon
            sx={{
              verticalAlign: 'middle',
              width: '1.55em',
              height: '1.55em',
              mt: '-2px',
              mr: '0.5em',
            }}
          />
        )}
        {children}
      </Anchor>
    );
  }
);
