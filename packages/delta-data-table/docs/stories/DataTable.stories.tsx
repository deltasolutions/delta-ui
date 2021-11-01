import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Card } from 'restyler';
import { DataTable } from '../../lib';
import { useMock } from './useMock';

export default {
  title: 'General/DataTable'
} as Meta;

export const Basics = () => {
  const props = useMock({ columnCount: 5, rowCount: 100 });
  return (
    <Box sx={{ padding: 5 }}>
      <Card>
        <DataTable {...props} height={400} />
      </Card>
    </Box>
  );
};
