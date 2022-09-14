import { jsx } from '@theme-ui/core';
import { FieldProps, useDefaults } from 'delta-jsf';
import { useDebounce } from '../../../../hooks';
import { ColorPicker } from '../../ColorPicker';
import { Slider } from '../../Slider';

export const ColorPickerField = (props: FieldProps) => {
  useDefaults(props);
  const {
    schema: { readOnly },
    value,
    onValue,
  } = props;
  const { PrimitiveTemplate } = props.registry.templates;
  return (
    <PrimitiveTemplate {...props}>
      <ColorPicker
        disabled={readOnly}
        value={value}
        // TODO: Use debounce!
        onChange={v => onValue?.(v)}
      />
    </PrimitiveTemplate>
  );
};
