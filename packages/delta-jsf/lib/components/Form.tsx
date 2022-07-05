import React, { useMemo } from "react";
import { FormProps, Registry, Validity } from "../models";
import { getFieldComponent, merge } from "../utils";
import { defaults } from "./defaults";

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
  const mergedRegistry = useMemo(
    () => merge({}, defaults.registry, registry) as Registry,
    [registry],
  );
  const rootFieldProps = {
    schema,
    registry: mergedRegistry,
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
      onSubmit={async (e) => {
        e.preventDefault();
        submit();
      }}
    >
      <RootField {...rootFieldProps} />
      {children}
    </form>
  );
};
