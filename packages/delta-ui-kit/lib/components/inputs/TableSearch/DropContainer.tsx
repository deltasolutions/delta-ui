import { jsx } from '@theme-ui/core';
import { forwardRef, useContext } from 'react';
import { Box } from '../../containers';
import { DropContext } from './contexts';

export const DropContainer = forwardRef<any, any>(({ handleClose }, ref) => {
  const { renderDrop } = useContext(DropContext);
  return (
    <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column' }}>
      {renderDrop(handleClose)}
    </Box>
  );
});
