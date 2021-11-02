import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from 'restyler';
import { Actions } from './Actions';
import { Tabs } from './Tabs';

export interface ToolbarProps extends BoxProps {}

export const Toolbar = (props: ToolbarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 3,
        borderBottom: '1px solid',
        borderBottomColor: 'border'
      }}
      {...props}
    >
      <Tabs />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Actions />
      </Box>
    </Box>
  );
};
