import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {}
export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ ...rest }: ParagraphProps, ref) => {
    return (
      <p
        ref={ref}
        sx={{ margin: 0, padding: 0, boxSizing: 'border-box' }}
        {...rest}
      />
    );
  }
);
