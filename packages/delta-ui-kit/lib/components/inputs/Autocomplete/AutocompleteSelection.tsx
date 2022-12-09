import { jsx } from '@theme-ui/core';
import { darken, lighten } from 'polished';
import { IoIosClose } from 'react-icons/io';
import { useDeltaTheme } from '../../../hooks';
import { Button } from '../../Button';
import { Box, BoxProps } from '../../containers';

export interface AutocompleteSelectionProps extends BoxProps {
  onClick?: () => void;
}

export const AutocompleteSelection = ({
  children,
  onClick,
  ...rest
}: AutocompleteSelectionProps) => {
  const { mode, colors } = useDeltaTheme();
  const accent = mode === 'light' ? darken : lighten;
  return (
    <Box
      sx={{
        position: 'relative',
        pl: 2,
        pr: 1,
        py: 1,
        gap: '2px',
        backgroundColor: accent(0.07, colors.accentContext),
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      {...rest}
    >
      <Box sx={{ position: 'relative', zIndex: 1, opacity: 0.9, fontSize: 2 }}>
        {children}
      </Box>
      <Button
        sx={{
          zIndex: 1,
          borderRadius: '100%',
          aspectRatio: '1/1',
          lineHeight: '100%',
          '&:hover, &:focus-visible': {
            backgroundColor: 'accentContext',
            color: 'accentOnContext',
          },
        }}
        tabIndex={-1}
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
  );
};
