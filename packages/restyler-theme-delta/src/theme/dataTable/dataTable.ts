import { BasicTheme } from 'restyler';
import { body } from './body';
import { cell } from './cell';
import { row } from './row';

export const dataTable: BasicTheme = {
  style: {},
  components: {
    body,
    row,
    cell
  }
};
