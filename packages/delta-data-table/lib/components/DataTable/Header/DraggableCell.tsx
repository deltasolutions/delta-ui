import { jsx } from '@theme-ui/core';
import { Fragment, useContext } from 'react';
import { useDrag } from 'react-dnd';
import { BoxProps, useThemed } from 'restyler';
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
  const TableCell = useThemed('div', 'dataTable.cell');
  const {
    manager: { isConfiguringLayout }
  } = useContext(DataTableContext);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'column',
      item: { index },
      canDrag: isConfiguringLayout,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [isConfiguringLayout]
  );
  return (
    <Fragment>
      <TableCell
        ref={dragRef}
        sx={
          isConfiguringLayout
            ? { cursor: 'move', opacity: isDragging ? 0.5 : 1 }
            : {}
        }
        {...rest}
      >
        {children}
      </TableCell>
      {isConfiguringLayout && <Handle index={index} />}
    </Fragment>
  );
};
