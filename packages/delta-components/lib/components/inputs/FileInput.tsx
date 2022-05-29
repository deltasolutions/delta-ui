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
} from 'react';
import { FormWidgetProps } from '../../types';
import { Box } from '../containers';

export interface FileInputLabelRenderer {
  (fileNames: string[]): ReactNode;
}

export interface FileInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, keyof FormWidgetProps>,
    FormWidgetProps<FileList | undefined> {
  children?: ReactNode | FileInputLabelRenderer;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export const FileInput = forwardRef<HTMLDivElement, FileInputProps>(
  (
    {
      children,
      inputProps,
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
    const [innerValue, setInnerValue] = useState(value);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (!files || files.length === 0) {
        setInnerValue(undefined);
        onChange?.(undefined);
      } else {
        setInnerValue(files);
        onChange?.(files);
      }
    };
    const handleLabelClick = useCallback(() => {
      if (disabled) {
        return;
      }
      inputRef.current?.click();
    }, [disabled]);
    useEffect(() => {
      setInnerValue(value);
    }, [value]);
    return (
      <Box ref={ref} {...rest}>
        <input
          ref={inputRef}
          type="file"
          onChange={handleInputChange}
          sx={{ display: 'none' }}
          {...inputProps}
        />
        <label
          sx={{
            paddingX: '1.85em',
            paddingY: '0.85em',
            borderRadius: 3,
            display: 'block',
            textAlign: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontSize: 2,
            backgroundColor: 'secondary',
            color: 'onSecondary',
            '&:not(:disabled):hover': { backgroundColor: 'accentSecondary' },
          }}
          onClick={handleLabelClick}
        >
          {children && typeof children === 'function'
            ? (children as FileInputLabelRenderer)(
                Array(innerValue?.length ?? 0)
                  .fill(null)
                  .reduce(
                    (acc, _, i) => [...acc, innerValue?.item(i)?.name],
                    []
                  )
              )
            : children}
          {!children && getLabel(innerValue)}
        </label>
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
