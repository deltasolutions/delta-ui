import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { compact } from '../../../docs/decorators';
import { useModal } from '../../hooks';
import { Button } from '../Button';
import { ModalBody } from '../containers';
import { FilePicker } from './FilePicker';
import { Form, FormField, FormGrid } from './Form';
import { Radio, RadioOption } from './Radio';
import { Select, SelectOption } from './Select';
import { Slider } from './Slider';
import { Switch } from './Switch';
import { TextArea } from './TextArea';

export default {
  title: 'Inputs/Form',
  decorators: [compact('300px')],
} as Meta;

export const Basics = () => {
  const openModal = useModal<unknown>(
    ({ context }) => {
      return (
        <ModalBody>
          <pre>{JSON.stringify(context, null, 2)}</pre>
        </ModalBody>
      );
    },
    { deps: [] }
  );
  return (
    <Form onSubmit={v => openModal(v)}>
      <FormGrid>
        <FormField label="Default Widget" name="defaultWidget" />
        <FormField name="switch">
          <Switch>Switch</Switch>
        </FormField>
        <FormField label="Select" name="select">
          <Select>
            <SelectOption value={1}>A</SelectOption>
            <SelectOption value={2}>B</SelectOption>
            <SelectOption value={3}>C</SelectOption>
          </Select>
        </FormField>
        <FormField label="Radio" name="radio">
          <Radio>
            <RadioOption value={1}>A</RadioOption>
            <RadioOption value={2}>B</RadioOption>
            <RadioOption value={3}>C</RadioOption>
          </Radio>
        </FormField>
        <FormField label="Slider" name="slider">
          <Slider />
        </FormField>
        <FormField label="FilePicker" name="filePicker">
          <FilePicker>Pick Files</FilePicker>
        </FormField>
        <FormField label="TextArea" name="textArea">
          <TextArea />
        </FormField>
      </FormGrid>
      <Button sx={{ mt: 4 }} type="submit" variant="contained">
        Submit
      </Button>
    </Form>
  );
};

export const Controlled = () => {
  const form = useForm({
    defaultValues: {
      showInput: false,
      textInput: '',
    },
  });
  const { control, getValues } = form;
  const { isDirty } = useFormState({ control });
  console.log(getValues());

  return (
    <Form form={form}>
      <FormField name="showInput">
        <Switch>Show input</Switch>
      </FormField>
      {form.watch('showInput') && (
        <FormField label="Text Input" name="textInput" sx={{ mt: 4 }} />
      )}
      <Button
        disabled={!isDirty}
        sx={{ mt: 4 }}
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </Form>
  );
};
