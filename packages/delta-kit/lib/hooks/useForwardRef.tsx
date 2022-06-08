import {
  DependencyList,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  RefAttributes,
  useMemo,
} from 'react';

export type ForwardRefCRF<T, P> =
  | ForwardRefRenderFunction<T, P>
  | ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;

export const useForwardRef = <T, P>(
  componentOrRenderFunction: ForwardRefCRF<T, P>,
  deps: DependencyList
) => {
  return useMemo(
    () =>
      typeof componentOrRenderFunction === 'function'
        ? // Actually, forwardRef result is an object,
          // so it's safe to perform casting here.
          forwardRef<T, P>(componentOrRenderFunction as any)
        : componentOrRenderFunction,
    deps
  );
};
