import { jsx } from '@theme-ui/core';
import { ReactNode, useMemo } from 'react';
import { useThemed } from 'restyler';

export const useToolbarTitle = (title: ReactNode) => {
  const ThemedTitle = useThemed('div', 'dataTable.title');
  return useMemo(
    () => ({
      id: 'title',
      content:
        typeof title === 'string' ? <ThemedTitle>{title}</ThemedTitle> : title
    }),
    [title]
  );
};
