import { keyframes } from '@emotion/react';
import { BasicTheme } from 'restyler';

const getStripedStyle = ({ theme: { colors } }) => ({
  backgroundImage:
    'repeating-linear-gradient(' +
    '-45deg,' +
    'transparent,' +
    'transparent 1rem,' +
    `${colors.accentSurface} 1rem,` +
    `${colors.accentSurface} 2rem` +
    ')',
  backgroundSize: '200% 200%',
  pointerEvents: 'none'
});

const barberpole = keyframes({
  '100%': {
    backgroundPosition: '100% 100%'
  }
});

export const row: BasicTheme = {
  style: {
    alignItems: 'center',
    borderBottom: '1px solid transparent',
    fontSize: 3,
    lineHeight: '1.5rem',
    '&:hover': { backgroundColor: 'accentSurface' },
    '&:not(:last-child)': {
      borderBottomColor: 'border'
    }
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
      style: getStripedStyle
    },
    loader: {
      style: props => ({
        ...getStripedStyle(props as any),
        animation: `${barberpole} 10s linear infinite`
      })
    }
  }
};
