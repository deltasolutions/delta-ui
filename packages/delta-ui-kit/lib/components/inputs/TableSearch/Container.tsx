import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { Box } from '../../containers';
import { TableSearchContext } from './contexts';

export const Container = props => {
  const { disabled } = useContext(TableSearchContext);
  return (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Box
        sx={{
          pl: 1,
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          backgroundColor: 'accentContext',
          borderRadius: 4,
          display: 'flex',
          cursor: disabled ? 'not-allowed' : 'default',
          '&:focus-within': {
            outline: '2px solid',
            outlineColor: 'primary',
          },
        }}
      >
        <ul
          sx={{
            minHeight: '1.6em',
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            width: '1px',
            listStyle: 'none',
            margin: '6px',
            padding: 0,
          }}
          {...props}
        />
      </Box>
    </Box>
  );
};
