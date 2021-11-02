import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
import { IoSync } from 'react-icons/io5';
import { Button } from 'restyler';
import { DataTableLayoutStatus } from '../../../models';
import { DataTableContext } from '../DataTableContext';

export const SyncAction = () => {
  const {
    manager: { layoutStatus }
  } = useContext(DataTableContext);
  const color = useMemo(
    () =>
      ({
        [DataTableLayoutStatus.Syncing]: 'info',
        [DataTableLayoutStatus.SyncFailed]: 'danger'
      }[layoutStatus] ?? 'inherit'),
    [layoutStatus]
  );
  return useMemo(
    () => (
      <Button
        kind="icon"
        sx={{
          cursor: 'help',
          color,
          '&:hover': { color }
        }}
      >
        <IoSync />
      </Button>
    ),
    [layoutStatus]
  );
};
