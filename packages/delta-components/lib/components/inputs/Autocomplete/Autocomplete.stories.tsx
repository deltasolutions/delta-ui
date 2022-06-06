import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useMemo, useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box } from '../../containers';
``;
import { Autocomplete } from './Autocomplete';
import { AutocompleteOption } from './AutocompleteOption';

export default {
  title: 'Inputs/Autocomplete',
  decorators: [compact('300px')],
} as Meta;

const options = ['First Option', 'Second Option', 'Third Option'];

const isAlike = (query: string, option: string) =>
  !query || option.toLocaleLowerCase().includes(query.toLocaleLowerCase());

export const Basics = () => {
  return (
    <Autocomplete placeholder="Placeholder">
      <AutocompleteOption value={1}>A</AutocompleteOption>
      <AutocompleteOption value={2}>B</AutocompleteOption>
      <AutocompleteOption value={3}>C</AutocompleteOption>
    </Autocomplete>
  );
};

export const FilteringOptions = () => {
  return (
    <Autocomplete placeholder="Placeholder">
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
        value={value}
        onChange={setValue}
        query={query}
        onQuery={setQuery}
        placeholder="Placeholder"
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
