import { jsx } from '@theme-ui/core';
import { cloneElement, useContext, useMemo, useState } from 'react';
import {
  IoCloseOutline,
  IoGridOutline,
  IoHelpCircleOutline,
  IoOptions,
  IoSearchOutline
} from 'react-icons/io5';
import { BoxProps, Button, useThemed } from 'restyler';
import { DataTableContext } from '../DataTableContext';
import { Configurer } from './Configurer';
import { Query } from './Query';
import { Tabs } from './Tabs';

export interface ToolbarProps extends BoxProps {}

export const Toolbar = (props: ToolbarProps) => {
  const ThemedToolbar = useThemed('div', 'dataTable.toolbar');
  const ThemedToolbarContent = useThemed('div', 'dataTable.toolbar.content');
  const ThemedToolbarExtras = useThemed('div', 'dataTable.toolbar.extras');
  const {
    toolbar: {
      initialSection: proposedInitialSectionId = '',
      sections = []
    } = {}
  } = useContext(DataTableContext);
  const availableSections = useMemo(
    () =>
      sections.map(v =>
        typeof v === 'string'
          ? {
              id: v,
              toggler: (
                <Button kind="icon">
                  {{
                    tabs: <IoGridOutline />,
                    query: <IoSearchOutline />,
                    configurer: <IoOptions />
                  }[v] ?? <IoHelpCircleOutline />}
                </Button>
              ),
              content:
                {
                  tabs: <Tabs />,
                  query: <Query />,
                  configurer: <Configurer />
                }[v] ?? null
            }
          : v
      ),
    [sections]
  );
  const initialSectionId = useMemo(
    () =>
      availableSections.some(v => v.id === proposedInitialSectionId)
        ? proposedInitialSectionId
        : availableSections[0]?.id,
    []
  );
  const [currentSectionId, setCurrentSectionId] = useState(initialSectionId);
  if (availableSections.length < 1) {
    return null;
  }
  return (
    <ThemedToolbar {...props}>
      <ThemedToolbarContent>
        {availableSections.find(v => v.id === currentSectionId)?.content}
      </ThemedToolbarContent>
      <ThemedToolbarExtras>
        {availableSections
          .filter(v => v.id !== initialSectionId)
          .map(v =>
            v.id === currentSectionId ? (
              <Button
                kind="icon"
                onClick={() => setCurrentSectionId(initialSectionId)}
              >
                <IoCloseOutline />
              </Button>
            ) : (
              cloneElement(v.toggler, {
                key: v.id,
                onClick: () => setCurrentSectionId(v.id)
              })
            )
          )}
      </ThemedToolbarExtras>
    </ThemedToolbar>
  );
};
