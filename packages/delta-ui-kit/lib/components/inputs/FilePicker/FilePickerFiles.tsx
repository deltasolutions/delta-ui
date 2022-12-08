import { jsx } from '@theme-ui/core';
import { rgba } from 'polished';
import { Fragment } from 'react';
import { RiDeleteBin5Fill, RiUpload2Fill } from 'react-icons/ri';
import { useDeltaTheme } from '../../../hooks';
import { Button } from '../../Button';
import { Box, BoxProps } from '../../containers';
import { FilePickerWidget } from './FilePickerWidget';

export interface FilePickerFilesProps extends BoxProps {
  files?: FileList;
  onBrowseFiles: () => void;
  handleInputChange;
  isMultiple?: boolean;
  disabled?: boolean;
}

export const FilePickerFiles = ({
  files,
  disabled,
  handleInputChange,
  onBrowseFiles,
}: FilePickerFilesProps) => {
  const { colors } = useDeltaTheme();
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          px: 2,
          flexDirection: 'row',
          ml: 'auto',
        }}
      >
        {!disabled && (
          <Fragment>
            <Button
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'flex-start',
                borderRadius: 2,
                fontSize: '0.7rem',
                textDecoration: 'underline',
                '&:hover, &:active, &:focus-visible': {
                  color: 'accentOnContext',
                },
              }}
              onClick={onBrowseFiles}
            >
              <RiUpload2Fill size={18} />
            </Button>
            <Button
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'flex-start',
                borderRadius: 2,
                fontSize: '0.7rem',
                textDecoration: 'underline',
                '&:hover, &:active, &:focus-visible': {
                  color: 'accentOnContext',
                },
              }}
              onClick={() => handleInputChange(undefined)}
            >
              <RiDeleteBin5Fill size={18} />
            </Button>
          </Fragment>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          mt: '-5px',
          flexDirection: 'column',
          'a:not(a:last-child)': {
            borderBottom: '1px solid',
            borderBottomColor: rgba(colors.onContext, 0.4),
          },
        }}
      >
        {files?.length &&
          Array.from(files).map((file, i) => {
            if (!file) {
              return null;
            }
            return (
              <FilePickerWidget
                key={i}
                disabled={disabled}
                file={file}
                isEven={i % 2 === 0}
              />
            );
          })}
      </Box>
    </Fragment>
  );
};
