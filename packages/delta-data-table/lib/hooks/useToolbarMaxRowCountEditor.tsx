import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsViewList } from 'react-icons/bs';
import { Box, Button, useModal } from 'restyler';
import { DataTableContext, ToolbarMaxRowCountEditorModal } from '../components';

export const useToolbarMaxRowCountEditor = () => {
  return useMemo(
    () => ({
      id: 'maxRowCountEditor',
      toggler: <Toggler />
    }),
    []
  );
};

const Toggler = () => {
  const [t] = useTranslation('common');
  const { manager } = useContext(DataTableContext);
  const openModal = useModal(
    props => <ToolbarMaxRowCountEditorModal manager={manager} {...props} />,
    {
      deps: [manager],
      kind: 'small'
    }
  );
  return (
    <Button kind="icon" onClick={() => openModal()}>
      <Tooltip content={t('sections.maxRowCountEditor')}>
        <Box>
          <BsViewList />
        </Box>
      </Tooltip>
    </Button>
  );
};
