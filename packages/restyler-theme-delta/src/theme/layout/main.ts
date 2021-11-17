import { BasicTheme } from 'restyler';

export const main: BasicTheme = {
  style: ({ sidebar }) => ({
    flex: '1 1 auto',
    minWidth: 0,
    marginLeft: sidebar ? 4 : undefined,
    marginTop: 4
  })
};
