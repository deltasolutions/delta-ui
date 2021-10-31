import { jsx } from '@theme-ui/core';
import { useThemed } from 'restyler';

export const LoadScreen = () => {
  const ThemedLoadScreen = useThemed('div', 'loadScreen');
  const ThemedLoadScreenSpinner = useThemed('div', 'loadScreen.spinner');
  return (
    <ThemedLoadScreen>
      <ThemedLoadScreenSpinner />
    </ThemedLoadScreen>
  );
};
