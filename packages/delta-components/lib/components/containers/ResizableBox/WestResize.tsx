import { jsx } from '@theme-ui/core';
import { useState, useCallback, Fragment } from 'react';
import { useThrottledCallback } from '../../../hooks';

export const WestResize = ({ minWidth, width, maxWidth, setWidth }) => {
  const [isFocus, setIsFocus] = useState(false);
  const onMouseMove = useThrottledCallback(e => {
    setWidth(window.innerWidth - e.clientX);
  }, 5);
  const onMouseDown = useCallback(e => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);
  const onMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, []);
  return (
    <Fragment>
      <input
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        sx={{ opacity: 0, width: 0, position: 'absolute' }}
        type="range"
        value={width ? -width : -maxWidth}
        onChange={e => setWidth(Math.abs(e.target.valueAsNumber))}
        min={-maxWidth}
        max={-minWidth}
        step={10}
      />
      <div
        onMouseDown={onMouseDown}
        sx={{
          zIndex: 1,
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '3px',
          ...(isFocus && {
            outlineOffset: -3,
            outlineWidth: 1,
            outlineStyle: 'solid',
          }),
          '&:hover, &:active, &:focus-visible': {
            '* &': {
              userSelect: 'none',
            },
            cursor: 'col-resize',
            borderColor: 'essential_outline',
            borderWidth: '0 0 0 1px',
            borderStyle: 'solid',
          },
        }}
      />
    </Fragment>
  );
};
