import { keyframes } from '@emotion/react';
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Box, Button } from '../components';
import { useTransition } from './useTransition';

export default {
  title: 'hooks/useTransition',
} as Meta;

const spinAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const Basics = () => {
  const [isMounted, setIsMounted] = useState(false);
  const loader = useTransition<HTMLDivElement>(
    ({ isVisible, isEntering }, ref) => (
      <Box
        ref={ref}
        sx={{
          marginLeft: 3,
          position: 'absolute',
          right: '-2rem',
          top: '50%',
          width: '1.5rem',
          height: '1.5rem',
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${
            isVisible ? '-50%' : isEntering ? '-100%' : '0'
          })`,
          transition: 'opacity 0.5s, transform 0.5s',
        }}
      >
        <Box
          sx={{
            content: '""',
            display: 'block',
            boxSizing: 'border-box',
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: 'rgba(255, 255, 255, 0.7)',
            animation: `${spinAnimation} 1.4s infinite linear`,
          }}
        />
      </Box>
    ),
    {
      deps: [],
      isMounted,
    }
  );
  return (
    <Box css={{ position: 'relative' }}>
      <Button variant="contained" onClick={() => setIsMounted(!isMounted)}>
        Toggle
      </Button>
      {loader}
    </Box>
  );
};
