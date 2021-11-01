import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'restyler';
import { LoadScreen } from '../LoadScreen';
import { AppContainer } from './AppContainer';

export default {
  title: 'General/AppContinaer'
} as Meta;

export const Basics = () => <AppContainer>It works</AppContainer>;

export const WithTranslation = () => (
  <AppContainer>
    <Suspense fallback={<LoadScreen />}>
      <Translated />
    </Suspense>
  </AppContainer>
);

const Translated = () => {
  const [t] = useTranslation();
  return <Box>{t('common:sections.feedItemRegistry')}</Box>;
};
