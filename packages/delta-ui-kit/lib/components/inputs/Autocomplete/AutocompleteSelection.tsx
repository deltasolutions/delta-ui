import { jsx } from '@theme-ui/core';
import { IoIosClose } from 'react-icons/io';
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
  return (
    <Box
      sx={{
        position: 'relative',
        pl: 2,
        pr: 1,
        py: 1,
        gap: '2px',
        backgroundColor: '#1b1919',
        border: '1px #303030 solid',
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
          <IoIosClose size={14} />
        </Button>
      </Box>
    </Box>
  );
};
