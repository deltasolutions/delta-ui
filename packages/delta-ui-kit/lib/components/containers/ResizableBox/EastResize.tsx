import { jsx } from '@theme-ui/core';
import { useState, useCallback, Fragment } from 'react';
import { useThrottledCallback } from '../../../hooks';

export const EastResize = ({
  setWidth,
  width,
  minWidth,
  maxWidth,
  resizableBoxRef,
}) => {
  const [focused, setFocused] = useState(false);
  const onRightSideMouseMove = useThrottledCallback(e => {
    setWidth(
      e.clientX - (resizableBoxRef?.current?.getBoundingClientRect().left ?? 0)
    );
  }, 5);
  const onMouseDown = useCallback(() => {
    window.addEventListener('mousemove', onRightSideMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);
  const onMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', onRightSideMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, []);
  return (
    <Fragment>
      <input
        max={maxWidth}
        min={minWidth}
        step={10}
        sx={{ opacity: 0, width: 0, position: 'absolute', top: 0 }}
        type="range"
        value={width}
        onBlur={() => setFocused(false)}
        onChange={e => setWidth(e.target.valueAsNumber)}
        onFocus={() => setFocused(true)}
      />
      <div
        sx={{
          zIndex: 1,
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: '3px',
          ...(focused && {
            outlineOffset: -3,
            outlineWidth: 1,
            outlineStyle: 'solid',
          }),
          '&:hover, &:active, &:focus-visible': {
            '* &': {
              userSelect: 'none',
            },
            cursor: 'col-resize',
            borderColor: 'accentExterior',
            borderWidth: '0 1px 0 0',
            borderStyle: 'solid',
          },
        }}
        onMouseDown={onMouseDown}
      />
    </Fragment>
  );
};
