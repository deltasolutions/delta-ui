import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { RiUploadCloudLine } from 'react-icons/ri';
import { Button } from '../../Button';
import { Box, BoxProps } from '../../containers';

export interface FilePickerPreviewProps extends BoxProps {
  isMultiple?: boolean;
  disabled?: boolean;
}

export const FilePickerPreview = ({
  disabled,
  isMultiple,
}: FilePickerPreviewProps) => {
  const [t] = useTranslation('common');
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <RiUploadCloudLine size={18} />
        <Box>
          {isMultiple ? t('descriptions.dndFiles') : t('descriptions.dndFile')}
        </Box>
      </Box>
      <Button
        disabled={disabled}
        sx={{
          color: 'accentOnContext',
          width: 'fit-content',
          textDecoration: 'underline',
          borderRadius: 2,
        }}
      >
        {isMultiple ? t('actions.browseFiles') : t('actions.browseFile')}
      </Button>
    </Fragment>
  );
};
