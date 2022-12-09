import { jsx } from '@theme-ui/core';
import { TemplateProps, useArrayHandlers } from 'delta-jsf';
import { Children } from 'react';
import { CgPlayListAdd, CgPlayListRemove } from 'react-icons/cg';
import { Button } from '../../../Button';
import { Box } from '../../../containers';
import { EmptyOptions } from '../../EmptyOptions';
import { ErrorList } from './ErrorList';

export const ArrayTemplate = (props: TemplateProps) => {
  const {
    children,
    value,
    schema: { title, readOnly },
    validity,
    required,
  } = props;
  console.log('children', props);
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
            fontWeight: 'bold',
            letterSpacing: '0.04em',
            color: 'accentOnContext',
            fontSize: 4,
          }}
        >
          {title}
          {required && <span sx={{ ml: 1, color: 'error' }}>*</span>}
        </Box>
        <Button
          disabled={!handleDelete || readOnly}
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
          disabled={!handleAdd || readOnly}
          icon={CgPlayListAdd}
          variant="icon"
          onClick={() => handleAdd?.()}
        />
      </Box>
      {Children.count(children) > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {children}
        </Box>
      ) : (
        <EmptyOptions
          sx={{
            fontSize: '18px',
            border: '3px dashed',
            borderColor: 'accentContext',
            borderRadius: 4,
          }}
        />
      )}
      <ErrorList validity={validity} />
    </Box>
  );
};
