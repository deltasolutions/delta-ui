import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { Slider } from '../../Slider';
import { TextArea } from '../../TextArea';

export const SliderField = (props: FieldProps) => {
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
        onChange={v => onValue?.(v)}
      />
    </PrimitiveTemplate>
  );
};
