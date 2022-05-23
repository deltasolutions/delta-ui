import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Box } from '../Box';
import { Button } from '../Button';

export const Values = ({ values, onRemove }) => {
  if (values.length === 0) return null;
  return (
    <Fragment>
      {
        Object.entries(values ?? {}).map(([key, value], index, arr) => (
          <Value key={key} onRemove={() => onRemove(key)}>
            {value}
          </Value>
        ))
        // .reduce((prev, curr, index) => {
        //   return [
        //     ...prev,
        //     index > 0 ? <TextField item={prev[prev.length - 1].key} /> : null,
        //     curr
        //   ];
        // }, [] as any)
      }
    </Fragment>
  );
};

export const Value = ({ onRemove, children }) => {
  return (
    <Box
      sx={{
        px: 2,
        fontSize: 1,
        borderRadius: 4,
        gap: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'surfaceTint',
        color: 'onInversePrimary'
      }}
    >
      <Button
        onClick={onRemove}
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'onTertiaryContainer'
        }}
        tabIndex={-1}
      >
        {children}
        <IoCloseCircleOutline size={14} />
      </Button>
    </Box>
  );
};
