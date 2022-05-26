import { autoUpdate, useFloating } from '@floating-ui/react-dom';
import { jsx } from '@theme-ui/core';
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
    multiple,
    tailored,
    portal,
    onClose,
    blurResistant,
    ...dropProps
  } = options;
  const { floatingPortal } = useContext(SystemContext);
  const [anchor, setAnchor] = useState<T | null>(null);
  const closeDropInstance = useRef<undefined | (() => void)>();
  const openDropInstance = usePortalled<HTMLDivElement>(
    ({ handleClose: handleImplicitClose }, ref) => {
      const { x, y, reference, floating, strategy, refs, update } =
        useFloating<T>();
      const clickOusideRef = useClickOutside<HTMLDivElement>(
        () => !blurResistant && handleClose()
      );
      const mergedRef = useMemo(
        () => mergeRefs([ref, floating, clickOusideRef]),
        []
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
      const { width = 0 } = anchor?.getBoundingClientRect() ?? {};
      return (
        <Drop
          ref={mergedRef}
          style={{
            position: strategy,
            left: x ?? '',
            top: y ?? '',
            width: tailored ? width : undefined,
          }}
          {...dropProps}
          handleClose={handleClose}
        >
          {render?.({
            ...dropProps,
            handleClose,
          })}
        </Drop>
      );
    },
    {
      deps: [anchor, render, tailored, onClose, ...deps],
      portal: floatingPortal,
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
