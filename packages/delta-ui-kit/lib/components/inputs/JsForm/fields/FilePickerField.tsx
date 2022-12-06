import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { FilePicker } from '../../FilePicker';

export const FilePickerField = (props: FieldProps) => {
  const {
    value,
    onValue,
    schema: { readOnly, layout: { accept } = {} },
    registry: {
      templates: { PrimitiveTemplate },
    },
  } = props;
  return (
    <PrimitiveTemplate {...props}>
      <FilePicker
        accept={accept ? String(accept) : undefined}
        disabled={readOnly}
        value={value}
        onChange={v => onValue?.(v)}
      />
    </PrimitiveTemplate>
  );
};
