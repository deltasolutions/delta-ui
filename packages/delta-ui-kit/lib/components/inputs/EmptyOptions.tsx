import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import { Box, BoxProps } from '../containers';

export const EmptyOptions = forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
        {...props}
      >
        <AiOutlineInbox sx={{ width: '1.3em', height: '1.3em' }} />
      </Box>
    );
  }
);
