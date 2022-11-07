import { jsx } from '@theme-ui/core';
import { forwardRef, useContext } from 'react';
import { DropMenu, DropMenuItem, DropMenuProps } from '../../DropMenu';
import {
  ComplexSearchContext,
  DropContentContext,
  DropContext,
} from '../contexts';
import { ComplexSearchProposal } from '../types';

export interface DropOperatorsProps extends Partial<DropMenuProps> {
  proposal?: ComplexSearchProposal;
}

export const DropOperators = forwardRef<HTMLDivElement, DropOperatorsProps>(
  ({ proposal }, ref) => {
    const { handleClose, onItemClick } = useContext(DropContentContext);
    const { query } = useContext(DropContext);
    return (
      <DropMenu
        ref={ref}
        closeOnEscape={false}
        handleClose={handleClose}
        onItemClick={onItemClick}
      >
        {proposal?.operators
          ?.filter(operator =>
            operator.label
              .toLocaleLowerCase()
              .includes(query?.toLocaleLowerCase() ?? '')
          )
          .map(operator => (
            <DropMenuItem key={operator.key} value={operator.key}>
              {operator.label}
            </DropMenuItem>
          )) ?? []}
      </DropMenu>
    );
  }
);
