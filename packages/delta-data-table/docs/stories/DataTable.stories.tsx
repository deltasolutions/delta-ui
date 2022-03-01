import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Card } from 'restyler';
import {
  DataTable,
  useDataTableManager,
  useStoredDataTableManager,
  useToolbarColumnsEditor,
  useToolbarMaxRowCountEditor,
  useToolbarQuery,
  useToolbarTabs,
  useToolbarTabsEditor,
  useToolbarTitle
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

export const SimpleOne = () => {
  const title = useToolbarTitle('Table Title');
  const options = useMock({
    columnCount: 15,
    rowCount: 30,
    shouldLoadChunks: true
  });
  const manager = useStoredDataTableManager({
    id: 'story-data-table-simple-one',
    ...options
  });
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card sx={{ overflow: 'hidden' }}>
        <DataTable
          manager={manager}
          toolbar={{
            sections: [title]
          }}
        />
      </Card>
    </Box>
  );
};

export const ScrollTo = () => {
  const options = useMock({
    columnCount: 10,
    rowCount: 50,
    shouldLoadChunks: false
  });
  const manager = useDataTableManager({
    ...options
  });
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card sx={{ overflow: 'hidden' }}>
        <DataTable
          ref={list => {
            if (!list) {
              return;
            }
            requestAnimationFrame(() => {
              list.scrollTo(500);
            });
          }}
          manager={manager}
        />
      </Card>
    </Box>
  );
};
