import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSearchOutline } from 'react-icons/io5';
import { Box, Button } from 'restyler';
import { ToolbarQuery } from '../components';

export const useToolbarQuery = () => {
  const [t] = useTranslation('common');
  return useMemo(
    () => ({
      id: 'query',
      toggler: (
        <Button kind="icon">
          <Tooltip content={t('sections.query')}>
            <Box>
              <IoSearchOutline />
            </Box>
          </Tooltip>
        </Button>
      ),
      content: <ToolbarQuery />
    }),
    [t]
  );
};
