import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  Fragment,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { isHtmlElement } from '../utils';

export interface ImperativePortal extends ReactElement {
  set: (children: ReactNode[]) => void;
  push: (child: ReactNode) => void;
  remove: (child: ReactNode) => void;
}

export const useImperativePortal = (
  target: HTMLElement | ImperativePortal | null
) => {
  const [element, setElement] = useState<HTMLElement | null>(
    isHtmlElement(target) ? target : null
  );
  useEffect(() => {
    if (target === element) {
      return;
    }
    if (isHtmlElement(target) || target === null) {
      setElement(target);
      return;
    }
    let isActual = true;
    const key = Math.random();
    const container = <div key={key} ref={v => isActual && setElement(v)} />;
    target.push(container);
    return () => {
      isActual = false;
      target.remove(container);
    };
  }, [target]);
  const portalRef = useRef<{ update: () => void }>(null);
  const childrenRef = useRef<ReactNode[]>([]);
  const set = useCallback((children: ReactNode[]) => {
    childrenRef.current = children;
    portalRef.current?.update();
  }, []);
  const push = useCallback(
    (child: ReactNode) => set(childrenRef.current.concat([child])),
    []
  );
  const remove = useCallback(
    (child: ReactNode) => set(childrenRef.current.filter(v => v !== child)),
    []
  );
  return useMemo(
    () =>
      ({
        ...(
          <Fragment>
            <UpdatablePortal
              ref={portalRef}
              childrenRef={childrenRef}
              element={element}
            />
          </Fragment>
        ),
        set,
        push,
        remove,
      } as ImperativePortal),
    [element]
  );
};

const UpdatablePortal = forwardRef<
  { update: () => void },
  { childrenRef: MutableRefObject<ReactNode>; element?: HTMLElement | null }
>(({ childrenRef, element }, ref) => {
  const [_, update] = useReducer(v => v + 1, 0);
  useImperativeHandle(ref, () => ({ update }), []);
  return element
    ? createPortal(<Fragment>{childrenRef.current}</Fragment>, element)
    : null;
});
