import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Box } from '../../containers';
import { ComplexSearch } from './ComplexSearch';

export default {
  title: 'Inputs/ComplexSearch',
  decorators: [compact('800px')],
} as Meta;

export const Basics = () => {
  const [value, setValue] = useState([]);
  return (
    <Box>
      <ComplexSearch
        proposes={[
          {
            id: 'User',
            operators: ['=', '!='],
            getItems: () => [],
            renderOption: datum => {
              return 'User-DROP';
            },
            renderSelectial: datum => {
              return 'User-SELECTIAL';
            },
          },
        ]}
        value={[
          { id: 'User', value: 'aaroot', operator: '=' },
          { id: 'User', value: 'root2', operator: '=' },
          { id: 'User', value: 'root3', operator: '=' },
          { id: 'User', value: 'root4', operator: '=' },
        ]}
      />
    </Box>
  );
};

const proposes = [];
