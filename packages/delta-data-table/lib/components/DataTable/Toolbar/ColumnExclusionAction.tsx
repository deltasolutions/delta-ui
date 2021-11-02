import { jsx } from '@theme-ui/core';
import { useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { IoFileTrayFullOutline, IoFileTrayOutline } from 'react-icons/io5';
import {
  Button,
  SystemContext,
  useImperativePortal,
  useStandaloneTransition
} from 'restyler';
import { DataTableContext } from '../DataTableContext';
import { ColumnExclusions, ColumnExclusionsContext } from './ColumnExclusions';

export const ColumnExclusionAction = () => {
  const [t] = useTranslation('common');
  const {
    manager: {
      coercedColumns,
      activeTab: { columnExclusions = [] },
      updateActiveTab
    }
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
        const { key } = coercedColumns[index] ?? {};
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
    [coercedColumns, columnExclusions, updateActiveTab]
  );

  const openFolder = useStandaloneTransition<
    HTMLDivElement,
    ColumnExclusionsContext
  >(ColumnExclusions, {
    deps: [columnExclusions],
    portal
  });

  return (
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
          <IoFileTrayFullOutline />
        ) : (
          <IoFileTrayOutline />
        )}
      </span>
    </Button>
  );
};
