import { jsx } from '@theme-ui/core';
import { useCallback, useContext } from 'react';
import { IoTextOutline } from 'react-icons/io5';
import { Button, useModal } from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { NameModal } from './NameModal';

export const NameButton = () => {
  const { manager } = useContext(DataTableContext);
  const { openModal } = useModal();
  const handleClick = useCallback(() => {
    openModal({
      kind: 'small',
      render: props => <NameModal dataTableManager={manager} {...props} />
    });
  }, [openModal, manager]);
  return (
    <Button kind="icon" onClick={handleClick}>
      <IoTextOutline />
    </Button>
  );
};
