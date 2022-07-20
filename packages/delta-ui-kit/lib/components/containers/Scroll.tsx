import { jsx } from '@theme-ui/core';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Button, ButtonProps } from '../Button';
import { Box, BoxProps } from './Box';

export interface ScrollProps extends BoxProps {
  slideStep?: number;
  buttonProps?: Omit<ButtonProps, 'children'>;
}

export const Scroll = forwardRef<HTMLDivElement, ScrollProps>(
  ({ slideStep = 300, buttonProps, children, ...rest }, ref) => {
    const contentRef = useRef<any>(null);
    const [scrollX, setScrollX] = useState(0);
    const [scrolEnd, setScrolEnd] = useState(false);
    const handleSlide = shift => {
      contentRef.current.scrollLeft += shift;
      setScrollX(scrollX + shift);
      if (
        Math.floor(
          contentRef.current.scrollWidth - contentRef.current.scrollLeft
        ) <= contentRef.current.offsetWidth
      ) {
        setScrolEnd(true);
      } else {
        setScrolEnd(false);
      }
    };
    const handleScroll = () => {
      setScrollX(contentRef.current.scrollLeft);
      if (
        Math.floor(
          contentRef.current.scrollWidth - contentRef.current.scrollLeft
        ) <= contentRef.current.offsetWidth
      ) {
        setScrolEnd(true);
      } else {
        setScrolEnd(false);
      }
    };
    useEffect(() => {
      handleScroll();
    }, [contentRef.current?.scrollWidth]);
    return (
      <Box ref={ref} sx={{ position: 'relative', width: '100%' }} {...rest}>
        <Box
          ref={contentRef}
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
          onScroll={handleScroll}
          {...rest}
        >
          {children}
        </Box>
        {scrollX !== 0 && (
          <Button
            sx={{ ...buttonBaseStyle, left: 0, top: 0 }}
            onClick={() => handleSlide(-slideStep)}
            {...buttonProps}
          >
            <MdKeyboardArrowLeft size={32} />
          </Button>
        )}
        {!scrolEnd && (
          <Button
            sx={{ ...buttonBaseStyle, right: 0, top: 0 }}
            onClick={() => handleSlide(slideStep)}
            {...buttonProps}
          >
            <MdKeyboardArrowRight size={32} />
          </Button>
        )}
      </Box>
    );
  }
);

const buttonBaseStyle = {
  zIndex: 10,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '40px',
  color: 'accentOnContext',
  backdropFilter: 'blur(5px)',
} as const;
