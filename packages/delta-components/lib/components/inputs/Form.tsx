import { jsx } from '@theme-ui/core';
import { cloneElement, forwardRef, ReactElement } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { GridAxisOptions, useGrid } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { Box, BoxProps } from '../containers';
import { TextInput } from './TextInput';

export interface FormFieldProps extends Omit<BoxProps, 'children'> {
  name: string;
  label?: string;
  children?: ReactElement<FormWidgetProps>;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, label, children, ...rest }) => {
    const { control } = useFormContext();
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} {...rest}>
        {label && <Box sx={{ fontWeight: 600 }}>{label}</Box>}
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) =>
            children ? (
              cloneElement(children, {
                value,
                invalid: Boolean(error),
                onChange,
                onBlur,
              })
            ) : (
              <TextInput value={value} onChange={onChange} onBlur={onBlur} />
            )
          }
        />
      </Box>
    );
  }
);

export interface ControlledFormProps
  extends Omit<BoxProps, 'onSubmit' | 'onChange'> {
  form: UseFormReturn;
  onSubmit?: (value: { [key: string]: unknown }) => void;
}

export const ControlledForm = forwardRef<HTMLDivElement, ControlledFormProps>(
  ({ form, onSubmit, children, ...rest }, ref) => {
    return (
      <Box ref={ref} {...rest}>
        <form
          noValidate
          onSubmit={e => {
            e.preventDefault();
            onSubmit && form.handleSubmit(onSubmit)(e);
          }}
        >
          <FormProvider {...form}>{children}</FormProvider>
        </form>
      </Box>
    );
  }
);

export interface UncontrolledFormProps
  extends Omit<ControlledFormProps, 'form'> {
  options?: UseFormProps;
}

export const UncontrolledForm = ({
  options,
  ...rest
}: UncontrolledFormProps) => {
  const form = useForm(options);
  return <ControlledForm form={form} {...rest} />;
};

export type FormProps = ControlledFormProps | UncontrolledFormProps;

export const Form = (props: FormProps) =>
  'form' in props ? (
    <ControlledForm {...props} />
  ) : (
    <UncontrolledForm {...props} />
  );

export interface FormGridProps extends BoxProps {
  columns?: GridAxisOptions;
}

export const FormGrid = forwardRef<HTMLDivElement, FormGridProps>(
  ({ columns, ...rest }, ref) => {
    const { style } = useGrid({ columns });
    return (
      <Box
        ref={ref}
        style={style}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 4,
        }}
        {...rest}
      />
    );
  }
);
