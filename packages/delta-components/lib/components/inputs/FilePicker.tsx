import { jsx } from '@theme-ui/core';
import {
  ChangeEvent,
  forwardRef,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DndProvider, DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { RiUploadCloudLine } from 'react-icons/ri';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { formatBytes } from '../../utils';
import { Anchor, AnchorProps } from '../Anchor';
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
      <DndProvider backend={HTML5Backend}>
        <Box ref={ref} {...rest}>
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
            sx={{ display: 'none' }}
            {...rest}
          />
          <DndBox
            onDrop={({ files }) => {
              files.length && handleChange(files);
            }}
            onClick={handleButtonClick}
          >
            {innerValue?.length &&
              Array.from(innerValue).map((file, i) => {
                if (!file) {
                  return null;
                }
                return (
                  <FilePickerItem key={i} isEven={i % 2 === 0} file={file} />
                );
              })}
          </DndBox>
        </Box>
      </DndProvider>
    );
  }
);

export interface FilePickerItemProps extends AnchorProps {
  file: File;
  isEven: boolean;
}

export const FilePickerItem = forwardRef<
  HTMLAnchorElement,
  FilePickerItemProps
>(({ file, isEven, ...rest }, ref) => {
  const [link, setLink] = useState('#');
  useEffect(() => {
    if (!file || typeof window === 'undefined') {
      return;
    }
    const url = window.URL.createObjectURL(new Blob([file]));
    setLink(url);
  }, [file]);
  return (
    <Anchor
      ref={ref}
      {...rest}
      variant="pure"
      href={link}
      download={file.name}
      sx={{
        py: 2,
        px: 3,
        w: '100%',
        fontSize: 1,
        justifyContent: 'space-between',
        color: 'accentOnSurface',
        '&:hover, &:active, &:focus-visible': {
          textDecoration: 'underline',
        },
      }}
    >
      {file.name}{' '}
      <span sx={{ color: 'onSurface' }}>({formatBytes(file.size)})</span>
    </Anchor>
  );
});

export interface DndBoxProps extends Omit<BoxProps, 'onDrop'> {
  onDrop: (item: { files: FileList }) => void;
  onClick: () => void;
}
const DndBox = ({ onDrop, onClick, children, ...rest }: DndBoxProps) => {
  const [tCommon] = useTranslation('common');
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files }) {
        onDrop?.(item);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  const isActive = canDrop && isOver;
  return (
    <Box
      ref={drop}
      sx={{
        backgroundColor: 'accentSurface',
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
      {...(!children && { onClick })}
      style={{
        outlineColor: 'primary',
        outlineStyle: 'solid',
        outlineWidth: 0,
        ...(isActive && {
          opacity: 0.5,
          outlineWidth: 1,
        }),
      }}
      {...rest}
    >
      {children ? (
        <Fragment>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              'a:not(a:last-child)': {
                borderBottomColor: '#4a4545',
                borderBottomWidth: '0.1px',
                borderBottomStyle: 'solid',
              },
            }}
          >
            {children}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              px: 2,
              flexDirection: 'column',
              ml: 'auto',
            }}
          >
            <Button
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'flex-start',
                fontSize: '0.65rem',
                textDecoration: 'underline',
                '&:hover, &:active, &:focus-visible': {
                  color: 'accentOnSurface',
                },
              }}
              onClick={onClick}
            >
              <RiUploadCloudLine size={12} />
              <span>{tCommon('actions.browseFiles')}</span>
            </Button>
          </Box>
        </Fragment>
      ) : isActive ? (
        <RiUploadCloudLine size={26} />
      ) : (
        <Fragment>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <RiUploadCloudLine size={18} />
            <Box>{tCommon('actions.dndToUpload')}</Box>
          </Box>
          <Button
            sx={{
              color: 'accentOnSurface',
              width: 'fit-content',
              textDecoration: 'underline',
            }}
          >
            {tCommon('actions.browseFiles')}
          </Button>
        </Fragment>
      )}
    </Box>
  );
};
