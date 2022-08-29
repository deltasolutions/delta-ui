import { jsx } from '@theme-ui/core';
import { useTranslation } from 'react-i18next';
import { AiOutlineInbox } from 'react-icons/ai';
import { Box } from '../containers';

export const EmptyOptions = () => {
  const [t] = useTranslation('common');
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        p: 2,
      }}
    >
      <AiOutlineInbox sx={{ width: '1.3em', height: '1.3em' }} />
    </Box>
  );
};
