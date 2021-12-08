import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import * as R from 'restyler';
import { compact } from '../decorators';

export default {
  title: 'General/Forms'
} as Meta;

export const Input = () => <R.Input />;
Input.decorators = [compact('300px')];

export const TextArea = () => <R.TextArea />;
TextArea.decorators = [compact('300px')];

export const FormField = () => <R.FormField name="_" label="Field Name" />;
FormField.decorators = [compact('300px')];

export const Form = () => {
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  return (
    <R.Box>
      <R.Box sx={{ mb: 3 }}>
        <R.Checkbox value={disabled} onChange={setDisabled}>
          Disabled
        </R.Checkbox>
        <R.Checkbox value={readOnly} onChange={setReadOnly}>
          ReadOnly
        </R.Checkbox>
      </R.Box>
      <R.Form disabled={disabled} readOnly={readOnly}>
        <R.FormGrid>
          <R.FormField label="A" name="a" />
          <R.FormField label="A" name="b">
            <R.Select isMultiple>
              <R.SelectOption value="a1">a1</R.SelectOption>
              <R.SelectOption value="a2">a2</R.SelectOption>
              <R.SelectOption value="a3">a3</R.SelectOption>
            </R.Select>
          </R.FormField>
          <R.FormField name="c">
            <R.Checkbox>C</R.Checkbox>
          </R.FormField>
          <R.FormField label="D" name="d">
            <R.File />
          </R.FormField>
          <R.FormField label="E" name="e">
            <R.RadioGroup>
              <R.RadioOption value="A">Option A</R.RadioOption>
              <R.RadioOption value="B">Option B</R.RadioOption>
              <R.RadioOption value="C">Option C</R.RadioOption>
            </R.RadioGroup>
          </R.FormField>
          <R.FormField label="F" name="f">
            <R.TextArea />
          </R.FormField>
        </R.FormGrid>
      </R.Form>
    </R.Box>
  );
};
Form.decorators = [compact()];
