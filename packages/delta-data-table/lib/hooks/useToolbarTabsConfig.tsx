import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoFolderOutline } from 'react-icons/io5';
import { Box, Button, useModal } from 'restyler';
import { ToolbarTabsConfigModal } from '../components';

export const useToolbarTabsConfig = () => {
  const [t] = useTranslation('common');
  const { openModal } = useModal();
  return useMemo(
    () => ({
      id: 'tabsConfig',
      toggler: (
        <Button
          kind="icon"
          onClick={() =>
            openModal({
              render: props => <ToolbarTabsConfigModal {...props} />
            })
          }
        >
          <Tooltip content={t('sections.tabsConfig')}>
            <Box>
              <IoFolderOutline />
            </Box>
          </Tooltip>
        </Button>
      )
    }),
    [t]
  );
};
