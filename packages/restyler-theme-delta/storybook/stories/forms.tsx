import { Meta } from '@storybook/react';
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

export const Form = () => (
  <R.Form>
    <R.FormGrid>
      <R.FormField name="a" label="Field A" />
      <R.FormField name="b" label="Field B">
        <R.Select>
          <R.SelectOption value="a">Option A</R.SelectOption>
          <R.SelectOption value="b">Option B</R.SelectOption>
          <R.SelectOption value="c">Option C</R.SelectOption>
        </R.Select>
      </R.FormField>
      <R.FormField name="c" label="Field C">
        <R.File>
          {names => (names.length > 0 ? names.join(', ') : 'Select File')}
        </R.File>
      </R.FormField>
      <R.FormField name="d">
        <R.Checkbox>Field D</R.Checkbox>
      </R.FormField>
    </R.FormGrid>
  </R.Form>
);
Form.decorators = [compact()];
