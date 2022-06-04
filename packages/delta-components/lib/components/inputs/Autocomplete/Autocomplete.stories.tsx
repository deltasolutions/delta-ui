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
    render: value => {
      return (
        <img
          sx={{ width: '100%', height: 'auto' }}
          src="https://picsum.photos/1000/800"
        />
      );
    },
    value: 'Third item',
  },
  {
    value:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. Wikipedia.',
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
      <Button>dkspdka</Button>
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
            {option.render?.(option.value) ?? option.value}
          </AutocompleteOption>
        ))}
      </Autocomplete>
      {/* <Button>dkspdka</Button> */}
    </Box>
  );
};
