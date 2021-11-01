import { jsx } from '@theme-ui/core';
import { IoIosSave } from 'react-icons/io';
import { Box, BoxProps, Button } from 'restyler';
import { Actions } from './Actions';
import { Tabs } from './Tabs';

export interface ToolbarProps extends BoxProps {
  onDownload?: () => void;
}

export const Toolbar = ({ onDownload, ...rest }: ToolbarProps) => {
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
          <Button kind="icon" onClick={onDownload}>
            <IoIosSave />
          </Button>
        )}
        <Actions />
      </Box>
    </Box>
  );
};
