import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { darken } from 'polished';
import { IoIosClose } from 'react-icons/io';
import { Theme } from '../../../defaults';
import { Button, ButtonProps } from '../../Button';
import { Box, BoxProps } from '../../containers';

export interface AutocompleteSelectionProps extends BoxProps {
  onClick;
}

export const AutocompleteSelection = ({
  children,
  onClick,
  ...rest
}: AutocompleteSelectionProps) => {
  const theme = useTheme() as Theme;
  const backgroundColor = darken(0.9, theme.colors.accentOnSurface);
  return (
    <Box
      sx={{
        position: 'relative',
        pl: 2,
        pr: 1,
        py: 1,
        gap: '2px',
        backgroundColor,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      tabIndex={-1}
      {...rest}
    >
      <Box sx={{ position: 'relative', zIndex: 1, opacity: 0.9, fontSize: 2 }}>
        {children}
      </Box>
      <Box>
        <Button
          sx={{
            zIndex: 1,
            borderRadius: '100%',
            '&:hover, &:focus, &:focus-visible': {
              color: 'accentOnSurface',
              backgroundColor: 'accentSurface',
            },
          }}
          onClick={onClick}
        >
          <IoIosClose
            sx={{
              width: '1em',
              height: '1em',
              transform: 'scale(1.2)',
              verticalAlign: 'middle',
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};
