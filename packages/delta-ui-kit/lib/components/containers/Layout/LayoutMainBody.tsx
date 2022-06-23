import { jsx } from '@theme-ui/core';
import { useDeltaTheme } from '../../../hooks';
import { Box, BoxProps } from '../Box';

export interface LayoutMainBodyProps extends BoxProps {
  variant?: 'tabs';
  size?: 'small' | 'medium' | 'large';
}

export const LayoutMainBody = ({
  variant,
  size,
  children,
  ...rest
}: LayoutMainBodyProps) => {
  const { colors } = useDeltaTheme();
  return (
    <Box
      sx={{
        paddingX: 5,
        ...(variant === 'tabs'
          ? {}
          : {
              flex: '1 1 auto',
              paddingY: 5,
              display: 'flex',
              justifyContent: 'center',
              background:
                `linear-gradient(` +
                `${colors.accentBackground} 0, ` +
                `transparent 270px` +
                `), ${layoutMainNoise}`,
            }),
      }}
      {...rest}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            small: '500px',
            medium: '900px',
            large: '1280px',
          }[size ?? ''],
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export const layoutMainNoise =
  `url(data:image/svg+xml;base64,` +
  `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcv` +
  `MjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0i` +
  `MzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIw` +
  `Ij48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxO` +
  `b2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0` +
  `Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRy` +
  `aXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIv` +
  `PjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNh` +
  `KSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYz` +
  `MDBIMHoiLz48L3N2Zz4=` +
  `)`;
