import { jsx } from '@theme-ui/core';
import { AppContainer } from 'delta-layout';

import 'delta-tooltip/dist/index.css';

export const parameters = {
  controls: { hideNoControlsWarning: true },
  layout: 'fullscreen'
};

export const decorators = [
  Story => {
    return (
      <AppContainer>
        <Story />
      </AppContainer>
    );
  }
];
