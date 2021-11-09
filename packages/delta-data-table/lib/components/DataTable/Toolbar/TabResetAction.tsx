import { jsx } from '@theme-ui/core';
import { useCallback, useContext } from 'react';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { Button } from 'restyler';
import { DataTableContext } from '../DataTableContext';

export const TabResetAction = () => {
  const {
    manager: { updateActiveTab }
  } = useContext(DataTableContext);
  const handleReset = useCallback(() => {
    updateActiveTab({
      columnExclusions: [],
      columnOrder: [],
      columnSizes: {}
    });
  }, [updateActiveTab]);
  return (
    <Button kind="icon" onClick={handleReset}>
      <IoArrowUndoOutline />
    </Button>
  );
};
