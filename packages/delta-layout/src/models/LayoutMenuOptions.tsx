import { MenuProps } from 'restyler';

export interface LayoutMenuOptions {
  getActiveIds: () => string[];
  onGroupClick: MenuProps['onGroupClick'];
  onItemClick: MenuProps['onItemClick'];
}
