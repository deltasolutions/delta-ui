import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';

export const Segments = (props: HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul
      sx={{
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        width: '1px',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
      {...props}
    />
  );
};
