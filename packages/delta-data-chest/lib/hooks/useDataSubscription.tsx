import { DependencyList, useCallback, useEffect } from 'react';

export const useSubscription = <Event extends unknown>(
  subscribe: () => AsyncIterable<Event>,
  options: {
    deps: DependencyList;
    onEvent?: (event: Event) => void;
    onCancelRequest?: (subscription: AsyncIterable<Event>) => void;
  }
) => {
  const handleSubscription = useCallback(
    async (subscription: AsyncIterable<Event>) => {
      for await (const update of subscription) {
        options.onEvent?.(update);
      }
    },
    [options.onEvent]
  );
  useEffect(() => {
    const subscription = subscribe();
    handleSubscription(subscription);
    return () => {
      if (options.onCancelRequest) {
        options.onCancelRequest(subscription);
      } else {
        for (const fnName of cancelFnNames) {
          if (subscription[fnName]) {
            subscription[fnName]();
            break;
          }
        }
      }
    };
  }, options.deps);
};

const cancelFnNames = ['cancel', 'unsubscribe', 'close'];
