import { jsx } from '@theme-ui/core';
import { useState, useContext, useCallback, Fragment } from 'react';
import { useThrottle } from '../../hooks';
export const EastResize = ({
  setWidth,
  width,
  minWidth,
  maxWidth,
  resizableBoxRef
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const mouseUp = e => {
    window.removeEventListener('mousemove', onRightSideMouseMove);
    window.removeEventListener('mouseup', mouseUp);
  };
  const onRightSideMouseMove = useThrottle(e => {
    setWidth(
      e.clientX - (resizableBoxRef?.current?.getBoundingClientRect().left ?? 0)
    );
  }, 5);
  const onMouseDown = useCallback(e => {
    window.addEventListener('mousemove', onRightSideMouseMove);
    window.addEventListener('mouseup', mouseUp);
  }, []);
  return (
    <Fragment>
      <input
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        sx={{ opacity: 0, width: 0, position: 'absolute', top: 0 }}
        type="range"
        value={width}
        onChange={e => setWidth(e.target.valueAsNumber)}
        min={minWidth}
        max={maxWidth}
        step={10}
      />
      <div
        onMouseDown={onMouseDown}
        sx={{
          zIndex: 1,
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          width: '3px',
          ...(isFocus && {
            outlineColor: 'essential_outline',
            outlineOffset: -3,
            outlineWidth: 1,
            outlineStyle: 'solid'
          }),
          '&:hover, &:active, &:focus-visible': {
            '* &': {
              userSelect: 'none'
            },
            cursor: 'col-resize',
            borderColor: 'essential_outline',
            borderWidth: '0 1px 0 0',
            borderStyle: 'solid'
          }
        }}
      />
    </Fragment>
  );
};
