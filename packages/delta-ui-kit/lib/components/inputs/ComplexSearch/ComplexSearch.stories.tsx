import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect, useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { ComplexSearch, ItemType } from './ComplexSearch';

export default {
  title: 'Inputs/ComplexSearch',
  decorators: [compact('800px')],
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState<ItemType[]>([]);

  return (
    <Box>
      <ComplexSearch
        proposes={[
          {
            id: 'userId',
            label: 'Author',
            operators: ['==', '!='],
            getItems: () => [
              { id: '43924234-2342342-34234', username: 'emelyanov' },
              { id: '213123-12312-31-333333', username: 'putin' },
            ],
            renderOption: datum => {
              return <span>@{datum.username}</span>;
            },
            renderSelectial: datum => {
              return <span>@{datum.username}</span>;
            },
          },
          {
            id: 'tags.name',
            label: 'Tag',
            operators: ['==', '!=', '=gt=', '=lt='],
            getItems: async () =>
              await new Promise(res => setTimeout(res, 2000)).then(() => [
                { id: '22u8e9213-9213-210', name: 'Bug' },
                { id: '111-12312-31-333333', name: 'Feature' },
              ]),
            renderOption: datum => {
              return <span>{datum.name}</span>;
            },
            renderSelectial: datum => {
              return <span>{datum.name}</span>;
            },
          },
        ]}
        renderOperator={operator => operators[operator]}
        value={value}
        onChange={setValue}
      />

      <Box sx={{ height: '600px' }}>
        <Button
          onClick={() =>
            setValue([
              { id: 'userId', operator: '==', value: '43924234-2342342-34234' },
              { id: 'tags.name', operator: '!=', value: '22u8e9213-9213-210' },
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
