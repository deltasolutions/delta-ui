import { Fragment, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BiReset } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { RiLayoutColumnFill } from 'react-icons/ri';
import { Button } from 'restyler';
import { jsx } from '@theme-ui/core';
import { Tooltip } from '../../Tooltip';
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
        <Tooltip content={t('actions.reset')}>
          <Button kind="icon" onClick={handleReset}>
            <BiReset />
          </Button>
        </Tooltip>
        <Tooltip content={t('actions.close')}>
          <Button kind="icon" onClick={() => setIsConfiguringLayout(false)}>
            <IoMdClose />
          </Button>
        </Tooltip>
      </Fragment>
    );
  }

  return (
    <Tooltip content={t('actions.updateLayout')}>
      <Button kind="icon" onClick={() => setIsConfiguringLayout(true)}>
        <RiLayoutColumnFill />
      </Button>
    </Tooltip>
  );
};
