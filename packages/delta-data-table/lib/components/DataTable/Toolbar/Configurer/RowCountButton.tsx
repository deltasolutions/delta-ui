import { jsx } from '@theme-ui/core';
import { useCallback, useContext } from 'react';
import { IoBarcodeOutline } from 'react-icons/io5';
import { Button, useModal } from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { RowCountModal } from './RowCountModal';

export const RowCountButton = () => {
  const { manager } = useContext(DataTableContext);
  const { openModal } = useModal();
  const handleClick = useCallback(() => {
    openModal({
      kind: 'small',
      render: props => <RowCountModal dataTableManager={manager} {...props} />
    });
  }, [openModal, manager]);
  return (
    <Button kind="icon" onClick={handleClick}>
      <IoBarcodeOutline sx={{ transform: 'rotate(90deg)' }} />
    </Button>
  );
};
