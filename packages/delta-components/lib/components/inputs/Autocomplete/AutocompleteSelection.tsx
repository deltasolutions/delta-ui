import { jsx } from '@theme-ui/core';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Button, ButtonProps } from '../../Button';
import { Box } from '../../containers';

export interface AutocompleteSelectionProps extends ButtonProps {}

export const AutocompleteSelection = ({
  children,
  ...rest
}: AutocompleteSelectionProps) => {
  return (
    <Button
      tabIndex={-1}
      sx={{
        position: 'relative',
        px: '0.25em',
        height: '1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        color: 'onSurface',
      }}
      {...rest}
    >
      <Box
        sx={{
          boxSizing: 'content-box',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          px: '0.10em',
          py: '0.25em',
          width: '100%',
          height: '100%',
          borderRadius: 3,
          backgroundColor: 'surface',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IoCloseCircleOutline size={14} />
      </Box>
    </Button>
  );
};
