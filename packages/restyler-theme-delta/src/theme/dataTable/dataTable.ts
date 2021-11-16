import { BasicTheme } from 'restyler';
import { cell } from './cell';
import { content } from './content';
import { row } from './row';

export const dataTable: BasicTheme = {
  style: {},
  components: {
    content,
    row,
    cell
  }
};
