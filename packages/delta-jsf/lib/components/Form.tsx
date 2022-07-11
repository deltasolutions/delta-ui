import React from 'react';
import { FormProps, Registry, Validity } from '../models';
import { getFieldComponent } from '../utils';

export const Form = <T extends unknown>({
  manager: {
    options: { schema, registry },
    value,
    setValue,
    validity,
    extendValidity,
    submit,
  },
  style,
  className,
  id,
  children,
}: FormProps<T>) => {
  const rootFieldProps = {
    schema,
    // Should be already handled by manager.
    registry: registry as Registry,
    value,
    validity,
    onValue: (v: T) => {
      setValue(v);
    },
    onValidity: (e: Validity) => {
      extendValidity(e);
    },
  };
  const RootField = getFieldComponent(rootFieldProps);
  return (
    <form
      noValidate
      className={className}
      id={id}
      style={style}
      onSubmit={async e => {
        e.preventDefault();
        submit();
      }}
    >
      <RootField {...rootFieldProps} />
      {children}
    </form>
  );
};
