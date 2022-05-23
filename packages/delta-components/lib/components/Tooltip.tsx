import { useTheme } from '@emotion/react';
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import { ReactElement } from 'react';
import {
  cloneElement,
  forwardRef,
  Fragment,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Theme } from '../defaults';
import { useSharedRef } from '../hooks';
import { Box, BoxProps } from './Box';

export interface TooltipProps extends Omit<BoxProps, 'children'> {
  content: ReactNode;
  delay?: number;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, delay, placement = 'top', ...rest }, ref) => {
    const [open, setOpen] = useState(false);
    const { space } = useTheme() as Theme;
    const padding = space[2];
    const { x, y, reference, floating, strategy, context, refs, update } =
      useFloating<HTMLDivElement>({
        placement,
        open,
        onOpenChange: setOpen,
        middleware: [offset(padding), flip(), shift({ padding })],
      });
    const sharedRef = useSharedRef(null, [ref, reference]);
    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(context, { restMs: delay }),
      useFocus(context),
      useRole(context, { role: 'tooltip' }),
      useDismiss(context),
    ]);
    useEffect(() => {
      if (refs.reference.current && refs.floating.current && open) {
        return autoUpdate(
          refs.reference.current,
          refs.floating.current,
          update
        );
      }
      return () => {};
    }, [refs.reference, refs.floating, update, open]);
    if (!children) {
      return null;
    }
    return (
      <Fragment>
        {cloneElement(children, {
          ...getReferenceProps({ ref: reference, ...rest }),
        })}
        {open && (
          <Box
            sx={{
              padding: 3,
              borderRadius: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: 2,
              fontWeight: 400,
            }}
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? '',
                left: x ?? '',
              },
            })}
          >
            {content}
          </Box>
        )}
      </Fragment>
    );
  }
);
