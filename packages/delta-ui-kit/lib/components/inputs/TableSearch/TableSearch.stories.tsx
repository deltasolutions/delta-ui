import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
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
          initialItems={{
            userId: users,
            url: urls,
          }}
          queryables={queryables}
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
          <FiqlLike value={value} />
        </Box>
      </Box>
    </Box>
  );
};

const FiqlLike = ({ value }) => {
  const fiqlOps = {
    '=': '==',
    '!=': '!=',
    '>': '=gt=',
    '<': '=lt=',
    in: '=in=',
    'not in': '=out=',
  };
  const chunks: string[][] = value.reduce((arr, item, index) => {
    const chunkIndex = Math.floor(index / 3);
    if (!arr[chunkIndex]) {
      arr[chunkIndex] = [];
    }
    arr[chunkIndex].push(item);
    return arr;
  }, []);

  return (
    <span>
      {chunks
        .map(chunk =>
          chunk
            .map((i, index) => {
              if (index === 0) {
                return i;
              }
              if (index === 1) {
                return fiqlOps[i.split('|')[1]];
              }
              if (index === 2) {
                return `"${i}"`;
              }
            })
            .join('')
        )
        .join(';')}
    </span>
  );
};
const delay = ms => new Promise(res => setTimeout(res, ms));

const queryables = [
  {
    getItems: async query => {
      await delay(2000);
      return users;
    },
    id: 'userId',
    operators: ['=', '!='],
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
        <span>{datum.username}</span>
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
              <Heading level={6}>{datum.name + ' ' + datum.surname}</Heading>
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
      await delay(1500);
      return urls;
    },
    operators: ['=', '!=', '>', '<'],
    id: 'url',
    renderSelection: datum => <Box>{datum.value}</Box>,
    renderOption: datum => {
      return <Box>{datum.value}</Box>;
    },
    label: 'Url',
  },
  {
    id: 'projectId',
    getItems: async query => {
      await delay(4000);
      return projects;
    },
    operators: ['in', 'not in'],
    renderSelection: datum => <Box>{datum.value}</Box>,
    renderOption: datum => datum.value,
    label: 'Project',
  },
];

const defaultValue = ['userId', 'userId|=', '1', 'url', 'url|>', '3'];

const users = [
  { name: 'Alexander', id: '1', username: 'root', surname: 'Emelyanov' },
];

const urls = [
  { value: 'http://gitlab.ds.local/', id: '2' },
  { value: 'http://google.com/', id: '3' },
];

const projects = [{ value: 'Peepo', id: '12' }];
