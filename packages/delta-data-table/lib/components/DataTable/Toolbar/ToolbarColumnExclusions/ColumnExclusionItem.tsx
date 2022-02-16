import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { BoxProps, useThemedFactory } from 'restyler';
import { getTabImageUri } from '../../../../utils';

export interface ColumnExclusionItemProps extends BoxProps {
  exclusion: string;
}

export const ColumnExclusionItem = ({
  exclusion,
  ...rest
}: ColumnExclusionItemProps) => {
  const useThemed = useThemedFactory<{ isDragging: boolean }>();
  const ThemedItem = useThemed(
    'div',
    'dataTable.configurer.columnExclusions.item'
  );
  const [{ isDragging }, dragRef, connectPreview] = useDrag(() => ({
    type: 'column',
    item: { exclusion },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));
  return (
    <Fragment>
      <ThemedItem ref={dragRef} isDragging={isDragging} {...rest} />
      <DragPreviewImage src={getTabImageUri()} connect={connectPreview} />
    </Fragment>
  );
};
