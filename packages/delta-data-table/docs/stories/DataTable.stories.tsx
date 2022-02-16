import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useMemo, useState } from 'react';
import { IoBalloonOutline } from 'react-icons/io5';
import { Box, Button, Card, clone } from 'restyler';
import {
  DataTable,
  useDataTableManager,
  useStoredDataTableManager,
  useToolbarQuery,
  useToolbarTabs,
  useToolbarTabsConfig
} from '../../lib';
import { useMock } from './useMock';

export default {
  title: 'DataTable'
} as Meta;

export const Basics = () => {
  const tabs = useToolbarTabs();
  const tabsConfig = useToolbarTabsConfig();
  const query = useToolbarQuery();
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
            sections: [tabs, tabsConfig, query]
          }}
        />
      </Card>
    </Box>
  );
};

export const ColumnRenderer = () => {
  const options = useMock({
    columnCount: 15,
    rowCount: 30,
    shouldLoadChunks: true
  });
  const modifiedOptions = useMemo(() => {
    const cloned = clone(options);
    Object.assign(cloned.initialContent.columns[0], {
      render: v => JSON.stringify(v)
    });
    return cloned;
  }, [options]);
  const manager = useDataTableManager(modifiedOptions);
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card sx={{ overflow: 'hidden' }}>
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
        flexDirection: 'column',
        gap: 4
      }}
    >
      <Box>
        <Button
          kind="primary"
          onClick={() => {
            manager.setData(
              manager.data.length > 0 ? [] : options.initialContent.data
            );
          }}
        >
          Toggle Data
        </Button>
      </Box>
      <Box ref={setElement} sx={{ flex: '1 0 200px' }}>
        <Card sx={{ overflow: 'hidden' }}>
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
      <Card sx={{ overflow: 'hidden' }}>
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

export const WithToolbarExtras = () => {
  const options = useMock({ columnCount: 15, rowCount: 100 });
  const manager = useDataTableManager(options);
  return (
    <Box sx={{ padding: 5, minHeight: '100vh' }}>
      <Card sx={{ overflow: 'hidden' }}>
        <DataTable
          manager={manager}
          toolbar={{
            sections: ['tabs', 'query', 'configurer'],
            extras: (
              <Button kind="icon" sx={{ ml: 2 }}>
                <IoBalloonOutline />
              </Button>
            )
          }}
        />
      </Card>
    </Box>
  );
};
