import { keyframes } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../containers';

export interface SkeletonProps extends Omit<BoxProps, 'children'> {}

export const Skeleton = (props: SkeletonProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        height: '1em',
        width: '5em',
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
