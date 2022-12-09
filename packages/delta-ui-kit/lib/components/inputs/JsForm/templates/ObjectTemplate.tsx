import { jsx } from '@theme-ui/core';
import { TemplateProps } from 'delta-jsf';
import { Box } from '../../../containers';
import { ErrorList } from './ErrorList';

export const ObjectTemplate = ({
  children,
  schema: { title },
  validity,
  required,
}: TemplateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {title && (
        <Box
          sx={{
            fontWeight: 'bold',
            letterSpacing: '0.04em',
            color: 'accentOnContext',
            fontSize: 4,
          }}
        >
          {title}
          {required && <span sx={{ ml: 1, color: 'error' }}>*</span>}
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {children}
      </Box>
      <ErrorList validity={validity} />
    </Box>
  );
};
