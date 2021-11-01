import { jsx } from '@theme-ui/core';
import i18n from 'i18next';
import { useLayoutEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

export const parameters = {
  controls: { hideNoControlsWarning: true }
};

export const decorators = [
  Story => {
    useLayoutEffect(() => {
      i18n
        .use(initReactI18next)
        .use({
          type: 'backend',
          read(
            language: string,
            namespace: string,
            callback: (errorValue: unknown, translations: any) => void
          ) {
            setTimeout(() => {
              callback(null, commonNamespace);
            }, 1000);
          }
        })
        .init({
          lng: 'en',
          interpolation: { escapeValue: false }
        });
    }, []);
    return (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
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
