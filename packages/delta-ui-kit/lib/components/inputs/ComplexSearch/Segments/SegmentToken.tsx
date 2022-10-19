import { jsx } from '@theme-ui/core';
import { lighten } from 'polished';
import { useDeltaTheme } from '../../../../hooks';
import { Box, BoxProps } from '../../../containers';

export const SegmentToken = (props: BoxProps) => {
  const { colors } = useDeltaTheme();
  return (
    <Box
      sx={{
        px: 1,
        py: '2px',
        backgroundColor: lighten(0.08, colors.accentContext),
      }}
      {...props}
    />
  );
};
