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
  required?: boolean;
  children?: ReactElement<FormWidgetProps>;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, label, children, required, ...rest }, ref) => {
    const { control } = useFormContext();
    return (
      <Box
        ref={ref}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        {...rest}
      >
        {label && (
          <Box sx={{ fontWeight: 600, letterSpacing: '0.04em' }}>
            {label} {required && <span>*</span>}
          </Box>
        )}
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Box>
              {children ? (
                cloneElement(children, {
                  value,
                  invalid: Boolean(error),
                  onChange,
                  onBlur,
                })
              ) : (
                <TextInput value={value} onBlur={onBlur} onChange={onChange} />
              )}
              {error?.message && (
                <Box sx={{ mt: 1 }}>
                  <span sx={{ color: 'error', fontSize: 1 }}>
                    {error?.message}
                  </span>
                </Box>
              )}
            </Box>
          )}
        />
      </Box>
    );
  }
);

export interface ControlledFormProps
  extends Omit<HTMLFormElement, 'onSubmit' | 'onChange'> {
  form: UseFormReturn;
  onSubmit?: (value: { [key: string]: unknown }) => void;
}

export const ControlledForm = forwardRef<HTMLFormElement, ControlledFormProps>(
  ({ form, onSubmit, children, ...rest }, ref) => {
    return (
      <form
        ref={ref}
        noValidate
        onSubmit={e => {
          e.preventDefault();
          onSubmit && form.handleSubmit(onSubmit)(e);
        }}
        {...rest}
      >
        <FormProvider {...form}>{children}</FormProvider>
      </form>
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
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
        {...rest}
      />
    );
  }
);
