import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { Button, ButtonProps } from 'restyler';
import { getColumnImageUri } from '../../../../utils';

export interface ColumnExclusionItemProps extends ButtonProps {
  exclusion: string;
}

export const ColumnExclusionItem = ({
  exclusion,
  ...rest
}: ColumnExclusionItemProps) => {
  const [{ isDragging }, dragRef, connectPreview] = useDrag(() => ({
    type: 'column',
    item: { exclusion },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));
  return (
    <Fragment>
      <Button
        ref={dragRef}
        kind="primary"
        sx={{
          opacity: isDragging ? 0.5 : 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          cursor: 'move'
        }}
        {...rest}
      />
      <DragPreviewImage src={getColumnImageUri()} connect={connectPreview} />
    </Fragment>
  );
};
