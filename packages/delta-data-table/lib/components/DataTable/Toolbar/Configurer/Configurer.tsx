import { jsx } from '@theme-ui/core';
import { useContext, useEffect } from 'react';
import { Box, useThemed } from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { ColumnExclusionButton } from './ColumnExclusionButton';
import { RowCountButton } from './RowCountButton';
import { TabResetButton } from './TabResetButton';

export const Configurer = () => {
  const ThemedConfigurer = useThemed('div', 'dataTable.configurer');
  const {
    maxHeight,
    manager: { setIsConfiguringLayout }
  } = useContext(DataTableContext);
  useEffect(() => {
    setIsConfiguringLayout(true);
    return () => {
      setIsConfiguringLayout(false);
    };
  }, []);
  return (
    <ThemedConfigurer>
      <TabResetButton />
      {maxHeight === undefined && <RowCountButton />}
      <ColumnExclusionButton />
    </ThemedConfigurer>
  );
};
