import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { Box, Button, hash } from 'restyler';
import { DataTableContext } from '../../DataTableContext';

export const TabResetButton = () => {
  const [t] = useTranslation();
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
      <Tooltip content={t('common:actions.reset')}>
        <Box>
          <IoArrowUndoOutline />
        </Box>
      </Tooltip>
    </Button>
  );
};
