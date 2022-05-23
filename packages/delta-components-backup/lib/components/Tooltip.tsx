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
  useDismiss
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import { ReactElement, useMemo } from 'react';
import {
  cloneElement,
  forwardRef,
  Fragment,
  ReactNode,
  useEffect,
  useState
} from 'react';
import { useTheme } from '../hooks';
import { mergeRefs } from '../utils';
import { Box, BoxProps } from './Box';

export interface TooltipProps extends BoxProps {
  label: ReactNode;
  delay?: number;
  placement?: Placement;
}

export const Tooltip = forwardRef(
  (
    { children, label, delay, placement = 'top', ...rest }: TooltipProps,
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const { space, ticks } = useTheme();
    const padding = space[2];
    const { x, y, reference, floating, strategy, context, refs, update } =
      useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        middleware: [offset(padding), flip(), shift({ padding })]
      });
    const stableRef = useMemo(
      () => mergeRefs([ref, reference]),
      [ref, reference]
    );

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(context, {
        restMs: delay ?? ticks[5]
      }),
      useFocus(context),
      useRole(context, { role: 'tooltip' }),
      useDismiss(context)
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
        {cloneElement(children as ReactElement<any, any>, {
          ...getReferenceProps({
            ref: stableRef,
            ...rest
          })
        })}
        {open && (
          <Box
            sx={{
              backgroundColor: 'surfaceTint',
              color: 'onSurfaceTint',
              fontSize: 1,
              paddingY: 4,
              paddingX: 2,
              fontWeight: 500,
              borderRadius: 3,
              boxShadow: 1
            }}
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? '',
                left: x ?? ''
              }
            })}
          >
            {label}
          </Box>
        )}
      </Fragment>
    );
  }
);