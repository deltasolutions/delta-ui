import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Card } from 'restyler';
import { DataTable, useStoredDataTableManager } from '../../lib';
import { useMock } from './useMock';

export default {
  title: 'General/DataTable'
} as Meta;

export const Basics = () => {
  const options = useMock({ columnCount: 5, rowCount: 30 });
  const manager = useStoredDataTableManager({
    id: 'story-data-table-basics',
    ...options
  });
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card>
        <DataTable manager={manager} />
      </Card>
    </Box>
  );
};

export const Empty = () => {
  const manager = useStoredDataTableManager({
    id: 'story-data-table-empty',
    initialContent: {
      data: [],
      columns: [{ key: 'id', header: '#' }],
      hasNextChunk: false
    }
  });
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card>
        <DataTable manager={manager} />
      </Card>
    </Box>
  );
};
