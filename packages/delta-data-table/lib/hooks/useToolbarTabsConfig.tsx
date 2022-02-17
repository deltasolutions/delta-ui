import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoFolderOutline } from 'react-icons/io5';
import { Box, Button, useModal } from 'restyler';
import { DataTableContext, ToolbarTabsConfigModal } from '../components';

export const useToolbarTabsConfig = () => {
  return useMemo(
    () => ({
      id: 'tabsConfig',
      toggler: <Toggler />
    }),
    []
  );
};

const Toggler = () => {
  const [t] = useTranslation('common');
  const { openModal } = useModal();
  const { manager } = useContext(DataTableContext);
  return (
    <Button
      kind="icon"
      onClick={() =>
        openModal({
          render: props => (
            <ToolbarTabsConfigModal manager={manager} {...props} />
          )
        })
      }
    >
      <Tooltip content={t('sections.tabsConfig')}>
        <Box>
          <IoFolderOutline />
        </Box>
      </Tooltip>
    </Button>
  );
};
