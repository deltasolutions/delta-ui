import { keyframes } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from 'delta-ui-kit';

export interface SkeletonProps extends BoxProps {}

export const Skeleton = (props: SkeletonProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        width: '100%',
        height: '100%',
        backgroundColor: 'accentContext',
        maskImage:
          `linear-gradient(90deg, ` +
          `rgba(0, 0, 0, 1), ` +
          `rgba(0, 0, 0, 0.5), ` +
          `rgba(0, 0, 0, 1))`,
        maskSize: '300% 100%',
        animation: `${animation} 1s infinite alternate`,
      }}
      {...props}
    />
  );
};

const animation = keyframes({
  to: {
    maskPosition: 'right',
  },
});
