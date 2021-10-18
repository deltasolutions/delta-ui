import { jsx } from '@theme-ui/core';
import { ComponentType } from 'react';
import { hash } from 'restyler';
import { FeedOptions } from '../../models';
import { Feed } from './Feed';
import { FeedSection } from './FeedSection';

export interface ConfiguredFeedProps extends FeedOptions {
  registry: {
    [key: string]: ComponentType;
  };
}

export const ConfiguredFeed = ({ sections, registry }: ConfiguredFeedProps) => {
  return (
    <Feed>
      {sections.map(section => {
        const key = hash(section);
        const { columns, items } = section;
        return (
          <FeedSection key={key} columns={columns ?? { count: 1 }}>
            {items.map((item, i) => {
              const itemKey = `${key}-${i}`;
              if (typeof item === 'string') {
                const Component = registry[item] ?? (() => null);
                return <Component key={itemKey} />;
              }
              if (typeof item === 'object') {
                const { component, ...rest } = item;
                const Component = registry[component] ?? (() => null);
                return <Component key={itemKey} {...rest} />;
              }
              console.warn('Unknown feed item:', item);
              return null;
            })}
          </FeedSection>
        );
      })}
    </Feed>
  );
};
