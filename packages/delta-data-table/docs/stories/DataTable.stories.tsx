import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
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
  const options = useMock({
    columnCount: 15,
    rowCount: 30,
    shouldLoadChunks: true
  });
  const manager = useStoredDataTableManager({
    id: 'story-data-table-basics',
    ...options
  });
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card>
        <DataTable
          manager={manager}
          toolbar={{
            sections: ['tabs', 'query', 'configurer']
          }}
        />
      </Card>
    </Box>
  );
};

export const HeightAdaptive = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const options = useMock({ columnCount: 15, rowCount: 20 });
  const manager = useDataTableManager(options);
  return (
    <Box
      sx={{
        padding: 5,
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch'
      }}
    >
      <Box ref={setElement}>
        <Card>
          <DataTable
            manager={manager}
            maxHeight={element?.offsetHeight}
            toolbar={{
              sections: ['tabs', 'query', 'configurer']
            }}
          />
        </Card>
      </Box>
    </Box>
  );
};

export const Empty = () => {
  const options = useMock({ columnCount: 15, rowCount: 0 });
  const manager = useDataTableManager(options);
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card>
        <DataTable
          manager={manager}
          toolbar={{
            sections: ['tabs', 'query', 'configurer']
          }}
        />
      </Card>
    </Box>
  );
};
