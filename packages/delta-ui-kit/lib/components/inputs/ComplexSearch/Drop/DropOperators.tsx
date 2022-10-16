import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { DropMenu, DropMenuItem, DropMenuProps } from '../../DropMenu';
import { ComplexSearchContext, DropContentContext } from '../contexts';
import { ComplexSearchPropose } from '../types';

export interface DropOperatorsProps extends Partial<DropMenuProps> {
  propose?: ComplexSearchPropose;
}

export const DropOperators = ({ propose }: DropOperatorsProps) => {
  const { handleClose, onItemClick } = useContext(DropContentContext);
  const { renderOperator } = useContext(ComplexSearchContext);
  return (
    <DropMenu handleClose={handleClose} onItemClick={onItemClick}>
      {propose?.operators?.map(operator => (
        <DropMenuItem key={operator} value={operator}>
          {renderOperator ? renderOperator(operator) : operator}
        </DropMenuItem>
      )) ?? []}
    </DropMenu>
  );
};
