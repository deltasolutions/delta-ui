import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoGridOutline } from 'react-icons/io5';
import { Box, Button } from 'restyler';
import { ToolbarTabs } from '../components';

export const useToolbarTabs = () => {
  const [t] = useTranslation('common');
  return useMemo(
    () => ({
      id: 'tabs',
      toggler: (
        <Button kind="icon">
          <Tooltip content={t('sections.tabs')}>
            <Box>
              <IoGridOutline />
            </Box>
          </Tooltip>
        </Button>
      ),
      content: <ToolbarTabs />
    }),
    [t]
  );
};
