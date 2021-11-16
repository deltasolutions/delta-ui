import { BasicTheme } from 'restyler';
import { cell } from './cell';
import { content } from './content';
import { handle } from './handle';
import { row } from './row';

export const dataTable: BasicTheme = {
  style: {},
  components: {
    cell,
    content,
    handle,
    row
  }
};
