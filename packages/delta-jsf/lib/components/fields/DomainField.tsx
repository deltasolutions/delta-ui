import React, { useEffect, useMemo, useState } from 'react';
import {
  useDefaults,
  useFormManager,
  useIsomorphicLayoutEffect,
  useUpdateEffect,
} from '../../hooks';
import { FieldProps, Registry, Schema, Validity } from '../../models';
import { getFieldComponent, hash } from '../../utils';

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
  const source = isSource(targetSource) ? targetSource : undefined;
  if (!source) {
    return null;
  }
  return (
    <Domain
      initialValue={source.initialValue}
      registry={registry}
      targetProps={{ ...props, schema: source.schema }}
      value={value}
      onValidity={onValidity}
      onValue={onValue}
    />
  );
}

function Domain({
  targetProps,
  registry,
  initialValue,
  value,
  onValue,
  onValidity,
}: {
  targetProps: FieldProps<any>;
  registry: Registry;
  initialValue: any;
  value: any;
  onValue?: (value: any) => void;
  onValidity?: (validity: Validity | Promise<Validity>) => void;
}) {
  const TargetField = getFieldComponent(targetProps);
  const manager = useFormManager({
    schema: targetProps.schema,
    initialValue: value,
    onValue,
    onValidity,
    registry,
    liveValidated: true,
  });
  useIsomorphicLayoutEffect(() => {
    manager.setValue(initialValue);
  }, [hash(targetProps.schema)]);
  useUpdateEffect(() => {
    manager.setValue(value);
  }, [value]);
  return <TargetField {...targetProps} />;
}

function isSource(v: unknown): v is { initialValue: unknown; schema: Schema } {
  return !!v && typeof v === 'object' && 'schema' in v;
}
