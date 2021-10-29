import { MenuProps } from 'restyler';
import { LayoutMenuDef } from './LayoutMenuDef';

export interface LayoutMenuOptions extends LayoutMenuDef {
  onGroupClick: MenuProps['onGroupClick'];
  onItemClick: MenuProps['onItemClick'];
}
