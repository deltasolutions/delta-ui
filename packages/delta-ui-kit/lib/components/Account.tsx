import { jsx } from '@theme-ui/core';
import { FaUserCircle } from 'react-icons/fa';
import { Anchor, AnchorProps } from './Anchor';
import { Box } from './containers';

export interface AccountProps extends AnchorProps {}

export const Account = ({ children, ...rest }: AccountProps) => {
  return (
    <Anchor
      sx={{ backgroundColor: 'accentContext', borderRadius: '100vw' }}
      variant="pure"
      {...rest}
    >
      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FaUserCircle
          sx={{
            width: '1.5rem',
            height: '1.5rem',
          }}
        />
        <Box
          sx={{
            pl: '0.35em',
            pr: '0.50em',
            fontSize: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Anchor>
  );
};
