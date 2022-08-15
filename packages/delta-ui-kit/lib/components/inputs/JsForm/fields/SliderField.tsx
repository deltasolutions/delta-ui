import { jsx } from '@theme-ui/core';
import { FieldProps, useDefaults } from 'delta-jsf';
import { Slider } from '../../Slider';

export const SliderField = (props: FieldProps) => {
  useDefaults(props);
  const {
    schema: { readOnly, minimum, maximum },
    value,
    onValue,
  } = props;
  const { PrimitiveTemplate } = props.registry.templates;
  return (
    <PrimitiveTemplate {...props}>
      <Slider
        disabled={readOnly}
        max={maximum}
        min={minimum}
        value={value}
        // TODO: Use debounce!
        onChange={v => onValue?.(v)}
      />
    </PrimitiveTemplate>
  );
};
