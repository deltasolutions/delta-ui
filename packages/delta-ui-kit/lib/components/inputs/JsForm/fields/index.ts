import { AutocompleteField } from './AutocompleteField';
import { BaseInput } from './BaseInput';
import { CheckboxField } from './CheckboxField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';

export const fields = {
  autocomplete: AutocompleteField,
  boolean: SwitchField,
  checkbox: CheckboxField,
  integer: BaseInput,
  number: BaseInput,
  select: SelectField,
  string: BaseInput,
  switch: SwitchField,
};
