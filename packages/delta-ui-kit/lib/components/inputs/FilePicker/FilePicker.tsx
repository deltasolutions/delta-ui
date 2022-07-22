import { jsx } from '@theme-ui/core';
import {
  ChangeEvent,
  forwardRef,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { RiUploadCloudLine } from 'react-icons/ri';
import { useUpdateEffect } from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { ButtonProps } from '../../Button';
import { BoxProps, Box } from '../../containers';
import { FilePickerFiles } from './FilePickerFiles';
import { FilePickerPreview } from './FilePickerPreview';

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
    const [innerValue, setInnerValue] = useState<FileList | undefined>(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange = useCallback(
      (nextValue: FileList | undefined) => {
        nextValue !== innerValue && setInnerValue(nextValue);
        nextValue !== value && onChange?.(nextValue);
      },
      [innerValue, value, onChange]
    );
    const handleInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files;
        if (!event) {
          handleChange(undefined);
          return;
        }
        if (files?.length) {
          handleChange(files);
        }
      },
      [handleChange, multiple]
    );
    const onBrowseFiles = useCallback(() => {
      inputRef.current?.click();
    }, [disabled]);
    const [{ canDrop, isOver }, drop] = useDrop(
      () => ({
        accept: [NativeTypes.FILE],
        drop: (item: { dataTransfer: DataTransfer; files: File[] }) => {
          if (item.files.length === 0) {
            return;
          }
          if (!multiple && item.files.length !== 1) {
            return;
          }
          handleChange(item.dataTransfer.files);
        },
        collect: (monitor: DropTargetMonitor) => {
          return {
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
          };
        },
      }),
      [handleChange, multiple]
    );
    const active = useMemo(() => canDrop && isOver, [canDrop, isOver]);
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    return (
      <Box ref={ref} {...rest}>
        <input
          ref={inputRef}
          disabled={disabled}
          multiple={multiple}
          sx={{ display: 'none' }}
          type="file"
          onChange={handleInputChange}
          {...rest}
        />
        <Box
          ref={drop}
          sx={{
            backgroundColor: 'accentContext',
            borderRadius: 4,
            paddingY: 2,
            minHeight: '4rem',
            gap: 2,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          {...(!innerValue && { onClick: onBrowseFiles })}
          style={{
            outlineStyle: 'solid',
            outlineColor: 'primary',
            outlineWidth: 0,
            ...(active && {
              opacity: 0.5,
              outlineWidth: 2,
            }),
          }}
          {...rest}
        >
          {innerValue ? (
            <FilePickerFiles
              files={innerValue}
              handleInputChange={handleInputChange}
              isMultiple={multiple}
              onBrowseFiles={onBrowseFiles}
            />
          ) : active ? (
            <RiUploadCloudLine size={26} />
          ) : (
            <FilePickerPreview isMultiple={multiple} />
          )}
        </Box>
      </Box>
    );
  }
);
