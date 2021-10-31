import { BasicTheme } from 'restyler';
import { container } from './container';
import { content } from './content';
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
    container,
    content,
    main,
    sidebar,
    header,
    footer
  }
};
