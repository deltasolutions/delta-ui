import { AutocompleteField } from './AutocompleteField';
import { BaseInput } from './BaseInput';
import { CheckboxField } from './CheckboxField';
import { GeoLocPickerField } from './GeoLocPickerField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';

export const jsFormFields = {
  autocomplete: AutocompleteField,
  boolean: SwitchField,
  checkbox: CheckboxField,
  geoLocPicker: GeoLocPickerField,
  integer: BaseInput,
  number: BaseInput,
  select: SelectField,
  string: BaseInput,
  switch: SwitchField,
};

export * from './AutocompleteField';
export * from './BaseInput';
export * from './CheckboxField';
export * from './GeoLocPickerField';
export * from './SelectField';
export * from './SwitchField';
