import { jsx } from '@theme-ui/core';
import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Box, BoxProps } from './Box';

export interface ScrollProps extends BoxProps {}

export const Scroll = ({ children, ...rest }: ScrollProps) => {
  let scrl = useRef<any>(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const slide = shift => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  useEffect(() => {
    scrollCheck();
  }, [scrl.current?.scrollWidth]);
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
      }}
      {...rest}
    >
      {scrollX !== 0 && (
        <button
          sx={{
            background: 'none',
            position: 'absolute',
            border: 'none',
            left: 0,
            top: '50%',
            height: 'calc(100% + 2px)',
            cursor: 'pointer',
            backdropFilter: 'blur(2px)',
            aspectRatio: '1/1',
            display: 'flex',
            width: '40px',
            alignItems: 'center',
            transform: 'translateY(-50%)',
          }}
          onClick={() => slide(-50)}
        >
          <MdKeyboardArrowLeft
            size={32}
            sx={{ marginLeft: 'auto', '& > *': { color: 'text_base' } }}
          />
        </button>
      )}
      <Box
        ref={scrl}
        sx={{
          overflow: 'scroll',
          maxWidth: '100%',
          height: 'min-content',
          display: 'flex',
          alignItems: 'center',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        onScroll={scrollCheck}
        {...rest}
      >
        {children}
      </Box>
      {!scrolEnd && (
        <button
          sx={{
            background: 'none',
            position: 'absolute',
            border: 'none',
            top: '50%',
            cursor: 'pointer',
            right: 0,
            height: 'calc(100% + 2px)',
            display: 'flex',
            width: '40px',
            alignItems: 'center',
            backdropFilter: 'blur(2px)',
            aspectRatio: '1/1',
            justifyContent: 'flex-start',
            transform: 'translateY(-50%)',
          }}
          onClick={() => slide(+50)}
        >
          <MdKeyboardArrowRight
            size={32}
            sx={{ '& > *': { color: 'text_base' } }}
          />
        </button>
      )}
    </Box>
  );
};
