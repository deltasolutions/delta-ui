import { jsx } from '@theme-ui/core';
import { FieldProps, useDefaults } from 'delta-jsf';
import { TextArea } from '../../TextArea';

export const TextAreaField = (props: FieldProps) => {
  useDefaults(props);
  const { schema, value, onValue } = props;
  const { PrimitiveTemplate } = props.registry.templates;
  return (
    <PrimitiveTemplate {...props}>
      <TextArea
        disabled={schema.readOnly}
        value={value}
        onChange={v => onValue?.(v)}
      />
    </PrimitiveTemplate>
  );
};
