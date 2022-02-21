import { BasicTheme } from 'restyler';
import { cell } from './cell';
import { columnsEditor } from './columnsEditor';
import { configurer } from './configurer';
import { content } from './content';
import { handle } from './handle';
import { query } from './query';
import { row } from './row';
import { ruler } from './ruler';
import { tabs } from './tabs';
import { tabsEditor } from './tabsEditor';
import { toolbar } from './toolbar';

export const dataTable: BasicTheme = {
  style: {},
  components: {
    cell,
    columnsEditor,
    configurer,
    content,
    handle,
    query,
    row,
    ruler,
    tabs,
    tabsEditor,
    toolbar
  }
};
