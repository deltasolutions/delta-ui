import { keyframes } from '@emotion/react';
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
import {
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDeltaTheme } from '../hooks';
import { mergeRefs } from '../utils';
import { Box, BoxProps } from './containers';

export interface TooltipProps extends Omit<BoxProps, 'children'> {
  content: ReactNode;
  disabled?: boolean;
  delay?: number;
  placement?: Placement;
  children: ReactElement;
}

export const Tooltip = ({
  content,
  disabled,
  delay = 1000,
  placement = 'top',
  children,
  ...rest
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const { space } = useDeltaTheme();
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
  const mergedRef = useMemo(
    () => mergeRefs([reference, (children as any)?.ref]),
    [reference, (children as any)?.ref]
  );
  return (
    <Fragment>
      {cloneElement(children, {
        ...getReferenceProps({ ref: mergedRef }),
      })}
      {open && !disabled && (
        <Box
          sx={{
            padding: 2,
            borderRadius: 3,
            backgroundColor: 'accentMundane',
            boxShadow: 1,
            color: 'accentOnMundane',
            fontSize: 2,
            fontWeight: 300,
            letterSpacing: '0.04em',
            backdropFilter: 'blur(10px)',
            animation: `${appear} 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940)`,
          }}
          {...getFloatingProps({
            ref: floating,
            style: {
              zIndex: 1000,
              position: strategy,
              top: y ?? '',
              left: x ?? '',
            },
            ...rest,
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
  to: {
    transform: 'scale(1)',
    opacity: 1,
  },
});
