import { jsx } from '@theme-ui/core';
import { Fragment, useContext } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { BoxProps, useThemed } from 'restyler';
import { getTabImageUri } from '../../../utils';
import { DataTableContext } from '../DataTableContext';
import { Handle } from './Handle';

export interface DraggableCellProps extends BoxProps {
  index: number;
}

export const DraggableCell = ({
  index,
  children,
  ...rest
}: DraggableCellProps) => {
  const Cell = useThemed('div', 'dataTable.cell');
  const {
    manager: { isConfiguringLayout, coercedColumns }
  } = useContext(DataTableContext);
  const [{ isDragging }, dragRef, connectPreview] = useDrag(
    () => ({
      type: 'column',
      item: { index },
      canDrag: isConfiguringLayout && coercedColumns.length > 1,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [isConfiguringLayout, coercedColumns]
  );
  return (
    <Fragment>
      <Cell
        ref={dragRef}
        sx={
          isConfiguringLayout
            ? { cursor: 'move', opacity: isDragging ? 0.5 : 1 }
            : {}
        }
        {...rest}
      >
        {children}
      </Cell>
      {isConfiguringLayout && (
        <Fragment>
          <DragPreviewImage src={getTabImageUri()} connect={connectPreview} />
          <Handle index={index} />
        </Fragment>
      )}
    </Fragment>
  );
};
