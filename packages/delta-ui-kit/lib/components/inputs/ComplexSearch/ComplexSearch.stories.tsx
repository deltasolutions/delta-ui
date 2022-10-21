import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { exoplanets as exp } from '@visx/mock-data';
import { useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { ComplexSearch } from './ComplexSearch';
import { ComplexSearchSegment } from './types';

export default {
  title: 'Inputs/ComplexSearch',
  decorators: [compact('800px')],
} as Meta;

const users = [
  { id: '1', username: 'root228' },
  { id: '3', username: 'root1337' },
];

const exoplanets = exp.slice(0, 100);

export const Basics = () => {
  const [value, setValue] = useState<ComplexSearchSegment[]>([]);

  return (
    <Box>
      <ComplexSearch
        placeholder="Search something"
        proposals={[
          {
            key: 'userId',
            label: 'Author',
            getSelectionQuery: value =>
              users.find(u => u.id === value)?.username ?? '',
            operators: [
              { key: '=re=', label: '=' },
              { key: '!=', label: '!=' },
            ],
            getOptions: query =>
              users
                .filter(u =>
                  u.username
                    .toLocaleLowerCase()
                    .includes(query?.toLocaleLowerCase() ?? '')
                )
                .map(u => u.id),
            renderOption: option => {
              return <span>@{users.find(u => u.id === option)?.username}</span>;
            },
            renderSelection: value => {
              return <span>@{users.find(u => u.id === value)?.username}</span>;
            },
          },
          {
            key: 'exoplanet',
            label: 'Exoplanet',
            operators: [
              { key: '=re=', label: '=' },
              { key: '!=', label: '!=' },
            ],
            getOptions: async query => {
              return await new Promise(res => setTimeout(res, 1000)).then(() =>
                exoplanets
                  .filter(i =>
                    i.name
                      .toLocaleLowerCase()
                      .includes(query?.toLocaleLowerCase() ?? '')
                  )
                  .map(i => i.name)
              );
            },
            getSelectionQuery: value =>
              exoplanets.find(t => t.name === value)?.name ?? '',
            renderOption: option => {
              return (
                <span>{exoplanets.find(t => t.name === option)?.name}</span>
              );
            },
            renderSelection: value => {
              return (
                <span>{exoplanets.find(t => t.name === value)?.name}</span>
              );
            },
          },
          {
            key: 'name',
            label: 'Name',
            operators: [
              { key: '=re=', label: '=' },
              { key: '!=', label: '!=' },
            ],
          },
        ]}
        value={value}
        onChange={setValue}
      />

      <Box sx={{ height: '600px' }}>
        <Button
          onClick={() =>
            setValue([
              {
                key: 'userId',
                operator: '=re=',
                value: '1',
              },
            ])
          }
        >
          Change state
        </Button>
        <pre>{JSON.stringify(value, null, 4)}</pre>
      </Box>
    </Box>
  );
};
