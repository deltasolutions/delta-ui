import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { DropMenu, DropMenuItem, DropMenuProps } from '../../DropMenu';
import { ComplexSearchContext, DropContentContext } from '../contexts';
import { ComplexSearchProposal } from '../types';

export interface DropOperatorsProps extends Partial<DropMenuProps> {
  propose?: ComplexSearchProposal;
}

export const DropOperators = ({ propose }: DropOperatorsProps) => {
  const { handleClose, onItemClick } = useContext(DropContentContext);
  return (
    <DropMenu handleClose={handleClose} onItemClick={onItemClick}>
      {propose?.operators?.map(operator => (
        <DropMenuItem key={operator.key} value={operator.key}>
          {operator.label}
        </DropMenuItem>
      )) ?? []}
    </DropMenu>
  );
};
