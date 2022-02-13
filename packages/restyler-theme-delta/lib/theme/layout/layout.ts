import { BasicTheme } from 'restyler';
import { body } from './body';
import { container } from './container';
import { footer } from './footer';
import { header } from './header';
import { main } from './main';
import { navbar } from './navbar';
import { sidebar } from './sidebar';

export const layout: BasicTheme = {
  style: {},
  components: {
    content: {
      style: {
        display: 'flex',
        minHeight: '100vh'
      }
    },

    body,
    container,
    footer,
    header,
    main,
    sidebar,
    navbar
  }
};
