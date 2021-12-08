import { ComponentType } from 'react';
import { MenuProps } from 'restyler';
import { LayoutMenuDef } from './LayoutMenuDef';

export interface LayoutMenuOptions extends LayoutMenuDef {
  onGroupClick: MenuProps['onGroupClick'];
  onItemClick: MenuProps['onItemClick'];
  icons?: { [key: string]: ComponentType };
}
