import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from 'react';
import { useDrag } from 'react-dnd';
import { IoPushOutline } from 'react-icons/io5';
import {
  Button,
  ButtonProps,
  Card,
  disableScroll,
  interactiveStackId,
  StandaloneTransitionerProps,
  useClickOutside,
  useSharedRef,
  useStack
} from 'restyler';
import { DataTableContext } from '../DataTableContext';

export interface ColumnExclusionsContext {
  anchorRef: RefObject<HTMLSpanElement>;
}

export const ColumnExclusions = forwardRef<
  HTMLDivElement,
  StandaloneTransitionerProps<ColumnExclusionsContext>
>(({ isVisible, handleClose, context: { anchorRef } = {} }, ref) => {
  const {
    manager: {
      columns,
      activeTab: { columnExclusions = [] }
    }
  } = useContext(DataTableContext);
  const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
  useClickOutside(sharedRef, handleClose);
  useStack(interactiveStackId);
  useEffect(() => {
    return disableScroll();
  }, []);
  const columnMap = useMemo(
    () => Object.fromEntries(columns.map(v => [v.key, v])),
    [columns]
  );
  const getColumnHeader = useCallback(
    (key: string) => columnMap[key]?.header ?? key,
    [columnMap]
  );
  const {
    top = 0,
    left = 0,
    height = 0,
    width = 0
  } = anchorRef?.current?.getBoundingClientRect() ?? {};
  const content =
    columnExclusions.length > 0 ? (
      columnExclusions.map(exclusion => (
        <Item key={exclusion} exclusion={exclusion}>
          {getColumnHeader(exclusion)}
        </Item>
      ))
    ) : (
      <Button disabled kind="icon" sx={{ pointerEvents: 'none', opacity: 0.6 }}>
        <IoPushOutline />
      </Button>
    );
  return (
    <Card
      ref={sharedRef}
      kind="body"
      style={{
        top: top + height + 10,
        left: left + width / 2 - 100,
        width: 200
      }}
      sx={{
        zIndex: 1000,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        transform: isVisible ? '' : 'translateY(10px)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.2s, opacity 0.2s'
      }}
    >
      {content}
    </Card>
  );
});

interface ItemProps extends ButtonProps {
  exclusion: string;
}

const Item = ({ exclusion, ...rest }: ItemProps) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'column',
    item: { exclusion },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));
  return (
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
  );
};
