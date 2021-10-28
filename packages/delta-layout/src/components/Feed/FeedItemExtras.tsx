import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { Button, useThemed } from 'restyler';
import { FeedContext } from './FeedContext';

export interface FeedItemExtrasProps {
  id: string;
}

export const FeedItemExtras = ({ id }: FeedItemExtrasProps) => {
  const ThemedFeedItemExtras = useThemed('div', 'feed.item.extras');
  const {
    manager: { removeItem }
  } = useContext(FeedContext);
  return (
    <ThemedFeedItemExtras>
      <Button kind="icon" onClick={() => removeItem(id)}>
        <RiDeleteBin2Fill />
      </Button>
    </ThemedFeedItemExtras>
  );
};
