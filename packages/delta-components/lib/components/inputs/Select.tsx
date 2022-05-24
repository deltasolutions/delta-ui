import { jsx } from '@theme-ui/core';
import { forwardRef, useMemo, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useDrop } from '../../hooks/useDrop';
import { mergeRefs } from '../../utils';
import { Box, BoxProps } from '../Box';
import { Button } from '../Button';
import { TextField } from './TextField';

export interface SelectOption {
  title: string;
  value: unknown;
}

export interface SelectProps extends Omit<BoxProps, 'children'> {
  options: SelectOption[];
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (v: unknown) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, disabled, placeholder, ...rest }: SelectProps, ref) => {
    const [innerValue, setInnerValue] = useState<unknown>(value);
    const title = useMemo(
      () => options.find(v => v.value === innerValue)?.title,
      [options, innerValue]
    );
    const [openDrop, anchorRef] = useDrop<HTMLDivElement>(
      ({ handleClose }) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: 3,
            }}
          >
            {options.map(v => (
              <Button
                key={v.title}
                onClick={() => {
                  setInnerValue(v.value);
                  handleClose();
                }}
                sx={{
                  cursor: 'pointer',
                  paddingX: 2,
                  paddingY: 3,
                  textAlign: 'left',
                  '&:hover': {
                    backgroundColor: 'accentSurface',
                  },
                }}
              >
                {v.title}
              </Button>
            ))}
          </Box>
        );
      },
      {
        deps: [],
        tailored: true,
      }
    );
    const mergedRef = useMemo(() => mergeRefs([ref, anchorRef]), []);
    return (
      <Box
        ref={mergedRef}
        sx={{
          position: 'relative',
          width: '100%',
          minWidth: '100px',
        }}
        {...rest}
      >
        <TextField
          readOnly
          value={title}
          disabled={disabled}
          placeholder={placeholder}
          sx={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            paddingRight: '2em',
          }}
          onFocus={() => openDrop()}
        />
        <IoChevronDown
          sx={{
            position: 'absolute',
            top: '50%',
            right: 2,
            width: '1.25em',
            height: '1.25em',
            transform: 'translateY(-50%)',
          }}
        />
      </Box>
    );
  }
);
