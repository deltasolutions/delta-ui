import React, { useEffect, useLayoutEffect } from 'react';
import { useFormManager } from '../hooks';
import { FormProps, Validity } from '../models';
import { areManagedFormProps, getFieldComponent } from '../utils';
import { defaults } from './defaults';

export const Form = <T extends unknown>(props: FormProps<T>) => {
  const { style, className, id, children } = props ?? {};
  const defaultManager = useFormManager(
    areManagedFormProps(props) ? { schema: { type: 'null' } } : props
  );
  const targetManager = areManagedFormProps(props)
    ? props.manager
    : defaultManager;

  const {
    options: { schema, registry = defaults.registry },
    value,
    validity,
    setValue,
    extendValidity,
    validate,
  } = targetManager;

  const rootFieldProps = {
    schema,
    registry,
    value,
    validity,
    onValue: v => {
      setValue(v);
      validate(v);
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
        await targetManager.wait();
        if (!targetManager.isValid) {
          return;
        }
        targetManager.submit();
      }}
    >
      <RootField {...rootFieldProps} />
      {children}
    </form>
  );
};
