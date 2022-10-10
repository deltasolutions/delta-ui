import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import { useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Box, Heading } from '../../containers';
import { TableSearch } from './TableSearch';

export default {
  title: 'Inputs/TableSearch',
  decorators: [compact('900px')],
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState<string[]>(defaultValue);

  return (
    <Box sx={{ height: '600px' }}>
      <Box>
        <TableSearch
          queryables={queryables}
          renderOptionOperator={operator => operators[operator]}
          renderSelectialOperator={operator => operators[operator]}
          value={value}
          onChange={setValue}
        />
      </Box>
      <Box
        sx={{
          mt: '50px',
          display: 'flex',
          gap: 5,
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <button
          onClick={() => {
            setValue(value.length > 0 ? [] : defaultValue);
          }}
        >
          toggle
        </button>
        <Box>
          <Heading level={5}>Raw value</Heading>
          <span>{JSON.stringify(value)}</span>
        </Box>
        <Box>
          <Heading level={5}>Fiql like</Heading>
        </Box>
      </Box>
    </Box>
  );
};
const operators = {
  '==': '=',
  '!=': '!=',
  '=gt=': '>',
  '=lt=': '<',
  '=in=': 'in',
  '=out=': 'not in',
};

const delay = ms => new Promise(res => setTimeout(res, ms));

const queryables = [
  {
    getItems: () => users,
    id: 'userId',
    operators: ['==', '!='],
    renderSelection: datum => (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Box
          sx={{
            borderRadius: '100%',
            width: '1em',
            height: '1em',
            backgroundColor: 'yellow',
          }}
        />
        <span>{datum?.username}</span>
      </Box>
    ),
    renderOption: datum => {
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              borderRadius: '100%',
              width: '2em',
              height: '2em',
              backgroundColor: 'yellow',
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <Heading level={6}>{datum?.name + ' ' + datum.surname}</Heading>
            </Box>
            <span sx={{ fontSize: 1, opacity: 0.7 }}>@{datum.username}</span>
          </Box>
        </Box>
      );
    },
    label: 'Author',
  },
  {
    getItems: async query => {
      await delay(4000);
      return urls;
    },
    operators: ['==', '!=', '=gt=', '=lt='],
    id: 'url',
    renderSelection: datum => <Box>{datum.value}</Box>,
    renderOption: datum => {
      return <Box>{datum.value}</Box>;
    },
    label: 'Url',
  },
  {
    id: 'dat000e',
    getItems: async query => {
      await delay(100);
      return appleStock
        .slice(0, 80)
        .map((i, index) => ({ ...i, id: index.toString() }));
    },
    operators: ['=gt=', '=lt='],
    renderSelection: datum => <Box>{datum.close}</Box>,
    renderOption: datum => (
      <Box>
        <span>{datum.close}</span>
        <span>{datum.date}</span>
      </Box>
    ),
    label: 'Date',
  },
  {
    id: 'dat444555e',
    getItems: async query => {
      await delay(100);
      return appleStock
        .slice(0, 80)
        .map((i, index) => ({ ...i, id: index.toString() }));
    },
    operators: ['=gt=', '=lt='],
    renderSelection: datum => <Box>{datum.close}</Box>,
    renderOption: datum => (
      <Box>
        <span>{datum.close}</span>
        <span>{datum.date}</span>
      </Box>
    ),
    label: 'Date',
  },
  {
    id: 'dat1111e',
    getItems: async query => {
      await delay(100);
      return appleStock
        .slice(0, 80)
        .map((i, index) => ({ ...i, id: index.toString() }));
    },
    operators: ['=gt=', '=lt='],
    renderSelection: datum => <Box>{datum.close}</Box>,
    renderOption: datum => (
      <Box>
        <span>{datum.close}</span>
        <span>{datum.date}</span>
      </Box>
    ),
    label: 'Date',
  },
  {
    id: 'dat222e',
    getItems: async query => {
      await delay(100);
      return appleStock
        .slice(0, 80)
        .map((i, index) => ({ ...i, id: index.toString() }));
    },
    operators: ['=gt=', '=lt='],
    renderSelection: datum => <Box>{datum.close}</Box>,
    renderOption: datum => (
      <Box>
        <span>{datum.close}</span>
        <span>{datum.date}</span>
      </Box>
    ),
    label: 'Date',
  },
  {
    id: 'dat333e',
    getItems: async query => {
      await delay(100);
      return appleStock
        .slice(0, 80)
        .map((i, index) => ({ ...i, id: index.toString() }));
    },
    operators: ['=gt=', '=lt='],
    renderSelection: datum => <Box>{datum.close}</Box>,
    renderOption: datum => (
      <Box>
        <span>{datum.close}</span>
        <span>{datum.date}</span>
      </Box>
    ),
    label: 'Date',
  },
  {
    id: 'dat444e',
    getItems: async query => {
      await delay(100);
      return appleStock
        .slice(0, 80)
        .map((i, index) => ({ ...i, id: index.toString() }));
    },
    operators: ['=gt=', '=lt='],
    renderSelection: datum => <Box>{datum.close}</Box>,
    renderOption: datum => (
      <Box>
        <span>{datum.close}</span>
        <span>{datum.date}</span>
      </Box>
    ),
    label: 'Date',
  },
];

const defaultValue = [
  'userId',
  'userId|=',
  '1',
  'url',
  'url|>',
  '3',
  'dat333e',
  'dat333e|>',
  '0',
];

const users = [
  { name: 'Alexander', id: '1', username: 'root', surname: 'Emelyanov' },
];

const urls = [
  { value: 'http://gitlab.ds.local/', id: '2' },
  { value: 'http://google.com/', id: '3' },
];
