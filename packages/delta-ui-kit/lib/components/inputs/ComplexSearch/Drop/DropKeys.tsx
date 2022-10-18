import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { DropMenu, DropMenuItem, DropMenuProps } from '../../DropMenu';
import { DropContentContext, ComplexSearchContext } from '../contexts';
import { ComplexSearchProposal } from '../types';

export interface DropKeysProps extends Partial<DropMenuProps> {
  propose?: ComplexSearchProposal;
}

export const DropKeys = ({ propose, ...rest }: DropKeysProps) => {
  const { handleClose, onItemClick } = useContext(DropContentContext);
  const { proposals: proposes } = useContext(ComplexSearchContext);
  return (
    <DropMenu handleClose={handleClose} onItemClick={onItemClick} {...rest}>
      {proposes.map(({ label, key }) => (
        <DropMenuItem key={key} value={key}>
          {label}
        </DropMenuItem>
      ))}
    </DropMenu>
  );
};
