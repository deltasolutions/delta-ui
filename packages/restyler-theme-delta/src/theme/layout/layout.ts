import { BasicTheme } from 'restyler';
import { body } from './body';
import { container } from './container';
import { footer } from './footer';
import { header } from './header';
import { main } from './main';
import { sidebar } from './sidebar';

export const layout: BasicTheme = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  components: {
    body,
    container,
    footer,
    header,
    main,
    sidebar
  }
};
