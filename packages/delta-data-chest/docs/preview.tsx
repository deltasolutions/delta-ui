import { jsx } from '@theme-ui/core';
import { AppContainer } from 'delta-layout';

export const parameters = {
  controls: { hideNoControlsWarning: true }
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

const commonNamespace = {
  sections: {
    feedItemRegistry: 'Item Registry',
    feedSectionColumns: 'Section Columns'
  },
  actions: {
    apply: 'Apply',
    cancel: 'Cancel'
  },
  labels: {
    anyCountThatFit: 'Any Count That Fit',
    count: 'Count',
    fixedCount: 'Fixed Count',
    layoutType: 'Layout Type',
    minimumWidth: 'Minimum Width',
    search: 'Search'
  },
  errors: {
    wrongFormat: 'Wrong format'
  }
};
