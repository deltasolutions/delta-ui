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
  const { manager } = useContext(DataTableContext);
  const openModal = useModal(
    props => <ToolbarTabsEditorModal manager={manager} {...props} />,
    {
      deps: [manager],
      kind: 'medium'
    }
  );
  return (
    <Button kind="icon" onClick={() => openModal()}>
      <Tooltip content={t('sections.tabsEditor')}>
        <Box>
          <BsWindow />
        </Box>
      </Tooltip>
    </Button>
  );
};
