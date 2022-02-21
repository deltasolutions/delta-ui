import { BasicTheme } from 'restyler';
import { columnsEditor } from './columnsEditor';
import { content } from './content';
import { query } from './query';
import { tabs } from './tabs';
import { tabsEditor } from './tabsEditor';
import { title } from './title';
import { toggler } from './toggler';

export const toolbar: BasicTheme = {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 3,
    borderBottom: '1px solid',
    borderBottomColor: 'border'
  },
  components: {
    columnsEditor,
    content,
    query,
    tabs,
    tabsEditor,
    title,
    toggler
  }
};
