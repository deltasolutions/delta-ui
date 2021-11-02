import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Card } from 'restyler';
import { DataTable, useDataTableManager } from '../../lib';
import { useMock } from './useMock';

export default {
  title: 'General/DataTable'
} as Meta;

export const Basics = () => {
  const options = useMock({ columnCount: 5, rowCount: 100 });
  const manager = useDataTableManager(options);
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card>
        <DataTable manager={manager} />
      </Card>
    </Box>
  );
};
