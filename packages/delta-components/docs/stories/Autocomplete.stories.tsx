import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Autocomplete, Box, Loader, useDebouncedCallback } from '../../lib';
export default {
  title: 'Inputs/Autocomplete',
  component: Autocomplete
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = args => (
  <Autocomplete {...args} />
);

export const Basic = Template.bind({});

const data = [
  '7383 Barrows Burg',
  '258 Quitzon Turnpike',
  '6602 Tremblay Plaza',
  '82192 Lonny Skyway',
  '09487 Vicente Viaduct',
  '6431 Jacobi Well',
  '51896 Kobe Wall',
  '58491 America Lane',
  '3006 Roberts Ferry',
  '40460 Bogan Mews',
  '175 Brakus Roads',
  '984 Ashlynn Flats',
  '04845 Layne Forks',
  '8632 Tremblay Valley',
  '7364 Julio Fords',
  '84406 Bosco Pike',
  '3006 Bette Viaduct',
  '2592 Weldon Extensions',
  '79029 Runolfsson Island',
  '8708 Batz Village',
  '95625 Ellis Key',
  '8995 Lonie Tunnel',
  '72243 Gleichner Gateway',
  '5482 Ortiz Isle',
  '71442 Leuschke Center',
  '32828 Tromp Via',
  '954 Vidal Cove',
  '07357 Ted Ville',
  '8311 Abraham Ramp',
  '754 Bridgette Views',
  '822 Austin Grove',
  '789 Margarette Radial',
  '2320 Ziemann Branch',
  '297 Chance View',
  '7443 Audra Mills',
  '877 Melvin Spurs',
  '30336 Bradtke Forges',
  '1358 Christiansen Villages',
  '5436 Germaine Parkway',
  '8289 Carolina Plaza',
  '3716 Norma Mews',
  '70703 Cummings Canyon',
  '8276 Raynor Prairie',
  '170 Ayana Drives',
  '55171 Wilber Port',
  '68815 Rahul Plaza'
];

Basic.args = {
  data: data,
  placeholder: '68815 Rahul Plaza'
};

const TemplateWithLoading: ComponentStory<typeof Autocomplete> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const debouncedCallback = useDebouncedCallback(() => {
    setIsLoading(false);
  }, 500);
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {isLoading && (
        <Loader
          sx={{
            position: 'absolute',
            right: 4,
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
      )}
      <Autocomplete
        onChange={() => {
          setIsLoading(true);
          debouncedCallback();
        }}
        placeholder="7383 Barrows Burg"
        size="medium"
        sx={{ paddingRight: '30px', width: '100%' }}
        data={isLoading ? [] : data}
      />
    </Box>
  );
};

export const Loading = TemplateWithLoading.bind({});

Loading.args = {};
