import { keyframes, useTheme } from '@emotion/react';
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
import { cloneElement, Fragment, ReactNode, useEffect, useState } from 'react';
import { Theme } from '../defaults';
import { Box, BoxProps } from './containers';

export interface TooltipProps extends Omit<BoxProps, 'children'> {
  content: ReactNode;
  delay?: number;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = ({
  children,
  content,
  delay,
  placement = 'top',
  ...rest
}: TooltipProps) => {
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
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: delay }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);
  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
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
            padding: 2,
            borderRadius: 3,
            backgroundColor: '#282828',
            boxShadow: 1,
            color: '#fff',
            fontSize: 2,
            fontWeight: 400,
            animation: `${appear} 0.15s`,
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
};

const appear = keyframes({
  from: {
    transform: 'scale(0.8)',
    opacity: 0,
  },
});
