import { jsx } from '@theme-ui/core';
import { forwardRef, useContext } from 'react';
import { DropRendererProps } from '../../../../hooks';
import { Box } from '../../../containers';
import { ComplexSearchContext, DropContentContext } from '../contexts';
import { DropKeys } from './DropKeys';
import { DropOperators } from './DropOperators';
import { DropValues } from './DroValues';

export interface DropPropos extends DropRendererProps {
  onItemClick: (value: string) => void;
}

export const Drop = forwardRef<HTMLDivElement, DropPropos>(
  ({ handleClose, onItemClick }, ref) => {
    const { segments, editingIndex, proposals } =
      useContext(ComplexSearchContext);
    const currentItem =
      (editingIndex as number) >= 0 && (segments[editingIndex as number] ?? {});
    const proposal = proposals.find(pr => pr.key === currentItem?.['key']);
    const token =
      typeof currentItem['value'] === 'string'
        ? 'value'
        : typeof currentItem['operator'] === 'string'
        ? 'operator'
        : 'key';

    const DropContent = {
      key: DropKeys,
      value: DropValues,
      operator: DropOperators,
    }[token];

    return (
      <Box ref={ref} sx={{ maxHeight: '500px', overflowY: 'auto' }}>
        <DropContentContext.Provider value={{ handleClose, onItemClick }}>
          <DropContent proposal={proposal!} />
        </DropContentContext.Provider>
      </Box>
    );
  }
);
