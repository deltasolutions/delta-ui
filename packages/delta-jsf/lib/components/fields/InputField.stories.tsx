import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFieldProps } from '../../../docs/utils';
import { InputField } from './InputField';

const meta: Meta = {
  title: 'fields/InputField',
  ...formStoryParameters
};

export default meta;

export const Basics = props => {
  const { type } = props;
  const fieldProps = useStoryFieldProps(props);
  return (
    <InputField schema={{ type, title: 'Primitive field' }} {...fieldProps} />
  );
};
Basics.args = { type: 'string' };
Basics.argTypes = {
  type: {
    options: ['string', 'number', 'integer', 'wrong'],
    control: { type: 'inline-radio' }
  }
};

export const InitialValue = props => {
  const fieldProps = useStoryFieldProps(props, 'lorem');
  return (
    <InputField
      schema={{ type: 'string', title: 'String field initial value' }}
      {...fieldProps}
    />
  );
};
