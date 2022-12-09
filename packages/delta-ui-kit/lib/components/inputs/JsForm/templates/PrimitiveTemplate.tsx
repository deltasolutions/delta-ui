import { jsx } from '@theme-ui/core';
import { TemplateProps } from 'delta-jsf';
import { Box } from '../../../containers';
import { ErrorList } from './ErrorList';

export const PrimitiveTemplate = ({
  children,
  schema: { type, title, description, layout: { field } = {} },
  validity,
  required,
}: TemplateProps) => {
  const unhandledTitle =
    type === 'boolean' || field === 'switch' || field === 'checkbox';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {!unhandledTitle && title && (
        <Box sx={{ fontWeight: 'bold', letterSpacing: '0.04em' }}>
          {title}
          {required && <span sx={{ ml: 1, color: 'error' }}>*</span>}
        </Box>
      )}
      <Box>{children}</Box>
      {description && <Box sx={{ opacity: 0.5 }}>{description}</Box>}
      <ErrorList validity={validity} />
    </Box>
  );
};
