import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { Autocomplete } from './Autocomplete';
import { AutocompleteOption } from './AutocompleteOption';
export default {
  title: 'Inputs/Autocomplete',
  decorators: [compact('500px')],
} as Meta;

const data = [
  {
    value: 'First item',
  },
  {
    value: 'Second item',
  },
  {
    value: 'Third item',
  },
];
export const Basics = () => {
  const [value, setValue] = useState<any>([data[0].value]);
  const [query, setQuery] = useState('hueta');
  const [options, setOptions] = useState(
    data.filter(datum => !value.includes(datum.value))
  );
  return (
    <Box>
      <Autocomplete
        value={value}
        onChange={(value, query) => {
          setValue(value);
          setOptions(
            data
              .filter(option =>
                option.value
                  .toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase())
              )
              .filter(option => !value.includes(option.value))
          );
        }}
        query={query}
        data={data}
        onQuery={query => {
          setQuery(query);
          setOptions(
            data
              .filter(option =>
                option.value
                  .toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase())
              )
              .filter(option => !value.includes(option.value))
          );
        }}
        placeholder={data[0].value}
      >
        {options.map(option => (
          <AutocompleteOption key={option.value} value={option.value}>
            {option.value}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </Box>
  );
};
