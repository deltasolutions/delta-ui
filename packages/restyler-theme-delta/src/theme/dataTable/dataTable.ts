import { BasicTheme } from 'restyler';
import { cell } from './cell';
import { configurer } from './configurer';
import { content } from './content';
import { handle } from './handle';
import { query } from './query';
import { row } from './row';
import { ruler } from './ruler';
import { toolbar } from './toolbar';

export const dataTable: BasicTheme = {
  style: {},
  components: {
    cell,
    configurer,
    content,
    handle,
    query,
    row,
    ruler,
    toolbar
  }
};
