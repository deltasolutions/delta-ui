import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../../containers';

export const ComplexSearchContainer = (props: BoxProps) => {
  return (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Box
        sx={{
          pl: 2,
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          backgroundColor: 'accentContext',
          borderRadius: 4,
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          '&:focus-within': {
            outline: '2px solid',
            outlineColor: 'primary',
          },
        }}
        {...props}
      />
    </Box>
  );
};
