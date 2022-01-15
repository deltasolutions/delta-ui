import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoBarcodeOutline } from 'react-icons/io5';
import { Box, Button, useModal } from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { RowCountModal } from './RowCountModal';

export const RowCountButton = () => {
  const [t] = useTranslation();
  const { manager } = useContext(DataTableContext);
  const { openModal } = useModal();
  const handleClick = useCallback(() => {
    openModal({
      kind: 'small',
      render: props => <RowCountModal dataTableManager={manager} {...props} />
    });
  }, [openModal, manager]);
  return (
    <Button kind="icon" onClick={handleClick}>
      <Tooltip content={t('common:sections.rowCount')}>
        <Box>
          <IoBarcodeOutline sx={{ transform: 'rotate(90deg)' }} />
        </Box>
      </Tooltip>
    </Button>
  );
};
