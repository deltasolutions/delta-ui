import { BasicTheme } from 'restyler';
import { cell } from './cell';
import { content } from './content';
import { handle } from './handle';
import { row } from './row';
import { ruler } from './ruler';
import { toolbar } from './toolbar/toolbar';

export const dataTable: BasicTheme = {
  style: {},
  components: {
    cell,
    content,
    handle,
    row,
    ruler,
    toolbar
  }
};
