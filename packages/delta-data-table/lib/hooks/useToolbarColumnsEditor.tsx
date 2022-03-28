import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsLayoutThreeColumns } from 'react-icons/bs';
import { Box, Button, useModal } from 'restyler';
import { DataTableContext, ToolbarColumnsEditorModal } from '../components';

export const useToolbarColumnsEditor = () => {
  return useMemo(
    () => ({
      id: 'columnsEditor',
      toggler: <Toggler />
    }),
    []
  );
};

const Toggler = () => {
  const [t] = useTranslation('common');
  const { manager } = useContext(DataTableContext);
  const openModal = useModal(
    props => <ToolbarColumnsEditorModal manager={manager} {...props} />,
    { deps: [manager] }
  );
  return (
    <Button kind="icon" onClick={() => openModal()}>
      <Tooltip content={t('sections.columnsEditor')}>
        <Box>
          <BsLayoutThreeColumns />
        </Box>
      </Tooltip>
    </Button>
  );
};
