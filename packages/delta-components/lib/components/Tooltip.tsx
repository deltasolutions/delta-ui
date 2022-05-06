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
import {
  cloneElement,
  forwardRef,
  Fragment,
  ReactNode,
  useEffect,
  useState
} from 'react';
import { Box, BoxProps } from './Box';

export interface TooltipProps extends BoxProps {
  label: ReactNode;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = forwardRef(
  ({ children, label, placement = 'top' }: TooltipProps, ref) => {
    const [open, setOpen] = useState(false);
    const { x, y, reference, floating, strategy, context, refs, update } =
      useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        middleware: [offset(6), flip(), shift({ padding: 6 })]
      });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(context, {
        restMs: 1000
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
    return (
      <Fragment>
        {cloneElement(children, {
          ...getReferenceProps({
            ref: reference,
            ...children.props
          })
        })}
        {open && (
          <Box
            sx={{
              backgroundColor: 'decorative_subdued',
              fontSize: '14px',
              padding: '10px 6px',
              color: 'text_base',
              fontWeight: 500,
              borderRadius: '4px',
              boxShadow:
                '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)',
              borderWidth: '0.1px',
              borderStyle: 'solid',
              borderColor: 'border_base'
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
