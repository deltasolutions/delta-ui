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
        fontSize: 4,
      }}
    >
      {title && (
        <Box
          sx={{
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: 'accentOnContext',
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
