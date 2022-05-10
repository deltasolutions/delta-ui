import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import {
  Autocomplete,
  Box,
  Loader,
  MultipleAutocomplete,
  useDebouncedCallback
} from '../../lib';
export default {
  title: 'Inputs/MultipleAutocomplete',
  component: MultipleAutocomplete
} as ComponentMeta<typeof MultipleAutocomplete>;

const Template: ComponentStory<typeof MultipleAutocomplete> = args => (
  <MultipleAutocomplete {...args} />
);

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
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ',
  '8276 Raynor Prairie',
  '170 Ayana Drives',
  '55171 Wilber Port',
  '68815 Rahul Plaza'
];
export const Basic = Template.bind({});
Basic.args = {
  placeholder: '7383 Barrows Burg',
  size: 'medium',
  data: data
};

const TemplateWithLoading: ComponentStory<typeof Autocomplete> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const debouncedCallback = useDebouncedCallback(() => {
    setIsLoading(false);
  }, 500);
  return (
    <Box sx={{ position: 'relative', width: '700px' }}>
      {isLoading && (
        <Loader
          sx={{
            position: 'absolute',
            right: 4,
            zIndex: 2,
            bottom: 2
          }}
        />
      )}
      <MultipleAutocomplete
        onChange={() => {
          setIsLoading(true);
          debouncedCallback();
        }}
        placeholder="7383 Barrows Burg"
        size="medium"
        sx={{ paddingRight: '30px' }}
        data={isLoading ? [] : data}
      />
    </Box>
  );
};

export const Loading = TemplateWithLoading.bind({});

Loading.args = {};
