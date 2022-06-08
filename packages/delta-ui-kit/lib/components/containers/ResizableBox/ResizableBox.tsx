import { jsx } from '@theme-ui/core';
import { useCallback, useRef, useState } from 'react';
import { Box, BoxProps } from '../Box';
import { EastResize } from './EastResize';
import { WestResize } from './WestResize';

export interface ResizableBoxProps extends BoxProps {
  onResize?: (width: number) => void;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  axis?: ('w' | 'e')[];
}

export const ResizableBox = ({
  children,
  onResize,
  minWidth = 200,
  maxWidth = 600,
  width: suggestedWidth = 230,
  axis = ['e'],
  ...rest
}: ResizableBoxProps) => {
  const resizableBoxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(suggestedWidth);
  const tryToSetWidth = useCallback(
    width => {
      if (minWidth >= width) {
        onResize?.(minWidth);
        return setWidth(minWidth);
      }
      if (width >= maxWidth) {
        onResize?.(maxWidth);
        return setWidth(maxWidth);
      }
      setWidth(width);
      onResize?.(width);
    },
    [minWidth, setWidth, onResize, maxWidth]
  );
  return (
    <Box
      ref={resizableBoxRef}
      style={{ minWidth: width + 'px', width: width + 'px' }}
      sx={{ position: 'relative' }}
      {...rest}
    >
      <Box sx={{ height: '100%', overflow: 'hidden' }}>
        {axis.includes('e') && (
          <EastResize
            maxWidth={maxWidth}
            minWidth={minWidth}
            resizableBoxRef={resizableBoxRef}
            setWidth={tryToSetWidth}
            width={width}
          />
        )}
        {children}
        {axis.includes('w') && (
          <WestResize
            maxWidth={maxWidth}
            minWidth={minWidth}
            setWidth={tryToSetWidth}
            width={width}
          />
        )}
      </Box>
    </Box>
  );
};
