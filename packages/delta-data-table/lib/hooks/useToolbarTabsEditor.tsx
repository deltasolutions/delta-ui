import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsWindow } from 'react-icons/bs';
import { Box, Button, useModal } from 'restyler';
import { DataTableContext, ToolbarTabsEditorModal } from '../components';

export const useToolbarTabsEditor = () => {
  return useMemo(
    () => ({
      id: 'tabsEditor',
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
            <ToolbarTabsEditorModal manager={manager} {...props} />
          )
        })
      }
    >
      <Tooltip content={t('sections.tabsEditor')}>
        <Box>
          <BsWindow />
        </Box>
      </Tooltip>
    </Button>
  );
};
