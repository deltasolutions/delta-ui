import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsLayoutThreeColumns } from 'react-icons/bs';
import { Box, Button, useModal } from 'restyler';
import { ToolbarColumnsEditorModal } from '../components';

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
  const { openModal } = useModal();
  return (
    <Button
      kind="icon"
      onClick={() =>
        openModal({
          render: props => <ToolbarColumnsEditorModal {...props} />
        })
      }
    >
      <Tooltip content={t('sections.columnsEditor')}>
        <Box>
          <BsLayoutThreeColumns />
        </Box>
      </Tooltip>
    </Button>
  );
};
