import { jsx } from '@theme-ui/core';
import { FieldProps, useDefaults } from 'delta-jsf';
import { Switch } from '../../Switch';

export const SwitchField = (props: FieldProps) => {
  useDefaults(props);
  const { schema, value, onValue } = props;
  const { title, readOnly } = schema;
  const { PrimitiveTemplate } = props.registry.templates;
  return (
    <PrimitiveTemplate {...props}>
      <Switch disabled={readOnly} value={value} onChange={v => onValue?.(v)}>
        {title}
      </Switch>
    </PrimitiveTemplate>
  );
};
