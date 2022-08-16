import React, { useEffect, useMemo, useState } from 'react';
import {
  useDefaults,
  useFormManager,
  useIsomorphicLayoutEffect,
  useUpdateEffect,
} from '../../hooks';
import { FieldProps, Schema } from '../../models';
import { getFieldComponent, hash } from '../../utils';

const defaultSource = {
  schema: { type: 'null' as const },
  initialValue: undefined,
};

export function DomainField(props: FieldProps) {
  const {
    schema: { layout: { target } = {} },
    registry,
    registry: {
      utils: { getDomainSource },
    },
    value,
    onValue,
    onValidity,
  } = props;
  useDefaults(props);
  const maybeSource = useMemo<Schema | Promise<Schema> | undefined>(
    () => getDomainSource?.(target),
    [getDomainSource]
  );
  const [resolvedSource, setResolvedSource] = useState<Schema | undefined>();
  useEffect(() => {
    if (maybeSource instanceof Promise) {
      maybeSource.then(setResolvedSource);
    }
  }, [maybeSource]);
  const targetSource =
    maybeSource instanceof Promise ? resolvedSource : maybeSource;
  const { schema, initialValue } = isSource(targetSource)
    ? targetSource
    : defaultSource;
  const targetProps = { ...props, schema };
  const TargetField = getFieldComponent(targetProps);
  const manager = useFormManager({
    schema,
    initialValue: value,
    onValue,
    onValidity,
    registry,
    liveValidated: true,
  });
  useIsomorphicLayoutEffect(() => {
    manager.setValue(initialValue);
  }, [hash(schema)]);
  useUpdateEffect(() => {
    manager.setValue(value);
  }, [value]);
  return <TargetField {...targetProps} />;
}

function isSource(v: unknown): v is { initialValue: unknown; schema: Schema } {
  return !!v && typeof v === 'object' && 'schema' in v;
}
