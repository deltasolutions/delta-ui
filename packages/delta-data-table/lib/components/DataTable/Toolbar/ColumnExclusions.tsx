import {
  forwardRef,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from 'react';
import { useDrag } from 'react-dnd';
import { useTranslation } from 'react-i18next';
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
import { jsx } from '@theme-ui/core';
import { DataTableContext } from '../DataTableContext';

export interface ColumnExclusionsContext {
  anchorRef: RefObject<HTMLSpanElement>;
}

export const ColumnExclusions = forwardRef<
  HTMLDivElement,
  StandaloneTransitionerProps<ColumnExclusionsContext>
>(({ isVisible, handleClose, context: { anchorRef } = {} }, ref) => {
  const [t] = useTranslation('common');
  const {
    originalColumns,
    activeTab: { columnExclusions = [] }
  } = useContext(DataTableContext);
  const sharedRef = useSharedRef<HTMLDivElement>(null, [ref]);
  useClickOutside(sharedRef, handleClose);
  useStack(interactiveStackId);
  useEffect(() => {
    return disableScroll();
  }, []);
  const originalColumnsMap = useMemo(
    () => Object.fromEntries(originalColumns.map(v => [v.key, v])),
    [originalColumns]
  );
  const getColumnheader = useCallback(
    (key: string) => originalColumnsMap[key]?.header ?? key,
    [originalColumnsMap]
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
          {getColumnheader(exclusion)}
        </Item>
      ))
    ) : (
      <Button disabled kind="primary">
        {t('labels.empty')}
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
