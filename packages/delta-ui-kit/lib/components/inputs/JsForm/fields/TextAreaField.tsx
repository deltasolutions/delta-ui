import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { TextArea } from '../../TextArea';

export const TextAreaField = (props: FieldProps) => {
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
