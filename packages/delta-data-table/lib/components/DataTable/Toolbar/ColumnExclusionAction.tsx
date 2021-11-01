import { useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { RiFolderChartFill, RiFolderOpenFill } from 'react-icons/ri';
import {
  Button,
  SystemContext,
  useImperativePortal,
  useStandaloneTransition
} from 'restyler';
import { jsx } from '@theme-ui/core';
import { Tooltip } from '../../Tooltip';
import { DataTableContext } from '../DataTableContext';
import { ColumnExclusions, ColumnExclusionsContext } from './ColumnExclusions';

export const ColumnExclusionAction = () => {
  const [t] = useTranslation('common');
  const {
    columns,
    activeTab: { columnExclusions = [] },
    updateActiveTab
  } = useContext(DataTableContext);

  const {
    defaults: {
      standaloneTransitionOptions: { portal: rootPortal = null } = {}
    } = {}
  } = useContext(SystemContext);
  const portal = useImperativePortal(rootPortal);

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: 'column',
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
      drop: ({ index }: { index: number }) => {
        const { key } = columns[index] ?? {};
        if (!key) {
          return;
        }
        updateActiveTab({
          columnExclusions: columnExclusions
            .filter(v => v !== key)
            .concat([key])
        });
      }
    }),
    [columns, columnExclusions, updateActiveTab]
  );

  const openFolder = useStandaloneTransition<
    HTMLDivElement,
    ColumnExclusionsContext
  >(ColumnExclusions, {
    deps: [columnExclusions],
    portal
  });

  return (
    <Tooltip
      content={
        t('labels.unusedColumns') +
        (columnExclusions.length ? ` (${columnExclusions.length})` : '')
      }
    >
      <Button
        ref={dropRef}
        kind="icon"
        sx={{ color: isOver && canDrop ? 'danger' : undefined }}
        onClick={() =>
          openFolder({
            anchorRef
          })
        }
      >
        {portal}
        <span ref={anchorRef}>
          {columnExclusions.length > 0 ? (
            <RiFolderChartFill />
          ) : (
            <RiFolderOpenFill />
          )}
        </span>
      </Button>
    </Tooltip>
  );
};
