import { jsx } from '@theme-ui/core';
import { cloneElement, useContext, useMemo, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { BoxProps, Button, useThemed, useUpdateEffect } from 'restyler';
import { DataTableContext } from '../DataTableContext';

export interface ToolbarProps extends BoxProps {}

export const Toolbar = (props: ToolbarProps) => {
  const ThemedToolbar = useThemed('div', 'dataTable.toolbar');
  const ThemedToolbarContent = useThemed('div', 'dataTable.toolbar.content');
  const ThemedToolbarToggler = useThemed('div', 'dataTable.toolbar.toggler');
  const {
    manager: { layout },
    toolbar: { sections = [] } = {}
  } = useContext(DataTableContext);
  const initialSectionId = useMemo(() => sections[0]?.id, []);
  const [currentSectionId, setCurrentSectionId] = useState(initialSectionId);
  useUpdateEffect(() => {
    setCurrentSectionId(initialSectionId);
  }, [layout.tabs.length]);
  if (sections.length < 1) {
    return null;
  }
  const content = sections.find(v => v.id === currentSectionId)?.content;
  return (
    <ThemedToolbar {...props}>
      {content && <ThemedToolbarContent>{content}</ThemedToolbarContent>}
      <ThemedToolbarToggler>
        {sections
          .filter(v => v.id !== initialSectionId && v.toggler)
          .map(v => {
            if (!v.content) {
              return cloneElement(v.toggler!, { key: v.id });
            }
            return v.id === currentSectionId ? (
              <Button
                key={v.id}
                kind="icon"
                onClick={() => setCurrentSectionId(initialSectionId)}
              >
                <IoCloseOutline />
              </Button>
            ) : (
              cloneElement(v.toggler!, {
                key: v.id,
                onClick: () => setCurrentSectionId(v.id)
              })
            );
          })}
      </ThemedToolbarToggler>
    </ThemedToolbar>
  );
};
