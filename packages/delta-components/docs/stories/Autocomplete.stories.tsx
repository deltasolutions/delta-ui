import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Autocomplete } from '../../lib';
export default {
  title: 'Inputs/Autocomplete',
  component: Autocomplete
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = args => (
  <Autocomplete {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  placeholder: 'Basic 2',
  size: 'medium',
  data: [
    'Pl1221aceholder first value',
    'Ba213sic',
    '123 2',
    ' B12asic 3',
    'Te4mpldesatgshe 11',
    'Tedsmpgdfslate 22',
    'Pladaceholder first value',
    'Baasdsiasfc',
    'Basafgagfdssiadac 2',
    ' Basfsdgfsgiasfasdc 3',
    'Tegagsmplasdasdate 11',
    'Tempfsasd  adaslate 22',
    'Placehssolder first value',
    'Baasdsdfxczgsdfgic',
    'Basdadsxzagsdfgsdic 2',
    ' Badadsfsdsic 3',
    'Temddgbcvbvcdsfsfasdaspsdasdlate 11',
    'Temddgdsfgsfdsgfsaspasdalate 22',
    'Pladasdasceholder first value',
    'Bdascxbcxvcxasiasdc',
    'dsfgcxvbcxvb 2',
    ' Basixcvbdasdasasdascasd 3',
    'Tembcxvbplate 11',
    'Templsfbcxvdgsdfgatasde 22',
    'Plasdasaceholder first value',
    'Basdbcbxcvvbsic',
    'Basddicxbc 2',
    ' Basicvxbcxcvc 3',
    'Tempsdbcxfglatedasd 11',
    'Tempvbxcvlate 22',
    'Placasbcxvdasdaseholder first value',
    'Badasdsic',
    'Basibcvxvcbcsdfgdas 2',
    ' cxbx 3',
    'Temacxbxsplate 11',
    'Temdxcvbasdplate 22'
  ]
};
