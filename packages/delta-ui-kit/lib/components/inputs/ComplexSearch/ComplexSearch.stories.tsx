import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect, useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { ComplexSearch } from './ComplexSearch';
import { ComplexSearchSegment } from './types';

export default {
  title: 'Inputs/ComplexSearch',
  decorators: [compact('800px')],
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState<ComplexSearchSegment[]>([]);

  return (
    <Box>
      <ComplexSearch
        proposals={[
          {
            key: 'userId',
            label: 'Author',
            getSelectionQuery: datum => datum['username'],
            getOptionValue: datum => datum.id,
            operators: [
              { key: '=re=', label: '=' },
              { key: '!=', label: '!=' },
            ],
            getOptions: () => [
              { id: '43924234-2342342-34234', username: 'emelyanov' },
              { id: '213123-12312-31-333333', username: 'putin' },
            ],
            renderOption: datum => {
              return <span>@{datum.username}</span>;
            },
            renderSelection: datum => {
              return <span>@{datum.username}</span>;
            },
          },
          {
            key: 'tags.name',
            label: 'Tag',
            getOptionValue: datum => datum.id,
            operators: [
              { key: '=re=', label: '=' },
              { key: '!=', label: '!=' },
            ],
            getOptions: async () => {
              return await new Promise(res => setTimeout(res, 2000)).then(
                () => [
                  { id: '22u8e9213-9213-210', name: 'Bug' },
                  { id: '111-12312-31-333333', name: 'Feature' },
                ]
              );
            },
            getSelectionQuery: datum => datum.name,
            renderOption: datum => {
              return <span>{datum.name}</span>;
            },
            renderSelection: datum => {
              return <span>{datum.name}</span>;
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
                value: '43924234-2342342-34234',
              },
              { key: 'tags.name', operator: '!=', value: '22u8e9213-9213-210' },
            ])
          }
        >
          change state
        </Button>
        <pre>{JSON.stringify(value, null, 4)}</pre>
      </Box>
    </Box>
  );
};
const operators = {
  '==': '=',
  '!=': '!=',
  '=gt=': '>',
  '=lt=': '<',
};
