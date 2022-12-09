import { jsx } from '@theme-ui/core';
import { forwardRef, useState, useEffect } from 'react';
import { formatBytes } from '../../../utils';
import { Anchor, AnchorProps } from '../../Anchor';

export interface FilePickerWidgetProps extends AnchorProps {
  file: File;
  isEven: boolean;
  disabled?: boolean;
}

export const FilePickerWidget = forwardRef<
  HTMLAnchorElement,
  FilePickerWidgetProps
>(({ file, isEven, disabled, ...rest }, ref) => {
  const [link, setLink] = useState('#');
  useEffect(() => {
    if (!file || typeof window === 'undefined') {
      return;
    }
    const url = window.URL.createObjectURL(new Blob([file]));
    setLink(url);
  }, [file]);
  return (
    <Anchor
      ref={ref}
      download={file.name}
      href={link}
      sx={{
        p: 2,
        w: '100%',
        fontSize: 1,
        fontWeight: 'normal',
        justifyContent: 'space-between',
        color: 'accentOnContext',
        '&:hover, &:active, &:focus-visible': {
          textDecoration: 'underline',
        },
      }}
      variant="pure"
      {...rest}
    >
      {file.name}{' '}
      <span sx={{ color: 'onContext' }}>({formatBytes(file.size)})</span>
    </Anchor>
  );
});
