import { jsx } from '@theme-ui/core';
import { forwardRef, useContext } from 'react';
import { DropRendererProps } from '../../../../hooks';
import { Box } from '../../../containers';
import { ComplexSearchContext, DropContentContext } from '../contexts';
import { DropIds } from './DropIds';
import { DropOperators } from './DropOperators';
import { DropValues } from './DroValues';

export interface DropContentProps extends DropRendererProps {
  onItemClick: (value: string) => void;
}

export const DropContent = forwardRef<HTMLDivElement, DropContentProps>(
  ({ handleClose, onItemClick }, ref) => {
    const { items, editingIndex, proposes } = useContext(ComplexSearchContext);
    const currentItem =
      (editingIndex as number) >= 0 && (items[editingIndex as number] ?? {});
    const propose = proposes.find(
      propose => propose.id === currentItem?.['id']
    );
    const token =
      typeof currentItem['value'] === 'string'
        ? 'value'
        : typeof currentItem['operator'] === 'string'
        ? 'operator'
        : 'id';

    const TokenMenu = {
      id: DropIds,
      value: DropValues,
      operator: DropOperators,
    }[token];

    return (
      <Box ref={ref}>
        <DropContentContext.Provider value={{ handleClose, onItemClick }}>
          <TokenMenu propose={propose!} />
        </DropContentContext.Provider>
      </Box>
    );
  }
);
