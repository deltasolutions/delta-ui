import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Box } from 'restyler';
import { AppContainer } from './AppContainer';

export default {
  title: 'General/AppContinaer'
} as Meta;

export const Basics = () => <AppContainer i18n={i18n}>It works</AppContainer>;

export const WithTranslation = () => (
  <AppContainer i18n={i18n}>
    <Translated />
  </AppContainer>
);

const Translated = () => {
  const [t] = useTranslation();
  return <Box>{t('common:sections.feedItemRegistry')}</Box>;
};
