import { jsx } from '@theme-ui/core';
import { lighten } from 'polished';
import { useDeltaTheme } from '../../../hooks';
import { Box } from '../../containers';

export const TableSearchSelection = ({ id, index, arr, removing, ...rest }) => {
  const { colors } = useDeltaTheme();
  return (
    <Box
      style={{
        opacity: removing ? 0.5 : 1,
        marginLeft:
          index === 0 ||
          arr[index - 1]?.includes('|') ||
          id.split('|').length === 2
            ? 0
            : 8,
      }}
      sx={{
        px: 2,
        py: '2px',
        backgroundColor: lighten(0.065, colors.accentContext),
      }}
      {...rest}
    />
  );
};
