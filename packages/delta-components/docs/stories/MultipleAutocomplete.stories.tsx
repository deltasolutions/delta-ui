import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { MultipleAutocomplete } from '../../lib';
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
  '70703 Cummings Canyon',
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
