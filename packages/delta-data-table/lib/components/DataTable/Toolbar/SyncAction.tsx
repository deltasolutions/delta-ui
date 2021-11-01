import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSyncCircleSharp } from 'react-icons/io5';
import { Button } from 'restyler';
import { jsx } from '@theme-ui/core';
import { Tooltip } from '../../Tooltip';
import { DataTableContext } from '../DataTableContext';
import { DataTableLayoutStatus } from '../types';

export const SyncAction = () => {
  const [t] = useTranslation('common');
  const { layoutStatus } = useContext(DataTableContext);
  const color = useMemo(
    () =>
      ({
        [DataTableLayoutStatus.Syncing]: 'info',
        [DataTableLayoutStatus.SyncFailed]: 'danger'
      }[layoutStatus] ?? 'inherit'),
    [layoutStatus]
  );
  const label = useMemo(
    () =>
      ({
        [DataTableLayoutStatus.Syncing]: t('labels.sync'),
        [DataTableLayoutStatus.SyncFailed]: t('errors.sync')
      }[layoutStatus] ?? t('successes.sync')),
    [layoutStatus]
  );
  return useMemo(
    () => (
      <Tooltip content={label}>
        <Button
          kind="icon"
          sx={{
            color,
            cursor: 'help',
            transition: 'color 0.2s linear',
            '&:hover': { color }
          }}
        >
          <IoSyncCircleSharp />
        </Button>
      </Tooltip>
    ),
    [layoutStatus]
  );
};
