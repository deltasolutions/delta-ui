import { useState } from 'react';

export interface Stack<T> {
  pop: () => T | undefined;
  push: (v: T) => void;
  reset: () => void;
}

export const useDataStack = <T>(init?: T[]): [T, T[], Stack<T>] => {
  const initStack: T[] = init !== undefined ? init : [];
  const [stack, setStack] = useState<T[]>(initStack);

  const pop = (): T | undefined => {
    if (stack.length === 0) {
      return undefined;
    }

    const newStack = [...stack.slice(0, stack.length - 1)];
    setStack(newStack);

    return newStack[newStack.length - 1];
  };

  const push = (v: T): void => {
    const newStack = [...stack, v];
    setStack(newStack);
  };

  const reset = (): void => {
    setStack(initStack);
  };

  return [stack[stack.length - 1], stack, { pop, push, reset }];
};
