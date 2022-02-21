import { jsx } from '@theme-ui/core';
import { AppContainer } from 'delta-layout';
import { theme } from '../../restyler-theme-delta/lib';
import 'delta-tooltip/dist/index.css';

export const parameters = {
  controls: { hideNoControlsWarning: true },
  layout: 'fullscreen'
};

export const decorators = [
  Story => {
    return (
      <AppContainer theme={theme}>
        <Story />
      </AppContainer>
    );
  }
];
