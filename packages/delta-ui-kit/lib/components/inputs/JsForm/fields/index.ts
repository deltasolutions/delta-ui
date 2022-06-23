import { BaseInput } from './BaseInput';
import { CheckboxField } from './CheckboxField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';

export const fields = {
  boolean: SwitchField,
  checkbox: CheckboxField,
  integer: BaseInput,
  number: BaseInput,
  select: SelectField,
  string: BaseInput,
  switch: SwitchField,
};
