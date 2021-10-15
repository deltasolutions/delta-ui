import { BasicTheme } from 'restyler';
import { anchor } from './anchor';
import { box } from './box';
import { button } from './button';
import { card } from './card';
import { checkbox } from './checkbox';
import { collapse } from './collapse';
import { defaults } from './defaults';
import { file } from './file';
import { form } from './form';
import { heading } from './heading';
import { input } from './input';
import { layer } from './layer';
import { layout } from './layout';
import { masonry } from './masonry';
import { menu } from './menu';
import { modal } from './modal';
import { notification } from './notification';
import { pieChart } from './pieChart';
import { progress } from './progress';
import { radio } from './radio';
import { scroll } from './scroll';
import { select } from './select';
import { systemContainer } from './systemContainer';
import { tab } from './tab';
import { table } from './table';
import { textArea } from './textArea';

export const theme: BasicTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  radii: [0, 2, 4, 8],
  fontSizes: [10, 12, 14, 16, 20, 26, 42, 48, 56],
  fonts: {
    body: 'Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontWeights: {
    body: 400,
    heading: 400
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    primary: '#5DA2DE',
    success: '#53B956',
    warning: '#ECA843',
    danger: '#EF6D64',
    unknown: '#B3B3B3',
    surface: '#FFFFFF',
    background: '#EFEFEF',
    exterior: '#2C2F31',
    border: 'rgba(0, 0, 0, 0.17)',
    accentPrimary: '#4A8DC7',
    accentSuccess: '#40AA44',
    accentWarning: '#D69431',
    accentDanger: '#DF5248',
    accentUnknown: '#A3A3A3',
    accentSurface: '#F3F3F3',
    accentBackground: '#E0E0E0',
    accentExterior: '#1C1D1F',
    accentBorder: 'rgba(0, 0, 0, 0.45)',
    onPrimary: '#FFFFFF',
    onSuccess: '#FFFFFF',
    onDanger: '#FFFFFF',
    onUnknown: '#FFFFFF',
    onSurface: '#525252',
    onBackground: '#121212',
    onExterior: '#FAFAFA'
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 1px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 1px -2px rgba(0, 0, 0, 0.12), ' +
      '0px 2px 2px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 3px -2px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 4px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
    '0px 2px 4px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 5px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 6px 10px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    '0px 5px 5px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 8px 10px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
    '0px 6px 6px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 10px 14px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 18px 3px rgba(0, 0, 0, 0.12)'
  ],
  medias: {
    narrow: '@media (max-width: 1024px)',
    wide: '@media (min-width: 1024.2px)'
  },
  components: {
    anchor,
    box,
    button,
    card,
    checkbox,
    collapse,
    defaults,
    file,
    form,
    heading,
    input,
    layer,
    layout,
    masonry,
    menu,
    modal,
    notification,
    pieChart,
    progress,
    radio,
    scroll,
    select,
    systemContainer,
    tab,
    table,
    textArea
  }
};
