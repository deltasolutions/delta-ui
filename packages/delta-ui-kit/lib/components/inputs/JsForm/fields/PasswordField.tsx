import { jsx } from '@theme-ui/core';
import { FieldProps, useDefaults } from 'delta-jsf';
import { PasswordInput } from '../../PasswordInput';
import { TextArea } from '../../TextArea';

export const PasswordField = (props: FieldProps) => {
  useDefaults(props);
  const { schema, value, onValue } = props;
  const { PrimitiveTemplate } = props.registry.templates;
  return (
    <PrimitiveTemplate {...props}>
      <PasswordInput
        disabled={schema.readOnly}
        value={value}
        onChange={v => onValue?.(v)}
      />
    </PrimitiveTemplate>
  );
};
