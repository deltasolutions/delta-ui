import { AutocompleteField } from './AutocompleteField';
import { BaseInput } from './BaseInput';
import { CheckboxField } from './CheckboxField';
import { FilePickerField } from './FilePickerField';
import { GeoLocPickerField } from './GeoLocPickerField';
import { SelectField } from './SelectField';
import { SliderField } from './SliderField';
import { SwitchField } from './SwitchField';
import { TextAreaField } from './TextAreaField';

export const jsFormFields = {
  autocomplete: AutocompleteField,
  boolean: SwitchField,
  checkbox: CheckboxField,
  integer: BaseInput,
  number: BaseInput,
  select: SelectField,
  string: BaseInput,
  switch: SwitchField,
  'geo-loc-picker': GeoLocPickerField,
  'text-area': TextAreaField,
  slider: SliderField,
  'file-picker': FilePickerField,
};

export * from './AutocompleteField';
export * from './BaseInput';
export * from './CheckboxField';
export * from './GeoLocPickerField';
export * from './SelectField';
export * from './SwitchField';
export * from './FilePickerField';
export * from './SliderField';
