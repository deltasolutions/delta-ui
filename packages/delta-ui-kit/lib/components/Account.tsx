import { jsx } from '@theme-ui/core';
import {
  IoPersonCircle,
  IoPersonCircleOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { Anchor, AnchorProps } from './Anchor';
import { Box } from './containers';

export interface AccountProps extends AnchorProps {}

export const Account = ({ children, ...rest }: AccountProps) => {
  return (
    <Anchor variant="pure" {...rest}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IoPersonCircle
          sx={{
            pr: 1,
            width: '1.45rem',
            height: '1.45rem',
          }}
        />
        <Box
          sx={{
            fontSize: 2,
            fontWeight: 300,
            letterSpacing: '0.04em',
          }}
        >
          {children}
        </Box>
      </Box>
    </Anchor>
  );
};
