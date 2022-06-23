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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        {title && (
          <Box sx={{ fontWeight: 600 }}>
            {title}
            {required && <span sx={{ ml: 1, color: 'danger' }}>*</span>}
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {children}
        </Box>
      </Box>
      <ErrorList validity={validity} />
    </Box>
  );
};
