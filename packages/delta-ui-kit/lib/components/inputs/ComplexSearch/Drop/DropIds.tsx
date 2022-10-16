import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { DropMenu, DropMenuItem, DropMenuProps } from '../../DropMenu';
import { DropContentContext, ComplexSearchContext } from '../contexts';
import { ComplexSearchPropose } from '../types';

export interface DropIdsProps extends Partial<DropMenuProps> {
  propose?: ComplexSearchPropose;
}

export const DropIds = ({ propose, ...rest }: DropIdsProps) => {
  const { handleClose, onItemClick } = useContext(DropContentContext);
  const { proposes } = useContext(ComplexSearchContext);
  return (
    <DropMenu handleClose={handleClose} onItemClick={onItemClick} {...rest}>
      {proposes.map(({ label, id }) => (
        <DropMenuItem key={id} value={id}>
          {label}
        </DropMenuItem>
      ))}
    </DropMenu>
  );
};
