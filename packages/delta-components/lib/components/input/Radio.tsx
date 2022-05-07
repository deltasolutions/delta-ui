import { jsx } from '@theme-ui/core';
import { InputHTMLAttributes } from 'react';
import { DISABLED_OPACITY } from '../../variables';
import { Box } from '../Box';
export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Radio = ({ disabled, name, id, ...rest }: RadioProps) => {
  return (
    <Box
      sx={{
        '[type="radio"]:checked,\n[type="radio"]:not(:checked)': {
          position: 'absolute',
          left: '-9999px'
        },
        '[type="radio"]:checked + label,\n[type="radio"]:not(:checked) + label':
          {
            position: 'relative',
            paddingLeft: '28px',
            cursor: 'pointer',
            lineHeight: '26px',
            display: 'inline-block'
          },
        '[type="radio"]:checked + label:before,\n[type="radio"]:not(:checked) + label:before':
          {
            content: "''",
            position: 'absolute',
            left: '0',
            top: '0',
            width: '24px',
            height: '24px',
            borderRadius: '100%',
            backgroundColor: 'secondaryContainer'
          },
        '[type="radio"]:checked + label:before': {
          backgroundColor: 'primary'
        },
        '[type="radio"]:focus-visible + label:before': {
          outlineOffset: -1,
          outlineWidth: 3,
          outlineStyle: 'solid'
        },
        '[type="radio"]:checked + label:after,\n[type="radio"]:not(:checked) + label:after':
          {
            content: "''",
            width: '8px',
            height: '8px',
            backgroundColor: 'onPrimary',
            position: 'absolute',
            top: '8px',
            left: '8px',
            borderRadius: '100%'
          },
        '[type="radio"]:not(:checked) + label:after': {
          opacity: 0,
          WebkitTransform: 'scale(0)',
          transform: 'scale(0)'
        },
        '[type="radio"]:checked + label:after': {
          opacity: 2,
          WebkitTransform: 'scale(1)',
          transform: 'scale(1)'
        },
        '[type="radio"]:disabled + label:before': {
          opacity: 2
        }
      }}
    >
      <input disabled={disabled} type="radio" id={id} name={name} {...rest} />
      <label style={{ ...(disabled && { cursor: 'auto' }) }} htmlFor={id}>
        {id}
      </label>
    </Box>
  );
};
