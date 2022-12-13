import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
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

export const Basics = ({
  submitter = (
    <Button sx={{ mt: 4 }} type="submit" variant="contained">
      Submit
    </Button>
  ) as ReactNode,
}) => {
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
        <FormField
          required
          description="Sample description"
          label="Default Widget"
          name="defaultWidget"
        />
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
      {submitter}
    </Form>
  );
};

export const Controlled = () => {
  const form = useForm({
    defaultValues: {
      showInput: true,
      textInput: '',
      radio: false,
      defaultWidget1: '',
      defaultWidget2: '',
      defaultWidget3: '',
    },
  });
  const { control, handleSubmit, register } = form;
  return (
    <Form form={form} onSubmit={handleSubmit(v => alert(v))}>
      <FormField name="showInput">
        <Switch>Show input</Switch>
      </FormField>
      <FormGrid>
        <FormField
          required
          label="Default Widget 1"
          {...register('defaultWidget1', {
            required: 'this is required field',
          })}
        />
        <FormField
          label="Default Widget 2"
          {...register('defaultWidget2', {
            validate: v => {
              if (!v) {
                return 'Error messagf jdsif jdsoijf oisjgpe';
              }
              return true;
            },
          })}
        />
        <FormField
          label="Default Widget 3"
          {...register('defaultWidget3', {
            validate: v => {
              if (!v) {
                return 'Error mess fiodsof jfoj sojdijsdofijfkdspofsdofdoskfpsdfksdpf gjdfsjg poifjs gopjage';
              }
              return true;
            },
          })}
        />
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
        <FormField
          label="Radio"
          {...register('radio', {
            validate: v => {
              if (!v) {
                return 'Error message';
              }
              return true;
            },
          })}
        >
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
      {form.watch('showInput') && (
        <FormField
          {...register('textInput', {
            validate: v => {
              if (!v) {
                return 'Error message';
              }
              return true;
            },
          })}
        />
      )}

      <Button sx={{ mt: 4 }} type="submit" variant="contained">
        Submit
      </Button>
    </Form>
  );
};
