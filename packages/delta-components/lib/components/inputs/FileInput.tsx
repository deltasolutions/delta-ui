import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  ChangeEvent,
  ButtonHTMLAttributes,
} from 'react';
import { FormWidgetProps } from '../../types';
import { Button, ButtonProps } from '../Button';
import { Box } from '../containers';

export interface FileInputLabelRenderer {
  (fileNames: string[]): ReactNode;
}

export interface FileInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<FileList | undefined> {
  children?: ReactNode | FileInputLabelRenderer;
  buttonProps?: ButtonProps;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      children,
      buttonProps,
      value,
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (!files || files.length === 0) {
        onChange?.(undefined);
      } else {
        onChange?.(files);
      }
    };
    const handleLabelClick = useCallback(() => {
      if (disabled) {
        return;
      }
      inputRef.current?.click();
    }, [disabled]);

    return (
      <Box ref={ref} {...rest}>
        <input
          ref={inputRef}
          type="file"
          disabled={disabled}
          onChange={handleInputChange}
          sx={{ display: 'none' }}
          {...rest}
        />
        <Button
          variant="outlined"
          color="secondary"
          zoomable
          sx={{
            textTransform: 'none',
            borderStyle: 'dashed',
            borderRadius: 3,
            display: 'block',
          }}
          size="small"
          disabled={disabled}
          onClick={handleLabelClick}
          {...buttonProps}
        >
          {children ?? 'Choose file'}
        </Button>
      </Box>
    );
  }
);

const getLabel = (files: FileList | undefined) => {
  if (!files || files.length === 0) return 'Choose file';
  if (files.length > 1) {
    return `${files?.length} files selected`;
  }
  return `${files.item(0)?.name}`;
};
