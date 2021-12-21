import { jsx } from '@theme-ui/core';
import { useCallback, useContext } from 'react';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { Button, hash } from 'restyler';
import { DataTableContext } from '../../DataTableContext';

export const TabResetButton = () => {
  const {
    manager: {
      initialTab: { name, ...tabInitialState },
      updateActiveTab
    }
  } = useContext(DataTableContext);
  const handleReset = useCallback(() => {
    updateActiveTab({
      columnExclusions: [],
      columnOrder: [],
      columnSizes: {},
      ...tabInitialState
    });
  }, [hash(tabInitialState), updateActiveTab]);
  return (
    <Button kind="icon" onClick={handleReset}>
      <IoArrowUndoOutline />
    </Button>
  );
};
