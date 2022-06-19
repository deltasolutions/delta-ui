import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RiDeleteBin5Fill,
  RiUpload2Fill,
  RiUploadCloudLine,
} from 'react-icons/ri';
import { Button } from '../../Button';
import { Box, BoxProps } from '../../containers';
import { FilePickerWidget } from './FilePickerWidget';

export interface FilePickerFilesProps extends BoxProps {
  files?: FileList;
  onBrowseFiles: () => void;
  handleInputChange;
  isMultiple?: boolean;
}

export const FilePickerFiles = ({
  files,
  handleInputChange,
  onBrowseFiles,
}: FilePickerFilesProps) => {
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
          <RiUpload2Fill size={16} />
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
          <RiDeleteBin5Fill size={16} />
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          mt: '-8px',
          flexDirection: 'column',
          'a:not(a:last-child)': {
            borderBottom: '1px solid',
            borderBottomColor: 'border',
          },
        }}
      >
        {files?.length &&
          Array.from(files).map((file, i) => {
            if (!file) {
              return null;
            }
            return (
              <FilePickerWidget key={i} file={file} isEven={i % 2 === 0} />
            );
          })}
      </Box>
    </Fragment>
  );
};
