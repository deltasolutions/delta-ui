import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Card } from 'restyler';
import {
  DataTable,
  useDataTableManager,
  useStoredDataTableManager
} from '../../lib';
import { useMock } from './useMock';

export default {
  title: 'General/DataTable'
} as Meta;

export const Basics = () => {
  const options = useMock({ columnCount: 5, rowCount: 30 });
  // const manager = useDataTableManager(options);
  const manager = useStoredDataTableManager({
    id: 'story-data-table',
    ...options
  });
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card sx={{ height: '400px' }}>
        <DataTable manager={manager} sx={{ height: '100%' }} />
      </Card>
    </Box>
  );
};
