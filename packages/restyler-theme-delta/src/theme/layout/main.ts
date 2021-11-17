import { BasicTheme } from 'restyler';

export const main: BasicTheme = {
  style: ({ sidebar }) => ({
    flex: '1 1 auto',
    height: '100%',
    minWidth: 0,
    paddingLeft: sidebar ? 4 : undefined,
    paddingY: 4
  })
};
