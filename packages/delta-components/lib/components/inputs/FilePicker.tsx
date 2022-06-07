import { jsx } from '@theme-ui/core';
import {
  ChangeEvent,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoFileTrayOutline } from 'react-icons/io5';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { formatBytes } from '../../utils';
import { Anchor } from '../Anchor';
import { Button, ButtonProps } from '../Button';
import { BoxProps, Box } from '../containers';

export interface FilePickerProps
  extends Omit<BoxProps, keyof FormWidgetProps>,
    FormWidgetProps<FileList | undefined> {
  multiple?: boolean;
  children?: ReactNode;
  buttonProps?: Omit<ButtonProps, 'children'>;
}

export const FilePicker = forwardRef<HTMLDivElement, FilePickerProps>(
  (
    {
      multiple,
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
    const [innerValue, setInnerValue] = useState<FileList | undefined>(value);
    const handleChange = (nextValue: FileList | undefined) => {
      nextValue !== innerValue && setInnerValue(nextValue);
      nextValue !== value && onChange?.(nextValue);
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      files?.length && handleChange(files);
    };
    const handleButtonClick = useCallback(() => {
      inputRef.current?.click();
    }, [disabled]);
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        {...rest}
      >
        {innerValue?.length ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Array.from(innerValue).map((file, i) => {
              if (!file) {
                return null;
              }
              return <FilePickerItem key={i} file={file} />;
            })}
          </Box>
        ) : (
          <FilePickerItem />
        )}
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          sx={{ display: 'none' }}
          {...rest}
        />
        <Button
          disabled={disabled}
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleButtonClick}
          sx={{ ml: 'auto' }}
          {...buttonProps}
        >
          {children}
        </Button>
      </Box>
    );
  }
);

export interface FilePickerItemProps extends BoxProps {
  file?: File;
}

export const FilePickerItem = forwardRef<HTMLDivElement, FilePickerItemProps>(
  ({ file, ...rest }, ref) => {
    const [link, setLink] = useState('#');
    useEffect(() => {
      if (!file || typeof window === 'undefined') {
        return;
      }
      const url = window.URL.createObjectURL(new Blob([file]));
      setLink(url);
    }, [file]);
    return (
      <Box
        ref={ref}
        sx={{
          p: 2,
          w: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 4,
          lineHeight: 1.5,
          fontSize: 2,
          backgroundColor: 'accentSurface',
          color: 'onSurface',
        }}
        {...rest}
      >
        {file ? (
          <Anchor
            variant="pure"
            href={link}
            download={file.name}
            sx={{
              width: '100%',
              minWidth: 0,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: '1 1 auto',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'accentOnSurface',
              }}
            >
              {file.name}
            </Box>
            <Box sx={{ flex: '0 0 auto' }}>({formatBytes(file.size)})</Box>
          </Anchor>
        ) : (
          <IoFileTrayOutline
            size={24}
            sx={{ mx: 'auto', verticalAlign: 'middle', opacity: 0.5 }}
          />
        )}
      </Box>
    );
  }
);
