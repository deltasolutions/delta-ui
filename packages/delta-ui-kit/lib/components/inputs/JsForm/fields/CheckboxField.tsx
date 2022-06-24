import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { Checkbox } from '../../Checkbox';

export const CheckboxField = (props: FieldProps) => {
  const { schema, value, onValue } = props;
  const { title, readOnly } = schema;
  const { PrimitiveTemplate } = props.registry.templates;
  return (
    <PrimitiveTemplate {...props}>
      <Checkbox disabled={readOnly} value={value} onChange={v => onValue?.(v)}>
        {title}
      </Checkbox>
    </PrimitiveTemplate>
  );
};
