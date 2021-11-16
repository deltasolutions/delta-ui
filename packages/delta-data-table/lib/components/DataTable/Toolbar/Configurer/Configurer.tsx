import { jsx } from '@theme-ui/core';
import { useContext, useEffect } from 'react';
import { Box } from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { ColumnExclusionButton } from './ColumnExclusionButton';
import { RowCountButton } from './RowCountButton';
import { TabResetButton } from './TabResetButton';

export const Configurer = () => {
  const {
    isHeightAdaptive,
    manager: { setIsConfiguringLayout }
  } = useContext(DataTableContext);
  useEffect(() => {
    setIsConfiguringLayout(true);
    return () => {
      setIsConfiguringLayout(false);
    };
  }, []);
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TabResetButton />
      {!isHeightAdaptive && <RowCountButton />}
      <ColumnExclusionButton />
    </Box>
  );
};
