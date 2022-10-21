import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { DropMenu, DropMenuItem, DropMenuProps } from '../../DropMenu';
import {
  DropContentContext,
  ComplexSearchContext,
  DropContext,
} from '../contexts';
import { ComplexSearchProposal } from '../types';

export interface DropKeysProps extends Partial<DropMenuProps> {
  proposal?: ComplexSearchProposal;
}

export const DropKeys = (props: DropKeysProps) => {
  const { handleClose, onItemClick } = useContext(DropContentContext);
  const { query } = useContext(DropContext);
  const { proposals } = useContext(ComplexSearchContext);
  return (
    <DropMenu
      closeOnEscape={false}
      handleClose={handleClose}
      onItemClick={onItemClick}
      {...props}
    >
      {proposals
        .filter(proposal =>
          proposal.label
            .toLocaleLowerCase()
            .includes(query?.toLocaleLowerCase() ?? '')
        )
        .map(({ label, key }) => (
          <DropMenuItem key={key} value={key}>
            {label}
          </DropMenuItem>
        ))}
    </DropMenu>
  );
};
