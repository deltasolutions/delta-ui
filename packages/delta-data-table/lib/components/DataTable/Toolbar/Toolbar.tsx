import { useTranslation } from 'next-i18next';
import { IoIosSave } from 'react-icons/io';
import { RiLayoutColumnFill } from 'react-icons/ri';
import { Box, BoxProps, Button } from 'restyler';
import { jsx } from '@theme-ui/core';
import { Tooltip } from '../../Tooltip';
import { Actions } from './Actions';
import { Tabs } from './Tabs';

export interface ToolbarProps extends BoxProps {
  onDownload?: () => void;
}

export const Toolbar = ({ onDownload, ...rest }: ToolbarProps) => {
  const [t] = useTranslation('common');
  const [tFlights] = useTranslation('flights');
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 3,
        borderBottom: '1px solid',
        borderBottomColor: 'border'
      }}
      {...rest}
    >
      <Tabs />
      <Box sx={{ display: 'flex', gap: 2 }}>
        {onDownload && (
          <Tooltip content={t('actions.download')}>
            <Button kind="icon" onClick={onDownload}>
              <IoIosSave />
            </Button>
          </Tooltip>
        )}
        <Actions />
      </Box>
    </Box>
  );
};
