import { AutocompleteField } from './AutocompleteField';
import { BadgeField } from './BadgeField';
import { BaseInput } from './BaseInput';
import { CheckboxField } from './CheckboxField';
import { FilePickerField } from './FilePickerField';
import { GeoLocPickerField } from './GeoLocPickerField';
import { SelectField } from './SelectField';
import { SliderField } from './SliderField';
import { SwitchField } from './SwitchField';
import { TableField } from './TableField';
import { TextAreaField } from './TextAreaField';

export const jsFormFields = {
  'file-picker': FilePickerField,
  'geo-loc-picker': GeoLocPickerField,
  'text-area': TextAreaField,
  autocomplete: AutocompleteField,
  badge: BadgeField,
  boolean: SwitchField,
  checkbox: CheckboxField,
  integer: BaseInput,
  number: BaseInput,
  select: SelectField,
  slider: SliderField,
  string: BaseInput,
  switch: SwitchField,
  table: TableField,
};

export * from './AutocompleteField';
export * from './BadgeField';
export * from './BaseInput';
export * from './CheckboxField';
export * from './FilePickerField';
export * from './GeoLocPickerField';
export * from './SelectField';
export * from './SliderField';
export * from './SwitchField';
export * from './TableField';
