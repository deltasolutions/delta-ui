import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { formatBytes } from '../../utils';
import { Anchor } from '../Anchor';
import { Button } from '../Button';
import { BoxProps, Box } from '../containers';
export interface FileListProps extends BoxProps {
  files?: FileList;
  onDelete?: (file: File, index: number) => void;
}

export const FileList = forwardRef<HTMLDivElement, FileListProps>(
  ({ files, onDelete, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        {...rest}
      >
        {Array(files?.length ?? 0)
          .fill(null)
          .map((_, i) => {
            const file = files?.item(i);
            if (!file) {
              return null;
            }
            return (
              <FileListItem
                key={i}
                onDelete={() => onDelete?.(file, i)}
                file={file}
              />
            );
          })}
      </Box>
    );
  }
);
export interface FileListItem extends BoxProps {
  file: File;
  onDelete?: () => void;
}
export const FileListItem = forwardRef<HTMLDivElement, FileListItem>(
  ({ file, onDelete, ...rest }, ref) => {
    const [link, setLink] = useState('#');
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const url = window.URL.createObjectURL(new Blob([file]));
        setLink(url);
      }
    }, [file]);
    const handleOnDelete = useCallback(() => {
      onDelete?.();
    }, [onDelete, file]);
    return (
      <Box
        ref={ref}
        sx={{
          backgroundColor: 'surface',
          borderRadius: 4,
          w: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          lineHeight: 1.5,
          fontSize: 2,
        }}
        {...rest}
      >
        <Anchor variant="pure" href={link} download={file.name}>
          <span sx={{ color: 'accentOnSurface' }}>{file.name}</span>{' '}
          <span>({formatBytes(file.size)})</span>
        </Anchor>
        {onDelete && (
          <Button
            onClick={handleOnDelete}
            sx={{
              display: 'flex',
              color: 'onSurface',
              alignItems: 'center',
            }}
          >
            <AiOutlineDelete />
          </Button>
        )}
      </Box>
    );
  }
);
