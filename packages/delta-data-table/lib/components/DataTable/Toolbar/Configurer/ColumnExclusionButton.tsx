import { jsx } from '@theme-ui/core';
import { Fragment, useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { IoFileTrayFullOutline, IoFileTrayOutline } from 'react-icons/io5';
import {
  Button,
  SystemContext,
  useImperativePortal,
  useSharedRef,
  useStandaloneTransition
} from 'restyler';
import { DataTableContext } from '../../DataTableContext';
import { ColumnExclusions, ColumnExclusionsContext } from './ColumnExclusions';

export const ColumnExclusionButton = () => {
  const {
    manager: {
      coercedColumns,
      activeTab: { columnExclusions = [] },
      updateActiveTab
    }
  } = useContext(DataTableContext);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const {
    defaults: {
      standaloneTransitionOptions: { portal: rootPortal = null } = {}
    } = {}
  } = useContext(SystemContext);
  const portal = useImperativePortal(rootPortal);
  const [_, dropRef] = useDrop(
    () => ({
      accept: 'column',
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
  const sharedRef = useSharedRef<HTMLButtonElement>(null, [anchorRef, dropRef]);
  return (
    <Fragment>
      {portal}
      <Button
        ref={sharedRef}
        kind="icon"
        onClick={() => openFolder({ anchorRef })}
      >
        {columnExclusions.length > 0 ? (
          <IoFileTrayFullOutline />
        ) : (
          <IoFileTrayOutline />
        )}
      </Button>
    </Fragment>
  );
};
