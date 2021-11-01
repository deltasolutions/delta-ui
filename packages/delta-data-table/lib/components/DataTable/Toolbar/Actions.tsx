import { jsx } from '@theme-ui/core';
import { Fragment, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoArrowUndoOutline, IoCloseOutline, IoOptions } from 'react-icons/io5';
import { Button } from 'restyler';
import { DataTableContext } from '../DataTableContext';
import { ColumnExclusionAction } from './ColumnExclusionAction';
import { SyncAction } from './SyncAction';

export const Actions = () => {
  const [t] = useTranslation('common');
  const { updateActiveTab, isConfiguringLayout, setIsConfiguringLayout } =
    useContext(DataTableContext);

  const handleReset = useCallback(() => {
    updateActiveTab({
      columnExclusions: [],
      columnOrder: [],
      columnSizes: {}
    });
  }, [updateActiveTab]);

  if (isConfiguringLayout) {
    return (
      <Fragment>
        <SyncAction />
        <ColumnExclusionAction />
        <Button kind="icon" onClick={handleReset}>
          <IoArrowUndoOutline />
        </Button>
        <Button kind="icon" onClick={() => setIsConfiguringLayout(false)}>
          <IoCloseOutline />
        </Button>
      </Fragment>
    );
  }

  return (
    <Button kind="icon" onClick={() => setIsConfiguringLayout(true)}>
      <IoOptions />
    </Button>
  );
};
