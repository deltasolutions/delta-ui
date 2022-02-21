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
  const { openModal } = useModal();
  const { manager } = useContext(DataTableContext);
  return (
    <Button
      kind="icon"
      onClick={() =>
        openModal({
          kind: 'small',
          render: props => (
            <ToolbarMaxRowCountEditorModal manager={manager} {...props} />
          )
        })
      }
    >
      <Tooltip content={t('sections.maxRowCountEditor')}>
        <Box>
          <BsViewList />
        </Box>
      </Tooltip>
    </Button>
  );
};
