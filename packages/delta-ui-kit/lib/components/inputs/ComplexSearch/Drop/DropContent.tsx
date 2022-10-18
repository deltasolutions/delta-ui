import { jsx } from '@theme-ui/core';
import { forwardRef, useContext } from 'react';
import { DropRendererProps } from '../../../../hooks';
import { Box } from '../../../containers';
import { ComplexSearchContext, DropContentContext } from '../contexts';
import { DropKeys } from './DropKeys';
import { DropOperators } from './DropOperators';
import { DropValues } from './DroValues';

export interface DropContentProps extends DropRendererProps {
  onItemClick: (value: string) => void;
}

export const DropContent = forwardRef<HTMLDivElement, DropContentProps>(
  ({ handleClose, onItemClick }, ref) => {
    const {
      items,
      editingIndex,
      proposals: proposes,
    } = useContext(ComplexSearchContext);
    const currentItem =
      (editingIndex as number) >= 0 && (items[editingIndex as number] ?? {});
    const propose = proposes.find(
      propose => propose.key === currentItem?.['key']
    );
    const token =
      typeof currentItem['value'] === 'string'
        ? 'value'
        : typeof currentItem['operator'] === 'string'
        ? 'operator'
        : 'key';

    const TokenMenu = {
      key: DropKeys,
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
