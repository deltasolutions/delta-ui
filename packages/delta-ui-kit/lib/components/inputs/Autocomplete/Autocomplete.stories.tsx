import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { Autocomplete } from './Autocomplete';

export default {
  title: 'Inputs/Autocomplete',
  decorators: [compact('400px')],
} as Meta;

const options = new Array(100).fill(undefined).map((_, i) => `Option #${i}`);

const isAlike = (query?: string, option?: string) =>
  !query || option?.toLocaleLowerCase().includes(query.toLocaleLowerCase());

export const Basics = () => {
  return (
    <Autocomplete
      multiple
      getOptions={v => options.filter(t => isAlike(v, t))}
      placeholder="Placeholder"
    />
  );
};

export const Empty = () => {
  return <Autocomplete multiple placeholder="Placeholder" />;
};

export const Disabled = () => {
  return <Autocomplete disabled multiple placeholder="Placeholder" />;
};

export const Controlled = () => {
  const [value, setValue] = useState<unknown[]>([]);
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
      <Autocomplete
        getOptions={v => options.filter(t => isAlike(v, t)).slice(0, 5)}
        multiple={false}
        placeholder="Placeholder"
        value={value}
        onChange={setValue}
      />
    </Box>
  );
};

export const CustomRenderers = () => {
  return (
    <Autocomplete
      multiple
      getOptions={v => options.filter(t => isAlike(v, t)).slice(0, 5)}
      placeholder="Placeholder"
      renderOption={v => (
        <Box
          sx={{
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: 'primary',
            color: 'onPrimary',
          }}
        >
          {String(v)}
        </Box>
      )}
      renderSelection={v => <Box sx={{ color: 'primary' }}>{String(v)}</Box>}
    />
  );
};
