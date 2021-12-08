import { configureActions } from '@storybook/addon-actions';
import '../lib/index.css';

configureActions({
  depth: 100,
  limit: 20
});

export const parameters = {};
