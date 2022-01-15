import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoTextOutline } from 'react-icons/io5';
import { Box, Button, useModal } from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { NameModal } from './NameModal';

export const NameButton = () => {
  const [t] = useTranslation();
  const { manager } = useContext(DataTableContext);
  const { openModal } = useModal();
  const handleClick = useCallback(() => {
    openModal({
      kind: 'small',
      render: props => <NameModal dataTableManager={manager} {...props} />
    });
  }, [openModal, manager]);
  return (
    <Button kind="icon" onClick={handleClick}>
      <Tooltip content={t('common:sections.tabName')}>
        <Box>
          <IoTextOutline />
        </Box>
      </Tooltip>
    </Button>
  );
};
