import { jsx } from '@theme-ui/core';
import { TemplateProps, useArrayHandlers } from 'delta-jsf';
import { Children } from 'react';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
import { Button } from '../../../Button';
import { Box } from '../../../containers';
import { ErrorList } from './ErrorList';

export const ArrayTemplate = (props: TemplateProps) => {
  const {
    children,
    value,
    schema: { title },
    validity,
    required,
  } = props;
  const { handleDelete, handleAdd } = useArrayHandlers(props);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: 'accentOnContext',
            fontSize: 4,
          }}
        >
          {title}
          {required && <span sx={{ ml: 1, color: 'error' }}>*</span>}
        </Box>
        <Button
          disabled={!handleDelete}
          icon={CgPlayListRemove}
          sx={{ ml: 'auto' }}
          variant="icon"
          onClick={() =>
            Array.isArray(value) &&
            value.length &&
            handleDelete?.(value.length - 1)
          }
        />
        <Button
          disabled={!handleAdd}
          icon={CgPlayListAdd}
          variant="icon"
          onClick={() => handleAdd?.()}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {Children.count(children) > 0 ? children : null}
      </Box>
      <ErrorList validity={validity} />
    </Box>
  );
};
