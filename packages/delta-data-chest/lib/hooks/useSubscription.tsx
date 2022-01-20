import { DependencyList, useCallback, useEffect } from 'react';

type Subscription<Event> = AsyncIterable<Event> | AsyncGenerator<Event>;

export const useSubscription = <Event extends unknown>(
  subscribe: () => Subscription<Event> | Promise<Subscription<Event>>,
  options: {
    deps: DependencyList;
    onEvent?: (event: Event) => void;
    onCancelRequest?: (subscription: Subscription<Event>) => void;
  }
) => {
  const handleSubscription = useCallback(
    async (subscriptionPromise: Promise<Subscription<Event>>) => {
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
