import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useMemo, useState } from 'react';
import { IoBalloonOutline } from 'react-icons/io5';
import { Box, Button, Card, clone } from 'restyler';
import {
  DataTable,
  useDataTableManager,
  useStoredDataTableManager,
  useToolbarColumnsEditor,
  useToolbarMaxRowCountEditor,
  useToolbarQuery,
  useToolbarTabs,
  useToolbarTabsEditor
} from '../../lib';
import { useMock } from './useMock';

export default {
  title: 'DataTable'
} as Meta;

export const Basics = () => {
  const tabs = useToolbarTabs();
  const tabsEditor = useToolbarTabsEditor();
  const query = useToolbarQuery();
  const columnsEditor = useToolbarColumnsEditor();
  const maxRowCountEditor = useToolbarMaxRowCountEditor();
  const options = useMock({
    columnCount: 15,
    rowCount: 30,
    shouldLoadChunks: true
  });
  const manager = useStoredDataTableManager({
    id: 'story-data-table-basics',
    initialTab: {
      name: 'New tab'
    },
    ...options
  });
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card sx={{ overflow: 'hidden' }}>
        <DataTable
          manager={manager}
          toolbar={{
            sections: [
              tabs,
              query,
              tabsEditor,
              columnsEditor,
              maxRowCountEditor
            ]
          }}
        />
      </Card>
    </Box>
  );
};
