import { autoUpdate, Placement, useFloating } from '@floating-ui/react-dom';
import { jsx } from '@theme-ui/core';
import FocusTrap from 'focus-trap-react';
import {
  useCallback,
  useContext,
  DependencyList,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import { Drop, DropProps, SystemContext } from '../components';
import { mergeRefs } from '../utils';
import { useClickOutside } from './useClickOutside';
import { ImperativePortal } from './useImperativePortal';
import { PortalledProps, usePortalled } from './usePortalled';

export interface DropRendererProps<C extends unknown = never>
  extends PortalledProps<C> {}

export interface DropRenderer<C extends unknown = never> {
  (props: DropRendererProps<C>): JSX.Element;
}

export interface DropOptions extends Omit<DropProps, 'children'> {
  deps: DependencyList;
  placement?: Placement;
  portal?: ImperativePortal;
  multiple?: boolean;
  tailored?: boolean;
  blurResistant?: boolean;
  onClose?: () => void;
}

export const useDrop = <T extends HTMLElement, C extends unknown = never>(
  render: DropRenderer<C>,
  options: DropOptions
) => {
  const {
    deps,
    placement,
    multiple,
    tailored,
    portal,
    onClose,
    blurResistant,
    style,
    ...dropProps
  } = options;
  const { floatingPortal } = useContext(SystemContext);
  const [anchor, setAnchor] = useState<T | null>(null);
  const closeDropInstance = useRef<undefined | (() => void)>();
  const openDropInstance = usePortalled<HTMLDivElement>(
    ({ handleClose: handleImplicitClose }, ref) => {
      const overlayRef = useRef<HTMLDivElement>(null);
      const { x, y, reference, floating, strategy, refs, update } =
        useFloating<T>({
          placement,
          whileElementsMounted: autoUpdate,
        });
      const clickOusideRef = useClickOutside<HTMLDivElement>(
        () => !blurResistant && handleClose()
      );
      const mergedRef = useMemo(
        () => mergeRefs([ref, floating, clickOusideRef]),
        [ref, floating, clickOusideRef]
      );

      const handleClose = useCallback(() => {
        handleImplicitClose();
        onClose?.();
        closeDropInstance.current = undefined;
      }, []);
      useEffect(() => {
        reference(anchor);
      }, []);
      useEffect(() => {
        if (!refs.reference.current || !refs.floating.current) {
          return;
        }
        return autoUpdate(
          refs.reference.current,
          refs.floating.current,
          update
        );
      }, [refs.reference.current, refs.floating.current, update]);
      useEffect(() => {
        if (!blurResistant) {
          const keyDownListener = e => {
            if (e.key === 'Escape') {
              handleClose();
            }
          };
          window.addEventListener('keydown', keyDownListener);
          return () => {
            window.removeEventListener('keydown', keyDownListener);
          };
        }
        return;
      }, []);
      const { width = 0 } = anchor?.getBoundingClientRect() ?? {};
      const content = render?.({
        handleClose,
        ...dropProps,
      });
      return (
        <Drop
          ref={mergedRef}
          style={{
            zIndex: 10000,
            position: strategy,
            left: x ?? '-100vw',
            top: y ?? '-100vh',
            width: tailored ? width : undefined,
            ...style,
          }}
        >
          <FocusTrap
            active={blurResistant == false}
            focusTrapOptions={{
              allowOutsideClick: true,
              escapeDeactivates: false,
              fallbackFocus: () => overlayRef.current ?? document.body,
              ...(typeof blurResistant === 'object' ? blurResistant : {}),
            }}
          >
            {content}
          </FocusTrap>
        </Drop>
      );
    },
    {
      deps: [anchor, render, tailored, onClose, ...deps],
      portal: portal ?? floatingPortal,
    }
  );
  const openDrop = useCallback(() => {
    if (closeDropInstance.current && !multiple) {
      return closeDropInstance.current;
    }
    const fn = openDropInstance();
    const fnWrap = () => {
      fn();
      onClose?.();
      closeDropInstance.current = undefined;
    };
    return (closeDropInstance.current = fnWrap);
  }, [openDropInstance]);
  return [openDrop, setAnchor] as const;
};
