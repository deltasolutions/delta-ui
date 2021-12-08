import { keyframes } from '@emotion/react';
import { BasicTheme } from 'restyler';

const getStripedStyle = (
  { theme: { colors } }: { [key: string]: any },
  isAnimated = false
) => ({
  pointerEvents: 'none',
  position: 'relative',
  overflow: 'hidden',
  '& > *': {
    background:
      'repeating-linear-gradient(' +
      '-55deg,' +
      'transparent 1px,' +
      `${colors.accentSurface} 2px,` +
      `${colors.accentSurface} 20px,` +
      'transparent 21px,' +
      'transparent 39px' +
      ')',
    position: 'absolute',
    left: '-46px',
    right: '0',
    top: '0',
    bottom: '0',
    animation: isAnimated ? `${barberpole} 0.7s linear infinite` : undefined
  }
});

const barberpole = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(46px)' }
});

export const row: BasicTheme = {
  style: {
    alignItems: 'center',
    borderBottom: '1px solid',
    borderBottomColor: 'border',
    fontSize: 3,
    lineHeight: '1.5rem',
    '&:hover': { backgroundColor: 'accentSurface' }
  },
  kinds: {
    head: {
      style: {
        backgroundColor: 'accentSurface',
        borderBottom: '1px solid',
        borderBottomColor: 'border',
        userSelect: 'none',
        fontWeight: 'heading',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        fontSize: 2
      }
    },
    empty: {
      style: props => getStripedStyle(props, false)
    },
    loader: {
      style: props => getStripedStyle(props, true)
    }
  }
};
