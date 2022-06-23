import { jsx } from '@theme-ui/core';
import { useFormManager, FormProps, FormManagerOptions } from 'delta-jsf';
import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, useJsFormDefaults } from '../../lib';

export const useStoryFormProps = <T extends unknown>(
  options: FormManagerOptions<T>
): FormProps<T | undefined> => {
  const [t] = useTranslation('common');
  const [submitsCount, increaseSubmitsCount] = useReducer(v => v + 1, 0);
  const { registry } = useJsFormDefaults();
  const manager = useFormManager<T, FormManagerOptions<T>>({
    ...options,
    registry,
  });
  return {
    manager,
    children: (
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <Button
          zoomable
          color="primary"
          type="submit"
          variant="outlined"
          onClick={increaseSubmitsCount}
        >
          {t('actions.submit')}
          {manager.isSubmitted ? ` (${submitsCount})` : null}
        </Button>
      </Box>
    ),
  };
};
