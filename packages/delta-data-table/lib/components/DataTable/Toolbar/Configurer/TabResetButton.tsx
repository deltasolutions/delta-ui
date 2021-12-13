import { jsx } from '@theme-ui/core';
import { useCallback, useContext } from 'react';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { Button } from 'restyler';
import { DataTableContext } from '../../DataTableContext';

export const TabResetButton = () => {
  const {
    manager: { defaultTab, updateActiveTab }
  } = useContext(DataTableContext);
  const handleReset = useCallback(() => {
    updateActiveTab({
      columnExclusions: [],
      columnOrder: [],
      columnSizes: {},
      ...defaultTab
    });
  }, [defaultTab, updateActiveTab]);
  return (
    <Button kind="icon" onClick={handleReset}>
      <IoArrowUndoOutline />
    </Button>
  );
};
