import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { Autocomplete } from './Autocomplete';
import { AutocompleteOption } from './AutocompleteOption';

export default {
  title: 'Inputs/Autocomplete',
  decorators: [compact('400px')],
} as Meta;

const options = ['First Option', 'Second Option', 'Third Option'];

const isAlike = (query: string, option: string) =>
  !query || option.toLocaleLowerCase().includes(query.toLocaleLowerCase());

export const Basics = () => {
  return (
    <Autocomplete multiple placeholder="Placeholder">
      <AutocompleteOption value={1}>The Godfather</AutocompleteOption>
      <AutocompleteOption value={2}>
        The Shawshank Redemption
      </AutocompleteOption>
      <AutocompleteOption value={3}>The Godfather: Part II</AutocompleteOption>
    </Autocomplete>
  );
};

export const FilteringOptions = () => {
  return (
    <Autocomplete multiple placeholder="Placeholder">
      {query =>
        options
          .filter(v => isAlike(query, v))
          .map(v => (
            <AutocompleteOption key={v} value={v}>
              {v}
            </AutocompleteOption>
          ))
      }
    </Autocomplete>
  );
};

export const Controlled = () => {
  const [value, setValue] = useState<any>([]);
  const [query, setQuery] = useState('');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 3,
      }}
    >
      <Button variant="contained" onClick={() => setValue([options[0]])}>
        Set Value
      </Button>
      <Button variant="contained" onClick={() => setQuery('ABC')}>
        Set Query
      </Button>
      <Autocomplete
        multiple
        placeholder="Placeholder"
        query={query}
        value={value}
        onChange={setValue}
        onQuery={setQuery}
      >
        {options.map(v => (
          <AutocompleteOption key={v} value={v}>
            {v}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </Box>
  );
};
