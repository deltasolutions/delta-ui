import { BasicTheme, mergeBasicThemes } from 'restyler';
import { input } from './input';

export const textArea: BasicTheme = mergeBasicThemes({}, input, {
  style: {
    display: 'block',
    resize: 'vertical'
  }
});
