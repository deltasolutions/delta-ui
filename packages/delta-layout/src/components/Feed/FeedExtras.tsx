import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Button, useThemed } from 'restyler';
import { FeedContext } from './FeedContext';

export interface FeedExtrasProps {}

export const FeedExtras = () => {
  const ThemedFeedExtras = useThemed('div', 'feed.extras');
  const {
    manager: { addSection }
  } = useContext(FeedContext);
  return (
    <ThemedFeedExtras>
      <Button kind="icon" onClick={addSection}>
        <IoMdAdd />
      </Button>
    </ThemedFeedExtras>
  );
};
