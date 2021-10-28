import { jsx } from '@theme-ui/core';
import { useMemo } from 'react';
import { BoxProps, useThemed } from 'restyler';
import { useFeedManager } from '../../hooks';
import { FeedComponentDef, FeedManagerOptions } from '../../models';
import { FeedContext } from './FeedContext';
import { FeedItemIdContext } from './FeedItemIdContext';
import { FeedSection } from './FeedSection';

export interface FeedProps extends BoxProps {
  managerOptions?: FeedManagerOptions;
}

export const Feed = ({ managerOptions, children, ...rest }: FeedProps) => {
  const ThemedFeed = useThemed('div', 'feed');
  const manager = useFeedManager(managerOptions);
  const { isActive, targetSections } = manager;
  const componentMap = useMemo(
    () =>
      (managerOptions?.registry ?? []).reduce(
        (p, v) => p.set(v.id, v),
        new Map<string, FeedComponentDef>()
      ),
    [managerOptions]
  );
  return (
    <FeedContext.Provider value={{ manager }}>
      <ThemedFeed {...rest}>
        {isActive
          ? targetSections.map(({ id, columns, items }) => {
              return (
                <FeedSection key={id} id={id} columns={columns ?? { count: 1 }}>
                  {items.map(
                    ({ id, componentId, managerComponentId, ...rest }) => {
                      const componentDef = componentMap.get(componentId);
                      if (!componentDef) {
                        console.warn(
                          'Unknown feed item component:',
                          componentId
                        );
                        return null;
                      }
                      const { component: Component } = componentDef;
                      return (
                        <FeedItemIdContext.Provider key={id} value={id}>
                          <Component {...rest} />
                        </FeedItemIdContext.Provider>
                      );
                    }
                  )}
                </FeedSection>
              );
            })
          : children}
      </ThemedFeed>
    </FeedContext.Provider>
  );
};
