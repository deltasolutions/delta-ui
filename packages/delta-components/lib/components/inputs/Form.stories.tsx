import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useForm } from 'react-hook-form';
import { compact } from '../../../docs/decorators';
import { Button } from '../Button';
import { Form, FormField, FormGrid } from './Form';
import { Radio, RadioOption } from './Radio';
import { Select, SelectOption } from './Select';
import { Slider } from './Slider';
import { Switch } from './Switch';

export default {
  title: 'Inputs/Form',
  decorators: [compact('300px')],
} as Meta;

export const Basics = () => {
  return (
    <Form onSubmit={v => console.log('submit', v)}>
      <FormGrid>
        <FormField name="defaultWidget" label="Default Widget" />
        <FormField name="switch">
          <Switch>Switch</Switch>
        </FormField>
        <FormField name="select" label="Select">
          <Select>
            <SelectOption value={1}>A</SelectOption>
            <SelectOption value={2}>B</SelectOption>
            <SelectOption value={3}>C</SelectOption>
          </Select>
        </FormField>
        <FormField name="radio" label="Radio">
          <Radio>
            <RadioOption value={1}>A</RadioOption>
            <RadioOption value={2}>B</RadioOption>
            <RadioOption value={3}>C</RadioOption>
          </Radio>
        </FormField>
        <FormField name="slider" label="Slider">
          <Slider />
        </FormField>
      </FormGrid>
      <Button variant="contained" type="submit" sx={{ mt: 4 }}>
        Submit
      </Button>
    </Form>
  );
};

export const Controlled = () => {
  const form = useForm();
  return (
    <Form form={form}>
      <FormField name="showInput">
        <Switch>Show input</Switch>
      </FormField>
      {form.watch('showInput') && (
        <FormField name="textInput" label="Text Input" sx={{ mt: 4 }} />
      )}
      <Button variant="contained" type="submit" sx={{ mt: 4 }}>
        Submit
      </Button>
    </Form>
  );
};
