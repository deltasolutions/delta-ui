import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect, useState, useRef } from 'react';
import { TextComplition, Box, Loader, useDebouncedCallback } from '../../lib';
export default {
  title: 'Inputs/TextComplition',
  component: TextComplition
} as ComponentMeta<typeof TextComplition>;

const Template: ComponentStory<typeof TextComplition> = ({
  suggestions,
  ...rest
}) => {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    //Test merge refs
    ref.current?.focus();
  }, [ref.current]);
  console.log('updated');

  return (
    <TextComplition
      emptySuggestionsMessage="Not found"
      suggestions={suggestions.filter(datum =>
        datum.value.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )}
      onChange={value => setValue(value)}
      variant="contained"
      placeholder="68815 Rahul Plaza"
      ref={ref}
      {...rest}
    />
  );
};
const data = [
  { value: '7383 Barrows Burg' },
  { value: '258 Quitzon Turnpike' },
  { value: '6602 Tremblay Plaza' },
  { value: '82192 Lonny Skyway' },
  { value: '09487 Vicente Viaduct' },
  { value: '6431 Jacobi Well' },
  { value: '51896 Kobe Wall' },
  { value: '58491 America Lane' },
  { value: '3006 Roberts Ferry' },
  { value: '40460 Bogan Mews' },
  { value: '175 Brakus Roads' },
  { value: '984 Ashlynn Flats' },
  { value: '04845 Layne Forks' },
  { value: '8632 Tremblay Valley' },
  { value: '7364 Julio Fords' },
  { value: '84406 Bosco Pike' },
  { value: '3006 Bette Viaduct' },
  { value: '2592 Weldon Extensions' },
  { value: '79029 Runolfsson Island' },
  { value: '8708 Batz Village' },
  { value: '95625 Ellis Key' },
  { value: '8995 Lonie Tunnel' },
  { value: '72243 Gleichner Gateway' },
  { value: '5482 Ortiz Isle' },
  { value: '71442 Leuschke Center' },
  { value: '32828 Tromp Via' },
  { value: '954 Vidal Cove' },
  { value: '07357 Ted Ville' },
  { value: '8311 Abraham Ramp' },
  { value: '754 Bridgette Views' },
  { value: '822 Austin Grove' },
  { value: '789 Margarette Radial' },
  { value: '2320 Ziemann Branch' },
  { value: '297 Chance View' },
  { value: '7443 Audra Mills' },
  { value: '877 Melvin Spurs' },
  { value: '30336 Bradtke Forges' },
  { value: '1358 Christiansen Villages' },
  { value: '5436 Germaine Parkway' },
  { value: '8289 Carolina Plaza' },
  { value: '3716 Norma Mews' },
  { value: '70703 Cummings Canyon' },
  { value: '8276 Raynor Prairie' },
  { value: '170 Ayana Drives' },
  { value: '55171 Wilber Port' },
  { value: '68815 Rahul Plaza' }
];

export const Basic = Template.bind({});

Basic.args = {
  suggestions: data
};

export const CustomRender = Template.bind({});

CustomRender.args = {
  suggestions: data.map(datum => ({
    ...datum,
    render: (datum, isActive) => (
      <Box
        sx={{
          cursor: 'default',
          width: '100%',
          paddingX: 4,
          paddingY: 1,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 4,
          overflow: 'hidden',
          ...(isActive && {
            backgroundColor: 'primary',
            color: 'onPrimary'
          }),
          fontWeight: 900
        }}
      >
        {datum}
      </Box>
    )
  }))
};
