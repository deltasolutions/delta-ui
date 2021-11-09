import { jsx } from '@theme-ui/core';
import { Fragment, useCallback, useContext } from 'react';
import { IoArrowUndoOutline, IoCloseOutline, IoOptions } from 'react-icons/io5';
import { Button } from 'restyler';
import { DataTableContext } from '../DataTableContext';
import { ColumnExclusionAction } from './ColumnExclusionAction';
import { RowCountAction } from './RowCountAction';
import { TabResetAction } from './TabResetAction';

export const Actions = () => {
  const {
    manager: { isConfiguringLayout, setIsConfiguringLayout }
  } = useContext(DataTableContext);

  if (isConfiguringLayout) {
    return (
      <Fragment>
        <ColumnExclusionAction />
        <RowCountAction />
        <TabResetAction />
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
