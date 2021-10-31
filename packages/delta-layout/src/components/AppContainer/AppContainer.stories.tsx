import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import i18n from 'i18next';
import { AppContainer } from './AppContainer';

export default {
  title: 'General/AppContinaer'
} as Meta;

export const Basics = () => <AppContainer i18n={i18n}>It works</AppContainer>;
