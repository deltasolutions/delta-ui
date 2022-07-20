import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { FilePicker } from '../../FilePicker';

export const FilePickerField = (props: FieldProps) => {
  const {
    value,
    onValue,
    schema: { readOnly },
    registry: {
      templates: { PrimitiveTemplate },
    },
  } = props;
  return (
    <PrimitiveTemplate {...props}>
      <FilePicker
        disabled={readOnly}
        value={value}
        onChange={v => onValue?.(v)}
      />
    </PrimitiveTemplate>
  );
};
