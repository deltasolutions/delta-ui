import { jsx } from '@theme-ui/core';
import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  JsFormManagerOptions,
  JsFormProps,
  useJsFormManager,
} from '../../lib';

export const useStoryFormProps = <T extends unknown>(
  options: JsFormManagerOptions<T>
): JsFormProps<T | undefined> => {
  const [t] = useTranslation('common');
  const [submitsCount, increaseSubmitsCount] = useReducer(v => v + 1, 0);
  const manager = useJsFormManager<T, JsFormManagerOptions<T>>(options);
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
