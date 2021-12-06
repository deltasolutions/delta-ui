import { DependencyList, useCallback, useEffect } from 'react';

export const useSubscription = <Event extends unknown>(
  subscribe: () => AsyncIterable<Event> | Promise<AsyncIterable<Event>>,
  options: {
    deps: DependencyList;
    onEvent?: (event: Event) => void;
    onCancelRequest?: (subscription: AsyncIterable<Event>) => void;
  }
) => {
  const handleSubscription = useCallback(
    async (subscriptionPromise: Promise<AsyncIterable<Event>>) => {
      for await (const update of await subscriptionPromise) {
        options.onEvent?.(update);
      }
    },
    [options.onEvent]
  );
  useEffect(() => {
    const subscriptionPromise = Promise.resolve(subscribe());
    handleSubscription(subscriptionPromise);
    return () => {
      subscriptionPromise.then(subscription => {
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
      });
    };
  }, options.deps);
};

const cancelFnNames = ['cancel', 'unsubscribe', 'close'];
