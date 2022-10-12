import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { hash } from 'delta-jsf';
import { useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { TableSearch } from './TableSearch';
import { TableSearchDropMenu } from './TableSearchDropMenu';
import { TableSearchDropMenuItem } from './TableSearchDropMenuItem';
import { BunchData, RenderDropOptions } from './types';

export default {
  title: 'Inputs/TableSearch',
  decorators: [compact('800px')],
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState<BunchData[]>([
    { id: 'tags', operator: '==', value: 'Feature' },
    { id: 'tags', operator: '!=', value: 'Feature' },
  ]);

  return (
    <Box>
      <TableSearch
        operators={{ '==': '=', '!=': '!=' }}
        proposes={[
          {
            id: 'tags',
            label: 'Tag',
            renderDrop: renderArrayDrop('tags'),
            renderSelection: datum => (
              <Box sx={{ color: 'red' }}> {datum.value}</Box>
            ),
          },
          {
            id: 'name',
            label: 'Name',
            renderDrop: renderArrayDrop('userId'),
            renderSelection: () => null,
          },
        ]}
        value={value}
        onChange={v => {
          setValue(v);
        }}
      />
      <Button
        sx={{ mt: '20px' }}
        onClick={() => {
          setValue([
            { id: 'tags', operator: '==', value: 'Feature' },
            { id: 'tags', operator: '!=', value: 'Feature' },
          ]);
        }}
      >
        set some value
      </Button>
      <pre sx={{ height: '500px' }}>{JSON.stringify(value, null, 2)}</pre>
    </Box>
  );
};

const renderArrayDrop =
  id =>
  ({ query, onItemClick, handleClose, ref }: RenderDropOptions) => {
    const options = items[id];
    return (
      <TableSearchDropMenu
        ref={ref}
        handleClose={handleClose}
        onItemClick={onItemClick}
      >
        {Object.values(options)
          .filter((option: string) =>
            option
              ?.toLocaleLowerCase()
              .includes(query?.toLocaleLowerCase() ?? '')
          )
          .map((option: string) => (
            <TableSearchDropMenuItem key={hash(option)} value={option}>
              {option}
            </TableSearchDropMenuItem>
          ))}
      </TableSearchDropMenu>
    );
  };

const items = {
  tags: {
    Feature: 'Feature',
    Bug: 'Bug',
  },
  userId: {
    'a.emelyanov': 'Emelyanov',
    'a.petuhov': 'Petuhov',
  },
  date: {
    '2018-07-22': { date: '2018-07-22' },
  },
};
