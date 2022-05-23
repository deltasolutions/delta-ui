import { jsx } from '@theme-ui/core';
import { HTMLAttributes, useCallback, useRef, useState } from 'react';
import { Box } from '../Box';
import { EastResize } from './EastResize';
import { WestResize } from './WestResize';
export interface ResizableBoxProps extends HTMLAttributes<HTMLDivElement> {
  onResize?: (width: number) => void;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  axis?: Partial<'w' | 'e'>[];
}

export const ResizableBox = ({
  children,
  onResize,
  minWidth = 200,
  maxWidth = 600,
  width: propsWidth = minWidth,
  axis = ['e'],
  ...rest
}: ResizableBoxProps) => {
  const resizableBoxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(propsWidth);
  const trySetWidth = useCallback(
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
      style={{ minWidth: width + 'px', width: width + 'px' }}
      sx={{
        position: 'relative'
      }}
      ref={resizableBoxRef}
      {...rest}
    >
      <Box sx={{ height: '100%', overflow: 'hidden' }}>
        {axis.includes('e') && (
          <EastResize
            resizableBoxRef={resizableBoxRef}
            minWidth={minWidth}
            width={width}
            maxWidth={maxWidth}
            setWidth={trySetWidth}
          />
        )}
        {children}
        {axis.includes('w') && (
          <WestResize
            minWidth={minWidth}
            width={width}
            maxWidth={maxWidth}
            setWidth={trySetWidth}
          />
        )}
      </Box>
    </Box>
  );
};
